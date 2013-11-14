Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons',
    'Module.pos.stockTake.store.StockTakes',
    'Module.pos.stockTake.model.StockTake',
    'Module.pos.stockTake.view.ReportDetailWindow'
]);

Ext.define('Module.pos.stockTake.view.HistoryWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeHistoryWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '查看历史',
    layout: 'border',
    closable: false,
    closeAction: 'destroy',
    store: false,
    grid: false,
    form: false,
    create: true,
    objectId: 0,
    objectVersion: 0,
    objectData: {},

    scanBuffer: [],
    

    initComponent: function () {
        var me = this;
        me.plugins = [{
            ptype: 'headericons',
            pluginId: 'headerbuttons',
            headerButtons: [{
                xtype: 'button',
                text: '关闭窗口',
                height: 30,
                width: 60,
                scope: this,
                handler: this.onCloseClicked
            }]
        }];
        


        var store = me.store = Ext.create('Module.pos.stockTake.store.StockTakes', {
            listeners: {
                
            }
        });


        var grid = me.grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            border: true,
            padding: '5 5 5 5',
            selType: 'checkboxmodel',
            store: store,
            columnLines: true,
            columns: [{
                    text: 'ID',
                    dataIndex: 'Id',
                    width: 50,
                    hidden: true
                }, {
                    text: '完成时间',
                    dataIndex: 'StockTakeTime',
                    width: 160,
                    xtype: 'datecolumn',
                    format: 'Y-m-d H:i:j'
                }, {
                    xtype: 'actioncolumn',
                    text: '查看',
                    width: 40,
                    items: [{
                        icon: 'Images/accent.png',
                        handler: function(grid, rowIndex, colindex) {
                            me.reportWindow = Ext.widget('stockTakeReportWindow', { id: 'StockTakeReportWindow' });
                            var Id = grid.getStore().getAt(rowIndex).data.Id;//需要选择一行才可以获取，需要修改！
                            me.reportWindow.setObjectId(Id);
                            me.reportWindow.show();
                        }
                    }]
                }]
        });

        this.items = [grid];
        me.callParent();
    },
    
    getObjectId: function () {
        return this.objectId;
    },
    setObjectId: function (id) {
        this.objectId = id;
    },
    getObjectVersion: function () {
        return this.objectVersion;
    },
    setObjectVersion: function (version) {
        this.objectVersion = version;
    },
    getObjectData: function () {
        return this.objectData;
    },
    setObjectData: function (data) {
        this.objectData = data;
    },
    
    onCloseClicked:function (btn, event, eOpts) {
        var me = this;
        me.close();
    }
});