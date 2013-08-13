Ext.define('Module.pos.vehicle.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.vehicle.store.Vehicles'],
    models : ['Module.pos.vehicle.model.Vehicle'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'vehicleMainView',
		selector: 'vehicleMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'vehicleMainView': {
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
