Ext.define('Module.pos.staff.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.staffMainView',
	
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
							fieldLabel: '姓名',
							name: 'Name',
							flex: 1
						},{
							fieldLabel: '员工号',
							name: 'StaffNumber',
							flex: 1
						}
					]
				}]
			},
			gridConfig: {

			},
			store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.staff.store.Staffs'),
			columns: me.columns ? me.columns :[
				{ text: '姓名', dataIndex: 'Name', width: 100 },
				{ text: '员工号',  dataIndex: 'StaffNumber', width: 200 },
				{ text: 'RFID卡号', dataIndex: 'RFCardNumber', width: 200 }
			]
        });
		
        me.callParent();
    }
});
