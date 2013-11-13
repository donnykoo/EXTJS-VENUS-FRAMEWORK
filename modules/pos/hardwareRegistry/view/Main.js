Ext.define('Module.pos.hardwareRegistry.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.hardwareRegistryMainView',
	

	
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
								fieldLabel: '门店编号',
								xtype: 'textfieldSearch',
								name: 'Store',
								flex: 1
							},{
								fieldLabel: '工位编号',
								xtype: 'textfieldSearch',
								name: 'BayNumber',
								flex: 1
							},{
								xtype: 'hidden',
								name: 'placeholder',
								flex: 1,
								submitValue: false
							}
						]
					}
				]
			},
			gridConfig: {

			},
			store: Ext.data.StoreManager.lookup('Module.pos.hardwareRegistry.store.HardwareRegistries'),
			columns: [
				{ text: '注册码', dataIndex: 'RegCode', width: 200 },
				{ text: '门店编号',  dataIndex: 'Store', width: 100 },
				{ text: '工位编号', dataIndex: 'BayNumber', width: 100 },
				{ text: '注册时间', dataIndex: 'RegTime', width: 160 },
				{ text: '设备类型', dataIndex: 'DeviceType', width: 100 },
				{ text: '设备硬件ID', dataIndex: 'MachineId', width: 160 },
				{ text: '密钥', dataIndex: 'Secret', flex:1 }
			]
        });
		/*
		var form = me.form = Ext.create('Ext.form.Panel', {
			width: '98%',
			border: false,
			height: 60,
			margin: '10 5 5 10',
			defaults: {
				border: false
			},
			fieldDefaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				layout: 'hbox',
				defaults: {
					flex: 1,
					padding: '0 0 0 10'
				},
				
				defaultType: 'textfield',
				items: [
					{
						fieldLabel: '门店编号',
						name: 'Store',
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
			}],
			buttonAlign: 'left',
			buttons: [
				{ 
					itemId: 'search-btn',
					text: 'Search' 
				},
				{ 
					text: 'Reset', handler: function(){
						form.getForm().reset();
					} 
				}
			]
		});

		var grid = me.grid = Ext.create('Ext.grid.Panel', {
			tbar: {
				xtype: 'toolbar',
				border: true,
				height: 30,
				items: []
			},
			store:  Ext.data.StoreManager.lookup('Module.pos.hardwareRegistry.store.HardwareRegistries'),
			border: false,
			flex: 1,
			anchor: '98% 98%',
			margin: '10 5 5 10',
			columns: [
				{ text: '注册码', dataIndex: 'RegCode', width: 200 },
				{ text: '门店编号',  dataIndex: 'Store', width: 100 },
				{ text: '工位编号', dataIndex: 'BayNumber', width: 100 },
				{ text: '注册时间', dataIndex: 'RegTime', width: 160 },
				{ text: '设备类型', dataIndex: 'DeviceType', width: 100 },
				{ text: '设备硬件ID', dataIndex: 'MachineId', width: 160 },
				{ text: '密钥', dataIndex: 'Secret', flex:1 }
			],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: Ext.data.StoreManager.lookup('Module.pos.hardwareRegistry.store.HardwareRegistries'),
				dock: 'bottom',
				displayInfo: true
			}],
		});
		
		this.items = [form, grid];
		*/
        me.callParent();
    }
});
