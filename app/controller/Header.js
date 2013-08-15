Ext.define('App.controller.Header', {
    extend : 'Ext.app.Controller',
	
    init: function() {
        var me = this;
		
		me.control({
			'headerview': {
				beforerender: me.onHeaderViewBeforeRender,
				afterrender: me.onHeaderViewAfterRender
			}
		});
    },
	
	refs : [{
        ref: 'headerView',
        selector: 'headerview'
    }],
	
	onLaunch: function(appliation){
		
	},
	
	onHeaderViewBeforeRender: function(view, eOpts){
	
	},
	
	onHeaderViewAfterRender: function(view, eOpts){
		var me = this;
		me.loadHeader();
	},
	
	loadHeader: function(){
		var me = this;
		var view = me.getHeaderView();
		Ext.Ajax.request({
			url: Ext.String.format('{0}account/getsession', basket.contextPath),
			method: 'POST',
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				
				Ext.Logger.dir(obj);
				
				/** Update the navigation menu with the data retrieved from server **/
				view.update(obj);
				
			},
			failure: function(response, opts) {
				Ext.Logger.error('server-side failure with status code ' + response.status);
			}
		});	
	}
});