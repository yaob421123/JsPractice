
//body
var $body = $("body");
//遮罩层
var $Resume_Pop = $("#Resume_Pop");

//新增简历各项按钮（创建简历时）
var $ResumeAddBtn = $(".Resume_Content_Box");
//修改简历各项按钮（修改简历时）
//var $ResumeEditBtn = $("");

//时间选择元素
var $ResumeTime = $("#ResumeTime");
//时间选择点击元素
var $Resume_Select_Time = $(".Resume_Select_Time");
//当前显示时间span
var $Resume_TimeBox = {};

//去除body Touch事件
function RemoveBodyTouch() {
    $body.on("touchstart, touchmove", function (e) {
        e.stopPropagation();
        e.preventDefault();
        return false
    });
}

//恢复body Touch事件
function RecoveryBodyTouch() {
    $body.off("touchstart, touchmove");
}

//日期全局年变量，月变量
var ResumeTimeYearText = "";
var ResumeTimeMonthText = "";


//简历日期选择月
var ResumeTimeMonth = new Swiper('#ResumeTimeMonth', {
    direction: 'vertical',
    slidesPerView: "auto",
    centeredSlides: true,
    freeMode: true,
    freeModeMomentumRatio: 0,
    freeModeSticky: true,
    //mousewheelControl: false,
    onInit: function (swiper) {
        var s = "";
        for (i = 1; i <= 12; i++) {
            s += '<div data-code=' + i + ' class="swiper-slide">' + i + '月</div>';
        }
        swiper.appendSlide(s);
        swiper.update();
        swiper.slideTo(0, 0);
        //ResumeTimeMonthText = $(swiper.slides[swiper.activeIndex]).attr("data-code");
    },
    //滚动结束后获取月份赋值给全局月份变量
    //onSlideChangeEnd: function (swiper) {
    //    ResumeTimeMonthText = $(swiper.slides[swiper.activeIndex]).attr("data-code");
    //    //补零
    //    ResumeTimeMonthText < 10 ? ResumeTimeMonthText = "0" + parseInt(ResumeTimeMonthText) : ResumeTimeMonthText;
    //}
});


//简历日期选择年
var ResumeTimeYear = new Swiper('#ResumeTimeYear', {
    direction: 'vertical',
    slidesPerView: "auto",
    centeredSlides: true,
    freeMode: true,
    freeModeMomentumRatio: 0,
    freeModeSticky: true,
    //mousewheelControl: false,
    onInit: function (swiper) {
        var s = "";
        var y = new Date().getFullYear();
        for (i = y; i >= 1920; i--) {
            s += '<div data-code=' + i + ' class="swiper-slide">' + i + '年</div>';
        }
        swiper.appendSlide(s);
        swiper.update();
        swiper.slideTo(0, 0);
        //ResumeTimeYearText = $(swiper.slides[swiper.activeIndex]).attr("data-code");
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


//当前时间元素
var $Resume_SelectTime = {};

//无工作经验按钮
var $ResumeNoExp = $ResumeTime.find(".noExp");
var $ResumeTimeNow = $ResumeTime.find(".timeNow");

//绑定选择日期
$Resume_Select_Time.click(function () {
    $Resume_SelectTime = $(this);
    var $t = $(this);
    if ($t.attr("data-time-type") == "1") {
        //无工作经验
        $ResumeNoExp.show();
        $ResumeTimeNow.hide();
    } else if ($t.attr("data-time-type") == "2") {
        //至今
        $ResumeTimeNow.show();
        $ResumeNoExp.hide();
    } else {
        $ResumeTimeNow.hide();
        $ResumeNoExp.hide();
    }

    //move to 9月
    var CheakId = $(this).attr("id");
    //教育
    if (CheakId == "edu_StartTime" && $(this).text() == "") {
        ResumeTimeMonth.slideTo("8");
    }



    RemoveBodyTouch();
    //时间选择框
    $ResumeTime.addClass("h");
    //遮罩层
    $Resume_Pop.show();
    //当前显示时间span
    $Resume_TimeBox = $t;
});

//日期"完成"操作
$ResumeTime.find(".finish").on("touchend", function (e) {

    //获取年月值
    ResumeTimeYearText = $(ResumeTimeYear.slides[ResumeTimeYear.activeIndex]).attr("data-code");
    ResumeTimeMonthText = $(ResumeTimeMonth.slides[ResumeTimeMonth.activeIndex]).attr("data-code");
    //补零
    ResumeTimeMonthText < 10 ? ResumeTimeMonthText = "0" + parseInt(ResumeTimeMonthText) : ResumeTimeMonthText;
    //赋值
    $Resume_TimeBox.text(ResumeTimeYearText + "-" + ResumeTimeMonthText);

    //判断求职意向与工作经验中后者时间不能早于前者
    var CheakId = $Resume_SelectTime.attr("id");
    //教育
    if (CheakId == "edu_StartTime" || CheakId == "edu_EndTime") {
        var eduStart = $("#edu_StartTime").text();
        eduStart = eduStart.replace(/-/, "");

        var eduEnd = $("#edu_EndTime").text();
        eduEnd = eduEnd.replace(/-/, "");

        if (eduStart != "" && eduEnd != "" && eduStart > eduEnd) {
            $Resume_TimeBox.text($Resume_TimeBox.attr("data-cn-name"));
            handlePrompt("毕业时间不能早于入学时间");
            return false;
        }
    }
    //工作
    if (CheakId == "workExp_StartTime" || CheakId == "workExp_EndTime") {
        var eduStart = $("#workExp_StartTime").text();
        eduStart = eduStart.replace(/-/, "");

        var eduEnd = $("#workExp_EndTime").text();
        eduEnd = eduEnd.replace(/-/, "");

        if (eduStart != "" && eduEnd != "" && eduStart > eduEnd) {
            $Resume_TimeBox.text($Resume_TimeBox.attr("data-cn-name"));
            handlePrompt("开始时间不能大于结束时间");
            return false;
        }
    }

    //根据学历给毕业时间年份赋值
    var degreeCode = $("#edu_Degree").attr("data-code");
    if ($Resume_TimeBox.attr("id") == "edu_StartTime") {

        ResumeTimeMonth.slideTo(6);

        switch (degreeCode) {
            case "5":
                ResumeTimeYear.slideTo(ResumeTimeYear.activeIndex - 3);
                //获取年月值
                var yearText = $(ResumeTimeYear.slides[ResumeTimeYear.activeIndex]).attr("data-code");
                var monthText = $(ResumeTimeMonth.slides[ResumeTimeMonth.activeIndex]).attr("data-code");
                //补零
                monthText < 10 ? monthText = "0" + parseInt(monthText) : monthText;

                var eduStart = $("#edu_StartTime").text();
                eduStart = eduStart.replace(/-/, "");

                var eduEnd = yearText + "-" + monthText;
                eduEnd = eduEnd.replace(/-/, "");

                if (eduStart != "" && eduEnd != "" && eduStart > eduEnd) {
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text("");
                    //handlePrompt("毕业时间不能早于入学时间");
                    break;
                } else {
                    //赋值
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text(yearText + "-" + monthText);
                }

                break;
            case "4":
                ResumeTimeYear.slideTo(ResumeTimeYear.activeIndex - 4);
                //获取年月值
                var yearText = $(ResumeTimeYear.slides[ResumeTimeYear.activeIndex]).attr("data-code");
                var monthText = $(ResumeTimeMonth.slides[ResumeTimeMonth.activeIndex]).attr("data-code");
                //补零
                monthText < 10 ? monthText = "0" + parseInt(monthText) : monthText;
                var eduStart = $("#edu_StartTime").text();
                eduStart = eduStart.replace(/-/, "");

                var eduEnd = yearText + "-" + monthText;
                eduEnd = eduEnd.replace(/-/, "");

                if (eduStart != "" && eduEnd != "" && eduStart > eduEnd) {
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text("");
                    //handlePrompt("毕业时间不能早于入学时间");
                    break;
                } else {
                    //赋值
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text(yearText + "-" + monthText);
                }

                break;
            case "3":
                ResumeTimeYear.slideTo(ResumeTimeYear.activeIndex - 2);
                //获取年月值
                var yearText = $(ResumeTimeYear.slides[ResumeTimeYear.activeIndex]).attr("data-code");
                var monthText = $(ResumeTimeMonth.slides[ResumeTimeMonth.activeIndex]).attr("data-code");
                //补零
                monthText < 10 ? monthText = "0" + parseInt(monthText) : monthText;
                var eduStart = $("#edu_StartTime").text();
                eduStart = eduStart.replace(/-/, "");

                var eduEnd = yearText + "-" + monthText;
                eduEnd = eduEnd.replace(/-/, "");

                if (eduStart != "" && eduEnd != "" && eduStart > eduEnd) {
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text("");
                    //handlePrompt("毕业时间不能早于入学时间");
                    break;
                } else {
                    //赋值
                    $Resume_TimeBox.parents("ul").find("#edu_EndTime").text(yearText + "-" + monthText);
                }

                break;
        }
    }


    if ($Resume_TimeBox.attr("data-time-type") == "1") {
        $Resume_TimeBox.attr("data-code", 1)
    }
    if ($Resume_TimeBox.attr("data-time-type") == "2") {
        $Resume_TimeBox.attr("data-code", 1)
    }
    ResumeTimeClose();
    
    //
    e.preventDefault();
    
    return false;
});
//日期"取消"操作
$ResumeTime.find(".close").on("touchend", function (e) {
    setTimeout(function () {
        ResumeTimeClose();
    }, 30);
    
    //
    e.preventDefault();
});
//日期"无工作经验"操作
$ResumeTime.find(".noExp").on("touchend",function (e) {
    if (language == 1) {
        $Resume_SelectTime.attr("data-code", "0").text("无工作经验");
    } else {
        $Resume_SelectTime.attr("data-code", "0").text("Inexperienced");
    }
    ResumeTimeClose();
    //
    e.preventDefault();
});
//日期"至今"操作
$ResumeTime.find(".timeNow").on("touchend", function (e) {

    if (language == 1) {
        $Resume_TimeBox.attr("data-code", "0").text("至今");
    } else {
        $Resume_TimeBox.attr("data-code", "0").text("Now");
    }

    ResumeTimeClose();
    //
    e.preventDefault();
});

//关闭时间选择
function ResumeTimeClose() {
    $ResumeTime.removeClass("h");
    $Resume_Pop.hide();
    RecoveryBodyTouch();
}


















//职位类别//行业类别 已选
//var ResumeJobTypeEd = new Swiper('#Resume_JobType_Ed', {
//    scrollbar: '.jobtype-scrollbar',
//    scrollbarHide: false,
//    direction: 'vertical',
//    touchRatio: 1.2,
//    mousewheelControl: true,
//    slidesPerView: 'auto',
//    freeMode: true,
//    observer: true
//});

//职位类别/ 大类
var ResumeJobTypeWrap = new Swiper('#Resume_JobType_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});
//职位类别 小类
var ResumeJobTypeIn = new Swiper('#Resume_JobType_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});


//工作经验-职位类别/ 大类
var Resume_WorkJobType_Select_List = new Swiper('#Resume_WorkJobType_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//工作经验-职位类别 小类
var Resume_WorkJobType_ShowListSwiper = new Swiper('#Resume_WorkJobType_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//工作地点--已选
//var Resume_WorkCity_Ed = new Swiper('#Resume_WorkCity_Ed', {
//    scrollbar: '.workcity-scrollbar',
//    scrollbarHide: false,
//    direction: 'vertical',
//    touchRatio: 1.2,
//    mousewheelControl: true,
//    slidesPerView: 'auto',
//    freeMode: true,
//    observer: true
//});

//工作地点--大类
var Resume_WorkCity_SelectList = new Swiper('#Resume_WorkCity_SelectList', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//工作地点--小类
var Resume_WorkCity_ShowListSwiper = new Swiper('#Resume_WorkCity_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//户口所在地--大类
var Resume_HuKou_SelectList = new Swiper('#Resume_HuKou_SelectList', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//户口所在地--小类
var Resume_HuKou_ShowListSwiper = new Swiper('#Resume_HuKou_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//现居住城市--大类
var Resume_XianJuZhu_SelectList = new Swiper('#Resume_XianJuZhu_SelectList', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//现居住城市--小类
var Resume_XianJuZhu_ShowListSwiper = new Swiper('#Resume_XianJuZhu_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//求职意向期望薪金
var Resume_QzyxQwxj_Select_List = new Swiper('#Resume_QzyxQwxj_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//行业类别
var Resume_Industry_Select_List = new Swiper('#Resume_Industry_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//工作经验-行业类别
var Resume_WorkIndustry_Select_List = new Swiper('#Resume_WorkIndustry_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//专业名称--大类
var Resume_Major_Select_List = new Swiper('#Resume_Major_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});

//专业名称--小类
var Resume_Major_ShowListSwiper = new Swiper('#Resume_Major_ShowListSwiper', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
}); observer: true

//教育背景学历学位
var Resume_JybjXlxw_Select_List = new Swiper('#Resume_JybjXlxw_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});
//工作经验职位薪金
var Resume_GzjyZwxj_Select_List = new Swiper('#Resume_GzjyZwxj_Select_List', {
    direction: 'vertical',
    touchRatio: 1.2,
    mousewheelControl: true,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true
});


//移除返回顶部
$(function () { $(".go-top").remove(); })

//简历各项编辑区域显示事件
//$ResumeAddBtn.children(".prompt").click(function () {
//    var $p = $(this).parent("");
//    $p.next(".Resume_Box_Content").show();
//});


//职位类别容器
var $Resume_JobType_Select = $("#Resume_JobType_Select");

//职位类别元素
var $Resume_Btn_Zwlb = $("#Resume_Btn_Zwlb");

//职位类别==大类
var $Resume_JobType_Select_List = $("#Resume_JobType_Select_List");

//职位类别==小类
var $Resume_JobType_ShowList = $("#Resume_JobType_ShowList");
//职位类别==小类==标题（back）
var $Resume_JobType_ShowList_Tit = $Resume_JobType_ShowList.children(".titBack");
//职位类别==小类==列表（li）
var $Resume_JobType_ShowList_Li = $Resume_JobType_ShowList.find("dl").children("dd");
//职位类别==已选元素外层
//var $Resume_JobType_Ed = $("#Resume_JobType_Ed");

//职位类别==小类==返回（back）绑定
$Resume_JobType_ShowList_Tit.click(function () {
    $Resume_JobType_ShowList.removeClass("h");
});


//职位类别点击（请求大类、判断已选、显示遮罩、控件、拼接=）
$Resume_Btn_Zwlb.on("tap",function (e) {
    //Resume_MoveCodeToFinish($(this), $Resume_JobType_Select.find(".finish"));
    setTimeout(function () {

    var JobTypeInfo_Singledata = localStorage.getItem("JobTypeInfo_Singledata");//取回变量
    //判断JobTypeInfo_Singledata是否有值
    if (JobTypeInfo_Singledata) {
        data = JSON.parse(JobTypeInfo_Singledata);//把字符串转换成JSON对象
        var str = "";
        //拼接
        for (var i in data) {
            //console.log(data[i].en_name);
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_JobType_Select_List.children("dl").children().remove();
        $Resume_JobType_Select_List.children("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_JobType_Select_List.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetJobTypeInfo_Single', function (data, textStatus, jqxhr) {
            var str = "";
            //拼接
            for (var i in data) {
                //console.log(data[i].en_name);
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_JobType_Select_List.children("dl").children().remove();
            $Resume_JobType_Select_List.children("dl").append(str);

            //中英文
            if (language != 1) {
                $Resume_JobType_Select_List.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            JobTypeInfo_Singledata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("JobTypeInfo_Singledata", JobTypeInfo_Singledata);//用localStorage保存转化好的的字符串
        }, "json");
    }
    
        //控件show
        $Resume_JobType_Select_List.parent("#Resume_JobType_Select").show();

        ResumeJobTypeWrap.update();

        $Resume_Pop.show();
        RemoveBodyTouch();
    }, 20);
    e.preventDefault();
    
});

//大类点击元素code
var Resume_Zwlb_Code = "";

//全局职位类别大类当前点击元素（小类点击移除大类变量）
var $Resume_Smal_Remove = {};

//职位类别==大类==点击（请求小类、显示小类层、拼接=）
$Resume_JobType_Select_List.on("click", ".name", function () {
    Resume_Zwlb_Code = $(this).parent("dd").attr("data-code");
    var $t = $(this);
    $Resume_Smal_Remove = $(this).parent("dd");
    $.post('GetJobTypeInfo_Single', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {
        //clear
        $Resume_JobType_ShowList.find("dl").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_JobType_ShowList.find("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_JobType_ShowList.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_Zwlb);
        if (edCode.code) {
            $Resume_JobType_ShowList.find("dd").each(function () {
                var code = $(this).attr("data-code");
                if (edCode.code == code) {
                    $(this).addClass("h");
                }
            })
        }

        //重置标题
        $Resume_JobType_ShowList_Tit.text($t.text());
        //划出小类层
        $Resume_JobType_ShowList.addClass("h");

        ResumeJobTypeIn.update();

    }, "json");

});



//职位类别小类事件
$Resume_JobType_ShowList.on("click", "dd", function () {

    var $t = $(this);
    if (!$t.hasClass("h")) {
        $t.addClass("h").siblings("dd").removeClass("h");
    }

    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();
    //$("#Resume_JobType_Select .btn .finish").attr({ "data-code": code, "data-text": name });

    //关闭 赋值
    $Resume_JobType_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    $Resume_Btn_Zwlb.attr("data-code", code).text(name);
})



//====处理完成后弹出提示====
function handlePrompt(val) {
    $("body").append("<div class='handlePrompt'>" + val + "</div>");
    setTimeout(function () {
        $(".handlePrompt").first().remove();
    }, 1000);
}



//职位类别取消、完成事件绑定
$Resume_JobType_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_JobType_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    
    //清空完成按钮的所有data属性值
    //$("#Resume_JobType_Select .btn .finish").removeAttr("data-code").removeAttr("data-text");
    //去掉选中的样式
    $("#Resume_JobType_ShowListSwiper dl").find("dd").removeClass("h");
    e.preventDefault();
})
//$Resume_JobType_Select.on("click", ".btn .finish", function () {
//    $Resume_JobType_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_Zwlb.attr("data-code", $("#Resume_JobType_Select .btn .finish").attr("data-code")).text($("#Resume_JobType_Select .btn .finish").attr("data-text"));
//})



//===============工作地点
//工作地点容器
var $Resume_WorkCity_Select = $("#Resume_WorkCity_Select");
//工作地点元素
var $Resume_Btn_Gzdd = $("#Resume_Btn_Gzdd");
//工作地点==已选元素外层
//var $Resume_WorkCity_Ed = $("#Resume_WorkCity_Ed");
//工作地点已选
//var $Resume_WorkCity_Selected = $(".Resume_WorkCity_Selected");
//工作地点==大类
var $Resume_WorkCity_BigList = $("#Resume_WorkCity_SelectList");
//工作地点==小类
var $Resume_WorkCity_ShowList = $("#Resume_WorkCity_ShowList");





//工作地点点击（请求大类、显示遮罩、控件、拼接=）

$Resume_Btn_Gzdd.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_WorkCity_Select.find(".finish"));

    //判断ResumeHukouCitydata是否有值
    if (localStorage.getItem("ResumeWorkCityByCodedata")) {

        var ResumeWorkCityByCodedata = localStorage.getItem("ResumeWorkCityByCodedata");//取回变量
        data = JSON.parse(ResumeWorkCityByCodedata);//把字符串转换成JSON对象
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
        }

        $Resume_WorkCity_BigList.children("dl").children().remove();
        //添加
        $Resume_WorkCity_BigList.children("dl").append(str);

        //first addClass
        $Resume_WorkCity_BigList.find("dd:first").addClass("h").children(".name").trigger("click");

        //中英文
        if (language != 1) {
            $Resume_WorkCity_BigList.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {

        $.post('GetResumeWorkCityByCode', function (data, textStatus, jqxhr) {
            //new
            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
            }

            $Resume_WorkCity_BigList.children("dl").children().remove();
            //添加
            $Resume_WorkCity_BigList.children("dl").append(str);

            //first addClass
            $Resume_WorkCity_BigList.find("dd:first").addClass("h").children(".name").trigger("click");

            //中英文
            if (language != 1) {
                $Resume_WorkCity_BigList.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            ResumeWorkCityByCodedata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeWorkCityByCodedata", ResumeWorkCityByCodedata);//用localStorage保存转化好的的字符串
        }, "json");
    }
    
        
        //控件show
        $Resume_WorkCity_BigList.parent("#Resume_WorkCity_Select").show();

        Resume_WorkCity_SelectList.update();

        //遮罩show 取消body touch
        $Resume_Pop.show();
        RemoveBodyTouch();
    
});

//返回已选code
function Resume_Ed_Code($obj) {
    var returnCode = {};
    returnCode.arr = false;
    var code = $obj.attr("data-code");
    code = code.split(",");
    if (code.length > 1) {
        returnCode.arr = true;
        returnCode.code = code;
    } else {
        code = code.join(",");
        returnCode.code = code;
    }
    return returnCode;
}

//工作地点==大类==点击（请求小类、判断已选、显示小类层、拼接=）
$Resume_WorkCity_BigList.on("click", ".name", function () {

    var $t = $(this);
    $t.parent("dd").addClass("h").siblings("dd").removeClass("h");
    $.post('GetResumeWorkCityByCode', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {

        //clear
        $Resume_WorkCity_ShowList.find(".list").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {

            if (data[i].sublist.length > 0) {
                str += '<div class="swiper-slide smal" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '<b></b></span>';
                var $obj = data[i].sublist;
                str += '<ul class="subList">';
                for (var r in $obj) {
                    str += '<li class="swiper-slide" data-en-name=' + $obj[r].en_name + ' data-code=' + $obj[r].code + '>' + $obj[r].name + '</li>';
                }
                str += '</ul></div>';
            } else {
                str += '<div class="swiper-slide smal" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></div>';
            }
        }

        //添加
        $Resume_WorkCity_ShowList.find(".list").append(str);

        Resume_WorkCity_ShowListSwiper.update();

        //中英文
        if (language != 1) {
            $Resume_WorkCity_ShowList.find("div.smal").children("span.name").each(function () {
                if ($(this).next("ul.subList").length > 0) {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                    $("<b></b>").appendTo($(this));
                } else {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                }
            });
            $Resume_WorkCity_ShowList.find("div.smal").children("ul.subList").children("li").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_Gzdd);
        if (edCode.arr) {
            $Resume_WorkCity_ShowList.find(".smal").each(function () {
                var $subList = $(this).children(".subList");
                var code = $(this).attr("data-code");
                var lenBool = $subList.length > 0;
                for (i = 0; i < edCode.code.length; i++) {
                    if (edCode.code[i] == code && !lenBool) {
                        $(this).children(".name").addClass("h");
                    } else if (lenBool) {
                        $subList.children("li").each(function () {
                            if ($(this).attr("data-code") == edCode.code[i]) {
                                $(this).addClass("h");
                            }
                        });
                    }
                }
            });
        } else {
            $Resume_WorkCity_ShowList.find(".smal").each(function () {
                var $subList = $(this).children(".subList");
                var code = $(this).attr("data-code");
                var lenBool = $subList.length > 0;
                if (edCode.code == code && !lenBool) {
                    $(this).children(".name").addClass("h");
                } else if (lenBool) {
                    $subList.children("li").each(function () {
                        if ($(this).attr("data-code") == edCode.code) {
                            $(this).addClass("h");
                        }
                    });
                }
            })
        }

    }, "json");

});

//工作地点 市 勾选事件
$Resume_WorkCity_ShowList.on("click", ".name", function () {
    var span_Name = ".name";
    var div_Smal = ".smal";
    var $t = $(this);
    var $p = $t.parent(div_Smal);
    var index = $p.index();
    var ulLen = $t.next("ul.subList").length;
    //判断不包含区县列表
    if (ulLen < 1) {

        //save code&name
        var code = $p.attr("data-code");
        var name = $p.text();

        //关闭
        $Resume_WorkCity_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
        //所有data属性值赋值给操作区域
        $Resume_Btn_Gzdd.attr("data-code", code).text(name);

        //$("#Resume_WorkCity_Select .btn .finish").attr({ "data-code": code, "data-text": name });

        //移除市级（包括省）
        $p.siblings(div_Smal).children(span_Name).removeClass("h");
        $t.addClass("h");
        //移除区级
        $Resume_WorkCity_ShowList.find(div_Smal).find("li").removeClass("h");
    } else {
        //包含区县列表
        $(this).next(".subList").toggle();
        $(this).children("b").toggleClass("h");
        Resume_WorkCity_ShowListSwiper.update();
    }

});

//工作地点区县勾选事件
$Resume_WorkCity_ShowList.on("click", "li", function () {
    var $t = $(this);
    var span_Name = ".name";
    var div_Smal = ".smal";

    //移除 省市级 区级其他
    $Resume_WorkCity_ShowList.find(div_Smal).children(span_Name).removeClass("h").next("ul").children("li").removeClass("h");
    $t.addClass("h");
    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();

    //关闭
    $Resume_WorkCity_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    //所有data属性值赋值给操作区域
    $Resume_Btn_Gzdd.attr("data-code", code).text(name);

    //$("#Resume_WorkCity_Select .btn .finish").attr({"data-code": code,"data-text":name});
    //$Resume_Btn_Gzdd.attr("data-code", code).text(name);

});


//工作地点取消、完成事件绑定
$Resume_WorkCity_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_WorkCity_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    
    
    //清空完成按钮的所有data属性值
    $("#Resume_WorkCity_Select .btn .finish").removeAttr("data-code").removeAttr("data-text");

    e.preventDefault();
})
//$Resume_WorkCity_Select.on("click", ".btn .finish", function () {
//    $Resume_WorkCity_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_Gzdd.attr("data-code", $("#Resume_WorkCity_Select .btn .finish").attr("data-code")).text($("#Resume_WorkCity_Select .btn .finish").attr("data-text"));
//})

//赋值code给当前完成按钮
function Resume_MoveCodeToFinish($t, $finish) {
    var text = $t.text();
    var code = $t.attr("data-code");
    var pro_code = $t.attr("data-pro");
    var shi_code = $t.attr("data-shi-code");
    var scode = $t.attr("data-scode")
    $finish.attr({ "data-code": code, "data-pro": pro_code, "data-shi-code": shi_code, "data-scode": scode, "data-text": text });
}

//户口所在地

//户口所在地--元素
var $Resume_Btn_Hukou = $("#Resume_Btn_Hukou");
//户口所在地--容器
var $Resume_HuKou_Select = $("#Resume_HuKou_Select");
//工作地点==大类
var $Resume_Hukou_BigList = $("#Resume_HuKou_SelectList");
//工作地点==小类
var $Resume_Hukou_ShowList = $("#Resume_HuKou_ShowList");

//户口所在地--点击
$Resume_Btn_Hukou.click(function () {

    //Resume_MoveCodeToFinish($(this), $Resume_HuKou_Select.find(".finish"))
    //判断ResumeHukouCitydata是否有值
    if (localStorage.getItem("ResumeHukouCitydata")) {
        var ResumeHukouCitydata = localStorage.getItem("ResumeHukouCitydata");//取回变量
        data = JSON.parse(ResumeHukouCitydata);//把字符串转换成JSON对象
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name"  data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_Hukou_BigList.children("dl").children().remove();
        $Resume_Hukou_BigList.children("dl").append(str);
        //first addClass
        $Resume_Hukou_BigList.find("dd:first").addClass("h").children(".name").trigger("click");
        //中英文
        if (language != 1) {
            $Resume_Hukou_BigList.find("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetResumeHukouCity', function (data, textStatus, jqxhr) {

            
            //clear
            //$Resume_WorkCity_BigList.children("dl").children().remove();
            //new
            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name"  data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_Hukou_BigList.children("dl").children().remove();
            $Resume_Hukou_BigList.children("dl").append(str);
            //first addClass
            $Resume_Hukou_BigList.find("dd:first").addClass("h").children(".name").trigger("click");
            //中英文
            if (language != 1) {
                $Resume_Hukou_BigList.find("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            ResumeHukouCitydata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeHukouCitydata", ResumeHukouCitydata);//用localStorage保存转化好的的字符串
        }, "json");
    }
        
    //控件show
    $Resume_HuKou_Select.show();
    Resume_HuKou_SelectList.update();
    //遮罩show 取消body touch
    $Resume_Pop.show();
    RemoveBodyTouch();
});

//户口所在地==大类==点击（请求小类、判断已选、显示小类层、拼接=）
$Resume_Hukou_BigList.on("click", ".name", function () {

    var $t = $(this);
    $t.parent("dd").addClass("h").siblings("dd").removeClass("h");
    $.post('GetResumeHukouCity', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {

        //clear
        $Resume_Hukou_ShowList.find(".list").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<div class="swiper-slide smal" data-code=' + data[i].code + '><span class="name" data-cn-name=' + data[i].name + ' data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></div>';
        }

        //添加
        $Resume_Hukou_ShowList.find(".list").append(str);
        
        Resume_HuKou_ShowListSwiper.update();

        //中英文
        if (language != 1) {
            $Resume_Hukou_ShowList.find("div.smal").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_Hukou);
        $Resume_Hukou_ShowList.find(".smal").each(function () {
            var $subList = $(this).children(".subList");
            var code = $(this).attr("data-code");
            var lenBool = $subList.length > 0;
            if (edCode.code == code && !lenBool) {
                $(this).children(".name").addClass("h");
            } else if (lenBool) {
                $subList.children("li").each(function () {
                    if ($(this).attr("data-code") == edCode.code) {
                        $(this).addClass("h");
                    }
                });
            }
        })


    }, "json");

});

//户口所在地 市 勾选事件
$Resume_Hukou_ShowList.on("click", ".name", function () {
    var $par = $(this).parent(".smal");
    var index = $par.index();
    var code = $par.attr("data-code");
    var name = $(this).text();
    var enname = $(this).attr("data-en-name");
    var pro = "";
    if (index == 0) {
        pro = code;
    } else {
        if ($par.parent(".list").children(".smal").first().attr("data-code") == 530) {
            pro = code;
        } else {
            pro = $par.parent(".list").children(".smal").first().attr("data-code");
        }
        
    }
    $(this).addClass("h").parent(".smal").siblings(".smal").children(".name").removeClass("h");

    $Resume_Btn_Hukou.attr({ "data-code": code, "data-pro": pro }).text(name);

    //关闭
    $Resume_HuKou_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();

    //$("#Resume_HuKou_Select .btn .finish").attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro, "data-text": name });
    //$Resume_Btn_Hukou.attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro }).text(name);
});

//户口所在地--区县勾选事件
//$Resume_Hukou_ShowList.on("click", "li", function () {
//    if (!$(this).hasClass("h")) {
//        var $li = $("#Resume_HuKou_ShowList .list .subList li");
//        var code = $(this).attr("data-code");
//        var text = $(this).text();
//        $li.removeClass("h");
//        $(this).addClass("h");
//        $Resume_Btn_Hukou.attr("data-code", code).text(text);

//    }
//});

//户口所在地--完成事件绑定
$Resume_HuKou_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_HuKou_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    
    e.preventDefault();
    //清空完成按钮的所有data属性值
    //$("#Resume_HuKou_Select .btn .finish").removeAttr("data-code").removeAttr("data-cn-name").removeAttr("data-en-name").removeAttr("data-pro").removeAttr("data-text");
})
//$Resume_HuKou_Select.on("click", ".btn .finish", function () {
//    $Resume_HuKou_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    var $Resume_HuKou_SelectBtn_finish = $("#Resume_HuKou_Select .btn .finish");
//    $Resume_Btn_Hukou.attr({ "data-code": $Resume_HuKou_SelectBtn_finish.attr("data-code"), "data-cn-name": $Resume_HuKou_SelectBtn_finish.attr("data-cn-name"), "data-en-name": $Resume_HuKou_SelectBtn_finish.attr("data-en-name"), "data-pro": $Resume_HuKou_SelectBtn_finish.attr("data-pro") }).text($Resume_HuKou_SelectBtn_finish.attr("data-text"));
//})



//现居住城市

//现居住城市--元素
var $Resume_Btn_XianJuZhu = $("#Resume_Btn_XianJuZhu");
//现居住城市--容器
var $Resume_XianJuZhu_Select = $("#Resume_XianJuZhu_Select");
//现居住城市==大类
var $Resume_XianJuZhu_BigList = $("#Resume_XianJuZhu_SelectList");
//现居住城市==小类
var $Resume_XianJuZhu_ShowList = $("#Resume_XianJuZhu_ShowList");

//现居住城市--点击
$Resume_Btn_XianJuZhu.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_XianJuZhu_Select.find(".finish"));

    //判断ResumeJZCitydata是否有值
    if (localStorage.getItem("ResumeJZCitydata")) {
        var ResumeJZCitydata = localStorage.getItem("ResumeJZCitydata");//取回变量
        data = JSON.parse(ResumeJZCitydata);//把字符串转换成JSON对象
        //clear
        $Resume_XianJuZhu_BigList.children("dl").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_XianJuZhu_BigList.children("dl").append(str);
        //first addClass
        $Resume_XianJuZhu_BigList.find("dd:first").addClass("h").children(".name").trigger("click");
        //中英文
        if (language != 1) {
            $Resume_XianJuZhu_BigList.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetResumeJZCity', function (data, textStatus, jqxhr) {
            //clear
            $Resume_XianJuZhu_BigList.children("dl").children().remove();
            //new
            var str = "";
            
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_XianJuZhu_BigList.children("dl").append(str);

            //first addClass
            $Resume_XianJuZhu_BigList.find("dd:first").addClass("h").children(".name").trigger("click");

            //中英文
            if (language != 1) {
                $Resume_XianJuZhu_BigList.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            ResumeJZCitydata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeJZCitydata", ResumeJZCitydata);//用localStorage保存转化好的的字符串
        }, "json");
    }


        //控件show
        $Resume_XianJuZhu_Select.show();

        Resume_XianJuZhu_SelectList.update();

        //遮罩show 取消body touch
        $Resume_Pop.show();
        RemoveBodyTouch();
});

//现居住城市==大类==点击（请求小类、判断已选、显示小类层、拼接=）
$Resume_XianJuZhu_BigList.on("click", ".name", function () {

    var $t = $(this);
    $t.parent("dd").addClass("h").siblings("dd").removeClass("h");
    $.post('GetResumeJZCity', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {

        //clear
        $Resume_XianJuZhu_ShowList.find(".list").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {

            if (data[i].sublist.length > 0) {
                str += '<div class="swiper-slide smal" data-code=' + data[i].code + '><span class="name" data-cn-name=' + data[i].name + ' data-en-name=' + data[i].en_name + '>' + data[i].name + '<b></b></span>';
                var $obj = data[i].sublist;
                str += '<ul class="subList">';
                for (var r in $obj) {
                    str += '<li class="swiper-slide" data-code=' + $obj[r].code + ' data-cn-name=' + $obj[r].name + ' data-en-name=' + $obj[r].en_name + '>' + $obj[r].name + '</li>';
                }
                str += '</ul></div>';
            } else {
                str += '<div class="swiper-slide smal" data-code=' + data[i].code + '><span class="name" data-cn-name=' + data[i].name + ' data-en-name=' + data[i].en_name + '>' + data[i].name + '</span></div>';
            }
        }

        //添加
        $Resume_XianJuZhu_ShowList.find(".list").append(str);

        Resume_XianJuZhu_ShowListSwiper.update();

        //中英文
        if (language != 1) {
            $Resume_XianJuZhu_ShowList.find("div.smal").children("span.name").each(function () {
                if ($(this).next("ul.subList").length > 0) {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                    $("<b></b>").appendTo($(this));
                } else {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                }
            });
            $Resume_XianJuZhu_ShowList.find("div.smal").children("ul.subList").children("li").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_XianJuZhu);
        if (edCode.arr) {
            $Resume_XianJuZhu_ShowList.find(".smal").each(function () {
                var $subList = $(this).children(".subList");
                var code = $(this).attr("data-code");
                var lenBool = $subList.length > 0;
                for (i = 0; i < edCode.code.length; i++) {
                    if (edCode.code[i] == code && !lenBool) {
                        $(this).children(".name").addClass("h");
                    } else if (lenBool) {
                        $subList.children("li").each(function () {
                            if ($(this).attr("data-code") == edCode.code[i]) {
                                $(this).addClass("h");
                            }
                        });
                    }
                }
            });
        } else {
            $Resume_XianJuZhu_ShowList.find(".smal").each(function () {
                var $subList = $(this).children(".subList");
                var code = $(this).attr("data-code");
                var lenBool = $subList.length > 0;
                if (edCode.code == code && !lenBool) {
                    $(this).children(".name").addClass("h");
                } else if (lenBool) {
                    $subList.children("li").each(function () {
                        if ($(this).attr("data-code") == edCode.code) {
                            $(this).addClass("h");
                        }
                    });
                }
            })
        }


    }, "json");

});

//现居住城市 市 勾选事件
$Resume_XianJuZhu_ShowList.on("click", ".name", function () {
    var has = $(this).next(".subList").length > 0;
    if (has) {
        $(this).next(".subList").toggle();
        $(this).children("b").toggleClass("h")
        Resume_XianJuZhu_ShowListSwiper.update();
    } else {
        var $par = $(this).parent(".smal");
        var index = $par.index();
        //省
        var pro = "";
        //市
        var shiCode = "";
        //区
        var code = $par.attr("data-code");
        var name = $(this).text();
        var enname = $(this).text();

        if (index == 0) {
            //点击省级
            pro = $par.attr("data-code");
            shiCode = $par.attr("data-code");
            code = $par.attr("data-code");
        } else {
            //市级
            var $f_sheng = $("#Resume_XianJuZhu_ShowList .list .smal").first();
            pro = $f_sheng.attr("data-code");
            shiCode = $par.attr("data-code");
            code = $par.attr("data-code");
        }
        $(this).addClass("h").parent(".smal").siblings(".smal").children(".name").removeClass("h");

        //关闭
        $Resume_XianJuZhu_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
        //所有data属性值赋值给操作区域
        $Resume_Btn_XianJuZhu.attr({ "data-code": code, "data-pro": pro, "data-shi-code": shiCode }).text(name);

        //$("#Resume_XianJuZhu_Select .btn .finish").attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro, "data-shi-code": shiCode, "data-text": name });
        //$Resume_Btn_XianJuZhu.attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro, "data-shi-code": shiCode }).text(name);
    }
});

//现居住城市--区县勾选事件
$Resume_XianJuZhu_ShowList.on("click", "li", function () {
    if (!$(this).hasClass("h")) {
        //去除省class
        var $f_sheng = $("#Resume_XianJuZhu_ShowList .list .smal").first();
        $f_sheng.removeClass("h");
        //去除市
        var $li = $("#Resume_XianJuZhu_ShowList .list .subList li");
        $li.removeClass("h");
        //add
        $(this).addClass("h");

        //省
        var pro = "";
        //市
        var shiCode = "";
        //区
        var code = "";
        //中文
        var name = "";
        //英文
        var enname = "";
        //索引
        var index = $(this).index();

        if (index == 0) {
            //点击市级
            shiCode = $(this).attr("data-code");
            code = $(this).attr("data-code");
            name = $(this).text();
            enname = $(this).attr("data-en-name");
            pro = shiCode;
            
        } else {
            //点击区级
            var $f_shi = $(this).parent("ul").children("li").first();
            shiCode = $f_shi.attr("data-code");
            code = $(this).attr("data-code");
            name = $f_shi.text() + "-" + $(this).text();
            enname = $f_shi.attr("data-en-name") + "-" + $(this).attr("data-en-name");
            if ($f_sheng.attr("data-code") == 530) {
                pro = shiCode;
            } else {
                pro = $f_sheng.attr("data-code");
            }
        }

        //关闭
        $Resume_XianJuZhu_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
        //所有data属性值赋值给操作区域
        $Resume_Btn_XianJuZhu.attr({ "data-code": code, "data-pro": pro, "data-shi-code": shiCode }).text(name);

        //$("#Resume_XianJuZhu_Select .btn .finish").attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro, "data-shi-code": shiCode, "data-text": name });
        //$Resume_Btn_XianJuZhu.attr({ "data-code": code, "data-cn-name": name, "data-en-name": enname, "data-pro": pro, "data-shi-code": shiCode }).text(name);
    }
});

//现居住城市--完成事件绑定
$Resume_XianJuZhu_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_XianJuZhu_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    e.preventDefault();
    //清空完成按钮的所有data属性值
    //$("#Resume_XianJuZhu_Select .btn .finish").removeAttr("data-code").removeAttr("data-cn-name").removeAttr("data-en-name").removeAttr("data-pro").removeAttr("data-shi-code").removeAttr("data-text");
})
//$Resume_XianJuZhu_Select.on("click", ".btn .finish", function () {
//    $Resume_XianJuZhu_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_XianJuZhu.attr({ "data-code": $("#Resume_XianJuZhu_Select .btn .finish").attr("data-code"), "data-cn-name": $("#Resume_XianJuZhu_Select .btn .finish").attr("data-cn-name"), "data-en-name": $("#Resume_XianJuZhu_Select .btn .finish").attr("data-en-name"), "data-pro": $("#Resume_XianJuZhu_Select .btn .finish").attr("data-pro"), "data-shi-code": $("#Resume_XianJuZhu_Select .btn .finish").attr("data-shi-code") }).text($("#Resume_XianJuZhu_Select .btn .finish").attr("data-text"));
//})



//性别
var $Resume_Sex = $("#Resume_Sex");

$Resume_Sex.children(".sex").click(function () {
    $(this).addClass("h").siblings(".sex").removeClass("h");
    if ($(this).hasClass("n")) {
        $Resume_Sex.children("b").attr("data-code", "2");
    } else {
        $Resume_Sex.children("b").attr("data-code", "1");
    }
});




//行业类别容器
var $Resume_Industry_Select = $("#Resume_Industry_Select");
//行业类别元素
var $Resume_Btn_Hylb = $("#Resume_Btn_Hylb");
//行业类别==大类
var $Resume_Industry_Select_List = $("#Resume_Industry_Select_List");


//行业类别（请求大类、判断已选、显示遮罩、控件、拼接=）
$Resume_Btn_Hylb.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_Industry_Select.find(".finish"))

    //判断ResumeIndustrydata是否有值
    if (localStorage.getItem("ResumeIndustrydata")) {
        var ResumeIndustrydata = localStorage.getItem("ResumeIndustrydata");//取回变量
        data = JSON.parse(ResumeIndustrydata);//把字符串转换成JSON对象
        //clear
        $Resume_Industry_Select_List.children("dl").children().remove();

        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_Industry_Select_List.children("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_Industry_Select_List.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetResumeIndustry', function (data, textStatus, jqxhr) {
            //清空
            $Resume_Industry_Select_List.children("dl").children().remove();

            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_Industry_Select_List.children("dl").append(str);

            //中英文
            if (language != 1) {
                $Resume_Industry_Select_List.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }

            //存入localStorage
            ResumeIndustrydata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeIndustrydata", ResumeIndustrydata);//用localStorage保存转化好的的字符串
        }, "json");
    }
    

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_Hylb);
        if (edCode.code) {
            $Resume_Industry_Select_List.find("dd").each(function () {
                var code = $(this).attr("data-code");
                if (edCode.code == code) {
                    $(this).addClass("h");
                }
            })
        }


        //控件show
        $Resume_Industry_Select_List.parent("#Resume_Industry_Select").show();

        Resume_Industry_Select_List.update();

        $Resume_Pop.show();
        RemoveBodyTouch();
    
});


//行业类别 = 简历勾选条件方法 
$Resume_Industry_Select_List.on("click", "dd", function () {

    var $t = $(this);
    if (!$t.hasClass("h")) {
        $t.addClass("h").siblings("dd").removeClass("h");
    }

    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();
    //$("#Resume_Industry_Select .btn .finish").attr({ "data-code": code, "data-text": name });

    //关闭
    $Resume_Industry_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    $Resume_Btn_Hylb.attr("data-code", code).text(name);

})

//行业类别 取消、完成事件绑定
$Resume_Industry_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_Industry_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    e.preventDefault();
    //清空完成按钮的所有data属性值
    //$("#Resume_Industry_Select .btn .finish").removeAttr("data-code").removeAttr("data-text");
    //去掉选中的样式
    //if ($("#Resume_Industry_Select_List dl").find("dd").hasClass("h")) {
    //    $("#Resume_Industry_Select_List dl").find("dd").addClass("h").siblings("dd").removeClass("h");
    //}
})
//$Resume_Industry_Select.on("click", ".btn .finish", function () {
//    $Resume_Industry_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_Hylb.attr({ "data-code": $("#Resume_Industry_Select .btn .finish").attr("data-code") }).text($("#Resume_Industry_Select .btn .finish").attr("data-text"));
//})




//个人信息 修改事件
//按钮
var $Resume_Grxx_Edit = $("#Resume_Grxx_Edit");

//个人信息 展示区域
//头像
var $Resume_TouXiang_Show = $("#Resume_TouXiang_Show");
//姓名
var $Resume_Name_Show = $("#Resume_Name_Show");
//性别
var $Resume_Sex_Show = $("#Resume_Sex_Show");
//出生日期
var $Resume_ChuSheng_Show = $("#Resume_ChuSheng_Show");
//参加工作时间
var $Resume_CanJia_Show = $("#Resume_CanJia_Show");
//户口所在地
var $Resume_Btn_Hukou_Show = $("#Resume_Btn_Hukou_Show");
//现居住城市
var $Resume_Btn_XianJuZhu_Show = $("#Resume_Btn_XianJuZhu_Show");
//手机号码
var $Resume_MobilePhone_Show = $("#Resume_MobilePhone_Show");
//邮箱
var $Resume_Email_Show = $("#Resume_Email_Show");

//个人信息 编辑区域
//外层
$Resume_Grxx_Content = $("#Resume_Grxx_Content .edit");
//头像
var $Resume_TouXiang = $("#Resume_TouXiang");
//姓名
var $Resume_Name = $("#Resume_Name");
//性别
var $Resume_Sex = $("#Resume_Sex");
//出生日期
var $Resume_ChuSheng = $("#Resume_ChuSheng");
//参加工作时间
var $Resume_CanJia = $("#Resume_CanJia");
//户口所在地
var $Resume_Btn_Hukou = $("#Resume_Btn_Hukou");
//现居住城市
var $Resume_Btn_XianJuZhu = $("#Resume_Btn_XianJuZhu");
//手机号码
var $Resume_MobilePhone = $("#Resume_MobilePhone");
//邮箱
var $Resume_Email = $("#Resume_Email");


//修改个人信息
function Resume_Edit_Info() {
    //头像
    $Resume_TouXiang.attr("src", $Resume_TouXiang_Show.attr("src"));
    //姓名
    $Resume_Name.val($Resume_Name_Show.text()).attr({ "data-en-name": $Resume_Name_Show.attr("data-en-name"), "data-cn-name": $Resume_Name_Show.attr("data-cn-name") });
    //性别
    if ($Resume_Sex_Show.attr("data-code") == 2) {
        $Resume_Sex.children(".sex.n").addClass("h").siblings(".sex").removeClass("h");
    } else {
        $Resume_Sex.children(".sex.n").removeClass("h").siblings(".sex").addClass("h");
    }
    $Resume_Sex.children("b.name").attr("data-code", $Resume_Sex_Show.attr("data-code"));
    //出生日期
    $Resume_ChuSheng.text($Resume_ChuSheng_Show.text());
    //参加工作时间
    $Resume_CanJia.text($Resume_CanJia_Show.text()).attr("data-code", $Resume_CanJia_Show.attr("data-code"));
    //户口所在地
    $Resume_Btn_Hukou.attr({ "data-code": $Resume_Btn_Hukou_Show.attr("data-code"), "data-pro": $Resume_Btn_Hukou_Show.attr("data-pro") }).text($Resume_Btn_Hukou_Show.text());
    //现居住城市
    $Resume_Btn_XianJuZhu.attr({ "data-code": $Resume_Btn_XianJuZhu_Show.attr("data-code"), "data-pro": $Resume_Btn_XianJuZhu_Show.attr("data-pro"), "data-shi-code": $Resume_Btn_XianJuZhu_Show.attr("data-shi-code") }).text($Resume_Btn_XianJuZhu_Show.text());
    //手机号码
    $Resume_MobilePhone.val($Resume_MobilePhone_Show.text());
    //邮箱
    $Resume_Email.val($Resume_Email_Show.text());
    //判断手机还是邮箱注册禁止修改
    if (Resume_EmalOrPhone != 0) {
        $Resume_MobilePhone.attr("readonly", "readonly");
    } else {
        $Resume_Email.attr("readonly", "readonly");
    }

    //切换显示
    $Resume_Grxx_Content.show();
    $("#Resume_Grxx_Show").hide();
}


//保存个人信息后 赋值给展示区域
function Resume_Grxx_MoveText() {

    //头像
    $Resume_TouXiang_Show.attr("src", $Resume_TouXiang.attr("src"));
    //姓名
    $Resume_Name_Show.text($Resume_Name.val()).attr({ "data-en-name": $Resume_Name.attr("data-en-name"), "data-cn-name": $Resume_Name.val() });
    //性别
    $Resume_Sex_Show.attr("data-code", $Resume_Sex.children("b.name").attr("data-code")).text($Resume_Sex.children(".sex.h").text());
    
    if ($Resume_Sex.children("b.name").attr("data-code") == 2) {
        $Resume_Sex_Show.addClass("n");
    } else {
        $Resume_Sex_Show.removeClass("n");
    }
    //出生日期
    $Resume_ChuSheng_Show.text($Resume_ChuSheng.text());
    //参加工作时间
    $Resume_CanJia_Show.text($Resume_CanJia.text()).attr("data-code", $Resume_CanJia.attr("data-code"));
    //户口所在地
    $Resume_Btn_Hukou_Show.attr({ "data-code": $Resume_Btn_Hukou.attr("data-code"), "data-pro": $Resume_Btn_Hukou.attr("data-pro") }).text($Resume_Btn_Hukou.text());
    //现居住城市
    $Resume_Btn_XianJuZhu_Show.attr({ "data-code": $Resume_Btn_XianJuZhu.attr("data-code"), "data-pro": $Resume_Btn_XianJuZhu.attr("data-pro"), "data-shi-code": $Resume_Btn_XianJuZhu.attr("data-shi-code") }).text($Resume_Btn_XianJuZhu.text());
    //手机号码
    $Resume_MobilePhone_Show.text($Resume_MobilePhone.val());
    //邮箱
    $Resume_Email_Show.text($Resume_Email.val());
    //判断手机还是邮箱注册禁止修改

    //切换显示
    $Resume_Grxx_Content.hide();
    $("#Resume_Grxx_Show").show();

}




//求职意向 修改事件
var $Resume_Qzyx_Edit = $("#Resume_Qzyx_Edit");

//求职意向 展示区域
//工作性质
var $Resume_Btn_Gzxz_Show = $("#Resume_Btn_Gzxz_Show");
//工作地点:
var $Resume_Btn_Gzdd_Show = $("#Resume_Btn_Gzdd_Show");
//期望薪资
var $Resume_Btn_Qwxz_Show = $("#Resume_Btn_Qwxz_Show");
//职位类别
var $Resume_Btn_Zwlb_Show = $("#Resume_Btn_Zwlb_Show");
//行业类别
var $Resume_Btn_Hylb_Show = $("#Resume_Btn_Hylb_Show");
//工作状态
var $Resume_Btn_Gzzt_Show = $("#Resume_Btn_Gzzt_Show");

//求职意向 编辑区域
//工作性质
var $Resume_Btn_Gzxz = $("#Resume_Btn_Gzxz");
//工作地点:
var $Resume_Btn_Gzdd = $("#Resume_Btn_Gzdd");
//期望薪资
var $Resume_Btn_Qwxz = $("#Resume_Btn_Qwxz");
//职位类别
var $Resume_Btn_Zwlb = $("#Resume_Btn_Zwlb");
//行业类别
var $Resume_Btn_Hylb = $("#Resume_Btn_Hylb");
//工作状态
var $Resume_Btn_Gzzt = $("#Resume_Btn_Gzzt");


//修改求职意向
function Resume_JobTarget_Info() {
    var datacode = "data-code";
    //工作性质
    $Resume_Btn_Gzxz.attr(datacode, $Resume_Btn_Gzxz_Show.attr(datacode)).text($Resume_Btn_Gzxz_Show.text());
    $("#Resume_employmentType option").each(function () {
        var code = $(this).attr("value");
        if (code == $Resume_Btn_Gzxz_Show.attr(datacode)) {
            $(this).attr("selected", "selected");
        }
    });
    //工作地点:
    $Resume_Btn_Gzdd.text($Resume_Btn_Gzdd_Show.text()).attr(datacode, $Resume_Btn_Gzdd_Show.attr(datacode))
    //期望薪资
    $Resume_Btn_Qwxz.attr(datacode, $Resume_Btn_Qwxz_Show.attr(datacode)).text($Resume_Btn_Qwxz_Show.text());
    $("#Resume_salary option").each(function () {
        var code = $(this).attr("value");
        if (code == $Resume_Btn_Qwxz_Show.attr(datacode)) {
            $(this).attr("selected", "selected");
        }
    });
    //职位类别
    $Resume_Btn_Zwlb.attr(datacode, $Resume_Btn_Zwlb_Show.attr(datacode)).text($Resume_Btn_Zwlb_Show.text());
    //行业类别
    $Resume_Btn_Hylb.attr(datacode, $Resume_Btn_Hylb_Show.attr(datacode)).text($Resume_Btn_Hylb_Show.text());
    //工作状态
    $Resume_Btn_Gzzt.attr(datacode, $Resume_Btn_Gzzt_Show.attr(datacode)).text($Resume_Btn_Gzzt_Show.text());
    $("#Resume_QzyxGzzt_Select_List dd .name").each(function () {
        if ($(this).attr(datacode) == $Resume_Btn_Gzzt_Show.attr(datacode)) {
            $(this).parent("dd").addClass("h");
        }
    });
    //编辑 展示 切换
    $("#Resume_Qzyx_Content .edit").show();
    $("#Resume_Qzyx_Show").hide();
}


//保存求职意向后 赋值给展示区域
function Resume_Qzyx_MoveText() {
    var datacode = "data-code";
    //工作性质
    $Resume_Btn_Gzxz_Show.attr(datacode, $Resume_Btn_Gzxz.attr(datacode)).text($Resume_Btn_Gzxz.text());
    //工作地点:
    $Resume_Btn_Gzdd_Show.text($Resume_Btn_Gzdd.text()).attr(datacode, $Resume_Btn_Gzdd.attr(datacode))
    //期望薪资
    $Resume_Btn_Qwxz_Show.attr(datacode, $Resume_Btn_Qwxz.attr(datacode)).text($Resume_Btn_Qwxz.text());
    //职位类别
    $Resume_Btn_Zwlb_Show.attr(datacode, $Resume_Btn_Zwlb.attr(datacode)).text($Resume_Btn_Zwlb.text());
    //行业类别
    $Resume_Btn_Hylb_Show.attr(datacode, $Resume_Btn_Hylb.attr(datacode)).text($Resume_Btn_Hylb.text());
    //工作状态
    $Resume_Btn_Gzzt_Show.attr(datacode, $Resume_Btn_Gzzt.attr(datacode)).text($Resume_Btn_Gzzt.text());
    //编辑 展示 切换
    $("#Resume_Qzyx_Content .edit").hide();
    $("#Resume_Qzyx_Show").show();
}














//专业名称 容器
var $Resume_Major_Select = $("#Resume_Major_Select");

//专业名称 元素
var $Resume_Btn_Major = $("#edu_Major");

//专业名称==大类
var $Resume_Major_Select_List = $("#Resume_Major_Select_List");

//专业名称==小类
var $Resume_Major_ShowList = $("#Resume_Major_ShowList");
//专业名称==小类==标题（back）
var $Resume_Major_ShowList_Tit = $Resume_Major_ShowList.children(".titBack");
//专业名称==小类==列表（li）
var $Resume_Major_ShowList_Li = $Resume_Major_ShowList.find("dl").children("dd");

//专业名称==小类==返回（back）绑定
$Resume_Major_ShowList_Tit.click(function () {
    $Resume_Major_ShowList.removeClass("h");
});

//专业名称 点击（请求大类、判断已选、显示遮罩、控件、拼接=）
$Resume_Btn_Major.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_Major_Select.find(".finish"))

    //判断ResumeMajordata是否有值
    if (localStorage.getItem("ResumeMajordata")) {

        var ResumeMajordata = localStorage.getItem("ResumeMajordata");//取回变量
        data = JSON.parse(ResumeMajordata);//把字符串转换成JSON对象
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_Major_Select_List.children("dl").children().remove();
        $Resume_Major_Select_List.children("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_Major_Select_List.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetMajor', function (data, textStatus, jqxhr) {
            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_Major_Select_List.children("dl").children().remove();
            $Resume_Major_Select_List.children("dl").append(str);

            //中英文
            if (language != 1) {
                $Resume_Major_Select_List.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            ResumeMajordata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeMajordata", ResumeMajordata);//用localStorage保存转化好的的字符串
        }, "json");
    }
    

        //控件show
        $Resume_Major_Select_List.parent("#Resume_Major_Select").show();

        Resume_Major_Select_List.update();

        $Resume_Pop.show();
        RemoveBodyTouch();
    
});

//专业名称 大类当前点击元素（父级code）
var $Resume_Major_Fobj = {};
//专业名称==大类==点击（请求小类、显示小类层、拼接=）
$Resume_Major_Select_List.on("click", ".name", function () {
    $Resume_Major_Fobj = $(this);
    var $t = $(this);
    $.post('GetMajor', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {
        //clear
        $Resume_Major_ShowList.find("dl").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_Major_ShowList.find("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_Major_ShowList.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_Major);
        if (edCode.code) {
            $Resume_Major_ShowList.find("dd").each(function () {
                var code = $(this).attr("data-code");
                if (edCode.code == code) {
                    $(this).addClass("h");
                }
            })
        }

        //重置标题
        $Resume_Major_ShowList_Tit.text($t.text());
        //划出小类层
        $Resume_Major_ShowList.addClass("h");

        Resume_Major_ShowListSwiper.update();

    }, "json");

});


//简历勾选条件方法 
$Resume_Major_ShowList.on("click", "dd", function () {
    var fcode = $Resume_Major_Fobj.parent("dd").attr("data-code");
    var $t = $(this);
    if (!$t.hasClass("h")) {
        $t.addClass("h").siblings("dd").removeClass("h");
    }

    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();
    //$("#Resume_Major_Select .btn .finish").attr({ "data-code": code, "data-scode": fcode, "data-text": name });

    //关闭
    $Resume_Major_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    $Resume_Btn_Major.attr({ "data-code": code, "data-scode": fcode }).text(name);
})


//专业名称取消、完成事件绑定
$Resume_Major_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_Major_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    e.preventDefault();
    ////清空完成按钮的所有data属性值
    //$("#Resume_Major_Select .btn .finish").removeAttr("data-code").removeAttr("data-scode").removeAttr("data-text");
    ////去掉选中的样式
    //$("#Resume_Major_ShowListSwiper dl").find("dd").removeClass("h");
})
//$Resume_Major_Select.on("click", ".btn .finish", function () {
//    $Resume_Major_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_Major.attr({ "data-code": $("#Resume_Major_Select .btn .finish").attr("data-code"), "data-scode": $("#Resume_Major_Select .btn .finish").attr("data-scode") }).text($("#Resume_Major_Select .btn .finish").attr("data-text"));
//})







//工作经验-职位类别 容器
var $Resume_WorkJobType_Select = $("#Resume_WorkJobType_Select");

//工作经验-职位类别元素
var $Resume_Btn_WorkZwlb = $("#workExp_JobType");

//工作经验-职位类别==大类
var $Resume_WorkJobType_Select_List = $("#Resume_WorkJobType_Select_List");

//工作经验-职位类别==小类
var $Resume_WorkJobType_ShowList = $("#Resume_WorkJobType_ShowList");
//工作经验-职位类别==小类==标题（back）
var $Resume_WorkJobType_ShowList_Tit = $Resume_WorkJobType_ShowList.children(".titBack");
//工作经验-职位类别==小类==列表（li）
var $$Resume_WorkJobType_ShowList_Li = $Resume_WorkJobType_ShowList.find("dl").children("dd");
//工作经验-职位类别==已选元素外层

//工作经验-职位类别==小类==返回（back）绑定
$Resume_WorkJobType_ShowList_Tit.click(function () {
    $Resume_WorkJobType_ShowList.removeClass("h");
});


//工作经验-职位类别 点击（请求大类、判断已选、显示遮罩、控件、拼接=）
$Resume_Btn_WorkZwlb.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_WorkJobType_Select.find(".finish"));

    //判断JobTypeInfo_Singledata是否有值
    if (localStorage.getItem("JobTypeInfo_Singledata")) {
        var JobTypeInfo_Singledata = localStorage.getItem("JobTypeInfo_Singledata");//取回变量
        data = JSON.parse(JobTypeInfo_Singledata);//把字符串转换成JSON对象
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_WorkJobType_Select_List.children("dl").children().remove();
        $Resume_WorkJobType_Select_List.children("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_WorkJobType_Select_List.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetJobTypeInfo_Single', function (data, textStatus, jqxhr) {
            //new
            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_WorkJobType_Select_List.children("dl").children().remove();
            $Resume_WorkJobType_Select_List.children("dl").append(str);

            //中英文
            if (language != 1) {
                $Resume_WorkJobType_Select_List.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            JobTypeInfo_Singledata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("JobTypeInfo_Singledata", JobTypeInfo_Singledata);//用localStorage保存转化好的的字符串
        }, "json");
    }
        //控件show
        $Resume_WorkJobType_Select_List.parent("#Resume_WorkJobType_Select").show();

        Resume_WorkJobType_Select_List.update();

        $Resume_Pop.show();
        RemoveBodyTouch();
    
});

//大类点击元素code
var Resume_WorkZwlb_Code = "";

//工作经验-职位类别==大类==点击（请求小类、显示小类层、拼接=）
$Resume_WorkJobType_Select_List.on("click", ".name", function () {
    Resume_WorkZwlb_Code = $(this).parent("dd").attr("data-code");
    var $t = $(this);
    // $Resume_Smal_Remove = $(this).parent("dd");
    $.post('GetJobTypeInfo_Single', { code: $(this).parent("dd").attr("data-code") }, function (data, textStatus, jqxhr) {
        //clear
        $Resume_WorkJobType_ShowList.find("dl").children().remove();
        //new
        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_WorkJobType_ShowList.find("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_WorkJobType_ShowList.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }

        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_WorkZwlb);
        if (edCode.code) {
            $Resume_WorkJobType_ShowList.find("dd").each(function () {
                var code = $(this).attr("data-code");
                if (edCode.code == code) {
                    $(this).addClass("h");
                }
            })
        }

        //重置标题
        $Resume_WorkJobType_ShowList_Tit.text($t.text());
        //划出小类层
        $Resume_WorkJobType_ShowList.addClass("h");

        Resume_WorkJobType_ShowListSwiper.update();

    }, "json");

});


//职位名称元素
var Resume_Zwmc_Text = "";

//工作经验-职位类别 勾选方法 
$Resume_WorkJobType_ShowList.on("click", "dd", function () {



    var $t = $(this);
    if (!$t.hasClass("h")) {
        $t.addClass("h").siblings("dd").removeClass("h");
    }

    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();

    //职位名称赋值
    Resume_Zwmc_Text = name;

    //关闭 赋值
    $Resume_WorkJobType_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    $Resume_Btn_WorkZwlb.attr({ "data-code": code, "data-scode": Resume_WorkZwlb_Code }).text(name);
    $("#workExp_JobName").val(name);
    //$("#Resume_WorkJobType_Select .btn .finish").attr({ "data-code": code, "data-scode": Resume_WorkZwlb_Code, "data-text": name });

})

//工作经验-职位类别 取消、完成事件绑定
$Resume_WorkJobType_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_WorkJobType_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    e.preventDefault();
    ////清空完成按钮的所有data属性值
    //$("#Resume_WorkJobType_Select .btn .finish").removeAttr("data-code").removeAttr("data-scode").removeAttr("data-text");
    ////去掉选中的样式
    //$("#Resume_WorkJobType_ShowListSwiper dl").find("dd").removeClass("h");
})
//$Resume_WorkJobType_Select.on("click", ".btn .finish", function () {
//    //赋值职位名称
//    $("#workExp_JobName").val(Resume_Zwmc_Text);
//    $Resume_WorkJobType_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_WorkZwlb.attr({ "data-code": $("#Resume_WorkJobType_Select .btn .finish").attr("data-code"), "data-scode": $("#Resume_WorkJobType_Select .btn .finish").attr("data-scode") }).text($("#Resume_WorkJobType_Select .btn .finish").attr("data-text"));
//})






//工作经验--行业类别容器
var $Resume_WorkIndustry_Select = $("#Resume_WorkIndustry_Select");
//工作经验--行业类别元素
var $Resume_Btn_WorkHylb = $("#workExp_Industry");
//工作经验--行业类别==大类
var $Resume_WorkIndustry_Select_List = $("#Resume_WorkIndustry_Select_List");


//工作经验--行业类别（请求大类、判断已选、显示遮罩、控件、拼接=）
$Resume_Btn_WorkHylb.click(function () {
    //Resume_MoveCodeToFinish($(this), $Resume_WorkIndustry_Select.find(".finish"));

    //判断ResumeIndustrydata是否有值
    if (localStorage.getItem("ResumeIndustrydata")) {
        var ResumeIndustrydata = localStorage.getItem("ResumeIndustrydata");//取回变量
        data = JSON.parse(ResumeIndustrydata);//把字符串转换成JSON对象
        //clear
        $Resume_WorkIndustry_Select_List.children("dl").children().remove();

        var str = "";
        //拼接
        for (var i in data) {
            str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
        }
        //添加
        $Resume_WorkIndustry_Select_List.children("dl").append(str);

        //中英文
        if (language != 1) {
            $Resume_WorkIndustry_Select_List.find("dd").children("span.name").each(function () {
                var enstr = $(this).attr("data-en-name");
                $(this).text(enstr);
            });
        }
    } else {
        $.post('GetResumeIndustry', function (data, textStatus, jqxhr) {
            //clear
            $Resume_WorkIndustry_Select_List.children("dl").children().remove();

            var str = "";
            //拼接
            for (var i in data) {
                str += '<dd class="swiper-slide" data-code=' + data[i].code + '><span class="name" data-en-name="' + data[i].en_name + '">' + data[i].name + '</span></dd>';
            }
            //添加
            $Resume_WorkIndustry_Select_List.children("dl").append(str);

            //中英文
            if (language != 1) {
                $Resume_WorkIndustry_Select_List.find("dd").children("span.name").each(function () {
                    var enstr = $(this).attr("data-en-name");
                    $(this).text(enstr);
                });
            }
            //存入localStorage
            ResumeIndustrydata = JSON.stringify(data);//将JSON对象转化成字符串
            localStorage.setItem("ResumeIndustrydata", ResumeIndustrydata);//用localStorage保存转化好的的字符串
        }, "json");
    }
   
        //已选code
        var edCode = Resume_Ed_Code($Resume_Btn_WorkHylb);
        if (edCode.code) {
            $Resume_WorkIndustry_Select_List.find("dd").each(function () {
                var code = $(this).attr("data-code");
                if (edCode.code == code) {
                    $(this).addClass("h");
                }
            })
        }


        //控件show
        $Resume_WorkIndustry_Select_List.parent("#Resume_WorkIndustry_Select").show();

        Resume_WorkIndustry_Select_List.update();

        $Resume_Pop.show();
        RemoveBodyTouch();
    
});


//工作经验--行业类别 = 简历勾选条件方法 
$Resume_WorkIndustry_Select_List.on("click", "dd", function () {

    var $t = $(this);
    if (!$t.hasClass("h")) {
        $t.addClass("h").siblings("dd").removeClass("h");
    }

    //save code&name
    var code = $t.attr("data-code");
    var name = $t.text();

    //$("#Resume_WorkIndustry_Select .btn .finish").attr({ "data-code": code, "data-text": name });

    //关闭 赋值
    $Resume_WorkIndustry_Select.hide();
    $Resume_Pop.hide();
    RecoveryBodyTouch();
    $Resume_Btn_WorkHylb.attr("data-code", code).text(name);
})

//工作经验--行业类别 取消、完成事件绑定
$Resume_WorkIndustry_Select.on("touchend", ".btn .close", function (e) {
    setTimeout(function () {
        $Resume_WorkIndustry_Select.hide();
        $Resume_Pop.hide();
        RecoveryBodyTouch();
    }, 20);
    e.preventDefault();
    ////清空完成按钮的所有data属性值
    //$("#Resume_WorkIndustry_Select .btn .finish").removeAttr("data-code").removeAttr("data-text");
    ////去掉选中的样式
    //if ($("#Resume_WorkIndustry_Select_List dl").find("dd").hasClass("h")) {
    //    $("#Resume_WorkIndustry_Select_List dl").find("dd").addClass("h").siblings("dd").removeClass("h");
    //}
})
//$Resume_WorkIndustry_Select.on("click", ".btn .finish", function () {
//    $Resume_WorkIndustry_Select.hide();
//    $Resume_Pop.hide();
//    RecoveryBodyTouch();
//    //所有data属性值赋值给操作区域
//    $Resume_Btn_WorkHylb.attr("data-code", $("#Resume_WorkIndustry_Select .btn .finish").attr("data-code")).text($("#Resume_WorkIndustry_Select .btn .finish").attr("data-text"));
//})


//保存简历名称
$("#Resume_resumeName").blur(function () {
    var $t = $(this);
    var newText = $t.val();
    $.post('RenameResume', {
        resumeId: $t.attr("data-code"),
        newName: newText
    }, function (data, textStatus, jqxhr) {
        handlePostAjaxResult(data, textStatus, jqxhr, function (data) {
            console.log("修改简历名称成功");
        });
    }, "json");
});


//简历完整度
var $Resume_Percent = $(".Resume_Percent .con");
var Resume_PercentNum = $Resume_Percent.next(".num").children(".text").text();
$Resume_Percent.children(".tianchong").css("width", Resume_PercentNum + "%");
$Resume_Percent.children(".arrow").css("left", Resume_PercentNum + "%");
if (Resume_PercentNum == "100") {
    $Resume_Percent.children(".tianchong").addClass("h");
}



//通过验证val检查是否完整（$obj = 模块外层元素）
function Resume_CheakVal($obj) {
    var valObj = {};
    valObj.wanzheng = true;
    valObj.listLen = 0;
    valObj.list = [];
    var $CheakSpan = $obj.find(".ResumeCheakVal");
    $CheakSpan.each(function () {
       
        if ($(this).text() == "" || $(this).text() == " " || $(this).text() == undefined) {
            valObj.wanzheng = false;
            valObj.list.push($(this));
            valObj.listLen++;
        }
        
    });
    if (valObj.listLen == $CheakSpan.length) {
        valObj.listLen = true;
    }else{
        valObj.listLen = false;
    }
    return valObj;
}



//初始化预览与编辑区域隐藏显示判断
function Resume_Load($obj, $TitObj, gz) {
    var $WrapObj = $obj;
    var Resume_Integrity = Resume_CheakVal($WrapObj);

    //个人信息完整值
    this.Wanzheng = function () {
        var Resume_Integrity = Resume_CheakVal($WrapObj);
        //全部填写
        if (Resume_Integrity.wanzheng == true) {
            $WrapObj.show().prev(".edit").hide();
        }//全部未填写
        else if (Resume_Integrity.listLen) {
            $WrapObj.hide().prev(".edit").hide();
        }
        //未填写条数>0 并且 不是全部未填写
        if (Resume_Integrity.list.length > 0 && !Resume_Integrity.listLen && isCreate != 1) {
            $WrapObj.show().prev(".edit").hide();
            //$TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").show().removeClass("b");
            $TitObj.children(".Resume_Tit_Edit").show().next(".prompt").hide().removeClass("b");

            for (i = 0; i < Resume_Integrity.list.length; i++) {
                $("<font class='weitianxie' color='#f00'>未填写</font>").appendTo($(Resume_Integrity.list[i]));
            }

            //重新赋值
            if (gz) {
                Resume_JobTarget_Info();
            } else {
                //Resume_Edit_Info();
            }
        }
        //首次创建
        if (isCreate) {
            //显示添加隐藏修改
            $TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").show().addClass("b");
            //全部隐藏
            $WrapObj.hide().prev(".edit").hide();
        }

    };
    //标题
    this.Title = function () {
        var Resume_Integrity = Resume_CheakVal($WrapObj);
        
        //标题操作按钮
        if (Resume_Integrity.wanzheng == true) {
            //全部填写 显示修改隐藏添加
            $TitObj.children(".Resume_Tit_Edit").show().next(".prompt").hide();
        } else if (Resume_Integrity.listLen) {
            //全部未填写 显示添加隐藏修改
            $TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").show().addClass("b");
        }
        else {
            //部分填写 显示修改隐藏添加
            $TitObj.children(".Resume_Tit_Edit").show().next(".prompt").hide();
            //$TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").hide();
        }
        //首次创建
        if (isCreate) {
            //显示添加隐藏修改
            $TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").show().addClass("b");
        }
    }
    //点击取消
    this.Close = function () {
        var Resume_Integrity = Resume_CheakVal($WrapObj);
        //未填写条数>0 并且 不是全部未填写
        if (Resume_Integrity.list.length > 0 && !Resume_Integrity.listLen && isCreate != 1) {
            for (i = 0; i < Resume_Integrity.list.length; i++) {
                $("<font class='weitianxie' color='#f00'>未填写</font>").appendTo($(Resume_Integrity.list[i]));
            }
            $WrapObj.show().prev(".edit").hide();
            $TitObj.children(".Resume_Tit_Edit").show().next(".prompt").hide();
        }
        //全部填写
        if (Resume_Integrity.wanzheng == true) {
            $WrapObj.show().prev(".edit").hide();
            $TitObj.children(".Resume_Tit_Edit").show().next(".prompt").hide();
        }//全部未填写
        else if (Resume_Integrity.listLen || isCreate==1) {
            $WrapObj.hide().prev(".edit").hide();
            $TitObj.children(".Resume_Tit_Edit").hide().next(".prompt").show().addClass("b");
        }

        //select 取消后 选中第一个
        if (gz) {
            $("#Resume_employmentType option").first().attr("selected", "selected");
            $("#Resume_salary option").first().attr("selected", "selected");
        }
    }
}
//初始化
var Resume_Info_Load = new Resume_Load($("#Resume_Grxx_Show"), $("#Resume_Grxx"));
Resume_Info_Load.Wanzheng();
Resume_Info_Load.Title();

//初始化
var Resume_Jobt_Load = new Resume_Load($("#Resume_Qzyx_Show"), $("#Resume_Qzyx"),gz = true);
Resume_Jobt_Load.Wanzheng();
Resume_Jobt_Load.Title();




//个人信息编辑取消事件
$("#Resume_Grxx_Content .close").click(function () {
    Resume_Info_Load.Close();
});

//求职意向编辑取消事件
$("#Resume_Qzyx_Content .close").click(function () {
    Resume_Jobt_Load.Close();
});

//个人信息点击修改
$Resume_Grxx_Edit.click(function () {
    $(this).hide();
    $("#Resume_Grxx_Show").find(".weitianxie").remove();
    Resume_Edit_Info();
    
});

//求职意向点击修改
$Resume_Qzyx_Edit.click(function () {
    $(this).hide();
    $("#Resume_Qzyx_Show").find(".weitianxie").remove();
    Resume_JobTarget_Info();
});

//各项标题添加事件
$(".Resume_Content_Box .prompt").each(function (i) {
    $(this).click(function () {
        if (i != 0 && !Resume_Cn_InFo) {
            handlePrompt("请完善个人信息");
        } else {
            var $t = $(this);
            var $p = $t.parent(".Resume_Content_Box");
            if ($t.hasClass("b")) {
                $t.hide();//隐藏prompt
                //$t.removeClass("b");
                // $p.next(".Resume_Box_Content").find(".weitianxie").remove();
                $p.next(".Resume_Box_Content").children(".edit").show();
                $t.prev(".Resume_Tit_Edit").trigger("click");
            } 
        }
    });
});


//是否将求职意向显示事件
$(".showQzyxForR").on("click", function (e) {
    $(this).children("b").toggleClass("h");
    e.preventDefault();
});


//取消按钮清除所有dd  class
$(".Resume_Box_Content .edit .list li.Operation .close").click(function () {
    $(".swiper-wrapper dd").removeClass("h");
    Resume_Zwmc_Text = "";
});


//触摸反馈
touchStyle = function (B,C, A,Fclass) {
    $(B).on("touchstart",C, function () {
        $(this).addClass(A);
        if (Fclass) {
            $(this).parents(".smal").removeClass(A);
        }
    }
    );
    //$(B).on("touchmove", C, function () {
    //    $(this).removeClass(A)
    //}
    //);
    $(B).on("touchend", C, function () {
        $(this).removeClass(A);
        
    }
    );
    $(B).on("touchcancel", C, function () {
        $(this).removeClass(A);
        
    }
    )
}
//户口
touchStyle("#Resume_HuKou_ShowList .list", ".smal", "touchH");

//现居住
touchStyle("#Resume_XianJuZhu_ShowList .list", ".smal", "touchH");
touchStyle("#Resume_XianJuZhu_ShowList .list", ".subList li", "touchH", Fclass = true);

//工作地点
touchStyle("#Resume_WorkCity_ShowList .list", ".smal", "touchH");
touchStyle("#Resume_WorkCity_ShowList .list", ".subList li", "touchH", Fclass = true);

//职位类别
touchStyle("#Resume_JobType_Select_List", "dd", "touchH");
touchStyle("#Resume_JobType_ShowList", "dl dd", "touchH");

//行业类别
touchStyle("#Resume_Industry_Select_List", "dd", "touchH");

//专业名称
touchStyle("#Resume_Major_Select_List", "dd", "touchH");
touchStyle("#Resume_Major_ShowList", "dl dd", "touchH");

//学历学位
touchStyle("#Resume_JybjXlxw_Select_List", "dd", "touchH");

//工作经验-行业类别
touchStyle("#Resume_WorkIndustry_Select_List", "dd", "touchH");

//工作经验-职位类别
touchStyle("#Resume_WorkJobType_Select_List", "dd", "touchH");
touchStyle("#Resume_WorkJobType_ShowList", "dl dd", "touchH");

//工作经验-薪资
touchStyle("#Resume_GzjyZwxj_Select_List", "dd", "touchH");

//薪资
touchStyle("#Resume_QzyxQwxj_Select_List", "dd", "touchH");

//工作状态
touchStyle("#Resume_QzyxGzzt_Select_List", "dd", "touchH");



var ResumeBoxTop = 0;
//编辑时隐藏 个人 求职 教育工作新增
$(".Resume_Tit_Edit,.Resume_Content_Box .prompt.b").click(function () {

    if ($(this).parent(".Resume_Content_Box").attr("id") != "Resume_Grxx" && !Resume_Cn_InFo) {
        return false;
    }

    //个人信息margintop 
    if ($(this).parent(".Resume_Content_Box").attr("id") == "Resume_Grxx") {
        $(this).parent(".Resume_Content_Box").css("margin-top","0px");
    }

    var $t = $(this);
    var con = ".Resume_Content_Box";
    var box = ".Resume_Box_Content";
    //手机号码
    $Resume_MobilePhone.val($Resume_MobilePhone_Show.text());
    //邮箱
    $Resume_Email.val($Resume_Email_Show.text());

    //当前距顶位置
    ResumeBoxTop  = $t.parent(con).position().top;
    //标题栏
    $t.parent(con).siblings(con).hide();
    //con
    $t.parent(con).next(box).siblings(box).hide();
    //名称 完整度
    $(".Resume_top_cont,.Resume_Percent").hide();
    //顶部
    $("body").scrollTop(0);
});
//保存取消-恢复
function ResumeHuiFu(t) {
    var $t = $(t);
    var con = ".Resume_Content_Box";
    var box = ".Resume_Box_Content";
    //con
    $t.parents(box).siblings(box).show();
    //标题栏
    $t.parents(box).prev(con).siblings(con).show();
    //名称 完整度
    $(".Resume_top_cont,.Resume_Percent").show();

    //move body scroll
    $("body").scrollTop(ResumeBoxTop);
};

$(".Resume_Box_Content .edit .list li.Operation .close").click(function () {
    var $t = $(this);
    var con = ".Resume_Content_Box";
    var box = ".Resume_Box_Content";
    //con
    $t.parents(box).siblings(box).show();
    //标题栏
    $t.parents(box).prev(con).siblings(con).show();
    //名称 完整度
    $(".Resume_top_cont,.Resume_Percent").show();
    //个人信息margintop 
    if ($t.parents(box).prev(con).attr("id") == "Resume_Grxx") {
        $t.parents(box).prev(con).css("margin-top", "20px");
    }
    //显示教育 工作 已有列表
    $t.parents(box).children(".Resume_Display_Box").show();

    //move body scroll
    $("body").scrollTop(ResumeBoxTop);
});
//var ResumeTriggerVar = false;

//window.onload = function(){ ResumeTriggerVar = true;};

//编辑时隐藏  教育 工作 编辑
$(".Resume_Display_Box .Operation_btn em.edit").click(function () {
    if ($(this).parent(".Resume_Content_Box").attr("id") != "Resume_Grxx" && !Resume_Cn_InFo) {
        return false;
    }
        var $t = $(this);
        var con = ".Resume_Content_Box";
        var box = ".Resume_Box_Content";
        //当前距顶位置
        ResumeBoxTop = $t.parents(box).prev(con).position().top;
        //标题栏
        $t.parents(box).siblings(box).hide();
        //con
        $t.parents(box).prev(con).siblings(con).hide();
        //隐藏多条
        $(this).parents(".list.h").siblings(".list.h").hide();
        //名称 完整度
        $(".Resume_top_cont,.Resume_Percent").hide();

        //顶部
        $("body").scrollTop(0);

});


//返回判断
$(".j_header .j_return").on("touchstart", function (e) {

    var edLen = $(".Resume_Box_Content>.edit:visible").length;
    if (edLen == 1) {
        $(".Resume_Box_Content>.edit:visible").find(".close").trigger("click");
    } else {
        popPage(); resumeReturnCookie();
    }

    e.preventDefault();
});

//判断完整度触发编辑状态

function ResumeCheakEdit() {

    var Resume_Integrity = Resume_CheakVal($("#Resume_Grxx_Show"));

    if (!Resume_Integrity.wanzheng && !isCreate) {
        $("#Resume_Grxx_Edit").trigger("click");
        return false;
    }

    $(".Resume_Display_Box .list").each(function () {
        if ($(this).attr("data-wz") == "F") {
            $(this).find(".Operation_btn").children(".edit").trigger("click");
            return false;
        }
    });

}
//ResumeCheakEdit();


//点击遮罩层关闭当前控件
$Resume_Pop.on("click", function () {
    $(".Resume_Pop_close:visible").find(".close").trigger("touchend");
})


$(".Resume_top_cont .edit_icon").click( function () {

    //setTimeout(function () {
        $("#Resume_resumeName").focus();
        //var scroll = $("body").scrollTop();
       
    //}, 1);

    //e.preventDefault();
    //return false;
});