export const pageNotFound = () =>
  `
<html>
      <head>
        <title> 404 - Server-Side Recipes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./styles.css">
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
        <meta desc="Testing Server Side rendering with a recipe page">
      </head>
      <body>
      <header>
      <span class="main-header"> Andru's Recipe Site </span>
        <nav>
        <ul class="links">
        <li>
          <a href="/">Recipes</a>
        </li>
        <li>
        <a href="/botifarra">Botifarra</a>
        </li>
          </ul>  
          <hr />
        </nav>
        </header>
        <h1> 404 - Page Not Found :( </h1>
      </body>
    </html>
  `;
