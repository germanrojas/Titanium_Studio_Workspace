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
    this.__controllerPath = "Copy of index";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("android" == Titanium.Platform.getOsname()) var gcm = require("net.iamyellow.gcmjs");
    var Cloud = require("ti.cloud");
    var deviceToken;
    if (Ti.App.Properties.getBool("firstLogIn", true)) if ("android" == Titanium.Platform.getOsname()) {
        var pendingData = gcm.data;
        pendingData && null !== pendingData && alert("******* data (started) " + JSON.stringify(pendingData));
        gcm.registerForPushNotifications({
            success: function(ev) {
                alert("******* success, " + ev.deviceToken);
            },
            error: function(ev) {
                alert("******* error, " + ev.error);
            },
            callback: function() {
                alert("hellow yellow!");
            },
            unregister: function(ev) {
                alert("******* unregister, " + ev.deviceToken);
            },
            data: function(data) {
                alert("******* data (resumed) " + JSON.stringify(data));
            }
        });
    } else {
        Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString("deviceToken", deviceToken);
            },
            error: function(e) {
                alert("Errorpush: " + e.error);
            },
            callback: function(e) {
                var data = e.data;
                if (data.page) {
                    var windowToOpen = Alloy.createController("" + data.page);
                    windowToOpen.open();
                }
                Ti.UI.iPhone.setAppBadge(0);
            }
        });
        Cloud.Users.create({
            username: Ti.App.Properties.getString("deviceToken", "tempUser"),
            password: "123456",
            password_confirmation: "123456"
        }, function(e) {
            if (e.success) {
                Ti.App.Properties.setBool("firstLogIn", false);
                Cloud.Users.login({
                    login: Ti.App.Properties.getString("deviceToken", "tempUser"),
                    password: "123456"
                }, function(e) {
                    if (e.success) Cloud.PushNotifications.subscribe({
                        channel: "alert",
                        type: "ios",
                        device_token: deviceToken
                    }, function(e) {
                        e.success ? Ti.App.Properties.setBool("pushNotifications", true) : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
                    }); else {
                        alert("NOT CREATED! =(");
                        alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                    }
                });
            } else Cloud.Users.login({
                login: Ti.App.Properties.getString("deviceToken", "tempUser"),
                password: "123456"
            }, function(e) {
                e.success || alert("Error: " + e.message);
            });
        });
    } else if ("android" == Titanium.Platform.getOsname()) {
        CloudPush.enabled = true;
        CloudPush.showTrayNotification = true;
        CloudPush.addEventListener("callback", function(e) {
            alert("hola");
            var data = JSON.parse(e.payload);
            if (data.page) {
                var windowToOpen = Alloy.createController("" + data.page);
                windowToOpen.open();
            }
        });
        Cloud.Users.login({
            login: Ti.App.Properties.getString("deviceToken", "tempUser"),
            password: "123456"
        }, function(e) {
            e.success ? Cloud.PushNotifications.subscribe({
                channel: "alert",
                device_token: Ti.App.Properties.getString("deviceToken", "tempUser"),
                type: "android"
            }, function(e) {
                e.success ? Ti.App.Properties.setBool("pushNotifications", true) : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
            }) : alert("Error: " + (e.error && e.message || JSON.stringify(e)));
        });
    } else {
        Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString("deviceToken", deviceToken);
                alert("deviceToken = " + deviceToken);
            },
            error: function(e) {
                alert("Errorpush: " + e.error);
            },
            callback: function(e) {
                var data = e.data;
                if (data.page) {
                    var windowToOpen = Alloy.createController("" + data.page);
                    windowToOpen.open();
                }
                Ti.UI.iPhone.setAppBadge(0);
            }
        });
        Cloud.Users.login({
            login: Ti.App.Properties.getString("deviceToken", "tempUser"),
            password: "123456"
        }, function(e) {
            e.success || alert("Error: " + e.message);
        });
    }
    $._V_contacto.addEventListener("click", function() {
        var contacto = Alloy.createController("contacto");
        contacto.open();
    });
    $._V_directorio.addEventListener("click", function() {
        var directorio = Alloy.createController("directorio");
        directorio.open();
    });
    $._V_mapaSede.addEventListener("click", function() {
        var mapaSede = Alloy.createController("mapaSede");
        mapaSede.open();
    });
    $._V_notificaciones.addEventListener("click", function() {
        var notificaciones = Alloy.createController("notificaciones");
        notificaciones.open();
    });
    $._V_noticias.addEventListener("click", function() {
        var noticias = Alloy.createController("noticias");
        noticias.open();
    });
    $._V_eventos.addEventListener("click", function() {
        var eventos = Alloy.createController("eventos");
        eventos.open();
    });
    $._V_ofertaAcademica.addEventListener("click", function() {
        var eventos = Alloy.createController("ofertaAcademica");
        eventos.open();
    });
    $._V_otros.addEventListener("click", function() {
        var otro = Alloy.createController("otro");
        otro.open();
    });
    var signedUser = Ti.App.Properties.getBool("signed", false);
    signedUser || Ti.App.Properties.setBool("signed", true);
    $._W_miU.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;