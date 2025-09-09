import Generator from "yeoman-generator";

export default class CreateLibGenerator extends Generator {
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Library name:",
        default: this.appname.replace(/\s+/g, "-"),
      },
    ]);
    this.name = answers.name;
  }

  writing() {
    const name = this.name;
    this.fs.copyTpl(this.templatePath("package.json.ejs"), this.destinationPath(`${name}/package.json`), { name });
    this.fs.copyTpl(this.templatePath("README.md.ejs"), this.destinationPath(`${name}/README.md`), { name });
    this.fs.copyTpl(this.templatePath("eslint.config.js.ejs"), this.destinationPath(`${name}/eslint.config.js`), { name });
    this.fs.copyTpl(this.templatePath("tsconfig.json.ejs"), this.destinationPath(`${name}/tsconfig.json`), { name });
    this.fs.copy(this.templatePath(".gitignore.ejs"), this.destinationPath(`${name}/.gitignore`));
    this.fs.copyTpl(this.templatePath("index.ts.ejs"), this.destinationPath(`${name}/index.ts`), { name });
    this.fs.copyTpl(this.templatePath("src/index.ts.ejs"), this.destinationPath(`${name}/src/index.ts`), { name });
  }

  end() {
    this.log(`Library scaffold '${this.name}' created.`);
  }
}
