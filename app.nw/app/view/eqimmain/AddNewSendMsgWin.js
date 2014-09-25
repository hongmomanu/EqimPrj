/**
 * Created by jack on 14-9-22.
 */

Ext.define('EqimPrj.view.eqimmain.AddNewSendMsgWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewsendmsgwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增发送条件',
            height: 500,
            width: 520,
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
                        xtype: 'combobox',
                        fieldLabel: '是否启用',
                        queryMode: 'local',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        displayField: 'name',
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":false, "name":"不启用"},
                                {"value":true, "name":"启用"}
                            ]
                        }),
                        valueField: 'value',
                        name: 'is_active'
                    },
                    {
                        xtype: 'textfield',
                        name:'source',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        fieldLabel: '来源'
                    },
                    {
                        xtype: 'textfield',
                        name: 'epicenter',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        fieldLabel: '震中地区'
                    },
                    {
                        xtype: 'combobox',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        store:Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":">=", "name":">="},
                                {"value":"<=", "name":"<="},
                                {"value":"<", "name":"<"},
                                {"value":">", "name":">"}
                            ]
                        }),
                        valueField: 'value',
                        displayField: 'name',
                        fieldLabel: '条件',
                        name: 'compare'
                    },
                    {
                        xtype: 'textfield',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'comparedata',
                        fieldLabel: '条件值'
                    },
                    {
                        xtype: 'combobox',
                        required:true,
                        allowBlank:false,
                        multiSelect: true,
                        afterLabelTextTpl: required,
                        store:Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":"0", "name":"短信"},
                                {"value":"1", "name":"微博"},
                                {"value":"2", "name":"网站"}
                            ]
                        }),
                        valueField: 'value',
                        displayField: 'name',
                        fieldLabel: '发送方式',
                        name: 'sendmethod'
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



