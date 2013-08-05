
Ext.define('Ext.ux.field.window.GridWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.ux.field.window.GridWindow',
	closeAction: 'hide',
	layout: 'border',
	
	
	/**
     * @cfg {Object} gridConfig
     * An optional set of configuration properties that will be passed to the {@link Ext.grid.Panel}'s constructor.
     * Any configuration that is valid for GridPanel can be included. Some of the more useful ones are:
     *
     *   - columns - defaults to empty
     */
	 
	initComponent: function() {
		var me = this, grid = me.getGrid();
		if(grid){
			me.items = [grid];
		}
		
		this.addEvents('itemclick', 'beforeload');
		
		me.callParent();
	},
	
	getGrid: function() {
        var me = this;
        return me.grid || (me.grid = me.createGrid());
    },
	
	createGrid: function(){
		var me = this,
        grid,
        opts = Ext.apply({
			region: 'center',
			store: me.store,
			columns: me.columns
        }, me.gridOptions);

		grid = me.grid = Ext.create('Ext.grid.Panel', opts);
		
        me.mon(grid, {
            itemclick: me.onItemClick,
            scope: me
        });
		
		me.mon(grid.getStore(), {
			beforeload: me.onBeforeLoad,
			scope: me
		});
        return grid;
	},
	
	onItemClick: function(grid, record, item, index, e, eOpts ){
		return this.fireEvent('itemclick', this, grid, record, item, index, e, eOpts);
	},
	
	onBeforeLoad: function(store, operation, eOpts){
		return this.fireEvent('beforeload', this, store, operation, eOpts);
	},
	
	afterRender: function() {
	
		var me = this, grid = me.getGrid();
		me.callParent();
		grid.getStore().load();
	},
	
	onShow: function() {
        var me = this, grid = me.getGrid();
        me.callParent(arguments);
        grid.getStore().reload();
   }
});