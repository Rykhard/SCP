"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oShop, req) {
    return oShop;
}


module.exports = () => {
    const app = express.Router();

    app.get ("/", async (req, res, next) =>{
        try {

            const db = new dbClass(req.db);
            const oShop = _prepareObject(req.body, req);
            const sSql = "SELECT * FROM \"SHOPS\"";
            oShop.shops = await db.executeUpdate(sSql);
            res.type("application/json").status(200).send(JSON.stringify(oShop));

        } catch (e) {
            next(e);
        }
    })

    ;

    app.get("/:shid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const oShop = _prepareObject(req.body, req);

            const shid = req.params.shid;

            const sSql = "SELECT * FROM \"SHOPS\" WHERE \"SHID\" = ?";
            const aValues = [ shid ];


            oShop.shops = await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oShop));

        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oShop = _prepareObject(req.body, req);
            oShop.shid = await db.getNextval("shid");

            const sSql = "INSERT INTO \"SHOPS\" VALUES(?,?,?,?)";
            const aValues = [ oShop.shid, oShop.bgid, oShop.name, oShop.cost];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oShop));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oShop = _prepareObject(req.body, req);
            const sSql = "UPDATE \"SHOPS\" SET \"BGID\" = ?,\"NAME\" = ?,\"COST\" = ? WHERE \"SHID\" = ?";
            const aValues = [ oShop.bgid, oShop.name, oShop.cost, oShop.shid];

            oShop.shops = await  db.executeUpdate(sSql,aValues);


            res.type("application/json").status(200).send(JSON.stringify(oShop));
        } catch (e) {
            next(e);
        }
    });

  /*  app.put("/:shid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const shid = req.params.shid;

            const oShop = _prepareObject(req.body, req);
            const sSql = "UPDATE \"SHOPS\" SET \"BAGID\" = ?,\"NAME\" = ?,\"COST\" = ? WHERE \"SHID\" = ?";
            const aValues = [ oShop.bgid, oShop.name, oShop.cost, oShop.shid];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send("Success");
        } catch (e) {
            next(e);
        }
    });
*/
    app.delete("/:shid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const shid = req.params.shid;

            const sSql = "DELETE FROM \"SHOPS\" WHERE \"SHID\" = ?";
            const aValues = [ shid ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send("Success");

        } catch (e) {
            next(e);
        }
    });

    return app;
};
