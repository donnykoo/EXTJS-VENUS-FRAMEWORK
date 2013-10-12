/**
 * 主显示页面
 */
Ext.define('Module.pos.POSOrder.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.posOrderMainView',

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
                            fieldLabel: 'POS单号',
                            name: 'IdNumber',
                            flex: 1
                        }, {
                            fieldLabel: '会员号',
                            name: 'CustomerNumber',
                            flex: 1
                        }, {
                            xtype: 'hidden',
                            name: 'placeholder2',
                            flex: 1,
                            submitValue: false
                        }
                    ]
                }]
            },
            gridConfig: {
                
            },
            store: me.store ? store : Ext.data.StoreManager.lookup('Module.pos.POSOrder.store.POSOrders'),
            columns: [
                { text: 'POS单号', dataIndex: 'IdNumber', width: 150 },
                { text: '会员号', dataIndex: 'CustomerNumber', width: 150 },
                { text: '下单时间', dataIndex: 'TransactionDate', width: 150, xtype: 'datecolumn' },
                {
                    text: '状态',
                    dataIndex: 'StatusValue',
                    width: 150,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value == 0) {
                            return "草稿";
                        } else if (value == 1) {
                            return "完成";
                        } else if (value == 2) {
                            return "暂停";
                        } else if (value == 3) {
                            return "取消";
                        }
                        return value;
                    }
                }
            ]
        }); 
		
		
        me.callParent();
    }
});
