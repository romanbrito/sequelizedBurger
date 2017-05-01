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
        burger_name: "req.body.burger_name"
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
    db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (dbBurger) {
        res.redirect("/");
    });
});

module.exports = router;