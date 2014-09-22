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
            multiSelect: true,
            viewConfig: {
                trackOver: true,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,

                stripeRows: true
            },

            forceFit: true,
            columns: [

                {header: '是否启用',  xtype : 'checkcolumn', dataIndex: 'is_active'},
                {header: '来源',dataIndex: 'source',width:60},
                {header: '震中地区',dataIndex: 'epicenter',width:120},
                {header: '条件',dataIndex: 'compare',width:60},
                {header: '条件值',dataIndex: 'comparedata',width:60},
                {header: '发送方式',dataIndex: 'comparedata',flex:1}

            ],
            flex: 1,
            tbar:[

                {
                    xtype:'button',
                    text:'新增',
                    action:'add'
                },
                {
                    xtype:'button',
                    text:'删除',
                    action:'add'
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'eqimmain.SendMsgConfigs',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'eqimmain.LogDutys'
        });
        me.callParent(arguments);
    }
});