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
    			Ext.Ajax.request({
				      url: '/ShiftTable/Ajax',
				      success: function(response){
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
					                    var me = this;
					                    var date = me.up().up().down('datefield').value;
					                    document.location = '/ShiftTable/Export?date=' + Ext.Date.format(new Date(date), 'Y-m-d');
					                    me.up().up().hide();
					                    //alert(Ext.Date.format(new Date(date), 'Y-m-d'))
					                }
					            }]
        						}).show();
				     	},
				     	failure:function(response){
				     		Ext.Msg.alert('Status','No Authrization');
				     	},
				      scope: this
				    });
    },

    onImportButtonClicked: function (btn, event, eOpts) {
				 Ext.Ajax.request({
				      url: '/ShiftTable/Ajax',
				      success: function(response){
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
					                      
					                        var date = me.up().up().down('datefield').value;
					
					                        var form = this.up('form').getForm();
					                        if (form.isValid()) {
					                            form.submit({
					                                url: '/ShiftTable/Import?date=' + Ext.Date.format(new Date(date), 'Y-m-d') ,
					                                waitMsg: 'Uploading your excel...',
					                                success: function (fp, o) {
					                                    Ext.Msg.alert('Status', 'Upload Success.');
					                                },
					                                failure: function (fp, o) {
					                                	Ext.Msg.alert('Status','Upload Failure');                                   
					                                }
					                            });
					                            this.up('form').up().hide();
					                        }
					                    }
					                }]
					            }]
					        }).show();
    					},
    					failure: function(response){
    						Ext.Msg.alert('Status','No Authrization');	
    					},
				      scope: this
				    });
    },

    onModifyButtonClicked: function (btn, event, eOpts) {
    			Ext.Ajax.request({
				      url: '/ShiftTable/Ajax',
				      success: function(response){
    	 						document.location = '/ShiftTable/Modify' ;
    					},
    					failure: function(response){
    						Ext.Msg.alert('Status','No Authrization');	
    					},
				      scope: this
				  });
    },

    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
