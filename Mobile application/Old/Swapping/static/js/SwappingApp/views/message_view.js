function message_view_create_form()
{
	body_clear();
	
	$('<div id="container-message">').appendTo('#content-body');
	$('<h3>Create of Message</h3><br>').appendTo('#container-message');
	$('<form method="POST" action="#" id="form_message"></form>').appendTo('#container-message');
	
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#form_message").append(tokenElement);
    
    $(' <table id="table_form" class="form"></table>').appendTo('#form_message');
    $('<br/>').appendTo('#table_form');
    
    $('<tr id="tr1" class="row_form"></tr>').appendTo('#table_form');
	$('<td id="component_sub" class="component" /></td>').appendTo('#tr1');	
	$('<label for="subject">Subject:</label>').appendTo('#component_sub');
    $('<input type="text" id="subject" name="subject" />').appendTo('#component_sub');
    
    $('<tr id="tr2" class="row_form"></tr>').appendTo('#table_form');
	$('<td id="component_cont" class="component" /></td>').appendTo('#tr2');	
	$('<label for="content">Content:</label>').appendTo('#component_cont');
	$('<textarea id="content" name="content" placeholder="Write your message here, please." style="resize:none" rows="10" cols="130"></textarea>').appendTo('#component_cont');	
	$('<center><div class="form-group">'+
			'<div id="sub_div" class="col-lg-13">'+
	 			'<br><br><button type="submit" onclick="message_controller_create_message()" class="btn btn-primary">Send</button>'+
	 		'</div></div></center></form>').appendTo('#form_message');
}
function message_view_show_message(message)
{
	body_clear();
	updateText();
	$('<div id="container-message">').appendTo('#content-body');
	$('<h3>Data Message</h3><br>').appendTo('#container-message');
    
    $('<table id="table_form" class="form"></table>').appendTo('#container-message');
    $('<br/>').appendTo('#table_form');
    
    $('<tr id="tr1" class="row_form"></tr>').appendTo('#table_form');   
    $('<td id="component_subject" class="component" /></td>').appendTo('#tr1');

	$("<span ><b>Subject: &nbsp;</b></span>").appendTo('#component_subject');
	$("<span >" + message.subject + "</span>").appendTo('#component_subject');
	
	$('<tr id="tr2" class="row_form"></tr>').appendTo('#table_form');   
	$('<td id="component_content" class="component" /></td>').appendTo('#tr2');
	
	$("<span ><b>Content: &nbsp;</b></span>").appendTo('#component_content');
	$("<span >" + message.content + "</span>").appendTo('#component_content');
	
	$('<div id="sub_div" class="submit_div"></div>').appendTo('#container-message');
    $('<button onclick="message_controller_delete_message(' + message.id  +');" >Delete</button>&nbsp;&nbsp;&nbsp;').appendTo('#sub_div');
    jQuery('table').tablesorter();
}

function show_all_message(){
	
	body_clear();
    var messages = new Array();
    messages = get_all_message_for_user();
	
	
	$('<div id="container-message">').appendTo('#content-body');
	$('<h3>Show Message</h3><br>').appendTo('#container-message');
	$('<form method="POST"  id="messages" name="form_message"></form>').appendTo('#container-message');

	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#messages").append(tokenElement);
   
    
    //$(' <table id="table_message" class="form">').appendTo('#container-message'); 
    jQuery('<div  id="messages_of_user" class="table-responsive"></div>').appendTo('#content-body');
    jQuery('<div id="tables_message" name="tables_message" class="tables"></div>').appendTo('#messages_of_user');
    jQuery('#tables_message').append('<table  class="table table_header">'+
			'<thead>'+
			'<tr>'+
				'<th colspan="2" class="description" >'+
					'Description'+
				'</th>'+
				'<th class="date">'+
					'Date'+
				'</th>'+
			'</tr>'+
		'</thead>'+
	'</table>');
    var index = 1;
    for(var i in messages){
    	jQuery('#tables_message').append('<table  class="table" >'+
    			'<tbody>'+
    				'<tr>'+
    					'<td class="description" colspan="4" >'+
    						'<div id="subject' + index + '" class="span4" style="height: auto;overflow:auto;">'+"Subject:  "+messages[i].subject+'</div>'+
    						'<div>'+
								'<div id="description' + index + '" class="span4" style="height: auto;overflow:auto;">'+"Content:  "+messages[i].content+'</div>'+
								'<div class="item-sku"></div>'+
							'</div>'+
						'</td>'+
						'<td class="date" colspan="4" >'+
						'<div id="date' + index + '" class="span4" style="height: auto;overflow:auto;">'+"Date:  "+messages[i].moment+'</div>'+
						
					'</td>'+
    				'</tr>'+
    			'</tbody>'+
    		'</table>'+
    		
    		'<button class="btn btn-danger btn-mini" type="submit" name="remove_message' + index + '" value="remove_message" rel="tooltip" data-placement="right" onclick ="message_controller_delete_message('+messages[i].id+')">'+
			'<i class="fa fa-trash-o fa-lg"></i>  Delete  '+
			'</button>');
    	index = index + 1;
    }
    
    /*for(var i in messages){	
    	
	    $('<tr id="tr'+indice+'" class="row_form"></tr>').appendTo('#table_message');
	    $('<td id="td'+indice+'" class="component" /> </td>').appendTo('#tr'+indice+'');
	    $('<label>Subject: '+messages[i].subject+'</label> ').appendTo('#td'+indice+'');
	    $('<label>Content: '+messages[i].content+'</label> ').appendTo('#td'+indice+'');
	    
	    $('<td id="td'+indice+'-2" class="component" /> </td>').appendTo('#tr'+indice+'');
	    $('<input type="button" value="Delete" onclick="message_controller_delete_message('+message[i].id+')" />').appendTo('#td'+indice+'-2');
	    indice = indice + 1;
  
    }*/ 
  
}