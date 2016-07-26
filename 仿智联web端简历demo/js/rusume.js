$(function(){
    /******************Sex******************/
    var $Resume_Box_Sex = $('#Resume_Box_Sex');
    $Resume_Box_Sex.find('span').on('click', function() {
        $(this).addClass('h').siblings('span').removeClass('h');
    });

    /******************Date******************/
    var $Resume_Pop = $('#Resume_Pop');//弹出层
    var $Resume_Pop_close = $('.Resume_Pop_close'); //弹出框

    var $ResumeTime = $("#ResumeTime");//出生日期层

    var $Resume_Select_Time = $('.Resume_Select_Time'); //所有日期class
    var $Resume_ChuSheng = $('#Resume_ChuSheng'); //出生日期 span
    var $Resume_CanJia = $('#Resume_CanJia');//参加工作时间 span

    //月
    var ResumeTimeMonth  = new Swiper('#ResumeTimeMonth', {
        direction: 'vertical',
        slidesPerView: "auto",
        centeredSlides: true,
        freeMode: true,
        freeModeMomentumRatio: 0,
        freeModeSticky: true,
        onInit: function (swiper) {
            var s = "";
            for (i = 1; i <= 12; i++) {
                s += '<div data-code=' + i + ' class="swiper-slide">' + i + '月</div>';
            }
            swiper.appendSlide(s);
            swiper.update();
            swiper.slideTo(0, 0);
        }
    });
    //年
    var ResumeTimeYear  = new Swiper('#ResumeTimeYear', {
        direction: 'vertical',
        slidesPerView: "auto",
        centeredSlides: true,
        freeMode: true,
        freeModeMomentumRatio: 0,
        freeModeSticky: true,
        onInit: function (swiper) {
            var s = "";
            var y = new Date().getFullYear();
            for (i = y; i >= 1970; i--) {
                s += '<div data-code=' + i + ' class="swiper-slide">' + i + '年</div>';
            }
            swiper.appendSlide(s);
            swiper.update();
            swiper.slideTo(0, 0);
        },
        //判断当前年的月份
        onTransitionEnd: function (swiper) {
            var y = new Date().getFullYear();
            var thiscode = $(swiper.slides[swiper.activeIndex]).attr("data-code");
            if (thiscode == y) {
                var s = "";
                var m = new Date().getMonth() + 1;
                for (i = 1; i <= m; i++) {
                    s += '<div data-code=' + i + ' class="swiper-slide">' + i + '月</div>';
                }
                $("#ResumeTimeMonth").children(".swiper-wrapper").children("div.swiper-slide").remove();
                ResumeTimeMonth.appendSlide(s);
            } else {
                var s = "";
                for (i = 1; i <= 12; i++) {
                    s += '<div data-code=' + i + ' class="swiper-slide">' + i + '月</div>';
                }
                $("#ResumeTimeMonth").children(".swiper-wrapper").children("div.swiper-slide").remove();
                ResumeTimeMonth.appendSlide(s);
            }
        }
    });

    //显示出生日期
    var $finish = $ResumeTime.find(".finish");
    var $noExp = $ResumeTime.find(".noExp");
    var $timeNow = $ResumeTime.find(".timeNow");

    var $Resume_SelectTime = {};

    $Resume_Select_Time.on('click',  function(e) {
        $Resume_SelectTime = $(this);
        $Resume_Pop.show();
        $ResumeTime.addClass('h');
        //console.log($(this).attr('data-time-type'))
        if($(this).attr('data-time-type') == 1){
            $noExp.hide();
            $timeNow.hide();
        }
        if($(this).attr('data-time-type') == 2){
            $noExp.show();
            $timeNow.hide();
        }
        if($(this).attr('data-time-type') == 3){
            $timeNow.show();
        }
        
        e.preventDefault();
    });
    //日期"完成"操作
    $ResumeTime.find(".finish").on("touchend", function (e) {
        //获取年月值
        ResumeTimeYearText = $(ResumeTimeYear.slides[ResumeTimeYear.activeIndex]).attr("data-code");
        ResumeTimeMonthText = $(ResumeTimeMonth.slides[ResumeTimeMonth.activeIndex]).attr("data-code");
        //补零
        ResumeTimeMonthText < 10 ? ResumeTimeMonthText = "0" + parseInt(ResumeTimeMonthText) : ResumeTimeMonthText;
        

        $Resume_SelectTime.text(ResumeTimeYearText + '-' + ResumeTimeMonthText);


        ResumeTimeClose();
        e.preventDefault();
    });

    //日期"取消"操作
    $ResumeTime.find(".close").on("touchend", function (e) {
        ResumeTimeClose();
        e.preventDefault();
    });
    //日期"无工作经验"操作
    $ResumeTime.find(".noExp").on("touchend", function (e) {
        $Resume_CanJia.text('无工作经验');
        ResumeTimeClose();
        e.preventDefault();
    });
    //日期"至今"操作
    $ResumeTime.find(".timeNow").on("touchend", function (e) {
        $Resume_SelectTime.text('至今');
        ResumeTimeClose();
        e.preventDefault();
    });

    //关闭时间选择
    function ResumeTimeClose(){
        $Resume_Pop.hide();
        $ResumeTime.removeClass('h');
    }


    /******************City******************/

    var $Resume_HuKou_Select = $('#Resume_HuKou_Select');//城市列表显示层
    var $Resume_Select_City = $('.Resume_Select_City'); //城市展示class
    var $Resume_HuKou_SelectList = $('#Resume_HuKou_SelectList');//省份
    var $Resume_HuKou_ShowList = $('#Resume_HuKou_ShowList'); //右侧市区

    var $Resume_SelectCity = {};//存储当前 点击的class

    //户口所在地--省份
    var Resume_HuKou_SelectList = new Swiper('#Resume_HuKou_SelectList', {
        direction: 'vertical',
        touchRatio: 1.2,
        mousewheelControl: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true
    });

    //户口所在地--城市
    var Resume_HuKou_ShowList = new Swiper('#Resume_HuKou_ShowList', {
        direction: 'vertical',
        touchRatio: 1.2,
        mousewheelControl: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true
    });

    //点击户口所在地
    $Resume_Select_City.on('click',  function(e) {
        $Resume_SelectCity = $(this);

        ////判断ResumeHukouCitydata是否有值
        if(localStorage.getItem("ResumeHukouCitydata")){
            var ResumeHukouCitydata = localStorage.getItem("ResumeHukouCitydata");//取回变量
            data = JSON.parse(ResumeHukouCitydata);//把字符串转换成JSON对象

            var str = "";
            for (var i in data) {
                str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
            }
            $Resume_HuKou_SelectList.children("dl").children().remove();
            $Resume_HuKou_SelectList.children("dl").append(str);
            //first addClass
            $Resume_HuKou_SelectList.find("dd:first").addClass("h").children(".name").trigger("click");
        }else{
            $.post('p.php?has=1', function (data, textStatus, jqxhr) {
                var str = "";
                for (var i in data) {
                    str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
                }
                $Resume_HuKou_SelectList.children("dl").children().remove();
                $Resume_HuKou_SelectList.children("dl").append(str);
                //first addClass
                $Resume_HuKou_SelectList.find("dd:first").addClass("h").children(".name").trigger("click");

                //存入localStorage
                ResumeHukouCitydata = JSON.stringify(data);//将JSON对象转化成字符串
                localStorage.setItem("ResumeWorkCityByCodedata", ResumeWorkCityByCodedata); //用localStorage保存转化好的的字符串
            }, "json");
        }
        if(localStorage.getItem("ResumeHukouShowListfirst")){
            var ResumeHukouCitydata = localStorage.getItem("ResumeHukouCitydata");//取回变量
            data = JSON.parse(ResumeHukouCitydata);//把字符串转换成JSON对象

            var str = "";
            for (var i in data) {
                str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
            }
            $Resume_HuKou_ShowList.children("dl").children().remove();
            $Resume_HuKou_ShowList.children("dl").append(str);

        }else{
            $.post('p.php?has=2', function (data, textStatus, jqxhr) {
                var str = "";
                console.log(data)
                for (var i in data) {
                    str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
                }
                $Resume_HuKou_ShowList.children("dl").children().remove();
                $Resume_HuKou_ShowList.children("dl").append(str);

                //存入localStorage
                ResumeHukouShowListfirst = JSON.stringify(data);//将JSON对象转化成字符串
                localStorage.setItem("ResumeHukouShowListfirst", ResumeHukouShowListfirst); //用localStorage保存转化好的的字符串
            }, "json");
        }
        

        $Resume_Pop.show();
        $Resume_HuKou_Select.addClass('h');
        e.preventDefault();
        /* Act on the event */
    });

    //点击左侧 省份
    $Resume_HuKou_SelectList.on('click', '.swiper-slide', function(event) {
        var $index = $(this).attr('data-id');
        $(this).addClass('h').siblings().removeClass('h');
        $.post('p.php?has=3&typeid=' + $index, function (data, textStatus, jqxhr) {
            var str = "";
            for (var i in data) {
                str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
            }
            //添加
            $Resume_HuKou_ShowList.children("dl").children().remove();
            $Resume_HuKou_ShowList.children("dl").append(str);
        }, "json");
    });

    //点击右侧侧 市区
    $Resume_HuKou_ShowList.on('click', '.swiper-slide', function(event) {
        var str = $(this).text();
        var id = $(this).attr('data-id');
        $Resume_SelectCity.text(str);
        $Resume_SelectCity.attr('data-city-id',id);
        HuKouSelectClose();
    });

    //城市"取消"操作
    $Resume_HuKou_Select.find(".close").on("touchend", function (e) {
        HuKouSelectClose();
        e.preventDefault();
    });

    //关闭时间选择
    function HuKouSelectClose(){
        $Resume_Pop.hide();
        $Resume_HuKou_Select.removeClass('h');
    }

    /****************通用select选项*****************/
    

    var $Resume_Info_Select = $('#Resume_Info_Select');//select 展示层
    var $Resume_Info_SelectList = $('#Resume_Info_SelectList'); //select数据层
    var $Resume_Select_Info = $('.Resume_Select_Info');//展示区域
    var $Resume_SelectInfo = {};//存储点击的class

    var Resume_Info_SelectList = new Swiper('#Resume_Info_SelectList', {
        direction: 'vertical',
        touchRatio: 1.2,
        mousewheelControl: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true
    });



    $Resume_Select_Info.on('click',  function() {
        $Resume_SelectInfo = $(this);

        if($(this).attr('data-info-type') == 1){
            var str = "";

            for (var i in gzxzArr) {
                str += '<dd class="swiper-slide" data-id=' + gzxzArr[i].id + '> '+ gzxzArr[i].name + '</dd>';
            }
        }
        if($(this).attr('data-info-type') == 2){
            var str = "";

            for (var i in qwxzArr) {
                str += '<dd class="swiper-slide" data-id=' + qwxzArr[i].id + '> '+ qwxzArr[i].name + '</dd>';
            }
        }
        if($(this).attr('data-info-type') == 3){
            var str = "";

            for (var i in hylbArr) {
                str += '<dd class="swiper-slide" data-id=' + hylbArr[i].id + '> '+ hylbArr[i].name + '</dd>';
            }
        }
        if($(this).attr('data-info-type') == 4){
            var str = "";

            for (var i in gzztArr) {
                str += '<dd class="swiper-slide all-swiper-slide" data-id=' + gzztArr[i].id + '> '+ gzztArr[i].name + '<em>' + gzztArr[i].content+'</em>' + '</dd>';
            }
        }
        if($(this).attr('data-info-type') == 5){
            var str = "";

            for (var i in xlxwArr) {
                str += '<dd class="swiper-slide" data-id=' + xlxwArr[i].id + '> '+ xlxwArr[i].name + '</dd>';
            }
        }

        $Resume_Info_SelectList.children("dl").children().remove();
        $Resume_Info_SelectList.children("dl").append(str);

        $Resume_Pop.show();
        $Resume_Info_Select.addClass('h');

    });

    $Resume_Info_SelectList.on('click', '.swiper-slide', function() {
        var text = $(this).text();
        var dataId = $(this).attr('data-id');
        $Resume_SelectInfo.text(text);
        $Resume_SelectInfo.attr('data-id', dataId);
        SelectInfoClose();
    });

    //通用下拉选择"取消"操作
    $Resume_Info_Select.find(".close").on("touchend", function (e) {
        SelectInfoClose();
        e.preventDefault();
    });

    //关闭通用下拉选择
    function SelectInfoClose(){
        $Resume_Pop.hide();
        $Resume_Info_Select.removeClass('h');
    }


    /*职位类别*/
    var $Resume_Select_Job = $('.Resume_Select_Job'); //点击的class
    var $Resume_Job_Select = $('#Resume_Job_Select'); //职位类别下拉展示id
    var $Resume_Job_SelectList_l = $('#Resume_Job_SelectList_l');//左侧下拉
    var $Resume_JobType_ShowList = $('#Resume_JobType_ShowList');//右侧区域id
    var $Resume_Job_SelectList_r = $('#Resume_Job_SelectList_r');//右侧下拉
    var $Resume_SelectInfo = {};//存储class
 
    var Resume_Job_SelectList_l = new Swiper('#Resume_Job_SelectList_l', {
        direction: 'vertical',
        touchRatio: 1.2,
        mousewheelControl: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true
    });

    var Resume_Job_SelectList_r = new Swiper('#Resume_Job_SelectList_r', {
        direction: 'vertical',
        touchRatio: 1.2,
        mousewheelControl: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true
    });

    $Resume_Select_Job.on('click', function() {
        $Resume_SelectInfo = $(this);

       if(localStorage.getItem("ResumeSelectJob")){
            var ResumeSelectJob = localStorage.getItem("ResumeSelectJob");//取回变量
            data = JSON.parse(ResumeSelectJob);//把字符串转换成JSON对象
            var str = "";
            for (var i in data) {
                str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
            }
            $Resume_Job_SelectList_l.children("dl").children().remove();
            $Resume_Job_SelectList_l.children("dl").append(str);
        }else{
            $.post('p.php?has=4', function (data, textStatus, jqxhr) {
                var str = "";
                for (var i in data) {
                    str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
                }
                $Resume_Job_SelectList_l.children("dl").children().remove();
                $Resume_Job_SelectList_l.children("dl").append(str);

                //存入localStorage
                ResumeSelectJob = JSON.stringify(data);//将JSON对象转化成字符串
                localStorage.setItem("ResumeSelectJob", ResumeSelectJob); //用localStorage保存转化好的的字符串
            }, "json");
        }
        $Resume_Pop.show();
        $Resume_Job_Select.addClass('h');
    });

    //点击左侧内容
    $Resume_Job_SelectList_l.on('click', '.swiper-slide', function() {
        var info = $(this).text();
        var $dataId = $(this).attr('data-id');
        $Resume_JobType_ShowList.find('.titBack').text(info);
        console.log($dataId);
        $.post('p.php?has=5&typeid=' + $dataId, function (data, textStatus, jqxhr) {
            var str = "";
            console.log('p.php?has=5&typeid=' + $dataId);
            console.log(data);
            for (var i in data) {
                str += '<dd class="swiper-slide" data-id=' + data[i].id + '> '+ data[i].name + '</dd>';
            }
            $Resume_Job_SelectList_r.children("dl").children().remove();
            $Resume_Job_SelectList_r.children("dl").append(str);
        }, "json");

        $Resume_JobType_ShowList.addClass('h');
    });
    //点击右侧内容
    $Resume_Job_SelectList_r.on('click', '.swiper-slide', function() {
        var text = $(this).text();
        var $dataId = $(this).attr('data-id');
        console.log($dataId)
        $(this).addClass('h').siblings().removeClass('h');
        $Resume_SelectInfo.text(text);
        $Resume_SelectInfo.attr('data-id', $dataId);
        ResumeSelectJobClose();
    });

    //点击右侧标题
    $Resume_JobType_ShowList.find('.titBack').on('click',  function() {
        $Resume_JobType_ShowList.removeClass('h');
    });

    //职位类别"取消"操作
    $Resume_Job_Select.find(".close").on("touchend", function (e) {
        ResumeSelectJobClose();
        e.preventDefault();
    });

    //关闭职位类别
    function ResumeSelectJobClose(){
        $Resume_Pop.hide();
        $Resume_Job_Select.removeClass('h');
    }

})



