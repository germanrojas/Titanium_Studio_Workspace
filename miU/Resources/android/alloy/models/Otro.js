var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "number",
            name: "string",
            url: "string",
            icon: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "otro"
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

model = Alloy.M("otro", exports.definition, []);

collection = Alloy.C("otro", exports.definition, model);

exports.Model = model;

exports.Collection = collection;