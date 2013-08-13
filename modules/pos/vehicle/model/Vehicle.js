Ext.define('Module.pos.vehicle.model.Vehicle', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'IdNumber', 'VehicleModel', 'PlateNumber', 'Memo',
			'VinCode', 'CustomerNumber'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Vehicles?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});