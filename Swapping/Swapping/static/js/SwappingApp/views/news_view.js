function news_view_create_form(id_news)
{	
	if (id_news!= null){
		var news = news_controller_show_news(id_news,true);
	}
	body_clear();
	
	$('<div id="container-news">').appendTo('#content-body');
	$('<h3>Create of News</h3><br>').appendTo('#container-news');
	$('<form method="POST" action="#" id="form_news"></form>').appendTo('#container-news');
	
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#form_news").append(tokenElement);
    
    $(' <table id="table_form" class="form"></table>').appendTo('#form_news');
    $('<br/>').appendTo('#table_form');
    
    $('<tr id="tr1" class="row_form"></tr>').appendTo('#table_form');   
    $('<td id="component_title" class="component" /></td>').appendTo('#tr1');
    $('<label for="title">Title:</label>').appendTo('#component_title');
    $('<input type="text" id="title" name="title" />').appendTo('#component_title');
    
    $('<tr id="tr2" class="row_form"></tr>').appendTo('#table_form');
	$('<td id="component_desc" class="component" /></td>').appendTo('#tr2');	
	$('<label for="description">Description:</label>').appendTo('#component_desc');
	$('<textarea id="description" name="description" placeholder="Write your news here, please." required="required" style="resize:none" rows="10" cols="130"></textarea>').appendTo('#component_desc');	
	if (id_news== null){
		$('<center><div class="form-group">'+
				'<div id="sub_div" class="col-lg-13">'+
		 			'<br><br><button type="submit" onclick="news_controller_create_news();refreshLanguage();" class="btn btn-primary">Save</button>'+
		 		'</div></div></center></form>').appendTo('#form_news');
	}
	else
	{	
		var news =news_controller_show_news(id_news,true);
		news_view_fulfill_form(news);
		$('<center><div class="form-group">'+
				'<div id="sub_div" class="col-lg-13">'+
		 			'<br><br><button type="submit" onclick="news_controller_update_news(' + id_news + ');refreshLanguage();" class="btn btn-primary">Save</button>'+
		 		'</div></div></center></form>').appendTo('#form_news');
	}
}

function news_view_show_news(news)
{
	body_clear();
	
	updateText();
	$('<div id="container-news">').appendTo('#content-body');
	$('<h3>Data News</h3><br>').appendTo('#container-news');
    
    $(' <table id="table_form" class="form"></table>').appendTo('#container-news');
    $('<br/>').appendTo('#table_form');
    
    $('<tr id="tr1" class="row_form"></tr>').appendTo('#table_form');   
    $('<td id="component_title" class="component" /></td>').appendTo('#tr1');

	$("<span ><b>Title: &nbsp;</b></span>").appendTo('#component_title');
	$("<span >" + news.title + "</span>").appendTo('#component_title');
    
	$('<tr id="tr2" class="row_form"></tr>').appendTo('#table_form');
	$('<td id="component_desc" class="component" /></td>').appendTo('#tr2');	
	$("<span ><b>Description: &nbsp;</b></span>").appendTo('#component_desc');
	$("<span >" + news.description + "</span>").appendTo('#component_desc');
	
	$('<div id="sub_div" class="submit_div"></div>').appendTo('#container-news');
    $('<button onclick="news_view_create_form(' + news.id  +');refreshLanguage();" >Edit</button>&nbsp;&nbsp;&nbsp;').appendTo('#sub_div');
	$('&nbsp;<button onclick="news_controller_delete_news(' + news.id  +');refreshLanguage();" >Delete</button>').appendTo('#sub_div'); 
	jQuery('table').tablesorter();
}
function news_view_fulfill_form(news)
{
	//First line is different because jQuery causes conflict
	$("input[name=title]").val(news.title);
	jQuery('#description').val(news.description);
}


function show_all_news(){
	
	body_clear();
    var news = new Array();
    news = get_all_news_for_user();
	
	
	$('<div id="container-news">').appendTo('#content-body');
	$('<h3>Show News</h3><br>').appendTo('#container-news');
	$('<form method="POST"  id="news" name="form_news"></form>').appendTo('#container-news');

	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#news").append(tokenElement);
   
    
    $(' <table id="table_news" class="form">').appendTo('#container-news');  
   // $('<tr id="tr1" class="row_form"></tr>').appendTo('#table_items');
    var indice = 1;
    alert(news);
    for(var i in news){	
	    //alert(items[i].title);
    	
	    $('<tr id="tr'+indice+'" class="row_form"></tr>').appendTo('#table_news');
	    $('<td id="td'+indice+'" class="component" /> </td>').appendTo('#tr'+indice+'');
	    $('<label>Id: '+news[i].id+'</label> ').appendTo('#td'+indice+'');
	    $('<label>Subject: '+news[i].title+'</label> ').appendTo('#td'+indice+'');
	    $('<label>Content: '+news[i].description+'</label> ').appendTo('#td'+indice+'');
	    
	    $('<td id="td'+indice+'-2" class="component" /> </td>').appendTo('#tr'+indice+'');
	    $('<input type="button" value="Edit" onclick="news_controller_update_news('+news[i].id+');refreshLanguage();" />').appendTo('#td'+indice+'-2');
	    $('<input type="button" value="Delete" onclick="news_controller_delete_news('+news[i].id+');refreshLanguage();" />').appendTo('#td'+indice+'-2');
	    indice = indice + 1;
  
    }
   
  
}