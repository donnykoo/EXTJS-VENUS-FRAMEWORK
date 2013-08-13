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
					
					defaultType: 'textfield',
					items: [
						{
							fieldLabel: '会员编号',
							name: 'IdNumber',
							flex: 1
						},{
							fieldLabel: '手机',
							name: 'Mobile',
							flex: 1
						},{
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
					
					defaultType: 'textfield',
					items: [
						{
							fieldLabel: '姓',
							name: 'LastName',
							flex: 1
						},{
							fieldLabel: '名字',
							name: 'FirstName',
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
			store: Ext.data.StoreManager.lookup('Module.pos.customer.store.Customers'),
			columns: [
				{ text: '会员号',  dataIndex: 'IdNumber', width: 160 },
				{ text: '姓名', dataIndex: 'LastName', width: 100, 
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
						return Ext.String.format("{0}{1}", value, record.get("FirstName"));
					} 
				},
				{ text: '性别', dataIndex: 'Gender', width: 50 },
				{ text: '手机', dataIndex: 'Mobile', width: 160 }
			]
        });
		
        me.callParent();
    }
});
