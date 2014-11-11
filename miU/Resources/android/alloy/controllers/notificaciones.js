function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "notificaciones";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views._W_notificaciones = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_notificaciones",
        layout: "vertical"
    });
    $.__views._W_notificaciones && $.addTopLevelView($.__views._W_notificaciones);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_notificaciones.add($.__views._V_back);
    $.__views._L_actual = Ti.UI.createLabel({
        color: "#FFFFFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "100%",
        width: "100%",
        left: 0,
        text: "Alertas",
        id: "_L_actual"
    });
    $.__views._V_back.add($.__views._L_actual);
    $.__views._L_back = Ti.UI.createLabel({
        color: "#FFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "80%",
        width: "auto",
        left: "10dp",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 10,
        text: "    Principal    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._L_alterno = Ti.UI.createLabel({
        color: "#FFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "80%",
        width: "auto",
        right: "10dp",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 10,
        text: "    Opciones    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_alterno"
    });
    $.__views._V_back.add($.__views._L_alterno);
    $.__views._V_contenido = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "5dp",
        left: 0,
        id: "_V_contenido",
        layout: "vertical"
    });
    $.__views._W_notificaciones.add($.__views._V_contenido);
    $.__views.__alloyId16 = Ti.UI.createSearchBar(function() {
        var o = {};
        _.extend(o, {
            width: "auto",
            barColor: "#164A94",
            showCancel: "true",
            hintText: "Buscar"
        });
        Alloy.isHandheld && _.extend(o, {
            height: "7mm"
        });
        _.extend(o, {
            id: "__alloyId16"
        });
        return o;
    }());
    var __alloyId17 = [];
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        id: "__alloyId18"
    });
    __alloyId17.push($.__views.__alloyId18);
    $.__views._L_title = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "auto",
        width: "100%",
        top: "5dp",
        left: 0,
        text: "Notificaciones",
        id: "_L_title"
    });
    $.__views.__alloyId18.add($.__views._L_title);
    $.__views._Tbl_notificaciones = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        data: __alloyId17,
        search: $.__views.__alloyId16,
        id: "_Tbl_notificaciones"
    });
    $.__views._V_contenido.add($.__views._Tbl_notificaciones);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var notificacionesChild = Alloy.createCollection("notificaciones");
    var offset = 0;
    var limit = 20;
    var ready = true;
    var baseUrl = "http://webdev.uigv.ni7.co/api/alertas/lista/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            json = JSON.parse(this.responseText);
            for (i = 0; i < json.length; i++) notificacionesChild.push(Alloy.createModel("notificaciones", {
                id: json[i].id,
                name: json[i].name,
                description: json[i].description
            }));
            for (var i = 0; i < notificacionesChild.length; i++) {
                var model = notificacionesChild.at(i);
                id = model.get("id");
                name = "" + model.get("name");
                description = "" + model.get("description");
                var newRow = Alloy.createController("notificacionesChild", {
                    id: id,
                    name: name,
                    description: description
                });
                $._Tbl_notificaciones.appendRow(newRow.getView());
            }
        },
        onerror: function(e) {
            alert("Error: " + e.error);
        },
        timeout: 3e4
    });
    xhr.open("GET", baseUrl + "?offset=" + offset + "&limit=" + limit);
    xhr.send();
    $._Tbl_notificaciones.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            var tolerance = 8;
            if (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance && ready) {
                ready = false;
                offset += limit;
                var xhr = Ti.Network.createHTTPClient({
                    onload: function() {
                        json = JSON.parse(this.responseText);
                        for (i = 0; i < json.length; i++) notificacionesChild.push(Alloy.createModel("notificaciones", {
                            id: json[i].id,
                            name: json[i].name,
                            description: json[i].description
                        }));
                        var start = $._Tbl_notificaciones.getData()[0].rows.length;
                        var stop = start + limit;
                        stop > notificacionesChild.length && (stop = notificacionesChild.length);
                        for (i = start; stop > i; i++) {
                            var model = notificacionesChild.at(i);
                            id = model.get("id");
                            name = "" + model.get("name");
                            description = "" + model.get("description");
                            var newRow = Alloy.createController("notificacionesChild", {
                                id: id,
                                name: name,
                                description: description
                            });
                            $._Tbl_notificaciones.appendRow(newRow.getView());
                        }
                    },
                    ondatastream: function() {
                        ready = true;
                    },
                    onerror: function(e) {
                        alert("Error: " + e.error);
                    },
                    timeout: 3e4
                });
                xhr.open("GET", baseUrl + "?offset=" + offset + "&limit=" + limit);
                xhr.send();
            }
        } else {
            var tolerance = 100;
            if (e.contentSize.height < e.contentOffset.y + e.size.height + tolerance && ready) {
                ready = false;
                offset += limit;
                var xhr = Ti.Network.createHTTPClient({
                    onload: function() {
                        json = JSON.parse(this.responseText);
                        for (i = 0; i < json.length; i++) notificacionesChild.push(Alloy.createModel("notificaciones", {
                            id: json[i].id,
                            name: json[i].name,
                            description: json[i].description
                        }));
                        var start = $._Tbl_notificaciones.getData()[0].rows.length;
                        var stop = start + limit;
                        stop > notificacionesChild.length && (stop = notificacionesChild.length);
                        for (i = start; stop > i; i++) {
                            var model = notificacionesChild.at(i);
                            id = model.get("id");
                            name = "" + model.get("name");
                            description = "" + model.get("description");
                            var newRow = Alloy.createController("notificacionesChild", {
                                id: id,
                                name: name,
                                description: description
                            });
                            $._Tbl_notificaciones.appendRow(newRow.getView());
                        }
                    },
                    ondatastream: function() {
                        ready = true;
                    },
                    onerror: function(e) {
                        Ti.API.debug(e.error);
                        alert("Error: " + e.error);
                    },
                    timeout: 3e4
                });
                xhr.open("GET", baseUrl + "?offset=" + offset + "&limit=" + limit);
                xhr.send();
            }
        }
    });
    exports.open = function() {
        $._W_notificaciones.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_notificaciones.close();
    });
    $._W_notificaciones.addEventListener("android:back", function() {
        $._W_notificaciones.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;