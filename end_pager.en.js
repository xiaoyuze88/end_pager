/*

end_pager.js

by Xiaoyuze ( xiaoyuze.com ) 
xiaoyuze88@gmail.com


Example:

var htmlObject = end_pager({
		data : json_data,
		per_page : 20,
		page : 1,
		pre_url : url_prefix
		gap : 4
	});

	@param 
		data : json type object,
		per_page : articles showed per page,default to 20,
		page : current page,default to 1,
		pre_url : prefix of url , e.g : pre_url = "http://xiaoyuze.com/index.php?",
				  then it'll append parameters like page=xx to the url,xx means the current page number.
				  Default to be "#!"
		gap : controls the numbers of the pager buttons,default to 4.
	@return 
		output = {
			pager : html code of the pager,you can append it directly to your pager container.
			content : content html code, default to using EJS to render,
					  you need to set your own path to your template inside the function filtContent();
		}
*/


function end_pager(obj) {
	 // data,per_page,present_page
	// PAGE_NUMS = 0,				//
	var	PAGER_HTML = '',			//pager html code
		CONTENT = '',				//articles' html code
		DATA = [],		//data array
		PER_PAGE = parseInt(obj.per_page) || 20,		//articles showed per page,default to 20
		PAGE = parseInt(obj.page) || 1,	//current page num, default to 1
		PRE_URL = obj.pre_url || "#!",     
		GAP = parseInt(obj.gap) || 4,
		TOTAL_NUM = 0,	//total articles number
		TOTAL_PAGE = 0;		//total page number
		
	function init() {

		DATA = turnArray(obj.data)
		TOTAL_NUM = DATA.length;
		TOTAL_PAGE = Math.ceil(TOTAL_NUM/PER_PAGE);

		if(PAGE > TOTAL_PAGE) PAGE = TOTAL_PAGE;

		PAGER_HTML = html_pager();		
		CONTENT = filtContent();
	}

	function filtContent() {

		var start = (PAGE - 1) * PER_PAGE,
			end = start + PER_PAGE,
			showContent = [];

		for(var i = start; i < end; i++) {
			if(DATA[i])
				showContent.push(DATA[i]);
		}
/*=================change it to your template path here,or use your own template instead of EJS===============*/ 
		return new EJS({url: 'pager.tem.ejs'}).render({data:showContent});
	}

	function html_pager()
	{
		
		var pager = '',
			numbers = '';

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