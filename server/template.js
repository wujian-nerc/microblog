export default function renderTemplate (html) {
  return (
    `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>microblog</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
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
