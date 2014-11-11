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
    this.__controllerPath = "eventos";
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
    $.__views._W_eventos = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_eventos"
    });
    $.__views._W_eventos && $.addTopLevelView($.__views._W_eventos);
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
    $.__views._W_eventos.add($.__views._V_back);
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
        text: "Eventos",
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
        borderWidth: "1dp",
        borderColor: "#000",
        borderRadius: "10dp",
        text: "    Categorías    ",
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
        id: "_L_alterno"
    });
    $.__views._V_back.add($.__views._L_alterno);
    $.__views._V_eventos = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        id: "_V_eventos",
        layout: "vertical"
    });
    $.__views._W_eventos.add($.__views._V_eventos);
    var __alloyId3 = [];
    $.__views._Row_eventos = Ti.UI.createTableViewRow({
        id: "_Row_eventos"
    });
    __alloyId3.push($.__views._Row_eventos);
    $.__views._L_eventos = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        height: "auto",
        width: "100%",
        left: 0,
        text: "eventos",
        id: "_L_eventos"
    });
    $.__views._Row_eventos.add($.__views._L_eventos);
    $.__views.__alloyId4 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId4"
        });
        return o;
    }());
    $.__views._Tbl_eventos = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        filterAttribute: "myFilter",
        data: __alloyId3,
        search: $.__views.__alloyId4,
        id: "_Tbl_eventos"
    });
    $.__views._V_eventos.add($.__views._Tbl_eventos);
    $.__views._V_categorias = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        visible: false,
        id: "_V_categorias",
        layout: "vertical"
    });
    $.__views._W_eventos.add($.__views._V_categorias);
    var __alloyId5 = [];
    $.__views._Row_categorias = Ti.UI.createTableViewRow({
        id: "_Row_categorias"
    });
    __alloyId5.push($.__views._Row_categorias);
    $.__views._L_categorias = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        height: "auto",
        width: "100%",
        left: 0,
        text: "CATEGORÍAS",
        id: "_L_categorias"
    });
    $.__views._Row_categorias.add($.__views._L_categorias);
    $.__views._Tbl_categorias = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        filterAttribute: "myFilter",
        data: __alloyId5,
        id: "_Tbl_categorias"
    });
    $.__views._V_categorias.add($.__views._Tbl_categorias);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var eventosChild = Alloy.createCollection("eventos");
    var readable = true;
    var rows = [];
    var currentCategory = "";
    var categories = [];
    var newRow = [];
    var questAPI = "";
    var categoryAPI = "";
    var readyToScroll = false;
    $._L_eventos.setText("Eventos Destacados");
    rows[0] = $._Tbl_eventos.getData()[0].rows[0];
    var offsetAPI = 0;
    var limitAPI = 30;
    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            readable = true;
            for (i = 0; i < json.length; i++) eventosChild.push(Alloy.createModel("eventos", {
                id: json[i].id,
                name: json[i].name,
                image: json[i].image,
                date: json[i].date
            }));
            json.length < limitAPI && (readable = false);
            for (var i = 0; i < eventosChild.length; i++) {
                var model = eventosChild.at(i);
                id = model.get("id");
                name = "" + model.get("name");
                image = "" + model.get("image");
                date = "" + model.get("date");
                var newRow = Alloy.createController("eventosChild", {
                    id: id,
                    name: name,
                    image: image,
                    date: date,
                    detailEvent: true
                });
                $._Tbl_eventos.appendRow(newRow.getView());
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
    xhr.open("GET", strAPI);
    xhr.send();
    categories[0] = $._Tbl_categorias.getData()[0].rows[0];
    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos_categorias/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            for (i = 0; i < json.length; i++) {
                newRow = Alloy.createController("eventosChild", {
                    id: json[i].id,
                    name: json[i].name,
                    eventosLength: json[i].eventosLength,
                    detailEvent: false
                });
                categories.push(newRow.getView());
            }
            $._Tbl_categorias.setData(categories);
            limitAPI = 30;
            offsetAPI = 0;
            readyToScroll = true;
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("Error: " + e.error);
        },
        timeout: 3e4
    });
    xhr.open("GET", baseUrl);
    xhr.send();
    var eventCurrent = true;
    exports.open = function() {
        $._W_eventos.open();
    };
    $._Tbl_categorias.addEventListener("click", function(e) {
        if ("android" === Titanium.Platform.getName()) if (e.rowData.title && e.rowData.title != $._L_categorias.getText()) {
            currentCategory = e.rowData.title;
            correctClick = true;
        } else correctClick = false; else if (e.rowData.myFilter) {
            currentCategory = e.rowData.myFilter;
            correctClick = true;
        } else correctClick = false;
        if (correctClick) {
            var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function() {
                    readyToScroll = false;
                    json = JSON.parse(this.responseText);
                    eventosChild = [];
                    eventosChild = Alloy.createCollection("eventos");
                    readable = true;
                    for (i = 0; i < json.length; i++) eventosChild.push(Alloy.createModel("eventos", {
                        id: json[i].id,
                        name: json[i].name,
                        image: json[i].image,
                        date: json[i].date
                    }));
                    json.length < limitAPI && (readable = false);
                    rows = [];
                    $._L_eventos.setText(currentCategory.toUpperCase());
                    rows[0] = $._Tbl_eventos.getData()[0].rows[0];
                    for (var i = 0; i < eventosChild.length; i++) {
                        var model = eventosChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        date = "" + model.get("date");
                        var newRow = Alloy.createController("eventosChild", {
                            id: id,
                            name: name,
                            image: image,
                            date: date,
                            detailEvent: true
                        });
                        rows.push(newRow.getView());
                    }
                    $._Tbl_eventos.data = [];
                    $._Tbl_eventos.setData(rows);
                    $._V_eventos.show();
                    $._V_categorias.hide();
                    $._L_back.setText("    Principal    ");
                    $._L_actual.setText("Eventos");
                    $._L_alterno.show();
                    eventCurrent = true;
                    readyToScroll = true;
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("Error: " + e.error);
                },
                timeout: 3e4
            });
            categoryAPI = e.row.categoryID;
            strAPI = baseUrl + "?category=" + categoryAPI;
            $._Tbl_eventos.search.setValue("");
            limitAPI = 30;
            offsetAPI = 0;
            offsetAPI && (strAPI += "&offset=" + offsetAPI);
            limitAPI && (strAPI += "&limit=" + limitAPI);
            xhr.open("GET", strAPI);
            xhr.send();
        }
    });
    $._W_eventos.addEventListener("android:back", function() {
        $._W_eventos.close();
        $._Tbl_eventos.search.blur();
    });
    $._L_alterno.addEventListener("click", function() {
        $._V_categorias.show();
        $._V_eventos.hide();
        $._L_back.setText("    Atrás    ");
        $._L_actual.setText("Categorías");
        $._L_alterno.hide();
        eventCurrent = false;
    });
    $._L_back.addEventListener("click", function() {
        $._Tbl_eventos.search.blur();
        $._V_eventos.show();
        if (eventCurrent) $._W_eventos.close(); else {
            $._V_categorias.hide();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Eventos");
            $._L_alterno.show();
            eventCurrent = true;
        }
    });
    $._Tbl_eventos.search.addEventListener("cancel", function() {
        $._Tbl_eventos.search.blur();
    });
    $._Tbl_eventos.search.addEventListener("return", function(e) {
        questAPI = e.value;
        var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function() {
                readyToScroll = false;
                json = JSON.parse(this.responseText);
                eventosChild = [];
                eventosChild = Alloy.createCollection("eventos");
                for (i = 0; i < json.length; i++) eventosChild.push(Alloy.createModel("eventos", {
                    id: json[i].id,
                    name: json[i].name,
                    image: json[i].image,
                    date: json[i].date
                }));
                rows = [];
                $._L_eventos.setText(currentCategory.toUpperCase());
                rows[0] = $._Tbl_eventos.getData()[0].rows[0];
                for (var i = 0; i < eventosChild.length; i++) {
                    var model = eventosChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    date = "" + model.get("date");
                    var newRow = Alloy.createController("eventosChild", {
                        id: id,
                        name: name,
                        image: image,
                        date: date,
                        detailEvent: true
                    });
                    rows.push(newRow.getView());
                }
                $._Tbl_eventos.data = [];
                $._Tbl_eventos.setData(rows);
                readyToScroll = true;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("Error: " + e.error);
            },
            timeout: 3e4
        });
        strAPI = baseUrl + "?q=" + questAPI;
        categoryAPI && (strAPI += "&category=" + categoryAPI);
        offserAPI = 0;
        limitAPI = 30;
        offsetAPI && (strAPI += "&offset=" + offsetAPI);
        limitAPI && (strAPI += "&limit=" + limitAPI);
        xhr.open("GET", strAPI);
        xhr.send();
        $._Tbl_eventos.search.blur();
    });
    $._Tbl_eventos.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            var tolerance = 8;
            if (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance && readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) eventosChild.push(Alloy.createModel("eventos", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                date: json[i].date
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = eventosChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("eventosChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    date: date,
                                    detailEvent: true
                                });
                                $._Tbl_eventos.appendRow(newRow.getView());
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
                    categoryAPI && (strAPI += "&category=" + categoryAPI);
                    questAPI = $._Tbl_eventos.search.getValue();
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) eventosChild.push(Alloy.createModel("eventos", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                date: json[i].date
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = eventosChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("eventosChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    date: date,
                                    detailEvent: true
                                });
                                $._Tbl_eventos.appendRow(newRow.getView());
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
                    categoryAPI && (strAPI += "&category=" + categoryAPI);
                    questAPI = $._Tbl_eventos.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    });
    $._W_eventos.addEventListener("open", function() {
        $._Tbl_eventos.search.hide();
        "android" == Titanium.Platform.getOsname() ? setTimeout(function() {
            $._Tbl_eventos.search.show();
        }, 1e3) : setTimeout(function() {
            $._Tbl_eventos.search.show();
        }, 50);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;