/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('EqimPrj.controller.EqimMain', {
    extend: 'Ext.app.Controller',
    views: [
         'eqimmain.MainPanel',
         'eqimmain.EarthListGrid',
         'eqimmain.ConfigWin',
         'eqimmain.LogListGrid',
         'eqimmain.AddNewSendMsgWin',
         'eqimmain.EditSendMsgWin',
         'eqimmain.SendMsgUsersGrid',
         'eqimmain.AddNewSendUserWin',
         'eqimmain.EditSendUserWin',
         'eqimmain.ManualSendMsgWin',
         'eqimmain.SendMsgConfigGrid'
    ],
    models: [
         'eqimmain.LogDuty',
         'eqimmain.SendMsgUser',
         'eqimmain.SendMsgConfig'

    ],
    stores: [
          'eqimmain.LogDutys' ,
          'eqimmain.SendMsgConfigs',
          'eqimmain.SendMsgUsers'
    ],

    init: function() {
        Ext.Ajax.timeout=3600000;
        this.control({
           /*'mainpanel button[action=relation_begin]':{
               click: this.relation_begin
           }, */
            'mainpanel':{
                afterrender: this.layoutfunc,
                afterlayout:this.afterlayout
            },
            'configwin button[action=save]':{
                click: this.savesendmsgconfig
            },
            'addnewsendmsgwin button[action=add]':{
                click: this.addnewsendmsg
            },
            'earthlistgrid':{
                itemclick: this.showMap
            },
            'sendmsgconfiggrid button[action=add]':{
                click: this.showAddNewSendWin
            },'sendmsgconfiggrid button[action=del]':{
                click: this.delsendmsgconfig
            },
            'sendmsgusersgrid button[action=add]':{
                click: this.showAddNewSendUsersWin
            },
            'sendmsgusersgrid button[action=del]':{
                click: this.delsenduser
            },
            'sendmsgusersgrid button[action=edit]':{
                click: this.editsenduserwin
            },
            'sendmsgconfiggrid button[action=edit]':{
                click: this.editsendmsgwin
            },
            'editsendmsgwin button[action=save]':{
                click: this.savesendmsg
            },
            'editsenduserwin button[action=save]':{
                click: this.savesenduser
            },
            'addnewsenduserwin button[action=add]':{
                click: this.addnewsenduser
            },
            'manualsendmsgwin button[action=send]':{
                click: this.manualsend
            },
            'mainpanel menuitem[action=configwin]':{
                click: this.showServerWin
            },
            'mainpanel menuitem[action=openuserswin]':{
                click: this.showUsersWin
            },
            'mainpanel menuitem[action=closevoice]':{
                click: this.closevoice
            },
            'mainpanel button[action=manualsend]':{
                click: this.showmanualwin
            },

            'mainpanel image': {
                voiceclick: this.voiceclick,
                playsendmessageclick:this.playsendmessageclick
            },
            'mainpanel menuitem[action=refresh]':{
                click: this.refreshwin
            },
            'mainpanel menuitem[action=close]':{
                click: this.closewin
            },
            'mainpanel menuitem[action=openconfigwin]':{
                click: this.openconfigwin
            }

        });

    },
    closevoice_state:true,
    sendmessag_state:false,
    closewin:function(btn){
        Ext.MessageBox.confirm('提示', '你确定关闭程序么?', function(btn){
            if(btn=="yes"){
                win.close(true);
            }else{
                //this.close(false);
            }
        });
    },
    refreshwin:function(btn){
      window.location.reload();
    },
    openconfigwin:function(btn){
        if(!this.configwin){
            this.configwin= Ext.widget('configwin');
        }
        this.configwin.show();
        var form =this.configwin.down('form').getForm();
        if(!localStorage.websiteurl)localStorage.websiteurl='http://www.zjdz.gov.cn/webservice/articleapi.asmx?op=QuickInsert' ;
        if(!localStorage.weibousername)localStorage.weibousername='liaolongshiwo@163.com';
        if(!localStorage.weibopassword)localStorage.weibopassword='long090909';
        form.setValues({"weibousername":localStorage.weibousername,
            "weibopassword":localStorage.weibopassword,
            "websiteurl":localStorage.websiteurl});


    },
    showAddNewSendWin:function(btn){
        if(!this.newsendwin)this.newsendwin= Ext.widget('addnewsendmsgwin');
        this.newsendwin.show();

    },
    showAddNewSendUsersWin:function(btn){
        if(!this.newsenduserwin)this.newsenduserwin= Ext.widget('addnewsenduserwin');
        this.newsenduserwin.show();

    },

    editsenduserwin:function(btn){
        var selectitem=btn.up('panel').getSelectionModel().getLastSelected();
        if(!selectitem){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        if(!this.myeditsenduserwin)this.myeditsenduserwin= Ext.widget('editsenduserwin');
        this.myeditsenduserwin.show();

        var item=selectitem.data;
        var form=this.myeditsenduserwin.down('form').getForm();
        form.setValues(item);
    },
    editsendmsgwin:function(btn){

        var selectitem=btn.up('panel').getSelectionModel().getLastSelected();
        if(!selectitem){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        if(!this.myeditsendmsgwin)this.myeditsendmsgwin= Ext.widget('editsendmsgwin');
        this.myeditsendmsgwin.show();

        var item=selectitem.data;

        item.sendmethod=eval(item.sendmethod);
        var form=this.myeditsendmsgwin.down('form').getForm();

        form.setValues(item);
    },
    manualsend:function(btn){
      var form=btn.up('window').down('form').getForm();
      var me=this;
      if(form.isValid()){
         var sendways=form.getValues().sendway;
          if(!sendways||sendways.length==0){
              Ext.Msg.alert("提示信息","请至少选择一个发送方式!");
          }else{
              if(sendways.indexOf("0")>=0){
                 me.sendTelDetai(form.getValues().content);
              }if(sendways.indexOf("1")>=0){
                  me.sendWeiBoDetai(form.getValues().content);
              }

              /*if(sendways.indexOf("2")>=0){
                  me.sendWebDetai(form.getValues().content);
              }*/
          }
      }else{
          Ext.Msg.alert("提示信息","请填写发送内容!");
      }

    },
    addnewsenduser:function(btn){
        var url='log/insertSendMsgUsers';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.userwin.down('grid');
            btn.up('window').close();
            grid.getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")
    },
    savesenduser:function(btn){
        var url='log/updateSendUserConfig';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.userwin.down('grid');
            var win=btn.up('window').close();
            grid.getStore().load();
            grid.getSelectionModel().deselectAll();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")
    },
    savesendmsg:function(btn){
        var url='log/updateSendMsgConfig';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.configwin.down('grid');
            var win=btn.up('window').close();

            grid.getStore().load();
            grid.getSelectionModel().deselectAll();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")
    },
    delsenduser:function(btns){
        var me=this;
        var selectitem=btns.up('panel').getSelectionModel().getLastSelected();
        if(!selectitem){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '你确定删除所选项目?', function(btn){
            if(btn=="yes"){
                var url='log/delSendMsgUsers';

                var successFunc = function (form, action) {
                    var grid=btns.up('window').down('grid');
                    grid.getStore().load();
                    grid.getSelectionModel().deselectAll();
                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息",action.result.msg);
                };

                var item={};
                item.id=selectitem.data.id;
                CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");
            }else{
                //this.close(false);
            }
        });

    },
    delsendmsgconfig:function(btn){
        var me=this;
        var selectitem=btn.up('panel').getSelectionModel().getLastSelected();
        if(!selectitem){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '你确定删除所选项目?', function(btn){
            if(btn=="yes"){
                var url='log/delSendMsgConfig';

                var successFunc = function (form, action) {
                    var grid=me.configwin.down('grid');
                    grid.getStore().load();
                    grid.getSelectionModel().deselectAll();

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息",action.result.msg);
                };

                var item={};


                item.id=selectitem.data.id;
                CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");
            }else{
                //this.close(false);
            }
        });

    },
    savesendmsgconfig:function(btn){
        var grid=btn.up('window').down('grid');
        var url='log/updateSendMsgConfig';
        var store=grid.getStore();
        var me=this;

        var form =btn.up('window').down('form');

        localStorage.weibousername=form.getValues().weibousername;
        localStorage.weibopassword=form.getValues().weibopassword;
        localStorage.websiteurl=form.getValues().websiteurl;


        var changed_data=store.getModifiedRecords();
        me.count=0;
        for(var i=0;i<changed_data.length;i++){
            var successFunc = function (form, action) {
                var grid=me.configwin.down('grid');
                me.count++;
                if(me.count==changed_data.length){
                    grid.getStore().load();
                    grid.getSelectionModel().deselectAll();

                }
            };
            var failFunc = function (form, action) {
                Ext.Msg.alert("提示信息",action.result.msg);
            };
            var form = btn.up('form');
            var item={};
            item.id=changed_data[i].data.id;
            item.is_active= changed_data[i].data.is_active;
            CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post")
        }

        Ext.Msg.alert("提示信息","保存成功!");



    },
    addnewsendmsg:function(btn){
        var url='log/insertSendMsgConfig';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.configwin.down('grid');
            var win=btn.up('window').close();
            grid.getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")
    },
    showMap:function(grid, record){
       this.showMaplocation(record.data);
    },
    isplacein:function(location,epicenter){
        if(!epicenter||epicenter.replace(/\s+/g,"")==""){
            return true;
        }
        var iscontain=false;
        var arrs=epicenter.split(",");
        for(var i=0;i<arrs.length;i++){
            if(location.indexOf(arrs[i])>=0){
                iscontain=true;
                break;
            }
        }

       return  iscontain;
    },
    contentFormat:function(data,type){
      var content ="";
      var code_name="";
      var time=new Date(data.time);

      if(data.code=="AU"){
          code_name="中国地震台网中心"+type
      }else if(data.code=="GD"){
          code_name="广东省地震局"+type
      }else if(data.code=="FJ"){
          code_name="福建省地震局"+type
      }
      content=code_name+"："+(time.getMonth()+1)+"月"+(time.getDate())+
          "日"+(time.getHours()<10?"0"+time.getHours():time.getHours())+"时"+
          (time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+"分"+
          data.location
          +"附近（"+(data.lat>=0?"北纬":"南纬")+Math.abs(data.lat).toFixed(1)+"度，"
          +(data.lon>=0?"东经":"西经")+Math.abs(data.lon).toFixed(1)+"度）发生"+data.M+"级左右地震，最终结果以正式速报为准。";
      return content;
    },
    sendTelDetai:function(content){
        var url='log/sendtelmsg';

        var successFunc = function (form, action) {
            Ext.Msg.alert("提示信息","短信发送成功");
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };

        var item={};

        item.content=content;
        CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");

    },
    sendTel:function(data,type){
        console.log("TEL");
        var content=this.contentFormat(data,type);
        this.sendTelDetai(content);

    },
    makelog:function(data,type){

        var content=this.contentFormat(data,type);
        var url='duty/senddutylogs';
        var data={
            statustype:"发送消息",
            logcontent:content};
        var params={
            systemlogs:Ext.JSON.encode(data)
        };
        var successFunc = function (response, action) {
            Ext.getStore('eqimmain.LogDutys').load();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "失败!");
        };
        CommonFunc.ajaxSend(params, url, successFunc, failFunc, "post");

    },
    sendWebDetai:function(content){
        if(localStorage.websiteurl){
            var url='log/sendsoap';
            var successFunc = function (form, action) {
                Ext.Msg.alert("提示信息","网页发布成功");
            };
            var failFunc = function (form, action) {
                Ext.Msg.alert("提示信息","发布失败");
            };
            var item={};
            item.url=localStorage.websiteurl;
            item.content=content;
            CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");
        }else{

            Ext.Msg.alert("提示信息","网站发布失败，查看地址是否正确");
        }

    },
    sendWeb:function(data,type){
        console.log("wangye");
        content=this.contentFormat(data,type);
        var itemcontent='<?xml version="1.0" encoding="utf-8"?>'+
            '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
             +'<soap12:Body>'
            /*+'<GetAllCatalogList xmlns="http://www.zjdz.gov.cn/">'
            +'<username>ZJDZ</username>'
            +'<password>L9dP2kaB</password>'
                +'</GetAllCatalogList>'*/
            +'<QuickInsert xmlns="http://www.zjdz.gov.cn/">'
            +'<username>ZJDZ</username>'
            +'<password>L9dP2kaB</password>'
            +'<title>'+content+'</title>'
            +'<cid>371</cid>'
            +'<summary></summary>'
            +'<content>'+content+'</content>'
            +'<preview></preview>'
            +'<author></author>'
            +'<source></source>'
            +'<coordinate>'+data.lon.toFixed(3)+','+data.lat.toFixed(3)+'</coordinate>'
            +'<published>'+Ext.Date.format(new Date(),'Y-m-d H:i:s').replace(" ","T")+'</published>'
            +'</QuickInsert>'
            +'</soap12:Body>'
            +'</soap12:Envelope>';
        //item.action="http://www.zjdz.gov.cn/GetAllCatalogList";
        //item.action="http://www.zjdz.gov.cn/QuickInsert";
        //item.url="http://www.zjdz.gov.cn/webservice/articleapi.asmx?op=GetAllCatalogList";
        //item.url="http://www.zjdz.gov.cn/webservice/articleapi.asmx?op=QuickInsert";
        //CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");
        this.sendWebDetai(itemcontent);

    },
    sendWeiBoDetai:function(content){
        var url='log/sendweibo';

        var successFunc = function (form, action) {
            Ext.Msg.alert("提示信息","微博发布成功");
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息","发布失败");
        };

        var item={};
        item.username=localStorage.weibousername;
        item.password=localStorage.weibopassword;
        item.content=content;
        item.content="#地震快讯#"+ item.content;
        if(item.password&&item.password){
            CommonFunc.ajaxSend(item, url, successFunc, failFunc, "post");
        }else{
            Ext.Msg.alert("提示信息","微博发布失败,查看用户密码是否正确");
        }

    },
    sendWeiBo:function(data,type){
        console.log("weibo");
        var content=this.contentFormat(data,type);
        this.sendWeiBoDetai(content);
    },
    sendMsg:function(data){
        console.log(data);
        var configdata=Ext.StoreMgr.get('eqimmain.SendMsgConfigs').data.items;
        var filterdata=[];
        for(var i=0;i<configdata.length;i++){
            if(configdata[i].data.is_active)filterdata.push(configdata[i].data);
        }
        for(var i=0;i<filterdata.length;i++){
            if(data.code==filterdata[i].source&&
                eval(data.M+filterdata[i].compare+filterdata[i].comparedata)
                && this.isplacein(data.location, filterdata[i].epicenter)
                ){
                 if(filterdata[i].sendmethod.indexOf(0)>=0){
                     this.sendTel(data,"自动测定");
                 }
                if(filterdata[i].sendmethod.indexOf(1)>=0){
                     this.sendWeiBo(data,"自动测定");
                 }
                if(filterdata[i].sendmethod.indexOf(2)>=0){
                     this.sendWeb(data,"自动测定");
                 }
                break;

            }
        }

    },
    showMaplocation:function(data){
        this.map.panTo(new L.LatLng(data.lat,data.lon));
        if(this.popupmarker)this.map.removeLayer(this.popupmarker);
        var marker=L.marker([data.lat,data.lon]).addTo(this.map)
            .bindPopup("<ul><li>发震时刻:"+data.time+"</li><li>地名:"
                +data.location+"</li><li>震级:M"+ data.M+', Ml'
            +data.Ml+', Ms'+ data.Ms+
        "</li><li>深度:"+data.depth+"km</li></ul>").openPopup();
        this.popupmarker=marker;

    },
    voiceclick:function(btn){

        if(this.closevoice_state){
            this.closevoice_state=false;
            if(this.audioplay)this.audioplay.pause();
            btn.setSrc(localStorage.serverurl+'images/mute.png');
        }
        else {
            this.closevoice_state=true;
            btn.setSrc(localStorage.serverurl+'images/sound.png');
        }
    },
    playsendmessageclick:function(btn){
        if(this.sendmessag_state){
            this.sendmessag_state=false;
            btn.setSrc(localStorage.serverurl+'images/play.png');
        }
        else {
            this.sendmessag_state=true;
            btn.setSrc(localStorage.serverurl+'images/pause.png');
        }

    },
    closevoice:function(btn){

      if(this.closevoice_state)this.closevoice_state=false;
       else this.closevoice_state=true;
    },
    showmanualwin:function(btn){
        //alert(11);
        testobj=this;
        if(!this.manualsendmsgwin)this.manualsendmsgwin= Ext.widget('manualsendmsgwin');
        this.manualsendmsgwin.show();

    },
    showUsersWin:function(btn){

        if(!this.userwin){
            var win=Ext.create('Ext.window.Window', {
                title: '人员配置',
                height: 200,
                closeAction : 'hide',
                width: 400,
                layout: 'fit',
                items: {  // Let's put an empty grid in just to illustrate fit layout
                    xtype: 'sendmsgusersgrid'
                }
            })              ;
            this.userwin= win;
        }
        this.userwin.show();
    },
    showServerWin:function(btn){
        Ext.MessageBox.show({
            title: '服务地址',
            msg: '服务地址:',
            width:300,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            value:localStorage.serverurl?localStorage.serverurl:"http://localhost:3000/",
            fn: function (btn,text){
                if(btn==="ok"){
                    localStorage.serverurl=text;
                }

            }
        });
    },
    afterlayout:function(panel){
        testobj=this;
        if(this.map)this.map.invalidateSize(true);

    },

    gridwebsocket:function(panel){
        var me=this;
       var grid=panel.down('grid');
       var store=grid.getStore();
       var url=localStorage.serverurl;
        url=url?url:"http://localhost:8080/lumprj/";
        /*url=url?"ws://"+url+"/":"ws://localhost:3001/";*/
        if(url.indexOf("http")<0){
            url="http://"+url;
        }
       url=url.replace(/(:\d+)/g,":3001");
       url=url.replace("http","ws");

       var socket = new WebSocket(url);
       var me=this;
       socket.onmessage = function(event) {
           var data=event.data;
           data=JSON.parse(data);
           if(data.type==="eqim"){

               if(data['location'].indexOf('测试')<0){
                   store.add(data);
                   me.showMaplocation(data);

                   var resoreceurl=localStorage.serverurl+"audio/eqim.wav";
                   var play=new Audio(resoreceurl);
                   me.audioplay=play;
                   if(me.closevoice_state)play.play();
                   if(me.sendmessag_state){
                       me.sendMsg(data);
                       me.makelog(data,"自动测定");
                   }

               }

           }


       };

        socket.onclose = function(event) {
            panel.down('#connectinfo').update('<font color="red">连接断开，正在尝试建立连接。。。</font>');

            var d = new Ext.util.DelayedTask(function(){
                me.gridwebsocket(panel);
            });
            d.delay(5000);

        };

        socket.onopen = function(event) {
            panel.down('#connectinfo').update('<font color="green">连接正常!</font>');
        };




    },
    layoutfunc:function(panel){
       this.gridwebsocket(panel);
       var me=this;
        var d = new Ext.util.DelayedTask(function(){
            //console.log($('#map').height());
            //console.log($('#map').width());


            var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

            });
            var baseLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png', {
                attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

            });
            var  ter = L.tileLayer("http://t0.tianditu.cn/ter_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 4,
                maxZoom: 18
            });

            var tdt = L.tileLayer("http://t0.tianditu.cn/vec_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 4,
                maxZoom: 18
            });

            var lt2 = L.tileLayer("http://t0.tianditu.com/cva_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 4,
                maxZoom: 18
            });
            var baseMaps = {
                'OSM底图':osmLayer,
                '天地图底图':tdt,
                "Mapbox": baseLayer,
                '天地图地形':ter
            };
            var overlayMaps = {
                "标注": lt2
            };
            me.map = new L.Map('map', {center: [30.274089,120.15506900000003], zoom: 8, layers: [osmLayer]});
            var map=me.map;
            /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);*/
            var layersControl = new L.Control.Layers(baseMaps,overlayMaps);
            map.addControl(layersControl);
            L.Control.measureControl().addTo(map);

            var NewControl = L.Control.extend({
                options: {
                    position: 'bottomleft'
                },

                onAdd: function (map) {
                    this._map = map;

                    var className = 'leaflet-hax',
                        container = L.DomUtil.create('div', className);
                    container.innerHTML = '<input class="span2" type="text" id="quickpanto" style="width: 120px;" value="30.274,120.155" />';


                    //if (!L.Browser.touch) {
                    //    alert('1');
                    L.DomEvent.disableClickPropagation(container);
                    //} else {
                    //    alert('2');
                    //    L.DomEvent.addListener(container, 'click', L.DomEvent.stopPropagation);
                    //}

                    return container;
                }
            });

            map.addControl(new NewControl());
            map.on('moveend', function(){
                var center = (map.getCenter());
                $('#quickpanto').val(center.lat.toFixed(3)+","+center.lng.toFixed(3));

            });

            $('#quickpanto').keyup(function(e){
                if(e.keyCode == 13)
                {
                    var lonlat=$('#quickpanto').val();
                    map.panTo([lonlat.split(",")[0],lonlat.split(",")[1]]);
                    var url=localStorage.serverurl;
                    var LeafIcon = L.Icon.extend({
                        options: {
                            shadowUrl:(url+"images/shadow.jpg"),
                            popupAnchor:  [8, 0]
                        }
                    });
                    var greenIcon = new LeafIcon({iconUrl: url+"images/green.jpg"});
                    var marker=L.marker([lonlat.split(",")[0],lonlat.split(",")[1]],{icon: greenIcon}).addTo(map)
                        .bindPopup('当前的位置 ' +lonlat+'<br> ')
                        .openPopup();

                    marker.on('popupclose', function(e) {
                        //alert(1);
                        try{
                            map.removeLayer(marker);
                        }catch(err) {

                        }

                    });
                }
            });


            /*L.marker([ 30.274089,120.15506900000003]).addTo(map)
                .bindPopup("<b>你好!</b><br />地震中心.").openPopup();*/

            /*L.circle([ 30.294089,120.15806900000003], 500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).addTo(map).bindPopup("圆.");

            L.polygon([
                [30.274089,120.15506900000003],
                [30.284089,120.15806900000003],
                [30.270089,120.15406900000003]
            ]).addTo(map).bindPopup("多边形测试.");
*/

            var popup = L.popup();

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("当前的位置 " + e.latlng.toString())
                    .openOn(map);
            }

            map.on('click', onMapClick);

        });
        d.delay(500);


    }


});
