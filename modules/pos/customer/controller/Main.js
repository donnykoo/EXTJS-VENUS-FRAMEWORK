Ext.define('Module.pos.customer.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.customer.store.Customers'],
    models : ['Module.pos.customer.model.Customer'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'customerMainView',
		selector: 'customerMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'customerMainView': {
				afterrender: function(cmp){
					
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			}
		});
		
    },
	
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
