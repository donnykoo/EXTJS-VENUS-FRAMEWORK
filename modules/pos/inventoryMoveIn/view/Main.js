
Ext.define("Lookup", {
    extend: 'Ext.form.TwinTriggerField',
    alias: 'widget.lookupfield',

    model: 'LookupModel',	//The underlying data model
    record: false,	//the record data
    originRecord: false,
    editable: false,
    selectionWindow: false, //The object selection grid window

    initComponent: function() {
        Lookup.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e) {
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
    onTrigger1Click: function() {
        this.setValue("");
    },

    onTrigger2Click: function() {
        if (this.selectionWindow) {
            var me = this, picker = me.getPicker();

            if (picker) {
                picker.bindingField = this;
                picker.show();                
            }
        }
    },
    getPicker: function () {
        var me = this;
        return me.picker || (me.picker = me.createWindow());
    },
    createWindow: function() {
        var me = this,
            picker,
            opts = Ext.apply({
                pickerField: me,
                store: me.store,
                columns: me.columns,
                dockedItems: me.dockedItems
            }, me.windowConfig);

        // NOTE: we simply use a grid panel
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        picker = me.picker = Ext.create(this.selectionWindow, opts);


        me.mon(picker, {
            //close: me.onPickerClose,
            //itemclick: me.onItemClick,
            //beforeload: me.onBeforeLoad,
            //scope: me
        });

        return picker;
    }
});


Ext.define("com.obizsoft.sotreOS.ProductView", {
    extend: 'Module.pos.product.view.Main',
    alias: 'widget.productView',
    
    createItems: function () {
        var me = this,
            formConfig = me.formConfig || {},
            gridConfig = me.gridConfig || {},
            store = me.store,
            columns = me.columns;

        gridConfig = Ext.apply(me.defaultGridConfig, gridConfig);
        gridConfig = Ext.apply(gridConfig, {
            store: me.store,
            columns: me.columns,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }],
            listeners: {
                itemdblclick: function(me, record, item, index, e, eOpts) {
                    var window = me.up("window");
                    if (window) {
                        if (window) {
                            window.setSelectionValue(record);
                        }   
                        window.close();
                    }
                }
            }
        });

        //1. Create the Form Panel
        var form = me.form = Ext.create('Ext.form.Panel', formConfig);

        var grid = me.grid = Ext.create('Ext.grid.Panel', gridConfig);

        this.items = [form, grid];
    }
});

//商品弹出框口
Ext.define("com.obizsoft.storeOS.ProductSelection", {
    extend: 'Ext.Window',
    id: 'ProductSelection',
    alias: 'widget.productSelection',
    width: 800,
    height: 400,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items:[{
        layout: 'border',
        border: false,
        items:
            [{
                region: 'center',
                frame: false,
                layout: 'fit',
                border: false,
                items:[{
                    xtype: 'productView',
                }]
            }]
    }],
    setSelectionValue: function(record) {
        var name = record.get("Name");
        if (this.bindingField) {
            this.bindingField.rawRecord = record;
            this.bindingField.setValue(name);
        }
    }
}); 


//InventoryMoveInLineForm  Grid新建Form
Ext.define("InventoryMoveInLineForm", {
    extend: "Ext.form.Panel",
    alias: ['widget.inventoryMoveInLineForm'],
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
                name: 'Name',
                selectionWindow: "com.obizsoft.storeOS.ProductSelection",
                submitValue: false,
                allowBlank: false,
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        var form = me.up('form').getForm();
                        var skuFd = form.findField('SKU');
                        var uomFd = form.findField('UOM');
                        if (me.rawRecord) {
                            skuFd.setValue(me.rawRecord.get('SKU'));
                            uomFd.setValue(me.rawRecord.get('UOMName'));
                        } else {
                            skuFd.setValue("");
                            uomFd.setValue("");
                        }
                    }
                }
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
                var nameField = form.findField("Name");
                var uomField = form.findField("UOM");
                var skuField = form.findField("SKU");
                var quantiryField = form.findField("Quantity");
                var realityQuantityFd = form.findField("RealityQuantity");
                var lastRecord = form.getRecord();
                var dirties = form.getValues();
                Ext.apply(dirties, {
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
                var grid = Ext.getCmp('inventoryMoveInLineGrid');
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
Ext.define("InventoryMoveInLineEditWindow", {
    extend: "Ext.Window",
    alias: ['widget.inventoryMoveInLineEditWindow'],
    title: '添加物品',
    width: 480,
    height: 360,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items: [{
        xtype: 'inventoryMoveInLineForm'
    }],
    listeners: {
        close: function () {
            var form = this.down('form').getForm();
            form.reset();
        }
    }
});

//InventoryMoveInLine Grid表单
Ext.define("InventoryMoveInLineGrid", {
    id: 'inventoryMoveInLineGrid',
    extend: 'Ext.grid.Panel',
    alias: ['widget.inventoryMoveInLineGrid'],
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
    newRecord: Ext.create('Module.pos.inventoryMoveIn.model.InventoryMoveInLine', {SKU: '', Name: '', UOM: '', Quantity: 0, RealityQuantity: 0 }),
    editorWindow: Ext.create("InventoryMoveInLineEditWindow",{}),
    bindingField: false,

    tbar: [{
            text: '新建',
            iconCls: 'confirm-button',
            handler: function() {
                var grid = this.up("grid");
                grid.newRecord = Ext.create('Module.pos.inventoryMoveIn.model.InventoryMoveInLine', {SKU: '', Name: '', UOM: '', Quantity: 0, RealityQuantity: 0 });
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
		{ text: '商品编码', width: 150, dataIndex: 'SKU' },
        { text: '商品名称', width: 180, dataIndex: 'Name'},
        { text: '计量单位', width: 100, dataIndex: 'UOM' },
        { text: '数量', width: 100, dataIndex: 'Quantity' },
        { text: '实收数量', width: 100, dataIndex: 'RealityQuantity' }
    ],
    
    store: Ext.data.StoreManager.lookup('Module.pos.inventoryMoveIn.store.InventoryMoveInLines'),
    
    listeners: {
        itemdblclick: function (me, record, item, index, e, eOpts) {
            var grid = me.up("grid");
            if (grid.editorWindow) {
                grid.editorWindow.show(this,
					function () {
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


Ext.define("com.obizsoft.sotreOS.StaffView", {
    extend: 'Module.pos.staff.view.Main',
    alias: 'widget.staffView',
    
    createItems: function () {
        var me = this,
            formConfig = me.formConfig || {},
            gridConfig = me.gridConfig || {},
            store = me.store,
            columns = me.columns;

        gridConfig = Ext.apply(me.defaultGridConfig, gridConfig);
        gridConfig = Ext.apply(gridConfig, {
            store: me.store,
            columns: me.columns,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }],
            listeners: {
                itemdblclick: function (me, record, item, index, e, eOpts) {
                    var window = me.up("window");
                    if (window) {
                        if (window) {
                            window.setSelectionValue(record);
                        }
                        window.close();
                    }
                }
            }
        });

        //1. Create the Form Panel
        var form = me.form = Ext.create('Ext.form.Panel', formConfig);

        var grid = me.grid = Ext.create('Ext.grid.Panel', gridConfig);

        this.items = [form, grid];
    }
});



//员工staff的弹出窗口
Ext.define("com.obizsoft.storeOS.StaffWindow", {
    extend:'Ext.Window',
    id: 'com.storeOS.window.Staff',
    width: 800,
    height: 400,
    modal: true,
    closable: true,
    closeAction: 'hide',
    layout: 'fit',
    items: [{
        layout: 'border',
        border: false,
        items: [{
            region: 'center',
            frame: false,
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'staffView'
            }]
        }]
    }],
    setSelectionValue: function(record) {
        var staffNumber = record.get("StaffNumber");
        if (this.bindingField) {
            this.bindingField.rawRecord = record;
            this.bindingField.setValue(staffNumber);
        }
    }
});

//InventoryMoveInForm 创建InventoryMoveIn表单
Ext.define('InventoryMoveInForm', {
    extend:'Ext.form.Panel',
    id: 'form',
    alias: 'widget.inventoryMoveInForm',
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
                        selectionWindow: 'com.obizsoft.storeOS.StaffWindow',
                        submitValue: false,
                        allowBlank: false,
                        listeners: {
                            change: function (me, newValue, oldValue, eOpts) {
                                var form = me.up('form').getForm();
                                var staffNumberFd = form.findField("StaffNumber");
                                if (me.rawRecord) {
                                    staffNumberFd.setValue(me.rawRecord.get("StaffNumber"));
                                } else {
                                    staffNumberFd.setValue("");
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
                        value: 'Purchase',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['Key', 'Value'],
                            data: [
                                { Key: "Purchase", Value: "采购" },
                                { Key: "Allot", Value: "调拨" },
                                { Key: "Returns", Value: "退货" },
                                { Key: "Adjust", Value: "调整" },
                                { Key: "ReMaterial", Value: "退料" }
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
                        xtype: 'inventoryMoveInLineGrid',
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
                        url: Ext.String.format('{0}/InventoryMoveIns', basket.dataSource),
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




//InventoryMoveInForm 创建InventoryMoveIn表单
Ext.define('InventoryMoveInForm', {
    extend: 'Ext.form.Panel',
    id: 'form',
    alias: 'widget.inventoryMoveInForm',
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
                selectionWindow: 'com.obizsoft.storeOS.StaffWindow',
                submitValue: false,
                allowBlank: false,
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        var form = me.up('form').getForm();
                        var staffNumberFd = form.findField("StaffNumber");
                        if (me.rawRecord) {
                            staffNumberFd.setValue(me.rawRecord.get("StaffNumber"));
                        } else {
                            staffNumberFd.setValue("");
                        }
                    }
                }
            }, {
                xtype: 'hidden',
                name: 'StaffNumber'
            }, {
                xtype: 'combobox',
                fieldLabel: '类型',
                name: 'MoveInType',
                editable: false,
                queryMode: 'local',
                displayField: 'Value',
                valueField: 'Key',
                value: 'Purchase',
                store: Ext.create('Ext.data.Store', {
                    fields: ['Key', 'Value'],
                    data: [
                        { Key: "Purchase", Value: "采购" },
                        { Key: "Allot", Value: "调拨" },
                        { Key: "Returns", Value: "退货" },
                        { Key: "Adjust", Value: "调整" },
                        { Key: "ReMaterial", Value: "退料" }
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
                    xtype: 'inventoryMoveInLineGrid',
                    bindingField: 'InventoryMoveLineJsonString'
                }]
            }]
        }]
    }],
    buttons: [{
        text: '提交',
        handler: function () {
            var form = this.up("form").getForm();
            var win = this.up("window");
            form.standardSubmit = false;
            if (form.isValid()) {
                form.submit({
                    url: Ext.String.format('{0}/InventoryMoveIns', basket.dataSource),
                    method: 'POST',
                    success: function (f, a) {
                        var responseValue = Ext.decode(f.responseText);
                        if (responseValue.success == true) {
                            Ext.Msg.alert('Success', '创建成功');
                            grid.getStore().load();
                        } else {
                            Ext.Msg.alert('Error', responseValue.message);
                        }
                    },
                    failure: function (f, a) {
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
        handler: function () {
            var form = this.up('form').getForm();
            form.reset();
        }
    }],
    listeners: {
        beforeaction: function (form, action, opts) {
            var stepFd = form.findField("InventoryMoveLineJsonString");
            if (stepFd.bindingGrid) {
                stepFd.setValue(stepFd.bindingGrid.getSubmitValue());
            }
        }
    }
});

//InventoryMoveInEditForm 创建InventoryMoveInEditForm表单
Ext.define('InventoryMoveInEditForm', {
    extend: 'Ext.form.Panel',
    id: 'form',
    alias: 'widget.inventoryMoveInEditForm',
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
                selectionWindow: 'com.obizsoft.storeOS.StaffWindow',
                submitValue: false,
                allowBlank: false,
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        var form = me.up('form').getForm();
                        var staffNumberFd = form.findField("StaffNumber");
                        if (me.rawRecord) {
                            staffNumberFd.setValue(me.rawRecord.get("StaffNumber"));
                        } else {
                            staffNumberFd.setValue("");
                        }
                    }
                }
            }, {
                xtype: 'hidden',
                name: 'StaffNumber'
            }, {
                xtype: 'combobox',
                fieldLabel: '类型',
                name: 'MoveInType',
                editable: false,
                queryMode: 'local',
                displayField: 'Value',
                valueField: 'Key',
                value: 'Purchase',
                store: Ext.create('Ext.data.Store', {
                    fields: ['Key', 'Value'],
                    data: [
                        { Key: "Purchase", Value: "采购" },
                        { Key: "Allot", Value: "调拨" },
                        { Key: "Returns", Value: "退货" },
                        { Key: "Adjust", Value: "调整" },
                        { Key: "ReMaterial", Value: "退料" }
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
                    xtype: 'inventoryMoveInLineGrid',
                    bindingField: 'InventoryMoveLineJsonString'
                }]
            }]
        }]
    }],
    buttons: [{
        text: '提交',
        handler: function () {
            var form = this.up("form").getForm();
            var win = this.up("window");
            form.standardSubmit = false;
            if (form.isValid()) {
                form.submit({
                    url: Ext.String.format('{0}/InventoryMoveIns', basket.dataSource),
                    method: 'POST',
                    success: function (f, a) {
                        var responseValue = Ext.decode(f.responseText);
                        if (responseValue.success == true) {
                            Ext.Msg.alert('Success', '创建成功');
                            grid.getStore().load();
                        } else {
                            Ext.Msg.alert('Error', responseValue.message);
                        }
                    },
                    failure: function (f, a) {
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
        handler: function () {
            var form = this.up('form').getForm();
            form.reset();
        }
    }],
    listeners: {
        beforeaction: function (form, action, opts) {
            var stepFd = form.findField("InventoryMoveLineJsonString");
            if (stepFd.bindingGrid) {
                stepFd.setValue(stepFd.bindingGrid.getSubmitValue());
            }
        }
    }
});


//创建InventoryMoveIn弹出窗口
Ext.define('InventoryMoveInWindow', {
    extend: 'Ext.Window',
    title: '创建',
    layout: 'fit',
    height: 400,
    width: 850,
    modal: true,
    closable: true,
    closeAction: 'hide',
    items: [{
        xtype: 'inventoryMoveInForm'
    }]
});

//创建InventoryMoveInEditWindow弹出窗口
Ext.define('InventoryMoveInEditWindow', {
    extend: 'Ext.Window',
    title: '创建',
    layout: 'fit',
    height: 400,
    width: 850,
    modal: true,
    closable: true,
    closeAction: 'hide',
    items: [{
        xtype: 'inventoryMoveInEditForm'
    }]
});


//InventoryMoveIn主显示页面

Ext.define('Module.pos.inventoryMoveIn.view.Main', {
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.inventoryMoveInMainView',

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
                    var win = Ext.create('InventoryMoveInWindow');
                    win.show();
                }
            }
        ];

        gridConfig = Ext.apply(me.defaultGridConfig, gridConfig);
        gridConfig = Ext.apply(gridConfig, {
            store: me.store,
            columns: me.columns,
            editorWindow: Ext.create('InventoryMoveInEditWindow', {}),
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
        
        grid.addListener("itemdblclick", function(me, record, item, index, e, eOpts) {
            var grid = me.up("grid");
            if (grid.editorWindow) {
                grid.editorWindow.show(this,
                    function() {
                        this.down("form").getForm().findField("Staff").setRawValue(record.data.StaffNumber);
                        this.down("form").getForm().loadRecord(record);
                        var line = Ext.encode(record.data.Lines);
                        var jsonField = this.down("form").getForm().findField("InventoryMoveLineJsonString");
                        jsonField.setValue(line);
                        var downGrid = this.down("form").down("grid");
                        downGrid.fireEvent("afterrender", downGrid);
                        downGrid.getStore().loadData(record.data.Lines);
                    });
            }
        });
            

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
                            fieldLabel: '入库单号',
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
            },
            store: Ext.data.StoreManager.lookup('Module.pos.inventoryMoveIn.store.InventoryMoveIns'),
            columns: [
                { text: '入库单号', dataIndex: 'IdNumber', width: 120 },
                {
                    text: '入库类型', dataIndex: 'MoveInType', width: 100,
                    renderer:function(value) {
                        if (value == 'Purchase') {
                            return '采购';
                        } else if (value == 'Allot') {
                            return '调拨';
                        } else if (value == 'Returns') {
                            return '退货';
                        } else if (value == 'Adjust') {
                            return '调整';
                        } else if (value == 'ReMaterial') {
                            return '退料';
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
                                                url: Ext.String.format('{0}/InventoryMoveIns({1})/CompleteInventory', basket.dataSource, r.get('Id')),
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
                                                url: Ext.String.format('{0}/InventoryMoveIns({1})/Closed', basket.dataSource, r.get('Id')),
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
                                                url: Ext.String.format('{0}/InventoryMoveIns({1})/Cancel', basket.dataSource, r.get('Id')),
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
