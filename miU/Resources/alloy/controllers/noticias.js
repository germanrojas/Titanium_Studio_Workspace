function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "noticias";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views._W_noticias = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_noticias"
    });
    $.__views._W_noticias && $.addTopLevelView($.__views._W_noticias);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_noticias.add($.__views._V_back);
    $.__views._L_actual = Ti.UI.createLabel({
        color: "#FFFFFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "100%",
        width: "100%",
        left: 0,
        text: "Noticias",
        id: "_L_actual"
    });
    $.__views._V_back.add($.__views._L_actual);
    $.__views._L_back = Ti.UI.createLabel({
        color: "#FFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "12dp",
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
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "80%",
        width: "auto",
        right: "10dp",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 10,
        text: "    Categorías    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_alterno"
    });
    $.__views._V_back.add($.__views._L_alterno);
    $.__views._V_noticias = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        id: "_V_noticias"
    });
    $.__views._W_noticias.add($.__views._V_noticias);
    $.__views._Row_noticias = Ti.UI.createTableViewRow({
        id: "_Row_noticias"
    });
    var __alloyId12 = [];
    __alloyId12.push($.__views._Row_noticias);
    $.__views._L_noticias = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontSize: "15dp"
        },
        height: "auto",
        width: "100%",
        left: 0,
        text: "NOTICIAS",
        id: "_L_noticias"
    });
    $.__views._Row_noticias.add($.__views._L_noticias);
    $.__views.__alloyId13 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId13"
        });
        return o;
    }());
    $.__views._Tbl_noticias = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        data: __alloyId12,
        search: $.__views.__alloyId13,
        id: "_Tbl_noticias"
    });
    $.__views._V_noticias.add($.__views._Tbl_noticias);
    $.__views._V_categorias = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "50dp",
        left: 0,
        visible: false,
        id: "_V_categorias"
    });
    $.__views._W_noticias.add($.__views._V_categorias);
    $.__views._Row_categorias = Ti.UI.createTableViewRow({
        id: "_Row_categorias"
    });
    var __alloyId14 = [];
    __alloyId14.push($.__views._Row_categorias);
    $.__views._L_categorias = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontSize: "15dp"
        },
        height: "auto",
        width: "100%",
        left: 0,
        text: "CATEGORÍAS",
        id: "_L_categorias"
    });
    $.__views._Row_categorias.add($.__views._L_categorias);
    $.__views.__alloyId15 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId15"
        });
        return o;
    }());
    $.__views._Tbl_categorias = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        data: __alloyId14,
        search: $.__views.__alloyId15,
        id: "_Tbl_categorias"
    });
    $.__views._V_categorias.add($.__views._Tbl_categorias);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var noticiasChild = Alloy.createCollection("noticias");
    var rows = [];
    var currentCategory = "";
    var categories = [];
    var newRow = [];
    var questAPI = "";
    var categoryAPI = "";
    var readyToScroll = false;
    $._L_noticias.setText("Noticias Destacadas");
    rows[0] = $._Tbl_noticias.getData()[0].rows[0];
    var offsetAPI = 0;
    var limitAPI = 30;
    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            readable = true;
            for (i = 0; json.length > i; i++) noticiasChild.push(Alloy.createModel("noticias", {
                id: json[i].id,
                name: json[i].name,
                image: json[i].image,
                date: json[i].date
            }));
            limitAPI > json.length && (readable = false);
            for (var i = 0; noticiasChild.length > i; i++) {
                var model = noticiasChild.at(i);
                id = model.get("id");
                name = "" + model.get("name");
                image = "" + model.get("image");
                date = "" + model.get("date");
                var newRow = Alloy.createController("noticiasChild", {
                    id: id,
                    name: name,
                    image: image,
                    date: date,
                    detailEvent: true
                });
                $._Tbl_noticias.appendRow(newRow.getView());
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
    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias_categorias/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            for (i = 0; json.length > i; i++) {
                newRow = Alloy.createController("noticiasChild", {
                    id: json[i].id,
                    name: json[i].name,
                    noticiasLength: json[i].noticiasLength,
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
    var notiCurrent = true;
    exports.open = function() {
        $._W_noticias.open();
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
            var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function() {
                    readyToScroll = false;
                    json = JSON.parse(this.responseText);
                    noticiasChild = [];
                    noticiasChild = Alloy.createCollection("noticias");
                    readable = true;
                    for (i = 0; json.length > i; i++) noticiasChild.push(Alloy.createModel("noticias", {
                        id: json[i].id,
                        name: json[i].name,
                        image: json[i].image,
                        date: json[i].date
                    }));
                    limitAPI > json.length && (readable = false);
                    rows = [];
                    $._L_noticias.setText(currentCategory.toUpperCase());
                    rows[0] = $._Tbl_noticias.getData()[0].rows[0];
                    for (var i = 0; noticiasChild.length > i; i++) {
                        var model = noticiasChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        date = "" + model.get("date");
                        var newRow = Alloy.createController("noticiasChild", {
                            id: id,
                            name: name,
                            image: image,
                            date: date,
                            detailEvent: true
                        });
                        rows.push(newRow.getView());
                    }
                    $._Tbl_noticias.data = [];
                    $._Tbl_noticias.setData(rows);
                    $._V_noticias.show();
                    $._V_categorias.hide();
                    $._L_back.setText("    Principal    ");
                    $._L_actual.setText("noticias");
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
            $._Tbl_noticias.search.setValue("");
            limitAPI = 30;
            offsetAPI = 0;
            offsetAPI && (strAPI += "&offset=" + offsetAPI);
            limitAPI && (strAPI += "&limit=" + limitAPI);
            xhr.open("GET", strAPI);
            xhr.send();
        }
    });
    $._W_noticias.addEventListener("android:back", function() {
        $._W_noticias.close();
        $._Tbl_noticias.search.blur();
        $._Tbl_categorias.search.blur();
    });
    $._L_alterno.addEventListener("click", function() {
        $._V_categorias.show();
        $._V_noticias.hide();
        $._L_back.setText("    Atrás    ");
        $._L_actual.setText("Categorías");
        $._L_alterno.hide();
        notiCurrent = false;
    });
    $._L_back.addEventListener("click", function() {
        $._Tbl_categorias.search.blur();
        $._Tbl_noticias.search.blur();
        $._V_noticias.show();
        if (notiCurrent) $._W_noticias.close(); else {
            $._V_categorias.hide();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Noticias");
            $._L_alterno.show();
            notiCurrent = true;
        }
    });
    $._Tbl_noticias.search.addEventListener("cancel", function() {
        $._Tbl_noticias.search.blur();
    });
    $._Tbl_noticias.search.addEventListener("return", function(e) {
        questAPI = e.value;
        var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function() {
                readyToScroll = false;
                json = JSON.parse(this.responseText);
                noticiasChild = [];
                noticiasChild = Alloy.createCollection("noticias");
                for (i = 0; json.length > i; i++) noticiasChild.push(Alloy.createModel("noticias", {
                    id: json[i].id,
                    name: json[i].name,
                    image: json[i].image,
                    date: json[i].date
                }));
                rows = [];
                $._L_noticias.setText(currentCategory.toUpperCase());
                rows[0] = $._Tbl_noticias.getData()[0].rows[0];
                for (var i = 0; noticiasChild.length > i; i++) {
                    var model = noticiasChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    date = "" + model.get("date");
                    var newRow = Alloy.createController("noticiasChild", {
                        id: id,
                        name: name,
                        image: image,
                        date: date,
                        detailEvent: true
                    });
                    rows.push(newRow.getView());
                }
                $._Tbl_noticias.data = [];
                $._Tbl_noticias.setData(rows);
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
        $._Tbl_noticias.search.blur();
    });
    $._Tbl_noticias.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            var tolerance = 8;
            if (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance && readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; json.length > i; i++) noticiasChild.push(Alloy.createModel("noticias", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                date: json[i].date
                            }));
                            limitAPI > json.length && (readable = false);
                            for (i = 0; json.length > i; i++) {
                                var model = noticiasChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("noticiasChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    date: date,
                                    detailEvent: true
                                });
                                $._Tbl_noticias.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_noticias.search.getValue();
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
                    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/noticias/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; json.length > i; i++) noticiasChild.push(Alloy.createModel("noticias", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                date: json[i].date
                            }));
                            limitAPI > json.length && (readable = false);
                            for (i = 0; json.length > i; i++) {
                                var model = noticiasChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("noticiasChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    date: date,
                                    detailEvent: true
                                });
                                $._Tbl_noticias.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_noticias.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    });
    $._W_noticias.addEventListener("open", function() {
        $._Tbl_noticias.search.hide();
        "android" == Titanium.Platform.getOsname() ? setTimeout(function() {
            $._Tbl_noticias.search.show();
        }, 1e3) : setTimeout(function() {
            $._Tbl_noticias.search.show();
        }, 50);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;