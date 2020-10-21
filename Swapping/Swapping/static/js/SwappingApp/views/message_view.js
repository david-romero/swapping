function message_view_create_form(id_destination,subject)
{
	body_clear();
	
	$('<div id="container-message">').appendTo('#content-body');
	$('<h3>Create of Message</h3><br>').appendTo('#container-message');
	$('<form method="POST" action="#" id="form_message"></form>').appendTo('#container-message');
	

	jQuery('#container-message').html('<h3>Send Message</h3>'+
			'<p class=".p_form"> Insert the message data, please: </p>'+
			'<form id="form_message" method="post" action="#" class="form-horizontal">'+
			'<div class="form-group" id="component_subject">'+
			'<label class="col-lg-2 control-label">Subject</label>'+
			'<div class="col-lg-9">'+
			'<input type="text" class="form-control" id="subject" name="subject" />'+
			'</div>'+
			'</div>'+
			'<input type="hidden" id = "id_destination" name="id_destination" value="'+id_destination+'">'+
			'<div class="form-group" id="component_content">'+
			'<label class="col-lg-2 control-label">Content</label>'+
			'<div class="col-lg-9">'+
			'<textarea id="content" name="content" class="form-control" placeholder="Write your message here, please." style="resize:none" rows="10" cols="130"></textarea>'+
			'</div>'+
			'</div>'+
			'<div class="form-group">'+
			'<div class="col-lg-9 col-lg-offset-3">'+
			'<br><br><button type="submit" onclick="message_controller_create_message('+id_destination+');refreshLanguage();" class="btn btn-primary">Send</button>'+
			'</div>'+
			'</div>'+
			'</form>');
	
	if (subject != null)
	{
		jQuery('#subject').val(subject);
	}
    
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
    $('<button onclick="message_controller_delete_message(' + message.id  +');refreshLanguage();" >Delete</button>&nbsp;&nbsp;&nbsp;').appendTo('#sub_div');
    jQuery('table').tablesorter();
}

function show_all_message(id){
	
	body_clear();
	updateText();
	
	jQuery('<div id="container-message1" class="container col-lg-12 col-sm-12"></div>').appendTo('#content-body');
	
	var data1 = get_destination_data(id);
	var data2 = get_origen_data(id);
	
	jQuery('#container-message1').append(
			'<hgroup class="mb20">'+
			'<h2 id="message_received" class="titleh2">Messages received</h2>'+
			'<div><strong class="text-danger">'+data1.length+'</strong> &nbsp;'+
			'<span class = "text-danger" id = "results_received">results were found</span>'+
			'</div>'+
			'</hgroup>');
	
	jQuery('#container-message1').append('<section id="container-section1"></section>');

	$.each(data1, function(i, item) 
			{
		jQuery('#container-section1').append(
				'<article class="search-result row">'+
				'<div class="col-xs-12 col-sm-3 col-md-2">'+
					'<ul id="selection-tags'+item.pk+'" class="meta-search">'+
						'<li><i class="glyphicon glyphicon-calendar blue"></i> <span>'+item.moment+'</span></li>'+
						'<a href="#" title="Use origin" onclick="user_view_show_profile_data( '+item.origen_user.id+' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+item.origen_user.username+'</span></li></a>'+
						'<a href="#" title="Destination user" onclick="user_view_show_profile_data( '+item.destination_user.id+' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+item.destination_user.username+'</span></li></a>'+
						'</ul>'+
				'</div>'+
				'<div class="col-xs-12 col-sm-9 col-md-7 excerpet">'+
					'<h3><a href="#" title="">'+item.subject+'</a></h3>'+
					'<pre style="background-color: white;border: none;">'+item.content+'</pre>'+
					'<i style="cursor:pointer;" onclick="message_view_create_form_modal(' + item.origen_user.id + ',\'' + item.subject + '\');refreshLanguage();" class="fa fa-reply"></i>'+
					'<button id="delete-' + item.id + '" class="btn btn-danger btn-mini pull-right"  value="remove_item" rel="tooltip" data-placement="right">'+
					'<i class="fa fa-trash-o"></i>'+
					'</button>'+
				'</div>'+
				'<span class="clearfix borda"></span>'+
			'</article>');
		
		//delete confirmation
		$('#delete-' + item.id).confirmation(
				{
					placement: 'bottom', // How to position the confirmation - top | bottom | left | right
					trigger: 'click', // How confirmation is triggered - click | hover | focus | manual
					target : '_self', // Default target value if `data-target` attribute isn't present.
					href   : '#', // Default href value if `data-href` attribute isn't present.
					title: 'Are you sure?', // Default title value if `data-title` attribute isn't present
					template: '<div class="popover" style="width: 160px;">' +
					                '<div class="arrow"></div>' +
					                '<h3 class="popover-title"></h3>' +
					                '<div class="popover-content text-center">' +
					                '<div class="btn-group">' +
					                '<a class="btn btn-small" href="" target=""></a>' +
					                '<a class="btn btn-small" data-dismiss="confirmation"></a>' +
					                '</div>' +
					                '</div>' +
					                '</div>',
					btnOkClass:  'btn-primary', // Default btnOkClass value if `data-btnOkClass` attribute isn't present.
					btnCancelClass:  'btn btn-default', // Default btnCancelClass value if `data-btnCancelClass` attribute isn't present.
					btnOkLabel: '<i class="fa fa-check"></i> Yes', // Default btnOkLabel value if `data-btnOkLabel` attribute isn't present.
					btnCancelLabel: '<i class="fa fa-times"></i> No', // Default btnCancelLabel value if `data-btnCancelLabel` attribute isn't present.
					singleton: false, // Set true to allow only one confirmation to show at a time.
					popout: false, // Set true to hide the confirmation when user clicks outside of it.
					onConfirm: function(d)
					{
						message_controller_delete_message(item.id, id)
					}, // Set event when click at confirm button
					onCancel: function(){}// Set event when click at cancel button
					
				}) ;
		
	});
	
	jQuery('<div id="container-message2" class="container col-lg-12 col-sm-12"></div>').appendTo('#content-body');
	jQuery('#container-message2').append(
			'<hgroup class="mb20">'+
			'<h2 id="message_send" class="titleh2">Messages sent</h2>'+
			'<div><strong class="text-danger">'+data2.length+'</strong> &nbsp;'+
			'<span class = "text-danger" id = "results_send">results were found</span>'+
			'</div>'+
			'</hgroup>');
	
	jQuery('#container-message2').append('<section id="container-section2"></section>');
	
	$.each(data2, function(i, item) {

		jQuery('#container-section2').append(
				'<article class="search-result row">'+
				'<div class="col-xs-12 col-sm-3 col-md-2">'+
					'<ul id="selection-tags'+item.pk+'" class="meta-search">'+
						'<li><i class="glyphicon glyphicon-calendar blue"></i> <span>'+item.moment+'</span></li>'+
						'<a href="#" title="Use origin" onclick="user_view_show_profile_data( '+item.origen_user.id+' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+item.origen_user.username+'</span></li></a>'+
						'<a href="#" title="Destination user" onclick="user_view_show_profile_data( '+item.destination_user.id+' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+item.destination_user.username+'</span></li></a>'+
						'</ul>'+
				'</div>'+
				'<div class="col-xs-12 col-sm-9 col-md-7 excerpet">'+
					'<h3><a href="#" title="">'+item.subject+'</a></h3>'+
					'<pre style="background-color: white;border: none;">'+item.content+'</pre>'+					
					'<button id="delete2-' + item.id + '" class="btn btn-danger btn-mini" type="submit" value="remove_item" rel="tooltip" data-placement="right" >'+
					'<i class="fa fa-trash-o"></i>'+
					'</button> &nbsp; &nbsp;'+
				'</div>'+
				'<span class="clearfix borda"></span>'+
			'</article>');
		
		//delete confirmation
		$('#delete2-' + item.id).confirmation(
				{
					placement: 'right', // How to position the confirmation - top | bottom | left | right
					trigger: 'click', // How confirmation is triggered - click | hover | focus | manual
					target : '_self', // Default target value if `data-target` attribute isn't present.
					href   : '#', // Default href value if `data-href` attribute isn't present.
					title: 'Are you sure?', // Default title value if `data-title` attribute isn't present
					template: '<div class="popover" >' +
					                '<div class="arrow"></div>' +
					                '<h3 class="popover-title"></h3>' +
					                '<div class="popover-content text-center">' +
					                '<div class="btn-group">' +
					                '<a class="btn btn-small" href="" target=""></a>' +
					                '<a class="btn btn-small" data-dismiss="confirmation"></a>' +
					                '</div>' +
					                '</div>' +
					                '</div>',
					btnOkClass:  'btn-primary', // Default btnOkClass value if `data-btnOkClass` attribute isn't present.
					btnCancelClass:  'btn btn-default', // Default btnCancelClass value if `data-btnCancelClass` attribute isn't present.
					btnOkLabel: '<i class="fa fa-check"></i> Yes', // Default btnOkLabel value if `data-btnOkLabel` attribute isn't present.
					btnCancelLabel: '<i class="fa fa-times"></i> No', // Default btnCancelLabel value if `data-btnCancelLabel` attribute isn't present.
					singleton: false, // Set true to allow only one confirmation to show at a time.
					popout: false, // Set true to hide the confirmation when user clicks outside of it.
					onConfirm: function(d)
					{
						message_controller_delete_message(item.id, id);
					}, // Set event when click at confirm button
					onCancel: function(){}// Set event when click at cancel button
					
				}) ;
		
	});
	
	//onclick ="message_controller_delete_message('+item.id+","+id+')"
	
}


function message_view_create_form_modal(id_destination,subject)
{
	var user = user_controller_get(id_destination, true);
	$('<div id="message-service-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
		    '<div class="modal-dialog modal-lg">'+
		      '<div class="modal-content">'+
		      	''+
		        '<div class="modal-header">'+
		          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
		          '<h4 class="modal-title" id="myLargeModalLabel">Send message to <span>' + user.username + '</span></h4>'+
		        '</div>'+
		        '<div class="modal-body">'+
		        '</div><!-- /.modal-content -->'+
		        '<div class="modal-footer">'+
		        '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
				'<button onclick="submit_message();refreshLanguage();" class="btn btn-primary">Send</button>'		+
		        '</div>'+
		    '</div><!-- /.modal-dialog -->'+
		  '</div>').appendTo('#content-body');
	

	

	
	$('<div id="container-message">').appendTo('.modal-body');
	$('<h3>Create of Message</h3><br>').appendTo('#container-message');
	$('<form method="POST" action="#" id="form_message"></form>').appendTo('#container-message');
	

	jQuery('#container-message').html(
			'<form id="form_message" method="post" action="#" class="form-horizontal">'+
			'<div class="form-group" id="component_subject">'+
			'<label class="col-lg-2 control-label">Subject</label>'+
			'<div class="col-lg-9">'+
			'<input type="text" class="form-control" id="subject" name="subject" />'+
			'</div>'+
			'</div>'+
			'<input type="hidden" id = "id_destination" name="id_destination" value="'+id_destination+'">'+
			'<div class="form-group" id="component_content">'+
			'<label class="col-lg-2 control-label">Content</label>'+
			'<div class="col-lg-9">'+
			'<textarea id="content" name="content" class="form-control" placeholder="Write your message here, please." style="resize:none" rows="10" cols="130"></textarea>'+
			'</div>'+
			'</div>'+
			'<div style="display:none;" class="col-lg-9 col-lg-offset-3">'+
			'<br><br><button id="submit-message-form" type="submit" onclick="message_controller_create_message('+id_destination+');refreshLanguage();" class="btn btn-primary">Send</button>'+
			'</div>'+
			'</form>');

	if (subject != null)
	{
		jQuery('#subject').val(subject);
	}
	$('#message-service-modal').modal();
}

/**
 * Esta funcion es como una pasarela ya que el boton de Send lo unico que hace es llamar al boton 
 * submit del formulario y le hago click con la funcion de abajo
 */
function submit_message()
{
	jQuery("#submit-message-form").trigger("click");
}