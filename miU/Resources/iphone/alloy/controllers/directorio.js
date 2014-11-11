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
    this.__controllerPath = "directorio";
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
    $.__views._W_directorio = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_directorio",
        layout: "vertical"
    });
    $.__views._W_directorio && $.addTopLevelView($.__views._W_directorio);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundGradient: {
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            },
            colors: [ {
                color: "#164A94",
                offset: 1
            }, {
                color: "#2060BC",
                offset: 0
            } ]
        },
        id: "_V_back"
    });
    $.__views._W_directorio.add($.__views._V_back);
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
        text: "Directorio",
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
        borderWidth: "1dp",
        borderColor: "#000",
        borderRadius: "10dp",
        text: "    Principal    ",
        backgroundGradient: {
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            },
            colors: [ {
                color: "#164A94",
                offset: 1
            }, {
                color: "#2060BC",
                offset: 0
            } ]
        },
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._V_contenido = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "5dp",
        left: 0,
        id: "_V_contenido",
        layout: "vertical"
    });
    $.__views._W_directorio.add($.__views._V_contenido);
    var __alloyId1 = [];
    $.__views.__alloyId2 = Ti.UI.createTableViewRow({
        id: "__alloyId2"
    });
    __alloyId1.push($.__views.__alloyId2);
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
        text: "BUSCADOR DE PERSONAS",
        id: "_L_title"
    });
    $.__views.__alloyId2.add($.__views._L_title);
    $.__views._Bar_search = Ti.UI.createSearchBar(function() {
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
            id: "_Bar_search"
        });
        return o;
    }());
    $.__views._Tbl_directorio = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        filterAttribute: "myFilter",
        data: __alloyId1,
        search: $.__views._Bar_search,
        id: "_Tbl_directorio",
        layout: "vertical"
    });
    $.__views._V_contenido.add($.__views._Tbl_directorio);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dirChild = Alloy.createCollection("directorio");
    var rows = [];
    var offsetAPI = 0;
    var limitAPI = 30;
    var readyToScroll = false;
    var readable = true;
    $._Tbl_directorio.search.addEventListener("return", function(e) {
        if (e.value.length > 2) {
            questAPI = e.value;
            var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
            var xhr = Ti.Network.createHTTPClient({
                onload: function() {
                    readyToScroll = false;
                    json = JSON.parse(this.responseText);
                    dirChild = [];
                    dirChild = Alloy.createCollection("directorio");
                    for (i = 0; i < json.length; i++) dirChild.push(Alloy.createModel("directorio", {
                        id: json[i].id,
                        name: json[i].name,
                        email: json[i].email,
                        image: json[i].photo
                    }));
                    rows = [];
                    for (var i = 0; i < dirChild.length; i++) {
                        var model = dirChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        email = "" + model.get("email");
                        image = "" + model.get("image");
                        var newRow = Alloy.createController("dirChild", {
                            id: id,
                            name: name,
                            email: email,
                            photo: image
                        });
                        rows.push(newRow.getView());
                    }
                    $._Tbl_directorio.appendRow(rows);
                    readyToScroll = true;
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("Error: " + e.error);
                },
                timeout: 3e4
            });
            strAPI = baseUrl + "?q=" + questAPI;
            offsetAPI && (strAPI += "&offset=" + offsetAPI);
            limitAPI && (strAPI += "&limit=" + limitAPI);
            xhr.open("GET", strAPI);
            xhr.send();
            $._Tbl_directorio.search.blur();
        } else alert("Por favor utilice más de 3 caracteres para realizar la búsqueda");
    });
    exports.open = function() {
        $._W_directorio.open();
        $._Tbl_directorio.search.focus();
    };
    $._L_back.addEventListener("click", function() {
        $._W_directorio.close();
        $._Tbl_directorio.search.blur();
    });
    $._W_directorio.addEventListener("android:back", function() {
        $._W_directorio.close();
        $._Tbl_directorio.search.blur();
    });
    $._Tbl_directorio.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            if (readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) dirChild.push(Alloy.createModel("directorio", {
                                id: json[i].id,
                                name: json[i].name,
                                email: json[i].email,
                                image: json[i].image
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = dirChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                email = "" + model.get("email");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("dirChild", {
                                    id: id,
                                    name: name,
                                    email: email,
                                    image: image
                                });
                                $._Tbl_directorio.appendRow(newRow.getView());
                            }
                            readyToScroll = true;
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert("Error: " + e.error);
                        },
                        timeout: 3e4
                    });
                    strAPI = baseUrl + "?offset=" + offsetAPI + "&limit=" + limitAPI;
                    questAPI = $._Tbl_directorio.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        } else {
            var tolerance = 100;
            if (e.contentSize.height < e.contentOffset.y + e.size.height + tolerance && readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) dirChild.push(Alloy.createModel("directorio", {
                                id: json[i].id,
                                name: json[i].name,
                                email: json[i].email,
                                image: json[i].image
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = dirChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                email = "" + model.get("email");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("dirChild", {
                                    id: id,
                                    name: name,
                                    email: email,
                                    image: image
                                });
                                $._Tbl_directorio.appendRow(newRow.getView());
                            }
                            readyToScroll = true;
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert("Error: " + e.error);
                        },
                        timeout: 3e4
                    });
                    strAPI = baseUrl + "?offset=" + offsetAPI + "&limit=" + limitAPI;
                    questAPI = $._Tbl_directorio.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    });
    $._Tbl_directorio.search.addEventListener("cancel", function() {
        $._Tbl_directorio.search.blur();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;