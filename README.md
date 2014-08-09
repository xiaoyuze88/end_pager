# end_pager.js #

This is a simple plugins to make it possible to divide pages in a static html page that received data from ajax api only.

## Quick Start ##

1. Import pager.css to your html, or set your own style yourself.
2. Import end_pager.js to your html, if you need to support IE7-, import the hashchange.min.js too.

```javascript

var _data;
if(!_data){
	// accept data from jsonp api
	$.ajax({
		url : 'your data api url here',
		dataType : 'jsonp',
		jsonpCallback: '__data_callback',
		success : function(data,status) {
			_data = data.data;	
			update();	//rendering data
		}
	});

$(window).on("hashchange",update);	//detect hash change

function update() {
	
	// using our end_pager here
	var view = end_pager({
		data : _data,			//data
		per_page : 3,			//show 3 articles per page
		page : getPage() 		//set the current page
	});
	$(".pager-list").html(view['pager']); 			//Our end_pager return the html code, set them to where you 												//need to show them. For this case , $('.pager-list') is 													//our articles container.
	$("#comment_list").html(view['content']);		// $("#comment_list") is our pager buttons' container.
}

// You can also decide how to get the hash code from url yourself
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

Our default template is EJS, if your are using ejs, you need to set your own path to your template file inside the function filtContent in end_pager.js.

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

Besides , if you need to support low versions of IE, like IE 6 and IE7, you might need to plus those code below in your html because they don't support `window.hashchange` event.
```javascript
<!--[if lte IE 7]>
	<script type="text/javascript" src="js/hashchange.js"></script>
<![endif]-->
```

You can see how it works from our demo. Thanks!
