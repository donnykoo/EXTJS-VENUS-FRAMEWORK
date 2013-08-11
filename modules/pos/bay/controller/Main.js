Ext.define('Module.pos.bay.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.bay.store.Bays'],
    models : ['Module.pos.bay.model.Bay'],
	
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
