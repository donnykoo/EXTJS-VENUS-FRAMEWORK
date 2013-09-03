Ext.require([
	'Module.pos.inventoryMoveIn.store.InventoryMoveInLines',
	'Ext.ux.field.TextTriggerField',
	'Ext.ux.field.NumericField',
	'Module.pos.product.view.Main',
	'Ext.ux.plugins.PanelHeaderExtraIcons'
]);

Ext.define('Module.pos.inventoryMoveIn.view.CreateWindow', {
	extend: 'Ext.Window',
	alias: 'widget.inventoryMoveInCreateWindow',
	height: 540,
	width: 800,
	header: {
		height: 36
	},
	border: false,
	title: '新建入库单',
	layout: 'border',
	closable: false,
	closeAction: 'hide',
	store: false,
	grid: false,
	form: false,
	create: true,
	objectId: 0, 
	
	initComponent: function() {
        var me = this;
		me.plugins = [{
			ptype: 'headericons',
			headerButtons: [{
				xtype: 'button',
				text: 'Close',
				height: 30,
				width: 60,
				scope: this,
				handler: this.onSave
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
						readOnly: true,
						tabIndex: 1,
						emptyText: '系统自动生成'
					},{
						xtype: 'textfield',
						fieldLabel: '制单人',
						emptyText: '当前登录用户',
						readOnly: true,
						tabIndex: 3,
						anchor: '-5',
						submitValue: false,
						name: 'Operator'
					}]
				},
				{
					items:[{
						xtype: 'combo',
						fieldLabel: '入库类型',
						allowBlank: false,
						tabIndex: 2,
						anchor: '100%',
						name: 'MoveInType',
						queryMode: 'local',
						displayField: 'value',
						valueField: 'key',
						store:  Ext.create('Ext.data.Store', {
							fields: ['key', 'value'],
							data : [
								{"key": 0, "value":"采购收货"},
								{"key": 1, "value":"调拨收货"},
								{"key": 2, "value":"退货入库"},
								{"key": 3, "value":"调整入库"}
							]
						})
					},{
						xtype: 'ux.field.TextTriggerField',
						fieldLabel: '收货仓库',
						tabIndex: 4,
						anchor: '100%',
						name: 'VirtualStock',
						filterName: 'SKU',
						allowBlank: false,
						displayProps: ['Name'],
						store: Ext.create('Module.pos.product.store.Products', { }),
						windowConfig: {
							searchPanelType: 'productMainView'
						},
						columns: [
							{ text: 'SKU', dataIndex: 'SKU', width: 100 },
							{ text: '商品全名', dataIndex: 'Name', width: 300 },
							{ text: 'UPC', dataIndex: 'UPC', width: 120 },
							{ text: '商品类别', dataIndex: 'ProductType', width: 100 },
							{ text: 'UOM', dataIndex: 'UOMName', width: 100 },
							{ text: '商品分类', dataIndex: 'ProductCategory', width: 100 }
						]
					}]
				}
			]
		});
		
		var store = me.store = Ext.create('Module.pos.inventoryMoveIn.store.InventoryMoveInLines', { 
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
					handler: me.onCreateClick
				},'-',{
					text: '删除',
					scope : this,
					handler: me.onDeleteClick
				}]
			}],
			columns: [
				{ text: 'SKU',  dataIndex: 'SKU', width: 160, 
					editor: {
						xtype:'ux.field.TextTriggerField',
						store: Ext.create('Module.pos.product.store.Products', { }),
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
	
	onCreateClick: function(btn, event, eOpts){
		var me = this,
			store = this.getStore();
		if(store){
			var model = Ext.create('Module.pos.inventoryMoveIn.model.InventoryMoveInLine', {
				SKU: '',
				Name: '',
				UOM: '',
				Quantity: 0.0
			});
			store.add(model);
		}
	},
	
	onDeleteClick : function(btn, event, eOpts){
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
	
	onSave: function(button, evet){
		var me = this;
		me.close();
	}
});