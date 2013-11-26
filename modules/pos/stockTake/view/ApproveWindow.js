Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons'
]);


Ext.define('Module.pos.stockTake.view.ApproveWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeApproveWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '报告差异批准',
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
                    itemId: 'approve-btn',
                    text: '批准',
                    height: 30,
                    width: 60,
                    scope: this,
                    handler: this.onApproveClicked
                }, {
                    xtype: 'button',
                    text: '关闭窗口',
                    height: 30,
                    width: 60,
                    scope: this,
                    handler: this.onCloseClicked
                }]
        }];


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
                }, {
                    text: '差异',
                    width: 160,
                    xtype: 'numbercolumn',
                    renderer: function(value, cellmeta, record, rowIndex, columnIndex, store) {
                        return record.data["ActualNumber"] - record.data["StockNumber"];
                    }
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

    getStore: function() {
        return this.store;
    },

    getGrid: function() {
        return this.grid;
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

    onApproveClicked: function(btn, event, eOpts) {
        var me = this;

        Ext.Msg.confirm('批准', '您确定批准?',
            function(btn, text) {
                if (btn == 'ok' || btn == 'yes' || btn == '确定') {

                    var onBeforeRequest = function(conn, options, eOpts) {
                        Ext.getBody().mask('请求提交中......');
                        Ext.Ajax.un('beforerequest', onBeforeRequest, this);
                    };

                    Ext.Ajax.on({
                        beforerequest: onBeforeRequest,
                        scope: this
                    });


                    Ext.Ajax.request({
                        url: Ext.String.format("{0}/{1}/Approved", me.apiPath, me.objectId),
                        method: 'POST',
                        params: {
                            Id: me.getObjectId()
                        },
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            var window = Ext.getCmp('StockTakeReportWindow');
                            window.setObjectId(obj.Id);
                            window.load();
                            me.close();
                        },
                        failure: function(response, opts) {
                            Ext.Logger.warn('server-side failure with status code ' + response.status);
                        },
                        scope: this
                    });
                }
            }, this);
    },

    onCloseClicked: function(btn, event, eOpts) {
        var me = this;
        me.close();
    },

    configHeader: function(record) {
        var me = this;

        if (record) {
            var plugin = me.getPlugin('headerbuttons'),
                header = plugin.getHeader(),
                approveBtn = header.getComponent('approve-btn');

            if (record.get('Status') == 0) {
                approveBtn.show();
            } else if (record.get('Status') == 1) {
                approveBtn.hide();
            }
        }
    },

    refresh: function(data) {
        var me = this,
            topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            var record = Ext.create('Module.pos.stockTake.model.StockTakeLine', data);
            var lines = '';
            if (data.StockTakeReports) {
                lines = data.StockTakeReports;
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].ActualNumber - lines[i].StockNumber == 0) {
                        Ext.Array.remove(lines, lines[i]);
                    }
                }
            }
            this.getStore().loadData(lines);
            me.configHeader(record);
        } finally {
            topWin.setDisabled(false);
        }
    },

    listeners: {
        show: function(window, eOpts) {
            var me = this;
            window.refresh(this.getObjectData());
        }
    }
});