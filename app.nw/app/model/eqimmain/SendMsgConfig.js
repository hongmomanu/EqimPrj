/**
 * Created by jack on 14-2-18.
 */
Ext.define('EqimPrj.model.eqimmain.SendMsgConfig', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'is_active',
            type:'boolean'
        },
        {
            name:'id',
            type:'int'
        },
        {
            name: 'source',
            type:'string'
        },
        {
            name: 'epicenter',
            type:'string'
        },
        {
            name: 'compare',
            type:'string'
        },
        {
            name: 'comparedata',
            type:'string'
        },
        {
            name: 'sendmethod',
            type:'string'
        },
        {
            name: 'time',
            type:'string'
        }


    ]
});

