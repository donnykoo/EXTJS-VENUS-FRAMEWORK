Ext.define('Module.pos.posSign.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.posSignMainView',
	
    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            formConfig: {
                height: 120,
                items: [{
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        padding: '5 0 5 10'
                    },

                    defaultType: 'textfieldSearch',
                    items: [
                        {
                            fieldLabel: '用户名',
                            name: 'UserName',
                            flex: 1
                        }, {
                            fieldLabel: '设备',
                            name: 'Device',
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
								tbar: {
									xtype: 'toolbar',
									border: true,
									height: 30,
									items: []
								},                
            },
            store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.posSign.store.POSSigns'),
            columns: [
                { text: '用户名', dataIndex: 'UserName', width: 100 },
                { text: '设备', dataIndex: 'Device', width: 300 },
                { text: '时间', dataIndex: 'Date', flex: 1 },
                { text: '金额', dataIndex: 'Payment', width: 80 },
                {
                    text: 'Status',
                    dataIndex: 'Status',
                    width: 100,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 0) {
                            return '登出';
                        } else if (value === 1) {
                            return '登入';
                        }
                        return value;
                    }
                }
            ]
        });
		
        me.callParent();
    }
});
