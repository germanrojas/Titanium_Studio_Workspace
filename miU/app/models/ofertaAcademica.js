exports.definition = {
	config: {
		columns: {
		    "title": "string",
		    "person": "string",
		    "photo": "string",
		    "snies": "string",
		    "duration": "string",
		    "description": "string",
		    "facultad": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "ofertaAcademica"
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

