<h1 align="center"><img src="https://brasilcloud.com.br/wp-content/uploads/2017/07/nodejs.png" width="250"/></h1>

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
     <img src="http://img.shields.io/static/v1?label=ambiente&message=NODE.JS&color=GREEN&style=for-the-badge"/>
      <img src="http://img.shields.io/static/v1?label=DEPENDÊNCIAS&message=%20NPM&color=orange&style=for-the-badge"/>
     
</p>


# Tópicos
- [Tópicos](#tópicos)
  - [Resumo dos conceitos aplicados ao  projeto   :book:](#resumo-dos-conceitos-aplicados-ao-projeto-book)
  - [NPM a ferramenta para gestão de pacotes :hammer:](#npm-a-ferramenta-para-gestão-de-pacotes-hammer)
    - [Início de um projeto Node :seedling:](#início-de-um-projeto-node-seedling)
    - [Conceitos dentro de um projeto NODE.JS :school:](#conceitos-dentro-de-um-projeto-nodejs-school)
      - [Sincronia de funçoes Javascript :repeat:](#sincronia-de-funçoes-javascript-repeat)
      - [Ciclo de vida Javascrip :arrows_counterclockwise:](#ciclo-de-vida-javascrip-arrows_counterclockwise)
      - [Promises ciclo de vida :star:](#promises-ciclo-de-vida-star)
      - [Refatoração das callbacks para promise :dizzy:](#refatoração-das-callbacks-para-promise-dizzy)
      - [Utilizando o Event emitter](#utilizando-o-event-emitter)
    - [Manipulação  e otimização de listas](#manipulação-e-otimização-de-listas)
      - [For, Forin e Forof](#for-forin-e-forof)
      - [Usando o Array.Map e foreach](#usando-o-arraymap-e-foreach)
      - [Trabalhando com  o  Array.Filter](#trabalhando-com-o-arrayfilter)
      - [Trabalhando com Array.reduce](#trabalhando-com-arrayreduce)
    - [Teste de software](#teste-de-software)
      - [Testes automatizados - TDD](#testes-automatizados---tdd)
    - [CLI Ferramenta de linha de comando](#cli-ferramenta-de-linha-de-comando)
      - [CRUD  Manipulação de arquivos :file_folder:](#crud-manipulação-de-arquivos-file_folder)
    - [Acesso a multiplos bancos de dados](#acesso-a-multiplos-bancos-de-dados)
  - [Desenvolvedores/Contribuintes :)](#desenvolvedorescontribuintes-)
  - [Licença](#licença)


## Resumo dos conceitos aplicados ao  projeto   :book:

<p align="justify">
   O conteudo foi baseado em uma pesquisa feitas pelo Trainer  <a href="https://www.linkedin.com/in/erickwendel">Erick Wendel</a>  para saber quais as maiores dificuldades do desenvolvedores javascript para torna-se mais produtivo, e o objetivo é ter uma aplicação que vai do básico ao nível de produção documentada, funcionando de ponta a ponta.  
</p>

- 1º Usar Conceitos do Node.js e javascript
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

### Início de um projeto Node :seedling:

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
  - As multithreads é responsabilidade do sistema operacional.
  - Se aprofundando mais no event loop, ele recebe uma solicitação de alguma operação junto com uma função que é responsavel por chamar o solicitante quando a operação terminar e entregar o resultado da operação.
  - Diferente de linguagens com C# e Java ele consegue manter a sincronização afim de manter a ordem dos fatores dentro da aplicação mesmo com a programação assíncrona.

  :arrow_up: Voltar para: [Tópicos](#tópicos)

#### Ciclo de vida Javascrip :arrows_counterclockwise:

- Tudo que for funções que rodam externamente executam em background, por exemplo, ler um arquivo, acessar um banco de dados ou consumir uma API para que o event loop possa retornar o resultado para o local onde foi registrada a função.
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
    ```

  :arrow_up: Voltar para: [Tópicos](#tópicos)

####  Promisses com Async e Await
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

####  Utilizando o Event emitter

- Faz parte da familia dos manipuladores de eventos do Node.js
- É utilizado para executar ações contínuas
> Ex: Quando um arquivo for renomeado salvar no banco de dados uma informação de  log
- Node.js utiliza para quase tudo em seu ecossistema
- Bastante usado nos Browsers como determinados eventos que ocorrem nas páginas atráves de interações com o  usuário.
> Ex: `.onClick` , `.onChange` ...
- Trabalha com o padrão Design Pattern  Observer/PubSub
![obs](https://bbengfort.github.io/assets/images/2016-02-16-observer.png)
![PubSub](https://i.morioh.com/b6c9d9a00e.png)

- Exemplo de eventos
  ```bash
  const EventEmitter = require("events");

  class MeuEmissor extends EventEmitter {}

  const meuEmissor = new MeuEmissor();
  const click = "usuario:click";

  meuEmissor.on(click, function (click) {
    console.log("um usuario clicou", click);
  });

  meuEmissor.emit(click, 'na Barra de Rolagem!')

  const stdin = process.openStdin();

  stdin.addListener("data", function (value) {
    console.log(`Você digitou ${value.toString().trim()}`);
  });

  //Resultado: um usuario clicou na Barra de Rolagem!
  // Você digita no terminal "asd"
  // Resultado ao digitar no terminal: Você digitou asd
  ```
  >Obs: Promises usamos para executar uma única vez e Eventos para ações contínuas

:arrow_up: Voltar para os [Tópicos](#tópicos)

### Manipulação  e otimização de listas
#### For, Forin e Forof
- Utilizando a biblioteca axios para realizar o consumo da api SWAPI
- usar um arquivo chamado **service.js** para ter o código de acesso aos serviços
    ```bash
    const axios = require("axios");
    const URL = `https://swapi.dev/api/people`;

    async function obterPessoas(nome) {
      const url = `${URL}/${nome}`;
      const response = await axios.get(url);
      return response.data;
    }

    module.exports =  {obterPessoas}
    ```

- Usando o For, Forin e Forof e mostrando o tempo de execução do mais lento ao mais otimizado

  ```bash
    const service = require("./services/service-swapi");

    async function main() {
      try {
        const result = await service.obterPessoas("1");
        const films = [];
        const resultFilms = result.films;

        console.time("Time for");
        for (let i = 0; i <= resultFilms.length - 1; i++) {
          const element = resultFilms[i];
          films.push(element);
        }
        console.timeEnd("Time for");

        console.time("Time forin");
        for (const i in resultFilms) {
          const element = resultFilms[i];
          films.push(element);
        }
        console.timeEnd("Time forin");

        console.time("Time forof");
        for (const film of resultFilms) {
          films.push(film);
        }
        console.timeEnd("Time forof");

        console.log(`Filmes`, films);
      } catch (error) {
        console.error(`error intern`, error);
      }
    }

    main();
    /*    ****Tempo de execuçao e os filmes****
      Time for: 0.272ms
      Time forin: 0.059ms
      Time forof: 0.023ms
      Filmes [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/6/',
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/6/',
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/6/'
      ]
    */
  ```

:arrow_up: Voltar para os [Tópicos](#tópicos)
#### Usando o Array.Map e foreach
  ```bash
   /*
   Usando o Array.foreach
   */
    console.time("Time foreach");
      resultFilms.forEach((element) => {
        films.push(element);
      });
    console.timeEnd("Time foreach");

    // Usando o Array.map
    console.time("Time map");
      const films_map = resultFilms.map((item) => item);
    console.timeEnd("Time map");
    
    console.log(`Filmes`, films_map);
    console.log(`Filmes`, films);
  ```
  - podemos usar o Array.map para substituir o Foreach e ter um código mais simples
  - Também podemos criar nosso Array.map sobrescrevendo a Classe Array do Javascript e este é o funcionamento do Map:
    ```bash
    Array.prototype.novoMap = function (callback) {
      const novoArrayMapeado = [];
      for (let indice = 0; indice <= this.length - 1; indice++) 
      {
        const resultado = callback(
          this[indice], 
          indice);

        novoArrayMapeado.push(resultado);
      }
      return novoArrayMapeado;
    };

    const filmsNovoMap = resultFilms.novoMap(function (film, indice) {
      return `[${indice}] , ${film}`;
    });

    console.log(`Filmes`, filmsNovoMap);

    /*Resultado:
      Filmes [
        '[0] , http://swapi.dev/api/films/1/',
        '[1] , http://swapi.dev/api/films/2/',
        '[2] , http://swapi.dev/api/films/3/',
        '[3] , http://swapi.dev/api/films/6/'
      ]
    */
    ```
:arrow_up: Voltar para os [Tópicos](#tópicos)

#### Trabalhando com  o  Array.Filter
- Podemos filtrar um array pelo item que queremos usando o **filter** trazendo o valor de acordo com alguma condição  assim:
  ```bash
    // service.js

    const axios = require("axios");
    const URL = `https://swapi.dev/api/people`;

    async function obterPessoas() {
      const response = await axios.get(URL);
      return response.data;
    }
    module.exports =  {obterPessoa, obterPessoas}

    //index.js 

    const { obterPessoas } = require("./services/service-swapi");
    async function main() {
      try {
        const {results} = await obterPessoas();
        const familiaLars = results.filter(function(item){
          const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
          return result;
        })
        const names = familiaLars.map((pessoa)=> pessoa.name);
        console.log(names); 
      } catch (error) {
        console.error(`error intern`, error);
      }
    }
    // Resultado: [ 'Owen Lars', 'Beru Whitesun lars' ]
  ```
- Podemos também fazer um novo **filter**:
  ````bash 
  Array.prototype.novoFilter = function (callback) {
    const lista = [];
    for (index in this) {
      const item = this[index];
      const result = callback(item, index, this);
      if (!result) continue;
        lista.push(item);
      }
    return lista;
  };

  const familiaLars2 = results.novoFilter((item, index, lista) => {
    console.log(`index: ${index}`,lista.length)
    return  item.name.toLowerCase().indexOf("lars") !== -1;
  });
  const names2 = familiaLars2.map((pessoa) => pessoa.name);
  console.log(names2);
  ````
:arrow_up: Voltar para os [Tópicos](#tópicos)

#### Trabalhando com Array.reduce
- O objetivo é reduzir a um valor final.
- Usando o reduce para somar e concatenar strings:
  ```bash
    //service.js

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
  ```

  ```bash
  //index.js

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
  
  /* Resultado:
    lista de pesos: [
    172, 167,  96, 202,
    150, 178, 165,  97,
    183, 182
    ]
    Soma do peso: 1592 
    A frase é: Joel Maykon tem as skills em Node.js e javascript
  */
  ```
:arrow_up: Voltar para os [Tópicos](#tópicos)

### Teste de software
- O teste de software é uma maneira de avaliar a qualidade do software e reduzir o risco de falha no software em operação.
- Testar não consiste em apenas executar testes (executar o software e verificar os resultados). Executar testes é apenas umas das atividades de teste.
- Planejamento, análise, modelagem e implementação dos testes, relatórios de progresso e resultado e avaliação da qualidade, também são partes de um processo de testes.

#### Testes automatizados - TDD
- O objetivo é construir o teste, depois implementar e voltar para refatorar, seguindo um ciclo orientado a teste.
- usando o **assert**, nativo para teste, do **node**:
  ```bash
  //arquivo  tests.js
  const assert = require('assert');

  // o teste abaixo vai dar certo
  assets.ok(true);

  /* o teste abaixo  vai dar erro
  generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: false,
    expected: true,
    operator: '=='
  */

  assert.ok(false);
  ```
- usando o **Mocha** para testes automatizados
  - Para instalar globalmente 
  `yarn global add mocha`
  - Para adicionar como dependência de desenvolvimento
  `yarn add mocha --save-dev`
  - instalar o **nock** para mockar a api
  `yarn add nock` 
- Realizando testes usando api swapi
  ```bash
  //service
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
  ```

  ```bash
  //Teste com  Mock api SWAPI
  const assert = require("assert");
  const nock = require("nock");
  const { obterPessoa } = require("../services/service-swapi.js");

  //suíte de testes
  describe("Star Wars Tests", function () {
    this.beforeAll(() => {
      const response = { name: "Luke Skywalker", height: "172" };
      nock("https://swapi.dev/api/people").get("/1").reply(200, response);
    });

    // Sub Suíte de teste
    it("deve buscar o Luke Skywalker com o formato correto", async () => {
      const expected = { nome: "Luke Skywalker", peso: "172" };
      const nomeBase = `1`;
      const resultado = await obterPessoa(nomeBase);
      assert.deepEqual(resultado, expected);
    });
  });
  ```

:arrow_up: Voltar para os [Tópicos](#tópicos)

### CLI Ferramenta de linha de comando
- CLI significa Command Line Interface, ou seja, é uma ferramenta que disponibiliza uma interface de linha de comando para que você possa executar alguns comandos específicos no terminal. Normalmente essas ferramentas são criadas utilizando shell script, mas nós vamos criar a nossa com Javascript :D
#### CRUD  Manipulação de arquivos :file_folder:
- Implementações criadas para **manipular** **projetos** salvos em um arquivo **JSON**
  <table>
    <tr>
      <td>Funcionalidade</td>
      <td>Tests</td>
      <td>Service</td>
      <td>Database</td>
      <td>Models</td>
    </tr>
    <tr>
      <td>01)  CRUD de Projetos</td>
      <td><a href="/api/tests/project.test.js">project.test</a></td>
      <td><a href="/api/services/service-project.js">service-project</a></td>
      <td><a href="./api/database/projects.json" >project.json</a></td>
      <td><a href="./api/models/project.js" >project</a></td>
    </tr>
  </table>

  - Uso de linha de comando para realizar ações do CRUD de projetos

  ```bash
  const Commander = require("commander");
  const Project = require('./models/project')
  const ServiceProject = require('./services/service-project');

  async function main() {
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
  ```

:arrow_up: Voltar para os [Tópicos](#tópicos)

### Acesso a multiplos bancos de dados

- Utilizando uma implementação que tenha uma base dados híbrida que consiga trabalhar com vários bancos de dados execuntado em containers **Docker** com clientes rodando também **dockerizados** usando o padrão **estrategy** para fazer a comunicação entre esses clientes.
  > " Segundo o catálogo GOF o padrão **estrategy** tem como meta: "Definir uma família de algoritmos, encapsular cada uma delas e torná-las intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam."

- Ter instalado o [docker](https://docs.docker.com/get-docker/) :whale: para os comandos abaixo:
  - **imagem** **do** **postgres**:
    ```bash
    docker run \
      --name postgres \
      -e POSTGRES_USER=joel \
      -e POSTGRES_PASSWORD=password \
      -e POSTGRES_DB=portifolio \
      -p 5432:5432 \
      -d \
      postgres 
    ```
  - verificar se o container esta executando :zap:
    ```bash
      docker ps
    ```
  - Para acessar o container **postgres**:
    ```bash
    docker exec -it postgres /bin/bash
    ```
  - Imagem da parara administrar o **postgres** - [adminer](https://www.adminer.org/)
    ```bash
    docker run \
      --name adminer \
      -p 8080:8080 \
      --link postgres:postgres \
      -d \
      adminer
    ```

  - **Imagem do banco de dados  mongo**

    ```bash
      docker run \
      --name mongodb \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      -d \
      mongo:4
    ```

    - **Imagem do cliente mongo**
    ```bash
    docker run \
      -p 3000:3000 \
      --link mongodb:mongodb \
      -d \
      mongoclient/mongocliente
    ```


  :arrow_up: Voltar para os [Tópicos](#tópicos)


## Desenvolvedores/Contribuintes :)

:arrow_up: Voltar para os [Tópicos](#tópicos)

O time responsável pelo desenvolvimento do projeto

| [<img src="https://avatars2.githubusercontent.com/u/36075156?s=400&u=c4b2f061d72daa3d8377cd444292c43d38bc0b69&v=4" width=115><br><sub>Joel Maykon</sub>]() |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: |


## Licença

[]() (MIT)

Copyright :copyright: 2020 - Joel Maykon
