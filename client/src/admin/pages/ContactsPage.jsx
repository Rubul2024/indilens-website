import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import Icon from "../components/Icon";
import {
  Badge,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  FilterTabs,
  Modal,
  PageHeader,
  SearchInput,
  Spinner,
} from "../components/ui";
import { useToast } from "../context/ToastContext";
import { contactsApi } from "../lib/api";
import { formatDate, matchesQuery } from "../lib/format";
import useApiData from "../lib/useApiData";

const STATUS = {
  new: { label: "New", tone: "info" },
  read: { label: "Read", tone: "neutral" },
  replied: { label: "Replied", tone: "success" },
};

const ContactsPage = () => {
  const toast = useToast();
  const location = useLocation();
  const { data, setData, loading, error, reload } = useApiData(contactsApi.list);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  // Opened from the dashboard's "recent messages" list
  const [openId, setOpenId] = useState(location.state?.open || null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const contacts = useMemo(() => data?.data || [], [data]);
  const selected = contacts.find((contact) => contact._id === openId) || null;

  const counts = contacts.reduce(
    (acc, contact) => ({ ...acc, [contact.status]: (acc[contact.status] || 0) + 1 }),
    {}
  );

  const visible = contacts.filter(
    (contact) =>
      (filter === "all" || contact.status === filter) &&
      matchesQuery(contact, ["name", "email", "phone", "subject", "message"], query)
  );

  const replaceContact = (updated) =>
    setData((current) => ({
      ...current,
      data: current.data.map((contact) => (contact._id === updated._id ? updated : contact)),
    }));

  const setStatus = async (contact, status, { silent = false } = {}) => {
    try {
      const result = await contactsApi.setStatus(contact._id, status);
      replaceContact(result.data);
      if (!silent) toast.success(`Marked as ${STATUS[status].label.toLowerCase()}.`);
    } catch (updateError) {
      toast.error(updateError.message);
    }
  };

  const openContact = (contact) => {
    setOpenId(contact._id);
    if (contact.status === "new") setStatus(contact, "read", { silent: true });
  };

  const confirmDelete = async () => {
    setDeleting(true);

    try {
      await contactsApi.remove(pendingDelete._id);
      setData((current) => ({
        ...current,
        data: current.data.filter((contact) => contact._id !== pendingDelete._id),
      }));
      if (openId === pendingDelete._id) setOpenId(null);
      setPendingDelete(null);
      toast.success("Message deleted.");
    } catch (deleteError) {
      toast.error(deleteError.message);
    } finally {
      setDeleting(false);
    }
  };

  const replyHref = (contact) =>
    `mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${contact.subject || "Your enquiry to Indilens"}`)}`;

  const renderBody = () => {
    if (loading && !data) return <Spinner />;
    if (error && !data) return <ErrorState message={error} onRetry={reload} />;
    if (contacts.length === 0) {
      return <EmptyState icon="inbox" title="Inbox is empty" text="Messages from the website contact form will appear here." />;
    }
    if (visible.length === 0) {
      return <EmptyState icon="search" title="No matches" text="Try a different search or filter." />;
    }

    return (
      <div className="adm-table-wrap">
        <table className="adm-table adm-table--clickable">
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Received</th>
              <th className="adm-table-actions-head">
                <span className="adm-sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((contact) => (
              <tr
                key={contact._id}
                className={contact.status === "new" ? "is-unread" : ""}
                onClick={() => openContact(contact)}
              >
                <td data-label="From">
                  <span className="adm-cell-title">
                    <span>
                      <strong>{contact.name}</strong>
                      <small>{contact.email}</small>
                    </span>
                  </span>
                </td>
                <td data-label="Subject">
                  <span className="adm-truncate">{contact.subject || contact.message || "—"}</span>
                </td>
                <td data-label="Phone">{contact.phone}</td>
                <td data-label="Status">
                  <Badge tone={STATUS[contact.status]?.tone}>{STATUS[contact.status]?.label}</Badge>
                </td>
                <td data-label="Received">{formatDate(contact.createdAt, true)}</td>
                <td className="adm-table-actions" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => openContact(contact)}
                    aria-label={`Open message from ${contact.name}`}
                    title="Open"
                  >
                    <Icon name="eye" size={16} />
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn adm-icon-btn--danger"
                    onClick={() => setPendingDelete(contact)}
                    aria-label={`Delete message from ${contact.name}`}
                    title="Delete"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <PageHeader title="Messages" description="Enquiries submitted through the website contact form.">
        <button type="button" className="adm-btn adm-btn--secondary" onClick={reload} disabled={loading}>
          <Icon name="refresh" size={16} /> Refresh
        </button>
      </PageHeader>

      <section className="adm-card adm-card--flush">
        <div className="adm-toolbar">
          <FilterTabs
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: contacts.length },
              { value: "new", label: "New", count: counts.new || 0 },
              { value: "read", label: "Read", count: counts.read || 0 },
              { value: "replied", label: "Replied", count: counts.replied || 0 },
            ]}
          />
          <SearchInput value={query} onChange={setQuery} placeholder="Search messages…" />
        </div>

        {renderBody()}
      </section>

      <Modal
        open={Boolean(selected)}
        title="Message"
        onClose={() => setOpenId(null)}
        size="lg"
        footer={
          selected && (
            <>
              <button
                type="button"
                className="adm-btn adm-btn--ghost-danger"
                onClick={() => setPendingDelete(selected)}
              >
                <Icon name="trash" size={16} /> Delete
              </button>
              <span className="adm-spacer" />
              {selected.status !== "replied" && (
                <button type="button" className="adm-btn adm-btn--secondary" onClick={() => setStatus(selected, "replied")}>
                  <Icon name="check" size={16} /> Mark as replied
                </button>
              )}
              <a className="adm-btn adm-btn--primary" href={replyHref(selected)}>
                <Icon name="reply" size={16} /> Reply by email
              </a>
            </>
          )
        }
      >
        {selected && (
          <div className="adm-message">
            <div className="adm-message-head">
              <span className="adm-avatar adm-avatar--lg">{selected.name?.[0]?.toUpperCase()}</span>
              <div>
                <strong>{selected.name}</strong>
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              </div>
              <Badge tone={STATUS[selected.status]?.tone}>{STATUS[selected.status]?.label}</Badge>
            </div>

            <dl className="adm-meta adm-meta--grid">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Received</dt>
                <dd>{formatDate(selected.createdAt, true)}</dd>
              </div>
              <div>
                <dt>Subject</dt>
                <dd>{selected.subject || "—"}</dd>
              </div>
            </dl>

            <div className="adm-message-body">{selected.message || <em className="adm-muted">No message provided.</em>}</div>

            <label className="adm-field adm-field--inline">
              <span className="adm-label">Status</span>
              <select
                className="adm-input"
                value={selected.status}
                onChange={(event) => setStatus(selected, event.target.value)}
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </label>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete message?"
        message={`The message from ${pendingDelete?.name || "this sender"} will be permanently deleted.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
};

export default ContactsPage;
