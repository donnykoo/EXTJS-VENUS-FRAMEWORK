Ext.define('Module.pos.shiftTable.store.ShiftTables', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.shiftTable.model.ShiftTable',
    model: 'Module.pos.shiftTable.model.ShiftTable',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/ShiftTables?$inlinecount=allpages',basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
	    totalProperty:'odata.count',
	    useSimpleAccessors:true
        }
    },
	autoLoad: true,
	pageSize: basket.pageSize
});