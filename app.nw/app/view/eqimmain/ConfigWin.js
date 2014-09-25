/**
 * Created by jack on 14-9-22.
 */

/**
 * Created by jack on 14-2-18.
 */

Ext.define('EqimPrj.view.eqimmain.ConfigWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.configwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '发送配置',
            height: 510,
            width: 720,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                xtype: 'form',

                bodyPadding: 10,
                //xtype: 'fieldset',

                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                items: [
                    {
                        xtype:'fieldset',
                        flex:1,

                        title: '微博帐号',

                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                    items:[

                        {
                            xtype: 'textfield',
                            fieldLabel: '帐号',
                            required:true,
                            allowBlank:false,
                            afterLabelTextTpl: required,
                            name: 'weibousername'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '密码',
                            required:true,
                            allowBlank:false,
                            afterLabelTextTpl: required,
                            name: 'weibopassword'
                        }

                         ]
                    },
                    {
                        xtype:'fieldset',
                        flex:1,

                        title: '网站接口',

                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                fieldLabel: '地址',
                                required:true,
                                allowBlank:false,
                                afterLabelTextTpl: required,
                                name: 'websiteurl'
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        flex:3,
                        title: '发送条件',

                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                    items:[

                        {
                            xtype: 'sendmsgconfiggrid'

                        }

                         ]
                    }

                ],
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                            this.up('window').hide();
                        }
                    } ,
                    {
                        text: '保存',
                        action: 'save'

                    }
                ],
                border: false

            }

        });
        this.callParent(arguments);
    }

});