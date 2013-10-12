Ext.define('Module.pos.vehicleModel.store.VehicleModels', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.vehicleModel.model.VehicleModel',
    model: 'Module.pos.vehicleModel.model.VehicleModel',
	autoLoad: true,
	pageSize: basket.pageSize
});