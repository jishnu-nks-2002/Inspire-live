import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── Initial blank state ──────────────────────────────────────────────────────
const blankForm = {
  title: "",
  slug: "",
  subtitle: "",
  description1: "",
  description2: "",
  keyFeatures: [""],
  whyChooseHeading: "",
  whyChooseText: "",
  benefits: [{ number: "01", title: "", description: "" }],
  faqs: [{ question: "", answer: "" }],
  order: 0,
  isActive: true,
};

// ─── Slugify helper ───────────────────────────────────────────────────────────
const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const ServiceForm = () => {
  const { api } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // present when editing
  const isEdit = Boolean(id);

  // ─── State ────────────────────────────────────────────────────────────────
  const [form, setForm] = useState(blankForm);
  const [images, setImages] = useState({
    heroImage: null,
    detailImage1: null,
    detailImage2: null,
  });
  const [previews, setPreviews] = useState({
    heroImage: "",
    detailImage1: "",
    detailImage2: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const heroRef = useRef();
  const detail1Ref = useRef();
  const detail2Ref = useRef();

  // ─── Load existing data when editing ─────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await api.get("/services/" + id);
        const s = res.data.data;
        setForm({
          title: s.title || "",
          slug: s.slug || "",
          subtitle: s.subtitle || "",
          description1: s.description1 || "",
          description2: s.description2 || "",
          keyFeatures: s.keyFeatures?.length ? s.keyFeatures : [""],
          whyChooseHeading: s.whyChooseHeading || "",
          whyChooseText: s.whyChooseText || "",
          benefits: s.benefits?.length
            ? s.benefits
            : [{ number: "01", title: "", description: "" }],
          faqs: s.faqs?.length ? s.faqs : [{ question: "", answer: "" }],
          order: s.order ?? 0,
          isActive: s.isActive ?? true,
        });
        setPreviews({
          heroImage: s.heroImage || "",
          detailImage1: s.detailImage1 || "",
          detailImage2: s.detailImage2 || "",
        });
        setSlugManual(true); // don't auto-overwrite slug on edit
      } catch (err) {
        setError("Failed to load service data.");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit, api]);

  // ─── Field helpers ────────────────────────────────────────────────────────
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (val) => {
    set("title", val);
    if (!slugManual) set("slug", toSlug(val));
  };

  const handleSlugChange = (val) => {
    set("slug", toSlug(val));
    setSlugManual(true);
  };

  // ─── Image helpers ────────────────────────────────────────────────────────
  const handleImage = (field, file) => {
    if (!file) return;
    setImages((prev) => ({ ...prev, [field]: file }));
    setPreviews((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  const clearImage = (field, inputRef) => {
    setImages((prev) => ({ ...prev, [field]: null }));
    setPreviews((prev) => ({ ...prev, [field]: "" }));
    if (inputRef.current) inputRef.current.value = "";
  };

  // ─── Dynamic list helpers ─────────────────────────────────────────────────
  const addFeature = () => set("keyFeatures", [...form.keyFeatures, ""]);
  const removeFeature = (i) =>
    set("keyFeatures", form.keyFeatures.filter((_, idx) => idx !== i));
  const updateFeature = (i, val) => {
    const arr = [...form.keyFeatures];
    arr[i] = val;
    set("keyFeatures", arr);
  };

  const addBenefit = () =>
    set("benefits", [
      ...form.benefits,
      {
        number: String(form.benefits.length + 1).padStart(2, "0"),
        title: "",
        description: "",
      },
    ]);
  const removeBenefit = (i) =>
    set("benefits", form.benefits.filter((_, idx) => idx !== i));
  const updateBenefit = (i, field, val) => {
    const arr = [...form.benefits];
    arr[i] = { ...arr[i], [field]: val };
    set("benefits", arr);
  };

  const addFaq = () => set("faqs", [...form.faqs, { question: "", answer: "" }]);
  const removeFaq = (i) =>
    set("faqs", form.faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i, field, val) => {
    const arr = [...form.faqs];
    arr[i] = { ...arr[i], [field]: val };
    set("faqs", arr);
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.slug.trim())  { setError("Slug is required."); return; }

    setLoading(true);
    try {
      const fd = new FormData();

      // Scalar fields
      fd.append("title",           form.title);
      fd.append("slug",            form.slug);
      fd.append("subtitle",        form.subtitle);
      fd.append("description1",    form.description1);
      fd.append("description2",    form.description2);
      fd.append("whyChooseHeading",form.whyChooseHeading);
      fd.append("whyChooseText",   form.whyChooseText);
      fd.append("order",           form.order);
      fd.append("isActive",        form.isActive);

      // Array / object fields as JSON
      fd.append("keyFeatures", JSON.stringify(form.keyFeatures.filter(Boolean)));
      fd.append("benefits",    JSON.stringify(form.benefits));
      fd.append("faqs",        JSON.stringify(form.faqs));

      // Images (only append if a new file was selected)
      if (images.heroImage)    fd.append("heroImage",    images.heroImage);
      if (images.detailImage1) fd.append("detailImage1", images.detailImage1);
      if (images.detailImage2) fd.append("detailImage2", images.detailImage2);

      if (isEdit) {
        await api.put("/services/" + id, fd);
      } else {
        await api.post("/services", fd);
      }

      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Loading state while fetching edit data ───────────────────────────────
  if (fetching) {
    return (
      <div className="sf-loading">
        <div className="sf-spinner"></div>
        <p>Loading service data…</p>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="sf-wrap">
      {/* Header */}
      <div className="sf-header">
        <div className="sf-header-left">
          <button className="sf-back-btn" onClick={() => navigate("/services")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <div>
            <h1 className="sf-title">{isEdit ? "Edit Service" : "Add New Service"}</h1>
            <p className="sf-subtitle">
              {isEdit ? "Update service details and content" : "Fill in the details for the new service"}
            </p>
          </div>
        </div>
        <div className="sf-header-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/services")}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-sm"></span> Saving…</>
            ) : isEdit ? (
              "Update Service"
            ) : (
              "Create Service"
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="sf-alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="sf-form">
        <div className="sf-grid">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="sf-col-main">

            {/* Basic Info */}
            <div className="sf-card">
              <h2 className="sf-card-title">Basic Information</h2>

              <div className="sf-field">
                <label className="sf-label">Title <span className="sf-required">*</span></label>
                <input
                  className="sf-input"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Continuous Mentorship Program"
                />
              </div>

              <div className="sf-field">
                <label className="sf-label">
                  Slug <span className="sf-required">*</span>
                  <span className="sf-label-hint">Used in URL: /services/your-slug</span>
                </label>
                <div className="sf-slug-wrap">
                  <span className="sf-slug-prefix">/services/</span>
                  <input
                    className="sf-input sf-slug-input"
                    value={form.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="your-service-slug"
                  />
                </div>
              </div>

              <div className="sf-field">
                <label className="sf-label">
                  Subtitle
                  <span className="sf-label-hint">Shown as the main heading on the detail page</span>
                </label>
                <input
                  className="sf-input"
                  value={form.subtitle}
                  onChange={(e) => set("subtitle", e.target.value)}
                  placeholder="e.g. Your dedicated research mentor from admission to graduation"
                />
              </div>

              <div className="sf-row-2">
                <div className="sf-field">
                  <label className="sf-label">Display Order</label>
                  <input
                    className="sf-input"
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="sf-field">
                  <label className="sf-label">Status</label>
                  <div className="sf-toggle-wrap">
                    <label className="sf-toggle">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => set("isActive", e.target.checked)}
                      />
                      <span className="sf-toggle-track"></span>
                    </label>
                    <span className="sf-toggle-label">
                      {form.isActive ? "Active (visible on site)" : "Inactive (hidden)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="sf-card">
              <h2 className="sf-card-title">Description</h2>
              <div className="sf-field">
                <label className="sf-label">Paragraph 1</label>
                <textarea
                  className="sf-textarea"
                  rows={4}
                  value={form.description1}
                  onChange={(e) => set("description1", e.target.value)}
                  placeholder="Main introductory paragraph about this service…"
                />
              </div>
              <div className="sf-field">
                <label className="sf-label">Paragraph 2</label>
                <textarea
                  className="sf-textarea"
                  rows={4}
                  value={form.description2}
                  onChange={(e) => set("description2", e.target.value)}
                  placeholder="Second paragraph with additional details…"
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="sf-card">
              <div className="sf-card-header">
                <h2 className="sf-card-title">Key Features</h2>
                <button type="button" className="sf-add-btn" onClick={addFeature}>
                  + Add Feature
                </button>
              </div>
              <div className="sf-list">
                {form.keyFeatures.map((feat, i) => (
                  <div key={i} className="sf-list-row">
                    <div className="sf-list-num">{i + 1}</div>
                    <input
                      className="sf-input"
                      value={feat}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      placeholder={"e.g. Personalized One-on-One Sessions"}
                    />
                    <button
                      type="button"
                      className="sf-remove-btn"
                      onClick={() => removeFeature(i)}
                      disabled={form.keyFeatures.length === 1}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose */}
            <div className="sf-card">
              <h2 className="sf-card-title">Why Choose Section</h2>
              <div className="sf-field">
                <label className="sf-label">Section Heading</label>
                <input
                  className="sf-input"
                  value={form.whyChooseHeading}
                  onChange={(e) => set("whyChooseHeading", e.target.value)}
                  placeholder="e.g. Why Choose Our Continuous Mentorship Program?"
                />
              </div>
              <div className="sf-field">
                <label className="sf-label">Section Text</label>
                <textarea
                  className="sf-textarea"
                  rows={4}
                  value={form.whyChooseText}
                  onChange={(e) => set("whyChooseText", e.target.value)}
                  placeholder="Compelling paragraph explaining why students should choose this service…"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="sf-card">
              <div className="sf-card-header">
                <h2 className="sf-card-title">Benefits (01, 02, 03…)</h2>
                <button type="button" className="sf-add-btn" onClick={addBenefit}>
                  + Add Benefit
                </button>
              </div>
              <div className="sf-benefit-list">
                {form.benefits.map((b, i) => (
                  <div key={i} className="sf-benefit-item">
                    <div className="sf-benefit-header">
                      <div className="sf-benefit-num">{b.number}</div>
                      <button
                        type="button"
                        className="sf-remove-btn"
                        onClick={() => removeBenefit(i)}
                        disabled={form.benefits.length === 1}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="sf-row-2">
                      <div className="sf-field">
                        <label className="sf-label">Number Label</label>
                        <input
                          className="sf-input"
                          value={b.number}
                          onChange={(e) => updateBenefit(i, "number", e.target.value)}
                          placeholder="01"
                        />
                      </div>
                      <div className="sf-field">
                        <label className="sf-label">
                          Title
                          <span className="sf-label-hint">Use &lt;br/&gt; for line break</span>
                        </label>
                        <input
                          className="sf-input"
                          value={b.title}
                          onChange={(e) => updateBenefit(i, "title", e.target.value)}
                          placeholder="e.g. End-to-End&lt;br/&gt;Support"
                        />
                      </div>
                    </div>
                    <div className="sf-field">
                      <label className="sf-label">Description</label>
                      <textarea
                        className="sf-textarea"
                        rows={3}
                        value={b.description}
                        onChange={(e) => updateBenefit(i, "description", e.target.value)}
                        placeholder="Describe this benefit in 1-2 sentences…"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="sf-card">
              <div className="sf-card-header">
                <h2 className="sf-card-title">Frequently Asked Questions</h2>
                <button type="button" className="sf-add-btn" onClick={addFaq}>
                  + Add FAQ
                </button>
              </div>
              <div className="sf-faq-list">
                {form.faqs.map((faq, i) => (
                  <div key={i} className="sf-faq-item">
                    <div className="sf-faq-num">Q{i + 1}</div>
                    <div className="sf-faq-body">
                      <div className="sf-field">
                        <label className="sf-label">Question</label>
                        <input
                          className="sf-input"
                          value={faq.question}
                          onChange={(e) => updateFaq(i, "question", e.target.value)}
                          placeholder="e.g. What does this service include?"
                        />
                      </div>
                      <div className="sf-field">
                        <label className="sf-label">Answer</label>
                        <textarea
                          className="sf-textarea"
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => updateFaq(i, "answer", e.target.value)}
                          placeholder="Provide a clear, helpful answer…"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="sf-remove-btn sf-remove-faq"
                      onClick={() => removeFaq(i)}
                      disabled={form.faqs.length === 1}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
          <div className="sf-col-side">

            {/* Images */}
            <div className="sf-card">
              <h2 className="sf-card-title">Images</h2>

              {[
                { field: "heroImage",    label: "Hero / Banner Image", ref: heroRef,    hint: "Displayed at top of page. Recommended: 1170×500px" },
                { field: "detailImage1", label: "Detail Image 1",      ref: detail1Ref, hint: "Left image in the detail section. 570×400px" },
                { field: "detailImage2", label: "Detail Image 2",      ref: detail2Ref, hint: "Right image in the detail section. 570×400px" },
              ].map(({ field, label, ref, hint }) => (
                <div key={field} className="sf-image-block">
                  <label className="sf-label">{label}</label>
                  <p className="sf-image-hint">{hint}</p>

                  {previews[field] ? (
                    <div className="sf-preview-wrap">
                      <img src={previews[field]} alt={label} className="sf-preview-img" />
                      <div className="sf-preview-actions">
                        <button
                          type="button"
                          className="sf-preview-change"
                          onClick={() => ref.current?.click()}
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          className="sf-preview-remove"
                          onClick={() => clearImage(field, ref)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="sf-dropzone"
                      onClick={() => ref.current?.click()}
                    >
                      <div className="sf-dropzone-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3 15l5-5 4 4 3-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        </svg>
                      </div>
                      <p className="sf-dropzone-text">Click to upload</p>
                      <p className="sf-dropzone-sub">JPG, PNG, WebP · Max 10MB</p>
                    </div>
                  )}

                  <input
                    ref={ref}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    style={{ display: "none" }}
                    onChange={(e) => handleImage(field, e.target.files[0])}
                  />
                </div>
              ))}
            </div>

            {/* Quick preview */}
            <div className="sf-card sf-preview-card">
              <h2 className="sf-card-title">URL Preview</h2>
              <div className="sf-url-preview">
                <span className="sf-url-base">yoursite.com/services/</span>
                <span className="sf-url-slug">{form.slug || "your-slug"}</span>
              </div>
              <div className="sf-meta-preview">
                <div className="sf-meta-row">
                  <span className="sf-meta-key">Title</span>
                  <span className="sf-meta-val">{form.title || "—"}</span>
                </div>
                <div className="sf-meta-row">
                  <span className="sf-meta-key">Features</span>
                  <span className="sf-meta-val">{form.keyFeatures.filter(Boolean).length}</span>
                </div>
                <div className="sf-meta-row">
                  <span className="sf-meta-key">Benefits</span>
                  <span className="sf-meta-val">{form.benefits.length}</span>
                </div>
                <div className="sf-meta-row">
                  <span className="sf-meta-key">FAQs</span>
                  <span className="sf-meta-val">{form.faqs.length}</span>
                </div>
                <div className="sf-meta-row">
                  <span className="sf-meta-key">Status</span>
                  <span className={"sf-meta-status " + (form.isActive ? "active" : "inactive")}>
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Save */}
        <div className="sf-footer">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/services")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <><span className="spinner-sm"></span> Saving…</>
            ) : isEdit ? (
              "Update Service"
            ) : (
              "Create Service"
            )}
          </button>
        </div>
      </form>

      {/* ── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        .sf-loading {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 320px; gap: 16px;
          color: #6b7280; font-size: 14px;
        }
        .sf-spinner {
          width: 36px; height: 36px;
          border: 3px solid #e5e7eb;
          border-top-color: #1d4ed8;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Header */
        .sf-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; flex-wrap: wrap; gap: 16px;
          margin-bottom: 24px;
        }
        .sf-header-left  { display: flex; align-items: flex-start; gap: 14px; }
        .sf-header-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .sf-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 7px;
          border: 1px solid #e5e7eb; background: #fff;
          color: #6b7280; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all .15s; white-space: nowrap;
          margin-top: 2px;
        }
        .sf-back-btn:hover { background: #f3f4f6; color: #374151; }
        .sf-title    { font-size: 22px; font-weight: 800; color: #111827; margin: 0; }
        .sf-subtitle { font-size: 13px; color: #9ca3af; margin: 4px 0 0; }

        /* Alert */
        .sf-alert {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 16px; border-radius: 8px; font-size: 14px;
          margin-bottom: 20px;
          background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;
        }

        /* Buttons */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 8px;
          font-size: 14px; font-weight: 600; border: none;
          cursor: pointer; transition: all .18s; white-space: nowrap;
        }
        .btn:disabled { opacity: .6; cursor: not-allowed; }
        .btn-primary   { background: #1d4ed8; color: #fff; }
        .btn-primary:hover:not(:disabled)   { background: #1e40af; }
        .btn-secondary { background: #f3f4f6; color: #374151; }
        .btn-secondary:hover:not(:disabled) { background: #e5e7eb; }
        .spinner-sm {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin .7s linear infinite; display: inline-block;
        }

        /* Grid layout */
        .sf-form  { display: flex; flex-direction: column; gap: 0; }
        .sf-grid  { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; }
        .sf-col-main { display: flex; flex-direction: column; gap: 20px; }
        .sf-col-side { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 20px; }
        @media (max-width: 900px) {
          .sf-grid { grid-template-columns: 1fr; }
          .sf-col-side { position: static; }
        }

        /* Card */
        .sf-card {
          background: #fff; border-radius: 12px;
          border: 1px solid #e5e7eb; padding: 22px;
        }
        .sf-card-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 18px;
        }
        .sf-card-title {
          font-size: 15px; font-weight: 700; color: #111827;
          margin: 0 0 18px;
        }
        .sf-card-header .sf-card-title { margin: 0; }

        /* Fields */
        .sf-field   { margin-bottom: 16px; }
        .sf-field:last-child { margin-bottom: 0; }
        .sf-label {
          display: block; margin-bottom: 6px;
          font-size: 13px; font-weight: 600; color: #374151;
        }
        .sf-required { color: #ef4444; margin-left: 2px; }
        .sf-label-hint {
          font-size: 11px; color: #9ca3af; font-weight: 400;
          margin-left: 8px;
        }
        .sf-input, .sf-textarea {
          width: 100%; padding: 10px 12px;
          border: 1px solid #e2e8f0; border-radius: 7px;
          font-size: 14px; color: #111827;
          background: #fff; outline: none;
          transition: border .15s, box-shadow .15s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .sf-input:focus, .sf-textarea:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 3px rgba(59,130,246,.1);
        }
        .sf-textarea { resize: vertical; line-height: 1.6; }
        .sf-row-2 {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* Slug */
        .sf-slug-wrap {
          display: flex; align-items: center;
          border: 1px solid #e2e8f0; border-radius: 7px;
          overflow: hidden;
          transition: border .15s, box-shadow .15s;
        }
        .sf-slug-wrap:focus-within {
          border-color: #93c5fd;
          box-shadow: 0 0 0 3px rgba(59,130,246,.1);
        }
        .sf-slug-prefix {
          padding: 10px 10px 10px 12px;
          background: #f3f4f6; color: #9ca3af;
          font-size: 13px; white-space: nowrap;
          border-right: 1px solid #e2e8f0;
        }
        .sf-slug-input {
          flex: 1; border: none !important;
          border-radius: 0 !important; box-shadow: none !important;
        }

        /* Toggle */
        .sf-toggle-wrap { display: flex; align-items: center; gap: 10px; padding: 10px 0; }
        .sf-toggle { position: relative; display: inline-block; width: 42px; height: 24px; cursor: pointer; }
        .sf-toggle input { opacity: 0; width: 0; height: 0; }
        .sf-toggle-track {
          position: absolute; inset: 0;
          background: #d1d5db; border-radius: 12px;
          transition: background .2s;
        }
        .sf-toggle-track::after {
          content: ""; position: absolute;
          top: 3px; left: 3px;
          width: 18px; height: 18px;
          background: #fff; border-radius: 50%;
          transition: transform .2s;
          box-shadow: 0 1px 3px rgba(0,0,0,.2);
        }
        .sf-toggle input:checked + .sf-toggle-track { background: #1d4ed8; }
        .sf-toggle input:checked + .sf-toggle-track::after { transform: translateX(18px); }
        .sf-toggle-label { font-size: 13px; color: #374151; }

        /* Add / Remove buttons */
        .sf-add-btn {
          padding: 6px 14px; border-radius: 6px;
          background: #eff6ff; color: #1d4ed8;
          border: 1px solid #bfdbfe;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all .15s; white-space: nowrap;
        }
        .sf-add-btn:hover { background: #dbeafe; }
        .sf-remove-btn {
          width: 30px; height: 30px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 6px; border: 1px solid #fecaca;
          background: #fff; color: #ef4444; cursor: pointer;
          transition: all .15s;
        }
        .sf-remove-btn:hover:not(:disabled) { background: #fee2e2; }
        .sf-remove-btn:disabled { opacity: .3; cursor: not-allowed; }

        /* Key features list */
        .sf-list { display: flex; flex-direction: column; gap: 10px; }
        .sf-list-row {
          display: flex; align-items: center; gap: 10px;
        }
        .sf-list-num {
          width: 26px; height: 26px; flex-shrink: 0;
          background: #eff6ff; color: #1d4ed8;
          border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
        }

        /* Benefits */
        .sf-benefit-list { display: flex; flex-direction: column; gap: 16px; }
        .sf-benefit-item {
          border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 16px; background: #fafafa;
        }
        .sf-benefit-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 14px;
        }
        .sf-benefit-num {
          width: 36px; height: 36px;
          background: #1d4ed8; color: #fff;
          border-radius: 8px; display: flex;
          align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800;
        }

        /* FAQs */
        .sf-faq-list { display: flex; flex-direction: column; gap: 16px; }
        .sf-faq-item {
          display: flex; gap: 12px;
          border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 16px; background: #fafafa;
          position: relative;
        }
        .sf-faq-num {
          width: 32px; height: 32px; flex-shrink: 0;
          background: #f3f4f6; color: #6b7280;
          border-radius: 7px; display: flex;
          align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; margin-top: 2px;
        }
        .sf-faq-body { flex: 1; }
        .sf-remove-faq {
          position: absolute; top: 12px; right: 12px;
        }

        /* Images */
        .sf-image-block { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6; }
        .sf-image-block:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .sf-image-hint { font-size: 11px; color: #9ca3af; margin: 3px 0 10px; }
        .sf-dropzone {
          border: 2px dashed #e2e8f0; border-radius: 9px;
          padding: 24px 16px; text-align: center;
          cursor: pointer; transition: all .15s;
          background: #fafafa;
        }
        .sf-dropzone:hover { border-color: #93c5fd; background: #eff6ff; }
        .sf-dropzone-icon { color: #d1d5db; margin-bottom: 8px; }
        .sf-dropzone:hover .sf-dropzone-icon { color: #60a5fa; }
        .sf-dropzone-text { font-size: 13px; font-weight: 600; color: #374151; margin: 0 0 4px; }
        .sf-dropzone-sub  { font-size: 11px; color: #9ca3af; margin: 0; }
        .sf-preview-wrap { position: relative; border-radius: 9px; overflow: hidden; }
        .sf-preview-img  { width: 100%; height: 120px; object-fit: cover; display: block; }
        .sf-preview-actions {
          display: flex; gap: 8px; margin-top: 8px;
        }
        .sf-preview-change, .sf-preview-remove {
          flex: 1; padding: 7px; border-radius: 6px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          border: 1px solid #e5e7eb; transition: all .15s;
        }
        .sf-preview-change { background: #fff; color: #374151; }
        .sf-preview-change:hover { background: #f3f4f6; }
        .sf-preview-remove { background: #fff; color: #ef4444; border-color: #fecaca; }
        .sf-preview-remove:hover { background: #fee2e2; }

        /* URL preview card */
        .sf-url-preview {
          background: #f3f4f6; border-radius: 7px;
          padding: 10px 13px; font-size: 13px;
          margin-bottom: 16px; word-break: break-all;
        }
        .sf-url-base { color: #9ca3af; }
        .sf-url-slug { color: #1d4ed8; font-weight: 700; }
        .sf-meta-preview { display: flex; flex-direction: column; gap: 10px; }
        .sf-meta-row {
          display: flex; justify-content: space-between;
          align-items: center; font-size: 13px;
        }
        .sf-meta-key { color: #9ca3af; }
        .sf-meta-val { font-weight: 600; color: #374151; }
        .sf-meta-status {
          padding: 3px 10px; border-radius: 20px;
          font-size: 12px; font-weight: 600;
        }
        .sf-meta-status.active   { background: #dcfce7; color: #166534; }
        .sf-meta-status.inactive { background: #fee2e2; color: #991b1b; }

        /* Footer */
        .sf-footer {
          display: flex; justify-content: flex-end; gap: 12px;
          margin-top: 28px; padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default ServiceForm;