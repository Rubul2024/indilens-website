import { useMemo, useState } from "react";

import Icon from "../components/Icon";
import {
  Badge,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  FilterTabs,
  PageHeader,
  SearchInput,
  Spinner,
} from "../components/ui";
import { useToast } from "../context/ToastContext";
import { newsletterApi } from "../lib/api";
import { formatDate, matchesQuery } from "../lib/format";
import useApiData from "../lib/useApiData";

const downloadCsv = (rows) => {
  // Quote every cell and neutralise spreadsheet formulas (CSV injection)
  const escape = (value) => {
    const text = String(value ?? "");
    const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const lines = [
    ["Email", "Status", "Subscribed On"].map(escape).join(","),
    ...rows.map((row) =>
      [row.email, row.isActive ? "Active" : "Inactive", new Date(row.createdAt).toISOString()].map(escape).join(",")
    ),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `indilens-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const NewsletterPage = () => {
  const toast = useToast();
  const { data, setData, loading, error, reload } = useApiData(newsletterApi.list);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const subscribers = useMemo(() => data?.data || [], [data]);
  const activeCount = subscribers.filter((subscriber) => subscriber.isActive).length;

  const visible = subscribers.filter(
    (subscriber) =>
      (filter === "all" || (filter === "active") === subscriber.isActive) &&
      matchesQuery(subscriber, ["email"], query)
  );

  const toggleActive = async (subscriber) => {
    setTogglingId(subscriber._id);

    try {
      const result = await newsletterApi.setActive(subscriber._id, !subscriber.isActive);
      setData((current) => ({
        ...current,
        data: current.data.map((item) => (item._id === subscriber._id ? result.data : item)),
      }));
      toast.success(result.data.isActive ? "Subscriber activated." : "Subscriber deactivated.");
    } catch (updateError) {
      toast.error(updateError.message);
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);

    try {
      await newsletterApi.remove(pendingDelete._id);
      setData((current) => ({
        ...current,
        data: current.data.filter((item) => item._id !== pendingDelete._id),
      }));
      setPendingDelete(null);
      toast.success("Subscriber removed.");
    } catch (deleteError) {
      toast.error(deleteError.message);
    } finally {
      setDeleting(false);
    }
  };

  const renderBody = () => {
    if (loading && !data) return <Spinner />;
    if (error && !data) return <ErrorState message={error} onRetry={reload} />;
    if (subscribers.length === 0) {
      return <EmptyState icon="send" title="No subscribers yet" text="Newsletter sign-ups from the website footer will appear here." />;
    }
    if (visible.length === 0) {
      return <EmptyState icon="search" title="No matches" text="Try a different search or filter." />;
    }

    return (
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Subscribed</th>
              <th className="adm-table-actions-head">
                <span className="adm-sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((subscriber) => (
              <tr key={subscriber._id}>
                <td data-label="Email">
                  <a className="adm-link" href={`mailto:${subscriber.email}`}>
                    {subscriber.email}
                  </a>
                </td>
                <td data-label="Status">
                  <Badge tone={subscriber.isActive ? "success" : "neutral"}>
                    {subscriber.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td data-label="Subscribed">{formatDate(subscriber.createdAt, true)}</td>
                <td className="adm-table-actions">
                  <button
                    type="button"
                    className="adm-btn adm-btn--secondary adm-btn--sm"
                    onClick={() => toggleActive(subscriber)}
                    disabled={togglingId === subscriber._id}
                  >
                    {subscriber.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn adm-icon-btn--danger"
                    onClick={() => setPendingDelete(subscriber)}
                    aria-label={`Remove ${subscriber.email}`}
                    title="Remove"
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
      <PageHeader title="Subscribers" description="People who signed up for the Indilens newsletter.">
        <button
          type="button"
          className="adm-btn adm-btn--secondary"
          onClick={() => downloadCsv(visible)}
          disabled={visible.length === 0}
        >
          <Icon name="download" size={16} /> Export CSV
        </button>
      </PageHeader>

      <section className="adm-card adm-card--flush">
        <div className="adm-toolbar">
          <FilterTabs
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: subscribers.length },
              { value: "active", label: "Active", count: activeCount },
              { value: "inactive", label: "Inactive", count: subscribers.length - activeCount },
            ]}
          />
          <SearchInput value={query} onChange={setQuery} placeholder="Search by email…" />
        </div>

        {renderBody()}
      </section>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove subscriber?"
        message={`${pendingDelete?.email || "This subscriber"} will be permanently removed from the list.`}
        confirmLabel="Remove"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
};

export default NewsletterPage;
