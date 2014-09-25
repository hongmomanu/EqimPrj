Ext.define('EqimPrj.view.eqimmain.SendMsgConfigGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.sendmsgconfiggrid',
    layout: 'fit',
    requires: [
    ],
    initComponent: function() {
        var me = this;

        Ext.apply(me, {

            border: false,
            //hideHeaders:true,
            //multiSelect: true,
            viewConfig: {
                /*trackOver: true,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,

                stripeRows: true*/
            },
            //selModel: selModel,
            forceFit: true,
            columns: [

                {header: '是否启用',  xtype : 'checkcolumn',dataIndex: 'is_active'
                },

                {header: '是否启用',   dataIndex: 'id',hidden:true},
                {header: '来源',dataIndex: 'source',width:60},
                {header: '震中地区',dataIndex: 'epicenter',width:120},
                {header: '条件',dataIndex: 'compare',width:60},
                {header: '条件值',dataIndex: 'comparedata',width:60},
                {header: '发送方式',dataIndex: 'sendmethod',flex:1,renderer : function(v,m,r) {

                    var str="";
                    if(v.indexOf("0")>=0)str+=" 短信";
                    if(v.indexOf("1")>=0)str+=" 微博";
                    if(v.indexOf("2")>=0)str+=" 网站";
                    return str;
                }}

            ],

            tbar:[

                {

                    text:'新增',
                    action:'add'
                },
                {
                    text:'编辑',
                    action:'edit'

                },
                {

                    text:'删除',
                    action:'del'
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'eqimmain.SendMsgConfigs',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'eqimmain.SendMsgConfigs'
        });
        me.callParent(arguments);
    }
});