var page = {
  content:$('.move .content'),
  stat0:"",
  sort_key:16,
  pn:0,
  init:function () {
    this.getData();
    this.typeClick();
    this.sortKeyClick();
    this.pageClick();
  },
getData:function () {
 var _this = this;
 var index = layer.load(0, {
shade: [0.1,'#fff'] });//0.1透明度的白色背景

 $.ajax({
  	url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8",
    data : {
      stat0:_this.stat0,
      sort_key:_this.sort_key,
      pn:_this.pn
    },
    dataType:'jsonp',
    jsonp:'cb',
  //   beforeSend: function () {
  //     var index = layer.load(0, {
  //   shade: [0.1,'#fff'] //0.1透明度的白色背景
  // });
  // },
    success:function (data) {
        _this.renderData(data);
        ShowDiv('null');
    //     var index = layer.load(0, {
    //   shade: [0.1,'#fff'] //0.1透明度的白色背景
    // });
    layer.closeAll();

    }




 });


},

renderData:function (r) {
  var result = r.data[0].result;
  var con = '';
  for (var i = 0; i < result.length; i++) {
    con+=`
    <div class="move-item">
      <img src="${result[i].kg_pic_url}">
      <p class="move-name">${result[i].ename}</p>
      <p class="move-score">${result[i].additional}</p>
    </div>
    `;
  }
  this.content.html(con);
},

typeClick:function () {
  var _this= this;
  $('.sort-type .tag').click(function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.page .page-num').eq(0).addClass('selected')
    .siblings().removeClass('selected');
    var tag = $(this).html();
    _this.stat0 = (tag == "全部"?"":tag);
    _this.pn = 0;
    _this.getData();


  });
},

sortKeyClick:function () {

  var _this = this;
  $('.sort-key .sort-item').click(function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.page .page-num').eq(0).addClass('selected').siblings().removeClass('selected');
    _this.sort_key = $(this).attr('sort_key');
    _this.pn = 0;
    _this.getData();
  });
},

pageClick:function () {
    var _this = this;
    $('.page .page-num').click(function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    _this.pn = ($(this).html()-1)*8;
    _this.getData();

    });
}


};
function ShowDiv() {
$("#loading").show();
}
page.init();
