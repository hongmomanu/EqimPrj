/**
 * Created by jack on 14-2-18.
 */
Ext.define('EqimPrj.model.eqimmain.SendMsgUser', {
    extend: 'Ext.data.Model',
    fields: [

        {
            name:'id',
            type:'int'
        },
        {
            name: 'username',
            type:'string'
        },
        {
            name: 'tel',
            type:'string'
        }


    ]
});

