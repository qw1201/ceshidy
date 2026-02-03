//版本检查
let taskVersion = http.httpGetDefault(updateUrl, 10 * 1000);
logd('版本：'+taskVersion);

//检测线程
while (true){
    if (shenqingshu % 20 === 0 && shenqingshu !== 0){
        logd('本轮任务结束');
        let beiyong1time = Date.now();
        if (beiyong1time-lastaddtime<7200000){
            //判断线程是否取消，已取消不处理，如未取消，就干掉线程干掉抖音
            if (thread.isCancelled(cloudMtid)){
                logd(`下一轮倒计时：${(7200000 - (beiyong1time - lastaddtime))/60000} 分钟`);
                logd(`今日总访问： ${shenqingshu} `);
            }else {
                logd('取消留痕线程');
                execAsyncNums=1;
                thread.cancelThread(cloudMtid);
                //干掉抖音,开始休息7200秒
                home();
                sleep(1000);

                if(readConfigString("gang")==="true"){
                    shell.stopApp('com.ss.android.ugc.aweme.mobile');//港版抖音32.2.2
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme.mobile");//杀死进程释放内存
                }else {
                    shell.stopApp('com.ss.android.ugc.aweme');//国行抖音
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme");//杀死进程释放内存
                    shell.stopApp('com.ss.android.ugc.livelite');//商城
                    shell.execCommand("am force-stop com.ss.android.ugc.livelite");//杀死进程释放内存
                    shell.stopApp('com.ss.android.ugc.aweme.hubble')//AI
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme.hubble");//杀死进程释放内存
                }
            }
        }else if (beiyong1time-lastaddtime>7200000){
            logd('休息时间到，继续留痕');
            execAsyncNums=0;
        }
    }else if (guanzhu === 1){
        logd('关注频繁休息2小时');
        let beiyong1time = Date.now();
        if (beiyong1time-lastaddtime<7200000){
            //判断线程是否取消，已取消不处理，如未取消，就干掉线程干掉抖音
            if (thread.isCancelled(cloudMtid)){
                logd(`下一轮倒计时：${(7200000 - (beiyong1time - lastaddtime))/60000} 分钟`);
                logd(`今日总访问： ${shenqingshu} `);
            }else {
                logd('取消关注线程');
                execAsyncNums=1;
                thread.cancelThread(cloudMtid);
                //干掉抖音,开始休息7200秒
                home();
                sleep(1000);

                if(readConfigString("gang")==="true"){
                    shell.stopApp('com.ss.android.ugc.aweme.mobile');//港版抖音32.2.2
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme.mobile");//杀死进程释放内存
                }else {
                    shell.stopApp('com.ss.android.ugc.aweme');//国行抖音
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme");//杀死进程释放内存
                    shell.stopApp('com.ss.android.ugc.livelite');//商城
                    shell.execCommand("am force-stop com.ss.android.ugc.livelite");//杀死进程释放内存
                    shell.stopApp('com.ss.android.ugc.aweme.hubble')//AI
                    shell.execCommand("am force-stop com.ss.android.ugc.aweme.hubble");//杀死进程释放内存
                }
            }
        }else if (beiyong1time-lastaddtime>7200000){
            logd('休息时间到，继续关注');
            execAsyncNums=0;
            guanzhu = 0;
        }
    }else {
        //检测页面是否正常运行
        let btnText = new Array(
            "以后再说",
            "刷新",
            "下次再说",
            "切换模式",
            "我知道了",
            "跳过",
            "取消",
        );
        for (let i = 0; i < btnText.length; i++) {
            let node = text(btnText[i]);
            if(findNode(node,true,true)){
                logd("关闭弹窗："+btnText[i])
            }
        }

        let copynNode = text("这不是我复制的口令，我要举报").getOneNodeInfo(10000);
        if (copynNode) {
            let closX = copynNode.nextSiblings();
            closX[0].click();
        }

        if(findNode(text("新关注我的"))){
            back();
            logd("错误页面返回")
        }

        // let pkgName = getRunningPkg()
        // if(readConfigString("gang")==="true"){
        //     if (pkgName!=='com.ss.android.ugc.aweme.mobile'){
        //         utils.openApp("com.ss.android.ugc.aweme.mobile");
        //     }
        // }else if(readConfigString("guo")==="true"){
        //     if (pkgName!=='com.ss.android.ugc.aweme'){
        //         utils.openApp("com.ss.android.ugc.aweme");
        //     }
        // }
    }

    updateTimes++;
    logd('updateTimes:'+updateTimes);
    if (updateTimes>30){
        //检查版本更新
        taskVersion2 = http.httpGetDefault(updateUrl, 10 * 1000);
        logd('cloud版本：'+taskVersion2);
        if (taskVersion2 && taskVersion2 > taskVersion){
            logd('有新版本更新');
            thread.cancelThread(cloudMtid);
            logd('取消任务线程');
            thread.cancelThread(cloudCtid);
            logd('取消检查线程');
            sleep(1000);
        }
        updateTimes=0;
    }
    sleep(3000);
}
