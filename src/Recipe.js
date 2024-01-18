import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

class Recipe {
  name;
  content;
  author = "Alex Andru";

  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.name = this.extractRecipeName(pathToFile);
    this.content = (async () => await this.getRecipeTextContent(pathToFile))();
  }

  extractRecipeName = () => this.pathToFile.split("/")[2].split(".")[0];

  getRecipeTextContent = async () => {
    const encoding = "utf8";
    this.content = await readFile(this.pathToFile, encoding);
    return this.content;
  };

  generateHtml = async () => `<article class="recipe">
        <h1 class="recipe__title"> ${this.name} recipe</h1>
        <p>
          ${escapeHtml(await this.content)}
        </p>
          </article>
        <footer>
          <hr>
          <p><i> ${escapeHtml(
            this.author
          )}</i>,  Time from Epoch <i>(in case you were wondering)</i>: ${new Date().getTime()}</p>
        </footer>`;
}

export default Recipe;
