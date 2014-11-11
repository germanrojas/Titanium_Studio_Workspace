exports.definition = {
	config: {
		columns: {
		    "name": "string",
		    "hour": "string",
		    "person": "string",
		    "phone": "string",
		    "description": "string",
		    "latit": "string",
		    "longit": "string",
		    "icon": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "mapaSede"
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

