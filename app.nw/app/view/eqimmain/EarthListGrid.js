Ext.define('EqimPrj.view.eqimmain.EarthListGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.earthlistgrid',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {
            //title: '数据相关测试',
            border: false,
            hideHeaders:true,
            multiSelect: true,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true
            },
            columns: [
                {header: '详细信息',dataIndex: 'content',flex: 1}
            ],

            store: Ext.create('Ext.data.Store', {
                //alias: 'store.ModeStore',
                autoLoad: false,
                fields: [{
                    name: 'content',
                    type: 'string'
                }],
                data: [{
                    content: '<ul><li>地名:杭州</li><li>深度:10km</li><li>震级类型:ML</li><li>震级:M</li>' +
                        '<li>经纬度:120.158,30.294</li><li>发震时刻:2014-12-20 14:00:22</li><li>信息类型:CC</li></ul>'
                        ,
                    id: 1
                }]
            })

        });
        me.callParent(arguments);
    }
});