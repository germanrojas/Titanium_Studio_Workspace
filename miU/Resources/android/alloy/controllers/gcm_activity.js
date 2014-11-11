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
    this.__controllerPath = "gcm_activity";
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
    !function(activity, gcm) {
        var intent = activity.intent;
        intent.hasExtra("ntfId") && (gcm.data = {
            ntfId: intent.getIntExtra("ntfId", 0)
        });
        if (gcm.isLauncherActivity) {
            var mainActivityIntent = Ti.Android.createIntent({
                className: gcm.mainActivityClassName,
                packageName: Ti.App.id,
                flags: Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
            });
            mainActivityIntent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
            activity.startActivity(mainActivityIntent);
        } else activity.finish();
    }(Ti.Android.currentActivity, require("net.iamyellow.gcmjs"));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;