Ext.define('Module.pos.vehicle.store.Vehicles', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.vehicle.model.Vehicle',
    model: 'Module.pos.vehicle.model.Vehicle',
	autoLoad: true,
	pageSize: basket.pageSize
});