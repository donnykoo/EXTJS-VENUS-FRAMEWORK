Ext.define('Module.pos.vehicleModel.model.VehicleModel', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'Brand', 'Name', 'Model', 'Displace', 'Manufacturer',
			'Year', 'Engine', 'Trim', 'BodyType', 'Level', 'Gear', 'Structure', 'CylinderNumber', 'Standard',
			'Length', 'Width', 'Height', 'Doors', 'Seats'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/VehicleModels?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});