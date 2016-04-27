(function($){
    $.fn.cityselect = function(options){
        var obj = {
			selectProv:".select_prov",//左侧省份菜单下拉框
			selectProvInput:".select_list_input",//左侧省份列表
            selectCity:".select_city",//右侧市级菜单下拉框
            selectCityInput:".select_list_input",//右侧市级列表
            url:"js/city.min.js"//省、市json文件
        };

        var options = $.extend(obj, options);
        var city_json; //存储json数据

        // 设置省市json数据
        if(typeof(obj.url)=="string"){
            $.getJSON(obj.url,function(json){
                city_json=json;
                init();
            });
        }else{
            city_json=obj.url;
            init();
        };

        //获取class
        var prov_obj = this.find(options.selectProv);//左侧下拉框
        var prov_input = prov_obj.find(options.selectProvInput);//左侧显示框
        var prov_ul = prov_obj.find('ul');//左侧下拉框ul

        var city_obj = this.find(options.selectCity);//右侧下拉框
        var city_input = city_obj.find(options.selectCityInput);//右侧显示框
        var city_ul = city_obj.find('ul');//右侧侧下拉框ul

        //左侧点击事件
        prov_input.on("click", function(){
            selectUp();
            if(prov_ul.is(":hidden")){
                prov_ul.slideDown('fast');
                getStyleShow(prov_obj,"border-bottom");
                getStyleShow(prov_ul,"border-top");
            }else{
               selectUp();
            }
        });

        //右侧点击事件
        city_input.on("click", function(){
            selectUp();
            if(city_ul.is(":hidden")){
                city_ul.slideDown('fast');
                getStyleShow(city_obj,"border-bottom");
                getStyleShow(city_ul,"border-top");
            }else{
               selectUp();
            }
        });

        //省份、市级菜单初始化
        var init = function(){
            var temp_html = "";//省份
            
            $.each(city_json.citylist,function(i,prov){
                temp_html+="<li>"+prov.p+"</li>";
            });
            prov_ul.html(temp_html);

            prov_ul.find('li').on("click", function(){
                var index = $(this).index();
                var temp_html2 = "";//市级
                prov_input.html(city_json.citylist[index].p);
                selectUp();//下拉框关闭
                city_input.html("请选择城市");

                $.each(city_json.citylist[index].c,function(i,prov){
                    temp_html2+="<li>"+prov.n+"</li>";
                });
                city_ul.html(temp_html2);
            });

            city_ul.on("click","li", function(){
                var index2 = $(this).index();
                city_input.html($(this).text());
                selectUp();
            });         
        }


        //下拉框关闭
        var selectUp = function(){
            prov_ul.slideUp('fast', function(){
                getStyleHide(prov_obj,"border-bottom");
                getStyleHide(prov_ul,"border-top");
            });
            city_ul.slideUp('fast', function(){
                getStyleHide(city_obj,"border-bottom");
                getStyleHide(city_ul,"border-top");
            });
        } 

        var getStyleHide = function(obj, attr){
            obj.css(attr,"1px solid #ddd");
        }
        var getStyleShow = function(obj, attr){
            obj.css(attr,"1px solid transparent");
        } 
    }
})(jQuery);