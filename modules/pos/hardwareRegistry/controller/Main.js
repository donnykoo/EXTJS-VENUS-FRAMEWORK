Ext.define('Module.pos.hardwareRegistry.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.hardwareRegistry.store.HardwareRegistries'],
    models : ['Module.pos.hardwareRegistry.model.HardwareRegistry'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'hardwareRegistryMainView',
		selector: 'hardwareRegistryMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'hardwareRegistryMainView': {
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
