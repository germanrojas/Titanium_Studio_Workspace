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
    this.__controllerPath = "eventosChild";
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
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "transparent",
        height: "14mm",
        color: "transparent",
        font: {
            fontSize: "24dp",
            fontFamily: "Helvetica"
        },
        hasChild: true,
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views._I_evento = Ti.UI.createImageView({
        borderRadius: "10dp",
        height: "12mm",
        width: "12mm",
        top: "1mm",
        left: "1mm",
        id: "_I_evento"
    });
    $.__views.row.add($.__views._I_evento);
    $.__views._L_rowTitle = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "16dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        height: "8mm",
        width: "auto",
        top: "1mm",
        left: "14mm",
        id: "_L_rowTitle"
    });
    $.__views.row.add($.__views._L_rowTitle);
    $.__views._L_complemento = Ti.UI.createLabel({
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
        bottom: "1mm",
        left: "14mm",
        id: "_L_complemento"
    });
    $.__views.row.add($.__views._L_complemento);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $._L_rowTitle.setText(args.name || "-");
    "android" === Titanium.Platform.getName() ? $.row.setTitle(args.name || "-") : $.row.myFilter = args.name;
    if (args.detailEvent) {
        $.row.addEventListener("click", function() {
            var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/detalle/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function() {
                    json = JSON.parse(this.responseText);
                    var detail = Alloy.createController("eventosChildDetail", {
                        name: json.name,
                        date: json.date,
                        persons: json.persons,
                        image: json.image,
                        duration: json.duration,
                        description: json.description,
                        categories: json.categories
                    });
                    detail.open();
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("error");
                },
                timeout: 3e4
            });
            xhr.open("GET", baseUrl + "?id=" + args.id);
            xhr.send();
        });
        $._L_complemento.setText(args.date || "-");
        $._I_evento.setImage(args.image || "/images/unknown.jpg");
    } else {
        $.row.categoryID = args.id;
        $._L_complemento.setText(args.eventosLength + " eventos relacionados");
        $._L_complemento.setLeft("10dp");
        $._L_rowTitle.setLeft("10dp");
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;