//屏幕大小适配,大手机下面留白太多;动画时间完善下;做成微信版;touch改原生的


$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
})

	//音乐
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('music');
            audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
});
touch.on($('.music'), 'tap', function() {
	$(this).toggleClass('music_stop');
	if ($('#music')[0].paused) {
		$('#music')[0].play();
	}else{
		$('#music')[0].pause();
	}
})
	//	图片预加载
var arrImags = ['images/dt1.png', 'images/n1_bg.jpg', 'images/n1_mz1.png', 'images/n1_mz2.png', 'images/n1_mz3.png', 'images/n2_1.png', 'images/n2_3.png', 'images/n2_4.png', 'images/n3_1.png', 'images/n3_2.png', 'images/n4_1.png', 'images/n4_2.png', 'images/n5_2.png', 'images/n5_3.png', 'images/n7_1.png', 'images/n3_h.png', 'images/n3_s.png', 'images/n4_left.png', 'images/n4_right.png', 'images/yuan.png']
var imglength = 0;
//var index_bol=false;
for(var i = 0; i < arrImags.length; i++) {
	var img = new Image();
	img.src = arrImags[i];
	img.onload = function() {
		imglength++;
		$(".rate").html(parseInt(imglength / arrImags.length * 100) + "%");
		if(imglength >= arrImags.length) {
			$('.page0_loading').hide().remove();
		}
	}
}
//画canvas
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');



function Canvas(ctx, rate, n, color, speed) { //创建原函数
	this.color = color;
	this.rate = rate;
	this.ctx = ctx;
	this.speed = speed;
	this.distence = 66 * (n - 1);
	this.r = 20;
	this.x = 0;
}
Canvas.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.arc(59 + this.distence, 50, this.r, 0, Math.PI * 2, false);
	this.ctx.strokeStyle = '#626262';
	this.ctx.lineWidth = 5;
	this.ctx.stroke();
}
Canvas.prototype.move = function() {
	this.x++;
	this.ctx.beginPath();
	this.ctx.arc(59 + this.distence, 50, this.r, -Math.PI / 2, -Math.PI / 2 + this.x / 100 * Math.PI * 2, false);
	this.ctx.strokeStyle = this.color;
	this.ctx.lineWidth = 5;
	this.ctx.stroke();
}
function canvas_text(canv,i){
	var m=0;
	$('.page2_rates span').eq(i).css({
		'color':canv.color,
		top:45,
		left:49 + canv.distence
	});
	var text_timer=setInterval(function(){
		m++;
		var str = m + '%';
	$('.page2_rates span').eq(i).html(str);
	if (m>=canv.rate) {
			clearInterval(text_timer)
		}
	},canv.speed)
	
}
function moves(canv) { //对4个小圆模拟动画,擦了重写,用setinterval
	
	var timer = setInterval(function() {
			canv.ctx.clearRect(36 + canv.distence, 0, 46, 100) //创建小块的清除区域,不需要全部清除
			canv.draw()
			canv.move();
			if(canv.x >= canv.rate) {
				clearInterval(timer)
			}
		}, canv.speed) //通过属性添加进来参数!
}

function creatCanvas() {
	var canvas1 = new Canvas(ctx, 9, 1, '#ffc200', 50); //创建4个实例
	moves(canvas1);
	canvas_text(canvas1,0);
	var canvas2 = new Canvas(ctx, 18, 2, '#fe9000', 50);
	moves(canvas2);
	canvas_text(canvas2,1);
	var canvas3 = new Canvas(ctx, 27, 3, '#01abf1', 50);
	moves(canvas3);
	canvas_text(canvas3,2);
	var canvas4 = new Canvas(ctx, 46, 4, '#89a108', 30);
	moves(canvas4);
	canvas_text(canvas4,3);
}

//page1出现
function page1_into(){
	$('.page1_move').addClass('page1_move_animation')
	$('.page1_word1').addClass('page1_word1_animation')
	$('.page1_word2').addClass('page1_word2_animation')
	$('.page1_word3').addClass('page1_word3_animation')
	$('.page1_x').addClass('page1_x_animation')
}
//page1消失
function page1_out(){
	$('.page1_move').removeClass('page1_move_animation')
	$('.page1_word1').removeClass('page1_word1_animation')
	$('.page1_word2').removeClass('page1_word2_animation')
	$('.page1_word3').removeClass('page1_word3_animation')
	$('.page1_x').removeClass('page1_x_animation')
}

function page2_into() {
	//page2出现
	$('.page2_top').addClass('page2_top_animation');
	$('.page2_middle').addClass('page2_middle_animation');
	setTimeout(function() {
			creatCanvas();
		}, 1000) //延时让动画跟在父级后面
	$('.page2_bottom').addClass('page2_bottom_animation');
	$('.page2_bot_movel').addClass('page2_bottoml_animation');
	$('.page2_bot_mover').addClass('page2_bottomr_animation');
}
page2_into()
	//page2消失
function page2_out() {
	$('.page2_top').removeClass('page2_top_animation');
	$('.page2_middle').removeClass('page2_middle_animation');
	ctx.clearRect(0, 0, 500, 500)
	$('.page2_bottom').removeClass('page2_bottom_animation');
	$('.page2_bot_movel').removeClass('page2_bottoml_animation');
	$('.page2_bot_mover').removeClass('page2_bottomr_animation');
}

//page3出现
function page3_middleDetail_show() {
	//	setTimeout(function(){$('.page3_red').css('opacity',1);$('.page3_blue').css('opacity',1)},100)
	var arrWidths = [155, 108, 53, 78, 78, 53, 47, 53, 5, 42, 33, 37, 30, 26, 19, 19, 15, 19]
	for(var i = 0; i < 18; i++) {
		$('.page3_middle').find('.page3_red').eq(i).animate({
			width: arrWidths[2 * i]
		}, 3000)
		$('.page3_middle').find('.page3_blue').eq(i).animate({
			width: arrWidths[2 * i + 1]
		}, 3000)
	}
	var arrtext = ["40%", "29%", "11%", "19%", "19%", "11%", "10%", "11%", "1%", "9%", "7%", "8%", "6%", "5%", "3%", "3%", "2%", "3%"]
	for(var i = 0; i < 18; i++) {
		page3_middle_increase(arrtext[i].substring(0, arrtext[i].length - 1), $('.page3_middle_text').eq(i))
	}
}

function page3_middle_increase(rate, em) {
	var x = 0;
	var timer3 = setInterval(function() {
		x++;
		em.css('opacity', 1)
		em.html(x + '%')
		if(x >= rate) {
			clearInterval(timer3)
		}
	}, 2000 / rate)
}
function page3_into() {
	$('.page3_top').addClass('page3_top_animation');
	$('.map1').addClass('page3_map1_animation');
	$('.map2').addClass('page3_map2_animation');
	$('.huo').addClass('page3_huo_animation');
	$('.shui').addClass('page3_huo_animation');
	$('.page3_top_text').addClass('page3_text_animation');
	$('.page3_middle').addClass('page3_middle_animation');
	setTimeout(page3_middleDetail_show, 6000)
	$('.page3_bottom').addClass('page3_bottom_animation');
}
	//page3动画消失
function page3_out() {
	$('.page3_top').removeClass('page3_top_animation');
	$('.map1').removeClass('page3_map1_animation');
	$('.map2').removeClass('page3_map2_animation');
	$('.huo').removeClass('page3_huo_animation');
	$('.shui').removeClass('page3_huo_animation');
	$('.page3_top_text').removeClass('page3_text_animation');
	$('.page3_middle').removeClass('page3_middle_animation');
	$('.page3_red').css('width', 0);//3s内无效,因为动画还在执行
	$('.page3_blue').css('width', 0);
	$('.page3_middle_text').css('opacity', 1);
	$('.page3_bottom').removeClass('page3_bottom_animation');
}

//page4出现
function page4_into() {
	$('.page4_top').addClass('page4_top_animation');
	$('.page4__top_left').addClass('page4_topleft_animation');
	$('.page4__top_right').addClass('page4_topright_animation');
	$('.page4__top_wraptext').addClass('page4_toptext_animation');
	$('.page4__top_lightning').addClass('page4_lightning_animation');
	$('.page4_bottom').addClass('page4_bottom_animation');
}
	//page4消失
function page4_out() {
	$('.page4_top').removeClass('page4_top_animation');
	$('.page4__top_left').removeClass('page4_topleft_animation');
	$('.page4__top_right').removeClass('page4_topright_animation');
	$('.page4__top_wraptext').removeClass('page4_toptext_animation');
	$('.page4__top_lightning').removeClass('page4_lightning_animation');
	$('.page4_bottom').removeClass('page4_bottom_animation');
}
//page5出现
function page5_into() {
	$('.page5_top').addClass('page5_top_animation');
	$('.page5_img1').addClass('page5_img1_animation');
	$('.page5_img2').addClass('page5_img2_animation');
	$('.page5_img3').addClass('page5_img3_animation');
	$('.page5_img4').addClass('page5_img4_animation');
	$('.page5_middle').addClass('page5_middle_animation');
	$('.page5_bottom').addClass('page5_bottom_animation');
}
	//page5消失
function page5_out() {
	$('.page5_top').removeClass('page5_top_animation');
	$('.page5_img1').removeClass('page5_img1_animation');
	$('.page5_img2').removeClass('page5_img2_animation');
	$('.page5_img3').removeClass('page5_img3_animation');
	$('.page5_img4').removeClass('page5_img4_animation');
	$('.page5_middle').removeClass('page5_middle_animation');
	$('.page5_bottom').removeClass('page5_bottom_animation');
}
//page6出现
var arr_page6 = [22, 100, 177, 254, 254];
var i = 0;
var page6_bol = true;

function page6_into() {
	i=0;
	$('.page6_wrap').addClass('page6_wrap_animation');
	page6_bol=true;
	setTimeout(page6_move, 1500)
}

function page6_move() {
	if(page6_bol) {//多层bol值判断是为了让动画更快停下来,让下面的开关函数更灵敏
		$('.page6_ul li strong').eq(i).animate({
			width: 55,
			height: 55
		}, 500, function() {
			if(page6_bol){
				$('.page6_ul li span').eq(i).animate({
					width: 192,
					height: 55
				}, 500, function() {
					if (page6_bol) {
						$('.page6_line').animate({
							height: arr_page6[i]
						}, 300)
					}
				})
			}
		})
		if(i <= 3) {
			setTimeout(function() {//延时,等这行动画完事再进行下行动画,i++必须放里面是因为如果放外面就迅速加1,本波动画里的i受影响就变了
				i++;
				page6_move();
			}, 1500)
		}
	}
}
//page6页面消失
function page6_out() {
	page6_bol=false;//最多在500ms内关闭page6_move的动画
	$('.page6_wrap').removeClass('page6_wrap_animation');
	setTimeout(function(){
		$('.page6_ul li strong').width(0).height(0);
		$('.page6_ul li span').width(0).height(0);
		$('.page6_line').height(0);
	},500)//如果立即让宽高=0,那现在立马等0,但是page6_move的动画可能还在执行最后一次,需要0.5s才完事,所以要在动画执行完成才能让宽高归0;
}
//page7出现
function page7_into() {
	$('.page7_top').addClass('page7_top_animation');
	$('.page7_middle1').addClass('page7_middle1_animation');
	$('.page7_middle2').addClass('page7_middle2_animation');
	$('.page7_bottom').addClass('page7_bottom_animation');
}
touch.on($('.swiper-wrapper'),'tap','.page7 .page7_link',function(){//需要事件委托
	location.href='https://www.so.com/';
})  
//page7消失
function page7_out() {
	$('.page7_top').removeClass('page7_top_animation');
	
	$('.page7_middle1').removeClass('page7_middle1_animation');
	$('.page7_middle2').removeClass('page7_middle2_animation');
	$('.page7_bottom').removeClass('page7_bottom_animation');
}




