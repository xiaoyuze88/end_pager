// 原著longbill@gmail.com,
// Xiaoyuze由php移植
// 
// 自动分页函数，输入数据对象，json格式，返回一个对象，包含分页按钮以及显示的文章的html字符串
// 输入对象说明：
// config_obj {	
// 		data : json_data,
// 		per_page : 每页显示的文章数，默认20
// 		page : 当前页码，默认为1
// 		pre_url : 需要的url前缀，如"http://xiaoyuze.com/index.php?",将自动将分页按钮的url设置为pre_url + "page=x"的形式,
// 					默认为"#!"		
// 		gap : 显示的按钮的宽度，默认为4
// }
// 输出一个对象
// output = {
// 		pager : 分页按钮的html字符串
// 		content : 文章的html字符串
// }
// 


function end_pager(obj) {
	 // data,per_page,present_page
	// PAGE_NUMS = 0,				//
	var	PAGER_HTML = '',			//分页的HTML
		CONTENT = '',				//显示文章的HTML
		DATA = [],		//转成数组
		PER_PAGE = parseInt(obj.per_page) || 20,		//默认每页20篇文章
		PAGE = parseInt(obj.page) || 1,	//如果没有指定页码默认第一页
		PRE_URL = obj.pre_url || "#!",
		GAP = parseInt(obj.gap) || 4,
		TOTAL_NUM = 0,	//总文章数
		TOTAL_PAGE = 0;		//总页数
		
	// 输入数据的json对象
	// present_page    当前所在页
	function init() {

		DATA = turnArray(obj.data)
		// console.log(DATA);
		TOTAL_NUM = DATA.length;
		TOTAL_PAGE = Math.ceil(TOTAL_NUM/PER_PAGE);


		if(PAGE > TOTAL_PAGE) PAGE = TOTAL_PAGE;

		PAGER_HTML = html_pager();		
		CONTENT = filtContent();
	}

	// 输入当前页码以及每页显示
	function filtContent() {
		// 起始与结束的序号
		var start = (PAGE - 1) * PER_PAGE,
			end = start + PER_PAGE,
			showContent = [];

		for(var i = start; i < end; i++) {
			if(DATA[i])
				showContent.push(DATA[i]);
		}

		return new EJS({url: 'pager.tem.ejs'}).render({data:showContent});
	}

	function html_pager()
	{
		
		var pager = '',
			numbers = '';

		// 判断是否是第一页
		if (PAGE > 1) {
			pager += '<li class="end-pager-inline end-pager-inline-btn">'+
						'<a href="#!page=1" class="end-pager-link">首页</a>'+
					'</li>'+
					'<li class="end-pager-inline end-pager-inline-btn">'+
						'<a href="'+PRE_URL+'page='+(PAGE - 1)+'" class="end-pager-link">上一页</a>'+
					'</li>';
		}
		else
		{
			pager += '<li class="end-pager-inline end-pager-inline-btn unactive">'+
						'<a href="#!page=1" class="end-pager-link">首页</a>'+
					'</li>'+
					'<li class="end-pager-inline end-pager-inline-btn unactive">'+
						'<a href="javascript:;" class="end-pager-link">上一页</a>'+
					'</li>';
		}

		if ( PAGE > GAP) {
			numbers += '<li class="end-pager-inline">'+
						'<a href="#!page=1" class="end-pager-link">1</a>'+
					'</li>';
		}
		if (PAGE>GAP+1)
		{
			numbers += '<li class="end-pager-inline dot">'+
							'<a href="javascript:;" class="end-pager-link">...</a>'+
						'</li>';
		}
		for(var i = PAGE - GAP + 1; i < PAGE + GAP; i++) {
			if (i<=0 || i>TOTAL_PAGE) continue;
			if (PAGE == i) {
				numbers += '<li class="end-pager-inline active">'+
					'<a href="'+PRE_URL+'page='+i+'" class="end-pager-link">'+i+'</a>'+
				'</li>'
			}
			else {
				numbers += '<li class="end-pager-inline">'+
					'<a href="'+PRE_URL+'page='+i+'" class="end-pager-link">'+i+'</a>'+
				'</li>'
			}
		}
		
		if ((TOTAL_PAGE - PAGE) > GAP) {
			numbers += '<li class="end-pager-inline dot">'+
							'<a href="javascript:;" class="end-pager-link">...</a>'+
						'</li>';
		}
		if (TOTAL_PAGE-PAGE>GAP-1) {
			numbers += '<li class="end-pager-inline">'+
					'<a href="'+PRE_URL+'page='+TOTAL_PAGE+'" class="end-pager-link">'+TOTAL_PAGE+'</a>'+
				'</li>'
		}
		
		// PAGE_NUMS = numbers;
		pager += numbers;
		
		if (PAGE < TOTAL_PAGE) {
			pager += '<li class="end-pager-inline end-pager-inline-btn">'+
						'<a href="'+PRE_URL+'page='+(PAGE + 1)+'" class="end-pager-link">下一页</a>'+
					'</li>'+'<li class="end-pager-inline end-pager-inline-btn">'+
						'<a href="'+PRE_URL+'page='+TOTAL_PAGE+'" class="end-pager-link">尾页</a>'+
					'</li>';
		}
		else {
			pager += '<li class="end-pager-inline end-pager-inline-btn unactive">'+
						'<a href="javascript:;" class="end-pager-link">下一页</a>'+
					'</li>'+
					'</li>'+'<li class="end-pager-inline end-pager-inline-btn unactive">'+
						'<a href="'+PRE_URL+'page='+TOTAL_PAGE+'" class="end-pager-link">尾页</a>'+
					'</li>';
		}

		return pager;
	}

	function turnArray (obj) {
		if(check(obj) === 'array') return obj;
		else if(check(obj) === 'object') {
			var ret_arr = [];
			for(var i in obj) ret_arr.push(obj[i]);
			return ret_arr;
		}
	}
	function check (obj) {
		var output;
		if(output = Object.prototype.toString.call(obj).match(/object\s*(\w+)/))
			return output[1].toLowerCase();
		else
			return false;
	}

	init();
	return {
		pager : PAGER_HTML,
		content : CONTENT
	}
}