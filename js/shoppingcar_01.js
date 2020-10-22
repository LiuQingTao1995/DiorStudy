
//读取本地数据并渲染到界面
if(localStorage.getItem('goods')){
    var goodsData = JSON.parse(localStorage.getItem('goods'));
    $.ajax({
        type: "get",
        url: "../data/goods_all.json",
        dataType: "json",
        success: function (json) {
            var domStr = '';
            $.each(json.data,function(index,item){
                $.each(goodsData,function(i,obj){
                    if(item.id == obj.id){
                        //console.log(obj.id);
                        domStr += `
                        <ul class="order_lists">
                        <li class="list_chk">
                            <input type="checkbox" id="checkbox_2" class="son_check">
                            <label for="checkbox_2"></label>
                        </li>
                        <li class="list_con">
                            <div class="list_img">
                                <a href="javascript:;">
                                    <img src="${item.imgBig}" alt="">
                                </a>
                            </div>
                            <div class="list_text">
                                <a href="javascript:;">${item.title}</a>
                            </div>
                        </li>
                        <li class="list_info">
                            <p>${item.size}</p>
                        </li>
                        <li class="list_price">
                            <p class="price">${item.price}</p>
                        </li>
                        <li class="list_amount">
                            <div class="amount_box">
                                <a href="javascript:;" class="reduce reSty">-</a>
                                <input type="text" value="${obj.num}" class="sum">
                                <a href="javascript:;" class="plus">+</a>
                            </div>
                        </li>
                        <li class="list_sum">
                            <p class="sum_price">￥300</p>
                        </li>
                        <li class="list_op">
                            <p class="del">
                                <a href="javascript:;" class="delBtn">移除商品</a>
                            </p>
                        </li>
                    </ul>
                        `
                    }
                    
                })
            })
            //console.log(domStr)
            $('.order_content').html(domStr)
        }
    });
}
else{
    var domStr = `<h1>购物车暂无数据！</h1>`;
    $('.order_content').html(domStr);
}

// 全选按钮
$(function () {
    var $allCheckbox = $('input[type="checkbox"]')
        , $wholeChexbox = $('.whole_check')
        , $cartBox = $('.cartBox')
        , $shopCheckbox = $('.shopChoice')
        , $sonCheckBox = $('.son_check');
    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.next('label').addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.next('label').removeClass('mark');
        }
        totalMoney();
    });
    $sonCheckBox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                var len = $sonCheckBox.length;
                var num = 0;
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }
            } else {
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');
            }
        })
    })
    $shopCheckbox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                var len = $shopCheckbox.length;
                var num = 0;
                $shopCheckbox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }
                $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
            } else {
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
            }
            totalMoney();
        });
    });
    $cartBox.each(function () {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                    }
                } else {
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });
    });
    var $plus = $('.plus')
        , $reduce = $('.reduce')
        , $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input')
            , $count = parseInt($inputVal.val()) + 1
            , $obj = $(this).parents('.amount_box').find('.reduce')
            , $priceTotalObj = $(this).parents('.order_lists').find('.sum_price')
            , $price = $(this).parents('.order_lists').find('.price').html()
            , $priceTotal = $count * parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥' + $priceTotal);
        if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
            $obj.removeClass('reSty');
        }
        totalMoney();
    });
    $reduce.click(function () {
        var $inputVal = $(this).next('input')
            , $count = parseInt($inputVal.val()) - 1
            , $priceTotalObj = $(this).parents('.order_lists').find('.sum_price')
            , $price = $(this).parents('.order_lists').find('.price').html()
            , $priceTotal = $count * parseInt($price.substring(1));
        if ($inputVal.val() > 1) {
            $inputVal.val($count);
            $priceTotalObj.html('￥' + $priceTotal);
        }
        if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
            $(this).addClass('reSty');
        }
        totalMoney();
    });
    $all_sum.keyup(function () {
        var $count = 0
            , $priceTotalObj = $(this).parents('.order_lists').find('.sum_price')
            , $price = $(this).parents('.order_lists').find('.price').html()
            , $priceTotal = 0;
        if ($(this).val() == '') {
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g, ''));
        $count = $(this).val();
        $priceTotal = $count * parseInt($price.substring(1));
        $(this).attr('value', $count);
        $priceTotalObj.html('￥' + $priceTotal);
        totalMoney();
    })
    var $order_lists = null;
    var $order_content = '';
    $('.delBtn').click(function () {
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
    });
    $('.closeModel').click(function () {
        closeM();
    });
    $('.dialog-close').click(function () {
        closeM();
    });
    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);
    }
    $('.dialog-sure').click(function () {
        $order_lists.remove();
        if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
            $order_content.parents('.cartBox').remove();
        }
        closeM();
        $sonCheckBox = $('.son_check');
        totalMoney();
    })
    function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥' + total_money);
        $('.piece_num').html(total_count);
        if (total_money != 0 && total_count != 0) {
            if (!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if (calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
    }
})