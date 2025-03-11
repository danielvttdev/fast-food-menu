// vite-plugin-version.js
export default function versionPlugin() {
  const timestamp = new Date().getTime();
  
  return {
    name: 'vite-plugin-version',
    transformIndexHtml(html) {
      // Add version parameter to all script and stylesheet links
      return html.replace(
        /(<script[^>]*src="[^"]+)(")[^>]*>/g, 
        `$1?v=${timestamp}$2>`
      ).replace(
        /(<link[^>]*href="[^"]+)(")[^>]*>/g, 
        `$1?v=${timestamp}$2>`
      );
    }
  };
}