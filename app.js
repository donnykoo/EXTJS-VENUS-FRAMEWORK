Ext.Loader.setConfig({
    enabled		: true
});

//State Manager should replaced by sessvars provider
/**
Ext.state.Manager.setProvider(
    new Ext.state.CookieProvider({
        expires: new Date(new Date().getTime()+(1000*60*60*24*7)) //7 days from now
    })
);
*/
Ext.onReady(function() {
    // Start the mask on the body and get a reference to the mask
    splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');
    // Add a new class to this mask as we want it to look different from the default.
    splashscreen.addCls('splashscreen');

    // Insert a new div before the loading icon where we can place our logo.
    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
        cls: 'x-splash-icon'
    });
});


Ext.application({
    name: 'App',

	paths	: {
		'Ext.ux'	:	'core/ux',
        'Ext.ux.view'	:	'core/ux/view',
		'Ext.ux.field'	:	'core/ux/field',
		'Ext.ux.plugins'	:	'core/ux/plugins',
        'Ext.app'	:	'core/ux/app',
        'Module'	:	'modules'
    },
	
	refs : [{
        ref: 'headerView',
        selector: 'headerview'
    }],
	
    autoCreateViewport: true,

    controllers: [
		'Navigator',
		'ContentPanel',
		'Header'
    ],
	
	views: ['LoginFormPanel'],
	
	launch: function() {
		var me = this;
		
		// Setup a task to fadeOut the splashscreen
        var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
			if(splashscreen && splashscreen.id){
				splashscreen.fadeOut({
					duration: 1000,
					remove:false
				});
				// Fade out the icon and message
				splashscreen.next().fadeOut({
					duration: 1000,
					remove:false,
					listeners: {
						afteranimate: function() {
							// Set the body as unmasked after the animation
							Ext.getBody().unmask();
						}
					}
				});
			}
        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);
		
		/***
			We override the Ext.Loader object to add debug output
			based on if the query string contains debug=true
			if true we add the debug funtion otherwise we just make the debug emptyFn
		*/
		if(basket && basket.debug){
			Ext.apply(Ext.Logger, {
				debug: function(message){
					if (Ext.global.console) {
						Ext.global.console.debug(message);
					}
				},
				warn: function(message){
					if (Ext.global.console) {
						Ext.global.console.warn(message);
					}
				},
				dir: function(obj){
					if(console){
						console.dir(obj);
					}
				}
			});
		}else{
			Ext.apply(Ext.Logger, {
				debug: Ext.emptyFn,
				dir: Ext.emptyFn
			});
		}
        
		Ext.Ajax.on({
			requestcomplete: me.onAjaxRequestComplete,
			requestexception: me.onAjaxRequestException,
			scope: me
		});
	
		Ext.Logger.debug("1. Launched ............................ 100%");
		
		this.loginWindow = Ext.widget('loginformpanel', {
			
		});
		
		me.on({
			idleOut: me.onIdleOut
		});
		
		//Start the activity monitor
		Ext.ux.ActivityMonitor.init({
			verbose : true,
			interval    : (100 * 60 * 1), //6 sec
			maxInactive : (100 * 60 * 5), //30 sec
			isInactive: function(){
				me.fireEvent("idleOut");
			}
		});
		Ext.ux.ActivityMonitor.start();
    },
	
	onIdleOut: function()
	{
		var me = this,
			header = me.getHeaderView();
			
		if(me.loginWindow){
			me.loginWindow.show();
		}
		
	},
	
	onAjaxRequestComplete: function(conn, response, options, eOpts){
		var me = this;
		Ext.Logger.debug("-> Ext.Ajax.request completion");
		var masked = Ext.getBody().hasCls("x-masked");
		Ext.Logger.debug("The body is masked? " + masked);
		if(masked){
			Ext.getBody().unmask();
		}
		
	},
	
	/***
	* In any ajax request exception we catch it and translate it rethrow to application
	*/
	onAjaxRequestException: function(conn, response, options, eOpts){
		var me = this,
			statusBar = Ext.getCmp('app-status');
		
		Ext.Logger.debug("-> Ext.Ajax.request exception with status code : " + response.status);
		
		var masked = Ext.getBody().hasCls("x-masked");
		Ext.Logger.debug("The body is masked? " + masked);
		if(masked){
			Ext.getBody().unmask();
		}
		
		if(response.status === 400){ //Bad Request
			statusBar.setStatus({
				text: Ext.String.format('ERROR - 400 Bad Request - {0}', response.responseText),
				clear: true
			});
		}else if(response.status === 401){	//Unauthorized
			me.fireEvent("authFailed");
			statusBar.setStatus({
				text: Ext.String.format('ERROR - 401 Unauthorized - {0}', response.responseText),
				clear: true
			});
			/*
			if(splashscreen && !splashscreen.isVisible()){
				var loginMask = new Ext.LoadMask(Ext.getBody(),  
				{
					msg: "<div><form><input type='password' name='UserName' /></form></div>"
				});
				loginMask.show();
			}
			*/
			
		}else if(response.status === 403){ //Forbidden
			
			statusBar.setStatus({
				text: Ext.String.format('ERROR - 403 Forbidden - {0}', response.responseText),
				clear: true
			});
		}else if(response.status === 404){ //Page not found
			statusBar.setStatus({
				text: Ext.String.format('ERROR - 404 Page not found - {0}', response.responseText),
				clear: true
			});
		}else if(response.status === 500){ //Internal Server Error
			statusBar.setStatus({
				text: Ext.String.format('ERROR - 500 Internal Server Error - {0}', response.responseText),
				clear: true
			});
		}
	}
});
