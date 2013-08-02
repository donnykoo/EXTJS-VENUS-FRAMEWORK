Ext.define('App.view.Viewport', {
    extend : 'Ext.container.Viewport',

    uses : [
        'Ext.app.SubApplication',
        'App.view.Main'
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
			width: 240,
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
			},{
				xtype: 'component',
				width: 32,
				autoEl: {
					tag: 'img',
					src: 'resources/icons/03-mail.png'
				}
			},{
				xtype: 'component',
				width: 32,
				autoEl: {
					tag: 'img',
					src: 'resources/icons/07-share.png'
				}
			}]
		}]
    },{
        title: 'Navigator',
        region:'west',
        xtype: 'panel',
		frame: true,
        margins: '0 0 0 5',
        width: 240,
        collapsible: true,   // make collapsible
        id: 'west-region-container',
        layout: 'fit',
		items: {
			xtype : 'mainview'
		}
    },{
        title: 'Center Region',
        region: 'center',     // center region is required, no width/height specified
        xtype: 'container',
        layout: {
			type: 'absolute'
			// layout-specific configs go here
			//itemCls: 'x-abs-layout-item',
		},
        margins: '0 5 0 0',
		style: "background-image: url('resources/images/ios-linen.jpg') !important",
		items:[{
			xtype:'container',
			x: 100,
			y: 100,
			width: 200,
			height: 200,
			border: false,
			style: "background-image: url('resources/images/ios-linen.jpg') !important;",
			html: '<h1>Hello</h1>'
		}]
    }]
});
