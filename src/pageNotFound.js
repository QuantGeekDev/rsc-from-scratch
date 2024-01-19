export const pageNotFound = () =>
  `
<html>
      <head>
        <title> 404 - Server-Side Recipes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./styles.css">
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
        <meta desc="All your favorite recipes, but server-side">
      </head>
      <body>
      <header>
      <nav class="links">
      <h1 class="main-header"> <a href="/"> The Best Recipe Site </a> </h1>
          <a href="/">🔙 Back to Recipes</a>
          <hr />
        </nav>
        </header>
        <h1> 404 - Page Not Found :( </h1>
      </body>
    </html>
  `;
