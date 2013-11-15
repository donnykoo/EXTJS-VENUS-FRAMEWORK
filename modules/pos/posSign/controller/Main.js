Ext.define('Module.pos.posSign.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.posSign.store.POSSigns'],
    models : ['Module.pos.posSign.model.POSSign'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'posSignMainView',
		selector: 'posSignMainView'
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
