Ext.define('App.controller.Navigator', {
    extend : 'Ext.app.Controller',
	
    init: function() {
        var me = this;
		
		me.control({
			'navigatorview': {
				beforerender: me.onNavigatorViewBeforeRender,
				afterrender: me.onNavigatorViewAfterRender
			},
			'#west-region-container toolbar #refresh-btn': {
				click: me.onRefreshButtonClick
			}
		});
    },
	
	refs : [{
        ref: 'navigatorView',
        selector: 'navigatorview'
    }],
	
	onLaunch: function(appliation){
		
	},
	
	onNavigatorViewBeforeRender: function(view, eOpts){
		
	},
	
	onNavigatorViewAfterRender: function(view, eOpts){
		var me = this;
		me.loadNavigator();
	},
	
	//private method
	loadNavigator: function(){
		var me = this;
		var view = me.getNavigatorView();
		Ext.Ajax.request({
			url: 'data/navigation.json',
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				
				Ext.Logger.dir(obj);
				
				/** Update the navigation menu with the data retrieved from server **/
				view.update(obj);
				var navigatorEl = view.navigatorEl = view.getEl().down("#ux-navigator-wrapper");
				me.mon(navigatorEl, {
					click: me.onTopMenuClick,
					scope: me,
					delegate: '.top-menu-anchor'
				});
				
				me.mon(navigatorEl, {
					click: me.onSubMenuClick,
					scope: me,
					delegate: '.sub-menu-anchor'
				});
			},
			failure: function(response, opts) {
				Ext.Logger.error('server-side failure with status code ' + response.status);
			}
		});	
	},
	
	onTopMenuClick: function(event, target, eOpts){
		var me = this, navigatorEl = this.getNavigatorView().getEl();
		var element = event.getTarget(null, null, true);
		var ulElements = navigatorEl.select(".ux-navigator-menu > li ul");
		var topAnchorElements = navigatorEl.select(".ux-navigator-menu > li > a");
		
		if(!element.hasCls("active")){
			
			topAnchorElements.each(function(el, compositeEl, index){
				el.removeCls("active");
			});
			ulElements.each(function(el, compositeEl, index){
				/* Extjs 自带的slideIn/Out动画效果非常差，会自动加一些DIV标签，我们用最简单的纯CSS方式来解决问题 */
				el.replaceCls("slide-down-show", "slide-up-hide");
			});
			
			element.addCls("active");
			element.next("ul").replaceCls("slide-up-hide", "slide-down-show");
			
			
		}else{
			element.removeCls("active");
			element.next("ul").replaceCls("slide-down-show", "slide-up-hide");
		}
	},
	
	onSubMenuClick: function(event, target, eOpts){
		var me     = this,
            app    = me.application,
            subapp = new Ext.app.SubApplication({
                app          : app,
                id           : 'Module.test.view.Main',
                loadMask     : true,
                loadingText  : 'Loading Test...',

                controllers : [
                    'Module.test.controller.Main'
                ],

                dependencies : {
                    css : [
                        'modules/test/css/main.css'
                    ],
                    js  : [
                        'modules/test/controller/Main.js',
                        'modules/test/view/Main.js'
                    ]
                },

                launch: function() {
                    var win = Ext.create('Module.test.view.Main', {
                        app : me
                    });
                    win.show();

                    return win;
                }
            });
	},
	
	/**
	* 导航栏窗口的刷新按钮 - 用于重新载入菜单
	*/
	onRefreshButtonClick: function(event, target, eOpts){
		var me = this;
		me.loadNavigator();
	}
});
