/**
 * Created by jack on 14-9-22.
 */

Ext.define('EqimPrj.view.eqimmain.AddNewSendUserWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewsenduserwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增',
            height: 200,
            width: 300,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                xtype: 'form',

                layout: {
                    type: 'vbox',

                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                //xtype: 'fieldset',

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },

                items: [

                    {
                        xtype: 'textfield',
                        name: 'username',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        fieldLabel: '用户名'
                    },

                    {
                        xtype: 'textfield',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'tel',
                        fieldLabel: '手机号'
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
                        text: '新增',
                        action: 'add'

                    }
                ],
                border: false

            }

        });
        this.callParent(arguments);
    }

});



