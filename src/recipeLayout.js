const generateRecipeLayout = (content) => {
  return `<html>
      <head>
        <title>Server-Side Recipes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./styles.css">
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
        <meta desc="Testing Server Side rendering with a recipe page">
      </head>
      <body>
      <header>
      <span class="main-header"> The Best Recipe Site </span>
        <nav class="links">
          <a href="/">Back to Recipes</a>
          <hr />
        </nav>
        </header>
        ${content}
      </body>
    </html>`;
};

export default generateRecipeLayout;
