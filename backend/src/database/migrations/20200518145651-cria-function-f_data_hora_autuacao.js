'use strict';

const functionName = 'spa2.f_data_hora_autuacao()';
const sql = `
  'BEGIN
  NEW.pro_autuacao = NOW();
  NEW.usu_data_hora_alteracao = NOW();
  RETURN NEW;
END;'
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS trigger LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
