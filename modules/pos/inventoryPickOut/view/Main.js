Ext.define("Lookup", {
    extend: 'Ext.form.TwinTriggerField',
    alias: 'widget.lookupfield',

    model: 'LookupModel',	//The underlying data model
    record: false,	//the record data
    originRecord: false,
    editable: false,
    selectionWindow: false, //The object selection grid window

    initComponent: function () {
        Lookup.superclass.initComponent.call(this);
        this.on('specialkey', function (f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger1Click();
            }
        }, this);
    },

    validationEvent: false,
    validateOnBlur: false,
    trigger1Cls: 'x-form-clear-trigger',
    trigger2Cls: 'x-form-search-trigger',

    hideTrigger1: false,
    hideTrigger2: false,

    width: 180,
    hasSearch: false,
    //clear the selection
    onTrigger1Click: function () {
        this.setValue({ Id: 0, Name: "" });
    },

    onTrigger2Click: function () {
        if (this.selectionWindow) {
            var window = Ext.getCmp(this.selectionWindow);
            window.bindingField = this;
            window.show();
        }
    },

    setValue: function (value) {
        if (!Ext.isEmpty(value) && Ext.isObject(value)) {
            if (this.record === false && this.originRecord === false) {
                this.originRecord = value;
            }
            this.record = value;
            this.callParent([value.Name]);
        }
        
    },

    getValue: function () {
        if (this.record) {
            //这里返回的record是一个json对象，因为form.loadRecord()方法加载进来的也是JSON对象
            return this.record;
        }
    },

    reset: function () {
        if (this.rawRecord != null) {
            this.rawRecord = null;
        }
        this.record = { Id: 0, Name: "" };
        this.setValue(this.record);
        //		if(this.originRecord){
        //			this.record = this.originRecord;
        //			this.setValue(this.record);
        //		}else{
        //			this.record = {Id: 0, Name: ""};
        //			this.setValue(this.record);
        //		}
    },

    isEqual: function (value1, value2) {
        if (Ext.isObject(value1) && Ext.isObject(value2)) {
            return value1.Id === value2.Id;
        } else {
            return String(value1) === String(value2);
        }
    }
});


//商品弹出框口
Ext.create("Ext.Window", {
    id: 'com.storeOS.window.ProductSelection',
    //requires: 'Module.pos.product.view.Main',
    width: 640,
    height: 360,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items: Ext.create("Ext.panel.Panel", {
        layout: 'border',
        border: false,
        items: [{
            region: 'center',
            frame: false,
            layout: 'fit',
            border: false,
            items: Ext.create("Ext.grid.Panel", {
                store: Ext.create("Module.pos.product.store.Products", {
                    storeId: 'productStore'
                }),
                columns: [
                    { text: 'ID', dataIndex: 'Id', hidden: true },
                { text: '商品全名', dataIndex: 'Name', width: 100 },
                { text: '商品名称', dataIndex: 'ProductName', width: 100 },
                { text: 'SKU', dataIndex: 'SKU', width: 100 },
                { text: '商品类别', dataIndex: 'ProductType', width: 100 },
                { text: 'UOM', dataIndex: 'UOMName', width: 100 }
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: Ext.data.StoreManager.lookup('productStore'),  // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],
                listeners: {
                    itemdblclick: function (thisGrid, record, item, index, e, eOpts) {
                        var window = thisGrid.up("window");
                        if (window) {
                            var id = record.get("Id");
                            var name = record.get("Name");
                            if (window) {
                                window.setSelectionValue(record);
                            }
                            window.close();
                        }
                    }
                }
            })
        }]
    }),
    setSelectionValue: function(record) {
        var storeId = record.get("Id");
        var name = record.get("Name");
        if (this.bindingField) {
            this.bindingField.rawRecord = record;
            this.bindingField.setValue({ Id: storeId, Name: name });
        }
    }
});




//InventoryMoveInLineForm  Grid新建Form
Ext.define("InventoryPickOutLineForm", {
    extend: "Ext.form.Panel",
    alias: ['widget.inventoryPickOutLineForm'],
    frame: false,
    buttonAlign: 'left',
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        anchor: '95%',
        msgTarget: 'side'
    },
    
    defaults: {
        border: false,
        xtype: 'panel',
        layout: 'anchor'
    },
    
    layout: 'form',
    items: [{
        anchor: '100%',
        layout: 'hbox',
        buttonAlign: 'left',
        bodyPadding: 5,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 100,
            anchor: '95%',
            msgTarget: 'side'
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'anchor'
        },
        items:[{
            flex: 1,
            items: [{
                xtype: 'lookupfield',
                fieldLabel: '商品名称',
                name: 'Product',
                selectionWindow: 'com.storeOS.window.ProductSelection',
                submitValue: false,
                allowBlank: false,
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        var form = me.up('form').getForm();
                        var nameFd = form.findField("Name");
                        var skuFd = form.findField('SKU');
                        var uomFd = form.findField('UOM');
                        if (me.rawRecord) {
                            nameFd.setValue(me.rawRecord.get('Name'));
                            skuFd.setValue(me.rawRecord.get('SKU'));
                            uomFd.setValue(me.rawRecord.get('UOMName'));
                        } else {
                            nameFd.setValue("");
                            skuFd.setValue("");
                            uomFd.setValue("");
                        }
                    }
                }
            }, {
                xtype: 'hidden',
                name:'Name'
            },{
                xtype: 'textfield',
                fieldLabel: '商品编码',
                allowBlank: false,
                name: 'SKU'
            }, {
                xtype: 'textfield',
                fieldLabel: '计量单位',
                allowBlank: false,
                name: 'UOM',
            }, {
                xtype: 'numberfield',
                fieldLabel: '数量',
                allowBlank: false,
                value: 0,
                minValue:0,
                name: 'Quantity'
            }, {
                xtype: 'numberfield',
                fieldLabel: '实收数量',
                allowBlank: false,
                value: 0,
                minValue:0,
                name: 'RealityQuantity'
            }]
        }]
    }],
    buttons: [{
        text: '提交 =>',
        iconCls: 'confirm-button',
        handler: function () {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                //var productField = form.findField("Product");
                var nameField = form.findField("Name");
                var uomField = form.findField("UOM");
                var skuField = form.findField("SKU");
                var quantiryField = form.findField("Quantity");
                var realityQuantityFd = form.findField("RealityQuantity");
                var lastRecord = form.getRecord();
                var dirties = form.getValues();
                Ext.apply(dirties, {
                    //Product: productField.getValue(),
                    SKU: skuField.getValue(),
                    Name: nameField.getValue(),
                    UOM: uomField.getValue(),
                    Quantity: quantiryField.getValue(),
                    RealityQuantity: realityQuantityFd.getValue()
                });
                if (lastRecord) {
                    //This is existing record
                    for (var key in dirties) {
                        lastRecord.set(key, dirties[key]);
                    }
                }
                var grid = Ext.getCmp('inventoryPickOutLineGrid');
                var storeRecords = grid.getStore().data.items;
                var win = this.up("window");
                for (var record in storeRecords) {
                    if (storeRecords[record].id == form.getRecord().id) {
                        win.close();
                        return;
                    }
                }
                grid.getStore().add(form.getRecord());
                win.close();
                form.reset();
            }
        }
    }, {
        text: '重置表单',
        iconCls: 'cancel-button',
        handler: function () {
            var form = this.up('form').getForm();
            form.reset();
        }
    }]
});


//InventoryMoveInLineForm  Grid新建弹出窗口
Ext.define("InventoryPickOutLineEditWindow", {
    extend: "Ext.Window",
    alias: ['widget.inventoryPickOutLineEditWindow'],
    title: '添加物品',
    width: 480,
    height: 360,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items: [{
        xtype: 'inventoryPickOutLineForm'
    }],
    listeners: {
        close: function () {
            var form = this.down('form').getForm();
            form.reset();
        }
    }
});

//InventoryMoveInLine Grid表单
Ext.define("InventoryPickOutLineGrid", {
    id: 'inventoryPickOutLineGrid',
    extend: 'Ext.grid.Panel',
    alias: ['widget.inventoryPickOutLineGrid'],
    columnLines: true,
    anchor: '100%',
    viewConfig: {
        border: false,
        stripeRows: true,
        enableTextSelection: false,
        deferEmptyText: false
    },
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'cellediting'
    }],
    selType: 'checkboxmodel',
    multiSelect: true,
    newRecord: Ext.create('Module.pos.inventoryPickOut.model.InventoryPickOutLine', { SKU: '', Name: '', UOM: '', Quantity: 0, RealityQuantity: 0 }),
    editorWindow: Ext.create("InventoryPickOutLineEditWindow", {}),
    bindingField: false,

    tbar: [{
            text: '新建',
            iconCls: 'confirm-button',
            handler: function() {
                var grid = this.up("grid");
                grid.newRecord = Ext.create('Module.pos.inventoryPickOut.model.InventoryPickOutLine', { SKU: '', Name: '', UOM: '', Quantity: 0, RealityQuantity: 0 });
                if (grid.editorWindow) {
                    grid.editorWindow.show(this, function() {
                        this.down("form").getForm().loadRecord(grid.newRecord);
                    }, grid.editorWindow);
                }
            }
        }, '-', {
            text: '删除',
            iconCls: 'cancel-button',
            handler: function() {
                var grid = this.up("grid");
                var selected = grid.getSelectionModel().getSelection();
                var message = "您确定要删除选中的记录吗？";

                Ext.Msg.confirm('Warning', message, function(btn, text) {
                    if (btn == 'ok' || btn == "yes") {
                        grid.getStore().remove(selected);
                    }
                });
            }
        }],

    height: 200,
    columns: [
        Ext.create("Ext.grid.RowNumberer", { width: 50 }),
		{ text: '商品编码', width: 150, dataIndex: 'SKU'},
        { text: '商品名称', width: 180, dataIndex: 'Name' },
        { text: '计量单位', width: 100, dataIndex: 'UOM' },
        { text: '数量', width: 100, dataIndex: 'Quantity' },
        { text: '实收数量', width: 100, dataIndex: 'RealityQuantity' }
    ],
    
    store: Ext.data.StoreManager.lookup('Module.pos.inventoryPickOut.store.InventoryPickOutLines'),
    
    listeners: {
        itemdblclick: function (me, record, item, index, e, eOpts) {
            var grid = me.up("grid");
            if (grid.editorWindow) {
                grid.editorWindow.show(this,
					function () {
					    var form = this.down("form").getForm();
					    form.findField("Product").setRawValue(record.data.Name);
					    this.down("form").getForm().loadRecord(record);
					}, grid.editorWindow);
            }
        },
        afterrender: function (me, eOpts) {
            if (me.bindingField) {
                var field = me.up("form").getForm().findField(me.bindingField);
                field.bindingGrid = me;

                var data = [];
                if (!Ext.isEmpty(field.getValue())) {
                    data = Ext.decode(field.getValue());
                }

                me.getStore().loadData(data);
            }

        }
    },

    getSubmitValue: function () {
        var store = this.getStore();
        var results = [];
        if (store.getCount() > 0) {
            var records = store.getRange(0, store.getCount() - 1);
            var count = records.length;

            for (var i = 0; i < count; i++) {
                var r = records[i];
                results.push(r.getData());
            }
        }
        return Ext.encode(results);
    },

    initComponent: function () {
        this.callParent();
    }
});

////虚拟库的弹出窗口
//Ext.create("Ext.Window", {
//    id: 'com.storeOS.window.VirtualStock',
//    //requires: 'Module.pos.product.view.Main',
//    width: 640,
//    height: 360,
//    modal: true,
//    closable: true,
//    closeAction: 'hide',
//    layout: 'fit',
//    items: Ext.create("Ext.panel.Panel", {
//        layout: 'border',
//        border: false,
//        items: [{
//            region: 'center',
//            frame: false,
//            layout: 'fit',
//            border: false,
//            items: Ext.create("Ext.grid.Panel", {
//                store: Ext.data.StoreManager.lookup('Module.pos.virtualstock.store.VirtualStocks'),
//                columns: [
                    
//                ],
//                dockedItems: [{
//                    xtype: 'pagingtoolbar',
//                    stateful: true,
//                    stateId: 'com.speedwork.ServiceGrid.PagingToolbar-state',
//                    store: Ext.data.StoreManager.lookup('Module.pos.product.store.Products'),   // same store GridPanel is using
//                    dock: 'bottom',
//                    displayInfo: true
//                }],
//                listeners: {
//                    itemdblclick: function (thisGrid, record, item, index, e, eOpts) {
//                        var window = thisGrid.up("window");
//                        if (window) {
//                            var id = record.get("Id");
//                            var name = record.get("Name");
//                            if (window) {
//                                window.setSelectionValue(record);
//                            }
//                            window.close();
//                        }
//                    }
//                }
//            })
//        }]
//    }),
//    setSelectionValue: function (record) {
//        var storeId = record.get("Id");
//        var name = record.get("Name");
//        if (this.bindingField) {
//            this.bindingField.rawRecord = record;
//            this.bindingField.setValue({ Id: storeId, Name: name });
//        }
//    }
//});

//员工staff的弹出窗口
Ext.create("Ext.Window", {
    id: 'com.storeOS.window.Staff',
    width: 640,
    height: 360,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items: Ext.create("Ext.panel.Panel", {
        layout: 'border',
        border: false,
        items: [{
            region: 'center',
            frame: false,
            layout: 'fit',
            border: false,
            items: Ext.create("Ext.grid.Panel", {
                store: Ext.create("Module.pos.staff.store.Staffs", {
                    storeId:'staffStore'
                }),
                columns: [
                    { text: 'ID', dataIndex: 'Id', hidden: true },
                    { text: '姓名', dataIndex: 'Name', width: 100 },
                    { text: '员工号', dataIndex: 'StaffNumber', width: 200 },
                    { text: 'RFID卡号', dataIndex: 'RFCardNumber', width: 200 }
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: Ext.data.StoreManager.lookup('staffStore'),   // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],
                listeners: {
                    itemdblclick: function(thisGrid, record, item, index, e, eOpts) {
                        var window = thisGrid.up("window");
                        if (window) {
                            var id = record.get("Id");
                            var name = record.get("Name");
                            if (window) {
                                window.setSelectionValue(record);
                            }
                            window.close();
                        }
                    }
                }
            })
        }]
    }),
    setSelectionValue: function(record) {
        var storeId = record.get("Id");
        var name = record.get("Name");
        if (this.bindingField) {
            this.bindingField.rawRecord = record;
            this.bindingField.setValue({ Id: storeId, Name: name });
        }
    }
});

//InventoryPickOutForm 创建InventoryPickOut表单
Ext.define('InventoryPickOutForm', {
    extend:'Ext.form.Panel',
    id: 'form',
    alias: 'widget.inventoryPickOutForm',
    buttonAlign: 'left',
    hideLabel: true,
    frame: false,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 140,
        anchor: '95%',
        msgTarget: 'side'
    },
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: 'anchor'
    },

    layout: 'form',
    width: 800,
    height: 400,
    items: [{
            anchor: '100%',
            layout: 'hbox',
            buttonAlign: 'left',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 100,
                anchor: '95%',
                msgTarget: 'side'
            },
            defaults: {
                border: false,
                xtype: 'panel',
                layout: 'anchor'
            },
            items: [{
                flex: 1,
                items: [{
                    xtype: 'textfield',
                        fieldLabel: '虚拟库',
                        name: 'VirtualStock',
                        allowBlank: false
                        
                    }, {
                        xtype: 'lookupfield',
                        fieldLabel: '员工号',
                        name: 'Staff',
                        selectionWindow: 'com.storeOS.window.Staff',
                        submitValue: false,
                        allowBlank: false,
                        listeners: {
                            change: function (me, newValue, oldValue, eOpts) {
                                var form = me.up('form').getForm();
                                var staffFd = form.findField("StaffNumber");
                                if (me.rawRecord) {
                                    staffFd.setValue(me.rawRecord.get('StaffNumber'));
                                } else {
                                    staffFd.setValue("");
                                }
                            }
                        }
                    }, {
                        xtype: 'hidden',
                        name:'StaffNumber'
                    },{
                        xtype: 'combobox',
                        fieldLabel: '类型',
                        name: 'MoveInType',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'Value',
                        valueField: 'Key',
                        value: 'PickOutType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['Key', 'Value'],
                            data: [
                                { Key: "PickOutType", Value: "领料" },
                            ]
                        })
                    },
                    {
                        xtype: 'hidden',
                        name: 'Id'
                    }, {
                        xtype: 'hidden',
                        name: 'Version'
                    },
                    {
                        xtype: 'hidden',
                        name: 'InventoryMoveLineJsonString'
                    }]
            }]
        }, {
            items: [{
                anchor: '100%',
                xtype: 'tabpanel',
                height: 300,
                defaults: {
                    layout: 'fit',
                    border: false
                },
                items: [{
                    title: '物品',
                    items: [{
                        xtype: 'inventoryPickOutLineGrid',
                        bindingField: 'InventoryMoveLineJsonString'
                    }]
                }]
            }]
        }],
    buttons: [{
            text: '提交',
            handler: function() {
                var form = this.up("form").getForm();
                var win = this.up("window");
                form.standardSubmit = false;
                if (form.isValid()) {
                    form.submit({
                        url: Ext.String.format('{0}/InventoryPickOuts', basket.dataSource),
                        method: 'POST',
                        success: function(f, a) {
                            var responseValue = Ext.decode(f.responseText);
                            if (responseValue.success == true) {
                                Ext.Msg.alert('Success', '创建成功');
                                grid.getStore().load();
                            } else {
                                Ext.Msg.alert('Error', responseValue.message);
                            }
                        },
                        failure: function(f, a) {
                            if (a.response.status == 201) {
                                Ext.Msg.alert('Success', '创建成功');
                            } else {
                                Ext.Msg.alert('Error', '创建失败!');
                            }
                        }
                    });
                    win.close();
                }
            }
        }, {
            text: '重置表单',
            iconCls: 'cancel-button',
            handler: function() {
                var form = this.up('form').getForm();
                form.reset();
            }
        }],
    listeners: {
        beforeaction: function(form, action, opts) {
            var stepFd = form.findField("InventoryMoveLineJsonString");
            if (stepFd.bindingGrid) {
                stepFd.setValue(stepFd.bindingGrid.getSubmitValue());
            }
        }
    }
});


//创建InventoryMoveIn弹出窗口
Ext.define('InventoryPickOutWindow', {
    extend: 'Ext.Window',
    title: '创建',
    layout: 'fit',
    height: 400,
    width: 850,
    modal: true,
    closable: true,
    closeAction: 'hide',
    items: [{
        xtype: 'inventoryPickOutForm'
    }]
});



//InventoryMoveIn主显示页面

Ext.define('Module.pos.inventoryPickOut.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.inventoryPickOutMainView',

    createItems: function() {
        var me = this,
            formConfig = me.formConfig || { },
            gridConfig = me.gridConfig || { },
            store = me.store,
            columns = me.columns;

        formConfig = Ext.apply(me.defaultFormConfig, formConfig);
        formConfig.buttons = [
            {
                itemId: 'search-btn',
                text: 'Search',
                handler: function(btn, event, eOpts) {
                    me.onSearchButtonClicked(btn, event, eOpts);
                }
            },
            {
                itemId: 'reset-btn',
                text: 'Reset',
                handler: function() {
                    form.getForm().reset();
                }
            },
            {
                itemId: 'create-btn',
                text: 'Create',
                handler: function() {
                    var win = Ext.create('InventoryPickOutWindow');
                    win.show();
                }
            }
        ];

        gridConfig = Ext.apply(me.defaultGridConfig, gridConfig);
        gridConfig = Ext.apply(gridConfig, {
            store: me.store,
            columns: me.columns,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }]
        });

        //1. Create the Form Panel
        var form = me.form = Ext.create('Ext.form.Panel', formConfig);

        var grid = me.grid = Ext.create('Ext.grid.Panel', gridConfig);

        this.items = [form, grid];
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            formConfig: {
                height: 100,
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
                tbar: {
                    xtype: 'toolbar',
                    border: true,
                    height: 30,
                    items: []
                },
            },
            store: Ext.data.StoreManager.lookup('Module.pos.inventoryPickOut.store.InventoryPickOuts'),
            columns: [
                { text: '领料单号', dataIndex: 'IdNumber', width: 120 },
                {
                    text: '领料类型', dataIndex: 'PickOutType', width: 100,
                    renderer:function(value) {
                        if (value == 'PickOutType') {
                            return '领料';
                        }
                    }
                },
                { text: '虚拟库', dataIndex: 'VirtualStock', width: 60 },
                { text: '员工编号', dataIndex: 'StaffNumber', width: 80 },
                { text: '创建日期', dataIndex: 'CreateDate', width: 80, xtype: 'datecolumn', format: 'Y-m-d' },
                {
                    text: '状态',
                    dataIndex: 'Status',
                    width: 60,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value == 'Pending') {
                            return '草稿';
                        } else if (value == 'Completed') {
                            return '已提交';
                        } else if (value == 'Cancelled') {
                            return '已取消';
                        } else if (value == 'Closed') {
                            return '已确认';
                        }
                        return value;
                    }
                }, {
                    header: '',
                    width: 200,
                    resizable: false,
                    renderer: function (v, m, r, rowIndex, colIndex, store, view) {
                        var grid = view.up("grid");
                        var buttonId = 'Complete-button-' + r.get('Id');
                        var id = Ext.id();

                        if (r.data.Status === 'Pending') {
                            Ext.defer(function () {
                                var button = Ext.get(buttonId);
                                if (!button) {
                                    Ext.widget('button', {
                                        renderTo: id,
                                        id: buttonId,
                                        text: '提交',
                                        width: 75,
                                        handler: function () {
                                            Ext.Ajax.request({
                                                url: Ext.String.format('{0}/InventoryPickOuts({1})/CompleteInventory', basket.dataSource, r.get('Id')),
                                                method: 'POST',
                                                success: function (response, action) {
                                                    grid.getStore().load();
                                                }
                                            });
                                        }
                                    });
                                }
                            }, 50);
                        }

                        var closedButtonId = 'Closed-button-' + r.get('Id');
                        var cancelButtonId = 'Cancel-button-' + r.get('Id');
                        if (r.data.Status === 'Completed') {
                            //return '<a href=ApplicationContext.contextPath + "PurchasePrice/AjaxStart">' + '启用 </a>';
                            Ext.defer(function () {
                                var button = Ext.get(closedButtonId);
                                if (!button) {
                                    Ext.widget('button', {
                                        renderTo: id,
                                        id: closedButtonId,
                                        text: '确认',
                                        width: 75,
                                        handler: function () {
                                            Ext.Ajax.request({
                                                url: Ext.String.format('{0}/InventoryPickOuts({1})/Closed', basket.dataSource, r.get('Id')),
                                                method: 'POST',
                                                success: function (response) {
                                                    grid.getStore().load();
                                                }
                                            });
                                        }
                                    });
                                }
                            }, 50);

                            Ext.defer(function () {
                                var button = Ext.get(cancelButtonId);
                                if (!button) {
                                    Ext.widget('button', {
                                        renderTo: id,
                                        id: cancelButtonId,
                                        text: '取消',
                                        width: 75,
                                        handler: function () {
                                            Ext.Ajax.request({
                                                url: Ext.String.format('{0}/InventoryPickOuts({1})/Cancel', basket.dataSource, r.get('Id')),
                                                method: 'POST',
                                                success: function (response) {
                                                    grid.getStore().load();
                                                }
                                            });
                                        }
                                    });
                                }
                            }, 50);
                        }
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                }
            ]
        });

        me.callParent();
    }
});
