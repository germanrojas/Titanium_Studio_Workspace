function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapaSede";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views._W_mapaSede = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_mapaSede",
        layout: "vertical"
    });
    $.__views._W_mapaSede && $.addTopLevelView($.__views._W_mapaSede);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_mapaSede.add($.__views._V_back);
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
        text: "Lugares",
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
    $.__views._V_contenido = Ti.UI.createView({
        height: "auto",
        width: "100%",
        top: "5dp",
        left: 0,
        id: "_V_contenido",
        layout: "vertical"
    });
    $.__views._W_mapaSede.add($.__views._V_contenido);
    $.__views.__alloyId8 = Ti.UI.createSearchBar(function() {
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
            id: "__alloyId8"
        });
        return o;
    }());
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        id: "__alloyId9"
    });
    var __alloyId10 = [];
    __alloyId10.push($.__views.__alloyId9);
    $.__views._L_title = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontSize: "15dp"
        },
        height: "auto",
        width: "100%",
        top: "5dp",
        left: 0,
        text: "BUSCADOR DE LUGARES",
        id: "_L_title"
    });
    $.__views.__alloyId9.add($.__views._L_title);
    $.__views._Tbl_mapaSede = Ti.UI.createTableView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        data: __alloyId10,
        search: $.__views.__alloyId8,
        id: "_Tbl_mapaSede"
    });
    $.__views._V_contenido.add($.__views._Tbl_mapaSede);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mapaSedeChild = Alloy.createCollection("mapaSede");
    var rows = [];
    var offsetAPI = 0;
    var limitAPI = 30;
    var readyToScroll = false;
    var readable = true;
    var offsetAPI = 0;
    var limitAPI = 30;
    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/lugares/lista/";
    var xhr = Ti.Network.createHTTPClient({
        cache: true,
        onload: function() {
            readyToScroll = false;
            json = JSON.parse(this.responseText);
            readable = true;
            for (i = 0; json.length > i; i++) mapaSedeChild.push(Alloy.createModel("mapaSede", {
                id: json[i].id,
                name: json[i].name,
                image: json[i].image,
                phone: json[i].phone
            }));
            limitAPI > json.length && (readable = false);
            for (var i = 0; mapaSedeChild.length > i; i++) {
                var model = mapaSedeChild.at(i);
                id = model.get("id");
                name = "" + model.get("name");
                image = "" + model.get("image");
                phone = "" + model.get("phone");
                var newRow = Alloy.createController("mapaSedeChild", {
                    id: id,
                    name: name,
                    image: image,
                    phone: phone,
                    detailEvent: true
                });
                $._Tbl_mapaSede.appendRow(newRow.getView());
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
    $._Tbl_mapaSede.search.addEventListener("return", function(e) {
        questAPI = e.value;
        var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/lugares/lista/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                readyToScroll = false;
                json = JSON.parse(this.responseText);
                mapaSedeChild = [];
                mapaSedeChild = Alloy.createCollection("mapaSede");
                for (i = 0; json.length > i; i++) mapaSedeChild.push(Alloy.createModel("mapaSede", {
                    id: json[i].id,
                    name: json[i].name,
                    phone: json[i].phone,
                    image: json[i].photo
                }));
                rows = [];
                for (var i = 0; mapaSedeChild.length > i; i++) {
                    var model = mapaSedeChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    phone = "" + model.get("phone");
                    image = "" + model.get("image");
                    var newRow = Alloy.createController("mapaSedeChild", {
                        id: id,
                        name: name,
                        phone: phone,
                        photo: image
                    });
                    rows.push(newRow.getView());
                }
                $._Tbl_mapaSede.appendRow(rows);
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
        $._Tbl_mapaSede.search.blur();
    });
    $._Tbl_mapaSede.appendRow(rows);
    exports.open = function() {
        $._W_mapaSede.open();
    };
    $._Tbl_mapaSede.addEventListener("scroll", function(e) {
        if ("android" == Titanium.Platform.getOsname()) {
            var tolerance = 8;
            if (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance && readyToScroll) {
                readyToScroll = false;
                if (readable) {
                    offsetAPI += limitAPI;
                    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/lugares/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; json.length > i; i++) mapaSedeChild.push(Alloy.createModel("mapaSede", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                phone: json[i].phone
                            }));
                            limitAPI > json.length && (readable = false);
                            for (i = 0; json.length > i; i++) {
                                var model = mapaSedeChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                phone = "" + model.get("phone");
                                var newRow = Alloy.createController("mapaSedeChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    phone: phone,
                                    detailEvent: true
                                });
                                $._Tbl_mapaSede.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_mapaSede.search.getValue();
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
                    var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/lugares/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function() {
                            json = JSON.parse(this.responseText);
                            readable = true;
                            for (i = 0; json.length > i; i++) mapaSedeChild.push(Alloy.createModel("mapaSede", {
                                id: json[i].id,
                                name: json[i].name,
                                image: json[i].image,
                                phone: json[i].phone
                            }));
                            limitAPI > json.length && (readable = false);
                            for (i = 0; json.length > i; i++) {
                                var model = mapaSedeChild.at(i + offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                phone = "" + model.get("phone");
                                var newRow = Alloy.createController("mapaSedeChild", {
                                    id: id,
                                    name: name,
                                    image: image,
                                    phone: phone
                                });
                                $._Tbl_mapaSede.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_mapaSede.search.getValue();
                    questAPI && (strAPI += "&q=" + questAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    });
    $._L_back.addEventListener("click", function() {
        $._W_mapaSede.close();
        $._Tbl_mapaSede.search.blur();
    });
    $._W_mapaSede.addEventListener("android:back", function() {
        $._W_mapaSede.close();
        $._Tbl_mapaSede.search.blur();
    });
    $._Tbl_mapaSede.search.addEventListener("cancel", function() {
        $._Tbl_mapaSede.search.blur();
    });
    $._W_mapaSede.addEventListener("open", function() {
        $._Tbl_mapaSede.search.hide();
        "android" == Titanium.Platform.getOsname() ? setTimeout(function() {
            $._Tbl_mapaSede.search.show();
        }, 1e3) : setTimeout(function() {
            $._Tbl_mapaSede.search.show();
        }, 50);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;