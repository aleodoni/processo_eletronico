# Processo Eletrônico

## Estrutura do projeto

O projeto é dividido em 4 partes:

1. pasta `backend`:  

   - possui o backend do projeto
   - tem seu próprio `package.json`
   - usa o redis
   - usa conexão com o LDAP
   - tem seu próprio `.env`
   - usa um arquivo de chave para https (`.key` e `.crt`)
   - para rodar no desenv usa: `npm run dev`
   - para rodar com pm2 usa um comando `pm2 start`
   - o backend pode ser gerenciado pelos comandos:
     - para parar o backend `pm2 stop spa2-api`
     - para startar o backend, dentro da pasta backend
`pm2 start src/server.js --interpreter ./node_modules/sucrase/bin/sucrase-node --name spa2-api`
     - para ver as APIs `pm2 list`
     - para ver o log `pm2 logs`

1. pasta `frontend`:

   - É o frontend INTERNO do processo eletrônico
   - tem seu próprio `package.json`
   - tem seu próprio `.env`
   - para rodar no desenv usa: npm run dev
   - para rodar no servidor é rodado na pasta: `yarn start`
   - para gerar build é rodado na pasta: `yarn build`, após isso gera uma pasta chamada build com os arquivos para jogar no apache ou nginx

1. pasta `externo`:

   - É um frontend EXTERNO do processo eletrônico, parte do IPMC
   - tem seu próprio `package.json`
   - tem seu próprio `.env`
   - usa um usuário que precisa estar cadastrado no LDAP, chamado usuario.ipmc
   - para rodar no desenv usa: npm run dev
   - para rodar no servidor é rodado na pasta: `yarn start`
   - para gerar build é rodado na pasta: `yarn build`, após isso gera uma pasta chamada build com os arquivos para jogar no apache ou nginx

1. pasta `ext-contab`:

   - É um frontend EXTERNO do processo eletrônico, parte de FORNECEDORES
   - tem seu próprio `package.json`
   - tem seu próprio `.env`
   - para rodar no desenv usa: npm run dev
   - para rodar no servidor é rodado na pasta: `yarn start`
   - para gerar build é rodado na pasta: `yarn build`, após isso gera uma pasta chamada build com os arquivos para jogar no apache ou nginx

## Getting started

1. Construa a imagem do backend:

   ```shell
   cd backend
   docker build -t cmc/spa2api .
   ```

1. Construa a imagem do frontend:

   ```shell
   cd frontend
   docker build -t cmc/spa2 .
   ```

1. Suba a aplicação:

   ```shell
   cd processo_eletronico
   docker-compose up
   ```
