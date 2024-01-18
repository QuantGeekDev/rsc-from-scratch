import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

class Recipe {
  name;
  content;
  author = "Alex Andru";

  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.name = this.extractRecipeName(pathToFile);
    this.content = (async () => await this.getRecipeContent(pathToFile))();
  }

  extractRecipeName = () => this.pathToFile.split("/")[2].split(".")[0];

  getRecipeContent = async () => {
    const encoding = "utf8";
    this.content = await readFile(this.pathToFile, encoding);
    return this.content;
  };

  generateHtml = async () => `<html>
      <head>
        <title>Server-Side Recipes</title>
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
        <article class="recipe">
        <h1 class="recipe"> ${this.name} recipe</h1>
        <p>
          ${escapeHtml(await this.content)}
        </p>
          </article>
        <footer>
          <hr>
          <p><i> ${escapeHtml(
            this.author
          )}</i>,  Time from Epoch <i>(in case you were wondering)</i>: ${new Date().getTime()}</p>
        </footer>
      </body>
    </html>`;
}

export default Recipe;
