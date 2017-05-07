module.exports = function (sequelize, Datatypes) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: Datatypes.STRING
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