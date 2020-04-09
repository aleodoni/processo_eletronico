## Processo Eletrônico - Backend

Primeiro não se esqueça de criar localmente o arquivo `.env` baseado no arquivo `.env.example`.

### `yarn` ou `npm install`

Instala todas as bibliotecas necessárias para a aplicação.

### `sudo docker-compose up -d

Sobe os containers do PostgreSQL, OpenLDAP e phpLDAPAdmin.

### `yarn sequelize db:migrate` ou `npm sequelize db:migrate`

Roda as migrations para criação de tabelas, views, etc. no banco de dados.

### `yarn sequelize db:seed:all` ou `npm sequelize db:seed:all

Roda os seeds para popular o banco de dados.

### `yarn start` ou `npm start`

Inicia a aplicação.
