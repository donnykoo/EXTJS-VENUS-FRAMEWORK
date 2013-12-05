Ext.require([
	'Module.pos.transferOrderOut.store.TransferOrderOutLines',
	'Ext.ux.field.TextTriggerField',
	'Ext.ux.field.NumericField',
	'Module.pos.product.view.Main',
	'Ext.ux.plugins.PanelHeaderExtraIcons',
	'Module.pos.virtualStock.view.Main',
	'Module.pos.staff.store.Staffs',
	'Module.pos.staff.view.Main'
]);

Ext.define('Module.pos.transferOrderOut.view.CreateWindow', {
	extend: 'Ext.Window',
	alias: 'widget.transferOrderOutCreateWindow',
	height: 540,
	width: 800,
	constrain: true,
	modal: true,
	header: {
		height: 36
	},
	border: false,
	title: '调拨出库单',
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
	
	//Should have one record field
	
	apiPath: Ext.String.format('{0}/api/TransferOrderOutsApi', "/" === basket.contextPath ? "" : basket.contextPath),
	
	initComponent: function() {
        var me = this;
		me.plugins = [{
			ptype: 'headericons',
			pluginId: 'headerbuttons',
			headerButtons: [{
				xtype: 'button',
				itemId: 'saveButton',
				disabled: true,
				text: '保存',
				height: 30,
				width: 60,
				scope: this,
				handler: this.onSaveClicked
			}, {
				xtype: 'button',
				itemId: 'confirmButton',
				text: '确认',
				disabled: true,
				height: 30,
				width: 60,
				scope: this,
				handler: this.onConfirmClicked
			}, {
			    xtype: 'button',
			    itemId: 'closeOrderButton',
			    text: '关闭',
			    disabled: true,
			    height: 30,
			    width: 60,
			    scope: this,
			    hidden: true,
			    handler: this.onCloseOrderClicked
			}, {
			    xtype: 'button',
			    itemId: 'shipButton',
			    text: '发货',
			    disabled: true,
			    height: 30,
			    width: 60,
			    scope: this,
			    handler: this.onShipClicked
			}, {
				xtype: 'button',
				itemId: 'cancelButton',
				text: '作废',
				disabled: true,
				height: 30,
				width: 60,
				scope: this,
				hidden: true,
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
			
			items:[
				{
				    items: [{
				        xtype: 'textfield',
				        fieldLabel: '单号',
				        anchor: '-5',
				        name: 'IdNumber',
				        submitValue: false,
				        readOnly: true,
				        tabIndex: 1,
				        emptyText: '系统自动生成'
				    }, {
				        xtype: 'ux.field.TextTriggerField',
				        fieldLabel: '操作人',
				        tabIndex: 3,
				        anchor: '-5',
				        name: 'Operator',
				        filterName: 'StaffNumber',
				        allowBlank: false,
				        displayProps: ['Name'],
				        store: Ext.create('Module.pos.staff.store.Staffs', {}),
				        windowConfig: {
				            height: 420,
				            width: 680,
				            searchPanelType: 'staffMainView'
				        },
				        itemSelected: function (window, innerGrid, record, item, index, e, eOpts) {
				            var me = this,
								code = record.get("StaffNumber");

				            me.setBackRecord(record);
				            me.setValue(code);
				        }
				    },{
				        xtype: 'textfield',
				        fieldLabel: '收货门店',
				        anchor: '-5',
				        name: 'TransferToStore',
				        tabIndex: 5
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '国家',
				        anchor: '-5',
				        name: 'Country',
				        tabIndex: 7
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '城市',
				        anchor: '-5',
				        name: 'City',
				        tabIndex: 9
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '地址',
				        anchor: '-5',
				        name: 'Address',
				        tabIndex: 11
				    }, {
				        xtype: 'ux.field.NumericField',
				        fieldLabel: '预计金额',
				        anchor: '-5',
				        name: 'DemandAmount',
				        tabIndex: 13
				    }, {
				        xtype: 'hidden',
				        fieldLabel: 'ID',
				        anchor: '-5',
				        name: 'Id',
				        readOnly: true,
				        tabIndex: 0,
				        value: 0
				    },{
				        xtype: 'datefield',
				        fieldLabel: '预计到达时间',
				        name: 'ExpectedArrivalDate',
				        tabIndex: 15,
				        anchor: '100%',
				        submitFormat: "Y-m-d\\TH:i:sO",
				        editable: false,
				        allowBlank: false,
				        timePicker: true,
				        format: "Y-m-d"
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
				        fieldLabel: '确认人',
				        anchor: '-5',
				        name: 'ConfirmPerson',
				        tabIndex: 2
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '关闭人',
				        anchor: '-5',
				        name: 'ClosePerson',
				        tabIndex: 4
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '出货门店',
				        anchor: '-5',
				        name: 'TransferToStore',
				        tabIndex: 6
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '省份',
				        anchor: '-5',
				        name: 'Province',
				        tabIndex: 8
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '区域',
				        anchor: '-5',
				        name: 'District',
				        tabIndex: 10
				    }, {
				        xtype: 'textfield',
				        fieldLabel: '邮编',
				        anchor: '-5',
				        name: 'Zipcode',
				        tabIndex: 12
				    }, {
				        xtype: 'ux.field.NumericField',
				        fieldLabel: '实际金额',
				        anchor: '-5',
				        name: 'ActualAmount',
				        tabIndex: 14
				    }, {
				        xtype: 'combobox',
				        name: 'Approved',
				        editable: false,
				        fieldLabel: '是否批准',
				        queryMode: 'local',
				        displayField: 'Value',
				        valueField: 'Key',
				        allowBlank: false,
				        anchor: '-5',
				        tabIndex: 16,
				        store: Ext.create('Ext.data.Store', {
				            fields: ['Key', 'Value'],
				            data: [{ Key: "True", Value: "是" },
							    { Key: "False", Value: "否" }]
				        })
				    }]
				}
			]
		});
		
		var store = me.store = Ext.create('Module.pos.transferOrderOut.store.TransferOrderOutLines', { 
			listeners: {
				add: { fn: me.onRowAdded, scope: this }
			}
		});
		
		var rowEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToMoveEditor: 1,
			errorSummary : true,
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
				items: [{
					text: '新增',
					scope : this,
					handler: me.onAddLineClick
				},'-',{
					text: '删除',
					scope : this,
					handler: me.onDeleteLineClick
				}]
			}],
			columns: [
				{ text: 'SKU',  dataIndex: 'SKU', width: 160, 
					editor: {
						xtype:'ux.field.TextTriggerField',
						store: Ext.create('Module.pos.product.store.Products', { 
							listeners: {
								beforeload: function(store, operation, eOpts){
									var filter = " ProductType eq 'Material' ";
									
									if(operation && operation.params && operation.params['$filter']){
										filter = Ext.String.format("{0} and {1}", filter, operation.params['$filter']);
									}
									
									operation.params = Ext.apply(operation.params ? operation.params : {}, {
										'$filter': filter
									});
								}
							}
						}),
						windowConfig: {
							height: 420,
							width: 680,
							searchPanelType: 'productMainView'
						},
						columns: [
							{ text: 'SKU', dataIndex: 'SKU', width: 100 },
							{ text: '商品全名', dataIndex: 'Name', width: 300 },
							{ text: 'UPC', dataIndex: 'UPC', width: 120 },
							{ text: '商品类别', dataIndex: 'ProductType', width: 100 },
							{ text: 'UOM', dataIndex: 'UOMName', width: 100 },
							{ text: '商品分类', dataIndex: 'ProductCategory', width: 100 }
						],
						
						itemSelected: function(window, innerGrid, record, item, index, e, eOpts){
							var me = this, 
								sku = record.get("SKU");
							
							me.setValue(sku);
							
							var selections = grid.getSelectionModel().getSelection();
							var rec = selections[0];
							rec.set('SKU', record.get("SKU"))
							rec.set('Name', record.get("Name"));
							rec.set('UOM', record.get('UOMName'));
							rec.set('Quantity', 1.0);
						},
						listeners: {
							close: function(window, panel, eOpts){
								
							}
						},
						allowBlank: false
					} 
				},
				{ text: '商品名', dataIndex: 'Name', width: 300 },
				{ text: 'UOM', dataIndex: 'UOM', width: 50 },
				{ 
				    text: '应发数量', dataIndex: 'DemandQuantity', width: 100,
					xtype: 'numbercolumn', format:'0,000.00',
					align: 'right',
					editor: {
						xtype: 'ux.field.NumericField',
						decimalPrecision: 2,
						minValue: 0,
						hideTrigger: true,
						allowBlank: false
					}
				},
			    { text: '待发数量', dataIndex: 'LaveQuantity', width: 100 }
			],
			listeners: {
				edit: function(editor, context){
					
				}
			}
		});
		
		this.items = [form, grid];
		
		me.callParent();
	},
	
	getStore: function(){
		return this.store;
	},
	
	getGrid: function(){
		return this.grid;
	},
	
	getForm: function(){
		return this.form;
	},
	
	onAddLineClick: function(btn, event, eOpts){
		var me = this,
			store = this.getStore();
		if(store){
			var model = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOutLine', {
				SKU: '',
				Name: '',
				UOM: '',
				Quantity: 0.0
			});
			store.add(model);
		}
	},
	
	onDeleteLineClick : function(btn, event, eOpts){
		var me = this,
			grid = this.getGrid(),
			store = this.getStore()
			selModel = grid.getSelectionModel();
		
		var selections = selModel.getSelection();
		
		if(selections && selections.length > 0){
			Ext.Msg.confirm('Alert', 
				Ext.String.format('您确认要删除选定的{0}条记录？', selections.length), 
				function(buttonId, text, opts){
					
					if(buttonId === 'yes' || buttonId === 'YES' ){
						store.remove(selections);
					}
				}, 
			this);
		}
	},
	
	onRowAdded: function(store, records, index, eOpts){
		var me = this,
			grid = this.getGrid();
		
		if(grid){
			
			// var view = grid.getView();
			// var rowEl = Ext.get(view.getNode(records[index], true));
			// rowEl.scrollIntoView(view.scroller); 
			
			
			//grid.startEditing(newRowIndex, 1);
		}
	},
	
	getObjectId: function(){
		return this.objectId;
	},
	setObjectId: function(id){
		this.objectId = id;
	},
	getObjectVersion: function(){
		return this.objectVersion;
	},
	setObjectVersion: function(version){
		this.objectVersion = version;
	},
	getObjectData: function(){
		return this.objectData;
	},
	setObjectData: function(data){
		this.objectData = data;
	},

	
	getSubmitValues: function(){
		var me = this,
			form = me.getForm(),
			grid = me.getGrid(),
			store = grid.getStore();
		if(!form.isValid()){
			return false;
		}
		
		var submitValues = form.getValues(false);
		
		var modified = store.getRange(); //seems, only return valid record
		
		var isValid = true;
		var invalidIndex = 0;
		var records = [];
		Ext.each(modified, function(record, index, thisCollection){
			
			if(record.isValid() === true){
				records.push(record.getData());
			}else{
				isValid = false;
				invalidIndex = index;
				return false;
			}
		});
		
		if(!isValid){
			grid.getView().focusRow(invalidIndex); 
			return false;
		}
		
		
		var submitObj = Ext.apply(me.objectData, submitValues);
		submitObj = Ext.apply(submitObj, {
			Lines: records
		});
		
		
		return submitObj;
	},
	
	onSaveClicked: function(button, evet){
		var me = this;
		var submitValues = me.getSubmitValues();
		
		if(!submitValues){
			return;
		}
		
		var onBeforeRequest = function(conn, options, eOpts){
			Ext.getBody().mask('请求提交中......');
			Ext.Ajax.un('beforerequest', onBeforeRequest, this);
		};
		
		Ext.Ajax.on({
			beforerequest: onBeforeRequest,
			scope: this
		});
		
		Ext.Ajax.request({
			url: me.apiPath,
			method: me.getObjectId() > 0 ? 'PUT' : 'POST',
			jsonData: submitValues,
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				var location = response.getResponseHeader('Location');
				Ext.Logger.debug("Resource Location : " + location);
				Ext.Logger.dir(obj);
				
				this.refresh(obj);
			},
			failure: function(response, opts) {
				Ext.Logger.warn('server-side failure with status code ' + response.status);
			},
			scope: this
		});
	},
	
	onCloseClicked: function(button, event){
		var me = this;
		me.close();
	},
	
	onCloseOrderClicked: function (button, event) {
	
		var me = this;
		
		Ext.Msg.confirm('确认', '您是否确认关闭调拨出库单?', 
			function(btn, text){
				if (btn == 'ok' || btn == 'yes' || btn == '确定'){
					Ext.Ajax.request({
						url: Ext.String.format("{0}/{1}/Close", me.apiPath, me.objectId),
						method: 'POST',
						params: {
							Id: me.getObjectId()
						},
						success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
							var location = response.getResponseHeader('Location');
							Ext.Logger.debug("Resource Location : " + location);
							Ext.Logger.dir(obj);
							
							this.refresh(obj);
						},
						failure: function(response, opts) {
							Ext.Logger.warn('server-side failure with status code ' + response.status);
						},
						scope: this
					});
				}
			}, this);
	},
	
	onConfirmClicked: function(button, event){
		var me = this;
		
		Ext.Msg.confirm('确认', '您是否确认调拨出库单正确?', 
			function(btn, text){
				if (btn == 'ok' || btn == 'yes' || btn == '确定'){
					Ext.Ajax.request({
						url: Ext.String.format("{0}/{1}/Confirm", me.apiPath, me.objectId),
						method: 'POST',
						params: {
							Id: me.getObjectId()
						},
						success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
							var location = response.getResponseHeader('Location');
							Ext.Logger.debug("Resource Location : " + location);
							Ext.Logger.dir(obj);
							
							this.refresh(obj);
						},
						failure: function(response, opts) {
							Ext.Logger.warn('server-side failure with status code ' + response.status);
						},
						scope: this
					});
				}
			}, this);
	},
	
	onCancelClicked: function(button, event){
		var me = this;
		
		Ext.Msg.confirm('确认', '您是否确定作废调拨出库单?', 
			function(btn, text){
				if (btn == 'ok' || btn == 'yes' || btn == '确定'){
					Ext.Ajax.request({
						url: Ext.String.format("{0}/{1}/Cancel", me.apiPath, me.objectId),
						method: 'POST',
						params: {
							Id: me.getObjectId()
						},
						success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
							var location = response.getResponseHeader('Location');
							Ext.Logger.debug("Resource Location : " + location);
							Ext.Logger.dir(obj);
							
							this.refresh(obj);
						},
						failure: function(response, opts) {
							Ext.Logger.warn('server-side failure with status code ' + response.status);
						},
						scope: this
					});
				}
			}, this);
	},
	
	onShipClicked: function (button, event) {
	    var me = this;
	    if (!me.createShipWindow) {
	        me.createShipWindow = Ext.widget('transferOrderOutShipWindow');
	    }
	    me.createShipWindow.setObjectId(me.getObjectId());
	    me.createShipWindow.show();
	},
	
	refresh: function(data){
		var me = this,
			topWin = Ext.WindowMgr.getActive();
		try{
			this.setObjectId(data.Id);
			this.setObjectVersion(data.Version);
			this.setObjectData(data);
			var record = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOut', data);
			this.getForm().getForm().loadRecord(record);
			this.getStore().loadData(data.Lines);
			
			
			//Set status bar
			var status = '';
			if(record.get('Status') === 0){
				status = '草稿';
			}else if(record.get('Status') === 1){
				status = '已确认';
			}else if(record.get('Status') === 2){
				status = '已关闭';
			}else if(record.get('Status') === 3){
				status = '已作废';
			}
			
			me.setStatus({
				text: status
			});
			
			//re-config buttons
			me.configHeader(record);
		}finally{
			topWin.setDisabled(false);
		}
	},
	
	configHeader: function(record){
		var me = this;
		
		if(record){
			var plugin = me.getPlugin('headerbuttons'),
				header = plugin.getHeader(),
				saveBtn = header.getComponent('saveButton'),
				closeOrderBtn = header.getComponent('closeOrderButton'),
				confirmBtn = header.getComponent('confirmButton'),
				cancelBtn = header.getComponent('cancelButton'),
			    shipBtn = header.getComponent("shipButton");
			
			if (record.get('Status') == 1 && record.get('Id') > 0) {
			    //草稿
			    saveBtn.setDisabled(false);
			    closeOrderBtn.setDisabled(true);
			    confirmBtn.setDisabled(false);
			    cancelBtn.setDisabled(false);
			    shipBtn.setDisabled(false);
			} else if (record.get('Status') == 10) {
			    //确认
			    saveBtn.setDisabled(true);
			    closeOrderBtn.setDisabled(false);
			    confirmBtn.setDisabled(true);
			    cancelBtn.setDisabled(false);
			    shipBtn.setDisabled(false);
			} else if (record.get('Status') == 20) {
			    //已关闭
			    saveBtn.setDisabled(true);
			    closeOrderBtn.setDisabled(true);
			    confirmBtn.setDisabled(true);
			    cancelBtn.setDisabled(true);
			    shipBtn.setDisabled(true);
			} else if (record.get('Status') == 25) {
			    //已取消
			    saveBtn.setDisabled(true);
			    closeOrderBtn.setDisabled(true);
			    confirmBtn.setDisabled(true);
			    cancelBtn.setDisabled(true);
			    shipBtn.setDisabled(true);
			} else {
			    saveBtn.setDisabled(false);
			    closeOrderBtn.setDisabled(true);
			    confirmBtn.setDisabled(true);
			    cancelBtn.setDisabled(true);
			    shipBtn.setDisabled(true);
			}
		}
	},
	
	load: function(){
		var me = this,
			winEl = me.getEl(),
			topWin = Ext.WindowMgr.getActive(),
			objectId = this.getObjectId();
		
		topWin.setDisabled(true);

		try{
			if(objectId > 0){
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
			}else{
				//this is the new record.
				this.refresh({
					Id: 0,
					Version: 0,
					Lines: []
				});
			}
		}catch(err){
			Ext.Logger.error(err.message);
		}finally{
			topWin.setDisabled(false);
		}
	},
	
	listeners: {
		show: function(window, eOpts){
			window.load();
		},
		afterrender: function(window, eOpts){
			var element = window.getEl();
			element.on({
				keyup: function(e, t, eOpts){
					e.preventDefault();
					if(e.getCharCode() == 13){
						var sku = Ext.String.trim(window.scanBuffer.join('')); //Could be UPC or SKU
						window.scanBuffer = [];
						if(sku && sku.length > 0){
							//try to retrieve the product from server side
							Ext.Ajax.request({
								url: Ext.String.format("{0}/Products?$filter=SKU eq '{1}' or UPC eq '{1}'", basket.dataSource, sku),
								method: 'GET',
								success: function(response, opts) {
									var me = window,
										store = window.getStore(),
										obj = Ext.decode(response.responseText);
									Ext.Logger.dir(obj);
									if(obj && obj.value && obj.value.length > 0){
										var data = obj.value[0];
										if(store){
											var model = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOutLine', {
												SKU: data.SKU,
												Name: data.Name,
												UOM: data.UOMName,
												Quantity: 1.0
											});
											store.add(model);
										};
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
					}else{
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
	
	getStatusBar: function(){
		var me = this,
			statusBar = me.getDockedItems('statusbar[dock="bottom"]');
		
		return statusBar[0];
	},
	
	setStatus: function(o){
		var me = this,
			statusBar = me.getStatusBar();
		statusBar.setStatus(o);
	},
	
	getCreateShipWindow: function () {
	    var me = this;
	    if (!me.createShipWindow) {
	        me.createShipWindow = Ext.widget('transferOrderOutShipWindow');
	    }
	    me.createShipWindow.setObjectId(0);
	    return me.createShipWindow;
	}
	
});

Ext.define('Module.pos.transferOrderOut.view.shipWindow', {
    extend: 'Ext.Window',
    alias: 'widget.transferOrderOutShipWindow',
    height: 540,
    width: 800,
    constrain: true,
    modal: true,
    header: {
        height: 36
    },
    border: false,
    title: '调拨出库单',
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

    //Should have one record field

    apiPath: Ext.String.format('{0}/api/TransferOrderOutsApi', "/" === basket.contextPath ? "" : basket.contextPath),

    initComponent: function () {
        var me = this;
        me.plugins = [{
            ptype: 'headericons',
            pluginId: 'headerbuttons',
            headerButtons: [{
                xtype: 'button',
                itemId: 'confirmShipButton',
                disabled: true,
                text: '确认发货',
                height: 30,
                width: 60,
                scope: this,
                handler: this.onConfirmShipClicked
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
				        xtype: 'textfield',
				        fieldLabel: '商品SKU',
				        anchor: '-5',
				        name: 'SKU',
				        submitValue: false,
				        tabIndex: 1
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
				}
            ],
            buttons: [{
                text: '输入',
                handler: function () {
                    var formPanel = this.up('form');
                    var form = formPanel.getForm();

                }
            }]
        });

        var store = me.store = Ext.create('Module.pos.transferOrderOut.store.TransferOrderOutLines', {
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
                items: [{
                    text: '新增',
                    scope: this,
                    handler: me.onAddLineClick
                }, '-', {
                    text: '删除',
                    scope: this,
                    handler: me.onDeleteLineClick
                }]
            }],
            columns: [
				{
				    text: 'SKU', dataIndex: 'SKU', width: 160,
				    editor: {
				        xtype: 'ux.field.TextTriggerField',
				        store: Ext.create('Module.pos.product.store.Products', {
				            listeners: {
				                beforeload: function (store, operation, eOpts) {
				                    var filter = " ProductType eq 'Material' ";

				                    if (operation && operation.params && operation.params['$filter']) {
				                        filter = Ext.String.format("{0} and {1}", filter, operation.params['$filter']);
				                    }

				                    operation.params = Ext.apply(operation.params ? operation.params : {}, {
				                        '$filter': filter
				                    });
				                }
				            }
				        }),
				        windowConfig: {
				            height: 420,
				            width: 680,
				            searchPanelType: 'productMainView'
				        },
				        columns: [
							{ text: 'SKU', dataIndex: 'SKU', width: 100 },
							{ text: '商品全名', dataIndex: 'Name', width: 300 },
							{ text: 'UPC', dataIndex: 'UPC', width: 120 },
							{ text: '商品类别', dataIndex: 'ProductType', width: 100 },
							{ text: 'UOM', dataIndex: 'UOMName', width: 100 },
							{ text: '商品分类', dataIndex: 'ProductCategory', width: 100 }
				        ],

				        itemSelected: function (window, innerGrid, record, item, index, e, eOpts) {
				            var me = this,
								sku = record.get("SKU");

				            me.setValue(sku);

				            var selections = grid.getSelectionModel().getSelection();
				            var rec = selections[0];
				            rec.set('SKU', record.get("SKU"));
				            rec.set('Name', record.get("Name"));
				            rec.set('UOM', record.get('UOMName'));
				            rec.set('Quantity', 1.0);
				        },
				        listeners: {
				            close: function (window, panel, eOpts) {

				            }
				        },
				        allowBlank: false
				    }
				},
				{ text: '商品名', dataIndex: 'Name', width: 300 },
				{ text: 'UOM', dataIndex: 'UOM', width: 50 },
				{
				    text: '应发数量', dataIndex: 'DemandQuantity', width: 100,
				    xtype: 'numbercolumn', format: '0,000.00',
				    align: 'right',
				    editor: {
				        xtype: 'ux.field.NumericField',
				        decimalPrecision: 2,
				        minValue: 0,
				        hideTrigger: true,
				        allowBlank: false
				    }
				},
                { text: '待发数量', dataIndex: 'LaveQuantity', width: 100 },
                {
                    text: '本次发货数量', dataIndex: 'ShipQuantity', width: 100,
                    xtype: 'numbercolumn', format: '0,000.00',
                    align: 'right',
                    editor: {
                        xtype: 'ux.field.NumericField',
                        decimalPrecision: 2,
                        minValue: 0,
                        hideTrigger: true,
                        allowBlank: false,
                        validator: function (value) {
                            var pos = grid.getSelectionModel().getCurrentPosition();
                            var record = grid.store.getAt(pos.row);
                            var laveQuantity = record.data['LaveQuantity'];
                            if (value > laveQuantity) {;
                                return "本次发货数量不能大于待发";
                            }
                            return true;
                        }
                    }
                }
            ],
            listeners: {
                edit: function (editor, context) {

                }
            }
        });

        this.items = [form, grid];

        me.callParent();
    },

    getStore: function () {
        return this.store;
    },

    getGrid: function () {
        return this.grid;
    },

    getForm: function () {
        return this.form;
    },

    onAddLineClick: function (btn, event, eOpts) {
        var me = this,
			store = this.getStore();
        if (store) {
            var model = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOutLine', {
                SKU: '',
                Name: '',
                UOM: '',
                Quantity: 0.0
            });
            store.add(model);
        }
    },

    onDeleteLineClick: function (btn, event, eOpts) {
        var me = this,
			grid = this.getGrid(),
			store = this.getStore(),
        selModel = grid.getSelectionModel();

        var selections = selModel.getSelection();

        if (selections && selections.length > 0) {
            Ext.Msg.confirm('Alert',
				Ext.String.format('您确认要删除选定的{0}条记录？', selections.length),
				function (buttonId, text, opts) {

				    if (buttonId === 'yes' || buttonId === 'YES') {
				        store.remove(selections);
				    }
				},
			this);
        }
    },

    onRowAdded: function (store, records, index, eOpts) {
        var me = this,
			grid = this.getGrid();

        if (grid) {

            // var view = grid.getView();
            // var rowEl = Ext.get(view.getNode(records[index], true));
            // rowEl.scrollIntoView(view.scroller); 


            //grid.startEditing(newRowIndex, 1);
        }
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
    },


    getSubmitValues: function () {
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


        var submitObj = Ext.apply(me.objectData, submitValues);
        submitObj = Ext.apply(submitObj, {
            Lines: records
        });


        return submitObj;
    },

    onConfirmShipClicked: function (button, evet) {
        var me = this;
        var submitValues = me.getSubmitValues();
        var objectId = this.getObjectId();
        if (!submitValues) {
            return;
        }

        var onBeforeRequest = function (conn, options, eOpts) {
            Ext.getBody().mask('请求提交中......');
            Ext.Ajax.un('beforerequest', onBeforeRequest, this);
        };

        Ext.Ajax.on({
            beforerequest: onBeforeRequest,
            scope: this
        });

        Ext.Ajax.request({
            
            url: Ext.String.format("{0}/{1}/{2}", me.apiPath, objectId, 'Ship'),
            method: 'POST',
            jsonData: submitValues,
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                var location = response.getResponseHeader('Location');
                Ext.Logger.debug("Resource Location : " + location);
                Ext.Logger.dir(obj);

                this.refresh(obj);
            },
            failure: function (response, opts) {
                var message = Ext.decode(response.responseText);
                me.setStatus({
                    text: '<font color="red">' + message.Message + '</font>',
                    clear: {
                        wait: 8000,
                        anim: false,
                        useDefaults: false
                    }
                });
                Ext.Logger.warn('server-side failure with status code ' + response.status);
            },
            scope: this
        });
    },

    onCloseClicked: function (button, event) {
        var me = this;
        me.close();
    },

    refresh: function (data) {
        var me = this,
			topWin = Ext.WindowMgr.getActive();
        try {
            this.setObjectId(data.Id);
            this.setObjectVersion(data.Version);
            this.setObjectData(data);
            var record = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOut', data);
            this.getForm().getForm().loadRecord(record);
            this.getStore().loadData(data.Lines);


            //Set status bar
            var status = '';
            if (record.get('Status') === 1) {
                status = '草稿';
            } else if (record.get('Status') === 10) {
                status = '处理中';
            } else if (record.get('Status') === 20) {
                status = '已关闭';
            } else if (record.get('Status') === 25) {
                status = '已取消';
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

    configHeader: function (record) {
        var me = this;

        if (record) {
            var plugin = me.getPlugin('headerbuttons'),
                header = plugin.getHeader(),
                confirmShipButton = header.getComponent('confirmShipButton');
            confirmShipButton.setDisabled(false);
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
        },
        afterrender: function (window, eOpts) {
            var element = window.getEl();
            element.on({
                keyup: function (e, t, eOpts) {
                    e.preventDefault();
                    if (e.getCharCode() == 13) {
                        var sku = Ext.String.trim(window.scanBuffer.join('')); //Could be UPC or SKU
                        window.scanBuffer = [];
                        if (sku && sku.length > 0) {
                            //try to retrieve the product from server side
                            Ext.Ajax.request({
                                url: Ext.String.format("{0}/Products?$filter=SKU eq '{1}' or UPC eq '{1}'", basket.dataSource, sku),
                                method: 'GET',
                                success: function (response, opts) {
                                    var me = window,
										store = window.getStore(),
										obj = Ext.decode(response.responseText);
                                    Ext.Logger.dir(obj);
                                    if (obj && obj.value && obj.value.length > 0) {
                                        var data = obj.value[0];
                                        if (store) {
                                            var model = Ext.create('Module.pos.transferOrderOut.model.TransferOrderOutLine', {
                                                SKU: data.SKU,
                                                Name: data.Name,
                                                UOM: data.UOMName,
                                                Quantity: 1.0
                                            });
                                            store.add(model);
                                        };
                                    }
                                    window.setDisabled(false);
                                },
                                failure: function (response, opts) {
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

    getStatusBar: function () {
        var me = this,
			statusBar = me.getDockedItems('statusbar[dock="bottom"]');

        return statusBar[0];
    },

    setStatus: function (o) {
        var me = this,
			statusBar = me.getStatusBar();
        statusBar.setStatus(o);
    }

});