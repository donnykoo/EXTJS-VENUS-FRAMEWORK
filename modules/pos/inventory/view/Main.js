Ext.define('Module.pos.inventory.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.inventoryMainView',
	
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
							fieldLabel: '商品SKU',
							name: 'SKU',
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
			    tbar: {
			        xtype: 'toolbar',
			        border: true,
			        height: 30,
			        items: []
			    },
			},
			store: Ext.data.StoreManager.lookup('Module.pos.inventory.store.Inventories'),
			columns: [
				{ text: 'SKU', dataIndex: 'SKU', width: 100 },
				{ text: '商品名称', dataIndex: 'ProductName', width: 100 },
				{ text: '门店',  dataIndex: 'Store', width: 100 },
				{ text: '虚拟仓库代码', dataIndex: 'VirtualStock', width: 100 },
				{ text: '虚拟仓库名称', dataIndex: 'VirtualStockName', width: 100 },
				{ text: '可用数量',  dataIndex: 'Available', width: 100 },
				{ text: '锁定数量',  dataIndex: 'Reserved', width: 100 }
			]
        });
		
        me.callParent();
    }
});
