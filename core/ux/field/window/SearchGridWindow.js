
Ext.define('Ext.ux.field.window.SearchGridWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.ux.field.window.SearchGridWindow',
	closeAction: 'hide',
	modal: true,
	layout: 'border',
	
	
	/**
     * @cfg {Object} searchPanelConfig
     * An optional set of configuration properties that will be passed to the {@link Ext.grid.Panel}'s constructor.
     * Any configuration that is valid for GridPanel can be included. Some of the more useful ones are:
     *
     *   - columns - defaults to empty
     */
	 
	 /**
     * @cfg {Object} searchPanelType
     * An mandate set of configuration properties that will be passed to the {@link Ext.grid.Panel}'s constructor.
     * This is the search panel's xtype
     */
	 
	initComponent: function() {
		var me = this, searchPanel = me.getSearchPanel();
		if(searchPanel){
			me.items = [searchPanel];
		}
		
		this.addEvents('itemclick', 'itemdblclick', 'beforeload');
		
		me.callParent();
	},
	
	getSearchPanel: function() {
        var me = this;
        return me.searchPanel || (me.searchPanel = me.createSearchPanel());
    },
	
	createSearchPanel: function(){
		var me = this,
        searchPanel,
        opts = Ext.apply({
			region: 'center',
			store: me.store,
			columns: me.columns
        }, me.searchPanelOptions);

		var searchPanelType = me.searchPanelType;
		if(!searchPanelType){
			searchPanelType = 'Ext.Panel';
		}
		
		searchPanel = me.searchPanel = Ext.widget(searchPanelType, opts);
		
        me.mon(searchPanel.getGrid(), {
            itemclick: me.onItemClick,
            scope: me
        });
		
		me.mon(searchPanel.getGrid(), {
            itemdblclick: me.onItemDblClick,
            scope: me
        });
		
		me.mon(searchPanel.getStore(), {
			beforeload: me.onBeforeLoad,
			scope: me
		});
        return searchPanel;
	},
	
	onItemClick: function(grid, record, item, index, e, eOpts ){
		return this.fireEvent('itemclick', this, grid, record, item, index, e, eOpts);
	},
	
	onItemDblClick: function(grid, record, item, index, e, eOpts ){
		return this.fireEvent('itemdblclick', this, grid, record, item, index, e, eOpts);
	},
	
	onBeforeLoad: function(store, operation, eOpts){
		return this.fireEvent('beforeload', this, store, operation, eOpts);
	},
	
	afterRender: function() {
	
		var me = this, grid = me.getSearchPanel().getGrid();
		me.callParent();
		grid.getStore().reload();
	},
	
	onShow: function() {
        var me = this, grid =  me.getSearchPanel().getGrid();
        me.callParent(arguments);
        grid.getStore().reload();
   }
});