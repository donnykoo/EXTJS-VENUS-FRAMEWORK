Ext.define('Module.pos.inventory.model.Inventory', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'CreateDate', 'CreateBy', 'UpdateBy', 
		'SKU', 'ProductName', 'Store', 'VirtualStock', 'VirtualStockName', 'TotalQuantity', 'AvailableQuantity', 'ReservedQuantity'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Inventories?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true //为了屏蔽Extjs Json Reader缺省的遍历对象的方法，我们利用这个标签让Exjts用最原始的方式来访问属性。
        }
    }
});