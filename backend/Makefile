# Arquivo que contém histórico de comandos para documentar e
# facilitar o Desenvolvimento

# Inicializa containers (Postgres, LDAP, etc)
init-repo:
	docker-compose up -d

# Limpa e inicializa banco de dados
init-db:
  # Deleta banco de dados
	yarn sequelize db:drop
    # Cria banco de dados
	yarn sequelize db:create
    # Roda todas as migrations
	yarn sequelize db:migrate
    # Roda todos os seeds
	yarn sequelize db:seed:all

# Encerra containers
term-repo:
	docker-compose down