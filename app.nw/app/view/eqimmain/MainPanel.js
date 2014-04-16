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

            // The fields

            items:[
                {
                    region: 'west',
                    split: true,
                    width: 200,
                    title:'发震信息',
                    minWidth: 175,
                    maxWidth: 400,
                    collapsible: true,
                    animCollapse: true,
                    xtype:'panel'
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