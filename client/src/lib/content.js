// Synchronous getters for static portfolio content bundled into the client.
// These replace the former /api/* endpoints; sorting/filtering logic is
// ported from server/routes/*.js so consumers get identical data contracts.

import experienceData from '../data/experience.json'
import projectsData from '../data/projects.json'
import blogsData from '../data/blogs.json'
import linksData from '../data/links.json'
import npmPackagesData from '../data/npm-packages.json'

export function getExperience() {
  // Current jobs first, then by startDate descending.
  return [...experienceData].sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return b.startDate.localeCompare(a.startDate)
  })
}

/**
 * @param {boolean} all - if true, returns all projects (featured + non-featured).
 *                       if false/omitted, returns only featured projects.
 */
export function getProjects(all = false) {
  const source = all ? projectsData : projectsData.filter((p) => p.featured === true)
  return [...source].sort((a, b) => a.order - b.order)
}

/**
 * @param {boolean} all - if true, returns all blogs (featured + non-featured).
 *                       if false/omitted, returns only featured blogs.
 */
export function getBlogs(all = false) {
  const source = all ? blogsData : blogsData.filter((b) => b.featured === true)
  return [...source].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
}

export function getLinks() {
  return linksData
}

export function getNpmPackages() {
  return npmPackagesData
}
