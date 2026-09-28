import { useEffect, useRef } from "react";

import Icon from "./Icon";

// ========================================
// PAGE HEADER
// ========================================

export const PageHeader = ({ title, description, children, back }) => (
  <header className="adm-page-header">
    <div>
      {back}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
    {children && <div className="adm-page-actions">{children}</div>}
  </header>
);

// ========================================
// BADGE
// ========================================

export const Badge = ({ tone = "neutral", children }) => (
  <span className={`adm-badge adm-badge--${tone}`}>{children}</span>
);

// ========================================
// STATES
// ========================================

export const Spinner = ({ label = "Loading…" }) => (
  <div className="adm-state">
    <span className="adm-spinner" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="adm-state adm-state--error">
    <Icon name="alert" size={28} />
    <p>{message}</p>
    {onRetry && (
      <button type="button" className="adm-btn adm-btn--secondary" onClick={onRetry}>
        <Icon name="refresh" size={16} /> Try again
      </button>
    )}
  </div>
);

export const EmptyState = ({ icon = "inbox", title, text, action }) => (
  <div className="adm-state">
    <span className="adm-state-icon">
      <Icon name={icon} size={26} />
    </span>
    <strong>{title}</strong>
    {text && <p>{text}</p>}
    {action}
  </div>
);

// ========================================
// MODAL
// ========================================

export const Modal = ({ open, title, onClose, children, footer, size = "md" }) => {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", onKey);
    const previous = document.activeElement;
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="adm-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className={`adm-modal adm-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="adm-modal-header">
          <h2>{title}</h2>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {footer && <div className="adm-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ========================================
// CONFIRM DIALOG
// ========================================

export const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}) => (
  <Modal
    open={open}
    title={title}
    onClose={busy ? () => {} : onCancel}
    size="sm"
    footer={
      <>
        <button type="button" className="adm-btn adm-btn--secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="adm-btn adm-btn--danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Please wait…" : confirmLabel}
        </button>
      </>
    }
  >
    <p className="adm-confirm-text">{message}</p>
  </Modal>
);

// ========================================
// TOOLBAR: SEARCH + FILTER TABS
// ========================================

export const SearchInput = ({ value, onChange, placeholder = "Search…" }) => (
  <label className="adm-search">
    <Icon name="search" size={16} />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  </label>
);

export const FilterTabs = ({ options, value, onChange }) => (
  <div className="adm-tabs" role="tablist">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        role="tab"
        aria-selected={value === option.value}
        className={value === option.value ? "is-active" : ""}
        onClick={() => onChange(option.value)}
      >
        {option.label}
        {option.count !== undefined && <span className="adm-tab-count">{option.count}</span>}
      </button>
    ))}
  </div>
);
