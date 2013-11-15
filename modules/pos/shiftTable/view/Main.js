Ext.define('Module.pos.shiftTable.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias: 'widget.shiftTableMainView',

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
					    fieldLabel: '员工号',
					    name: 'StaffNumber',
						flex: 1
					},{
					    fieldLabel: '角色',
					    name: 'Role',
						flex: 1
					}
				]
				}]
			},

		gridConfig: {
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
			},
			store: me.store ? me.store : Ext.data.StoreManager.lookup('Module.pos.shiftTable.store.ShiftTables'),
			columns: [
				{ text: '员工', dataIndex: 'StaffName', width: 100 },
				{ text: '员工号', dataIndex: 'StaffNumber', flex: 1 },
				{ text: '角色名', dataIndex: 'Role', width: 160 },
                { text: '角色', dataIndex: 'RoleName', width: 160 },
				{ text: '开始时间', dataIndex: 'StartTime', width: 160 },
				{ text: '结束时间', dataIndex: 'EndTime', width: 160 }
			]
        });

        me.callParent();
    }
});
