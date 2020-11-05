# Processo Eletrônico

## Estrutura do projeto

O projeto é dividido em 4 partes:

1. pasta `backend`:  

   - possui o backend do projeto
   - tem seu próprio `package.json`
   - usa o redis
   - usa conexão com o LDAP
   - tem seu próprio `.env`
   - usa um arquivo de chave para https (`.key` e `.crt`); vide [#295](https://github.com/CMCuritiba/processo_eletronico/issues/295)
   - para rodar no desenv usa: `npm run dev`

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

1. Primeiro não se esqueça de editar localmente os arquivos `.env` de cada módulo conforme suas necessidades.

1. Construa as imagens:

   ```shell
   cd processo_eletronico
   docker-compose -f docker-stack.yml build
   ```

   **Observação importante para ambiente de produção e _staging_**: a construção do(s) frontend(s) depende(m) da URL da API no _backend_ ser fornecida em tempo de _build_ (vide [#321](https://github.com/CMCuritiba/processo_eletronico/issues/321)).

1. Publique as imagens (apenas necessário para **produção** ou _staging_):

   ```shell
   docker login -u nomedeusuario
   docker-compose -f docker-stack.yml push
   ```

1. Suba o _stack_ da aplicação:

   ```shell
   docker swarm init
   cd processo_eletronico
   docker stack deploy --compose-file docker-stack.yml spae
   ```

   A inicialização do _swarm_ é realizada apenas uma vez. Para verificar a pilha de serviços:

   ```shell
   docker stack ls
   docker stack services spae
   ```

1. Os "módulos" da aplicação estarão disponíveis em:

   1. Backend: porta `3002`
   1. Frontend: porta `80`
   1. Frontend externo: porta `81`
   1. Frontend contab: porta `82`

Informações úteis:

- A rede da stack e de [ingresso](https://docs.docker.com/network/overlay/#customize-the-default-ingress-network) não podem estar na mesma faixa de sua LAN de serviços;
- O [portainer](https://www.portainer.io/) pode ser útil para gerenciar a _stack_.
