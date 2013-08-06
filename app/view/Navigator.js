Ext.define('App.view.Navigator', {
    extend : 'Ext.Component',
    alias  : 'widget.navigatorview',
	
    initComponent: function() {
        var me = this;
        me.callParent();
    },

	tpl: [
		'<div id="ux-navigator-wrapper" >',
		'<ul class="ux-navigator-menu">',
		'<tpl for=".">',      
			'<li class="item"><a class="top-menu-anchor" href="#">{name}<span> {[ values.modules ? values.modules.length : 0 ]}</span></a>',
				'<ul>',
					'<tpl for="modules">', 
					'<li class="subitem"><a class="sub-menu-anchor" href="#" module="{module}"> {name} </a></li>',
					'</tpl>',
				'</ul>',
			'</li>',
		'</tpl>',
		'</ul>',
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