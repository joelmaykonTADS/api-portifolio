const { obterPessoas } = require("./services/service-swapi");

Array.prototype.novoReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas();
    const pesos = results.map((item) => parseInt(item.height));
    console.log("lista de pesos:", pesos);
    // o valor zero adicionado ao reduce é para não dar erro se passar um array vazio, sendo obrigado inicializar o valor do array
    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    }, 0);
    console.log(`Soma dos pesos: ${total} `);

    const minhaLista = ["Joel", "Maykon","tem","as","skills","em", "Node.js","e", "javascript"];
    const frase = minhaLista
      .novoReduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(" ");
      console.log(`A frase é: ${frase}`);
  } catch (error) {
    console.error(`error intern`, error);
  }
}

main();
