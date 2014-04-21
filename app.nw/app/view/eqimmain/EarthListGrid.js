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
                {header: '详细信息',dataIndex: 'location',flex: 1,renderer : function(v,m,r) {
                    var str='<ul><li>地名:'+ r.get('location')+'</li><li>深度:'+ r.get('depth')+
                        '</li><li>震级类型:'+ r.get('Ml')+'</li><li>震级:'+ r.get('M')+'</li>' +
                        '<li>经纬度:'+ r.get('lon')+','+ r.get('lat')+'</li><li>发震时刻:'+
                        r.get('time')
                        +'</li><li>信息类型:'+ r.get('infotype')+'</li></ul>';
                    return str;
                }}
            ],

            store: Ext.create('Ext.data.Store', {
                //alias: 'store.ModeStore',
                autoLoad: false,
                fields: [
                    {name: 'location',
                        type: 'string'},
                    {name:'lat',
                        type: 'string'},
                    {name:'lon',
                        type: 'string'},
                    {name:'depth',
                        type: 'string'},
                    {name:'eqtype',
                        type: 'string'},
                    {name:'M',
                        type: 'string'},
                    {name:'Ml',
                        type: 'string'},
                    {name:'Ms',
                        type: 'string'},
                    {name:'time',
                        type: 'string'},
                    {name:'infotype',
                        type: 'string'}
                ],
                data: [
                    /*{
                    location :"杭州",
                    lat :30.294,
                    lon:120.158,
                    depth:"10km",
                    Ml:"ML",
                    M:'M',
                    Ms:'Ms',
                    time:'2014-12-20 14:00:22',
                    infotype:'CC'
                }*/

                ]
                , sorters: { property: 'time', direction : 'DESC' }
            })

        });
        me.callParent(arguments);
    }
});