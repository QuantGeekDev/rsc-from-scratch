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
      <nav class="links">
      <h1 class="main-header"> <a href="/"> The Best Recipe Site </a> </h1>
          <a href="/">🔙 Back to Recipes</a>
          <hr />
        </nav>
        </header>
        ${content}
      </body>
    </html>`;
};

export default generateRecipeLayout;
