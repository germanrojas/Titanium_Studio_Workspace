function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function decodeLine(encoded) {
        var len = encoded.length;
        var index = 0;
        var array = [];
        var lat = 0;
        var lng = 0;
        while (len > index) {
            var b;
            var shift = 0;
            var result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (31 & b) << shift;
                shift += 5;
            } while (b >= 32);
            var dlat = 1 & result ? ~(result >> 1) : result >> 1;
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (31 & b) << shift;
                shift += 5;
            } while (b >= 32);
            var dlng = 1 & result ? ~(result >> 1) : result >> 1;
            lng += dlng;
            array.push([ 1e-5 * lat, 1e-5 * lng ]);
        }
        return array;
    }
    function addRoute(obj) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            var response = this.responseText;
            var json = JSON.parse(response);
            if (json.routes.length) {
                var step = json.routes[0].legs[0].steps;
                var intStep = 0, intSteps = step.length, points = [];
                var decodedPolyline, intPoint = 0, intPoints = 0;
                for (intStep = 0; intSteps > intStep; intStep += 1) {
                    decodedPolyline = decodeLine(step[intStep].polyline.points);
                    intPoints = decodedPolyline.length;
                    for (intPoint = 0; intPoints > intPoint; intPoint += 1) null != decodedPolyline[intPoint] && points.push({
                        latitude: decodedPolyline[intPoint][0],
                        longitude: decodedPolyline[intPoint][1]
                    });
                }
                var route = {
                    name: "RUTA",
                    points: points,
                    color: "#c60000",
                    width: 4
                };
                obj.band && $._V_lugar.removeRoute(route);
                obj.map.addRoute(route);
            } else alert("No es posible calcular una ruta a: " + args.name || "-");
        };
        xhr.onerror = function(e) {
            alert("Error en la conexión\nNo fue posible cargar la ruta\nAsegurese de estar conectado a internet", JSON.stringify(e));
        };
        var param = [ "destination=" + obj.stop, "origin=" + obj.start, "sensor=true" ];
        obj.region && (param.region = obj.region);
        xhr.open("GET", "http://maps.googleapis.com/maps/api/directions/json?" + param.join("&"));
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapaSedeChildDetail";
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
    $.__views._W_mapaSedeChildDetail = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_mapaSedeChildDetail",
        layout: "vertical"
    });
    $.__views._W_mapaSedeChildDetail && $.addTopLevelView($.__views._W_mapaSedeChildDetail);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_mapaSedeChildDetail.add($.__views._V_back);
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
        text: "Info. Lugar",
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
        text: "    Lugares    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._Scroll_map = Ti.UI.createScrollView({
        scrollingEnabled: "true",
        showVerticalScrollIndicator: "true",
        id: "_Scroll_map"
    });
    $.__views._W_mapaSedeChildDetail.add($.__views._Scroll_map);
    $.__views._V_contenido = Ti.UI.createView({
        height: "auto",
        width: "90%",
        top: "320dp",
        left: "5%",
        bottom: "20dp",
        id: "_V_contenido",
        layout: "vertical"
    });
    $.__views._Scroll_map.add($.__views._V_contenido);
    $.__views._V_ruta = Ti.UI.createView({
        width: "100%",
        height: "7mm",
        top: "2mm",
        left: 0,
        backgroundColor: "#2060BC",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        id: "_V_ruta",
        layout: "composite"
    });
    $.__views._V_contenido.add($.__views._V_ruta);
    $.__views._I_ruta = Ti.UI.createImageView({
        borderRadius: 10,
        width: "5mm",
        height: "5mm",
        top: "1mm",
        right: "1mm",
        image: "/images/searchIcon.png",
        id: "_I_ruta"
    });
    $.__views._V_ruta.add($.__views._I_ruta);
    $.__views._L_ruta = Ti.UI.createLabel({
        color: "#FFF",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "21dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        width: "auto",
        height: "7mm",
        top: "auto",
        left: "5%",
        text: "¿Cómo llegar?",
        id: "_L_ruta"
    });
    $.__views._V_ruta.add($.__views._L_ruta);
    $.__views._L_title = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "24dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "auto",
        width: "auto",
        top: 0,
        left: 0,
        id: "_L_title"
    });
    $.__views._V_contenido.add($.__views._L_title);
    $.__views._L_info = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "italic",
            fontWeight: "normal"
        },
        height: "auto",
        width: "auto",
        top: "10dp",
        left: 0,
        id: "_L_info"
    });
    $.__views._V_contenido.add($.__views._L_info);
    $.__views._L_description = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        height: "auto",
        width: "100%",
        top: "10dp",
        left: 0,
        bottom: 0,
        id: "_L_description"
    });
    $.__views._V_contenido.add($.__views._L_description);
    var __alloyId10 = [];
    $.__views.place = require("ti.map").createAnnotation({
        pincolor: Titanium.Map.ANNOTATION_RED,
        id: "place"
    });
    __alloyId10.push($.__views.place);
    $.__views.myPlace = require("ti.map").createAnnotation({
        pincolor: Titanium.Map.ANNOTATION_RED,
        id: "myPlace"
    });
    __alloyId10.push($.__views.myPlace);
    $.__views._V_lugar = Ti.Map.createView({
        height: "300dp",
        width: "90%",
        top: "20dp",
        left: "5%",
        regionFit: true,
        annotations: __alloyId10,
        id: "_V_lugar",
        animate: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views._Scroll_map.add($.__views._V_lugar);
    $.__views._V_noMap = Ti.UI.createView({
        height: "300dp",
        width: "90%",
        top: "20dp",
        left: "5%",
        backgroundColor: "transparent",
        id: "_V_noMap"
    });
    $.__views._Scroll_map.add($.__views._V_noMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var latitCenter;
    var longitCenter;
    var latitDelta;
    var longitDelta;
    var Map = require("ti.map");
    strPersons = args.persons.length > 1 ? "Personas Encargadas: \n" : args.persons.length ? "Persona Encargada:\n" : "";
    $._L_title.setText(args.name || "-");
    $._L_info.setText("Hora de atención: " + (args.hour || "-") + "\n" + strPersons + "\nTeléfono: " + (args.phone || "Phone Unknown"));
    $._L_description.setText(args.description.replace(/<.*>/, "\n") || "-");
    $._V_lugar.setRegion({
        latitude: args.latit || "-",
        longitude: args.longit || "-",
        longitudeDelta: .01,
        latitudeDelta: .01
    });
    $._V_lugar.setLocation({
        latitude: Number(args.latit) || "-",
        longitude: Number(args.longit) || "-",
        longitudeDelta: .01,
        latitudeDelta: .01
    });
    $.myPlace.setTitle(args.name || "-");
    $.myPlace.setLatitude("" + args.latit || "-");
    $.myPlace.setLongitude("" + args.longit || "-");
    $.place.setTitle(args.name || "-");
    $.place.setLatitude(Number(args.latit) || "-");
    $.place.setLongitude(Number(args.longit) || "-");
    $.place.pincolor = Map.ANNOTATION_RED;
    var band = false;
    Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            alert("HFL cannot get your current location");
            return;
        }
        var latitude = e.coords.latitude;
        var longitude = e.coords.longitude;
        $.myPlace.setTitle("YO");
        $.myPlace.setLatitude(latitude);
        $.myPlace.setLongitude(longitude);
        $.myPlace.pincolor = Map.ANNOTATION_GREEN;
    });
    $._V_ruta.addEventListener("click", function() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) {
                alert("HFL cannot get your current location");
                return;
            }
            var latitude = e.coords.latitude;
            var longitude = e.coords.longitude;
            $.myPlace.setTitle("YO");
            $.myPlace.setLatitude(latitude);
            $.myPlace.setLongitude(longitude);
            $.myPlace.pincolor = Map.ANNOTATION_GREEN;
        });
        latitCenter = (Number($.place.getLatitude()) + Number($.myPlace.getLatitude())) / 2;
        longitCenter = (Number($.place.getLongitude()) + Number($.myPlace.getLongitude())) / 2;
        latitDelta = Math.abs(Number($.place.getLatitude()) - Number($.myPlace.getLatitude()));
        longitDelta = Math.abs(Number($.myPlace.getLongitude()) - Number($.place.getLongitude()));
        longitDelta *= 2;
        latitDelta *= 2;
        $._V_lugar.region = {
            longitudeDelta: longitDelta,
            latitudeDelta: latitDelta,
            longitude: longitCenter,
            latitude: latitCenter
        };
        addRoute({
            map: $._V_lugar,
            start: $.myPlace.getLatitude() + "," + $.myPlace.getLongitude(),
            stop: $.place.getLatitude() + "," + $.place.getLongitude(),
            band: band
        });
        band = true;
    });
    exports.open = function() {
        $._W_mapaSedeChildDetail.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_mapaSedeChildDetail.close();
    });
    $._W_mapaSedeChildDetail.addEventListener("android:back", function() {
        $._W_mapaSedeChildDetail.close();
    });
    $._V_noMap.addEventListener("touchstart", function() {
        $._Scroll_map.setScrollingEnabled(false);
        $._V_noMap.hide();
    });
    $._V_contenido.addEventListener("touchstart", function() {
        $._Scroll_map.setScrollingEnabled(true);
        $._V_noMap.show();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;