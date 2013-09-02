Ext.define('Module.pos.inventoryPickOut.model.InventoryPickOut', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'UpdateBy', 'CreateDate', 'CreateBy', 'IdNumber',
            'Status', 'VirtualStock', 'StaffNumber', 'Confirmed', 'PickOutType', 'InventoryMoveLineJsonString'],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/InventoryPickOuts?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});