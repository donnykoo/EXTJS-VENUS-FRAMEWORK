Ext.define('Module.pos.priceBook.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.priceBookMainView',

	
    initComponent: function() {
        var me = this;
		
        Ext.apply(me, {
            formConfig: {
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
				}]
			},
			gridConfig: {

			},
			store: Ext.data.StoreManager.lookup('Module.pos.priceBook.store.PriceBooks'),
			columns: [
				{ text: 'SKU',  dataIndex: 'SKU', width: 100 },
				{ text: 'Name', dataIndex: 'ProductName', flex: 1 },
				{ text: 'Price', dataIndex: 'Price', width: 160 },
				{ text: 'Effective Date', dataIndex: 'EffectiveDate', width: 160 },
				{ text: 'End Date', dataIndex: 'EndDate', width: 160 }
			]
        });
		
        me.callParent();
    }
});
