/**** Trigger Field with popup window ***/
Ext.define('Ext.ux.field.GridWindowTriggerField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.ux.field.GridWindowTriggerField',

	uses: [ 
		'Ext.ux.field.window.GridWindow'
	],
	
	initComponent: function() {
		var me = this;
		this.addEvents('beforeload');
		
		me.callParent();
	},
	
    getPicker: function() {
        var me = this;
        return me.picker || (me.picker = me.createPicker());
    },
	
	
	/**
     * @cfg {Object} windowConfig
     * An optional set of configuration properties that will be passed to the com.obizsoft.form.PopupWindowWithGrid's constructor.
     * Any configuration that is valid for Window can be included. Some of the more useful ones are:
     *
     */
	 
	 /**
     * @cfg {Object} store
     * An must be set store object that will be passed to the com.obizsoft.form.PopupWindowWithGrid's constructor
     */
	 
	 /**
     * @cfg {Object} columns
     * An must be set columns array object that will be passed to the com.obizsoft.form.PopupWindowWithGrid's constructor
     */
	 
	triggerCls:  Ext.baseCSSPrefix + 'form-search-trigger',
    // copied from ComboBox 
    createPicker: function() {
        var me = this,
        picker,
        opts = Ext.apply({
			height: 320,
			width: 240,
			pickerField: me,
			store: me.store,
			columns: me.columns,
			dockedItems: me.dockedItems
        }, me.windowConfig);

		// NOTE: we use the customized Window with nested Grid
		picker = me.picker = Ext.create('Ext.ux.field.window.GridWindow', opts);

		
        me.mon(picker, {
            close: me.onPickerClose,
			itemclick: me.onItemClick,
			beforeload: me.onBeforeLoad,
            scope: me
        });

        return picker;
    },
	
	onTriggerClick: function(){
		var me = this, picker = me.getPicker();

		if (picker) {
			picker.show();
		}
	},
	
	onPickerClose : function(panel, eOpts){
		
	},
	
	onItemClick: function(window, grid, record, item, index, e, eOpts){
		var me = this, code = record.get("Code");
		me.setValue(code);
	},
	
	onBeforeLoad: function(picker, store, operation, eOpts){
		return this.fireEvent('beforeload', this, picker, store, operation, eOpts);
	}
	
});

