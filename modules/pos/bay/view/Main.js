Ext.define('Module.pos.bay.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.bayMainView',
	
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
							fieldLabel: '名称',
							name: 'Name',
							flex: 1
						},{
							fieldLabel: '工位编号',
							name: 'BayNumber',
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
			store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.bay.store.Bays'),
			columns: [
				{ text: '名称', dataIndex: 'Name', width: 200 },
				{ text: '工位编号',  dataIndex: 'BayNumber', width: 160 },
				{ text: '工位类型', dataIndex: 'BayType', width: 160 },
				{ text: '设备注册码', dataIndex: 'RegisterCode', width: 160 },
				{ text: '门店', dataIndex: 'Store', width: 160 },
				{ text: '服务', dataIndex: 'Services', width: 160}
			]
        });
		
        me.callParent();
    }
});
