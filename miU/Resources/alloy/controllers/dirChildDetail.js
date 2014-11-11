function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dirChildDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views._W_dirChildDetail = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_dirChildDetail",
        layout: "vertical"
    });
    $.__views._W_dirChildDetail && $.addTopLevelView($.__views._W_dirChildDetail);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_dirChildDetail.add($.__views._V_back);
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
        text: "Info. Persona",
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
        text: "    Directorio    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._V_contenido = Ti.UI.createView({
        height: "auto",
        width: "90%",
        top: "20dp",
        left: "5%",
        backgroundColor: "transparent",
        bottom: "20dp",
        id: "_V_contenido"
    });
    $.__views._W_dirChildDetail.add($.__views._V_contenido);
    $.__views.__alloyId1 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views._V_contenido.add($.__views.__alloyId1);
    $.__views._L_title = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        height: "auto",
        width: "auto",
        top: 0,
        left: 0,
        id: "_L_title"
    });
    $.__views.__alloyId1.add($.__views._L_title);
    $.__views._I_persona = Ti.UI.createImageView({
        borderRadius: 10,
        height: "auto",
        width: "100%",
        top: "10dp",
        left: 0,
        id: "_I_persona"
    });
    $.__views.__alloyId1.add($.__views._I_persona);
    $.__views._L_info = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "12dp",
            fontStyle: "italic"
        },
        height: "auto",
        width: "auto",
        top: "5dp",
        left: 0,
        id: "_L_info"
    });
    $.__views.__alloyId1.add($.__views._L_info);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    strareas = args.areas.length > 1 ? "Áreas:\n" : args.areas.length ? "Área:\n" : "";
    for (var i = 0; args.areas.length > i; i++) strareas += "	" + args.areas[i] + "\n";
    $._L_title.setText(args.name || "-");
    $._L_info.setText((args.cel || "-") + "\n" + (args.email || "-") + "\n" + strareas);
    $._I_persona.setImage(args.photo);
    exports.open = function() {
        $._W_dirChildDetail.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_dirChildDetail.close();
    });
    $._W_dirChildDetail.addEventListener("android:back", function() {
        $._W_dirChildDetail.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;