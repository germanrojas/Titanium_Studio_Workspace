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
    this.__controllerPath = "index";
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
    $.__views._W_miU = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        orientationModes: [ Titanium.UI.PORTRAIT ],
        id: "_W_miU",
        layout: "vertical"
    });
    $.__views._W_miU && $.addTopLevelView($.__views._W_miU);
    $.__views._V_icono = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        top: 0,
        left: 0,
        backgroundColor: "#FFF",
        id: "_V_icono"
    });
    $.__views._W_miU.add($.__views._V_icono);
    $.__views._I_miU = Ti.UI.createImageView({
        width: "50%",
        top: "5dp",
        left: "5dp",
        borderRadius: 10,
        height: "auto",
        image: "/images/index_icons/logo.png",
        id: "_I_miU"
    });
    $.__views._V_icono.add($.__views._I_miU);
    $.__views._V_margen = Ti.UI.createView({
        width: "100%",
        height: "5dp",
        top: 0,
        left: 0,
        backgroundColor: "#FFF",
        id: "_V_margen"
    });
    $.__views._W_miU.add($.__views._V_margen);
    $.__views._V_secciones = Ti.UI.createView({
        width: "100%",
        height: "80%",
        top: "5%",
        left: 0,
        id: "_V_secciones",
        layout: "horizontal"
    });
    $.__views._W_miU.add($.__views._V_secciones);
    $.__views._V_primeraColumna = Ti.UI.createView({
        width: "33%",
        height: "100%",
        top: 0,
        left: 0,
        id: "_V_primeraColumna",
        layout: "vertical"
    });
    $.__views._V_secciones.add($.__views._V_primeraColumna);
    $.__views._V_noticias = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_noticias",
        layout: "vertical"
    });
    $.__views._V_primeraColumna.add($.__views._V_noticias);
    $.__views._I_noticias = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/noticias_icon.png",
        id: "_I_noticias"
    });
    $.__views._V_noticias.add($.__views._I_noticias);
    $.__views._L_noticias = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Noticias",
        id: "_L_noticias"
    });
    $.__views._V_noticias.add($.__views._L_noticias);
    $.__views._V_eventos = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_eventos",
        layout: "vertical"
    });
    $.__views._V_primeraColumna.add($.__views._V_eventos);
    $.__views._I_eventos = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/eventos_icon.png",
        id: "_I_eventos"
    });
    $.__views._V_eventos.add($.__views._I_eventos);
    $.__views._L_eventos = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Eventos",
        id: "_L_eventos"
    });
    $.__views._V_eventos.add($.__views._L_eventos);
    $.__views._V_notificaciones = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_notificaciones",
        layout: "vertical"
    });
    $.__views._V_primeraColumna.add($.__views._V_notificaciones);
    $.__views._I_notificaciones = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/alertas_icon.png",
        id: "_I_notificaciones"
    });
    $.__views._V_notificaciones.add($.__views._I_notificaciones);
    $.__views._L_notificaciones = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Alertas",
        id: "_L_notificaciones"
    });
    $.__views._V_notificaciones.add($.__views._L_notificaciones);
    $.__views._V_segundaColumna = Ti.UI.createView({
        width: "33%",
        height: "100%",
        top: 0,
        left: 0,
        id: "_V_segundaColumna",
        layout: "vertical"
    });
    $.__views._V_secciones.add($.__views._V_segundaColumna);
    $.__views._V_contacto = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_contacto",
        layout: "vertical"
    });
    $.__views._V_segundaColumna.add($.__views._V_contacto);
    $.__views._I_contacto = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/contacto_icon.png",
        id: "_I_contacto"
    });
    $.__views._V_contacto.add($.__views._I_contacto);
    $.__views._L_contacto = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Contáctenos",
        id: "_L_contacto"
    });
    $.__views._V_contacto.add($.__views._L_contacto);
    $.__views._V_directorio = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_directorio",
        layout: "vertical"
    });
    $.__views._V_segundaColumna.add($.__views._V_directorio);
    $.__views._I_directorio = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/directorio_icon.png",
        id: "_I_directorio"
    });
    $.__views._V_directorio.add($.__views._I_directorio);
    $.__views._L_directorio = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Directorio",
        id: "_L_directorio"
    });
    $.__views._V_directorio.add($.__views._L_directorio);
    $.__views._V_otros = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_otros",
        layout: "vertical"
    });
    $.__views._V_segundaColumna.add($.__views._V_otros);
    $.__views._I_otros = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/otros_icon.png",
        id: "_I_otros"
    });
    $.__views._V_otros.add($.__views._I_otros);
    $.__views._L_otros = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Otros",
        id: "_L_otros"
    });
    $.__views._V_otros.add($.__views._L_otros);
    $.__views._V_terceraColumna = Ti.UI.createView({
        width: "33%",
        height: "100%",
        top: 0,
        left: 0,
        id: "_V_terceraColumna",
        layout: "vertical"
    });
    $.__views._V_secciones.add($.__views._V_terceraColumna);
    $.__views._V_ofertaAcademica = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_ofertaAcademica",
        layout: "vertical"
    });
    $.__views._V_terceraColumna.add($.__views._V_ofertaAcademica);
    $.__views._I_ofertaAcademica = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/programas_icon.png",
        id: "_I_ofertaAcademica"
    });
    $.__views._V_ofertaAcademica.add($.__views._I_ofertaAcademica);
    $.__views._L_ofertaAcademica = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Programas",
        id: "_L_ofertaAcademica"
    });
    $.__views._V_ofertaAcademica.add($.__views._L_ofertaAcademica);
    $.__views._V_mapaSede = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "2%",
        left: "5%",
        id: "_V_mapaSede",
        layout: "vertical"
    });
    $.__views._V_terceraColumna.add($.__views._V_mapaSede);
    $.__views._I_mapaSede = Ti.UI.createImageView({
        width: "60%",
        top: "10%",
        left: "20%",
        borderRadius: 10,
        image: "/images/index_icons/mapas_icon.png",
        id: "_I_mapaSede"
    });
    $.__views._V_mapaSede.add($.__views._I_mapaSede);
    $.__views._L_mapaSede = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        top: 0,
        text: "Mapa",
        id: "_L_mapaSede"
    });
    $.__views._V_mapaSede.add($.__views._L_mapaSede);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("android" == Titanium.Platform.getOsname()) var CloudPush = require("ti.cloudpush");
    var Cloud = require("ti.cloud");
    var deviceToken;
    if (Ti.App.Properties.getBool("firstLogIn", true)) if ("android" == Titanium.Platform.getOsname()) {
        CloudPush.retrieveDeviceToken({
            success: function(e) {
                deviceToken = e.deviceToken;
                CloudPush.enabled = true;
                CloudPush.showTrayNotification = true;
                Ti.App.Properties.setString("deviceToken", deviceToken);
                Cloud.Users.create({
                    username: Ti.App.Properties.getString("deviceToken", deviceToken),
                    password: "123456",
                    password_confirmation: "123456"
                }, function(e) {
                    if (e.success) {
                        Ti.App.Properties.setBool("firstLogIn", false);
                        Cloud.Users.login({
                            login: Ti.App.Properties.getString("deviceToken", deviceToken),
                            password: "123456"
                        }, function(e) {
                            e.success ? Cloud.PushNotifications.subscribe({
                                channel: "alert",
                                device_token: Ti.App.Properties.getString("deviceToken", deviceToken),
                                type: "gcm"
                            }, function(e) {
                                e.success ? Ti.App.Properties.setBool("pushNotifications", true) : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
                            }) : alert("Error: " + (e.error && e.message || JSON.stringify(e)));
                        });
                    } else {
                        CloudPush.addEventListener("callback", function(e) {
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
                                type: "gcm"
                            }, function(e) {
                                e.success ? Ti.App.Properties.setBool("pushNotifications", true) : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
                            }) : alert("Error: " + (e.error && e.message || JSON.stringify(e)));
                        });
                    }
                });
            },
            error: function(e) {
                alert("Failed to register for push! " + e.error);
            }
        });
        CloudPush.addEventListener("callback", function(e) {
            var data = JSON.parse(e.payload);
            if (data.page) {
                var windowToOpen = Alloy.createController("" + data.page);
                windowToOpen.open();
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
                    e.success ? Cloud.PushNotifications.subscribe({
                        channel: "alert",
                        type: "ios",
                        device_token: deviceToken
                    }, function(e) {
                        e.success ? Ti.App.Properties.setBool("pushNotifications", true) : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
                    }) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
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
                type: "gcm"
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