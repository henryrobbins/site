/**
 * Hand-picked entries shown on the index, in the order they appear.
 *
 * The index is curated rather than a window onto the newest entries, so these
 * lists are maintained by hand and reference content-collection ids.
 */
export const selectedWork: {
  collection: "projects" | "research";
  id: string;
}[] = [
  { collection: "research", id: "2026-06-01-flare" },
  { collection: "projects", id: "2026-08-21-formulation-bench" },
  { collection: "projects", id: "2026-03-08-showcount" },
  { collection: "projects", id: "2020-12-01-gilp" },
];

export const selectedArtwork: string[] = [
  "2022-08-13-weave",
  "2022-01-06-memory",
  "2021-12-19-composite",
];
