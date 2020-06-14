//diretório root
const path = require("path");

// Módulo interno para ler arquivos
const {
  readFile,
  writeFile
} = require("fs");

// Módulo para converter callback para promise
const {
  promisify
} = require("util");

//conversão da callback para promise
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Project {
  constructor() {
    // o dirname para adicionar o caminho para o arquivo
    this.PROJECTS_FILE = path.join(__dirname, "../database/projects.json");
  }

  async getProjects() {
    const projects = await readFileAsync(this.PROJECTS_FILE, "utf8");
    return JSON.parse(projects.toString());
  }

  async writeProject(dados) {
    await writeFileAsync(this.PROJECTS_FILE, JSON.stringify(dados));
    return true;
  }

  async create(project) {
    const data = await this.getProjects();
    const id = project.id <= 2 ? project.id : Date.now();
    //Concatenando o id no objeto projeto
    const projectId = {
      id,
      ...project,
    };
    const finalData = [...data, projectId];
    const result = await this.writeProject(finalData);
    return result;
  }

  async read(id) {
    const projects = await this.getProjects();
    const dataFilter = projects.filter((item) => (id ? item.id === id : true));
    return dataFilter;
  }
  async update(id, project) {
    const projects  = await this.getProjects();
    const index = projects.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw Error('O projeto não existe');
    }
    const currentProject = projects[index];
    const projectUpdate = {
      ...currentProject,
      ...project
    }
    projects.splice(index, 1);
    return await this.writeProject([
      ...projects,
      projectUpdate
    ]);
  }
  async delete(id) {
    if (!id) {
      return await this.writeProject([]);
    }
    const data = await this.getProjects()
    const index = data.findIndex(item => item.id === parseInt(id))
    if (index === -1) {
      throw Error('Error: Project not exist!')
    }
    data.splice(index, 1);
    return await this.writeProject(data);
  }
}
module.exports = new Project();