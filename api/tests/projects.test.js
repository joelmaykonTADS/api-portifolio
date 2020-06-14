const {
  deepEqual,
  ok
} = require("assert");
const projects = require("../services/service-project");
const DEFAULT_PROJECT = {
  nome: "Portifólio",
  tipo: "Pessoal",
  id: 1,
};
const DEFAULT_NOVO_PROJECT = {
  nome: "API para Patrimônio",
  tipo: "Voluntário",
  id: 2,
};
describe("Suite de manipulação de Projetos do portifólio", () => {
  before(async () => {
    await projects.create(DEFAULT_PROJECT);
    await projects.create(DEFAULT_NOVO_PROJECT);
  })

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

  it('remover um projeto por id', async () => {
    const expect = true;
    const result = await projects.delete(DEFAULT_PROJECT.id);
    deepEqual(result, expect);
  });
  it('deve atualizar um projeto pelo id', async () => {
    const expected = {
      ...DEFAULT_NOVO_PROJECT,
      nome: "API para Sistema da igreja",
      tipo: "Voluntário"
    }
    const newProjectUpdate = {
      nome: "API para Sistema da igreja",
      tipo: "Voluntário"
    }
    await projects.update(DEFAULT_NOVO_PROJECT.id, newProjectUpdate);
    const [result] = await projects.read(DEFAULT_NOVO_PROJECT.id);
    deepEqual(result, expected);
  })
});