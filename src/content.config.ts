import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const experienceCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiences" }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    start: z.date(),
    end: z.date(),
    role: z.string(),
    company: z.string(),
    projects: z.array(reference("projects")).optional(),
    github: z.string().optional(),
    github_link: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      date: z.date(),
      logo: z.object({ color: image(), dark: image() }),
      sponsors: z.array(z.string()).optional(),
      description: z.string(),
      github: z.string().optional(),
      website: z.string().optional(),
    }),
});

const researchCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      date: z.date(),
      authors: z.array(
        z.object({ name: z.string(), link: z.string().optional() }),
      ),
      venue: z.string(),
      image: image().optional(),
      description: z.string(),
      paper: z.string().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
      projects: z.array(reference("projects")).optional(),
    }),
});

export const exhibitionCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/exhibitions" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      year: z.number(),
      location: z.string(),
      featured: z.array(reference("artwork")),
      posters: z.array(image()),
      work: z.array(image()),
      thumbnail: image(),
    }),
});

export const artworkCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artwork" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      artist: z.string(),
      title: z.string(),
      date: z.date(),
      medium: z.string(),
      link: z.string().optional(),
      physical: z
        .record(
          z.string(),
          z.object({
            dimension: z.string(),
            path: image(),
          }),
        )
        .optional()
        .nullable(),
      images: z.record(z.string(), image()).optional().nullable(),
      videos: z.record(z.string(), z.number()).optional().nullable(),
    }),
});

export const collections = {
  experiences: experienceCollection,
  research: researchCollection,
  projects: projectCollection,
  exhibitions: exhibitionCollection,
  artwork: artworkCollection,
};
