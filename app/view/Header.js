Ext.define('App.view.Header', {
    extend : 'Ext.Component',
    alias  : 'widget.headerview',
	
    initComponent: function() {
        var me = this;
        me.callParent();
    },

	data: {
		name: 'ehe888',
		avatar: 'http://localhost/venus/resources/images/avatar.jpg'
	},
	
	tpl: [
		'<div id="ux-header-wrapper" >',
		'<table width="100%" cellspacing="0" cellpadding="0">',
		'<tr><td>{name}</td>',
		'<td rowspan="2" width="5" >&nbsp;</td>',
		'<td rowspan="2" ><img width=40 height=40 src="{avatar}"/></td></tr>',
		'<tr><td><a href="account/logout">LOG OUT</a></td></tr>',
		'</table>',
		'</div>'
	]
		
	/** 我们可以通过renderSelectors在模板被渲染时自动获得通过selector找到的Element, 
	但是这里我们使用的时组件渲染后再加载模板内容的方式，因此在Component加载时无法获取这个Element*/
	/**
	renderSelectors: {
        navigatorEl: '#ux-navigator-wrapper'
    },
	*/
	
	
});