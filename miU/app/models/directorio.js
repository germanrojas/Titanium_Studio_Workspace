exports.definition = {
	config: {
		columns: {
		    "name": "string",
		    "cel": "string",
		    "email": "string",
		    "photo": "string",
		    "area": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "directorio"
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

