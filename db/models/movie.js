const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {};
    Movie.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'title of movie cannot be null' },
                    notEmpty: { msg: 'title of movie cannot be empty' }
                }
            },
            runtime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: 'runtime of movie cannot be null' },
                    notEmpty: { msg: 'runtime of movie cannot be empty' }
                }
            },
            releaseDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: { msg: 'releaseDate of movie cannot be null' },
                    notEmpty: { msg: 'releaseDate of movie cannot be empty' }
                }
            },
            isAvailableOnVHS: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            sequelize,
            timeStamps: false,
            paranoid: true
        }
    );
    return Movie;
}