/**
 * Created by jack on 14-04-18.
 */

//启动窗口最大化
var gui = require('nw.gui');
var win = gui.Window.get();
win.maximize();


win.on('close', function() {
    //this.hide(); // Pretend to be closed already
    //console.log("We're closing...");
    var me=this;
    Ext.MessageBox.confirm('提示', '你确定关闭程序么?', function(btn){
        if(btn=="yes"){
          me.close(true);
        }else{
          //this.close(false);
        }
    });

    //this.close(true);
});

/*
var os = require("os");
var c = require('child_process');
var platform=os.platform();
var path = require('path');
var serverpath=path.dirname(process.execPath);
serverpath=path.dirname(path.dirname(path.dirname(serverpath)))+"/server/lumprj-0.1.0-SNAPSHOT-standalone.jar";
//alert(serverpath);
if(platform.indexOf('linux')>=0){
    c.exec('xfce4-terminal  -x bash -c "java -jar '+serverpath+'; exec bash"')
}else if(platform.indexOf('win')>=0){
    //alert(2);
    c.exec('cmd.exe /c start java -jar ' +serverpath);
}else{

}
*/
