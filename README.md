
by Xiaoyuze ( xiaoyuze.com ) 
xiaoyuze88@gmail.com
=========



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
# end_pager.js #

This is a simple plugins to make it possible to divide pages in a static html page that received data from ajax api only.

## Quick Start ##

```javascript

var _data;
if(!_data){
	$.ajax({
		url : 'your data api url here',
		dataType : 'jsonp',
		jsonpCallback: '__data_callback',
		success : function(data,status) {
			_data = turnArray(data.data);
			update();
		}
	});

$(window).on("hashchange",update);

function update() {

	var view = end_pager({
		data : _data,
		per_page : 3,
		page : getPage()
	})
	$(".pager-list").html(view['pager']);
	$("#comment_list").html(view['content']);
}

function getPage() {
	var hash = window.location.hash;

	if(hash.indexOf("#!page=") > -1) {
		return hash.replace("#!page=",'')
	} else {
		return false;
	}
}
```


## Parameters ##

```javascript
end_pager(config_object)

config_object = {
	data : json type object,
	per_page : articles showed per page,default to 20,
	page : current page,default to 1,
	pre_url : prefix of url , e.g : pre_url = "http://xiaoyuze.com/index.php?",
			  then it'll append parameters like page=xx to the url,xx means the current page number.
			  Default to be "#!"
	gap : controls the numbers of the pager buttons,default to 4.
}
```

## Output ##

```javascript
output = {
			pager : html code of the pager,you can append it directly to your pager container.
			content : content html code, default to using EJS to render,
					  you need to set your own path to your template inside the function filtContent();
		}
```

## More ##

Our default template is EJS, if your are using ejs, you need to set your own path to your template file inside the function filtContent.

Like : 
```javascript
function filtContent() {

		var start = (PAGE - 1) * PER_PAGE,
			end = start + PER_PAGE,
			showContent = [];

		for(var i = start; i < end; i++) {
			if(DATA[i])
				showContent.push(DATA[i]);
		}
/*================change the url to your template path here,or use your own template instead of EJS===============*/ 
		return new EJS({url: 'pager.tem.ejs'}).render({data:showContent});
	}
```

Besides , if you need to support low versions of IE, like IE 6 and IE7, you might need to plus those code below in your html.
```javascript
<!--[if lte IE 7]>
	<script type="text/javascript" src="js/hashchange.js"></script>
<![endif]-->
```

You can see how it works from our demo. Thanks!
