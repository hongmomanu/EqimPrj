Ext.define('EqimPrj.view.eqimmain.LogListGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.loglistgrid',
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
                {header: '事件内容', dataIndex: 'logcontent',flex:1},

                {header: '日志时间',dataIndex: 'time',width:130}
            ],
            flex: 1,
            tbar:[

                {
                    xtype:'datefield',
                    width:120,
                    itemId:'bgday',
                    value: Ext.Date.add(new Date(), Ext.Date.DAY, -5),

                    name: 'bgday'
                },{
                    xtype:'datefield',
                    itemId:'edday',
                    width:120,
                    value:new Date(),

                    name: 'edday'
                },{
                    xtype:'button',
                    text:'搜索',
                    handler: function() {
                        var panel=this.up('panel');
                        var store=panel.getStore();
                        var bgday=panel.down('#bgday').getValue();
                        var edday=panel.down('#edday').getValue();

                        store.proxy.extraParams.bgday = Ext.Date.format(new Date(bgday),'Y-m-d');
                        store.proxy.extraParams.edday = edday;
                        store.loadPage(1);
                    }
                    //action:'search'
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'eqimmain.LogDutys',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'eqimmain.LogDutys'
        });
        me.callParent(arguments);
    }
});