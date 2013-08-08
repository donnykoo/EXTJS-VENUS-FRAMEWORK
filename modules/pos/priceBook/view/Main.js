Ext.define('Module.pos.priceBook.view.Main', {
    extend : 'Ext.Panel',
    alias  : 'widget.priceBookMainView',

	anchor: '100% 100%',
	margin: '5 5 5 10',
	border: true,
	layout: {
		type:'vbox',
		padding:'5',
		align:'stretch'
	},
	
	
    initComponent: function() {
        var me = this;
		
        Ext.apply(me, {
            
        });
		var form = Ext.create('Ext.form.Panel', {
			xtype: 'form',
			width: '98%',
			border: false,
			height: 60,
			margin: '10 5 5 10',
			defaults: {
				border: false
			},
			fieldDefaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				layout: 'hbox',
				defaults: {
					flex: 1,
					padding: '0 0 0 10'
				},
				
				defaultType: 'textfield',
				items: [
					{
						fieldLabel: 'SKU',
						name: 'SKU',
						flex: 1
					},{
						fieldLabel: 'Name',
						name: 'Name',
						flex: 1
					},{
						xtype: 'hidden',
						name: 'placeholder',
						flex: 1,
						submitValue: false
					}
				]
			}],
			buttonAlign: 'left',
			buttons: [
				{ 
					itemId: 'search-btn',
					text: 'Search' 
				},
				{ 
					text: 'Reset', handler: function(){
						form.getForm().reset();
					} 
				}
			]
		});

		this.items = [form,{
			xtype: 'gridpanel',
			tbar: {
				xtype: 'toolbar',
				border: true,
				height: 30,
				items: []
			},
			store:  Ext.data.StoreManager.lookup('Module.pos.priceBook.store.PriceBooks'),
			border: false,
			flex: 1,
			anchor: '98% 98%',
			margin: '10 5 5 10',
			columns: [
				{ text: 'SKU',  dataIndex: 'SKU', width: 100 },
				{ text: 'Name', dataIndex: 'ProductName', flex: 1 },
				{ text: 'Price', dataIndex: 'Price', width: 160 },
				{ text: 'Effective Date', dataIndex: 'EffectiveDate', width: 160 },
				{ text: 'End Date', dataIndex: 'EndDate', width: 160 }
			],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: Ext.data.StoreManager.lookup('Module.pos.priceBook.store.PriceBooks'),
				dock: 'bottom',
				displayInfo: true
			}],
		}];
		
        me.callParent();
    }
});
