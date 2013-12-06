Ext.define('Module.pos.purchaseOrder.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.purchaseOrderMainView',

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
                            fieldLabel: '订单号',
                            name: 'IdNumber',
                            flex: 2
                        }, {
                            fieldLabel: '制单人',
                            name: 'Operator',
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

            store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.purchaseOrder.store.PurchaseOrders'),
            columns: me.columns ? me.columns : [
                { text: '订单号', dataIndex: 'IdNumber', width: 150 },
                { text: '预计抵达时间', dataIndex: 'ExpectedArrivalDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                { text: '制单人编号', dataIndex: 'Operator', width: 150 },
                { text: '需求金额', dataIndex: 'DemandAmount', width: 150, xtype: 'numbercolumn' },
                { text: '应付金额', dataIndex: 'ActualAmount', width: 150, xtype: 'numbercolumn' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 'Draft') {
                            return '草稿';
                        } else if (value === 'Processing') {
                            return '处理中';
                        } else if (value === 'Cancelled') {
                            return '取消';
                        } else if (value === 'Closed') {
                            return '关闭';
                        } 
                        return value;
                    }
                }
            ]
        });
		
        me.callParent();
    },
    
    getCreateWindow: function () {
        var me = this;
        if (!me.createWindow) {
            me.createWindow = Ext.widget('purchaseOrderCreateWindow');
        }
        me.createWindow.setObjectId(0);
        return me.createWindow;
    }

});