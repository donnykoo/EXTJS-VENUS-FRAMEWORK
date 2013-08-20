Ext.define('Module.pos.product.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.productMainView',

    initCompoent: function () {
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
                        fieldLabel: '商品名称',
                        name: 'Name',
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

            },

            store: Ext.data.StoreManager.lookup('Module.pos.product.store.Products'),
            columns: [
                { text: '商品全名', dataIndex: 'Name', width: 100 },
                { text: '商品名称', dataIndex: 'ProductName', width: 100 },
                { text: 'SKU', dataIndex: 'SKU', width: 100 },
                { text: 'UPC', dataIndex: 'UPC', width: 100 },
                { text: '商品类别', dataIndex: 'ProductType', width: 100 },
                { text: 'UOM', dataIndex: 'UOMName', width: 100 },
                { text: '商品分类', dataIndex: 'ProductCategory', width: 100 },
                { text: '采购价格', dataIndex: 'PurchasePrice', width: 100 },
                { text: '服务编码', dataIndex: 'ServiceNumber', width: 100 },
                { text: 'ERP编码', dataIndex: 'ERPCode', width: 100 },
                //{
                //    text: '主材', dataIndex: 'MaterialUsages', width: 160,
                //    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                //        var materialStore = Ext.data.StoreManager.lookup('Module.pos.product.store.Materials');
                //        materialStore.loadRawData(basket.GetXMLDoc(value));
                //        return Ext.String.format('共 {0} 项耗材', materialStore.getTotalCount());
                //    }
                //},
                { text: '车型', dataIndex: 'VehicleModel', width: 100 },
                { text: '是否淘汰', dataIndex: 'Discard', width: 100 },
                { text: '是否委托', dataIndex: 'Consignment', width: 100 }

            ]
        });
        me.callParent();
    }

});