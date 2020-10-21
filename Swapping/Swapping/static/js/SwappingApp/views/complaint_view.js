
function complaint_view_create_complaint(id_user){
	
	body_clear();
	updateText();

	jQuery('<div id="container-complaint"></div>').appendTo('#content-body');
	
	jQuery('#container-complaint').html('<h3>Create Complaint Form</h3>'+
			'<p class=".p_form"> Insert the complaints data, please: </p>'+
			'<form id="create_complaint_form" method="post" action="#" class="form-horizontal">'+
			'<div class="form-group" id="component_subject">'+
			'<label class="col-lg-3 control-label">Subject*</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="subject" name="subject" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_responsible">'+
			'<label class="col-lg-3 control-label">Responsible</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="responsible" name="responsible" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_related_swap">'+
			'<label class="col-lg-3 control-label">Related Swap Id</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="related_swap" name="related_swap" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_description">'+
			'<label class="col-lg-3 control-label">Description*</label>'+
			'<div class="col-lg-5">'+
			'<textarea class="form-control" id="description" name="description" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group">'+
			'<div class="col-lg-9 col-lg-offset-3">'+
			'<button  type="submit" onclick="complaint_controller_create_complaint('+id_user+');refreshLanguage();" class="btn btn-primary">Save</button>'+
			'</div>'+
			'</div>'+
			'</form>');
	
			var tokenElement = jQuery(document.createElement('input'));
		    tokenElement.attr('type', 'hidden');
		    tokenElement.attr('name', 'csrfmiddlewaretoken');
		    tokenElement.attr('id', 'csrfmiddlewaretoken');
		    var csrftoken = getCookie('csrftoken');
		    tokenElement.val( csrftoken );
		    jQuery("#create_complaint_form").append(tokenElement);
		    
}



function complaint_view_list_complaints(user){
	
	body_clear();
	updateText();
	
	jQuery('<div id="container-complaint" class="container col-lg-12"></div>').appendTo('#content-body');

	var data = complaint_controller_get(true);
	jQuery('#container-complaint').append(
			'<hgroup class="mb20">'+
			'<h1 class="titleh2">Complaints</h1>'+'<div id="create_button_complaint" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 control-label"><a class="btn btn-default" style=\"float:right;\" onclick=\"complaint_view_create_complaint('+user+');refreshLanguage();\" href="#"><i class="fa fa-exclamation fa-fw"></i> Create complaint</a></div>'+
			'<h2 class="lead">'+
			'<strong class="text-danger">'+data.length+'</strong>  &nbsp;'+
			'<span class = "text-danger" id = "results_received">results were found</span>'+
			'</h2>'+
			'</hgroup>');
	
		
	jQuery('#container-complaint').append('<section id="container-section"></section>');
	
	$.each(data, function(i, item) {

		var affected_user =  user_controller_get(item.fields.affected_user,true);
		var responsible_user =  user_controller_get(item.fields.responsible_user,true);
//		var photoURL = user_controller_get_photo(affected_user.id, true);

		jQuery('#container-section').append(
				'<article class="search-result row col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
				'<div class="col-xs-4 col-sm-4 col-md-3">'+
					'<a href="#" title="Lorem ipsum" class="thumbnail"><img src="http://lorempixel.com/250/140/people" alt="Lorem ipsum" /></a>'+
				'</div>'+
				'<div class="col-xs-12 col-sm-12 col-md-2">'+
					'<ul id="selection-tags'+item.pk+'" class="meta-search">'+
						'<li><i class="glyphicon glyphicon-calendar blue"></i> <span>FECHA</span></li>'+
						'<a href="#" title="Affected user" onclick="user_view_show_profile_data( '+affected_user.id+' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+affected_user.username+'</span></li></a>'+
						'<a href="# title="Related Swap"><li><i class="fa fa-shopping-cart orange"></i><span class="orange"> SWAP </span></li></a>'+
						'</ul>'+
				'</div>'+
				'<div class="col-xs-12 col-sm-12 col-md-7 excerpet">'+
					'<h3><a href="#" title="">'+item.fields.subject+'</a></h3>'+
					'<p>'+item.fields.description+'</p>'+					
	                '<span class="plus"><a href="#" title="Send response" onclick="complaint_view_response_complaint('+item.pk+');refreshLanguage();"><i class="fa fa-comment"></i></a></span>'+
				'</div>'+
				'<span class="clearfix borda"></span>'+
			'</article>');
		
		if(typeof responsible_user !== 'undefined'){
			jQuery('#selection-tags'+item.pk).append('<a href="#" title="Responsible user" onclick="user_view_show_profile_data( '+responsible_user.id+' );refreshLanguage();"><li><i class="fa fa-user fa-fw red" ></i> <span class="red">'+responsible_user.username+'</span></li></a>');
		 }
		
	});
}


function complaint_controller_get(returned)
{	
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/getcomplaints/",
             type: 'GET',
             async: false,
             success: function(response)
             {
            	
            	 $('body').removeClass('loading');
            	 if (returned != null && returned  )
            		 {
            		 	result = response;
            		 }
             },
             error: function(response)
             {	

                 console.log(response);
             }
         }
     );
	 return result;
}

function complaint_view_show_complaint(id_complaint){
	alert("entras");
	var complaint = complaint_controller_get_complaint(id_complaint);
	alert (complaint.description);
	
	body_clear();
	updateText();
	
jQuery('<div id="container-complaint"></div>').appendTo('#content-body');

jQuery('#container-complaint').html('<h3>Create Complaint Form</h3>'+
		'<p class=".p_form"> Insert the complaints data, please: </p>'+
		+'<div class="panel panel-default">'+
		+'<div class="panel-heading"><h3 class="panel-title">Subject:</h3></div>'+
		+'<div class="panel-body">'+complaint.subject+'</div></div>');

}

function complaint_view_response_complaint(id_complaint){
	
	body_clear();
	updateText();

	var complaint = complaint_controller_get_complaint(id_complaint);
	var affected_user =  user_controller_get(complaint.affected_user,true);

	
	jQuery('<div id="container-complaint"></div>').appendTo('#content-body');
	jQuery('#container-complaint').append(
			'<article class="search-result row">'+
			'<div class="col-xs-4 col-sm-4 col-md-3">'+
				'<a href="#" title="Lorem ipsum" class="thumbnail"><img src="http://lorempixel.com/250/140/people" alt="Lorem ipsum" /></a>'+
			'</div>'+
			'<div class="col-xs-12 col-sm-12 col-md-2">'+
				'<ul id="selection-tags'+id_complaint+'" class="meta-search">'+
					'<li><i class="glyphicon glyphicon-calendar blue"></i> <span>FECHA</span></li>'+
					'<a href="#" title="Affected user" onclick="user_view_show_profile_data( '+ affected_user.username +' );refreshLanguage();"><li><i class="fa fa-user blue"></i><span class="blue">'+complaint.affected_user.username+'</span></li></a>'+
					'<a href="# title="Related Swap"><li><i class="fa fa-shopping-cart orange"></i><span class="orange"> SWAP </span></li></a>'+
					'</ul>'+
			'</div>'+
			'<div class="col-xs-12 col-sm-12 col-md-7 excerpet">'+
				'<h3><a href="#" title="">'+complaint.subject+'</a></h3>'+
				'<p>'+complaint.description+'</p>'+					
			'</div>'+
			'<span class="clearfix borda"></span>'+
		'</article>');
	
	jQuery('#container-complaint').append('<h3>Response the complaint</h3>'+
			'<p class=".p_form"> Insert the complaints data to the response: </p>'+
			'<form id="response_complaint_form" method="post" action="#" class="form-horizontal">'+
			'<div class="form-group" id="component_subject">'+
			'<label class="col-lg-3 control-label">Response*</label>'+
			'<div class="col-lg-5">'+
			'<textarea type="text" class="form-control" id="response_text" name="response_text" />'+
			'<button  type="submit" onclick="complaint_controller_send_response('+affected_user.id+','+id_complaint+');refreshLanguage();" class="btn btn-primary">Send response</button>'+
			'</div>'+
			'</div>'+
			'</form>');
	
			var tokenElement = jQuery(document.createElement('input'));
		    tokenElement.attr('type', 'hidden');
		    tokenElement.attr('name', 'csrfmiddlewaretoken');
		    tokenElement.attr('id', 'csrfmiddlewaretoken');
		    var csrftoken = getCookie('csrftoken');
		    tokenElement.val( csrftoken );
		    jQuery("#response_complaint_form").append(tokenElement);
		    
}
