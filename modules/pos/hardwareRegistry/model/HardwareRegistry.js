Ext.define('Module.pos.hardwareRegistry.model.HardwareRegistry', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'RegCode', 'Store', 'BayNumber', 'RegTime', 'DeviceType', 'MachineId', 'Secret' ],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/HardwareRegistries?$inlinecount=allpages', basket.dataSource), 
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true //为了屏蔽Extjs Json Reader缺省的遍历对象的方法，我们利用这个标签让Exjts用最原始的方式来访问属性。
        }
    }
});