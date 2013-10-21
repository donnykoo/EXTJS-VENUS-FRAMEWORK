Ext.define('Module.pos.service.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.serviceMainView',
	
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
							fieldLabel: '服务分类',
							name: 'CategoryName',
							flex: 2
						},{
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
			store: Ext.data.StoreManager.lookup('Module.pos.service.store.Services'),
			columns: [
				{ text: '服务编号',  dataIndex: 'SKU', width: 100 },
				{ text: '名称', dataIndex: 'Name', width: 160 },
				{ text: '分类', dataIndex: 'CategoryName', width: 160 },
				{ text: '用时', dataIndex: 'Duration', width: 80,
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
						return Ext.String.format("{0}分钟", value);
					} 
				},
				{ text: '建议零售价', dataIndex: 'Price', width: 100 },
				{ text: '步骤', dataIndex: 'Steps', width: 160,
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
						var stepStore = Ext.data.StoreManager.lookup('Module.pos.service.store.Steps');
						stepStore.loadRawData(basket.GetXMLDoc(value));
						return Ext.String.format('共 {0} 步', stepStore.getTotalCount());
					} 
				},
				{ text: '辅材', dataIndex: 'Materials', width: 160,
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
						var materialStore = Ext.data.StoreManager.lookup('Module.pos.service.store.Materials');
						materialStore.loadRawData(basket.GetXMLDoc(value));
						return Ext.String.format('共 {0} 项耗材', materialStore.getTotalCount());
					} 
				}
			]
        });
		
        me.callParent();
    }
});
