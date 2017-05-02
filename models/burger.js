module.exports = function (sequelize, Datatypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: Datatypes.STRING
        },
        devoured: {
            type: Datatypes.BOOLEAN,
            defaultValue: false
        }
        // Sequelize automatically adds createdAt and updatedAt
    },
        {
            classMethods: {
                associate: function (models) {
                    Burger.belongsTo(models.Customer, {
                        foreignKey: {
                            allowNull: true
                        }
                    });
                }
            }
        });
    return Burger;
};