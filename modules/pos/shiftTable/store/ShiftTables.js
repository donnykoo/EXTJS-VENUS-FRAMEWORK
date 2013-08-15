Ext.define('Module.pos.shiftTable.store.ShiftTables', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.shiftTable.model.ShiftTable',
    model: 'Module.pos.shiftTable.model.ShiftTable',
    proxy: {
        type: 'ajax',
        url: '/ShiftTables/Store?store=' + Ext.urlDecode(location.search.substring(1)).store,
        reader: {
            type: 'json',
            root: 'shift',
        }
    },
	autoLoad: true,
	pageSize: basket.pageSize
});