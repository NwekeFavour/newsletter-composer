import React, { useState } from "react";
import { useNewsletterStore } from "./store";
import EmailPreview from "./emailPreview";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const {
    subject,
    subjectFontSize,
    sections,
    setSubject,
    setSubjectFontSize,
    updateSection,
    addSection,
    removeSection,
    template,
    setTemplate,
    saveNewsletter,
    deleteNewsletter,
    savedNewsletters,
  } = useNewsletterStore();

  const [previewMode, setPreviewMode] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [previewDraft, setPreviewDraft] = useState(null); // 👈 drawer preview

  // Handle image upload
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection(id, { image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar editor */}
      <div className="w-full lg:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Newsletter Editor</h2>

        {/* Subject + font size */}
        <label className="block mb-2 font-medium">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        {!previewMode && (
          <div className="flex items-center gap-2 mb-6">
            <label className="text-sm">Font Size:</label>
            <select
              value={subjectFontSize}
              onChange={(e) => setSubjectFontSize(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="18px">Small</option>
              <option value="24px">Normal</option>
              <option value="32px">Large</option>
              <option value="40px">XL</option>
            </select>
          </div>
        )}

        {/* Section Editor */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Content editing */}
            <textarea
              rows="3"
              value={section.content}
              onChange={(e) =>
                updateSection(section.id, { content: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
              disabled={previewMode}
            />

            {/* Controls */}
            {!previewMode && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <select
                  value={section.fontSize}
                  onChange={(e) =>
                    updateSection(section.id, { fontSize: e.target.value })
                  }
                  className="border p-1 rounded"
                >
                  <option value="12px">Small</option>
                  <option value="14px">Normal</option>
                  <option value="18px">Large</option>
                  <option value="24px">XL</option>
                </select>

                <select
                  value={section.align}
                  onChange={(e) =>
                    updateSection(section.id, { align: e.target.value })
                  }
                  className="border p-1 rounded"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>

                <button
                  onClick={() =>
                    updateSection(section.id, { bold: !section.bold })
                  }
                  className={`px-2 py-1 rounded border ${
                    section.bold ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  B
                </button>
              </div>
            )}

            {/* Padding control */}
            <div className="flex items-center gap-2 my-5">
              <div>
                <label className="text-sm">Padding: </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={parseInt(section.padding)}
                  onChange={(e) =>
                    updateSection(section.id, {
                      padding: `${e.target.value}px`,
                    })
                  }
                  className="w-16 border p-1 rounded"
                />
                <span className="text-sm"> px</span>
              </div>
            </div>

            {/* Image Upload + Preview */}
            {section.image && (
              <div className="mb-3">
                <img
                  src={section.image}
                  alt="uploaded"
                  className="rounded mx-auto"
                  style={{
                    width: section.imgWidth,
                    display: "block",
                    marginLeft: section.imgAlign === "left" ? "0" : "auto",
                    marginRight: section.imgAlign === "right" ? "0" : "auto",
                  }}
                />
                {!previewMode && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {/* Width Control */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={parseInt(section.imgWidth)}
                        onChange={(e) =>
                          updateSection(section.id, {
                            imgWidth: `${e.target.value}%`,
                          })
                        }
                        className="w-24"
                      />
                      <span className="text-sm">{section.imgWidth}</span>
                    </div>

                    {/* Position Control */}
                    <select
                      value={section.imgAlign}
                      onChange={(e) =>
                        updateSection(section.id, { imgAlign: e.target.value })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {!previewMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, section.id)}
                className="mb-2 flex gap-2 border-1 w-1/2 border-blue-950/90 px-3 py-2"
              />
            )}

            {!previewMode && (
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove Section
              </button>
            )}
          </div>
        ))}

        {!previewMode && (
          <button
            onClick={addSection}
            className="bg-green-500 mr-3 text-white px-4 py-2 rounded"
          >
            + Add Section
          </button>
        )}

        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="ml-0 md:ml-4 mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {previewMode ? "Edit Mode" : "Preview Mode"}
        </button>

        {/* Draft Actions */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Drafts</h3>
          <input
            type="text"
            placeholder="Draft name"
            value={draftName}
            required
            onChange={(e) => setDraftName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={() => {
              saveNewsletter(draftName);
              setDraftName("");
            }}
            className="bg-purple-500 text-white px-4 py-2 rounded mb-3 w-full"
          >
            Save Current as Draft
          </button>

          {savedNewsletters.length === 0 && (
            <p className="text-sm text-gray-500">No drafts yet.</p>
          )}

          {savedNewsletters.map((draft) => (
            <div
              key={draft.id}
              className="flex flex-col border rounded p-2 mb-2 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black">{draft.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewDraft(draft)}
                    className="text-blue-500 text-sm"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteNewsletter(draft.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {draft.date} • {draft.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4 m-0">Live Preview</h2>
            </div>
            <div>
                <Link className="capitalize underline text-blue-400" to={"/manage"}>go to manage newsletters</Link>
            </div>
        </div>
        
        <label className="block mt-6 mb-2 font-medium">Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          disabled={previewMode}
        >
          <option value="default">Default</option>
          <option value="newsletter">Newsletter</option>
        </select>
        <EmailPreview forEmail={previewMode} />

      </div>

      {/* Drawer for previewing a draft */}
      {previewDraft && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="w-full md:w-1/2 bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Preview: {previewDraft.name}</h3>
              <button
                onClick={() => setPreviewDraft(null)}
                className="text-red-500 font-semibold"
              >
                Close
              </button>
            </div>

            {/* Draft preview */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h3
                style={{ fontSize: previewDraft.subjectFontSize }}
                className="text-blue-600 font-bold mb-4"
              >
                {previewDraft.subject}
              </h3>
              {previewDraft.sections.map((s) => (
                <div key={s.id} className="mb-6">
                  <p
                    style={{
                      fontSize: s.fontSize,
                      textAlign: s.align,
                      fontWeight: s.bold ? "bold" : "normal",
                      padding: s.padding,
                    }}
                    className="text-gray-700"
                  >
                    {s.content}
                  </p>
                  {s.image && (
                    <img
                      src={s.image}
                      alt="section"
                      className="rounded mt-2"
                      style={{
                        width: s.imgWidth,
                        display: "block",
                        marginLeft: s.imgAlign === "left" ? "0" : "auto",
                        marginRight: s.imgAlign === "right" ? "0" : "auto",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
