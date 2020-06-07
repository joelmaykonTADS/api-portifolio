<h1 align="center"><img src="https://brasilcloud.com.br/wp-content/uploads/2017/07/nodejs.png" width="250"/></h1>

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
     <img src="http://img.shields.io/static/v1?label=ambiente&message=NODE.JS&color=GREEN&style=for-the-badge"/>
      <img src="http://img.shields.io/static/v1?label=DEPENDÊNCIAS&message=%20NPM&color=orange&style=for-the-badge"/>
     
</p>

### Tópicos


- [Resumo do projeto Node JS :book:](#resumo-do-projeto-node-js-book)
- [NPM a ferramenta para gestão de pacotes :hammer:](#npm-a-ferramenta-para-gestão-de-pacotes-hammer)
- [Início de um projeto Node :seedling:](#início-de-um-projeto-node-seedling)
  - [Conceitos dentro de um projeto NODE.JS :school:](#conceitos-dentro-de-um-projeto-nodejs-school)
    - [Sincronia de funçoes Javascript :repeat:](#sincronia-de-funçoes-javascript-repeat)
    - [Ciclo de vida Javascrip :arrows_counterclockwise:](#ciclo-de-vida-javascrip-arrows_counterclockwise)
    - [Promises ciclo de vida :star:](#promises-ciclo-de-vida-star)
    - [Refatoração das callbacks para promise :dizzy:](#refatoração-das-callbacks-para-promise-dizzy)
- [Desenvolvedores/Contribuintes :)](#desenvolvedorescontribuintes-)
- [Licença](#licença)




## Resumo do projeto Node JS :book:

<p align="justify">
   O conteudo foi baseado em uma pesquisa feitas pelo Trainer  <a href="https://www.linkedin.com/in/erickwendel">Erick Wendel</a>  para saber quais as maiores dificuldades do desenvolvedores javascript para torna-se mais produtivo, e o objetivo é ter uma aplicação que vai do básico ao nível de produção documentada, funcionando de ponta a ponta.  
</p>

- 1º Usar Conceitos do javascript
- 2º Manipulação de listas e otimização de performace das listas.
- 3º Criação de ferramentas de linha de comando.
- 4º Trabalhar com multiplos banco de dados.
- 5º Criar a API usando o [Hapi.js](https://hapi.dev/) e plugins, buscando está preparado para desafios do mundo real.
- 6º documentação usando o swagger e alguns plugins.
- 7º autenticação usando JWT.
- 8º Publicar a aplicação e deixar disponivel para o usuário acessar pela internet.
- 9º Dividir em ambiente de desenvolvimento, de homologação e de produção.

## NPM a ferramenta para gestão de pacotes :hammer:

- Ao instalar as dependências ele busca somente as que são apropriadas para o sistema operacional.
- Identifica as dependências a partir do arquivo `package.json`
- Usado para executar e automatizar scritps bash a partir do projeto
- possui o site [npmjs.com](https://www.npmjs.com/) que possui todos os pacotes e estão disponível para comunidade.

:arrow_up: Voltar para os [Tópicos](#tópicos)

## Início de um projeto Node :seedling:

- criar um diretorio para o projeto
- dentro da pasta criada dar o comando `npm init`
- Digitar os parâmetros desejados
- Criar um arquivo index.js para ser o main do projeto
- iniciar no index.js a programação com javascript
- no `package.json` adicionar o script `dev:"node index.js"` e assim ter como executar `npm run dev` e iniciar nossa aplicação.

:arrow_up: Voltar para os [Tópicos](#tópicos)

### Conceitos dentro de um projeto NODE.JS :school:

#### Sincronia de funçoes Javascript :repeat:

![node api  bindings](https://www.luiztools.com.br/wp-content/uploads/2017/04/nodejs.jpg)

- Máquina virtual do Node: Javascript execuntado e os Bindings do Node.Js transformando-o em linguagem C++.
- Existe a camada aplicação que usa a engine V8 para executar o javascript.
- Em outra camada chamada NODE.JS BINDIGNS que transforma o javascript e otimiza para c++ e executar na máquina a partir da LIBUV.
- O event loop é quem delega os eventos dentro do NODE e responsável pelo envio das operações bloqueantes que o sistema operacional deve executar.
- Quando o Sistema operacional resolve as operaçoes o event loop sinaliza para que solicitou.
- O node é single thread para manipular o event loop.
- As mulrithreads é responsabilidade do sistema operacional.
- Se aprofundando mais no event loop, ele recebe uma solicitação de alguma operação junto com uma função que é responsavel por chamar o solicitante quando a operação terminar e entregar o resultado da operação.
- Diferente de linguagens com C# e Java ele consegue manter a sincronização afim de manter a ordem dos fatores dentro da aplicação mesmo com a programação assíncrona.

:arrow_up: Voltar para: [Tópicos](#tópicos)

#### Ciclo de vida Javascrip :arrows_counterclockwise:

- Tudo que for funções que rodam externamente executam em background, exemplo ler um arquivo, acessar um banco de dados ou consumir uma API para que o event loop possa retornar o resultado para o local onde foi registrada a função.
- A forma com que seu código é escrito é diferente de como ele é executado, por algum motivo você pode receber um valor null ou underfined, isso ocorre porque a resposta chegou depois que outra parte do código ja foi executada.
- Por isso é necessário manter a ordem de sua execução para evitar problemas, garantir que a ordem está correta para evitar supresas em nossos resultados.

:arrow_up: Voltar para: [Tópicos](#tópicos)

- **Simulação de problemas** :exclamation:

```bash
/*
0 Obter um usuário
1 Obter o numero de telefone de um usuario a partir de seu ID
2 Obter o endereco de usuario pelo ID
*/

function obterUsuario(){
  setTimeout(function (){
    return{
      id:1,
      nome:'Aladin',
      dataNascimento:new Date()
    }
  }, 1000)
}

function ObterTelefone(idUsuario){
  setTimeout(() => {
    return {
      telefone:'129839812',
      ddd:11
    }
  }, 2000);
}
function obterEndereco(idUsuario){

}

const usuario = obterUsuario();
const telefone = ObterTelefone(usuario.id);

console.log(`Usuário: ${usuario}`);

/*
 Aqui acontece um erro porque o console log é executado
 antes de chegar o resultado da função  obterUsuario
 e tentar acessar um campo id que não existe ainda
*/

console.log(`Usuario: ${telefone}`);
```

- **Resolvendo o problema de sincronia**

```bash
/*
0 Obter um usuário
1 Obter o numero de telefone de um usuario a partir de seu ID
2 Obter o endereco de usuario pelo ID
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date(),
    });
  }, 1000);
}

// passar o callback como ultimo parâmetro
function ObterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null,{
      telefone: "129839812",
      ddd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null,{
      rua:'dos bobos',
      numero:0
    });
  }, 2000);
}


obterUsuario(function resolverUsuario(error, usuario) {
  /*
  null ou "" ou 0 === false,
  qualquer coisas diferente disso é igual a true em Javascript
   */
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
       `)
     })
  })
});
```

:arrow_up: Voltar para: [Tópicos](#tópicos)

#### Promises ciclo de vida :star:

- Promises: É um objeto que é usado para trabalhar em Javascript com toda a assincronia a partir de estados.
- Fluxo das promises
  - Pode estar no estado **Pending** que é quando o estado inicial ainda não terminou ou ainda não foi rejeitado.

    > **obs:** caso uma promises fique nesses estado e não seja resolvida corretamente, você receberá o valor **Pending**, pode ser que esteja lendo e capturando a promises errada.

  - O outro estado é o **Fulfilled** Quando executadas todas as operações com sucesso e assim receber o valor esperado.
  - Reject é o estado onde a promise falha .
  - Exemplo com os estados da promise
    ![promises](https://wtcindia.files.wordpress.com/2016/06/promises.png?w=605)
  - Exemplo de duas promises e o ciclo de vida
    ![fluxo_promises](https://i.stack.imgur.com/UX8JM.png)

:arrow_up: Voltar para: [Tópicos](#tópicos)

#### Refatoração das callbacks para promise :dizzy:

- Código exemplo de uma refatoração 
```bash
/*
0 Obter um usuário
1 Obter o numero de telefone de um usuario a parti de seu ID
2 Obter o endereco de usuario pelo ID
*/
// convertendo uma callback para promise usando o módulo interno Node.JS sem alteração
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
function ObterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "129839812",
        ddd: 11,
      });
    }, 2000);
  });
}

const usuarioPromise = obterUsuario();
// Para manipular o sucesso usamos a função .then
// Para manipular erros, usamos o .catch
/* 
  Aqui passamos o resultado da promise usuario para frente e 
  criamos um novo objeto com os dados reultantes da nova promise de telefone
*/
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
     `Usuario ${result.usuario.nome},
      Telefone (${result.telefone.ddd}) ${result.telefone.telefone}
      Rua: ${result.endereco.rua}`
    );
  })
  .catch(function (error) {
    console.error(`Não conseguimos encontrar o usuário`, error);
  });
  ````
#### Promisses com Async e Await
- É a melhor forma de resolver problema de promises aninhadas.
- Facilita a visualização do fluxo das funçoes.
- **Não** altera a performace da aplicação
- Foi criado pela equipe do C# da Microsoft, implementado primeiro no Typescrip e depois no Javascript
- Será usado as palavras reservadas quando é necessário tratar a resposta da chamada de função
- Exemplo de código com duas formas de usar o async/await uma mais performática e outra menos.

  ``` bash
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

      // mais rápido na execução por executar em paralelo as promises 
      // que não possuem dependencia da anterior
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
  ```

:arrow_up: Voltar para os [Tópicos](#tópicos)

## Desenvolvedores/Contribuintes :)

O time responsável pelo desenvolvimento do projeto

| [<img src="https://avatars2.githubusercontent.com/u/36075156?s=400&u=c4b2f061d72daa3d8377cd444292c43d38bc0b69&v=4" width=115><br><sub>Joel Maykon</sub>]() |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: |


## Licença

[]() (MIT)

Copyright :copyright: 2020 - Joel Maykon
