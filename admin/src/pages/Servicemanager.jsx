import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ServiceManager = () => {
  const { api } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/services/admin/all");
      setServices(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load services. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ─── Toast ───────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3500);
  };

  // ─── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete("/services/" + deleteId);
      showToast("Service deleted successfully.", "success");
      setDeleteId(null);
      fetchServices();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete service.",
        "error"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ─── Toggle Active ───────────────────────────────────────────────────────────
  const handleToggleActive = async (service) => {
    try {
      const formData = new FormData();
      formData.append("isActive", !service.isActive);
      await api.put("/services/" + service._id, formData);
      showToast(
        "Service " + (service.isActive ? "deactivated" : "activated") + ".",
        "success"
      );
      fetchServices();
    } catch (err) {
      showToast("Failed to update service status.", "error");
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="service-manager">
      {/* ── Toast ── */}
      {toast.show && (
        <div className={"toast-notification toast-" + toast.type}>
          <span className="toast-icon">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => !deleteLoading && setDeleteId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="modal-title">Delete Service?</h3>
            <p className="modal-text">
              This will permanently delete the service and all its associated
              images from Cloudinary. This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <span className="spinner-sm"></span> Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">
            {services.length} service{services.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/services/new")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Add New Service
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="alert alert-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      {/* ── Loading Skeleton ── */}
      {loading ? (
        <div className="table-card">
          <div className="skeleton-table">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-row">
                <div className="skeleton skeleton-img"></div>
                <div className="skeleton-info">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-sub"></div>
                </div>
                <div className="skeleton skeleton-badge"></div>
                <div className="skeleton skeleton-actions"></div>
              </div>
            ))}
          </div>
        </div>
      ) : services.length === 0 ? (
        /* ── Empty State ── */
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="empty-title">No services yet</h3>
          <p className="empty-text">
            Get started by adding your first service.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/services/new")}
          >
            Add First Service
          </button>
        </div>
      ) : (
        /* ── Table ── */
        <div className="table-card">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Slug</th>
                  <th className="text-center">FAQs</th>
                  <th className="text-center">Benefits</th>
                  <th className="text-center">Order</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    {/* Service name + image */}
                    <td>
                      <div className="service-cell">
                        <div className="service-thumb">
                          {service.heroImage ? (
                            <img
                              src={service.heroImage}
                              alt={service.title}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className="thumb-placeholder"
                            style={{ display: service.heroImage ? "none" : "flex" }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M3 9l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="service-info">
                          <span className="service-name">{service.title}</span>
                          {service.subtitle && (
                            <span className="service-subtitle">
                              {service.subtitle.length > 50
                                ? service.subtitle.slice(0, 50) + "…"
                                : service.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td>
                      <code className="slug-badge">{service.slug}</code>
                    </td>

                    {/* FAQs count */}
                    <td className="text-center">
                      <span className="count-badge">
                        {service.faqs?.length || 0}
                      </span>
                    </td>

                    {/* Benefits count */}
                    <td className="text-center">
                      <span className="count-badge">
                        {service.benefits?.length || 0}
                      </span>
                    </td>

                    {/* Order */}
                    <td className="text-center">
                      <span className="count-badge">{service.order}</span>
                    </td>

                    {/* Status toggle */}
                    <td className="text-center">
                      <button
                        className={"status-badge " + (service.isActive ? "status-active" : "status-inactive")}
                        onClick={() => handleToggleActive(service)}
                        title="Click to toggle"
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="action-btns">
                        <a
                          href={"http://localhost:3000/services/" + service.slug}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-btn icon-btn-view"
                          title="View live"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                        <button
                          className="icon-btn icon-btn-edit"
                          title="Edit"
                          onClick={() => navigate("/services/edit/" + service._id)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <button
                          className="icon-btn icon-btn-delete"
                          title="Delete"
                          onClick={() => setDeleteId(service._id)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Styles ── */}
      <style>{`
        .service-manager {
          padding: 0;
          position: relative;
        }

        /* Toast */
        .toast-notification {
          position: fixed;
          bottom: 28px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          z-index: 9999;
          box-shadow: 0 8px 24px rgba(0,0,0,.15);
          animation: slideUp .25s ease;
        }
        .toast-success { background: #166534; color: #fff; }
        .toast-error   { background: #991b1b; color: #fff; }
        .toast-icon    { font-size: 16px; font-weight: 700; }
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 9998;
          backdrop-filter: blur(3px);
        }
        .modal-box {
          background: #fff;
          border-radius: 14px;
          padding: 36px 32px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,.2);
        }
        .modal-icon  { margin-bottom: 16px; }
        .modal-title { font-size: 18px; font-weight: 700; margin: 0 0 10px; color: #111827; }
        .modal-text  { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 24px; }
        .modal-actions { display: flex; gap: 12px; justify-content: center; }

        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-title    { font-size: 22px; font-weight: 800; color: #111827; margin: 0; }
        .page-subtitle { font-size: 13px; color: #9ca3af; margin: 4px 0 0; }

        /* Alert */
        .alert {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

        /* Buttons */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all .18s ease;
          white-space: nowrap;
        }
        .btn:disabled { opacity: .6; cursor: not-allowed; }
        .btn-primary   { background: #1d4ed8; color: #fff; }
        .btn-primary:hover:not(:disabled)  { background: #1e40af; }
        .btn-secondary { background: #f3f4f6; color: #374151; }
        .btn-secondary:hover:not(:disabled){ background: #e5e7eb; }
        .btn-danger    { background: #ef4444; color: #fff; }
        .btn-danger:hover:not(:disabled)   { background: #dc2626; }

        /* Spinner */
        .spinner-sm {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Skeleton */
        .table-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .skeleton-table { padding: 0 24px; }
        .skeleton-row {
          display: flex; align-items: center; gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .skeleton { background: #f3f4f6; border-radius: 6px; animation: shimmer 1.4s ease-in-out infinite; }
        @keyframes shimmer {
          0%,100% { opacity: 1; }
          50%      { opacity: .5; }
        }
        .skeleton-img     { width: 52px; height: 40px; border-radius: 6px; flex-shrink: 0; }
        .skeleton-info    { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .skeleton-title   { height: 14px; width: 55%; }
        .skeleton-sub     { height: 11px; width: 35%; }
        .skeleton-badge   { height: 22px; width: 70px; }
        .skeleton-actions { height: 28px; width: 90px; }

        /* Empty */
        .empty-state {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 72px 32px;
          text-align: center;
        }
        .empty-icon  { color: #d1d5db; margin-bottom: 16px; }
        .empty-title { font-size: 17px; font-weight: 700; color: #374151; margin: 0 0 8px; }
        .empty-text  { font-size: 14px; color: #9ca3af; margin: 0 0 24px; }

        /* Table */
        .table-responsive { overflow-x: auto; }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .data-table thead tr { border-bottom: 1px solid #e5e7eb; }
        .data-table th {
          padding: 13px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: .04em;
          background: #f9fafb;
          white-space: nowrap;
        }
        .data-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .data-table tbody tr:last-child td { border-bottom: none; }
        .data-table tbody tr:hover td { background: #f9fafb; }
        .text-center { text-align: center !important; }
        .text-right  { text-align: right  !important; }

        /* Service cell */
        .service-cell {
          display: flex; align-items: center; gap: 12px;
        }
        .service-thumb {
          width: 52px; height: 38px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          background: #f3f4f6;
          position: relative;
        }
        .service-thumb img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .thumb-placeholder {
          width: 100%; height: 100%;
          align-items: center; justify-content: center;
          color: #d1d5db;
        }
        .service-name     { display: block; font-weight: 600; color: #111827; }
        .service-subtitle { display: block; font-size: 12px; color: #9ca3af; margin-top: 2px; }

        /* Badges */
        .slug-badge {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 9px;
          border-radius: 5px;
          font-size: 12px;
          font-family: 'Courier New', monospace;
        }
        .count-badge {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-badge {
          border: none; cursor: pointer;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          transition: opacity .15s;
        }
        .status-badge:hover  { opacity: .8; }
        .status-active   { background: #dcfce7; color: #166534; }
        .status-inactive { background: #fee2e2; color: #991b1b; }

        /* Action buttons */
        .action-btns {
          display: flex; align-items: center; gap: 6px;
          justify-content: flex-end;
        }
        .icon-btn {
          width: 32px; height: 32px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 7px;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          transition: all .15s;
          text-decoration: none;
          color: #6b7280;
        }
        .icon-btn:hover { border-color: transparent; }
        .icon-btn-view:hover   { background: #eff6ff; color: #1d4ed8; }
        .icon-btn-edit:hover   { background: #fef9c3; color: #854d0e; }
        .icon-btn-delete:hover { background: #fee2e2; color: #991b1b; }
      `}</style>
    </div>
  );
};

export default ServiceManager;