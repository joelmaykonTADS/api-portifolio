const { deepEqual, ok } = require("assert");
const projects = require('../models/project');
const DEFAULT_PROJETO_CADASTRAR = {
  nome:'Portifólio',
  tipo:'Pessoal',
  id:1
}

describe("Suite de manipulação de Projetos do portifólio", () => {
  it('deve buscar qualquer valor, usando arquivos', async ()=>{
    const expected = DEFAULT_PROJETO_CADASTRAR;
    const result = await projects.read(expected.id);
    ok(result,expected);
  })

  it("deve buscar exatamente o projeto, usando arquivos", async () => {
    const expected = DEFAULT_PROJETO_CADASTRAR;
    const [result] = await projects.read(expected.id);
    deepEqual(result, expected);
  });
});
