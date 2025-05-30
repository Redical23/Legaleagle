/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.istockphoto.com"], // ✅ Add your external image host here
  },
  i18n: {
    locales: ['en', 'hi', 'ur'],
    defaultLocale: 'en',
  },
  };
  
  export default nextConfig;
  