var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            name: "string",
            cel: "string",
            email: "string",
            photo: "string",
            area: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "directorio"
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

model = Alloy.M("directorio", exports.definition, []);

collection = Alloy.C("directorio", exports.definition, model);

exports.Model = model;

exports.Collection = collection;