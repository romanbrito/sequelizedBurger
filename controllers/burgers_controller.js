var express = require("express");
var router = express.Router();
var db = require("../models");

// model
// var burger = require("../models/burger.js");

// routes

router.get("/", function (req, res) {
    // burger.all(function (data) {
    //     var hbsObject = {
    //         burgers: data
    //     };
    //     res.render("index", hbsObject);
    // });
    db.Burger.findAll().then(function (dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        res.render("index", hbsObject);
    });
});

router.post("/", function (req, res) {
    // burger.create([
    //     "burger_name"
    // ], [
    //     req.body.burger_name
    // ], function () {
    //     res.redirect("/");
    // });
    db.Burger.create({
        burger_name: req.body.burger_name,
        customer_name: "roman"
    }).then(function (dbBurger) {
        res.redirect("/");
    });
});

router.put("/:id", function (req, res) {
    // var condition = "id = " + req.params.id;
    // burger.update({
    //     devoured: req.body.devoured
    // }, condition, function () {
    //     res.redirect("/");
    // });
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