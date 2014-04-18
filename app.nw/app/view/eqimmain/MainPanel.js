Ext.define('EqimPrj.view.eqimmain.MainPanel', {
    extend: 'Ext.panel.Panel',
    alias:'widget.mainpanel',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {
            //title: '数据相关测试',
            bodyPadding: 15,
            layout: 'border',
            defaults: {
                labelAlign: 'top'
            },
            tbar: [

                {
                    xtype: 'splitbutton',
                    text: '菜单',
                    hidden:true,
                    menu: [
                        {
                            text: '刷新',
                            action: 'refresh'

                        },{
                            text: '新增',
                            action: 'add'
                        }
                    ]
                }
            ],
                    // The fields

            items:[
                {
                    region: 'west',
                    split: true,
                    title:'发震信息',
                    minWidth: 200,
                    width:200,
                    maxWidth: 300,
                    collapsible: true,
                    animCollapse: true,
                    xtype:'earthlistgrid'
                },
                {
                    region: 'center',
                    xtype:'panel',
                    itemId:'map',
                    html:'<div id="map" style="width: 100%; height: 100%"></div>'
                }
            ]
        });
        me.callParent(arguments);
    }
});