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

Ext.application({
    name: 'App',

	paths	: {
        'Ext.ux'	:	'core/ux',
        'Ext.app'	:	'core/ux/app',
        'Module'	:	'modules'
    },
	
    autoCreateViewport: true,

    controllers: [
        'Main'
    ]
});
