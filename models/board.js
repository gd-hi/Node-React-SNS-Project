const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            writer: {
                type: Sequelize.STRING(40),
            },
            title: {
                type: Sequelize.STRING(15),
            },
            content: {
                type: Sequelize.STRING(100),
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = Board;