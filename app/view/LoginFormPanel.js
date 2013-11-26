Ext.define('App.view.LoginFormPanel', {
    extend : 'Ext.Window',
    alias  : 'widget.loginformpanel',
	width: 400,
	bodyPadding: 10,
	bodyBorder: true,
	title: '请登录',
	closable: false,
	constrain: true,
	height: 200,
	resizable: false,
	modal: true,
	layout: 'anchor',
    initComponent: function() {
        var me = this;
		
		var formPanel = Ext.widget('form', {
			frame: false,
			anchor: '100%',
			defaults: {
				anchor: '100%'
			},
			fieldDefaults: {
				labelWidth: 110,
				labelAlign: 'left',
				msgTarget: 'none',
				invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
			},

			items: [{
				xtype: 'textfield',
				name: 'username',
				fieldLabel: 'User Name',
				allowBlank: false,
				minLength: 6
			}, {
				xtype: 'textfield',
				name: 'password',
				fieldLabel: 'Password',
				inputType: 'password',
				style: 'margin-top:15px',
				allowBlank: false,
				minLength: 8
			}],

			dockedItems: [{
				cls: Ext.baseCSSPrefix + 'dd-drop-ok',
				xtype: 'container',
				dock: 'bottom',
				layout: {
					type: 'hbox',
					align: 'middle'
				},
				padding: '10 10 5',

				items: [{
					xtype: 'button',
					formBind: true,
					disabled: true,
					text: 'Submit Registration',
					width: 140,
					handler: function() {
						var form = this.up('form').getForm();

						/* Normally we would submit the form to the server here and handle the response...
						form.submit({
							clientValidation: true,
							url: 'register.php',
							success: function(form, action) {
							   //...
							},
							failure: function(form, action) {
								//...
							}
						});
						*/

						if (form.isValid()) {
							Ext.Msg.alert('Submitted Values', form.getValues(true));
						}
					}
				}]
			}]
		});
		
		this.items = [formPanel];
		
        me.callParent();
    },
	
	bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
		height: 36,
        // defaults to use when the status is cleared:
        defaultText: '',
        defaultIconCls: 'default-icon',

        // values to set initially:
        text: '',
        iconCls: 'ready-icon',

        // any standard Toolbar items:
        items: []
    })
});