function message_controller_create_message()
{	
	
	jQuery('#form_message').bootstrapValidator(
	{
		feedbackIcons: 
		{
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh',
		},
		submitHandler: function(validator, form, submitButton) 
		{	
			jQuery('#figure_loading div').addClass('spinner');
			var $csrftoken = $.cookie('csrftoken');
			jQuery.ajax(
					{
        				url: "/SwappingApp/new_message/",
        				type: 'POST',
        				beforeSend : function(xhr)
						{
							xhr.setRequestHeader("X-CSRFToken", $csrftoken);
						},
						crossDomain : false,
						data : form.serialize(),
						enctype : "multipart/form-data",
						encoding : "multipart/form-data",
						success : function(response)
						{			            	
			            	
							jQuery('#figure_loading div').removeClass('spinner');
        					display_success_notification("New message","Message send succesfully",null);
        					$('#message-service-modal').modal('hide');
        					show_all_message(id_user);
        				},
        				error: function(response)
        				{
        					if (response.status = 403){
        						jQuery('#figure_loading div').removeClass('spinner');
        						display_error_notification('Send Message', 'You cannot send message to yourself', 'fa fa-times');
        					}else
        						jQuery('#figure_loading div').removeClass('spinner');
        						display_error_notification('Send Message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
        					console.log(response);
        					//display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
        				}
        			}
        	);
		},
		message: 'This value is not valid',
		fields:
		{
			subject: 
			{
				message: 'The subject is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The subject is required and can\'t be empty'
					},
				}
			},
			content: 
			{
				message: 'The content is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The content is required and can\'t be empty'
					},
				}
			},
		}
		
	});
	
}
function message_controller_get(returned)
{	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/get_messages/",
             type: 'GET',
             async: false,
             success: function(response)
             {
            	
            	 jQuery('#figure_loading div').removeClass('spinner');
            	 if (returned != null && returned  )
            		 {
            		 	result = response;
            		 }
             },
             error: function(response)
             {	
            	 jQuery('#figure_loading div').removeClass('spinner');
            	 display_error_notification('Show message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
                 console.log(response);
             }
         }
     );
	 return result;
}

function message_controller_show_message(id,returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax
	(
		{
			url: "/SwappingApp/message/"+id+"/",
			type: 'GET',
			async: true,
			success: function(response)
			{
				jQuery('#figure_loading div').removeClass('spinner');
				if (returned != null && returned  )
				{
					result = response;
				}
				else
				{
					message_view_show_message(response);
				}
				
			},	
			error: function(response)
			{
				jQuery('#figure_loading div').removeClass('spinner');
				display_error_notification('Show message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
				console.log(response);
				//display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
			}
		}
    );
	return result;
}
function message_controller_delete_message(id_message, id_user)
{	
	var $csrftoken = $.cookie('csrftoken');
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/message/" + id_message + "/",
            type: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	jQuery('#figure_loading div').removeClass('spinner');
            	display_success_notification("Delete message","Message deleted succesfully","fa fa-check");
            	show_all_message(id_user);
            },
            error: function(response)
            {	
            	jQuery('#figure_loading div').removeClass('spinner');
            	display_error_notification('Delete message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
            }
        }
    );
}
function get_destination_data(id){
	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/message/",
             type: 'GET',
             async: false,
             data:{
            	'destination_user':id,
              	"ordering":"-moment"
             },
             success: function(response)
             {
            	jQuery('#figure_loading div').removeClass('spinner');
            	result = response;
                     
             },
             error: function(response)
             {	 
            	 jQuery('#figure_loading div').removeClass('spinner');
            	 display_error_notification('Show message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
	
}
function get_origen_data(id){
	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/message/",
             type: 'GET',
             async: false,
             data:{
            	'origen_user':id,
              	"ordering":"-moment"
             },
             success: function(response)
             {
            	jQuery('#figure_loading div').removeClass('spinner');
            	result = response;
                     
             },
             error: function(response)
             {	 
            	 jQuery('#figure_loading div').removeClass('spinner');
            	 display_error_notification('Show message', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
	
}

