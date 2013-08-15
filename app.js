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
        'Ext.app'	:	'core/ux/app',
        'Module'	:	'modules'
    },
	
    autoCreateViewport: true,

    controllers: [
		'Navigator',
		'ContentPanel',
		'Header'
    ],
	
	launch: function() {
		var me = this;
		
		// Setup a task to fadeOut the splashscreen
        var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });
            // Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function() {
                        // Set the body as unmasked after the animation
                        Ext.getBody().unmask();
                    }
                }
            });
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
		
		
    },
	
	onAjaxRequestComplete: function(conn, response, options, eOpts){
		Ext.Logger.debug("-> Ext.Ajax.request completion");
	},
	
	/***
	* In any ajax request exception we catch it and translate it rethrow to application
	*/
	onAjaxRequestException: function(conn, response, options, eOpts){
		Ext.Logger.debug("-> Ext.Ajax.request exception with status code : " + response.status);
		if(response.status === 400){ //Bad Request
		
		}else if(response.status === 401){	//Unauthorized
			if(!splashscreen.isVisible()){
				var loginMask = new Ext.LoadMask(Ext.getBody(),  
				{
					msg: "<div><form><input type='password' name='UserName' /></form></div>"
				});
				loginMask.show();
			}
		}else if(response.status === 403){ //Forbidden
			
		}else if(response.status === 404){ //Page not found
			
		}else if(response.status === 500){ //Internal Server Error
		
		}
	}
});
