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
            }

        });

    },
    afterlayout:function(panel){
        if(this.map)this.map.invalidateSize(true);

    },
    layoutfunc:function(panel){
       var me=this;
        var d = new Ext.util.DelayedTask(function(){
            //console.log($('#map').height());
            //console.log($('#map').width());
            me.map = L.map('map').setView([30.274089,120.15506900000003], 13);
            var map=me.map;
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);


            L.marker([ 30.274089,120.15506900000003]).addTo(map)
                .bindPopup("<b>你好!</b><br />地震中心.").openPopup();

            L.circle([ 30.294089,120.15806900000003], 500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).addTo(map).bindPopup("圆.");

            L.polygon([
                [30.274089,120.15506900000003],
                [30.284089,120.15806900000003],
                [30.270089,120.15406900000003]
            ]).addTo(map).bindPopup("多边形测试.");


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
