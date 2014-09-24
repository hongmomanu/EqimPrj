Ext.define('EqimPrj.store.eqimmain.LogDutys', {
    extend: 'Ext.data.Store',
    model: 'EqimPrj.model.eqimmain.LogDuty',
    autoLoad:true,
    pageSize : 10,
    proxy:{
        type: 'ajax',
        url: localStorage.serverurl+'log/getlogsystem',
        extraParams:{
            statustype:"发送消息" ,
            bgday : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -5),'Y-m-d'),
            edday :  Ext.Date.format(new Date(),'Y-m-dTH:i:s')
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});