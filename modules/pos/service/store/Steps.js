Ext.define('Module.pos.service.store.Steps', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.service.model.Step',
    model: 'Module.pos.service.model.Step',
	autoLoad: false,
	data: '',
	proxy: {
        type: 'memory',
        reader: {
            type: 'xml',
			record: 'Step',
            root: 'elements',                            
		}    
    }
});