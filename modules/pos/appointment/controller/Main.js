Ext.define('Module.pos.appointment.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.appointment.store.Appointments'],
    models : ['Module.pos.appointment.model.Appointment'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'appointmentMainView',
		selector: 'appointmentMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'appointmentMainView': {
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
