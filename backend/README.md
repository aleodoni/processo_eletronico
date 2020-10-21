# Processo Eletrônico - Backend

1. Primeiro não se esqueça de criar localmente o arquivo `.env` baseado no arquivo `.env.example`.
1. Também necessita de um arquivo .key para o https
1. Necessita de conexão com o LDAP
1. Faz o uso do REDIS

## Dependências

1. Node versão LTS (atualmente 12.19.0)

## Instalando

```shell
yarn
```

**Obs**: este comando pode ser substituído por `npm install`.

Instala todas as bibliotecas necessárias para a aplicação.

## Containeres para desenvolvimento

```shell
sudo docker-compose up -d
```

Sobe os containers do PostgreSQL, OpenLDAP e phpLDAPAdmin.

## Migrations

```shell
yarn sequelize db:migrate
```

**Obs**: o `yarn` pode ser substituído por `npm`.

Roda as migrations para criação de tabelas, views, etc. no banco de dados.

## Seeds

```shell
yarn sequelize db:seed:all
```

**Obs**: o `yarn` pode ser substituído por `npm`.

Roda os seeds para popular o banco de dados.

## Iniciar a aplicação

```shell
yarn start
```

**Obs**: o `yarn` pode ser substituído por `npm`.

Inicia a aplicação.

## Iniciar a aplicação em "modo desenvolvedor"

```shell
npm run dev
```

Inicia a aplicação em modo desenvolvedor
