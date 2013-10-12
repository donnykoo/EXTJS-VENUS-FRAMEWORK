Ext.define('Module.pos.serviceInstance.store.ServiceInstances', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.serviceInstance.model.ServiceInstance',
    model: 'Module.pos.serviceInstance.model.ServiceInstance',
    autoLoad: true,
    pageSize: basket.pageSize
});