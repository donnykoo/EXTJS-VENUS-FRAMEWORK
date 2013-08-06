Ext.define('App.view.Viewport', {
    extend : 'Ext.container.Viewport',

    uses : [
        'Ext.app.SubApplication',
		'App.view.Navigator',
		'App.view.ContentPanel',
		'App.view.Header'
    ],

    layout : 'border',
	
	border: 3,
	/*
	style: {
		borderColor: 'gray',
		borderStyle: 'solid'
	},
	*/

    items  : [{
        region: 'north',     // position for region
        xtype: 'container',
        height: 40,
		layout: 'border',
        split: false,         // disable resizing
        margins: '0 0 0 0',
		items: [{
			xtype: 'component',
			region:'west',
			margins: '0 0 0 5',
			width: 270,
			collapsible: false
		},{
			xtype: 'headerview'
		}]
    },{
		id: 'west-region-container',
		region:'west',
        xtype: 'panel',
		split: false,
		border:false,
		splitterResize: false,
        margins: '0 0 0 5',
        width: 270,
        collapsible: false,   // make collapsible
        layout: 'anchor',
		autoScroll: false,
		bbar: Ext.create('Ext.toolbar.Toolbar', {
			//cls: 'x-panel-header',
			height: 36,
			items: [
				'->',
				{
					itemId: 'refresh-btn',
					text: 'Refresh',
					iconCls: 'refresh'
				}
			]
		}),
		items: {
			xtype : 'navigatorview',
			width: '100%',
			data: []
		}
    },{
        region: 'center',     // center region is required, no width/height specified
		id: 'content-container',
        xtype: 'contentpanel',
		border: false,
		layout: 'absolute',
        margins: '0 0 0 0',
		items:[]
    }]
});
