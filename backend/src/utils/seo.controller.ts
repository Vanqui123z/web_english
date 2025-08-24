import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class SeoController {
  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  getRobots() {
    return `User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml`;
  }

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  getSitemap() {
    return `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://yourdomain.com/</loc></url>
        <url><loc>https://yourdomain.com/courses</loc></url>
      </urlset>
    `;
  }
}
