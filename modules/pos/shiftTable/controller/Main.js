Ext.define('Module.pos.shiftTable.controller.Main', {
    extend: 'Ext.app.Controller',


    stores: ['Module.pos.shiftTable.store.ShiftTables'],
    models: ['Module.pos.shiftTable.model.ShiftTable'],

    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'shiftTableMainView',
        selector: 'shiftTableMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'shiftTableMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },

            'shiftTableMainView form #search-btn': {
                click: me.onSearchButtonClicked
            },

            'shiftTableMainView gridpanel #export-btn': {
                click: me.onExportButtonClicked
            },

            'shiftTableMainView gridpanel #import-btn': {
                click: me.onImportButtonClicked
            },

            'shiftTableMainView gridpanel #modify-btn': {
                click: me.onModifyButtonClicked
            }
        });

    },

    onExportButtonClicked: function (btn, event, eOpts) {
        Ext.create("Ext.window.Window", {
            items: [{
                xtype: 'datefield',
                name: 'date',
                fieldLabel: 'Date',
                format: 'Y-m-d',
                value: Ext.Date.format(new Date(), 'Y-m-d'),
                //maxValue: new Date(),
            }],
            buttons: [{
                text: 'Submit',
                handler: function () {

                    var params = Ext.urlDecode(location.search.substring(1));
                    //alert(params.store);

                    var me = this;
                    var date = me.up().up().down('datefield').value;
                    document.location = '/ShiftTable/Export?date=' + Ext.Date.format(new Date(date), 'Y-m-d') + "&store=" + params.store
                    me.up().up().hide();
                    //alert(Ext.Date.format(new Date(date), 'Y-m-d'))
                }
            }]
        }).show();
    },

    onImportButtonClicked: function (btn, event, eOpts) {
        Ext.create("Ext.window.Window", {
            items: [{
                xtype: 'form',
                width: 400,
                bodyPadding: 10,
                frame: true,
                items: [{
                    xtype: 'filefield',
                    name: 'shift',
                    fieldLabel: 'File',
                    labelWidth: 50,
                    msgTarget: 'side',
                    allowBlank: false,
                    anchor: '100%',
                    buttonText: 'Select'
                }, {
                    xtype: 'datefield',
                    name: 'date',
                    fieldLabel: 'Date',
                    format: 'Y-m-d',
                    value: Ext.Date.format(new Date(), 'Y-m-d'),
                    //maxValue: new Date(),
                }],
                buttons: [{
                    text: 'Upload',
                    handler: function () {
                        var me = this;
                        var params = Ext.urlDecode(location.search.substring(1));
                        var date = me.up().up().down('datefield').value;

                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: '/ShiftTable/Import?date=' + Ext.Date.format(new Date(date), 'Y-m-d') + "&store=" + params.store,
                                waitMsg: 'Uploading your excel...',
                                success: function (fp, o) {
                                    Ext.Msg.alert('Status', 'upload success.');
                                },
                                failure: function (fp, o) {
                                    Ext.Msg.alert('Status', 'upload failure.');
                                }
                            });
                            this.up('form').up().hide();
                        }
                    }
                }]
            }]
        }).show();
    },

    onModifyButtonClicked: function (btn, event, eOpts) {
        document.location = '/ShiftTable/Modify?store=' + Ext.urlDecode(location.search.substring(1)).store;
        //Ext.Ajax.request({
        //    url: '/ShiftTables/Modify?store=' + Ext.urlDecode(location.search.substring(1)).store,
        //    success: function (response) {
        //        var resText = response.responseText;
        //        alert(resText);
        //    }
        //});
    },

    onSearchButtonClicked: function (btn, event, eOpts) {
        var me = this;
        var store = me.getStore('Module.pos.shiftTable.store.ShiftTables');
        store.load({
            remoteFilter: true,
            params: {
                start: 0,
                limit: 5
            },
            filters: [
                new Ext.util.Filter({
                    property: 'sku',
                    operator: '*>',
                    value: '2'
                })
            ]
        });
    },

    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
