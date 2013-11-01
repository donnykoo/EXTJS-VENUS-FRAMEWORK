Ext.define('Module.pos.system.transaction.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.transactionMainView',
	
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
							fieldLabel: '事务编号',
							name: 'TransactionId',
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

			},
			store: Ext.data.StoreManager.lookup('Module.pos.system.transaction.store.Transactions'),
			columns: [
				{ text: '名称', dataIndex: 'Name', width: 160 },
				{ text: '事务编号',  dataIndex: 'TransactionId', width: 160 },
				{ text: '实例编号', dataIndex: 'InstanceId', width: 160 },
				{ text: '创建时间', dataIndex: 'CreateDate', width: 160 },
				{ text: '创建人', dataIndex: 'CreateBy', width: 160 },
				{ text: '负载', dataIndex: 'Payload', width: 200},
				{ text: '对象ID', dataIndex: 'TargetId', width: 160 },
				{ text: '执行状态', dataIndex: 'Status', width: 160 },
				{ text: '错误信息', dataIndex: 'ErrorMessage', width: 160 }
			]
        });
		
        me.callParent();
    }
});
