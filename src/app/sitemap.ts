import { MetadataRoute } from 'next';
import { API_URL, APP_URL } from '@/constants/url.constants';

export async function getBlogs() {
   const response = await fetch(`${API_URL}/blog/blogs/`, {
      cache: 'no-store',
   });
   if (!response.ok) {
      throw new Error(
         `Ошибка запроса: ${response.status} ${response.statusText}`,
      );
   }
   const blog = await response.json();
   return blog;
}

export async function getPackages() {
   const response = await fetch(`${API_URL}/tour/packages/`, {
      cache: 'no-store',
   });
   if (!response.ok) {
      throw new Error(
         `Ошибка запроса: ${response.status} ${response.statusText}`,
      );
   }
   const blog = await response.json();
   return blog;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const blogs = await getBlogs();
   const packages = await getPackages();

   const blogUrls = blogs.map((blog: { id: string }) => ({
      url: `${APP_URL}/usefulinfo/${blog.id}`,
      lastModified: new Date().toISOString(),
   }));

   const packagesUrls = packages.map((blog: { id: string }) => ({
      url: `${APP_URL}/packages/${blog.id}`,
      lastModified: new Date().toISOString(),
   }));

   return [
      { url: `${APP_URL}/`, lastModified: new Date().toISOString() },
      { url: `${APP_URL}/lessons`, lastModified: new Date().toISOString() },
      { url: `${APP_URL}/aboutUs`, lastModified: new Date().toISOString() },
      { url: `${APP_URL}/gallery`, lastModified: new Date().toISOString() },
      { url: `${APP_URL}/packages`, lastModified: new Date().toISOString() },
      { url: `${APP_URL}/usefulinfo`, lastModified: new Date().toISOString() },
      { url: `${API_URL}/contact`, lastModified: new Date().toISOString() },
      ...blogUrls,
      ...packagesUrls,
   ];
}
