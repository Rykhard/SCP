sap.ui.define([
    "bag/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel,MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType) {
    "use strict";

    return BaseController.extend("bag.controller.Main", {
        onInit: function () {
            this.oDataModel1 = new JSONModel({});
            //For local development. Start your NodeJS server.
            // this.host = "http://localhost:3000";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "http://localhost:3000";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://p2001017289trial-trial-dev-lev-srv.cfapps.eu10.hana.ondemand.com";

            this.oDataModel = new JSONModel({
                toBags: {}
            });

            this.getView().setModel(this.oDataModel, "data");


            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Shop").attachMatched(this._onRouteMatched, this);

        },

        closeDialog: function () {

            if (this.dialog) {this.dialog.close();}
            if (this.dialog1) {this.dialog1.close();}
            this._onRouteMatched();
        },

        _onRouteMatched: function (oEvent) {

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/info", true);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    this.getView().getModel("data").setData(JSON.parse(XHR.response));
                    // console.log(XHR.response);
                }
            }.bind(this);

        },
        onDeletePress: function (oEvent) {

            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext("data");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {

                }
            }
            xhr.open("DELETE", "http://localhost:3000/info/" + oCtx.getProperty("SHID"));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            console.log(oCtx.getProperty());

            this._onRouteMatched();

        },
        onCreate: function (oEvent) {

            //var path = oEvent.getSource().getBindingContext("data").getPath();
            if (!this.dialog) {
                // This fragment can be instantiated from a controller as follows:
                this.dialog = sap.ui.xmlfragment("bag.view.dialogBoxShop", this);
                //debugger;
            }
            this.getView().addDependent(this.dialog);

            this.dialog.open();

        },
        show: function (callback) {
            var p = {};
            var obj = new Array;

            this.oDataModel1 = new JSONModel();
            this.getView().setModel(this.oDataModel1, "test");
            //this.oDataModel.setModel("test");
            /* var XHR = new XMLHttpRequest();
             XHR.open("GET", "http://localhost:3000/bags", true);
             XHR.setRequestHeader("Content-Type", "application/json");
             XHR.send();
             XHR.onreadystatechange = function () {
                 if (XHR.readyState == 4 && XHR.status == 200) {

                     this.getView().getModel("test").setData(JSON.parse(XHR.response));
                     for (var i = 0; i < this.getView().getModel("test").oData.bags.length; i++) {

                         p[i] = this.getView().getModel("test").oData.bags[i].BGID;
                     }
                     for (var key in p) {
                         obj.push(p[key]);
                     }
                     callback(obj);
                }
             }*/

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "GET",
                url: this.host + "/bags",
                dataType: "json",
                contentType: "application/json",

                success: function (data) {


                    this.oDataModel1.setData(data);

                    for (var i = 0; i < this.oDataModel1.oData.bags.length; i++) {

                        p[i] = this.oDataModel1.oData.bags[i].BGID;

                    }
                    for (var key in p) {
                        obj.push(p[key]);
                    }
                    callback(obj);
                    console.log(obj);
                    this.getApp().setBusy(false);
                    this._onRouteMatched();
                }.bind(this),

            });

        },

        createDialog: function () {

            var formData = {

                "bgid": sap.ui.getCore().byId("input").getValue(),
                "name": sap.ui.getCore().byId("input0").getValue(),
                "cost": sap.ui.getCore().byId("input1").getValue()
            };

            this.getApp().setBusy(true);
            var req = jQuery.ajax({
                type: "POST",
                url: this.host + "/info",
                dataType: "json",
                contentType: "application/json",
                test: this.show(function (num) {

                    for(var i in num) {


                        if (formData.bgid == num[i]) {


                            req.abort();
                            console.log(num[i]);

                        }
                    }

                }),
                data: JSON.stringify(formData),

                success: function (data) {
                    sap.m.MessageBox.success("New Shop Created");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);

                }.bind(this),
                error: function (oError) {

                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("New Shop not created");
                }.bind(this),

            })

        },

        onUpdate: function(oEvent){

            var path = oEvent.getSource().getBindingContext("data").getPath();
            if (!this.dialog1) {
                this.dialog1 = sap.ui.xmlfragment("bag.view.dialogBoxUpdateShop", this);
            }
            this.getView().addDependent(this.dialog1);
            this.dialog1.bindElement({
                path: path,
                model: "data"
            });
            this.dialog1.open();

        },

        updateDialog: function(){
            var formData = {
                "bgid": sap.ui.getCore().byId("input228").getText(),
                "lpid": sap.ui.getCore().byId("input2287").getText(),
                "name": sap.ui.getCore().byId("input143434342").getValue(),
                "cost": sap.ui.getCore().byId("input43654354353").getValue()
            };
            console.log(formData);

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "PUT",
                url: this.host + "/info",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (data) {
                    sap.m.MessageBox.success("Shops Updated");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Updating failed");
                }.bind(this),

            });
            console.log(this.getView().getModel("data").oData);

        },

        onSearch : function () {
            var oView = this.getView(),
                sValue = oView.byId("searchField").getValue(),
                oFilter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, sValue);
            oView.byId("shopsList").getBinding("items").filter(oFilter);
            console.log(oFilter);
            console.log("test");

        },

        onCancel: function () {

            this.oDataModel.setData();
        },
        navigateBag: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Master");
        },
        navigateLaptop: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Laptop");
        }
    });
});
