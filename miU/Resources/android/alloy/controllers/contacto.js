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
    this.__controllerPath = "contacto";
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
    $.__views._W_contacto = Ti.UI.createWindow({
        backgroundColor: "#F0F0EE",
        fullscreen: false,
        id: "_W_contacto",
        layout: "vertical"
    });
    $.__views._W_contacto && $.addTopLevelView($.__views._W_contacto);
    $.__views._V_back = Ti.UI.createView({
        width: "100%",
        height: "40dp",
        top: "0%",
        left: 0,
        layout: "composite",
        backgroundImage: "/images/degrade.png",
        id: "_V_back"
    });
    $.__views._W_contacto.add($.__views._V_back);
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
        text: "Contáctenos",
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
        text: "    Principal    ",
        backgroundImage: "/images/degrade.png",
        id: "_L_back"
    });
    $.__views._V_back.add($.__views._L_back);
    $.__views._Scroll_contenido = Ti.UI.createScrollView({
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        showVerticalScrollIndicator: true,
        scrollType: "vertical",
        id: "_Scroll_contenido",
        layout: "vertical"
    });
    $.__views._W_contacto.add($.__views._Scroll_contenido);
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
        width: "90%",
        top: "10dp",
        left: "5%",
        text: "Universidad Inca Garcilaso de la Vega",
        id: "_L_title"
    });
    $.__views._Scroll_contenido.add($.__views._L_title);
    $.__views._V_pkr = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: "5%",
        top: "10dp",
        id: "_V_pkr"
    });
    $.__views._Scroll_contenido.add($.__views._V_pkr);
    $.__views._Pkr_dependencias = Ti.UI.createPicker({
        selectionIndicator: true,
        useSpinner: false,
        id: "_Pkr_dependencias"
    });
    $.__views._V_pkr.add($.__views._Pkr_dependencias);
    $.__views._L_titleDepend = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "21dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        width: "90%",
        height: "auto",
        left: "5%",
        top: "20dp",
        id: "_L_titleDepend"
    });
    $.__views._Scroll_contenido.add($.__views._L_titleDepend);
    $.__views._L_infoDepend = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "italic",
            fontWeight: "normal"
        },
        width: "90%",
        height: "auto",
        top: "5dp",
        left: "5%",
        id: "_L_infoDepend"
    });
    $.__views._Scroll_contenido.add($.__views._L_infoDepend);
    $.__views._V_send = Ti.UI.createView({
        width: "90%",
        height: "7mm",
        top: "10dp",
        left: "5%",
        backgroundColor: "#2060BC",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        id: "_V_send",
        layout: "composite"
    });
    $.__views._Scroll_contenido.add($.__views._V_send);
    $.__views._I_send = Ti.UI.createImageView({
        borderRadius: 10,
        width: "5mm",
        height: "5mm",
        top: "1mm",
        right: "1mm",
        image: "/images/emailIcon.jpg",
        id: "_I_send"
    });
    $.__views._V_send.add($.__views._I_send);
    $.__views._L_send = Ti.UI.createLabel({
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
        text: "Enviar correo",
        id: "_L_send"
    });
    $.__views._V_send.add($.__views._L_send);
    $.__views._L_descriptionDepend = Ti.UI.createLabel({
        color: "#323237",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        width: "90%",
        left: "5%",
        top: "5dp",
        id: "_L_descriptionDepend"
    });
    $.__views._Scroll_contenido.add($.__views._L_descriptionDepend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var contactoChild = Alloy.createCollection("contacto");
    contactoChild.push(Alloy.createModel("contacto", {
        name: "Admisiones",
        address: "Av. San Felipe 890, Jesús María",
        local: "Edificio A piso 5",
        phone: "460-2976 / 460-1586 / 471-1748 anexo 1167/1168",
        email: "admisiones@uigv.edu.co",
        description: "Al cumplir 47 años, la Universidad Inca Garcilaso de la Vega viene formando profesionales de alta calidad académica y científico-humanista, e investigadores en el campo de las humanidades y nuevas tecnologías; yendo de la mano con la realidad nacional y extendiendo su servicio a toda la comunidad.  Son miles los garcilasinos que están por todo el Perú, devolviendo con creces la formación recogida con esfuerzo en nuestras aulas. También son miles los que están formándose para incrementar este ejército de civilidad democrática que pugna y tiene la esperanza de vivir un Perú mejor."
    }));
    contactoChild.push(Alloy.createModel("contacto", {
        name: "Vicerrectorado",
        address: "Av. San Felipe 890, Jesús María",
        local: "",
        phone: "471-1748 - anexo: 1101",
        email: "vrac@uigv.edu.pe",
        description: ""
    }));
    contactoChild.push(Alloy.createModel("contacto", {
        name: "Gerencia General",
        address: "Av. San Felipe 890, Jesús María",
        local: "",
        phone: "461-2745 - anexo: 3701",
        email: "gerenciageneral@uigv.edu.pe",
        description: ""
    }));
    contactoChild.push(Alloy.createModel("contacto", {
        name: "Centro de Cómputo General",
        address: "Av. Bolívar 165 - Pueblo Libre",
        local: "",
        phone: "463-0000 - anexo: 4101",
        email: "computo@uigv.edu.pe",
        description: ""
    }));
    for (var i = 0; i < contactoChild.length; i++) {
        var model = contactoChild.at(i);
        $._Pkr_dependencias.add(Titanium.UI.createPickerRow({
            title: model.get("name")
        }));
    }
    var currentModel = contactoChild.at(0);
    $._L_titleDepend.setText(currentModel.get("name"));
    $._L_infoDepend.setText("Teléfono: " + currentModel.get("phone") + "\n" + currentModel.get("address") + " - " + currentModel.get("local") + "\n" + currentModel.get("email"));
    $._L_descriptionDepend.setText(currentModel.get("description"));
    $._Pkr_dependencias.addEventListener("change", function(e) {
        currentModel = contactoChild.at(e.rowIndex);
        $._L_titleDepend.setText(currentModel.get("name"));
        $._L_infoDepend.setText("Teléfono: " + currentModel.get("phone") + "\n" + currentModel.get("address") + " - " + currentModel.get("local") + "\n" + currentModel.get("email"));
        $._L_descriptionDepend.setText(currentModel.get("description"));
    });
    $._V_send.addEventListener("click", function() {
        email = "" + currentModel.get("email");
        var contact = Alloy.createController("contactoMail", {
            email: email
        });
        contact.open();
    });
    exports.open = function() {
        $._W_contacto.open();
    };
    $._L_back.addEventListener("click", function() {
        $._W_contacto.close();
    });
    $._W_contacto.addEventListener("android:back", function() {
        $._W_contacto.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;