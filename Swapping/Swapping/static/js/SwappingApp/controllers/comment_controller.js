function comment_controller_create_comment(id)
{	
	jQuery('#form_comment').bootstrapValidator({
		feedbackIcons: {
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
        				url: "/SwappingApp/new_comment/",
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
							display_success_notification(null,"Comment send succesfully",null);
        					user_view_show_profile_data(id);
        				},
        				error: function(response)
        				{
        					if (response.status = 403){
        						jQuery('#figure_loading div').removeClass('spinner');
        						display_error_notification('Send Comment', 'You cannot send comment to yourself', 'fa fa-times');
        					}else
        						jQuery('#figure_loading div').removeClass('spinner');
        						display_error_notification('Send Comment', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
        					console.log(response);
        					//display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
        				}
        			}
        	);
		},
		message: 'This value is not valid',
		fields:
		{
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

function get_all_comment(id,page){
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/comment/",
             type: 'GET',
             async: false,
             data:
             {
            	 'page':page,
            	'target_user':id,
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
            	if (response.status = 404)
            	{
            		result = {};
            		result.results = [];
            	}
            	else
            	{
            		
            		display_error_notification('Show Comment', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
            		console.log(response);
            		//display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
            	}
             }
         }
     );
	 return result;
	
}
