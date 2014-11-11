exports.definition = {
    config: {
        columns: {
            title: "string",
            description: "string",
            date: "string",
            icon: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "notificaciones"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("notificaciones", exports.definition, []);

collection = Alloy.C("notificaciones", exports.definition, model);

exports.Model = model;

exports.Collection = collection;