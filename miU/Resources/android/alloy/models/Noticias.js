var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            title: "string",
            author: "string",
            photo: "string",
            date: "string",
            description: "string",
            category: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "noticias"
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

model = Alloy.M("noticias", exports.definition, []);

collection = Alloy.C("noticias", exports.definition, model);

exports.Model = model;

exports.Collection = collection;