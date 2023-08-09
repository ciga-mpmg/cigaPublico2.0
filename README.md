# Site CIGA

Novo site do Centro Integrado de Gestão Ambiental (CIGA).

## Pré-requisitos

-   [Node](https://nodejs.org/en) (versão 14 ou superior)
-   NPM (versão 9 ou superior)
-   [Serve](https://www.npmjs.com/package/serve) (versão 14 ou superior)
-   Yarn
    - MAC: `brew install yarn`
    - Linux: `sudo apt-get install yarn` 

## Instalação

1. Clone o repositório: `git clone https://github.com/ciga-mpmg/cigaPublico2.0.git`
2. Acesse o diretório do projeto: `cd cigaPublico2.0`
3. Instale as dependências: `npm install`

## Uso

1. Execute o comando de desenvolvimento: `npm run start`
2. Abra o navegador e acesse `http://localhost:3333/pages`
3. Realize as ações necessárias

## Build

1. Execute o comando: `npm run build:dev` ou `npm run build:prod`
2. Execute o comando: `serve dist`
3. Abra o navegador e acesse `http://localhost:3000/pages`

## Deploy (Github Pages)

1. Execute o comando: `npm run build:prod`
2. Execute o comando: `npm run deploy`
3. Aguarde a finalização, abra o navegador e acesse `https://ciga-mpmg.github.io/cigaPublico2.0/pages/`
4. Os arquivos podem ser vistos em `https://github.com/ciga-mpmg/cigaPublico2.0/tree/dist`

## Tokens

1. Execute o comando: `npm run tokens`
2. Acesse a pasta `stylesheets/tokens`

## Estrutura do Projeto

```
project
├─ .editorconfig
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ package.json
├─ src
│  ├─ assets
│  │  ├─ fonts
│  │  ├─ icons
│  │  └─ images
│  ├─ javascripts
│  │  └─ pages
│  ├─ pages
│  └─ stylesheets
│     ├─ pages
│     ├─ properties
│     ├─ styles.json
│     ├─ styles.scss
│     └─ tokens
└─ webpack.config.js
```

## Configuração

#### Lint

Os arquivos `.editorconfig` e `settings.json` são responsáveis por manter um padrão no código.

#### Dependências

O arquivo `package.json` contém todas as dependências necessárias para o projeto, podendo ser executado por `npm` ou `yarn`.

#### [Webpack](https://webpack.js.org/)

O arquivo `webpack.config.js` contém todas as configurações necessárias e pode ser modificado conforme necessário.

#### Styles e Scripts

A pasta `stylesheets` contém:

-   Arquivos `.scss` e `.css`
-   O arquivo principal é o `style.scss`
-   Pasta `pages` para adicionar estilos específicos de cada página
-   Arquivo `style.json` com as configurações para gerar os tokens da pasta `tokens` com base nas propriedades da pasta `properties`. Use o comando: `npm run tokens`

A pasta `javascripts` contém:

-   Arquivos `.js`
-   Pasta `pages` para adicionar scripts específicos de cada página

Corrija as pontuações do texto
