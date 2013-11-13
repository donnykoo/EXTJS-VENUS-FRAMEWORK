Ext.require([
	'Module.pos.inventoryMoveOut.store.InventoryMoveOutLines',
	'Ext.ux.field.TextTriggerField',
	'Ext.ux.field.NumericField',
	'Module.pos.product.view.Main',
	'Ext.ux.plugins.PanelHeaderExtraIcons',
	'Module.pos.virtualStock.view.Main',
	'Module.pos.staff.store.Staffs',
	'Module.pos.staff.view.Main'
]);

Ext.define('Module.pos.inventoryMoveOut.view.CreateWindow', {
	extend: 'Ext.Window',
	alias: 'widget.inventoryMoveOutCreateWindow',
	height: 540,
	width: 800,
	constrain: true,
	modal: true,
	header: {
		height: 36
	},
	border: false,
	title: '出库单',
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
	
	apiPath: Ext.String.format('{0}/api/InventoryMoveOutsApi', "/" === basket.contextPath ? "" : basket.contextPath),
	
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
				itemId: 'completeButton',
				text: '完成出库',
				disabled: true,
				height: 30,
				width: 60,
				scope: this,
				handler: this.onCompleteClicked
			},{
				xtype: 'button',
				itemId: 'confirmButton',
				text: '确认出库',
				disabled: true,
				height: 30,
				width: 60,
				scope: this,
				handler: this.onConfirmClicked
			},{
				xtype: 'button',
				itemId: 'cancelButton',
				text: '作废',
				disabled: true,
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
					items:[{
						xtype: 'textfield',
						fieldLabel: '单号',
						anchor: '-5',
						name: 'IdNumber',
						submitValue: false,
						readOnly: true,
						tabIndex: 1,
						emptyText: '系统自动生成'
					},{
						xtype: 'ux.field.TextTriggerField',
						fieldLabel: '申请人',
						tabIndex: 3,
						anchor: '-5',
						name: 'Requestor',
						filterName: 'StaffNumber',
						allowBlank: false,
						displayProps: ['Name'],
						store: Ext.create('Module.pos.staff.store.Staffs', { }),
						windowConfig: {
							height: 420,
							width: 680,
							searchPanelType: 'staffMainView'
						},
						itemSelected: function(window, innerGrid, record, item, index, e, eOpts){
							var me = this, 
								code = record.get("StaffNumber");
							
							me.setBackRecord(record);
							me.setValue(code);
						}
					},{
						xtype: 'textfield',
						fieldLabel: '原始单证编号',
						anchor: '-5',
						name: 'RefNumber',
						tabIndex: 5,
						emptyText: '如采购单、调拨单号',
						textValid: true,
						validator: function (value) {
						    return this.textValid;
						},
						listeners: {
						    blur: function (field, the, eOpts) {
						        var moveoutType = me.form.getForm().findField("MoveOutType").getValue();
						        if (moveoutType == null) {
						            field.textValid = '必须先选择出库类型';
						            field.validate();
						        }
						        var refNumber = field.getValue();
						        if (moveoutType == 0 || moveoutType == 3) {
						            if (refNumber == '') {
						                field.textValid = '原始单证编号不能为空';
						                field.validate();
						            }
						        }
						        Ext.Ajax.request({
						            url: Ext.String.format("{0}/{1}/ValidateRefNumber", me.apiPath, me.objectId),
						            method: 'POST',
						            jsonData: { "RefNumber": refNumber, "MoveOutType": moveoutType },
						            success: function (response, opts) {
						                field.clearInvalid();
						                field.textValid = true;
						                field.validate();
						            },
						            failure: function (response, opts) {
						                field.textValid = "该单号不存在";
						                field.validate();
						                Ext.Logger.warn('server-side failure with status code ' + response.status);
						            },
						            scope: this
						        });
						    }
						}
					},{
						xtype: 'hidden',
						fieldLabel: 'ID',
						anchor: '-5',
						name: 'Id',
						readOnly: true,
						tabIndex: 0,
						value: 0
					},{
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
					items:[{
						xtype: 'combo',
						fieldLabel: '出库类型',
						allowBlank: false,
						tabIndex: 2,
						anchor: '100%',
						name: 'MoveOutType',
						queryMode: 'local',
						displayField: 'value',
						valueField: 'key',
						store:  Ext.create('Ext.data.Store', {
							fields: ['key', 'value'],
							data : [
								{"key": "0", "value":"调拨出库"},
								{"key": "1", "value":"调整出库"},
								{"key": "3", "value":"领料出库"}
							]
						}),
						listeners: {
						    change: function(combobox, newValue, oldValue, eOpts ) {
						        var value = combobox.getValue();
						        var upForm = combobox.up('form').getForm();
						        if (value) {
						            var refField = upForm.findField('RefNumber');
						            if (value == 0 || value == 3) {
						                if (refField.getValue() == '') {
						                    refField.textValid = "请输入单号";
						                    refField.validate();
						                } else {
						                    refField.fireEvent('blur', refField);
						                }
						            } else {
						                refField.textValid = true;
						                refField.clearInvalid();
						            }
						        }
						    }
						}
					},{
						xtype: 'ux.field.TextTriggerField',
						fieldLabel: '发货仓库',
						tabIndex: 4,
						anchor: '100%',
						name: 'VirtualStock',
						filterName: 'IdNumber',
						allowBlank: false,
						displayProps: ['Name'],
						store: Ext.create('Module.pos.virtualStock.store.VirtualStocks', { }),
						windowConfig: {
							height: 420,
							width: 680,
							searchPanelType: 'virtualStockMainView'
						},
						itemSelected: function(window, innerGrid, record, item, index, e, eOpts){
							var me = this, 
								code = record.get("IdNumber");
							
							me.setBackRecord(record);
							me.setValue(code);
						}
					},{
						xtype: 'textfield',
						fieldLabel: '物流单编号',
						anchor: '100%',
						name: 'LogisticOrderNumber',
						tabIndex: 6,
						emptyText: ''
					}]
				}
			]
		});
		
		var store = me.store = Ext.create('Module.pos.inventoryMoveOut.store.InventoryMoveOutLines', { 
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
					text: '数量', dataIndex: 'Quantity', width: 100,
					xtype: 'numbercolumn', format:'0,000.00',
					align: 'right',
					editor: {
						xtype: 'ux.field.NumericField',
						decimalPrecision: 2,
						minValue: 0,
						hideTrigger: true,
						allowBlank: false
					}
				}
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
			var model = Ext.create('Module.pos.inventoryMoveOut.model.InventoryMoveOutLine', {
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
	    if (!me.getForm().isValid()) {
	        return;
	    }
	    
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
	
	onCompleteClicked: function(button, event){
	
		var me = this;
		
		Ext.Msg.confirm('确认', '您是否确认完成出库?', 
			function(btn, text){
				if (btn == 'ok' || btn == 'yes' || btn == '确定'){
					Ext.Ajax.request({
						url: Ext.String.format("{0}/{1}/Complete", me.apiPath, me.objectId),
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
		
		Ext.Msg.confirm('确认', '您是否确认所有商品已正确出库?', 
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
		
		Ext.Msg.confirm('确认', '您是否确定作废出库单?', 
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
	
	refresh: function(data){
		var me = this,
			topWin = Ext.WindowMgr.getActive();
		try{
			this.setObjectId(data.Id);
			this.setObjectVersion(data.Version);
			this.setObjectData(data);
			var record = Ext.create('Module.pos.inventoryMoveOut.model.InventoryMoveOut', data);
			this.getForm().getForm().loadRecord(record);
			this.getStore().loadData(data.Lines);
			
			
			//Set status bar
			var status = '';
			if(record.get('Status') === 0){
				status = '草稿';
			}else if(record.get('Status') === 1){
				status = '完成';
			}else if(record.get('Status') === 2){
				status = '已确认';
			}else if(record.get('Status') === 3){
				status = '已作废';
			}
			
			me.setStatus({
				text: status,
				clear: {
					wait: 8000,
					anim: false,
					useDefaults: false
				}
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
				completeBtn = header.getComponent('completeButton'),
				confirmBtn = header.getComponent('confirmButton'),
				cancelBtn = header.getComponent('cancelButton');
			
			
			if(record.get('Status') == 0 && record.get('Id') > 0){	
				//草稿
				saveBtn.setDisabled(false);
				completeBtn.setDisabled(false);
				confirmBtn.setDisabled(true);
				cancelBtn.setDisabled(false);
			}else if(record.get('Status') == 1){
				//完成
				saveBtn.setDisabled(true);
				completeBtn.setDisabled(true);
				confirmBtn.setDisabled(false);
				cancelBtn.setDisabled(false);
			}else if(record.get('Status') == 2){
				//已核实
				saveBtn.setDisabled(true);
				completeBtn.setDisabled(true);
				confirmBtn.setDisabled(true);
				cancelBtn.setDisabled(true);
			}else if(record.get('Status') == 3){
				//已取消
				saveBtn.setDisabled(true);
				completeBtn.setDisabled(true);
				confirmBtn.setDisabled(true);
				cancelBtn.setDisabled(true);
			}else{
				saveBtn.setDisabled(false);
				completeBtn.setDisabled(true);
				confirmBtn.setDisabled(true);
				cancelBtn.setDisabled(true);
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
											var model = Ext.create('Module.pos.inventoryMoveOut.model.InventoryMoveOutLine', {
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
	}
});