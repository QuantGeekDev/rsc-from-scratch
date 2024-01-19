export const homePageLayout = (recipesListHtml) =>
  `<html>
      <head>
        <title>Server-Side Recipes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./styles.css">
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
        <meta desc="All your favorite recipes, but server-side">
      </head>
      <body>
      <header>
      <nav class="links">
      <h1 class="main-header"> <a href="/">The Best Recipe Site</a> </h1>
          <hr />
        </nav>
        </header>
        <main>
        ${recipesListHtml}
        </main>
      </body>
    </html>`;
