# Processo Eletrônico - Externo

Primeiro não se esqueça de criar localmente o arquivo `.env` baseado no arquivo `.env.example`.

É o frontend EXTERNO do processo eletrônico, usado para acesso do IPMC

Tem seu próprio `package.json`.

Necessita de um usuario no LDAP (`usuario.ipmc`).

## Instalando

```shell
yarn
```

**Obs**: este comando pode ser substituído por `npm install`.

Instala todas as bibliotecas necessárias para a aplicação.

## Iniciar a aplicação

```shell
yarn start
```

**Obs**: o `yarn` pode ser substituído por `npm`.

Inicia a aplicação.

## Build

```shell
yarn build
```

ou

```shell
npm run build
```

Gera uma pasta com o nome de _build_, que vai para o servidor apache ou nginx
