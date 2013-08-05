Ext.define('App.controller.ContentPanel', {
    extend : 'Ext.app.Controller',
	
	init: function() {
        var me = this;
		
		me.control({
			'contentpanel': {
				afterrender: me.onAfterRender
			}
		});
    },
	
	/** Do some job when the app launched */
	onLaunch: function(appliation){
		
	},
	
	onAfterRender: function(view, eOpts){
		
	},
	
	/**
	 * Update the toolbar with the config data, 
	 */
	updateToolbar: function(data){
	
	}
});