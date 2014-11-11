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
    this.__controllerPath = "eventosChildDetail";
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
    $.__views._W_eventosChildDetail = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_eventosChildDetail",
        layout: "vertical"
    });
    $.__views._W_eventosChildDetail && $.addTopLevelView($.__views._W_eventosChildDetail);
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
    $.__views._W_eventosChildDetail.add($.__views._V_back);
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
        text: "Info. Evento",
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
        text: "    Eventos    ",
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
        width: "90%",
        top: "10dp",
        left: "5%",
        backgroundColor: "transparent",
        id: "_V_contenido"
    });
    $.__views._W_eventosChildDetail.add($.__views._V_contenido);
    $.__views.__alloyId6 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId6"
    });
    $.__views._V_contenido.add($.__views.__alloyId6);
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
    $.__views.__alloyId6.add($.__views._L_title);
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
        top: "5dp",
        left: 0,
        id: "_L_info"
    });
    $.__views.__alloyId6.add($.__views._L_info);
    $.__views._I_evento = Ti.UI.createImageView({
        borderRadius: "10dp",
        height: "auto",
        width: "100%",
        top: "10dp",
        left: 0,
        id: "_I_evento"
    });
    $.__views.__alloyId6.add($.__views._I_evento);
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
        id: "_L_description"
    });
    $.__views.__alloyId6.add($.__views._L_description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    strPersons = args.persons.length > 1 ? "Personas Encargadas: \n" : args.persons.length ? "Persona Encargada:\n" : "";
    strCategories = args.categories.length > 1 ? "Categorías Relacionadas:\n" : args.categories.length ? "Categoría Relacionada:\n" : "";
    for (var i = 0; i < args.persons.length; i++) strPersons += "	" + args.persons[i] + "\n";
    for (var i = 0; i < args.categories.length; i++) strCategories += "	" + args.categories[i] + "\n";
    $._L_title.setText(args.name || "-");
    $._L_info.setText((strPersons || "-") + "\n" + (args.date || "-") + "\nTiempo estimado: " + (args.duration || "-") + "\n" + (strCategories || "-"));
    $._L_description.setText(args.description.replace(/<.*>/, "\n") || "-");
    $._I_evento.setImage(args.image || "/images/unknown/image.jpg");
    exports.open = function() {
        $._W_eventosChildDetail.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_eventosChildDetail.close();
    });
    $._W_eventosChildDetail.addEventListener("android:back", function() {
        $._W_eventosChildDetail.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;