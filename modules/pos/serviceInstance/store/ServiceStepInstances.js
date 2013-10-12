Ext.define('Module.pos.serviceInstance.store.ServiceStepInstances', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.serviceInstance.model.ServiceStepInstance',
    model: 'Module.pos.serviceInstance.model.ServiceStepInstance',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});