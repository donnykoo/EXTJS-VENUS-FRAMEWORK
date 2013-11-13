Ext.define('Module.pos.vehicleModel.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias: 'widget.vehicleModelMainView',
	
    initComponent: function() {
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
                                fieldLabel: '品牌',
                                name: 'Brand',
                                flex: 1
                            }, {
                                fieldLabel: '年份',
                                name: 'Year',
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
            store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.vehicleModel.store.VehicleModels'),
            columns: [
                { text: '品牌', dataIndex: 'Brand', width: 160 },
                { text: '车型', dataIndex: 'Model', width: 100 },
                { text: '排量', dataIndex: 'Displace', width: 50 },
                { text: '厂商', dataIndex: 'Manufacturer', width: 160 },
                { text: '年份', dataIndex: 'Year', width: 160 },
                { text: '发动机型号', dataIndex: 'Engine', width: 160 },
                { text: '版本', dataIndex: 'Trim', width: 160 },
                { text: '车身类型', dataIndex: 'BodyType', width: 160 },
                { text: '是否为大型车', dataIndex: 'Standard', width: 160 }
            ]
        });
		
        me.callParent();
    }
});
