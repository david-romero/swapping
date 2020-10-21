jQuery(document).ready(function ($)
		{
			jQuery('#figure_loading div').removeClass('spinner');
			$(document).ajaxStart(function() {
				jQuery('#figure_loading div').addClass('spinner');
			});
			$(document).ajaxStop(function() {
				jQuery('#figure_loading div').removeClass('spinner');
			});
			
			
			
			$('#search_box input').bind('keypress', function(e)
					{
						if(e.keyCode==13)
						{
							if ($('#search_box input').val().length > 0)
								search_controller_find($('#search_box input').val());
						}
					});
			
			
			
			
		});

/**
 * 
 */
function body_clear()
{
	jQuery('#content-body').find('*').remove();
}

  
  
function person_login()
{
	$("#form_login").validate(
	{
		onkeyup: false,
	    onfocusout: false,
	    errorContainer: "#errorbox",
	    errorLabelContainer: "#errorbox ul",
	    wrapper: "li",
	    rules:
	    {
	        "username":
	        {
	            required: true,
	            minlength: 6
	        },
	        "password":
	        {
	        	required: true,
	            minlength: 4
	        },
	        
	    },
	    messages:
	    {
	        "username": 
	        {
	            required: "You must enter a  value",
	        },
	        "password": 
	        {
	            required: "You must enter a  value",
	        },
	    },
	    submitHandler: function(form) 
		{ 
	    	var username;
	    	$("#form_login input[type=text]").each(function()
	    			{
	    		 var input = $(this); // This is the jquery object of the input, do what you will
	    		 if (input.attr('name') == 'username')
	    			 {
	    			 	username = input.val();
	    			 }
	    		});
	    	jQuery('#figure_loading div').addClass('spinner');
        	var $csrftoken = $.cookie('csrftoken');
	    	jQuery.ajax
		    (
		        {
		            url: "/SwappingApp/login/",
		            type: 'POST',
		            data:
		            {
		                'username': username,
		                'password': $('#password').val(),
		            },
		            beforeSend: function(xhr) {
		                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		            },
		            crossDomain: false,
		            success: function(response)
		            {
		            	jQuery('#figure_loading div').removeClass('spinner');
		            	window.location.href = '/home';
		            },
		            error: function(response)
		            {
		            	jQuery('#figure_loading div').removeClass('spinner');
		                console.log(response);
		                if (response.status == 403)
		                	display_error_notification('Sign In Error','Username or password are wrong. Please re-enter the data.','fa fa-times');
		                if (response.status == 410)
		                	display_error_notification('Sign In Error','Your account is not activated. Watch your email inbox and  activate your account.','fa fa-times');
		            }
		        }
		    );
		}
	});
}




function display_error(title,content)
{
	var caja = $('<div title="'+title+'"><i class="fa fa-exclamation-triangle"></i><p>' + content + '</p></div>');
	caja.dialog();
}
function display_success(title,content)
{
	var caja = $('<div title="'+title+'"><i class="fa fa-check"></i><p>' + content + '</p></div>');
	caja.dialog();
}

function display_error_notification(title,text,icon)
{
	new PNotify({
        title: title,
        text: text,
        type: 'error',
        icon: icon,
        styling: 'fontawesome'
    });
}
function display_success_notification(title,text,icon)
{
	new PNotify({
        title: title,
        text: text,
        type: 'success',
        icon: icon,
        styling: 'fontawesome'
    });
}
function display_info_notification(title,text,icon)
{
	new PNotify({
        title: title,
        text: text,
        type: 'info',
        icon: icon,
        styling: 'fontawesome'
    });
}

var week_days_array = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


$.ajaxSetup({
    beforeSend: function(xhr, settings) 
    {
    	jQuery('#figure_loading div').addClass('spinner');

    }
});



/*https://docs.djangoproject.com/en/1.3/ref/contrib/csrf/#ajax*/
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function show_legal()
{
	console.log($.i18n.properties);
	console.log($.i18n.language);
	body_clear();
	jQuery('#content-body').append('<iframe style="width:100%;height:750px;" src="/static/Terminosycondiciones.pdf"></iframe>');
}

function show_contact_form()
{
	body_clear();
	
	
	updateText();

	jQuery('<div id="container-complaint"></div>').appendTo('#content-body');
	
	jQuery('#container-complaint').html('<h3 class="titleh3" id="contact_us">Contact Us</h3>'+
			
			'<form id="create_complaint_form" method="post" action="#" class="form-horizontal">'+
			'<div class="form-group" id="component_subject">'+
			'<label id="message_subject" class="col-lg-3 control-label">Subject:</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="subject" name="subject" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_responsible">'+
			'<label id="user_email" class="col-lg-3 control-label">Email:</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="responsible" name="responsible" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_related_swap">'+
			'<label id="user_phone" class="col-lg-3 control-label">Phone:</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="related_swap" name="related_swap" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_description">'+
			'<label id="service_description" class="col-lg-3 control-label">Description:</label>'+
			'<div class="col-lg-5">'+
			'<textarea style="max-width: 100%;max-height: 150px;" class="form-control" id="description" name="description" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group">'+
			'<div id="sub_div" class="col-lg-9 col-lg-offset-3">'+
			'<button   onclick="refreshLanguage();" class="btn btn-primary">Save</button>'+
			'</div>'+
			'</div>'+
			'</form>');
	
}
