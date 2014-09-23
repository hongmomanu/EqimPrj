Ext.define('EqimPrj.store.eqimmain.SendMsgUsers', {
    extend: 'Ext.data.Store',
    model: 'EqimPrj.model.eqimmain.SendMsgUser',
    autoLoad:true,
    pageSize : 10,
    proxy:{
        type: 'ajax',
        url: localStorage.serverurl+'log/getSendMsgUsers',
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