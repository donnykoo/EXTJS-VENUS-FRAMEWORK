Ext.define('Module.pos.serviceInstance.store.InstanceProducts', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.serviceInstance.model.InstanceProduct',
    model: 'Module.pos.serviceInstance.model.InstanceProduct',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});