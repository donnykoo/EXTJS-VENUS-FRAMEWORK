Ext.define('Module.pos.inventoryMoveOut.model.InventoryMoveOut', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'UpdateBy', 'CreateDate', 'CreateBy', 'IdNumber',
            'Status', 'VirtualStock', 'StaffNumber', 'Confirmed', 'MoveOutType', 'InventoryMoveLineJsonString'],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/InventoryMoveOuts?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});