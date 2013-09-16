Ext.define('App.view.ContentPanel', {
    extend : 'Ext.Panel',
    alias  : 'widget.contentpanel',

    initComponent: function() {
        var me = this;
        me.callParent();
    },
	
	bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
        id: 'app-status',
		height: 36,
        // defaults to use when the status is cleared:
        defaultText: 'Ready',
        defaultIconCls: 'default-icon',

        // values to set initially:
        text: 'Ready',
        iconCls: 'ready-icon',

        // any standard Toolbar items:
        items: []
    })
});
