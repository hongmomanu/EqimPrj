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
            layout: 'fit',
            defaults: {
                labelAlign: 'top'
            },

            // The fields

            items:[
                {
                    xtype:'panel'
                }
            ]
        });
        me.callParent(arguments);
    }
});