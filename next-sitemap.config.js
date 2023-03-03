module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000/',
    generatedRobotsTxt: true,
    sitemapFileName: 'sitemap.xml',
    generateIndexSitemap: false,

    // sitemap: [
    //     {
    //         path: '/sitemap.xml',
    //         exclude: ['/admin/**'],
    //         routes: async () => {
    //             let routes = ['/'];
    //             // const response = await fetch('http://localhost:3000/api/your-endpoint');
    //             // const data = await response.json();
    //             // data.forEach((item) => {
    //             //     routes.push(`/blog/${item.slug}`);
    //             // });
    //             // Add your additional pages here
    //             routes.push('/auth/login');
    //             routes.push('/auth/login/forget-password');
    //             routes.push('/chat');
    //             routes.push('/dashboard');
    //             return routes;
    //         },
    //     },
    // ],
}