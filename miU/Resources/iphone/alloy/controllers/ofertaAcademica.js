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
    this.__controllerPath = "ofertaAcademica";
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
    $.__views._W_ofertaAcademica = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_ofertaAcademica"
    });
    $.__views._W_ofertaAcademica && $.addTopLevelView($.__views._W_ofertaAcademica);
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
    $.__views._W_ofertaAcademica.add($.__views._V_back);
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
        text: "Facultades",
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
        text: "    Programas    ",
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
    $.__views._V_facultades = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        id: "_V_facultades"
    });
    $.__views._W_ofertaAcademica.add($.__views._V_facultades);
    var __alloyId20 = [];
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        id: "__alloyId21"
    });
    __alloyId20.push($.__views.__alloyId21);
    $.__views._L_facultades = Ti.UI.createLabel({
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
        text: "FACULTADES",
        id: "_L_facultades"
    });
    $.__views.__alloyId21.add($.__views._L_facultades);
    $.__views.__alloyId22 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId22"
        });
        return o;
    }());
    $.__views._Tbl_facultades = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        filterAttribute: "myFilter",
        data: __alloyId20,
        search: $.__views.__alloyId22,
        id: "_Tbl_facultades"
    });
    $.__views._V_facultades.add($.__views._Tbl_facultades);
    $.__views._V_ofertaAcademica = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        visible: false,
        id: "_V_ofertaAcademica"
    });
    $.__views._W_ofertaAcademica.add($.__views._V_ofertaAcademica);
    var __alloyId23 = [];
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        id: "__alloyId24"
    });
    __alloyId23.push($.__views.__alloyId24);
    $.__views._L_ofertaAcademica = Ti.UI.createLabel({
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
        text: "Todos los programas",
        id: "_L_ofertaAcademica"
    });
    $.__views.__alloyId24.add($.__views._L_ofertaAcademica);
    $.__views.__alloyId25 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId25"
        });
        return o;
    }());
    $.__views._Tbl_ofertaAcademica = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        filterAttribute: "myFilter",
        data: __alloyId23,
        search: $.__views.__alloyId25,
        id: "_Tbl_ofertaAcademica"
    });
    $.__views._V_ofertaAcademica.add($.__views._Tbl_ofertaAcademica);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ofertaAcademicaChild = Alloy.createCollection("ofertaAcademica");
    var rows = [];
    var currentFacultad = "";
    var facultades = [];
    var newRow = [];
    var questAPI = "";
    var facultadAPI = "";
    var readyToScroll = false;
    rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
    facultades[0] = $._Tbl_facultades.getData()[0].rows[0];
    var baseUrl = "http://webdev.uigv.ni7.co/api/ofertaAcademica_facultades/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            for (i = 0; i < json.length; i++) {
                newRow = Alloy.createController("ofertaAcademicaChild", {
                    id: json[i].id,
                    name: json[i].name,
                    programLength: json[i].programLength,
                    detailEvent: false
                });
                facultades.push(newRow.getView());
            }
            $._Tbl_facultades.setData(facultades);
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
    var offsetAPI = 0;
    var limitAPI = 30;
    var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            readable = true;
            for (i = 0; i < json.length; i++) ofertaAcademicaChild.push(Alloy.createModel("ofertaAcademica", {
                id: json[i].id,
                name: json[i].name,
                image: json[i].image
            }));
            json.length < limitAPI && (readable = false);
            for (var i = 0; i < ofertaAcademicaChild.length; i++) {
                var model = ofertaAcademicaChild.at(i);
                id = model.get("id");
                name = "" + model.get("name");
                image = "" + model.get("image");
                var newRow = Alloy.createController("ofertaAcademicaChild", {
                    id: id,
                    name: name,
                    image: image,
                    detailEvent: true
                });
                $._Tbl_ofertaAcademica.appendRow(newRow.getView());
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
    var oferCurrent = false;
    exports.open = function() {
        $._W_ofertaAcademica.open();
    };
    $._Tbl_facultades.addEventListener("click", function(e) {
        if ("android" === Titanium.Platform.getName()) if (e.rowData.title && e.rowData.title != $._L_facultades.getText()) {
            currentFacultad = e.rowData.title;
            correctClick = true;
        } else correctClick = false; else if (e.rowData.myFilter) {
            currentFacultad = e.rowData.myFilter;
            correctClick = true;
        } else correctClick = false;
        if (correctClick) {
            var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function() {
                    readyToScroll = false;
                    json = JSON.parse(this.responseText);
                    ofertaAcademicaChild = [];
                    ofertaAcademicaChild = Alloy.createCollection("ofertaAcademica");
                    readable = true;
                    for (i = 0; i < json.length; i++) ofertaAcademicaChild.push(Alloy.createModel("ofertaAcademica", {
                        id: json[i].id,
                        name: json[i].name,
                        image: json[i].image
                    }));
                    json.length < limitAPI && (readable = false);
                    rows = [];
                    $._L_ofertaAcademica.setText(currentFacultad.toUpperCase());
                    rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
                    for (var i = 0; i < ofertaAcademicaChild.length; i++) {
                        var model = ofertaAcademicaChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        var newRow = Alloy.createController("ofertaAcademicaChild", {
                            id: id,
                            name: name,
                            image: image,
                            detailEvent: true
                        });
                        rows.push(newRow.getView());
                    }
                    $._Tbl_ofertaAcademica.data = [];
                    $._Tbl_ofertaAcademica.setData(rows);
                    $._V_ofertaAcademica.show();
                    $._V_facultades.hide();
                    $._L_back.setText("    Facultades    ");
                    $._L_actual.setText("Programas");
                    $._L_alterno.hide();
                    oferCurrent = true;
                    readyToScroll = true;
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("Error: " + e.error);
                },
                timeout: 3e4
            });
            facultadAPI = e.row.categoryID;
            strAPI = baseUrl + "?facultad=" + facultadAPI;
            $._Tbl_ofertaAcademica.search.setValue("");
            limitAPI = 30;
            offsetAPI = 0;
            offsetAPI && (strAPI += "&offset=" + offsetAPI);
            limitAPI && (strAPI += "&limit=" + limitAPI);
            xhr.open("GET", strAPI);
            xhr.send();
        }
    });
    $._Tbl_ofertaAcademica.search.addEventListener("return", function(e) {
        questAPI = e.value;
        var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function() {
                readyToScroll = false;
                json = JSON.parse(this.responseText);
                ofertaAcademicaChild = [];
                ofertaAcademicaChild = Alloy.createCollection("ofertaAcademica");
                for (i = 0; i < json.length; i++) ofertaAcademicaChild.push(Alloy.createModel("ofertaAcademica", {
                    id: json[i].id,
                    name: json[i].name,
                    image: json[i].image
                }));
                rows = [];
                $._L_ofertaAcademica.setText(currentFacultad.toUpperCase());
                rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
                for (var i = 0; i < ofertaAcademicaChild.length; i++) {
                    var model = ofertaAcademicaChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    var newRow = Alloy.createController("ofertaAcademicaChild", {
                        id: id,
                        name: name,
                        image: image,
                        detailEvent: true
                    });
                    rows.push(newRow.getView());
                }
                $._Tbl_ofertaAcademica.data = [];
                $._Tbl_ofertaAcademica.setData(rows);
                readyToScroll = true;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("Error: " + e.error);
            },
            timeout: 3e4
        });
        strAPI = baseUrl + "?q=" + questAPI;
        facultadAPI && (strAPI += "&facultad=" + facultadAPI);
        offserAPI = 0;
        limitAPI = 30;
        offsetAPI && (strAPI += "&offset=" + offsetAPI);
        limitAPI && (strAPI += "&limit=" + limitAPI);
        xhr.open("GET", strAPI);
        xhr.send();
        $._Tbl_ofertaAcademica.search.blur();
    });
    $._Tbl_ofertaAcademica.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            var tolerance = 8;
            if (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance && readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) ofertaAcademicaChild.push(Alloy.createModel("ofertaAcademica", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = ofertaAcademicaChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("ofertaAcademicaChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    detailEvent: true
                                });
                                $._Tbl_ofertaAcademica.appendRow(newRow.getView());
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
                    facultadAPI && (strAPI += "&facultad=" + facultadAPI);
                    questAPI = $._Tbl_ofertaAcademica.search.getValue();
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; i < json.length; i++) ofertaAcademicaChild.push(Alloy.createModel("ofertaAcademica", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image
                            }));
                            json.length < limitAPI && (readable = false);
                            for (i = 0; i < json.length; i++) {
                                var model = ofertaAcademicaChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("ofertaAcademicaChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    detailEvent: true
                                });
                                $._Tbl_ofertaAcademica.appendRow(newRow.getView());
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
                    facultadAPI && (strAPI += "&facultad=" + facultadAPI);
                    questAPI = $._Tbl_ofertaAcademica.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    });
    $._L_alterno.addEventListener("click", function() {
        $._V_facultades.hide();
        $._V_ofertaAcademica.show();
        $._L_back.setText("    Facultades    ");
        $._L_actual.setText("Programas");
        $._L_alterno.hide();
        oferCurrent = true;
    });
    $._L_back.addEventListener("click", function() {
        $._Tbl_facultades.search.blur();
        $._Tbl_ofertaAcademica.search.blur();
        $._V_ofertaAcademica.hide();
        if (oferCurrent) {
            $._V_facultades.show();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Facultades");
            $._L_alterno.show();
            oferCurrent = false;
        } else $._W_ofertaAcademica.close();
    });
    $._W_ofertaAcademica.addEventListener("android:back", function() {
        $._W_ofertaAcademica.close();
        $._Tbl_ofertaAcademica.search.blur();
        $._Tbl_facultades.search.blur();
    });
    $._Tbl_facultades.search.addEventListener("cancel", function() {
        $._Tbl_facultades.search.blur();
    });
    $._Tbl_ofertaAcademica.search.addEventListener("cancel", function() {
        $._Tbl_ofertaAcademica.search.blur();
    });
    $._W_ofertaAcademica.addEventListener("open", function() {
        $._Tbl_ofertaAcademica.search.hide();
        $._Tbl_facultades.search.hide();
        "android" == Titanium.Platform.getOsname() ? setTimeout(function() {
            $._Tbl_facultades.search.show();
            $._Tbl_ofertaAcademica.search.show();
        }, 1e3) : setTimeout(function() {
            $._Tbl_facultades.search.show();
            $._Tbl_ofertaAcademica.search.show();
        }, 50);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;