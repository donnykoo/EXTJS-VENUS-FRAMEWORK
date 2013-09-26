Ext.define('Module.pos.shiftTable.view.Main', {
    extend : 'Ext.Panel',
    alias: 'widget.shiftTableMainView',

	anchor: '100% 100%',
	margin: '5 5 5 10',
	border: true,
	layout: {
		type:'vbox',
		padding:'5',
		align:'stretch'
	},
	
	
    initComponent: function() {
        var me = this;
		
        Ext.apply(me, {
            
        });
		var form = Ext.create('Ext.form.Panel', {
			xtype: 'form',
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
				
				defaultType: 'textfieldSearch',
				items: [
					{
					    fieldLabel: 'StaffNumber',
					    name: 'StaffNumber',
						flex: 1
					},{
					    fieldLabel: 'RoleName',
					    name: 'RoleName',
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

		this.items = [form,{
			xtype: 'gridpanel',
			tbar: {
				xtype: 'toolbar',
				border: true,
				height: 30,
				items: []
			},
			store: Ext.data.StoreManager.lookup('Module.pos.shiftTable.store.ShiftTables'),
			border: false,
			flex: 1,
			anchor: '98% 98%',
			margin: '10 5 5 10',
			columns: [
				{ text: 'StaffName', dataIndex: 'StaffName', width: 100 },
				{ text: 'StaffNumber', dataIndex: 'StaffNumber', flex: 1 },
				{ text: 'Role', dataIndex: 'Role', width: 160 },
                { text: 'RoleName', dataIndex: 'RoleName', width: 160 },
				{ text: 'Start Time', dataIndex: 'StartTime', width: 160 },
				{ text: 'End Time', dataIndex: 'EndTime', width: 160 }
			],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: Ext.data.StoreManager.lookup('Module.pos.shiftTable.store.ShiftTables'),
				dock: 'bottom',
				displayInfo: true
			}],

			tbar: [{
			    xtype: 'button',
			    itemId: 'export-btn',
			    text: '导出模板'
			}, '-', {
			    xtype: 'button',
			    itemId: 'import-btn',
			    text: '导入排班表'
			}, '-', {
			    xtype: 'button',
			    itemId: 'modify-btn',
			    text: '修改排班表'
			}]
		}];
		
        me.callParent();
    }
});
