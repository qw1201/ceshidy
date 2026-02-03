startDyTask();

//任务线程
function startDyTask() {

    logd("设备ID: " + deviceID);
    if (readConfigString("guo")==="true"){
        logd("懂车帝关注");
        dbUrl="http://47.76.26.52:3000"//新数据库
        while (true){
            actionNum=0;
            DCDstartDy("首页");

            DCDopen_uid();//懂车帝关注，循环关注10个

            sleep(10000)

        }
    }else if(readConfigString("gang")==="true"){
        logd("汽水音乐关注");
        while (true){
            actionNum=0;
            QSstartDy("首页");

            QSopen_uid();//汽水音乐关注，循环关注10个

            sleep(10000)
        }
    }else if(readConfigString("browser")==="true"){
        // if(readConfigString("state")==='2'){
        //     //运行模式是测试的时候，选择浏览器试试抖音备份
        //     logd("执行备份抖音任务");
        //     utiszip();
        // }else {
        //     logd("浏览器留痕任务");
        //     while (true){

        //         chrome_secuid();//浏览器留痕代码，循环访问10个

        //         sleep(10000)
        //     }
        // }
        logd("抖音关注");
        while (true){
            actionNum=0;
            startDy("首页");

            open_uid();//抖音关注，循环关注10个

            sleep(10000)
        }
    }else if(readConfigString("jiaqun")==="true"){
        if(readConfigString("state")==='2'){
            //运行模式是测试的时候，选择加群是抖音恢复
            logd("执行恢复抖音任务");
            unutiszip();
        }else {
            logd("无待执行任务");
            exit();
        }
    }
}

/*
启动抖音
@whichPage：首页/消息
 */
function startDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = descMatch(".*侧边栏.*").drawingOrder(4).getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                findNode(desc("已选中，推荐，按钮"),true,true);
                break;
            }
        }else if (whichPage==="消息"){
            let node = desc("消息，按钮").getOneNodeInfo(50000);
            if(node){
                if(findNode(desc("消息，按钮"),true,true)){
                    logd("消息已打开");
                    while (true){
                        sleep(1000);
                        if(findNode(descMatch(".*互动消息.*"))){
                            logd("到达顶部")
                            return;
                        }else if(findNode(descMatch(".*互动与关注消息.*"))){
                            logd("到达顶部")
                            return;
                        }else {
                            //向下划动半屏左右，寻找要置顶的群
                            logd("向下划动半屏左右")
                            moveHalfscreen(4,9,100);
                        }
                    }
                }
            }

        }

        if (shell.stopApp('com.ss.android.ugc.aweme')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.ugc.aweme");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
    while (true){
        if(findNode(descMatch(".*侧边栏.*").drawingOrder(4))){
            break;
        }else if(findNode(text("刷新"),true,true)){
            logd('刷新');
            sleep(5000);
        }
        logd('等待首页加载');
        sleep(1000);
    }
}

/*
港版抖音
@whichPage：首页/消息
 */
function startDy322(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = desc("首页，按钮").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                findNode(desc("首页，按钮"),true,true);
                break;
            }
        }else if (whichPage==="消息"){
            let node = desc("消息，按钮").getOneNodeInfo(50000);
            if(node){
                if(findNode(desc("消息，按钮"),true,true)){
                    logd("消息已打开");
                    while (true){
                        sleep(1000);
                        if(findNode(descMatch(".*互动消息.*"))){
                            logd("到达顶部")
                            return;
                        }else if(findNode(descMatch(".*互动与关注消息.*"))){
                            logd("到达顶部")
                            return;
                        }else {
                            //向下划动半屏左右，寻找要置顶的群
                            logd("向下划动半屏左右")
                            moveHalfscreen(4,9,100);
                        }
                    }
                }
            }

        }

        if (shell.stopApp('com.ss.android.ugc.aweme.mobile')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.ugc.aweme.mobile");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
    while (true){
        if(findNode(desc("已选中，推荐，按钮"))){
            break;
        }else if(findNode(text("刷新"),true,true)){
            logd('刷新');
            sleep(5000);
        }
        logd('等待首页加载');
        sleep(1000);
    }
}

/*
仿真划动，下拉半屏左右
 */
function moveHalfscreen(oldY,newY,longtimes) {
    if(findNode(desc("点击进入直播间按钮"))){
        logd("点击进入直播间");
        findNode(desc("已选中，推荐，按钮"),true,true);
    }else {
        let x = device.getScreenWidth() * 5 / 10;
        let x1 = device.getScreenWidth() * 5 / 10;
        let y = device.getScreenHeight() * oldY / 10;
        let y1 = device.getScreenHeight() * newY / 10;

        //自定义函数：仿真滑动屏幕，注意避开悬浮窗
        rnd_Swipe(x, y, x1, y1, longtimes, longtimes, 15)
    }
    sleep(1000);
}

//浏览器取留痕secUID
function get_secuid(id,Nums) {
    let dy_url = dbUrl_secuid+id+"/list?total="+Nums;
    let header = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"};
    let params = {
        "url": dy_url,
        "header":header,
        "method": "GET",
    };
    let x = http.request(params);
    if (x && x.statusCode===200) {
        let body = JSON.parse(x.body);
        let newdata=JSON.parse(body.Data)
        logd("本次取号数量："+newdata.length);
        return newdata;
    }else {
        return null;
    }
}

//dl取留痕UID
function dl_get_uid(deviceId,total) {
    let uids=dl.db.get_uid(deviceId,total);
    if(uids===1001){
        logd("设备ID错误");
        exit();
    }else if (uids===1002){
        logd("UID不足，休息延迟");
        sleep(random(30,60)*60000);
    }else if(uids===1003){
        logd("超出每日配额限制，休息延迟");
        sleep(random(30,60)*60000);
    }else if(uids===1004){
        logd("设备未授权");
        exit();
    }else if(uids===2001){
        logd("数据库错误");
        sleep(random(30,60)*60000);
    }else {
        logd("本次取号数量："+uids.length);
        return uids;
    }
}

//国留痕
function open_uid() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk1128://user/detail/"+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            follows();
            while (true){
                sleep(random(30,50)*100);
                let loopCount = Math.floor(Math.random() * 3) + 1;
                if(findNode(desc("已选中，推荐，按钮"))){
                    break;
                }else if(findNode(desc("推荐，已选中，按钮"))){
                    break;
                }else {
                    back();
                }
            }
            if (shenqingshu >= 200){
                logd(`今日关注到200结束运行`);
                exit();
            }else {
                logd(`今日总关注： ${shenqingshu} `);
            }
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

//港留痕
function open_uid322() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk664226://user/profile/"+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            gangaddactions(actionNum);
            while (true){
                sleep(random(30,50)*100);
                if(findNode(desc("首页，按钮"))){
                    let loopCount = Math.floor(Math.random() * 3) + 1;
                    for (let i = 0; i < loopCount; i++) {
                        logd(`这是第 ${i + 1} 次切换视频`);
                        sleep(random(10,50)*100);
                        moveHalfscreen(6,1,30);
                    }
                    break;
                }else if(findNode(text("刷新"),true,true)){
                    logd('刷新');
                }else {
                    back();
                }
            }
            logd(`今日总访问： ${shenqingshu} `);
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

//浏览器
function chrome_secuid() {
    let dy_Uid = get_secuid('ids',10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            laoleng.intent.openUrl("https://www.douyin.com/user/"+dy_Uid[i])
            lastaddtime = Date.now();
            shenqingshu++;
            logd("https://www.douyin.com/user/"+dy_Uid[i]);
            sleep(random(50,100)*100);
            while (true){
                sleep(random(50,100)*100);
                if(findNode(desc("App Store"))){
                    break;
                }else {
                    back();
                }
            }
            logd(`今日总访问： ${shenqingshu} `);
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

//关注、点赞、推荐
function addactions(f) {
    if(f !== 0 && f % 2 === 0){
        actionNum++;
        return true;
    }
    if (f === 0 && dianzan === 0){
        let node = clz("androidx.recyclerview.widget.RecyclerView").getOneNodeInfo(10000);//点击第一个作品
        if (node) {
            let x = node.click();
            sleep(random(20,30)*100);
            if(x){
                node = descMatch(".*未点赞，喜欢.*").getOneNodeInfo(10000);
                if (node) {
                    x = node.click();
                    logd('点赞:'+x);
                    actionNum++;
                    sleep(2000);
                    if(findNode(descMatch(".*未点赞，喜欢.*").clickable(true))){
                        dianzan=1;
                    }
                } else {
                    logd("未发现赞");
                }
            }
        }
    }else if(f === 1 && tuijian === 0 || f === 3 && tuijian === 0 || f === 5 && tuijian === 0){
        let node = clz("androidx.recyclerview.widget.RecyclerView").getOneNodeInfo(10000);//点击第一个作品
        if (node) {
            let x = node.click();
            sleep(random(20,30)*100);
            if(x){
                if(findNode(descMatch(".*分享.*"),true,true)){
                    sleep(random(30,50)*100);
                    if(findNode(text("推荐"),true,true)){
                        logd("已推荐");
                        actionNum++;
                        return true;
                    }else if(findNode(text("Creatures living in the ocean"))){
                        logd("滑块验证");
                        // tuijian=1;
                        // back();
                        sendMessage("滑块验证");
                    }else {
                        let selector = xpath("node[@clz='android.widget.FrameLayout']/node[@clz='android.widget.FrameLayout']/node[@clz='androidx.recyclerview.widget.RecyclerView']/node[@clz='android.widget.LinearLayout' and @index=0]\n");
                        let n = selector.getOneNodeInfo(1000);
                        if (n) {
                            logd("推荐："+n.click());
                            actionNum++;
                            return true;
                        }
                    }
                }
            }
        }
    }else {
        actionNum++;
    }
}

//港版关注、港版点赞、港版推荐
function gangaddactions(f) {
    if (f === 0 && dianzan === 0){
        let node = clz("androidx.recyclerview.widget.RecyclerView").getOneNodeInfo(10000);//点击第一个作品
        if (node) {
            let x = node.click();
            sleep(random(20,30)*100);
            if(x){
                node = descMatch(".*未点赞，喜欢.*").getOneNodeInfo(10000);
                if (node) {
                    x = node.click();
                    logd('点赞:'+x);
                    actionNum++;
                    sleep(2000);
                    if(findNode(descMatch(".*未点赞，喜欢.*").clickable(true))){
                        dianzan=1;
                    }
                } else {
                    logd("未发现赞");
                }
            }
        }
    }else {
        actionNum++;
    }
}

function checkState(){
    while (true){
        sleep(1000);
        if(findNode(desc("添加头像"))){
            logd('封号');
            sendMessage("封号")
        }else if (findNode(textMatch(".*点击添加介绍，让大家认识你.*"))){
            logd("掉签名");
            sendMessage("掉签名")
        }else if(findNode(desc("用户头像"))){
            logd('个人主页');
            break;
        }else if(findNode(desc("我，按钮"),true,true)){
            logd('个人主页');
            sleep(5000);
        }
    }

    while (true){
        sleep(random(30,50)*100);
        if(findNode(desc("已选中，推荐，按钮"))){
            break;
        }else if(findNode(desc("推荐，已选中，按钮"))){
            break;
        }else if(findNode(text("刷新"),true,true)){
            logd('刷新');
        }else if(findNode(desc("首页，按钮"),true,true)){
            logd('刷新');
        }
    }
}

function sendMessage(massage) {
    let deviceName=readConfigString("deviceID")
    let messageurl = "https://api.telegram.org/bot"+Token+"/sendMessage?chat_id="+chatid+"&text="+deviceName+"-"+massage;
    let pa = {"b": "22"};
    let x = http.httpGet(messageurl, pa, 10 * 1000, {"User-Agent": "test"});
    loge("result -    " + x);
    exit();
}

//纯关注
function follows() {
    if(findNode(text("关注").clickable(true),true,true)){
        logd("已关注");
        sleep(2000);
        if(findNode(text("关注").clickable(true))){
            guanzhu=1;
            exit();
        }
        followTimes++;
        logd("followTimes: "+followTimes);
        if(findNode(text("求更新"))){
            return true;
        }
    }
}

//备份抖音
function utiszip() {
    logd("正在复制文...");
    let copyCmd = "cp -rf /data/user/0/com.ss.android.ugc.aweme/ /sdcard/Download/com.ss.android.ugc.aweme/";
    agentEvent.execShellCommandEx(copyCmd);
    sleep(1000);

    logd("正在删除无用文件...");
    let removeOfflineCmd = "rm -rf /sdcard/Download/com.ss.android.ugc.aweme/files/offlineX";
    agentEvent.execShellCommandEx(removeOfflineCmd);
    let removePluginsCmd = "rm -rf /sdcard/Download/com.ss.android.ugc.aweme/files/plugins";
    agentEvent.execShellCommandEx(removePluginsCmd);
    sleep(1000);

    logd("正在压缩文件...");
    let zipFile = "/sdcard/Download/" + deviceID + ".zip";
    let passwd = "";
    let files = ["/sdcard/Download/com.ss.android.ugc.aweme"]
    let re = utils.zip(zipFile, passwd, files);
    logd("压缩结果: " + re);

    logd("正在打开云盘: ");
    let airportalurl = "https://airportal.cn";
    let airportalurlcmd = "am start -a android.intent.action.VIEW -d \"" + airportalurl + "\"";
    let result = agentEvent.execShellCommandEx(airportalurlcmd);
    exit();
}

//恢复抖音
function unutiszip() {
    logd("正在解压文件...");
    let zipFile = "/sdcard/Download/" + deviceID + ".zip";
    let passwd = "";
    let files = ["/sdcard/Download/com.ss.android.ugc.aweme"]

    let ure = utils.unzip(zipFile, passwd, "/sdcard/Download/");
    logd("解压结果: " + ure);

    logd("正在恢复文件...");
    let sourceDir = "/sdcard/Download/com.ss.android.ugc.aweme/";
    let targetDir = "/data/user/0/com.ss.android.ugc.aweme/";

    // 方法1: 使用tar管道（保留权限和属性）
    let tarCmd = "cd " + sourceDir + " && tar cf - . | (cd " + targetDir + " && tar xf -)";
    agentEvent.execShellCommandEx("su -c '" + tarCmd + "'");

    // 方法2: 使用busybox（如果可用）
    // let busyboxCmd = "busybox cp -rf " + sourceDir + " " + targetDir;
    // agentEvent.execShellCommandEx("su -c '" + busyboxCmd + "'");

    // 方法3: 逐个文件夹复制
    // let folders = ["app_webview", "databases", "shared_prefs", "files"];
    // for (let folder of folders) {
    //     let folderCmd = "cp -rf " + sourceDir + folder + " " + targetDir;
    //     agentEvent.execShellCommandEx("su -c '" + folderCmd + "'");
    //     sleep(100);
    // }

    let removeOfflineCmd = "rm -rf /sdcard/Download/com.ss.android.ugc.aweme/";
    agentEvent.execShellCommandEx(removeOfflineCmd);
    sleep(1000);
    exit();
}

/*
启动商城
@whichPage：首页/消息
 */
function scstartDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = desc("首页，按钮").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                findNode(desc("首页，按钮"),true,true);
                break;
            }
        }

        if (shell.stopApp('com.ss.android.ugc.livelite')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.ugc.livelite");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
}

//商城留痕
function scopen_uid() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk561124://user/detail/"+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            // addactions(actionNum);
            while (true){
                sleep(random(30,50)*100);
                if(findNode(desc("首页，按钮"))){
                    break;
                }else {
                    back();
                }
            }
            logd(`今日总访问： ${shenqingshu} `);
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

/*
启动AI抖音
@whichPage：首页/消息
 */
function AIstartDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = text("问AI抖音或找你想看").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                break;
            }
        }

        if (shell.stopApp('com.ss.android.ugc.aweme.hubble')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.ugc.aweme.hubble");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
}

//AI留痕
function AIopen_uid() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk615883://user/detail/"+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            // addactions(actionNum);
            while (true){
                sleep(random(30,50)*100);
                if(findNode(text("问AI抖音或找你想看"))){
                    break;
                }else {
                    back();
                }
            }
            logd(`今日总访问： ${shenqingshu} `);
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

/*
启动精选
@whichPage：首页/消息
 */
function JXstartDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = desc("已选中，推荐，按钮").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                break;
            }
        }

        if (shell.stopApp('com.ss.android.yumme.video')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.yumme.video");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
}

//精选
function JXopen_uid() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk568863://user/detail/"+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            // addactions(actionNum);
            while (true){
                sleep(random(30,50)*100);
                if(findNode(desc("已选中，推荐，按钮"))){
                    break;
                }else {
                    back();
                }
            }
            logd(`今日总访问： ${shenqingshu} `);
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

/*
启动懂车帝
@whichPage：首页/消息
 */
function DCDstartDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = text("首页").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                break;
            }
        }

        if (shell.stopApp('com.ss.android.auto')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.ss.android.auto");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
}

//懂车帝留痕
function DCDopen_uid() {
    let dy_Uid = dl_get_uid(deviceID,10);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"snssdk36://profile?uid="+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            DCDfollows();
            while (true){
                sleep(random(30,50)*100);
                if(findNode(text("首页"))){
                    break;
                }else {
                    back();
                }
            }
            if (shenqingshu >= 200){
                logd(`今日关注到200结束运行`);
                exit();
            }else {
                logd(`今日总关注： ${shenqingshu} `);
            }
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

//懂车帝关注
function DCDfollows() {
    if(findNode(text("关注"),true,true)){
        logd("已关注");
        followTimes++;
        sleep(random(30,50)*100);
        if(findNode(text("已关注"))){
            logd("followTimes: "+followTimes);
            return true;
        }else if(findNode(text("关注"))){
            logd(`关注失败，结束运行。今日总关注： ${shenqingshu} `);
            exit();
        }
    }
}

/*
启动汽水音乐
@whichPage：首页/消息
 */
function QSstartDy(whichPage) {
    while (true){
        if (whichPage==="首页"){
            let node = id("com.luna.music:id/gna").getOneNodeInfo(50000);
            if(node){
                logd("首页已打开");
                break;
            }
        }

        if (shell.stopApp('com.luna.music')){
            sleep(2000)
            logd("首页打开中。。。");
            utils.openApp("com.luna.music");
            sleep(8000);
        }
        logd("正在打开。。。");
        sleep(4000);
    }
}

//汽水音乐留痕
function QSopen_uid() {
    let dy_Uid = dl_get_uid(deviceID,5);
    if(dy_Uid && dy_Uid.length>0){
        for (let i = 0; i < dy_Uid.length; i++) {
            utils.openActivity({
                "uri":"luna://luna.com/user?user_id="+dy_Uid[i],
            });
            lastaddtime = Date.now();
            shenqingshu++;
            sleep(random(20,30)*100);
            QSfollows();
            while (true){
                sleep(random(30,50)*100);
                if(findNode(id("com.luna.music:id/gna"))){
                    break;
                }else {
                    back();
                }
            }
            if (shenqingshu >= 200){
                logd(`今日关注到200结束运行`);
                // exit();
                sleep(1800*1000);
            }else {
                logd(`今日总关注： ${shenqingshu} `);
            }
        }
    }else {
        sleep(random(300,1800)*1000);
    }
}

//汽水音乐关注
function QSfollows() {
    if(findNode(text("关注").id("com.luna.music:id/fyp"),true,true)){
        logd("已关注");
        sleep(random(30,50)*100);
        if(findNode(text("关注").id("com.luna.music:id/fyp"))){
            guanzhu=1;
            logd(`关注失败，结束运行。今日总关注： ${shenqingshu} `);
            sleep(5000);
        }
        followTimes++;
        logd("followTimes: "+followTimes);
        return true;
    }
}
