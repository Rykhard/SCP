sap.ui.define([
    "bag/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
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
            router.getRoute("Laptop").attachMatched(this._onRouteMatched, this);

            this.oDataModel = new JSONModel({
                toAddress: {}
            });
            this.getView().setModel(this.oDataModel, "data");
        },

        closeDialog: function(){
            if (this.dialog) {this.dialog.close();}
             this._onRouteMatched();
        },


        _onRouteMatched: function () {
            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/laptops", true);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    this.getView().getModel("data").setData(JSON.parse(XHR.response));
                    console.log(XHR.response);
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
            xhr.open("DELETE", "http://localhost:3000/laptops/" + oCtx.getProperty("LPID"));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            console.log(oCtx.getProperty());

            this._onRouteMatched();

        },
        onCreate: function(oEvent){
            if (!this.dialog) {
                // This fragment can be instantiated from a controller as follows:
                this.dialog = sap.ui.xmlfragment("bag.view.dialogBoxLaptop", this);
                //debugger;
            }
            this.getView().addDependent(this.dialog);

            this.dialog.open();


        },
        createDialog: function(){
                 var formData = {
                "bgid": sap.ui.getCore().byId("input").getValue(),
                "name": sap.ui.getCore().byId("input0").getValue(),
                "screen": sap.ui.getCore().byId("input1").getValue()
                    };

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "POST",
                url: this.host + "/laptops",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (data) {
                    sap.m.MessageBox.success("New laptop Created");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                    //console.log(oData);
                }.bind(this),
                error: function (oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("New laptop not created");
                }.bind(this)

            });
        },

        onCancel: function(){

            this.oDataModel.setData();
        },
        navigateBag: function(){
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Master");
        },
        navigateShop: function(){
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.navTo("Shop");
        }

    });
});
