// EmailPreview.jsx
import React from "react";
import { useNewsletterStore } from "./store";

export default function EmailPreview({ forEmail = false }) {
  const { subject, sections, subjectFontSize, template } = useNewsletterStore();

  // normalize font-size: allow "24px" or 24
  const normalizedSubjectSize =
    typeof subjectFontSize === "number"
      ? `${subjectFontSize}px`
      : subjectFontSize || "24px"; // fallback

  // -- Templates --
  const DefaultTemplate = () => (
    <div className="bg-white p-6 rounded shadow">
      <h3
        className="text-blue-600 font-bold mb-4 pb-4 border-b"
        style={{ fontSize: normalizedSubjectSize, lineHeight: 1.1 }}
      >
        {subject}
      </h3>

      {sections.map((s) => (
        <div key={s.id} className="mb-6" style={{ padding: s.padding || "0px" }}>
          <p
            style={{
              fontSize: s.fontSize || "14px",
              textAlign: s.align || "left",
              fontWeight: s.bold ? "bold" : "normal",
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
                width: s.imgWidth || "100%",
                display: "block",
                marginLeft: s.imgAlign === "left" ? "0" : "auto",
                marginRight: s.imgAlign === "right" ? "0" : "auto",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  const NewsletterTemplate = () => (
    <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-md overflow-hidden">
      <div
        className="text-white p-6  "
        style={{ backgroundColor: "#2b2d6e" }}
      >
        <h1
          style={{
            fontSize: normalizedSubjectSize,
            margin: 0,
            lineHeight: 1.05,
          }}
          className="font-bold "
        >
          {subject}
        </h1>
      </div>

      <div className="p-6">
        {sections.map((s) => (
          <div
            key={s.id}
            className="mb-6 pb-4"
            style={{ padding: s.padding || "0px" }}
          >
            <p
              style={{
                fontSize: s.fontSize || "14px",
                textAlign: s.align || "left",
                fontWeight: s.bold ? "bold" : "normal",
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
                  width: s.imgWidth || "100%",
                  margin: "auto",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        You’re receiving this email because you subscribed to our newsletter.
      </div>
    </div>
  );

  // choose template
  switch (template) {
    case "newsletter":
      return <NewsletterTemplate />;
    default:
      return <DefaultTemplate />;
  }
}
