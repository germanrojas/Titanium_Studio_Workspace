var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            title: "string",
            person: "string",
            photo: "string",
            snies: "string",
            duration: "string",
            description: "string",
            facultad: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "ofertaAcademica"
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

model = Alloy.M("ofertaAcademica", exports.definition, []);

collection = Alloy.C("ofertaAcademica", exports.definition, model);

exports.Model = model;

exports.Collection = collection;