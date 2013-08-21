Ext.define('App.view.Header', {
    extend : 'Ext.Component',
    alias  : 'widget.headerview',
	
    initComponent: function() {
        var me = this;
        me.callParent();
    },

	data: {
		UserName: '',
		Avatar: 'resources/images/avatar.jpg',
		NeedLogin: true
	},
	
	tpl: [
		'<div id="ux-header-wrapper" >',
		'<table width="100%" cellspacing="0" cellpadding="0">',
		'<tr><td>{UserName}</td>',
		'<td rowspan="2" width="5" >&nbsp;</td>',
		'<td rowspan="2" >',
		'<tpl if="Avatar">',
		'<img width=40 height=40 src="{Avatar}"/></td></tr>',
		'<tpl else>',
		'<img width=40 height=40 src="resources/images/avatar.jpg"/></td></tr>',
		'</tpl>',
		'<tr><td>',
		'<tpl if="NeedLogin">',
		'<a href="#">LOG IN</a>',
		'<tpl else>',
		'<a href="' + basket.contextPath + 'account/logoff">LOG OUT</a>',
		'</tpl>',
		'</td></tr>',
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