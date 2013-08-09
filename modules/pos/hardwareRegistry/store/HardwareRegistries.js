Ext.define('Module.pos.hardwareRegistry.store.HardwareRegistries', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.hardwareRegistry.model.HardwareRegistry',
    model: 'Module.pos.hardwareRegistry.model.HardwareRegistry',
	autoLoad: true,
	pageSize: basket.pageSize
});