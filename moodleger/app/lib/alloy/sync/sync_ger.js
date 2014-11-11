function InitAdapter(config) {
	return {};
}
 
module.exports.sync = function(method, model, options) {
    var resp = null;
    switch (method) {
        case "read":
			resp = [
                {title: 'hello there', description: 'hey'},
                {title: 'hello21 there', description: 'hey'},
                {title: 'hello20 there', description: 'hey'},
                {title: 'hello22 there', description: 'hey'},
                {title: 'hello4 there', description: 'hey'},
                {title: 'hello5 there', description: 'hey'},
                {title: 'hello6 there', description: 'hey'}
            ];
       	break;
        
        case "create":
        break;
        
        case "update":
        break;
        case "delete":
        break;
    }
 
 
    if (resp) {
        _.isFunction(options.success) && options.success(resp);
        method === "read" && model.trigger("fetch");
    } else {
        _.isFunction(options.error) && options.error(resp);
    }
};
 
 
module.exports.beforeModelCreate = function(config) {
    config = config || {};
    InitAdapter(config);
    return config;
};
 
 
module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.config.Model = Model;
    return Model;
};