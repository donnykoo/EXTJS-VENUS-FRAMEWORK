Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons',
    'Module.pos.stockTake.view.ApproveWindow'
]);

Ext.define('Module.pos.stockTake.view.ReportDetailWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeReportDetailWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '盘点报告明细',
    layout: 'border',
    closable: false,
    closeAction: 'hide',
    store: false,
    grid: false,
    form: false,
    create: true,
    objectId: 0,
    objectVersion: 0,
    objectData: { },

    scanBuffer: [],

    apiPath: Ext.String.format('{0}/api/StockTakeLinesApi', "/" === basket.contextPath ? "" : basket.contextPath),

    initComponent: function() {
        var me = this;
        me.plugins = [{
            ptype: 'headericons',
            pluginId: 'headerbuttons',
            headerButtons: [{
                    xtype: 'button',
                    itemId: 'detail-btn',
                    text: '查看明细',
                    height: 30,
                    width: 60,
                    scope: this,
                    handler: this.onDetailClicked
                }, {
                    xtype: 'button',
                    itemId: 'complete-btn',
                    text: '完成调整',
                    height: 30,
                    width: 60,
                    scope: this,
                    handler: this.onCompleteClicked
                }, {
                    xtype: 'button',
                    text: '关闭窗口',
                    height: 30,
                    width: 60,
                    scope: this,
                    handler: this.onCloseClicked
                }]
        }];


        var form = me.form = Ext.create('Ext.form.Panel', {
            region: 'north',
            padding: '5 5 5 5',
            fieldDefaults: {
                labelAlign: 'top',
                margin: '5 5 5 10',
                labelWidth: 160,
                msgTarget: 'under'
            },
            defaults: {
                border: false,
                xtype: 'panel',
                flex: 1,
                layout: 'anchor'
            },

            layout: 'hbox',

            items: [
                {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '仓库',
                        name: 'VirtualStock',
                        anchor: '-5',
                        readOnly: true,
                        tabIndex: 1
                    }]
                },
                {
                    items: [{
                        xtype: 'datetimefield',
                        fieldLabel: '上传时间',
                        name: 'UploadTime',
                        anchor: '-5',
                        readOnly: true,
                        tabIndex: 1,
                        format: 'Y-m-d H:i:j'
                    }]
                }
            ]
        });

        var store = me.store = Ext.create('Module.pos.stockTake.store.StockTakeReports', {
            listeners: {
                
            }
        });

        var grid = me.grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            border: true,
            padding: '5 5 5 5',
            store: store,
            selType: 'checkboxmodel',
            columnLines: true,
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
                    text: 'SKU',
                    dataIndex: 'SKU',
                    width: 160
                },
                {
                    text: '原库存',
                    dataIndex: 'StockNumber',
                    width: 160,
                    xtype:'numbercolumn'
                }, {
                    text: '实际库存',
                    dataIndex: 'ActualNumber',
                    width: 160,
                    xtype: 'numbercolumn'
                }, {
                    text: '差异',
                    width: 160,
                    xtype: 'numbercolumn',
                    renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                        return record.data["ActualNumber"] - record.data["StockNumber"];
                    }
                }
            ],
            listeners: {
                edit: function(editor, context) {

                }
            }
        });

        this.items = [form, grid];

        me.callParent();

    },

    getStore: function() {
        return this.store;
    },

    getGrid: function() {
        return this.grid;
    },
    
    getForm: function () {
        return this.form;
    },

    getObjectId: function() {
        return this.objectId;
    },
    setObjectId: function(id) {
        this.objectId = id;
    },
    getObjectVersion: function() {
        return this.objectVersion;
    },
    setObjectVersion: function(version) {
        this.objectVersion = version;
    },
    getObjectData: function() {
        return this.objectData;
    },
    setObjectData: function(data) {
        this.objectData = data;
    },
    
    onDetailClicked: function (btn, event, eOpts) {
        var me = this;
        if (!me.approveWindow) {
            me.approveWindow = Ext.widget('stockTakeApproveWindow');
        }
        me.approveWindow.setObjectId(me.getObjectId());
        me.approveWindow.setObjectData(me.getObjectData());
        me.approveWindow.show();
        me.close();
    },
    onCompleteClicked:function (btn, event, eOpts) {
        var me = this;
        if(!me.approveWindow) {
            me.approveWindow = Ext.widget('stockTakeApproveWindow');
        }
        me.approveWindow.setObjectId(me.getObjectId());
        me.approveWindow.setObjectData(me.getObjectData());
        me.approveWindow.show();
        me.close();
    },

    onCloseClicked: function (btn, event, eOpts) {
        var me = this;
        me.close();
    },
    
    configHeader: function (record) {
        var me = this;

        if (record) {
            var plugin = me.getPlugin('headerbuttons'),
                header = plugin.getHeader(),
                completeBtn = header.getComponent('complete-btn'),
                detailBtn = header.getComponent('detail-btn');

            if (record.get('Status') == 0) {
                detailBtn.hide();
                completeBtn.show();
            } else if(record.get('Status') == 1) {
                completeBtn.hide();
                detailBtn.show();
            }
        }
    },


    refresh: function (data) {
        var me = this,
            topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            var record = Ext.create('Module.pos.stockTake.model.StockTakeLine', data);
            this.getForm().getForm().loadRecord(record);
            this.getStore().loadData(data.StockTakeReports);
            me.configHeader(record);
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
        },
        beforerender:function () {
            
        }
    }
});