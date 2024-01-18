import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

class Recipe {
  name;
  content;
  folderName;
  author = "Alex Andru";

  constructor(folderDirectoryName) {
    this.parseFolderName(folderDirectoryName);
    this.name = this.parseRecipeName(folderDirectoryName);
    this.pathToFile = folderDirectoryName + "/index.txt";
    this.content = (async () =>
      await this.getRecipeTextContent(this.pathToFile))();
  }

  getFolderName = () => this.folderName;

  getFolderUrl = () => "/" + this.folderName;

  parseFolderName = (folderDirectoryName) =>
    (this.folderName = folderDirectoryName.split("/")[1]);

  setRecipeName = (recipeName) => (this.name = recipeName);

  getRecipeName = () => this.name;

  parseRecipeName = (folderName) =>
    (this.name = folderName.split("/")[1].split("-").join(" "));

  getRecipeTextContent = async () => {
    const encoding = "utf8";
    const content = await readFile(this.pathToFile, encoding);
    this.content = content;
    return this.content;
  };

  generateHtml = async () => `<article class="recipe">
        <h1 class="recipe__title"> ${this.getRecipeName()} recipe</h1>
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
