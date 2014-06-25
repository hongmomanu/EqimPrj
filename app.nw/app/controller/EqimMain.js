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
         'eqimmain.EarthListGrid'
    ],
    models: [

    ],
    stores: [

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
            'earthlistgrid':{
                itemclick: this.showMap
            },
            'mainpanel menuitem[action=configwin]':{
                click: this.showServerWin
            },
            'mainpanel menuitem[action=refresh]':{
                click: this.refreshwin
            },
            'mainpanel menuitem[action=close]':{
                click: this.closewin
            }

        });

    },
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
    showMap:function(grid, record){
       this.showMaplocation(record.data);
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
        if(this.map)this.map.invalidateSize(true);

    },

    gridwebsocket:function(panel){
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
               store.add(data);
               me.showMaplocation(data);
               var resoreceurl=localStorage.serverurl+"audio/eqim.mp3";
               var play=new Audio(resoreceurl);
               play.play();
           }


       }


    },
    layoutfunc:function(panel){
       this.gridwebsocket(panel);
       var me=this;
        var d = new Ext.util.DelayedTask(function(){
            //console.log($('#map').height());
            //console.log($('#map').width());


            var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',

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
            var baseMaps = {
                'OSM底图':osmLayer,
                "Mapbox": baseLayer,
                '天地图地形':ter
            };
            me.map = new L.Map('map', {center: [30.274089,120.15506900000003], zoom: 8, layers: [osmLayer]});
            var map=me.map;
            /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);*/
            var layersControl = new L.Control.Layers(baseMaps);
            map.addControl(layersControl);
            L.Control.measureControl().addTo(map);

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
