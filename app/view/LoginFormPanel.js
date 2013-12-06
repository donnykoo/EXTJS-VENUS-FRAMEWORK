Ext.define('App.view.LoginFormPanel', {
    extend : 'Ext.Window',
    alias  : 'widget.loginformpanel',
	width: 400,
	bodyPadding: 10,
	bodyBorder: true,
	title: '请登录',
	closable: false,
	constrain: true,
	height: 210,
	resizable: false,
	modal: true,
	layout: 'anchor',
	apiPath: Ext.String.format('{0}/Account', "/" === basket.contextPath ? "" : basket.contextPath),

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
			    name: 'StoreCode',
			    fieldLabel: '门店编码',
			    allowBlank: false
			}, {
				xtype: 'textfield',
				name: 'UserName',
				fieldLabel: '用户名',
				allowBlank: false,
				minLength: 6
			}, {
				xtype: 'textfield',
				name: 'Password',
				fieldLabel: '密码',
				inputType: 'password',
				style: 'margin-top:15px',
				allowBlank: false
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
					text: '登陆',
					width: 140,
					handler: function() {
						var form = this.up('form').getForm();

					    /* Normally we would submit the form to the server here and handle the response...*/
						form.submit({
							clientValidation: true,
							url: Ext.String.format("{0}/AjaxLogOn", me.apiPath),
							success: function () {
							    me.close();
							    Ext.ux.ActivityMonitor.start();
							},
							failure: function () {
							    Ext.Msg.alert('提示', '用户名或密码错误');
							}
						});
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