Ext.define('Ext.ux.view.SearchPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.uxSearchPanel',
	
	anchor: '100% 100%',
	margin: '5 5 5 10',
	border: true,
	layout: {
		type:'vbox',
		padding:'5',
		align:'stretch'
	},
	
	createItems: function(){
		var me = this,
			formConfig = me.formConfig || {},
			gridConfig = me.gridConfig || {},
			store = me.store,
			columns = me.columns;
		
		formConfig = Ext.apply(me.defaultFormConfig, formConfig);
		formConfig.buttons = [
			{ 
				itemId: 'search-btn',
				text: 'Search',
				handler: function(btn, event, eOpts){
					me.onSearchButtonClicked(btn, event, eOpts);
				}
			},
			{ 
				itemId: 'reset-btn',
				text: 'Reset', handler: function(){
					form.getForm().reset();
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
		
		me.mon(me.store, {
			beforeload: me.onStoreBeforeLoad,
			scope: this
		});
	},
	
	onStoreBeforeLoad: function(store, operation, eOpts){
		if(!operation.params){
			operation.params = {};
		}
		
		var me = this,
			form = me.getForm(),
			fields = form.getFields(),
			filters = [];
		
		if(!form.isValid()){
			return;
		}
		
		fields.each(
			function(item, index, length){
				if(item.getODataFilter){
					var filter = item.getODataFilter();
					if(filter){
						filters.push(filter);
					}
				}
			}
		);
				
		if(!Ext.isEmpty(filters)){
			Ext.apply(operation.params, {
				'$filter': filters.join(" and ")
			});
		}
		
	},
	
	
	initComponent: function() {
		var me = this;
		me.createItems();
		me.callParent();
	},
	
	defaultFormConfig : {
		width: '98%',
		border: false,
		height: 60,
		margin: '10 5 5 10',
		fieldDefaults: {
			labelWidth: 120,
			labelAlign: 'left'
		},
		defaults: {
			border: false
		},
		buttonAlign: 'left'
	},
	
	defaultGridConfig: {
		border: false,
		margin: '10 5 5 10',
		autoScroll: true,
		tbar: {
			xtype: 'toolbar',
			border: true,
			height: 30,
			items: []
		},
		flex: 1,
		anchor: '98% 98%'
	},
	
	/**
     * @cfg {Object} formConfig
     * An optional set of configuration properties that will be passed to the Ext.Form.Panel's constructor,
     * Use this config object to create the Search Condition Form
     */
	 
	/**
     * @cfg {Object} gridConfig
     * An optional set of configuration properties that will be passed to the Ext.Form.Panel's constructor,
     * Use this config object to create the Search Condition Form
     */
	 
	/**
     * @cfg {Object} store
     * An must be set store object that will be passed to the Ext.Grid's constructor
	 * Use this store to create the search result grid
     */
	 
	getStore: function(){
		return this.store;
	},
	 
	 /**
     * @cfg {Object} columns
     * An must be set columns array object that will be passed to the Ext.Grid's constructor
	 * Use this parameter to config the search result grid
     */
	getFormPanel: function(){
		return this.form;
	},
	
	getForm: function(){
		if(this.form){
			return this.form.getForm();
		}
	},
	
	getGrid: function(){
		return this.grid;
	},
	
	onSearchButtonClicked: function(btn, event, eOpts){
		var me = this,
			form = me.getForm(),
			fields = form.getFields(),
			filters = [];
		
		if(!form.isValid()){
			return;
		}
		
		fields.each(
			function(item, index, length){
				if(item.getODataFilter){
					var filter = item.getODataFilter();
					if(filter){
						filters.push(filter);
					}
				}
			}
		);
				
		
		var params = {
			start:0,
			limit: basket.pageSize
		};
		if(!Ext.isEmpty(filters)){
			Ext.apply(params, {
				'$filter': filters.join(" and ")
			});
		}
		
		var store = me.getStore();
		
		store.loadPage(1, {
			params: params
		});
	}
	 
});