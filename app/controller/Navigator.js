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
    },{
		ref: 'contentPanel',
		selector: 'contentpanel'
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
	
	
	/** private method to create module entry controller name **/
	getModuleMainController: function(module){
		return Ext.String.format('Module.{0}.controller.Main', module);
	},
	
	getModuleMainView: function(module){
		return Ext.String.format('Module.{0}.view.Main', module);
	},
	
	getJSFile: function(className){
		var realName = className.substr(7); //Exclude 'Module.'
		var path = realName.replace(/\./g, '/')
		return Ext.String.format('modules/{0}.js', path);
	},
	
	setModuleLoadPath: function(module){
		var modulePath = module.replace(/\./g, '/');
		Ext.Loader.setPath(Ext.String.format('Module.{0}.store', module), Ext.String.format('modules/{0}/store', modulePath));
	},
	
	onSubMenuClick: function(event, target, eOpts){
		var me = this,
			element = event.getTarget(null, null, true),
			module = element.getAttribute("module"),
			moduleController = me.getModuleMainController(module),
			moduleView = me.getModuleMainView(module),
			moduleJSFiles = [
				me.getJSFile(moduleController), me.getJSFile(moduleView)
			];
			
			
		me.setModuleLoadPath(module);
		
		
		var app    = me.application,
            subapp = new Ext.app.SubApplication({
                app          : app,
                id           : moduleView,
                loadMask     : true,
                loadingText  : 'Loading ...',

                controllers : [
                    moduleController
                ],

                dependencies : {
                    css : [
                        
                    ],
                    js  : moduleJSFiles
                },

                launch: function() {
                    var comp = Ext.create(moduleView, {
                        app : me,
						contentView: me.getContentPanel(),
						autoRender: true
                    });
                    
					//Insert comp into the ContentPanel
					
					var content = me.getContentPanel();
					if(content){
						content.removeAll(true);
						content.add(comp);
					}
					
					comp.doLayout();
                    return comp;
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
