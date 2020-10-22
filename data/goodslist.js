
const url = ruquire('url');

$.ajax({
    url : '../data/goods.json',
    type : 'get',
    dataType : 'json',
    success: function(json){
        //console.log(json.data);
        var str = '';
        $.each(json.data,function(index,item){
            //console.log(item);
            //console.log(index[1]);
            
            str += `
            <div class="left">
            <div class="left_big">
                <img src="../images/kouhong_01.jpg">
            </div>

            <div class="left_small one">
                <img src="../images/kouhong_04.jpg" alt="">
            </div>

            <div class="left_small">
                <img src="../images/kouhong_05.jpg" alt="">
            </div>
        </div>

        <div class="right">
            <div class="right_title">
                <h3>迪奥魅惑星钻唇膏</h3>
                <p>星钻唇芯 晶润莹亮</p>
            </div>

            <div class="right_select">
                <select>
                    <option value="620 肉桂奶茶 ￥330">620 肉桂奶茶 ￥330</option>
                    <option value="482 星河玫瑰">482 星河玫瑰 ￥330</option>
                    <option value="opel">669 星钻蜜桃 ￥330</option>
                </select>
            </div>

            <div class="right_buy">
                <button>立即购买</button>
            </div>

            <div class="right_decoration">
                <div class="decoration_up">
                    <div>
                        <span class="iconfont">&#xe634;</span> 所有订单均享免费顺丰速递
                    </div>
                    <div>
                        <span class="iconfont">&#xe61d;</span> 非定制商品订单自签收日起7天内可享无理由退货
                    </div>
                    <div>
                        <span class="iconfont">&#xe652;</span> 您的订单将尊享Dior迪奥艺术包装并随附个性化定制祝福
                    </div>
                </div>
                <div class="decoration_down">
                    <h3>描述</h3>
                    <p>魅惑星钻唇膏*，经典星耀色泽，搭配全新星钻唇芯。迪奥幸运星镶嵌于膏体中央，金灿星河细闪，星钻光芒，光彩夺目，闪耀幸运。轻抹间，呈现耀闪色泽，双唇晶润莹亮。膏体散发轻柔麝香调香草气息，融蕴芦荟成分，持久滋润双唇，带来舒适感受。
                    </p>
                </div>
            </div>
            `
        })
        //console.log(str);
        $('#content_all').html(str);
    }
})











