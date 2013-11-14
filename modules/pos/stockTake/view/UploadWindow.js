Ext.require([
    'Ext.ux.field.DateTimeField',
    'Ext.ux.field.TextTriggerField',
    'Ext.ux.field.NumericField',
    'Ext.ux.plugins.PanelHeaderExtraIcons'
]);


Ext.define('Module.pos.stockTake.view.UploadWindow', {
    extend: 'Ext.Window',
    alias: 'widget.stockTakeUploadWindow',
    height: 150,
    width: 300,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '上传',
    layout: 'border',
    closable: false,
    closeAction: 'hide',
    store: false,
    grid: false,
    form: false,
    create: true,
    objectId: 0,
    objectVersion: 0,
    objectData: {},

    scanBuffer: [],

    apiPath: Ext.String.format('{0}/api/StockTakesApi', "/" === basket.contextPath ? "" : basket.contextPath),

    initComponent: function () {
        var me = this;
        me.plugins = [{
            ptype: 'headericons',
            pluginId: 'headerbuttons',
            headerButtons: [{
                xtype: 'button',
                text: '上传',
                itemId: 'upload-btn',
                height: 30,
                width: 60,
                scope: this,
                handler: this.onUploadClicked
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
                            xtype: 'fileuploadfield',
                            fieldLabel: '上传文件',
                            tabIndex: 4,
                            anchor: '100%',
                            name: 'Upload',
                            allowBlank:false
                        }]
                }
            ]
        });
        this.items = [form];

        me.callParent();
    },
    
    onUploadClicked: function (button, event) {
        var me = this;

        var form = me.down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: Ext.String.format("{0}/{1}/Upload", me.apiPath, me.getObjectId()),
                method: 'POST',
                params: {
                    Id: me.getObjectId()
                },
                waitMsg: 'Uploading your csv...',
                success: function (response, o) {
                    Ext.Msg.alert('Status', 'upload success.');
                    var obj = Ext.decode(o.response.responseText);
                    var window = Ext.getCmp('StockTakeStartWindow');
                    window.setObjectId(obj.Id);
                    window.load();
                    me.close();
                },
                failure: function (response, o) {
                    Ext.Msg.alert('Status', 'upload failure.');
                }
            });
        }
    },
    
    onCloseClicked:function (button,event) {
        var me = this;
        me.close();
    },
    

    getForm: function () {
        return this.form;
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
    }
});