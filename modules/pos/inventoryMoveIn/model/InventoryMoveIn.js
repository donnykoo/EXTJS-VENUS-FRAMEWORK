Ext.define('Module.pos.inventoryMoveIn.model.InventoryMoveIn', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'UpdateBy', 'CreateDate', 'CreateBy', 'IdNumber',
            'Status', 'VirtualStock', 'StaffNumber', 'Confirmed', 'MoveInType','Lines','InventoryMoveLineJsonString'],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/InventoryMoveIns?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});