Ext.define('Module.test.store.Test', {
    extend   : 'Ext.data.Store',
    model    : 'Module.test.model.Test',
    requires : ['Module.test.model.Test']
});