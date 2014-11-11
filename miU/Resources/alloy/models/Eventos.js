exports.definition = {
    config: {
        columns: {
            id: "number",
            name: "string",
            author: "string",
            image: "string",
            date: "string",
            duration: "string",
            description: "string",
            category: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "eventos"
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

model = Alloy.M("eventos", exports.definition, []);

collection = Alloy.C("eventos", exports.definition, model);

exports.Model = model;

exports.Collection = collection;