const assert = require("assert");
const nock = require("nock");
const {
  obterPessoa
} = require("../services/service-swapi.js");

//suíte de testes
describe("Star Wars Tests", function () {
  this.beforeAll(() => {
    const response = {
      name: "Luke Skywalker",
      height: "172"
    };
    nock("https://swapi.dev/api/people").get("/1").reply(200, response);
  });

  // Sub Suíte de teste
  it("deve buscar o Luke Skywalker com o formato correto", async () => {
    const expected = {
      nome: "Luke Skywalker",
      peso: "172"
    };
    const nomeBase = `1`;
    const resultado = await obterPessoa(nomeBase);
    assert.deepEqual(resultado, expected);
  });
});