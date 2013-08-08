Ext.define('Module.pos.staff.model.Staff', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'StaffNumber', 'Name', 'RFCardNumber', 'Active', 'LastUpdate'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: '../odata/Staffs?$inlinecount=allpages',
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true //为了屏蔽Extjs Json Reader缺省的遍历对象的方法，我们利用这个标签让Exjts用最原始的方式来访问属性。
        }
    }
});