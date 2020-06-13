//diretório root
const  path = require("path");

// Módulo interno para ler arquivos
const { readFile } = require('fs');

// Módulo para converter callback para promise
const { promisify } = require('util');

//conversão da callback para promise
const readFileAsync = promisify(readFile);

class Project {
  constructor() {
    // o dirname para adicionar o caminho para o arquivo
    this.PROJECTS_FILE = path.join(__dirname,'../database/projects.json');
  }

  async getProjects() {
    const projects = await readFileAsync(this.PROJECTS_FILE, 'utf8');
    return JSON.parse(projects.toString());
  }

  create() {}
  async read(id) {
    const projects = await this.getProjects();
    const dataFilter = projects.filter((item) => (id ? item.id === id : true));
    return dataFilter;
  }
}
module.exports = new Project();
