/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oUser, req) {
    return oUser;
}


module.exports = () => {
    const app = express.Router();

      app.get ("/", async (req, res, next) =>{
          try {

          const db = new dbClass(req.db);
          const oUser = _prepareObject(req.body, req);
          const sSql = "SELECT * FROM \"BAGS\"";
          oUser.bags = await db.executeUpdate(sSql);
          res.type("application/json").status(200).send(JSON.stringify(oUser));

      } catch (e) {
        next(e);
    }
      })

     ;

        app.get("/:bgid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const oUser = _prepareObject(req.body, req);

            const bgid = req.params.bgid;

            const sSql = "SELECT * FROM \"BAGS\" WHERE \"BGID\" = ?";
            const aValues = [ bgid ];


            oUser.bags = await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oUser));

        } catch (e) {
              next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            oUser.bgid = await db.getNextval("bgid");

            const sSql = "INSERT INTO \"BAGS\" VALUES(?,?,?,?)";
            const aValues = [ oUser.bgid, oUser.name, oUser.color, oUser.descr];

             await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oUser = _prepareObject(req.body, req);
            const sSql = "UPDATE \"BAGS\" SET \"NAME\" = ?,\"COLOR\" = ?,\"DESCR\" = ? WHERE \"BGID\" = ?";
            const aValues = [ oUser.name,oUser.color,oUser.descr,oUser.bgid ];

            oUser.bags = await  db.executeUpdate(sSql,aValues);


            res.type("application/json").status(200).send(JSON.stringify(oUser));
        } catch (e) {
            next(e);
        }
    });

    /*app.put("/:bgid", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const bgid = req.params.bgid;

            const oUser = _prepareObject(req.body, req);
            const sSql = "UPDATE \"BAGS\" SET \"NAME\" = ?,\"COLOR\" = ?,\"DESCR\" = ? WHERE \"BGID\" = ?";
            const aValues = [  oUser.name,oUser.color,oUser.descr,bgid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send("Success");
        } catch (e) {
            next(e);
        }
    });*/

    app.delete("/:bgid", async (req, res, next) => {

        try {
            const db = new dbClass(req.db);
            const bgid = req.params.bgid;

            const sSql = "DELETE FROM \"BAGS\" WHERE \"BGID\" = ?";
            const aValues = [ bgid ];


            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send("Success");

        } catch (e) {
            next(e);
        }
    });

    return app;
};
