Ext.define('EqimPrj.view.eqimmain.SendMsgUsersGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.sendmsgusersgrid',
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


                {header: '是否启用',   dataIndex: 'id',hidden:true},
                {header: '姓名',dataIndex: 'username',width:60},
                {header: '手机',dataIndex: 'tel',width:120}

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
                store: 'eqimmain.SendMsgUsers',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'eqimmain.SendMsgUsers'
        });
        me.callParent(arguments);
    }
});