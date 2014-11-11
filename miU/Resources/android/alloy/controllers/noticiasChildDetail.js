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
    this.__controllerPath = "noticiasChildDetail";
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
    $.__views._W_noticiasChildDetail = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_noticiasChildDetail",
        layout: "vertical"
    });
    $.__views._W_noticiasChildDetail && $.addTopLevelView($.__views._W_noticiasChildDetail);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_noticiasChildDetail.add($.__views._V_back);
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
        text: "    Más noticias    ",
        backgroundImage: "/images/degrade.png",
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
    $.__views._W_noticiasChildDetail.add($.__views._V_contenido);
    $.__views.__alloyId15 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId15"
    });
    $.__views._V_contenido.add($.__views.__alloyId15);
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
    $.__views.__alloyId15.add($.__views._L_title);
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
    $.__views.__alloyId15.add($.__views._L_info);
    $.__views._I_noticia = Ti.UI.createImageView({
        borderRadius: 10,
        height: "auto",
        width: "100%",
        top: "10dp",
        left: 0,
        id: "_I_noticia"
    });
    $.__views.__alloyId15.add($.__views._I_noticia);
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
    $.__views.__alloyId15.add($.__views._L_description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    strCategories = args.categories.length > 1 ? "Categorías Relacionadas:\n" : args.categories.length ? "Categoría Relacionada:\n" : "";
    $._L_title.setText(args.name || "-");
    $._L_info.setText((args.author || "-") + "\n" + (args.date || "-") + "\n" + (strCategories || "-"));
    $._L_description.setText(args.description.replace(/<.*>/, "\n") || "-");
    $._I_noticia.setImage(args.image || "/images/unknown/image.jpg");
    exports.open = function() {
        $._W_noticiasChildDetail.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_noticiasChildDetail.close();
    });
    $._W_noticiasChildDetail.addEventListener("android:back", function() {
        $._W_noticiasChildDetail.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;