var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            name: "string",
            hour: "string",
            person: "string",
            phone: "string",
            description: "string",
            latit: "string",
            longit: "string",
            icon: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "mapaSede"
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

model = Alloy.M("mapaSede", exports.definition, []);

collection = Alloy.C("mapaSede", exports.definition, model);

exports.Model = model;

exports.Collection = collection;