Ext.define('App.view.ContentPanel', {
    extend : 'Ext.Panel',
    alias  : 'widget.contentpanel',

    initComponent: function() {
        var me = this;

        me.callParent();
    },
	
	tbar: Ext.create('Ext.toolbar.Toolbar', {
		height: 36,
		items: [
			'<span style="color:#15428B; font-weight:bold">Back</span>'
		]
	})
});
