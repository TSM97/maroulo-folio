import { projects } from '@/data/projects'
import type { Project, ProjectCategory } from '@/types'

const allProjects: Project[] = [...projects].sort((a, b) => a.order - b.order)

const featured: Project[] = allProjects.filter((p) => p.featured)

const categories: ProjectCategory[] = [...new Set(allProjects.map((p) => p.category))]

function getBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}

/** Next project in order; wraps around to the first. */
function getNext(slug: string): Project | undefined {
  const index = allProjects.findIndex((p) => p.slug === slug)
  if (index === -1) return undefined
  return allProjects[(index + 1) % allProjects.length]
}

export function useProjects() {
  return { allProjects, featured, categories, getBySlug, getNext }
}
