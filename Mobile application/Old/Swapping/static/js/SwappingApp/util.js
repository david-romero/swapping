jQuery(document).ready(function ($) {
	
});

/**
 * 
 */
function body_clear()
{
	jQuery('#content-body').find('*').remove();
}


function selectedFile() {
    var archivoSeleccionado = document.getElementById("myfile");
    var file = archivoSeleccionado.files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1048576)
            fileSize = (Math.round(file.size * 100 / 1048576) / 100).toString() + ' MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' Kb';

        var divfileSize = document.getElementById('fileSize');
        var divfileType = document.getElementById('fileType');
        divfileSize.innerHTML = 'Tamaño: ' + fileSize;
        divfileType.innerHTML = 'Tipo: ' + file.type;
         
    }
  }     

function uploadFile(){
    //var url = "http://localhost/ReadMoveWebServices/WSUploadFile.asmx?op=UploadFile";     
    var url = "/ReadMoveWebServices/WSUploadFile.asmx/UploadFile";
    var archivoSeleccionado = document.getElementById("myfile");
    var file = archivoSeleccionado.files[0];
    var fd = new FormData();
    fd.append("archivo", file);
    var xmlHTTP= new XMLHttpRequest();              
    //xmlHTTP.upload.addEventListener("loadstart", loadStartFunction, false);
    xmlHTTP.upload.addEventListener("progress", progressFunction, false);
    xmlHTTP.addEventListener("load", transferCompleteFunction, false);
    xmlHTTP.addEventListener("error", uploadFailed, false);
    xmlHTTP.addEventListener("abort", uploadCanceled, false);               
    xmlHTTP.open("POST", url, true);
    //xmlHTTP.setRequestHeader('book_id','10');
    xmlHTTP.send(fd);
}  
function person_login()
{
	$("#form_login").validate({
		onkeyup: false,
	    onfocusout: false,
	    errorContainer: "#errorbox",
	    errorLabelContainer: "#errorbox ul",
	    wrapper: "li",
	    rules:{
	        "username":{
	            required: true,
	            minlength: 6
	        	},
	        "password":
	        {
	        	required: true,
	            minlength: 4
	        },
	        
	    },
	    messages: {
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
		            	window.location.href = 'http://127.0.0.1:8000/home';
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


//using jQuery
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
