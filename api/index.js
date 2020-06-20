const Commander = require("commander");
const Project = require('./models/project')
const ServiceProject = require('./services/service-project');
var EventEmitter = require('events').EventEmitter;
var counter = 0;
async function main() {
  var em = new EventEmitter();
  
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Name of project")
    .option('-t, --tipo [value]', "Type of project")
    .option('-i, --id [value]', "Id of project")

    .option('-c, --create', "Create project")
    .option('-a, --all', "All project")
    .option('-d, --delete', "Delete project")
    .option('-u, --update [value]', "Update project")
    .parse(process.argv);
  const project = new Project(Commander)
  try {
    if (Commander.create) {
      delete project.id;
      const result = await ServiceProject.create(project);
      if (!result) {
        console.error('Projeto não foi cadastrado');
        return;
      }
      console.log('Projeto cadastrado com sucesso!');
    }
    if (Commander.all) {
      const result = await ServiceProject.getProjects();
      console.log(result);
      return;
    }
    if (Commander.delete) {
      const result = await ServiceProject.delete(project.id);
      if (!result) {
        console.error('Não foi possível deletar projeto');
        return;
      }
      console.log("Projeto deletado com sucesso!");
    }
    if(Commander.update){
      const idUpdate = parseInt(Commander.update);
      //remover chaves com undefined
      const dado = JSON.stringify(project);
      const projectUpdate = JSON.parse(dado);
      const result = await ServiceProject.update(idUpdate, projectUpdate);
      if (!result) {
        console.error('Não foi posível atualizar projeto');
        return;
      }
      console.log('Projeto atualizado com sucesso!')
    }
  } catch (error) {
    console.error('Failure System')
  }

}
main();