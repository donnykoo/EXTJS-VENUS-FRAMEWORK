/**
	To add support to OData Server side paging, override the build request method to add $top, $skip
**/
Ext.override(Ext.data.proxy.Server, {
	buildRequest: function(operation) {
		
        var me = this,
            // Clone params right now so that they can be mutated at any point further down the call stack
            params = operation.params = Ext.apply({}, operation.params, me.extraParams),
            request;

        //copy any sorters, filters etc into the params so they can be sent over the wire
        Ext.applyIf(params, me.getParams(operation));
		
		Ext.Logger.dir(operation.params);
		
		/** Add the support to OData paging, convert the start and limit parameter to $top and $skip **/
		if(params.start || params.start === 0){
			Ext.apply(params, { '$skip': params.start });
		}
		if(params.limit){
			Ext.apply(params, { '$top': params.limit });
		}
		
        // Set up the entity id parameter according to the configured name.
        // This defaults to "id". But TreeStore has a "nodeParam" configuration which
        // specifies the id parameter name of the node being loaded.
        if (operation.id !== undefined && params[me.idParam] === undefined) {
            params[me.idParam] = operation.id;
        }

        request = new Ext.data.Request({
            params   : params,
            action   : operation.action,
            records  : operation.records,
            operation: operation,
            url      : operation.url,

            // this is needed by JsonSimlet in order to properly construct responses for
            // requests from this proxy
            proxy: me
        });

        request.url = me.buildUrl(request);

        /*
         * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
         * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
         */
        operation.request = request;

        return request;
    }
});
