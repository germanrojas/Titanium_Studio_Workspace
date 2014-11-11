exports.definition = {
	config: {
		columns: {
		    "name": "string",
		    "local": "string",
		    "phone": "string",
		    "email": "string",
		    "address": "string",
		    "description": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "contacto"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
            
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
            
		});
		
		return Collection;
	}
}

