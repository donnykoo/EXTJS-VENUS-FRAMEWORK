Ext.define('Module.pos.system.transaction.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.system.transaction.store.Transactions'],
    models : ['Module.pos.system.transaction.model.Transaction'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'bayMainView',
		selector: 'bayMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'bayMainView': {
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
