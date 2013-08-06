Ext.define('App.view.ContentPanel', {
    extend : 'Ext.Panel',
    alias  : 'widget.contentpanel',

    initComponent: function() {
        var me = this;
        me.callParent();
    },
	
	bbar: Ext.create('Ext.toolbar.Toolbar', {
		height: 36,
		items: [
			
		]
	})
});
