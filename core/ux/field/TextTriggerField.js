/**** Trigger Field with popup window ***/
Ext.define('Ext.ux.field.TextTriggerField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.ux.field.TextTriggerField',

	uses: [ 
		'Ext.ux.field.window.GridWindow'
	],
	
	originFieldLabel: '',
	
	/**
     * @cfg {Object} filterName
     * An optional set of configuration properties that will be the property name to do search on server side.
     */
	 
	 /**
     * @cfg {Object} displayProps
     * An optional set of property names which will be extract from retrieved record and displayed to label
	 * Example: 
	 *    displayProps: ['Name', 'Price']
     */
	 
	initComponent: function() {
		var me = this;
		me.originFieldLabel = me.fieldLabel;
		this.addEvents('beforeload', 'close');
		
		me.on({
			specialkey: this.onSpecialKey,
			change: this.onChange, 
			scope: this
		});
		me.callParent();
	},
	onChange: function(field, newValue, oldValue, eOpts ){
		var me = this,
			rec = this.getBackRecord();
		if(rec && me.displayProps){
			var label = this.originFieldLabel;
			Ext.each(me.displayProps, function(value){
				label = label + " | " + rec.get(value);
			});
			this.setFieldLabel(label);
		}else{
			this.setFieldLabel(me.originFieldLabel);
		}
		this.callParent();
	},
	
	onSpecialKey: function(field, e){
		var me = this,
			store = me.store,
			filterName = me.filterName ? me.filterName : field.getName();
		if (e.getKey() == e.ENTER) {
			//Try to do ajax search
			if(store){
				store.load({
					scope: this,
					params: {
						'$filter' : Ext.String.format("substringof('{0}',{1})", this.getValue(), filterName)
					},
					callback: function(records, operation, success) {
						// the operation object
						// contains all of the details of the load operation
						if(records.length === 1){
							var rec = records[0];
							this.setValue(rec.get(filterName));
							this.setBackRecord(rec);
							this.fireEvent('change', this, this.getValue(), this.getValue(), {});
						}else if(records.length > 1){
							me.getPicker().show();
						}else{
							//clear label
							me.setBackRecord(false);
							this.fireEvent('change', this, this.getValue(), this.getValue(), {});
						}
					}
				});
			}
		}
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
	
	/*
	* the backend record support current value, it is always the record get from the selection grid
	*/
	backRecord: false,
	
	setBackRecord: function(rec){
		this.backRecord = rec;
	},
	getBackRecord: function(){
		return this.backRecord;
	},
	
	triggerCls:  Ext.baseCSSPrefix + 'form-search-trigger',
    // copied from ComboBox 
    createPicker: function() {
        var me = this,
        picker,
        opts = Ext.apply({
			height: 320,
			width: 480,
			pickerField: me,
			store: me.store,
			columns: me.columns,
			dockedItems: me.dockedItems,
			searchPanelOptions: {}
        }, me.windowConfig);

		// NOTE: we use the customized Window with nested Grid
		picker = me.picker = Ext.create('Ext.ux.field.window.SearchGridWindow', opts);

		
        me.mon(picker, {
            close: me.onPickerClose,
			itemclick: me.onItemClick,
			itemdblclick: me.onItemDblClick,
			beforeload: me.onBeforeLoad,
			close: me.onPickerClose,
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
	
	onPickerClose : function(window, panel, eOpts){
		return this.fireEvent('close', window, panel, eOpts);
	},
	
	onItemClick: function(window, grid, record, item, index, e, eOpts){
		this.itemSelected(window, grid, record, item, index, e, eOpts);
	},
	
	onItemDblClick: function(window, grid, record, item, index, e, eOpts){
		var me = this,
			picker = me.getPicker();
		this.itemSelected(window, grid, record, item, index, e, eOpts);
		picker.close();
	},
	
	itemSelected: function(window, innerGrid, record, item, index, e, eOpts){
		var me = this, code = record.get("Code");
		me.backRecord = record;
		me.setValue(code);
	},
	
	onBeforeLoad: function(picker, store, operation, eOpts){
		return this.fireEvent('beforeload', this, picker, store, operation, eOpts);
	}
});

