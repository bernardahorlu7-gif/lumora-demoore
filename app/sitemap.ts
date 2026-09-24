import type { MetadataRoute } from 'next'

const routes = ['', '/about', '/services', '/projects', '/properties', '/quality', '/contact', '/proposal']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://lumorademoore.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
