sap.ui.define([
    "bag/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageToast",
], function (BaseController, JSONModel,MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType) {
    "use strict";

    return BaseController.extend("bag.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            // this.host = "http://localhost:3000";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "http://localhost:3000";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://p2001017289trial-trial-dev-lev-srv.cfapps.eu10.hana.ondemand.com";
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Master").attachMatched(this._onRouteMatched, this);

            this.oDataModel = new JSONModel({
                toAddress: {}
            });
            this.getView().setModel(this.oDataModel, "data");

            var path;

        },

        closeDialog: function() {
            if (this.dialog) {this.dialog.close();}
            if (this.dialog1) {this.dialog1.close();}
            if (this.dialog2) {this.dialog2.close();}
            this._onRouteMatched();

        },

        _onRouteMatched: function () {
            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/bags", true);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    this.getView().getModel("data").setData(JSON.parse(XHR.response));

                    for(var i = 0; i<this.getView().getModel("data").oData.bags.length;i++){
}                }
            }.bind(this);

        },
        onDeleteBox: function(oEvent){

            this.path = oEvent.getSource().getBindingContext("data").getProperty("BGID");
            if (!this.dialog2) {
                // This fragment can be instantiated from a controller as follows:
                this.dialog2 = sap.ui.xmlfragment("bag.view.dialogBoxDelete", this);
                //debugger;
            }
            this.getView().addDependent(this.dialog2);
            this.dialog2.open();
        },
        onDeletePress: function (oEvent) {

            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext("data");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {

                }
            }
            xhr.open("DELETE", "http://localhost:3000/bags/" + this.path);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

            this._onRouteMatched();
            this.dialog2.close();
        },
    onCreate: function(oEvent){

        if (!this.dialog) {
            this.dialog = sap.ui.xmlfragment("bag.view.dialogBox", this);
        }
        this.getView().addDependent(this.dialog);

        this.dialog.open();

    },
        createDialog: function(){
            var formData = {
                "bgid":"",
                "name": sap.ui.getCore().byId("input0").getValue(),
                "color": sap.ui.getCore().byId("input1").getValue(),
                "descr": sap.ui.getCore().byId("input2").getValue()
            };

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "POST",
                url: this.host + "/bags",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (data) {
                    sap.m.MessageBox.success("New Bag Created");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                    //console.log(oData);
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("New Bag not created");
                }.bind(this)

            });
        },

        onUpdate: function(oEvent){

            var path = oEvent.getSource().getBindingContext("data").getPath();
            if (!this.dialog1) {
                this.dialog1 = sap.ui.xmlfragment("bag.view.dialogBoxUpdateBag", this);
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
                "name": sap.ui.getCore().byId("input143434342").getValue(),
                "color": sap.ui.getCore().byId("input43654354353").getValue(),
                "descr": sap.ui.getCore().byId("input1488").getValue()
            };
            console.log(formData);

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "PUT",
                url: this.host + "/bags",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (data) {
                    sap.m.MessageBox.success("Bags Updated");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Updating failed");
                }.bind(this)

            });
        },

        onSearch : function () {
            var oView = this.getView(),
                sValue = oView.byId("searchField").getValue(),
                oFilter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, sValue);
            oView.byId("bagsList").getBinding("items").filter(oFilter);
            console.log(oFilter);
            this.oDataModel1 = new JSONModel();

            console.log("test");

        },
        onSort : function () {
            var oSorter1 = new sap.ui.model.Sorter({
                path: "BGID",
                descending: true,
                group: false
            });
            var oSorter2 = new sap.ui.model.Sorter({
                path: "BGID",
                ascending: true,
                group: false
            });

            var table = this.getView().byId("bagsList");
            var sort = this.getView().getModel("data").getProperty("/descending");
            this.getView().getModel("data").setProperty("/descending", !sort);
            if (!sort) {
                table.getBinding("items").sort(oSorter2);
            } else {
                table.getBinding("items").sort(oSorter1);
            }
        },

        onCancel: function(){

            this.oDataModel.setData();

        },

        navigateShop: function(){
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Shop");
        },
        navigateLaptop: function(){
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Laptop");
        },


    });
});
