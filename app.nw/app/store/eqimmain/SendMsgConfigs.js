Ext.define('EqimPrj.store.eqimmain.SendMsgConfigs', {
    extend: 'Ext.data.Store',
    model: 'EqimPrj.model.eqimmain.SendMsgConfig',
    autoLoad:true,
    pageSize : 10,
    proxy:{
        type: 'ajax',
        url: localStorage.serverurl+'log/getSendMsgConfig',
        extraParams:{
            //statustype:"发送消息"
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});