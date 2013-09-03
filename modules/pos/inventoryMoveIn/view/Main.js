/**
 * InventoryMoveIn主显示页面
 */
Ext.define('Module.pos.inventoryMoveIn.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.inventoryMoveInMainView',

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
                            fieldLabel: '入库单号',
                            name: 'IdNumber',
                            flex: 1
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '虚拟库',
                            name: 'VirtualStock',
                            flex: 1
                        }, {
                            xtype: 'hidden',
                            name: 'placeholder2',
                            flex: 1,
                            submitValue: false
                        }
                    ]
                }]
            },
            gridConfig: {
				tbar: [{
					xtype: 'button',
					itemId: 'create-btn',
					text: '创建'
				}, '-', {
					xtype: 'button',
					itemId: 'cancel-btn',
					text: '取消'
				}]
            },
            store: Ext.data.StoreManager.lookup('Module.pos.inventoryMoveIn.store.InventoryMoveIns'),
            columns: [
                { text: '入库单号', dataIndex: 'IdNumber', width: 120 },
                {
                    text: '入库类型', dataIndex: 'MoveInType', width: 100,
                    renderer:function(value) {
                        if (value == 'Purchase') {
                            return '采购';
                        } else if (value == 'Allot') {
                            return '调拨';
                        } else if (value == 'Returns') {
                            return '退货';
                        } else if (value == 'Adjust') {
                            return '调整';
                        } else if (value == 'ReMaterial') {
                            return '退料';
                        }
                    }
                },
                { text: '虚拟库', dataIndex: 'VirtualStock', width: 60 },
                { text: '员工编号', dataIndex: 'StaffNumber', width: 80 },
                { text: '创建日期', dataIndex: 'CreateDate', width: 80, xtype: 'datecolumn', format: 'Y-m-d' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value == 'Pending') {
                            return '草稿';
                        } else if (value == 'Completed') {
                            return '已提交';
                        } else if (value == 'Cancelled') {
                            return '已取消';
                        } else if (value == 'Closed') {
                            return '已确认';
                        }
                        return value;
                    }
                }, {
                    header: '',
                    width: 200,
                    resizable: false
                }
            ]
        });
		
		
        me.callParent();
    },
	
	getCreateWindow: function(){
		var me = this;
		if(!me.createWindow){
			me.createWindow = Ext.widget('inventoryMoveInCreateWindow');
		}
		return me.createWindow;
	}
});
