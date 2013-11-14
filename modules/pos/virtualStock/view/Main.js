Ext.define('Module.pos.virtualStock.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.virtualStockMainView',
	
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
			store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.virtualStock.store.VirtualStocks'),
			columns: me.columns ? me.columns : [
				{ text: '名称', dataIndex: 'Name', width: 200 },
				{ text: '编号', dataIndex: 'IdNumber', width: 160 },
				{ text: '类型', dataIndex: 'StockType', width: 160 },
				{ text: '门店', dataIndex: 'StoreName', width: 160 },
				{ text: '关联员工', dataIndex: 'OwnerName', width: 160 },
				{ text: '状态', dataIndex: 'Status', width: 160, 
					renderer: function(value){
						if(value === 0){
							return '正常使用中';
						}else if(value === 1){
							return '冻结';
						}else if(value === 2){
							return '关闭';
						}
					}
				}
			]
        });
		
        me.callParent();
    }
});
