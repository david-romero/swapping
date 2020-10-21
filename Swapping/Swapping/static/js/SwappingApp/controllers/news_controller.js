function doValidate()
{
	$('#form_news').validate({
		onkeyup: false,
        onfocusout: false,
        errorContainer: "#errorbox",
        errorLabelContainer: "#errorbox ul",
        wrapper: "li",
    	rules:{
            "title":{required: true},
            "description":{required: true},
            
        },
        messages: {
        	"title":{required: "You must enter a  value"},
            "description":{required: "You must enter a  value"},
        },
        submitHandler: function(form) 
		{ 
        	var serial = $('#form_news').serialize();
        	jQuery('#figure_loading div').addClass('spinner');
			jQuery.ajax
		    (
		        {
		            url: "/SwappingApp/new_news/",
		            type: 'POST',
		            data:serial,
                        success: function(response)
			            {	jQuery('#figure_loading div').removeClass('spinner');
			            	alert("News created succesfully!!!");
			            	var id = response.id
			            	news_controller_show_news(id);
			            },
			            error: function(response)
			            {
			            	alert("Error!");
			                console.log(response);
			                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
			            }
                    }
                );
		}
    });	
}
function news_controller_create_news()
{
	doValidate();
	var validate = $("#form_news").valid();
	return validate;
}
function news_controller_show_news(id,returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
	 
     (
         {
             url: "/SwappingApp/news/"+id+"/",
             type: 'GET',
             async: false,
           
             success: function(response)
             {
            	 jQuery('#figure_loading div').removeClass('spinner');
            	 if (returned != null && returned  )
            		 {
            		 	result = response;
            		 }
            	 else
            		 {
            		 alert(response.id);
            		 	news_view_show_news(response);
            		 }
                     
             },
             error: function(response)
             {
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
}
function news_controller_update_news(id_news)
{
	$('#form_news').validate({
		onkeyup: false,
		onfocusout: false,
		errorContainer: "#errorbox",
		errorLabelContainer: "#errorbox ul",
		wrapper: "li",
		rules:{
			"title":{
				required: true
			},
			"description":{
				required: true,
				minlength: 2
			}        
		},
		messages: {
			"title": {
				required: "You must enter a  value",
			},
			"description": {
				required: "You must enter a  value",
			}
		},
		submitHandler: function(form) 
		{ 	alert('entra submit');
			jQuery('#figure_loading div').addClass('spinner');
			var $csrftoken = $.cookie('csrftoken');
			var serial = $('#form_news').serialize();
			jQuery.ajax
			({
				url: "/SwappingApp/news/" + id_news +"/",
				type: 'PUT',
				data:serial,
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRFToken", $csrftoken);
				},
				crossDomain: false,
				success: function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					news_controller_show_news(response.id);
				},
				error: function(response)
				{
					alert("falla");
					console.log(response);
					//display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
				}
			}
			);
		}
	});
}
function news_controller_delete_news(id_news)
{	if(confirm("Are you sure to delete the message?")){
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/news/" + id_news,
            type: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	jQuery('#figure_loading div').removeClass('spinner');
            	alert("The message was deleted");
            	get_all_message_for_user();
            },
            error: function(response)
            {
            	alert("ERROR");
                console.log(response);
                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
            }
        }
    );
	}
}
function get_all_news_for_admin(){
	
	admin = get_admin_for_news();
	
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/news/?admin="+admin+"",
             type: 'GET',
             async: false,
             success: function(response)
             {
            	alert("GET EXITOSO");
            	result = response;
                     
             },
             error: function(response)
             {	 alert('errorrr!!');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
	
}

function get_admin_for_news(){
	
	 $.ajax
    (
        {
            url: "/SwappingApp/get_admin",
            type: 'GET',
            async: false,
            success: function(response)
            {
           	alert("id admin:"+response.id);
           	result = response.id;
                    
            },
            error: function(response)
            {	 alert('errorrr!!');
                console.log(response);
                //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
            }
        }
    );
	 return result;
}