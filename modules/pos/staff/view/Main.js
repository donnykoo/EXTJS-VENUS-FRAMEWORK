Ext.define('Module.pos.staff.view.Main', {
    extend : 'Ext.Panel',
    alias  : 'widget.staffMainView',

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
		
		var form = me.form = Ext.create('Ext.form.Panel', {
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
				
				defaultType: 'textfield',
				items: [
					{
						fieldLabel: '姓名',
						name: 'Name',
						flex: 1
					},{
						fieldLabel: '员工号',
						name: 'StaffNumber',
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
			store:  Ext.data.StoreManager.lookup('Module.pos.staff.store.Staffs'),
			border: false,
			flex: 1,
			anchor: '98% 98%',
			margin: '10 5 5 10',
			columns: [
				{ text: '姓名', dataIndex: 'Name', width: 100 },
				{ text: '员工号',  dataIndex: 'StaffNumber', width: 200 },
				{ text: 'RFID卡号', dataIndex: 'RFCardNumber', width: 200 }
			],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: Ext.data.StoreManager.lookup('Module.pos.staff.store.Staffs'),
				dock: 'bottom',
				displayInfo: true
			}],
		});
		
		this.items = [form, grid];
		
        me.callParent();
    }
});
