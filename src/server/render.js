import { Helmet } from "react-helmet";

const isProdMode = process.env.NODE_ENV === "production" || false;

const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

export default function renderTemplate (initialView, initialState, bundles) {
  const head = Helmet.renderStatic();

  return (
    `
    <!DOCTYPE html>
    <html>
    <head>
      ${head.base.toString()}
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${head.script.toString()}

      <link rel="stylesheet" href="${isProdMode ? assetsManifest['/styles.css'] : '/styles.css'}" />
    </head>
    <body>
      <div id="root">${initialView}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
        ${isProdMode ?
        `//<![CDATA[
        window.webpackManifest = ${JSON.stringify(chunkManifest)};
        //]]>` : ""}
      </script>
      <script src="${isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js'}"></script>
      <script src="${isProdMode ? assetsManifest['/app.js'] : '/app.js'}"></script>
      ${bundles.map((bundle) => {
        return `<script src="${isProdMode ? assetsManifest[bundle.file] : `/${bundle.file}`}"></script>`;
      }).join('\n')}
    </body>
    </html>
    `
  );
}
