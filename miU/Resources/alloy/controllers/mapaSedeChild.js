function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapaSedeChild";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views._I_lugar = Ti.UI.createImageView({
        borderRadius: 10,
        height: "12mm",
        width: "12mm",
        top: "1mm",
        left: "1mm",
        id: "_I_lugar"
    });
    $.__views.row.add($.__views._I_lugar);
    $.__views._L_rowTitle = Ti.UI.createLabel({
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "16dp",
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
            fontSize: "12dp",
            fontStyle: "italic"
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
    $._I_lugar.setImage(args.image || "/images/unknown.jpg");
    $._L_complemento.setText("Tel: " + args.phone);
    $.row.addEventListener("click", function() {
        var baseUrl = "http://miuniversidad-site.dev01.icti.es/api/lugares/detalle/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function() {
                json = JSON.parse(this.responseText);
                var detail = Alloy.createController("mapaSedeChildDetail", {
                    name: json.name,
                    hour: json.hour,
                    persons: json.persons,
                    phone: json.phone,
                    description: json.description,
                    latit: json.latit,
                    longit: json.longit
                });
                detail.open();
            },
            onerror: function(e) {
                alert("Error: " + e.error);
            },
            timeout: 15e3
        });
        xhr.open("GET", baseUrl + "?id=" + args.id);
        xhr.send();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;