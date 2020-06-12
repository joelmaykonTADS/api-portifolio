const axios = require("axios");
const URL = `https://swapi.dev/api/people`;

async function obterPessoa(number) {
  const url = `${URL}/${number}`;
  const response = await axios.get(url);
  return mapearPessoa(response.data);
}
function mapearPessoa(item) {
  return{
    nome:item.name,
    peso:item.height
  }
}

async function obterPessoas() {
  const response = await axios.get(URL);
  return response.data;
}

module.exports = { obterPessoa, obterPessoas };
