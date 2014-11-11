function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contactoMail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views._W_contactoMail = Ti.UI.createEmailDialog({
        barColor: "#164A94",
        id: "_W_contactoMail"
    });
    $.__views._W_contactoMail && $.addTopLevelView($.__views._W_contactoMail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    exports.open = function() {
        $._W_contactoMail.open();
    };
    $._W_contactoMail.setToRecipients([ args.email ]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;