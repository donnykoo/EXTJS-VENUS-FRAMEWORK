/**
 * serviceInstance主显示页面
 */
Ext.define('Module.pos.serviceInstance.view.Main', {
    id:'ServiceInstanceMainView',
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.serviceInstanceMainView',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            formConfig: {
                height: 60,
                anchor: '100%',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    padding: '5 0 5 10'
                },

                defaultType: 'textfieldSearch',
                items: [{
                        fieldLabel: '施工单号',
                        name: 'IdNumber',
                        flex: 1,
                    }, {
                        fieldLabel: '顾客名称',
                        name: 'CustomerName',
                        flex: 1,
                    }, {
                        xtype: 'comboboxSearch',
                        fieldLabel: '状态',
                        tabIndex: 2,
                        anchor: '100%',
                        name: 'Status',
                        queryMode: 'local',
                        displayField: 'value',
                        valueField: 'key',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['key', 'value'],
                            data: [
                                { "key": "Pending", "value": "新建" },
                                { "key": "Ready", "value": "进场" },
                                { "key": "Started", "value": "开始" },
                                { "key": "Completed", "value": "完成" },
                                { "key": "Cancelled", "value": "取消" },
                                { "key": "Failed", "value": "失败" },
                                { "key": "Pause", "value": "暂停" }
                            ]
                        })
                    }, {
                        xtype: 'hidden',
                        name: 'placeholder2',
                        submitValue: false
                    }]
            },
            gridConfig: {
                tbar: [{
                    xtype: 'button',
                    itemId: 'create-btn',
                    text: '创建'
                }]
            },
            store: Ext.data.StoreManager.lookup('Module.pos.serviceInstance.store.ServiceInstances'),
            columns: [
                { xtype: 'rownumberer' },
                { text: '施工单号', dataIndex: 'IdNumber', width: 120 },
                { text: '顾客', dataIndex: 'CustomerName', width: 120 },
                { text: '服务', dataIndex: 'ServiceNumber', width: 120 },
                { text: '操作人', dataIndex: 'WorkerNumber', width: 120 },
                { text: '计划开始时间', dataIndex: 'PlanStartTime', width: 120, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                { text: '计划结束时间', dataIndex: 'PlanEndTime', width: 120, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                { text: '实际开始时间', dataIndex: 'ActualStartTime', width: 120, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                { text: '实际结束时间', dataIndex: 'ActualEndTime', width: 120, xtype: 'datecolumn', format: 'Y-m-d H:i:j' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === 'Pending') {
                            return '新建';
                        } else if (value === 'Ready') {
                            return '进场';
                        } else if (value === 'Started') {
                            return '开始';
                        } else if (value === 'Completed') {
                            return '完成';
                        } else if (value === 'Cancelled') {
                            return '取消';
                        } else if (value === 'Failed') {
                            return '失败';
                        } else if (value === 'Pause') {
                            return '暂停';
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
		    me.createWindow = Ext.widget('serviceInstanceCreateWindow');
		}
		me.createWindow.setObjectId(0);
		return me.createWindow;
	}
});
