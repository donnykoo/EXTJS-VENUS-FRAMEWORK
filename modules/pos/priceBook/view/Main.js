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
					
					defaultType: 'textfieldSearch',
					items: [
						{
							fieldLabel: 'SKU',
							name: 'SKU',
							flex: 1
						},{
							fieldLabel: 'Store',
							name: 'Store',
							flex: 1
						}
					]
				}]
			},
			gridConfig: {

			},
			store: Ext.data.StoreManager.lookup('Module.pos.priceBook.store.PriceBooks'),
			columns: [
				{ text: 'Store',  dataIndex: 'Store', width: 100 },
				{ text: 'SKU',  dataIndex: 'SKU', width: 100 },
				{ text: 'Name', dataIndex: 'ProductName', flex: 1 },
				{ text: 'Price', dataIndex: 'Price', width: 160 },
				{ text: 'Effective Date', dataIndex: 'StartDate', width: 160 },
				{ text: 'End Date', dataIndex: 'EndDate', width: 160 },
				{ text: 'Type', dataIndex: 'Type', width: 160, 
					renderer: function(value){
						if(value == 'Standard'){
							return '基准价';
						}else if(value == 'Temporary'){
							return '本店门市价';
						}
					} 
				}
			]
        });
		
        me.callParent();
    }
});
