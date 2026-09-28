import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
import { resourceApi } from "../lib/api";
import { formatDate, matchesQuery } from "../lib/format";
import useApiData from "../lib/useApiData";

const ResourceListPage = ({ resource }) => {
  const toast = useToast();
  const api = useMemo(() => resourceApi(resource.api), [resource.api]);
  const { data, setData, loading, error, reload } = useApiData(api.list);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const records = useMemo(() => data?.data || [], [data]);

  const publishedCount = records.filter((record) => record.isPublished).length;

  const visible = records.filter((record) => {
    if (filter === "published" && !record.isPublished) return false;
    if (filter === "draft" && record.isPublished) return false;
    return matchesQuery(record, resource.searchFields, query);
  });

  const replaceRecord = (updated) =>
    setData((current) => ({
      ...current,
      data: current.data.map((record) => (record._id === updated._id ? updated : record)),
    }));

  const togglePublished = async (record) => {
    setTogglingId(record._id);

    try {
      const result = await api.update(record._id, { isPublished: !record.isPublished });
      replaceRecord(result.data);
      toast.success(result.data.isPublished ? "Published to the website." : "Moved to drafts.");
    } catch (updateError) {
      toast.error(updateError.message);
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);

    try {
      await api.remove(pendingDelete._id);
      setData((current) => ({
        ...current,
        data: current.data.filter((record) => record._id !== pendingDelete._id),
      }));
      toast.success(`${resource.singular} deleted.`);
      setPendingDelete(null);
    } catch (deleteError) {
      toast.error(deleteError.message);
    } finally {
      setDeleting(false);
    }
  };

  const newLink = (
    <Link to={`/admin/${resource.key}/new`} className="adm-btn adm-btn--primary">
      <Icon name="plus" size={16} /> Add {resource.singular.toLowerCase()}
    </Link>
  );

  const renderBody = () => {
    if (loading && !data) return <Spinner />;
    if (error && !data) return <ErrorState message={error} onRetry={reload} />;

    if (records.length === 0) {
      return (
        <EmptyState
          icon={resource.icon}
          title={`No ${resource.label.toLowerCase()} yet`}
          text={`Create your first ${resource.singular.toLowerCase()} to show it on the website.`}
          action={newLink}
        />
      );
    }

    if (visible.length === 0) {
      return <EmptyState icon="search" title="No matches" text="Try a different search or filter." />;
    }

    return (
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>{resource.singular}</th>
              {resource.columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              <th>Status</th>
              <th>Created</th>
              <th className="adm-table-actions-head">
                <span className="adm-sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((record) => (
              <tr key={record._id}>
                <td data-label={resource.singular}>
                  <Link to={`/admin/${resource.key}/${record._id}/edit`} className="adm-cell-title">
                    {resource.imageField && (
                      <span className="adm-thumb">
                        {record[resource.imageField] ? (
                          <img src={record[resource.imageField]} alt="" loading="lazy" />
                        ) : (
                          record[resource.titleField]?.[0]
                        )}
                      </span>
                    )}
                    <span>
                      <strong>{record[resource.titleField]}</strong>
                      {record[resource.subtitleField] && <small>{record[resource.subtitleField]}</small>}
                    </span>
                  </Link>
                </td>

                {resource.columns.map((column) => (
                  <td key={column.name} data-label={column.label}>
                    {column.format ? column.format(record[column.name]) : record[column.name] ?? "—"}
                  </td>
                ))}

                <td data-label="Status">
                  <button
                    type="button"
                    className="adm-status-toggle"
                    onClick={() => togglePublished(record)}
                    disabled={togglingId === record._id}
                    title={record.isPublished ? "Click to unpublish" : "Click to publish"}
                  >
                    <Badge tone={record.isPublished ? "success" : "warning"}>
                      {record.isPublished ? "Published" : "Draft"}
                    </Badge>
                    {record.isFeatured && (
                      <span className="adm-featured" title="Featured">
                        <Icon name="star" size={14} />
                      </span>
                    )}
                  </button>
                </td>

                <td data-label="Created">{formatDate(record[resource.dateField])}</td>

                <td className="adm-table-actions">
                  <Link
                    to={`/admin/${resource.key}/${record._id}/edit`}
                    className="adm-icon-btn"
                    aria-label={`Edit ${record[resource.titleField]}`}
                    title="Edit"
                  >
                    <Icon name="edit" size={16} />
                  </Link>
                  <button
                    type="button"
                    className="adm-icon-btn adm-icon-btn--danger"
                    onClick={() => setPendingDelete(record)}
                    aria-label={`Delete ${record[resource.titleField]}`}
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
      <PageHeader title={resource.label} description={resource.description}>
        {newLink}
      </PageHeader>

      <section className="adm-card adm-card--flush">
        <div className="adm-toolbar">
          <FilterTabs
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: records.length },
              { value: "published", label: "Published", count: publishedCount },
              { value: "draft", label: "Drafts", count: records.length - publishedCount },
            ]}
          />
          <SearchInput value={query} onChange={setQuery} placeholder={`Search ${resource.label.toLowerCase()}…`} />
        </div>

        {renderBody()}
      </section>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={`Delete ${resource.singular.toLowerCase()}?`}
        message={
          <>
            <strong>{pendingDelete?.[resource.titleField]}</strong> will be permanently removed from the website.
            This cannot be undone.
          </>
        }
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
};

export default ResourceListPage;
