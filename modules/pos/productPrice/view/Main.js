Ext.define('Module.pos.productPrice.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.productPriceMainView',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            formConfig: {
                height: 60,
                items: [{
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        padding: '5 0 5 10'
                    },
                    defaultType: 'textfieldSearch',
                    items: [
                    {
                        fieldLabel: 'SKU',
                        name: 'SKU',
                        flex: 2
                    }, {
                        fieldLabel: '商品分类',
                        name: 'ProductCategory',
                        flex: 2
                    }, {
                        xtype: 'hidden',
                        name: 'placeholder2',
                        flex: 1,
                        submitValue: false
                    }]
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
			
			
            store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.productPrice.store.ProductPrices'),
			columns: me.columns ? me.columns : [
				{ text: 'SKU', dataIndex: 'SKU', width: 100 },
                { text: '商品全名', dataIndex: 'Name', width: 300 },
                { text: 'UPC', dataIndex: 'UPC', width: 120 },
                { text: 'UOM', dataIndex: 'UOMName', width: 100 },
                { text: '商品分类', dataIndex: 'ProductCategory', width: 100 },
                { text: '价格', dataIndex: 'Price', width: 100 },
                { text: '服务编码', dataIndex: 'ServiceNumber', width: 100 }
            ]
            
        });
		
        me.callParent();
    }

});