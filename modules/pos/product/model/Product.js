Ext.define('Module.pos.product.model.Product', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'SKU', 'UPC', 'Name', 'Producer', 'PlaceOfProduction', 
			'SupplierCode', 'SupplierName', 'ProductType',
            'ProductName', 'BrandName', 'Model', 'UOMName', 'ProductCategory', 'Description', 'Discard',
            'Color', 'Icon', 'Consignment', 'SuggestedPrice', 'ServiceNumber', 'IsDiy',
            'Dimension', 'GrossWeight', 'Capacity', 'CapacityUOM', 'PackageUnit', 'LoadIndex', 'SpeedGrade',
            'TreadWidth', 'AspectRatio', 'RimDiameter', 'CrossSection', 'Flat', 'Eccentricity', 'BoltHoleNumber',
            'CenterCore', 'PCD', 'ERPCode', 'MaterialUsages', 'VehicleModel'],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Products?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});