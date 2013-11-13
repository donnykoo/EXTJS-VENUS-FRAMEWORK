Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons',
    'Module.pos.stockTake.view.UploadWindow',
    'Module.pos.stockTake.view.ReprotWindow'
]);

Ext.define('Module.pos.stockTake.view.StartWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeStartWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '盘点进行中',
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
                text: '完成',
                itemId:'complete-btn',
                height: 30,
                width: 60,
                scope: this,
                handler: this.onCompleteClicked
            },{
                xtype: 'button',
                text: '取消',
                itemId: 'cancel-btn',
                height: 30,
                width: 60,
                scope: this,
                handler: this.onCancelClicked
                },{
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
                add: { fn: me.onRowAdded, scope: this }
            }
        });

        var rowEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToMoveEditor: 1,
            errorSummary: true,
            autoCancel: false
        });

        var grid = me.grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            border: true,
            padding: '5 5 5 5',
            store: store,
            selType: 'checkboxmodel',
            columnLines: true,
            plugins: [rowEditing],
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
                    text: '文件',
                    dataIndex: 'URL'
                }, {
                    xtype: 'actioncolumn',
                    text:'上传',
                    width: 40,
                    items: [{
                        icon: 'Images/accent.png',
                        handler: function (grid, rowIndex, colindex) {
                            if (!me.uploadWindow) {
                                me.uploadWindow = Ext.widget('stockTakeUploadWindow');
                            }
                            var Id = grid.getStore().getAt(rowIndex).data.Id;//需要选择一行才可以获取，需要修改！
                            me.uploadWindow.setObjectId(Id);
                            me.uploadWindow.show();
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

    onCompleteClicked:function (button,event) {
        var me = this;

        Ext.Msg.confirm('确定', '请确定',
            function (btn, text) {
                if (btn == 'ok' || btn == 'yes' || btn == '确定') {

                    var onBeforeRequest = function (conn, options, eOpts) {
                        Ext.getBody().mask('请求提交中......');
                        Ext.Ajax.un('beforerequest', onBeforeRequest, this);
                    };

                    Ext.Ajax.on({
                        beforerequest: onBeforeRequest,
                        scope: this
                    });

                    Ext.Ajax.request({
                        url: Ext.String.format("{0}/{1}/Completed", me.apiPath, me.objectId),
                        method: 'POST',
                        params: {
                            Id: me.getObjectId()
                        },
                        success: function (response, opts) {
                            var obj = Ext.decode(response.responseText);
                            var location = response.getResponseHeader('Location');
                            Ext.Logger.debug("Resource Location : " + location);
                            Ext.Logger.dir(obj);
                            this.refresh(obj);
                            me.reportWindow = Ext.widget('stockTakeReportWindow', { id: 'StockTakeReportWindow' });
                            me.reportWindow.setObjectId(obj.Id);
                            me.close();
                            me.reportWindow.show();
                        },
                        failure: function (response, opts) {
                            Ext.Logger.warn('server-side failure with status code ' + response.status);
                        },
                        scope: this
                    });
                }
            }, this);
    },
    
    onCancelClicked:function (button,event) {
        var me = this;

        Ext.Msg.confirm('取消', '您确定取消?',
            function (btn, text) {
                if (btn == 'ok' || btn == 'yes' || btn == '确定') {
                    
                    var onBeforeRequest = function (conn, options, eOpts) {
                        Ext.getBody().mask('请求提交中......');
                        Ext.Ajax.un('beforerequest', onBeforeRequest, this);
                    };

                    Ext.Ajax.on({
                        beforerequest: onBeforeRequest,
                        scope: this
                    });


                    Ext.Ajax.request({
                        url: Ext.String.format("{0}/{1}/Canceled", me.apiPath, me.objectId),
                        method: 'POST',
                        params: {
                            Id: me.getObjectId()
                        },
                        success: function (response, opts) {
                            me.close();///需要重新刷新主页面，来判断是否存在进行中盘点
                        },
                        failure: function (response, opts) {
                            Ext.Logger.warn('server-side failure with status code ' + response.status);
                        },
                        scope: this
                    });
                }
            }, this);
    },

    onCloseClicked: function(button, event) {
        var me = this;
        //var main = Ext.getCmp('StcokTakeMainView');
        //main.doLayout();
        me.close();
    },


    /////////////////////
    getStore: function () {
        return this.store;
    },

    getGrid: function () {
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
    

    //获取提交的数据
    getSubmitValues: function () {
        var me = this,
            grid = me.getGrid(),
            store = grid.getStore();

        var submitValues = '';
        var modified = store.getRange(); //seems, only return valid record

        var isValid = true;
        var invalidIndex = 0;
        var records = [];
        Ext.each(modified, function (record, index, thisCollection) {

            if (record.isValid() === true) {
                records.push(record.getData());
            } else {
                isValid = false;
                invalidIndex = index;
                return false;
            }
        });

        if (!isValid) {
            grid.getView().focusRow(invalidIndex);
            return false;
        }


        var submitObj = Ext.apply(me.objectData);
        submitObj = Ext.apply(submitObj, {
            Lines: records
        });


        return submitObj;
    },
    
    refresh: function (data) {
        var me = this,
            topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            var record = Ext.create('Module.pos.stockTake.model.StockTake', data);
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



