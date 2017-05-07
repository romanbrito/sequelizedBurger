var express = require("express");
var router = express.Router();
var db = require("../models");

// model

// routes

router.get("/", function (req, res) {

    db.Burger.findAll({include: [db.Customer]}).then(function (dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        res.render("index", hbsObject);
        //res.json(hbsObject);
    });
});

router.post("/", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function (dbBurger) {
        res.redirect("/");
    });
});

router.put("/:id", function (req, res) {
    console.log(req.body);
    var customerName = req.body.customer_name;
    var customerId = null;

    if (customerName) {

        console.log(customerName);

        // find out if name already exists

        db.Customer.findOne({
            where: {
                customer_name: customerName
            }
        }).then(function (dbCustomer) {
            // if customer already exists associate with burger
            if (dbCustomer) {
                customerId = dbCustomer.id;
                db.Burger.update({
                    devoured: req.body.devoured,
                    CustomerId: customerId
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(function (dbBurger) {
                    res.redirect("/");
                });
                // if not create one and associate
            } else {
                db.Customer.create({
                    customer_name: customerName
                }).then(function (dbCustomer) {
                    db.Burger.update({
                        devoured: req.body.devoured,
                        CustomerId: dbCustomer.id
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function (dbBurger) {
                        res.redirect("/");
                    });
                });
            }
        });
    } else {
        db.Burger.update({
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbBurger) {
            res.redirect("/");
        });
    }
});

module.exports = router;