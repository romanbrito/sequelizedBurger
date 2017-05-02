module.exports = function (sequelize, Datatypes) {
    var Customer = sequelize.define("Customer", {
        name: {
            type: Datatypes.STRING,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Customer.hasMany(models.Burger, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Customer;
};