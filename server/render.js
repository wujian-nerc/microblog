export default function renderTemplate (html, helmet) {
  return (
    `
    <!DOCTYPE html>
    <html>
    <head>
      ${helmet.base.toString()}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/vendor.js"></script>
      <script src="/app.js"></script>
    </body>
    </html>
    `
  );
}
