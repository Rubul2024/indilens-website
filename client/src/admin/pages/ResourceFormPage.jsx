import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Icon from "../components/Icon";
import { ErrorState, PageHeader, Spinner } from "../components/ui";
import { useToast } from "../context/ToastContext";
import { resourceApi } from "../lib/api";
import { formatDate, slugify } from "../lib/format";

const URL_REGEX = /^https?:\/\/[^\s]+$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ========================================
// VALUE CONVERSION
// ========================================

const toFormValue = (field, value) => {
  if (field.type === "toggle") return Boolean(value ?? field.default ?? false);
  if (field.type === "tags") return Array.isArray(value) ? value.join(", ") : value || "";
  if (field.type === "date") return value ? String(value).slice(0, 10) : "";
  if (field.type === "number") return value ?? field.default ?? 0;
  return value ?? field.default ?? "";
};

const toPayloadValue = (field, value) => {
  if (field.type === "toggle") return Boolean(value);
  if (field.type === "number") return Number(value) || 0;
  if (field.type === "date") return value || null;
  if (field.type === "tags") {
    return String(value)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  if (field.type === "slug") return slugify(value);
  return typeof value === "string" ? value.trim() : value;
};

const buildForm = (fields, record = {}) =>
  Object.fromEntries(fields.map((field) => [field.name, toFormValue(field, record[field.name])]));

const validate = (fields, form) => {
  const errors = {};

  for (const field of fields) {
    const value = form[field.name];
    const text = typeof value === "string" ? value.trim() : value;

    if (field.required && !text) {
      errors[field.name] = `${field.label} is required.`;
    } else if (field.maxLength && typeof text === "string" && text.length > field.maxLength) {
      errors[field.name] = `Keep this under ${field.maxLength} characters.`;
    } else if ((field.type === "url" || field.type === "image") && text && !URL_REGEX.test(text)) {
      errors[field.name] = "Enter a full URL starting with https://";
    } else if (field.type === "email" && text && !EMAIL_REGEX.test(text)) {
      errors[field.name] = "Enter a valid email address.";
    } else if (field.type === "slug" && text && !slugify(text)) {
      errors[field.name] = "Use letters, numbers and hyphens.";
    }
  }

  return errors;
};

// ========================================
// FIELD RENDERER
// ========================================

const Field = ({ field, value, error, onChange }) => {
  const id = `field-${field.name}`;
  const describedBy = error ? `${id}-error` : field.help ? `${id}-help` : undefined;

  if (field.type === "toggle") {
    return (
      <label className="adm-switch-row" htmlFor={id}>
        <span>
          <strong>{field.label}</strong>
          {field.help && <small>{field.help}</small>}
        </span>
        <input
          id={id}
          type="checkbox"
          className="adm-switch"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
      </label>
    );
  }

  const common = {
    id,
    name: field.name,
    value,
    className: `adm-input ${error ? "has-error" : ""}`,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    onChange: (event) => onChange(event.target.value),
  };

  let control;

  if (field.type === "textarea" || field.type === "longtext") {
    control = <textarea {...common} rows={field.type === "longtext" ? 14 : 3} />;
  } else if (field.type === "slug") {
    control = (
      <span className="adm-input-group adm-input-group--prefix">
        <span className="adm-input-prefix">/</span>
        <input {...common} type="text" onBlur={() => onChange(slugify(value))} />
      </span>
    );
  } else {
    const inputType = { number: "number", email: "email", date: "date", url: "url", image: "url" }[field.type] || "text";
    control = (
      <input
        {...common}
        type={inputType}
        placeholder={field.type === "url" || field.type === "image" ? "https://" : undefined}
      />
    );
  }

  const length = typeof value === "string" ? value.length : 0;

  return (
    <div className="adm-field">
      <label className="adm-label" htmlFor={id}>
        {field.label}
        {field.required && <span className="adm-required"> *</span>}
        {field.maxLength && (
          <span className={`adm-counter ${length > field.maxLength ? "is-over" : ""}`}>
            {length}/{field.maxLength}
          </span>
        )}
      </label>

      {control}

      {field.type === "image" && value && URL_REGEX.test(value) && (
        <div className="adm-image-preview">
          <img
            src={value}
            alt="Preview"
            onLoad={(event) => (event.currentTarget.parentElement.hidden = false)}
            onError={(event) => (event.currentTarget.parentElement.hidden = true)}
          />
        </div>
      )}

      {error ? (
        <small id={`${id}-error`} className="adm-field-error">
          {error}
        </small>
      ) : (
        field.help && (
          <small id={`${id}-help`} className="adm-help">
            {field.help}
          </small>
        )
      )}
    </div>
  );
};

// ========================================
// PAGE
// ========================================

const ResourceFormPage = ({ resource }) => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();
  const api = useMemo(() => resourceApi(resource.api), [resource.api]);

  const [form, setForm] = useState(() => buildForm(resource.fields));
  const [initial, setInitial] = useState(form);
  const [record, setRecord] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    const controller = new AbortController();

    api
      .get(id, controller.signal)
      .then((result) => {
        const loaded = buildForm(resource.fields, result.data);
        setRecord(result.data);
        setForm(loaded);
        setInitial(loaded);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setLoadError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [api, id, isEdit, resource.fields]);

  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  // Warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!dirty || saving) return;

    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, saving]);

  const slugField = resource.fields.find((field) => field.type === "slug");

  const setValue = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field.name]: value };

      // Auto-generate the slug from its source field until edited by hand
      if (slugField && field.name === slugField.from && !slugTouched) {
        next[slugField.name] = slugify(value);
      }

      return next;
    });

    if (field.type === "slug") setSlugTouched(true);

    const cleared = [field.name];
    if (slugField && field.name === slugField.from && !slugTouched) cleared.push(slugField.name);
    if (cleared.some((name) => errors[name])) {
      setErrors((current) => ({ ...current, ...Object.fromEntries(cleared.map((name) => [name, undefined])) }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate(resource.fields, form);
    setErrors(validation);

    if (Object.keys(validation).length) {
      toast.error("Please fix the highlighted fields.");
      document.getElementById(`field-${Object.keys(validation)[0]}`)?.focus();
      return;
    }

    const payload = Object.fromEntries(
      resource.fields.map((field) => [field.name, toPayloadValue(field, form[field.name])])
    );

    setSaving(true);

    try {
      if (isEdit) {
        await api.update(id, payload);
        toast.success(`${resource.singular} updated.`);
      } else {
        await api.create(payload);
        toast.success(`${resource.singular} created.`);
      }
      setInitial(form);
      navigate(`/admin/${resource.key}`);
    } catch (error) {
      toast.error(error.message);
      if (error.status === 409 && slugField) {
        setErrors((current) => ({ ...current, [slugField.name]: error.message }));
      }
    } finally {
      setSaving(false);
    }
  };

  const back = (
    <Link to={`/admin/${resource.key}`} className="adm-back">
      <Icon name="arrowLeft" size={16} /> {resource.label}
    </Link>
  );

  if (loading) return <Spinner />;

  if (loadError) {
    return (
      <>
        <PageHeader title={`Edit ${resource.singular.toLowerCase()}`} back={back} />
        <ErrorState message={loadError} />
      </>
    );
  }

  const mainFields = resource.fields.filter((field) => !field.section);
  const sectionFields = (section) => resource.fields.filter((field) => field.section === section);

  const renderField = (field) => (
    <Field
      key={field.name}
      field={field}
      value={form[field.name]}
      error={errors[field.name]}
      onChange={(value) => setValue(field, value)}
    />
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <PageHeader
        title={isEdit ? `Edit ${resource.singular.toLowerCase()}` : `New ${resource.singular.toLowerCase()}`}
        description={isEdit ? record?.[resource.titleField] : resource.description}
        back={back}
      >
        <Link to={`/admin/${resource.key}`} className="adm-btn adm-btn--secondary">
          Cancel
        </Link>
        <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : `Create ${resource.singular.toLowerCase()}`}
        </button>
      </PageHeader>

      <div className="adm-form-layout">
        <div className="adm-form-main">
          <section className="adm-card">{mainFields.map(renderField)}</section>
        </div>

        <aside className="adm-form-side">
          {sectionFields("status").length > 0 && (
            <section className="adm-card">
              <h2 className="adm-card-title">Visibility</h2>
              {sectionFields("status").map(renderField)}
              {record && (
                <dl className="adm-meta">
                  <div>
                    <dt>Created</dt>
                    <dd>{formatDate(record.createdAt, true)}</dd>
                  </div>
                  <div>
                    <dt>Last updated</dt>
                    <dd>{formatDate(record.updatedAt, true)}</dd>
                  </div>
                </dl>
              )}
            </section>
          )}

          {sectionFields("media").length > 0 && (
            <section className="adm-card">
              <h2 className="adm-card-title">Media</h2>
              {sectionFields("media").map(renderField)}
            </section>
          )}

          {sectionFields("meta").length > 0 && (
            <section className="adm-card">
              <h2 className="adm-card-title">Details</h2>
              {sectionFields("meta").map(renderField)}
            </section>
          )}
        </aside>
      </div>

      <div className="adm-sticky-actions">
        <span className="adm-muted">{dirty ? "Unsaved changes" : "No changes"}</span>
        <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ResourceFormPage;
