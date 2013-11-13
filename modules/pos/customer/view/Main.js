Ext.define('Module.pos.customer.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.customerMainView',
	
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
                                fieldLabel: '会员编号',
                                name: 'IdNumber',
                                flex: 1
                            }, {
                                fieldLabel: '手机',
                                name: 'Mobile',
                                flex: 1
                            }, {
                                xtype: 'hidden',
                                name: 'placeholder2',
                                flex: 1,
                                submitValue: false
                            }
                        ]
                    }, {
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            padding: '5 0 5 10'
                        },

                        defaultType: 'textfieldSearch',
                        items: [
                            {
                                fieldLabel: '姓名',
                                name: 'Name',
                                flex: 1
                            }, {
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
            store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.customer.store.Customers'),
            columns: [
                { text: '会员号', dataIndex: 'IdNumber', width: 160 },
                { text: '姓名', dataIndex: 'Name', width: 100 },
                { text: '性别', dataIndex: 'Gender', width: 50 },
                { text: '手机', dataIndex: 'Mobile', width: 160 }
            ]
        });
		
        me.callParent();
    }
});
