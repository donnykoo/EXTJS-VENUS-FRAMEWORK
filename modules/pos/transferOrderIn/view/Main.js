/**
 * InventoryMoveIn主显示页面
 */
Ext.define('Module.pos.transferOrderIn.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.transferOrderInMainView',

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
                            fieldLabel: '单号',
                            name: 'IdNumber',
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
				tbar: []
            },
            store: Ext.data.StoreManager.lookup('Module.pos.transferOrderIn.store.TransferOrderIns'),
            columns: [
				{xtype: 'rownumberer'},
                { text: '调拨单号', dataIndex: 'IdNumber', width: 160 },
                { text: '申请人', dataIndex: 'Operator', width: 120 },
                { text: '创建日期', dataIndex: 'CreateDate', width: 160, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 'Draft') {
                            return '草稿';
                        } else if (value === 'Processing') {
                            return '已确认';
                        } else if (value === 'Closed') {
                            return '已关闭';
                        } else if (value === 'Cancelled') {
                            return '已取消';
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
			me.createWindow = Ext.widget('transferOrderInCreateWindow');
		}
		me.createWindow.setObjectId(0);
		return me.createWindow;
	}
});
