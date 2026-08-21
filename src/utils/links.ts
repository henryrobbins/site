/**
 * Text link groups shown under a project or research entry.
 *
 * Only links the entry actually has are returned, in a fixed order so the
 * groups read consistently down a page.
 */
type Link = { href: string; label: string };

function collect(candidates: [string, string | undefined][]): Link[] {
  return candidates
    .filter(([, href]) => href)
    .map(([label, href]) => ({ label, href: href as string }));
}

export function projectLinks(data: {
  github?: string;
  website?: string;
}): Link[] {
  return collect([
    ["github", data.github],
    ["site", data.website],
  ]);
}

export function researchLinks(data: {
  paper?: string;
  github?: string;
  website?: string;
}): Link[] {
  return collect([
    ["paper", data.paper],
    ["github", data.github],
    ["site", data.website],
  ]);
}

/** Where a title links when the entry has no detail page of its own. */
export function primaryHref(data: {
  website?: string;
  github?: string;
  paper?: string;
}): string | undefined {
  return data.website ?? data.github ?? data.paper;
}
