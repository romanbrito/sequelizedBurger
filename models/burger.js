module.exports = function (sequelize, Datatypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: true //validate burger name cannot be empty
            }
        },
        devoured: {
            type: Datatypes.BOOLEAN,
            defaultValue: false // devoured set to false by default
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