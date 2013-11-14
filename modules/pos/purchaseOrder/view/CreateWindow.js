Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons',
    'Module.pos.purchaseOrder.store.PurchaseOrderLines'
]);

Ext.define('Module.pos.purchaseOrder.view.CreateWindow', {
    extend: 'Ext.Window',
    alias: 'widget.purchaseOrderCreateWindow',
    height: 540,
    width: 800,
    constrain: true,
    autoScroll:true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '采购订单',
    layout: 'anchor',
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

    //Should have one record field

    apiPath: Ext.String.format('{0}/api/PurchaseOrdersApi', "/" === basket.contextPath ? "" : basket.contextPath),

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
                            fieldLabel: '施工单号',
                            anchor: '-5',
                            name: 'IdNumber',
                            submitValue: false,
                            readOnly: true,
                            tabIndex: 1,
                            emptyText: '系统自动生成'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '制单人',
                            anchor: '-5',
                            name: 'Operator',
                            submitValue: false,
                            readOnly: true,
                            tabIndex: 1
                        },{
                            xtype: 'datetimefield',
                            fieldLabel: '下单时间',
                            name: 'ExpectedArrivalDate',
                            tabIndex: 4,
                            anchor: '100%',
                            submitFormat: "Y-m-d\\TH:i:sO",
                            editable: false,
                            allowBlank: false,
                            timePicker: true,
                            format: "Y-m-d H:i:j",
                            readOnly:true
                        },{
                            xtype: 'textfield',
                            fieldLabel: '供应商',
                            name: 'Supplier',
                            tabIndex: 4,
                            anchor: '100%',
                            allowBlank: false,
                            readOnly:true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '国家',
                            name: 'Country',
                            tabIndex: 4,
                            anchor: '100%',
                            allowBlank: false,
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '省份',
                            name: 'Province',
                            tabIndex: 4,
                            anchor: '100%',
                            allowBlank: false,
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '城市',
                            name: 'City',
                            tabIndex: 4,
                            anchor: '100%',
                            allowBlank: false,
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '区县',
                            name: 'District',
                            tabIndex: 4,
                            anchor: '100%',
                            allowBlank: false,
                            readOnly: true
                        }, {
                            xtype: 'hidden',
                            fieldLabel: 'ID',
                            anchor: '-5',
                            name: 'Id',
                            readOnly: true,
                            tabIndex: 0,
                            value: 0
                        }, {
                            xtype: 'hidden',
                            fieldLabel: 'Version',
                            anchor: '-5',
                            name: 'Version',
                            readOnly: true,
                            tabIndex: 0,
                            value: 0
                        }]
                },
                {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '到货地址',
                        name: 'Address',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '邮编',
                        name: 'Zipcode',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '联系人',
                        name: 'ContactPerson',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '联系手机',
                        name: 'ContactPhone',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '批准人',
                        name: 'ConfirmPerson',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '关闭人',
                        name: 'ClosePerson',
                        tabIndex: 4,
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }]
                }
            ]
        });

        var store = me.store = Ext.create('Module.pos.purchaseOrder.store.PurchaseOrderLines', {
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
                items: [
                    //{
                    //    text: '新增',
                    //    scope: this,
                    //    handler: me.onAddLineClick
                    //}, '-', {
                    //    text: '删除',
                    //    scope: this,
                    //    handler: me.onDeleteLineClick
                    //}
                ]
            }],
            columns: [
                {
                    text: 'SKU',
                    dataIndex: 'SKU',
                    width: 160
                    //editor: {
                    //    xtype: 'ux.field.TextTriggerField',
                    //    store: Ext.create('Module.pos.productPrice.store.ProductPrices', {

                    //    }),
                    //    windowConfig: {
                    //        height: 420,
                    //        width: 680,
                    //        searchPanelType: 'productPriceMainView'
                    //    },
                    //    columns: [
                    //        { text: 'SKU', dataIndex: 'SKU', width: 100 },
                    //        { text: '商品全名', dataIndex: 'Name', width: 300 },
                    //        { text: 'UPC', dataIndex: 'UPC', width: 120 },
                    //        { text: 'UOM', dataIndex: 'UOM', width: 100 },
                    //        { text: '价格', dataIndex: 'PurchasePrice', width: 100 },
                    //        { text: '需求数量', dataIndex: 'DemandQuantity', width: 100 },
                    //        { text: '实际数量', dataIndex: 'ActualQuantity', width: 100 }
                    //    ],

                    //    itemSelected: function(window, innerGrid, record, item, index, e, eOpts) {
                    //        var me = this,
                    //            sku = record.get("SKU");

                    //        me.setValue(sku);

                    //        var selections = grid.getSelectionModel().getSelection();
                    //        var rec = selections[0];
                    //        rec.set('SKU', record.get("SKU"));
                    //        rec.set('Quantity', 1.0);
                    //        rec.set('Price', record.get("Price"));
                    //    },
                    //    listeners: {
                    //        close: function(window, panel, eOpts) {

                    //        }
                    //    },
                    //    allowBlank: false
                    //}
                },
                {
                    text: '需求数量',
                    dataIndex: 'DemandQuantity',
                    width: 100,
                    xtype: 'numbercolumn',
                    format: '0,000.00',
                    align: 'right',
                    //editor: {
                    //    xtype: 'ux.field.NumericField',
                    //    decimalPrecision: 2,
                    //    minValue: 0,
                    //    hideTrigger: true,
                    //    allowBlank: false
                    //}
                },
                {
                    text: '实际数量',
                    dataIndex: 'ActualQuantity',
                    width: 100,
                    xtype: 'numbercolumn',
                    format: '0,000.00',
                    align: 'right',
                    //editor: {
                    //    xtype: 'ux.field.NumericField',
                    //    decimalPrecision: 2,
                    //    minValue: 0,
                    //    hideTrigger: true,
                    //    allowBlank: false
                    //}
                },
                { text: '价格', dataIndex: 'PurchasePrice', width: 150 }
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

    getForm: function() {
        return this.form;
    },

    //onAddLineClick: function(btn, event, eOpts) {
    //    var me = this,
    //        store = this.getStore();
    //    if (store) {
    //        var model = Ext.create('Module.pos.serviceInstance.model.InstanceProduct', {
    //            SKU: '',
    //            Quantity: 0.0,
    //            Price: 0.0
    //        });
    //        store.add(model);
    //    }
    //},

    //onDeleteLineClick: function(btn, event, eOpts) {
    //    var me = this,
    //        grid = this.getGrid(),
    //        store = this.getStore(),
    //    selModel = grid.getSelectionModel();

    //    var selections = selModel.getSelection();

    //    if (selections && selections.length > 0) {
    //        Ext.Msg.confirm('Alert',
    //            Ext.String.format('您确认要删除选定的{0}条记录？', selections.length),
    //            function(buttonId, text, opts) {

    //                if (buttonId === 'yes' || buttonId === 'YES') {
    //                    store.remove(selections);
    //                }
    //            },
    //            this);
    //    }
    //},

    //onRowAdded: function(store, records, index, eOpts) {
    //    var me = this,
    //        grid = this.getGrid();

    //    if (grid) {

    //        // var view = grid.getView();
    //        // var rowEl = Ext.get(view.getNode(records[index], true));
    //        // rowEl.scrollIntoView(view.scroller); 


    //        //grid.startEditing(newRowIndex, 1);
    //    }
    //},

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

    getSubmitValues: function() {
        var me = this,
            form = me.getForm(),
            grid = me.getGrid(),
            store = grid.getStore();
        if (!form.isValid()) {
            return false;
        }

        var submitValues = form.getValues(false);

        var modified = store.getRange(); //seems, only return valid record

        var isValid = true;
        var invalidIndex = 0;
        var records = [];
        Ext.each(modified, function(record, index, thisCollection) {

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


        var submitObj = Ext.apply(me.objectData, submitValues);
        submitObj = Ext.apply(submitObj, {
            PurchaseOrderLines: records
        });


        return submitObj;
    },

    //onSaveClicked: function(button, evet) {
    //    var me = this;
    //    var submitValues = me.getSubmitValues();

    //    if (!submitValues) {
    //        return;
    //    }

    //    var onBeforeRequest = function(conn, options, eOpts) {
    //        Ext.getBody().mask('请求提交中......');
    //        Ext.Ajax.un('beforerequest', onBeforeRequest, this);
    //    };

    //    Ext.Ajax.on({
    //        beforerequest: onBeforeRequest,
    //        scope: this
    //    });

    //    Ext.Ajax.request({
    //        url: me.apiPath,
    //        method: me.getObjectId() > 0 ? 'PUT' : 'POST',
    //        jsonData: submitValues,
    //        success: function(response, opts) {
    //            var obj = Ext.decode(response.responseText);
    //            var location = response.getResponseHeader('Location');
    //            Ext.Logger.debug("Resource Location : " + location);
    //            Ext.Logger.dir(obj);

    //            this.refresh(obj);
    //        },
    //        failure: function(response, opts) {
    //            Ext.Logger.warn('server-side failure with status code ' + response.status);
    //        },
    //        scope: this
    //    });
    //},

    onCloseClicked: function(button, event) {
        var me = this;
        //var grid = Ext.getCmp("PurchaseOrderMainView");
        //grid.getStore().load();
        me.close();
    },

    //onStartClicked: function(button, event) {

    //    var me = this;

    //    Ext.Msg.confirm('开始', '您是否确认开始?',
    //        function(btn, text) {
    //            if (btn == 'ok' || btn == 'yes' || btn == '确定') {
    //                Ext.Ajax.request({
    //                    url: Ext.String.format("{0}/{1}/Start", me.apiPath, me.objectId),
    //                    method: 'POST',
    //                    params: {
    //                        Id: me.getObjectId()
    //                    },
    //                    success: function(response, opts) {
    //                        var obj = Ext.decode(response.responseText);
    //                        var location = response.getResponseHeader('Location');
    //                        Ext.Logger.debug("Resource Location : " + location);
    //                        Ext.Logger.dir(obj);

    //                        this.refresh(obj);
    //                    },
    //                    failure: function(response, opts) {
    //                        Ext.Logger.warn('server-side failure with status code ' + response.status);
    //                    },
    //                    scope: this
    //                });
    //            }
    //        }, this);
    //},

    //onPauseClicked: function (button, event) {
    //    var me = this;

    //    Ext.Msg.confirm('暂停', '您确定是否暂停施工单?',
    //        function(btn, text) {
    //            if (btn == 'ok' || btn == 'yes' || btn == '确定') {
    //                Ext.Ajax.request({
    //                    url: Ext.String.format("{0}/{1}/Pause", me.apiPath, me.objectId),
    //                    method: 'POST',
    //                    params: {
    //                        Id: me.getObjectId()
    //                    },
    //                    success: function(response, opts) {
    //                        var obj = Ext.decode(response.responseText);
    //                        var location = response.getResponseHeader('Location');
    //                        Ext.Logger.debug("Resource Location : " + location);
    //                        Ext.Logger.dir(obj);

    //                        this.refresh(obj);
    //                    },
    //                    failure: function(response, opts) {
    //                        Ext.Logger.warn('server-side failure with status code ' + response.status);
    //                    },
    //                    scope: this
    //                });
    //            }
    //        }, this);
    //},
    
    //onFailedClicked: function (button, event) {
    //    var me = this;

    //    Ext.Msg.confirm('失败', '您确定失败?',
    //        function (btn, text) {
    //            if (btn == 'ok' || btn == 'yes' || btn == '确定') {
    //                Ext.Ajax.request({
    //                    url: Ext.String.format("{0}/{1}/Failed", me.apiPath, me.objectId),
    //                    method: 'POST',
    //                    params: {
    //                        Id: me.getObjectId()
    //                    },
    //                    success: function (response, opts) {
    //                        var obj = Ext.decode(response.responseText);
    //                        var location = response.getResponseHeader('Location');
    //                        Ext.Logger.debug("Resource Location : " + location);
    //                        Ext.Logger.dir(obj);

    //                        this.refresh(obj);
    //                    },
    //                    failure: function (response, opts) {
    //                        Ext.Logger.warn('server-side failure with status code ' + response.status);
    //                    },
    //                    scope: this
    //                });
    //            }
    //        }, this);
    //},

    //onCancelClicked: function(button, event) {
    //    var me = this;

    //    Ext.Msg.confirm('取消', '您确定是否取消施工单?',
    //        function(btn, text) {
    //            if (btn == 'ok' || btn == 'yes' || btn == '确定') {
    //                Ext.Ajax.request({
    //                    url: Ext.String.format("{0}/{1}/Cancel", me.apiPath, me.objectId),
    //                    method: 'POST',
    //                    params: {
    //                        Id: me.getObjectId()
    //                    },
    //                    success: function(response, opts) {
    //                        var obj = Ext.decode(response.responseText);
    //                        var location = response.getResponseHeader('Location');
    //                        Ext.Logger.debug("Resource Location : " + location);
    //                        Ext.Logger.dir(obj);

    //                        this.refresh(obj);
    //                    },
    //                    failure: function(response, opts) {
    //                        Ext.Logger.warn('server-side failure with status code ' + response.status);
    //                    },
    //                    scope: this
    //                });
    //            }
    //        }, this);
    //},

    refresh: function(data) {
        var me = this,
            topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            var record = Ext.create('Module.pos.purchaseOrder.model.PurchaseOrder', data);
            this.getForm().getForm().loadRecord(record);
            this.getStore().loadData(data.Lines);


            //Set status bar
            var status = '';
            if (record.get('Status') == '1') {
                status = '草稿';
            } else if (record.get('Status') == '10') {
                status = '处理中';
            } else if (record.get('Status') == '20') {
                status = '关闭';
            } else if (record.get('Status') == '25') {
                status = '取消';
            } 

            me.setStatus({
                text: status
            });

            //re-config buttons
            me.configHeader(record);
        } finally {
            topWin.setDisabled(false);
        }
    },

    configHeader: function(record) {
        var me = this;

        //if (record) {
        //    var plugin = me.getPlugin('headerbuttons'),
        //        header = plugin.getHeader(),
        //        saveBtn = header.getComponent('saveButton'),
        //        startBtn = header.getComponent('startButton'),
        //        pauseBtn = header.getComponent('pauseButton'),
        //        cancelBtn = header.getComponent('cancelButton'),
        //        failedBtn = header.getComponent('failedButton');

        //    if (record.get('Status') == 0 && record.get('Id') > 0) {
        //        //草稿
        //        saveBtn.setDisabled(false);
        //        startBtn.setDisabled(false);
        //        pauseBtn.setDisabled(true);
        //        cancelBtn.setDisabled(true);
        //        failedBtn.setDisabled(true);
        //    } else if (record.get('Status') == 1) {
        //        saveBtn.setDisabled(true);
        //        pauseBtn.setDisabled(true);
        //        startBtn.setDisabled(false);
        //        cancelBtn.setDisabled(false);
        //        failedBtn.setDisabled(true);
        //    } else if (record.get('Status') == 5) {
        //        saveBtn.setDisabled(true);
        //        pauseBtn.setDisabled(false);
        //        startBtn.setDisabled(true);
        //        cancelBtn.setDisabled(true);
        //        failedBtn.setDisabled(false);
        //    } else if (record.get('Status') == 10 || record.get('Status') == 15 || record.get('Status') == 20) {
        //        saveBtn.setDisabled(true);
        //        pauseBtn.setDisabled(true);
        //        startBtn.setDisabled(true);
        //        cancelBtn.setDisabled(true);
        //        failedBtn.setDisabled(true);
        //    } else if (record.get('Status') == 25) {
        //        saveBtn.setDisabled(true);
        //        pauseBtn.setDisabled(true);
        //        startBtn.setDisabled(false);
        //        cancelBtn.setDisabled(true);
        //        failedBtn.setDisabled(true);
        //    } else {
        //        saveBtn.setDisabled(false);
        //        startBtn.setDisabled(true);
        //        pauseBtn.setDisabled(true);
        //        cancelBtn.setDisabled(true);
        //        failedBtn.setDisabled(true);
        //    }
        //}
    },

    load: function() {
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
                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        var location = response.getResponseHeader('Location');
                        Ext.Logger.debug("Resource Location : " + location);
                        Ext.Logger.dir(obj);
                        this.refresh(obj);
                        topWin.setDisabled(false);
                    },
                    failure: function(response, opts) {
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
        } catch(err) {
            Ext.Logger.error(err.message);
        } finally {
            topWin.setDisabled(false);
        }
    },

    listeners: {
        show: function(window, eOpts) {
            window.load();
        },
        afterrender: function(window, eOpts) {
            var element = window.getEl();
            element.on({
                keyup: function(e, t, eOpts) {
                    e.preventDefault();
                    if (e.getCharCode() == 13) {
                        var sku = Ext.String.trim(window.scanBuffer.join('')); //Could be UPC or SKU
                        window.scanBuffer = [];
                        if (sku && sku.length > 0) {
                            //try to retrieve the product from server side
                            Ext.Ajax.request({
                                url: Ext.String.format("{0}/Products?$filter=SKU eq '{1}' or UPC eq '{1}'", basket.dataSource, sku),
                                method: 'GET',
                                success: function(response, opts) {
                                    var me = window,
                                        store = window.getStore(),
                                        obj = Ext.decode(response.responseText);
                                    Ext.Logger.dir(obj);
                                    if (obj && obj.value && obj.value.length > 0) {
                                        var data = obj.value[0];
                                        if (store) {
                                            var model = Ext.create('Module.pos.purchaseOrder.model.PurchaseOrderLine', {
                                                SKU: data.SKU,
                                                DemandQuantity: 1.0,
                                                ActualQuantity: 1.0,
                                                PurchasePrice: 0.0
                                            });
                                            store.add(model);
                                        }
                                    }
                                    window.setDisabled(false);
                                },
                                failure: function(response, opts) {
                                    Ext.Logger.warn('server-side failure with status code ' + response.status);
                                    window.setDisabled(false);
                                },
                                scope: window
                            });
                        }
                    } else {
                        window.scanBuffer.push(String.fromCharCode(e.getCharCode()));
                    }
                }
            });
        }
    },

    bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
        id: 'my-status',

        // defaults to use when the status is cleared:
        defaultText: 'Default status text',
        defaultIconCls: 'default-icon',

        // values to set initially:
        text: 'Ready',
        iconCls: 'ready-icon',

        // any standard Toolbar items:
        items: []
    }),

    getStatusBar: function() {
        var me = this,
            statusBar = me.getDockedItems('statusbar[dock="bottom"]');

        return statusBar[0];
    },

    setStatus: function(o) {
        var me = this,
            statusBar = me.getStatusBar();
        statusBar.setStatus(o);
    }
});