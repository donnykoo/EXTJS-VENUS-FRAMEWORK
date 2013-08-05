Ext.define('App.view.Viewport', {
    extend : 'Ext.container.Viewport',

    uses : [
        'Ext.app.SubApplication',
		'App.view.Navigator',
		'App.view.ContentPanel'
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
        height: 48,
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
			xtype: 'container',
			region: 'center',
			cls: 'v-toolbar',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			pack: 'end',
			margins: '4 5 4 0',
			items: [{
				xtype: 'component',
				flex:1
			},{
				xtype: 'component',
				width: 32,
				autoEl: {
					tag: 'img',
					src: 'resources/icons/09-user.png'
				}
			}]
		}]
    },{
		id: 'west-region-container',
		region:'west',
        xtype: 'panel',
		split: false,
		splitterResize: false,
        margins: '0 0 0 5',
        width: 270,
        collapsible: false,   // make collapsible
        layout: 'anchor',
		autoScroll: false,
		tbar: Ext.create('Ext.toolbar.Toolbar', {
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
        xtype: 'contentpanel',
        layout: {
			type: 'absolute'
		},
        margins: '0 5 0 0',
		items:[]
    },{
        region: 'south',     // position for region
        xtype: 'container',
        height: 36,
        split: false,         // disable resizing
        margins: '0 0 0 0'
	}]
});
