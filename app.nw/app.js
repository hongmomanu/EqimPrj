Ext.Loader.setPath({
    
    'Ext.ux':'extjs4.2.1/ux'
   
});



Ext.application({
    
    name: 'EqimPrj',

    appFolder: 'app',

    controllers: [
        'EqimMain'
    ],
    autoCreateViewport: true,
    launch: function() {

    }
});