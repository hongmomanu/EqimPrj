/**
 * Created by jack on 14-2-18.
 */
Ext.define('EqimPrj.model.eqimmain.LogDuty', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'logcontent',
            type:'string'
        },
        {
            name:'id',
            type:'int'
        },
        {
            name: 'statustype',
            type:'string'
        },
        {
            name: 'time',
            type:'string'
        }


    ]
});

