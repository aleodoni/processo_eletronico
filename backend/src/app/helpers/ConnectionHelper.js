/**
 * Helper que facilita uso de conexão e transações
 * Esse helper é inicializado no arquivo /src/database/index.js
 * Depois disso é só importar o mesmo e usar as funções getTransaction e getConnection
 */
class ConnectionHelper {
    init(connection) {
        this.connection = connection;
    }

    /**
     * Retorna a transação da conexão ativa com o Postgres
     */
    async getTransaction() {
        const transaction = await this.connection.transaction({ autocommit: false });
        return transaction;
    }

    /**
     * Retorna a conexão ativa com o Postgres
     */
    getConnection() {
        return this.connection;
    }
}

export default new ConnectionHelper();
