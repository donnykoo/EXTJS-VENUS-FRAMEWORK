Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons',
    'Module.pos.stockTake.view.ReportDetailWindow'
]);


Ext.define('Module.pos.stockTake.view.ReprotWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeReportWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '盘点报告',
    layout: 'border',
    closable: false,
    closeAction: 'destroy',
    store: false,
    grid: false,
    form: false,
    create: true,
    objectId: 0,
    objectVersion: 0,
    objectData: { },

    scanBuffer: [],
    

    apiPath: Ext.String.format('{0}/api/StockTakesApi', "/" === basket.contextPath ? "" : basket.contextPath),

    initComponent: function() {
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


        var store = me.store = Ext.create('Module.pos.stockTake.store.StockTakeLines', {
            listeners: {
            }
        });

        //var rowEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        //    clicksToMoveEditor: 1,
        //    errorSummary: true,
        //    autoCancel: false
        //});

        var grid = me.grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            border: true,
            padding: '5 5 5 5',
            store: store,
            selType: 'checkboxmodel',
            columnLines: true,
            //plugins: [rowEditing],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: []
            }],
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'Id',
                    width: 50,
                    hidden: true
                },
                {
                    text: '仓库',
                    dataIndex: 'VirtualStock',
                    width: 160
                },
                {
                    text: '上传时间',
                    dataIndex: 'UploadTime',
                    width: 160,
                    xtype: 'datecolumn',
                    format: 'Y-m-d H:i:j'
                }, {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 160,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value === '0') {
                            return '待批准';
                        } else if (value === '1') {
                            return '已批准';
                        } 
                        return value;
                    }
               }, {
                    xtype: 'actioncolumn',
                    text:'报告',
                    width: 80,
                    items: [{
                        icon: 'Images/accent.png',
                        handler: function (grid, rowIndex, colindex) {
                            if (!me.reportDetailWindow) {
                                me.reportDetailWindow = Ext.widget('stockTakeReportDetailWindow');
                            }
                            var Id = grid.getStore().getAt(rowIndex).data.Id;//需要选择一行才可以获取，需要修改！
                            me.reportDetailWindow.setObjectId(Id);
                            me.reportDetailWindow.show();
                        }
                    }]
                }
            ],
            listeners: {
                edit: function(editor, context) {

                }
            }
        });

        this.items = [grid];

        me.callParent();
    },

    onCloseClicked: function(btn, event, eOpts) {
        var me = this;
        me.close();
    },
    
    getStore: function () {
        return this.store;
    },

    getGrid: function () {
        return this.grid;
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
    

    refresh: function (data) {
        var me = this,
            topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            //var record = Ext.create('Module.pos.stockTake.model.StockTake', data);
            this.getStore().loadData(data.Lines);
        } finally {
            topWin.setDisabled(false);
        }
    },


    load: function () {
        var me = this,
            winEl = me.getEl(),
            topWin = Ext.WindowMgr.getActive(),
            objectId = this.getObjectId();

        topWin.setDisabled(true);

        try {
            if (objectId > 0) {
                Ext.Ajax.request({
                    url: Ext.String.format("{0}/{1}", me.apiPath, objectId),
                    method: 'GET',
                    params: {
                        Id: objectId
                    },
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);
                        var location = response.getResponseHeader('Location');
                        Ext.Logger.debug("Resource Location : " + location);
                        Ext.Logger.dir(obj);
                        this.refresh(obj);
                        topWin.setDisabled(false);
                    },
                    failure: function (response, opts) {
                        Ext.Logger.warn('server-side failure with status code ' + response.status);
                        topWin.setDisabled(false);
                    },
                    scope: me
                });
            } else {
                //this is the new record.
                this.refresh({
                    Id: 0,
                    Version: 0,
                    Lines: []
                });
            }
        } catch (err) {
            Ext.Logger.error(err.message);
        } finally {
            topWin.setDisabled(false);
        }
    },



    listeners: {
        show: function (window, eOpts) {
            window.load();
        }
    },
});