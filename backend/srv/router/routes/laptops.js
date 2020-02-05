"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oLaptop, req) {
    return oLaptop;
}


module.exports = () => {
    const app = express.Router();

    app.get ("/", async (req, res, next) =>{
        try {

            const db = new dbClass(req.db);
            const oLaptop = _prepareObject(req.body, req);
            const sSql = "SELECT * FROM \"LAPTOPS\"";
            oLaptop.laptops = await db.executeUpdate(sSql);
            res.type("application/json").status(200).send(JSON.stringify(oLaptop));

        } catch (e) {
            next(e);
        }
    })

    ;

    app.get("/:lpid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const oLaptop = _prepareObject(req.body, req);

            const lpid = req.params.lpid;

            const sSql = "SELECT * FROM \"LAPTOPS\" WHERE \"LPID\" = ?";
            const aValues = [ lpid ];


            oLaptop.laptops = await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oLaptop));

        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            oLaptop.lpid = await db.getNextval("lpid");

            const sSql = "INSERT INTO \"LAPTOPS\" VALUES(?,?,?,?)";
            const aValues = [ oLaptop.lpid, oLaptop.bgid, oLaptop.name, oLaptop.screen,];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oLaptop = _prepareObject(req.body, req);
            const sSql = "UPDATE \"LAPTOPS\" SET \"BGID\" = ?, \"NAME\" = ?, \"SCREEN\" = ? WHERE \"LPID\" = ?";
            const aValues = [ oLaptop.bgid,oLaptop.name,oLaptop.screen,oLaptop.lpid ];

            oLaptop.laptops = await db.executeUpdate(sSql,aValues);


            res.type("application/json").status(200).send(JSON.stringify(oLaptop));
        } catch (e) {
            next(e);
        }
    });

   /* app.put("/:lpid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const lpid = req.params.lpid;

            const oLaptop = _prepareObject(req.body, req);
            const sSql = "UPDATE \"LAPTOPS\" SET \"BAGID\" = ?,\"NAME\" = ?,\"SCREEN\" = ? WHERE \"LPID\" = ?";
            const aValues = [ oLaptop.bgid,oLaptop.name,oLaptop.screen,lpid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send("Success");
        } catch (e) {
            next(e);
        }
    });*/

    app.delete("/:lpid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const lpid = req.params.lpid;

            const sSql = "DELETE FROM \"LAPTOPS\" WHERE \"LPID\" = ?";
            const aValues = [ lpid ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send("Success");

        } catch (e) {
            next(e);
        }
    });

    return app;
};
