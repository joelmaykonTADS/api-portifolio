console.log("Hello word");
/*
0 Obter um usuário
1 Obter o numero de telefone de um usuario a parti de seu ID
2 Obter o endereco de usuario pelo ID
*/
// convertendo uma callback para promise usando o módulo interno do Node.JS sem alteração
const util = require("util");
const obterEnderocoAsync = util.promisify(obterEndereco);

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

function obterUsuario() {
  /* 
    Quando der sucesso uso o RESOLVE
    Quando der pronlema uso o REJECT 
  */
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //return reject(new Error("Erro no sistema"));
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}
// passar o callback como ultimo parâmetro
function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "129839812",
        ddd: 11,
      });
    }, 2000);
  });
}

// 1º passo adicionar a palavra async -> e será retornado uma Promise
main();
async function main() {
  try {
    // mais demorado na execução
    console.time("tempo de execução");

    const usuario = await obterUsuario();
    const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderocoAsync(usuario.id);
    console.log(`
    Nome: ${usuario.nome}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    Endereço: ${endereco.rua}, ${endereco.numero}
    `);
    console.timeEnd("tempo de execução");
    // mais rápido na execução por executar em paralelo as promises que não possuem dependencia da anterior
    console.time("tempo de execução");

    const usuario_2 = await obterUsuario();
    const resultado = await Promise.all([
      obterTelefone(usuario_2.id),
      obterEnderocoAsync(usuario_2.id),
    ]);
    const telefone_2 = resultado[0];
    const endereco_2 = resultado[1];
    console.log(`
    Nome: ${usuario_2.nome}
    Telefone: (${telefone_2.ddd}) ${telefone_2.telefone}
    Endereço: ${endereco_2.rua}, ${endereco_2.numero}
    `);
    console.timeEnd("tempo de execução");
  } catch (error) {
    console.error("Deu Erro", error);
  }
}

/*
const usuarioPromise = obterUsuario();
// Para manipular o sucesso usamos a função .then
// Para manipular erros, usamos o .catch
// Aqui passamos o resultado da promise usuario para frente e  criamos um novo objeto com os dados reultantes da nova promise de telefone
usuarioPromise
  .then(function (resultadoUsuario) {
    return ObterTelefone(resultadoUsuario.id).then(function resolverTelefone(
      resultadoTelefone
    ) {
      return {
        usuario: {
          nome: resultadoUsuario.nome,
          id: resultadoUsuario.id,
        },
        telefone: resultadoTelefone,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderocoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(resultadoEndereco) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: resultadoEndereco,
      };
    });
  })
  .then(function (result) {
    console.log(
      `Usuario ${result.usuario.nome}, telefone (${result.telefone.ddd}) ${result.telefone.telefone} Rua: ${result.endereco.rua}, encontrado com  sucesso!`
    );
  })
  .catch(function (error) {
    console.error(`Não conseguimos encontrar o usuário`, error);
  });
*/
/*
obterUsuario(function resolverUsuario(error, usuario) {
  // null ou "" ou 0 === false, qualquer coisas diferente disso é igual a true em Javascript
  if (error) {
    console.error("Problemas com o usuário", error);
    return;
  }
  ObterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("Problemas com o telefone do usuário", error);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("Problemas com o endereço do usuário", error);
        return;
      }

      console.log(`
       Nome: ${usuario.nome},
       Endereço: ${endereco.rua},Nº  ${endereco.numero},
       Telefone: (${telefone.ddd}) ${telefone.telefone}
       `);
    });
  });
});
*/
