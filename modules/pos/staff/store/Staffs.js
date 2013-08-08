Ext.define('Module.pos.staff.store.Staffs', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.staff.model.Staff',
    model: 'Module.pos.staff.model.Staff',
	autoLoad: true,
	pageSize: basket.pageSize
});