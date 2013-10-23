/**
 * InventoryMoveIn主显示页面
 */
Ext.define('Module.pos.pickOutOrder.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.pickOutOrderMainView',

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
                            fieldLabel: '领料单号',
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
            store: Ext.data.StoreManager.lookup('Module.pos.pickOutOrder.store.PickOutOrders'),
            columns: [
				{xtype: 'rownumberer'},
                { text: '领料单号', dataIndex: 'IdNumber', width: 160 },
                {
                    text: '领料类型', dataIndex: 'PickOutOrderType', width: 100,
                    renderer:function(value) {
                        if (value === 'Service') {
                            return '服务施工领料';
                        } else if (value === 'Normal') {
                            return '一般领料';
                        }
                    }
                },
                { text: '申请人', dataIndex: 'Requestor', width: 120 },
                { text: '创建日期', dataIndex: 'CreateDate', width: 160, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 0) {
                            return '草稿';
                        } else if (value === 1) {
                            return '已确认';
                        } else if (value === 2) {
                            return '已关闭';
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
			me.createWindow = Ext.widget('pickOutOrderCreateWindow');
		}
		me.createWindow.setObjectId(0);
		return me.createWindow;
	}
});
