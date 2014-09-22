Ext.define('EqimPrj.store.eqimmain.LogDutys', {
    extend: 'Ext.data.Store',
    model: 'EqimPrj.model.eqimmain.LogDuty',
    autoLoad:true,
    pageSize : 10,
    proxy:{
        type: 'ajax',
        url: localStorage.serverurl+'log/getlogduty',
        extraParams:{
            statustype:"发送消息"
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});