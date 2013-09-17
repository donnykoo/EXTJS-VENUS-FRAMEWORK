/**
 * InventoryMoveOut主显示页面
 */
Ext.define('Module.pos.inventoryMoveOut.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.inventoryMoveOutMainView',

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
                            fieldLabel: '出库单号',
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
				}]
            },
            store: Ext.data.StoreManager.lookup('Module.pos.inventoryMoveOut.store.InventoryMoveOuts'),
            columns: [
				{xtype: 'rownumberer'},
                { text: '出库单号', dataIndex: 'IdNumber', width: 160 },
                {
                    text: '出库类型', dataIndex: 'MoveOutType', width: 100,
                    renderer:function(value) {
                        if (value === 'Transfer') {
                            return '调拨';
                        } else if (value === 'Return') {
                            return '退货';
                        } else if (value === 'PickOut') {
                            return '领料';
                        } 
                    }
                },
                { text: '虚拟库', dataIndex: 'VirtualStock', width: 120 },
                { text: '申请人工号', dataIndex: 'Requestor', width: 120 },
                { text: '创建日期', dataIndex: 'CreateDate', width: 160, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 0) {
                            return '草稿';
                        } else if (value === 1) {
                            return '已完成';
                        } else if (value === 2) {
                            return '已确认';
                        } else if (value === 3) {
                            return '已作废';
                        }
                        return value;
                    }
                }
            ]
        });
		
		
        me.callParent();
    },
	
	getCreateWindow: function(){
		var me = this;
		if(!me.createWindow){
			me.createWindow = Ext.widget('inventoryMoveOutCreateWindow');
		}
		me.createWindow.setObjectId(0);
		return me.createWindow;
	}
});
