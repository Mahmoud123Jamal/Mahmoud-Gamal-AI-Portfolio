import {
  AsteriskIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  ProjectsIcon,
  RocketIcon,
  TagIcon,
  UserIcon,
  BlockContentIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // ------------------------------------
      // PROFILE (Singleton)
      // ------------------------------------
      S.listItem()
        .title("Profile")
        .icon(UserIcon)
        .child(
          S.document().schemaType("profile").documentId("singleton-profile")
        ),

      S.divider(),

      // ------------------------------------
      // PORTFOLIO SECTION
      // ------------------------------------
      S.listItem()
        .title("Portfolio")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Portfolio Content")
            .items([
              S.listItem()
                .title("Projects")
                .icon(ProjectsIcon)
                .schemaType("project")
                .child(S.documentTypeList("project").title("Projects")),

              S.listItem()
                .title("Skills")
                .icon(AsteriskIcon)
                .schemaType("skill")
                .child(S.documentTypeList("skill").title("Skills")),

              S.listItem()
                .title("Services")
                .icon(TagIcon)
                .schemaType("service")
                .child(S.documentTypeList("service").title("Services")),
            ])
        ),

      S.divider(),

      // ------------------------------------
      // PROFESSIONAL BACKGROUND
      // ------------------------------------
      S.listItem()
        .title("Professional Background")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Professional Background")
            .items([
              S.listItem()
                .title("Education")
                .icon(BookIcon)
                .schemaType("education")
                .child(S.documentTypeList("education").title("Education")),
            ])
        ),

      S.divider(),

      // ------------------------------------
      // CONTACT
      // ------------------------------------
      S.listItem()
        .title("Contact Form Submissions")
        .icon(DocumentsIcon)
        .schemaType("contact")
        .child(S.documentTypeList("contact").title("Contact Messages")),

      S.divider(),

      // ------------------------------------
      // NAVIGATION & FOOTER (Global UI)
      // ------------------------------------
      S.listItem()
        .title("Navigation Links")
        .icon(DocumentsIcon)
        .schemaType("navigation")
        .child(S.documentTypeList("navigation").title("Navigation Links")),

      // Added Footer Singleton here
      S.listItem()
        .title("Footer Settings")
        .icon(BlockContentIcon)
        .child(
          S.document().schemaType("footer").documentId("singleton-footer")
        ),

      S.divider(),

      // ------------------------------------
      // SITE SETTINGS (Singleton)
      // ------------------------------------
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("singleton-siteSettings")
        ),
    ]);
