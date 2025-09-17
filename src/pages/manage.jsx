// ManageNewsletters.jsx
import React, { useState } from "react";
import { useNewsletterStore } from "../components/store";
import EmailPreview from "../components/emailPreview";

export default function ManageNewsletters() {
  const { savedNewsletters, loadNewsletter, deleteNewsletter } =
    useNewsletterStore();
  const [selectedDraft, setSelectedDraft] = useState(null);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">📂 Saved Newsletters</h2>

      {savedNewsletters.length === 0 && (
        <p className="text-gray-600">No drafts saved yet.</p>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedNewsletters.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border border-gray-200"
          >
            {/* Subject */}
            <h3
              className="font-semibold truncate"
              style={{ fontSize: n.subjectFontSize }}
            >
              {n.subject}
            </h3>

            {/* Template Tag */}
            <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {n.template || "Default"}
            </span>

            {/* Date + Time */}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(n.id).toLocaleDateString()}{" "}
              {new Date(n.id).toLocaleTimeString()}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedDraft(n)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Preview
              </button>
              <button
                onClick={() => loadNewsletter(n.id)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                Load
              </button>
              <button
                onClick={() => deleteNewsletter(n.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Preview */}
      {selectedDraft && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">
          <div className="w-full sm:w-[500px] bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Preview</h3>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setSelectedDraft(null)}
              >
                ✕
              </button>
            </div>

            <EmailPreview
              subject={selectedDraft.subject}
              subjectFontSize={selectedDraft.subjectFontSize}
              sections={selectedDraft.sections}
              template={selectedDraft.template}
            />
          </div>
        </div>
      )}
    </div>
  );
}
