// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Google from "../assets/images/google-play-logo.webp";
import Footer from "../assets/images/google-play-footer.webp";

export const useNewsletterStore = create(
  persist(
    (set) => ({
      // --------- Newsletter state ----------
      subject: "Developer Update",
      subjectFontSize: "24px",
      sections: [
        {
          id: 1,
          content: "Hello Google Play Developer,",
          image: Google,
          fontSize: "14px",
          align: "left",
          bold: false,
          imgWidth: "20%",
          imgAlign: "left",
          padding: "10px",
        },
        {
          id: 2,
          content:
            "We strive to make Google Play a safe and trusted experience for users.",
          image: null,
          fontSize: "14px",
          align: "left",
          bold: false,
          imgWidth: "100%",
          imgAlign: "center",
          padding: "0px",
        },
        {
          id: 3,
          content:
            "Welcome to Marketbase! Marketbase is how teams within fast growing marketplaces effortlessly monitor conversations to prevent disintermediation, identify problematic users, and increase trust & safety within their community.",
          image: null,
          fontSize: "14px",
          align: "left",
          bold: false,
          imgWidth: "100%",
          imgAlign: "left",
          padding: "0px",
        },
        {
          id: 4,
          content:
            "We’re also extending the deadline to give you more time to adjust to these changes. Now, apps that target API level 29 or below will start experiencing reduced distribution starting Jan 31, 2023 instead of Nov 1, 2022. If you need more time to update your app, you can request an extension to keep your app discoverable to all users until May 1, 2023.",
          image: null,
          fontSize: "14px",
          align: "left",
          bold: false,
          imgWidth: "20%",
          padding: "0px",
          imgAlign: "center",
        },
        {
          id: 5,
          content:
            "Best of all, you can connect your existing messaging services in minutes: Slack, Discord, Telegram, WhatsApp, Email, SMS, and more.",
          image: Footer,
          fontSize: "14px",
          align: "left",
          bold: false,
          imgWidth: "90%",
          padding: "0px",
          imgAlign: "center",
        },
      ],
      template: "default",

      // --------- Actions ----------
      setSubject: (subject) => set({ subject }),
      setSubjectFontSize: (size) => set({ subjectFontSize: size }),
      setTemplate: (template) => set({ template }),

      updateSection: (id, updates) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      addSection: () =>
        set((state) => ({
          sections: [
            ...state.sections,
            {
              id: Date.now(),
              content: "New section...",
              image: null,
              fontSize: "14px",
              align: "left",
              bold: false,
              imgWidth: "100%",
              imgAlign: "left",
              padding: "0px",
            },
          ],
        })),

      removeSection: (id) =>
        set((state) => ({
          sections: state.sections.filter((s) => s.id !== id),
        })),

      // --------- Draft Management ----------
      savedNewsletters: [],

      saveNewsletter: (name) =>
        set((state) => {
          if (!name) return {}; // avoid saving without a name
          const now = new Date();
          const newDraft = {
            id: Date.now(),
            name, // ✅ draft name
            subject: state.subject,
            subjectFontSize: state.subjectFontSize,
            sections: state.sections,
            template: state.template,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return { savedNewsletters: [...state.savedNewsletters, newDraft] };
        }),

      loadNewsletter: (id) =>
        set((state) => {
          const draft = state.savedNewsletters.find((n) => n.id === id);
          if (!draft) return {};
          return {
            subject: draft.subject,
            subjectFontSize: draft.subjectFontSize,
            sections: draft.sections,
            template: draft.template,
          };
        }),

      deleteNewsletter: (id) =>
        set((state) => ({
          savedNewsletters: state.savedNewsletters.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "newsletter-storage", // key in localStorage
    }
  )
);
