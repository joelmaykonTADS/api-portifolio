const { deepEqual, ok } = require("assert");
const projects = require("../models/project");
const DEFAULT_PROJECT = {
  nome: "Portifólio",
  tipo: "Pessoal",
  id: 1,
};

describe("Suite de manipulação de Projetos do portifólio", () => {
  it("deve buscar qualquer valor, usando arquivos", async () => {
    const expected = DEFAULT_PROJECT;
    const result = await projects.read(expected.id);
    ok(result, expected);
  });

  it("deve buscar exatamente o projeto, usando arquivos", async () => {
    const expected = DEFAULT_PROJECT;
    const [result] = await projects.read(expected.id);
    deepEqual(result, expected);
  });

  it("deve cadastrar um projeto e verificar se existe usando o id cadastrado, usando arquivos", async () => {
    const expected = DEFAULT_PROJECT;
    await projects.create(DEFAULT_PROJECT);
    const [atual] = await projects.read(DEFAULT_PROJECT.id);
    deepEqual(atual, expected);
  });

  it('remover um projeto por id', async () =>{
    const expect = true;
    const result = await projects.delete(DEFAULT_PROJECT.id);
    deepEqual(result, expect);
  });
});
