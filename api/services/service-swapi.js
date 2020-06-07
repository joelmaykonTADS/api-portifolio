const axios = require("axios");
const URL = `https://swapi.dev/api/people`;

async function obterPessoa(nome) {
  const url = `${URL}/${nome}`;
  const response = await axios.get(url);
  return response.data;
}
async function obterPessoas() {
  const response = await axios.get(URL);
  return response.data;
}

module.exports =  {obterPessoa, obterPessoas}