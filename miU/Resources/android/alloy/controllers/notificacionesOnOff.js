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
    this.__controllerPath = "notificacionesOnOff";
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
    $.__views._W_notificacionesOnOff = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_notificacionesOnOff",
        layout: "vertical"
    });
    $.__views._W_notificacionesOnOff && $.addTopLevelView($.__views._W_notificacionesOnOff);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_notificacionesOnOff.add($.__views._V_back);
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
        text: "Config. Alerta",
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
        text: "    Alertas    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._V_contenido = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "90%",
        top: "20dp",
        left: "5%",
        backgroundColor: "transparent",
        bottom: "20dp",
        borderWidth: 3,
        borderColor: "#999",
        borderRadius: 10,
        id: "_V_contenido",
        layout: "composite"
    });
    $.__views._W_notificacionesOnOff.add($.__views._V_contenido);
    $.__views._L_info = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        height: "36dp",
        left: "10dp",
        top: "auto",
        text: "Centro de notifiaciones",
        id: "_L_info"
    });
    $.__views._V_contenido.add($.__views._L_info);
    $.__views._Switch_ = Ti.UI.createSwitch({
        height: "auto",
        width: "auto",
        top: "auto",
        right: "10dp",
        value: "true",
        style: Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "_Switch_"
    });
    $.__views._V_contenido.add($.__views._Switch_);
    $.__views._L_coment = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        text: "Notificaciones activadas",
        id: "_L_coment"
    });
    $.__views._W_notificacionesOnOff.add($.__views._L_coment);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.open = function() {
        $._W_notificacionesOnOff.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_notificacionesOnOff.close();
        if ("android" == Titanium.Platform.getOsname()) var CloudPush = require("ti.cloudpush");
        var Cloud = require("ti.cloud");
        var deviceToken;
        deviceToken = Ti.App.Properties.getString("deviceToken", "");
        if (Ti.App.Properties.getBool("pushNotifications", !notifications) != notifications) {
            notifications ? "android" == Titanium.Platform.getOsname() ? Cloud.PushNotifications.subscribe({
                channel: "alert",
                device_token: deviceToken,
                type: "android"
            }, function(e) {
                e.success || alert("Error:" + (e.error && e.message || JSON.stringify(e)));
            }) : Cloud.PushNotifications.subscribe({
                channel: "alert",
                type: "ios",
                device_token: deviceToken
            }, function(e) {
                e.success || alert("Error:" + (e.error && e.message || JSON.stringify(e)));
            }) : Cloud.PushNotifications.unsubscribe({
                channel: "alert",
                device_token: deviceToken
            }, function(e) {
                e.success ? "android" == Titanium.Platform.getOsname() ? CloudPush.enabled = true : Titanium.Network.unregisterForPushNotifications() : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
            });
            Ti.App.Properties.setBool("pushNotifications", notifications);
        }
    });
    $._W_notificacionesOnOff.addEventListener("android:back", function() {
        $._W_notificacionesOnOff.close();
    });
    var notifications = Ti.App.Properties.getBool("pushNotifications", true);
    if (!notifications) {
        $._Switch_.setValue(false);
        $._L_coment.setText("Notificaciones desactivadas");
    }
    $._Switch_.addEventListener("change", function() {
        notifications = !notifications;
        $._L_coment.setText(notifications ? "Notificaciones activadas" : "Notificaciones desactivadas");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;