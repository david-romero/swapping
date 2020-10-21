/**
 * Created on 17/04/2014
 * Author Pedro
 * complaint_controller.js
 * Swapping
 */
function complaint_controller_create_complaint(id_user){
	validateComplaint(id_user);
	var validate = $("#create_complaint_form").valid();
	return validate;
}

function validateComplaint(id_user){
	{ 	
		var $csrftoken = $.cookie('csrftoken');
		var home = jQuery.i18n.prop("home");
		var lang;
		if (home=="Home"){
			lang = "en";
		}else{
			lang = "es";
		}
		
		jQuery('#create_complaint_form').bootstrapValidator({
			feedbackIcons: {
				valid: 'fa fa-check',
			    invalid: 'fa fa-times',
			    validating: 'fa fa-refresh'
		    },
	        
			            submitHandler: function(form) 
						{ 
			            	jQuery('#figure_loading div').addClass('spinner');
							jQuery.ajax
						    (
						        {
						            url: "/SwappingApp/create_complaint/",
						            type: 'POST',
						            data:
						            {
						                'subject': $('#subject').val(),
						                'responsible_user': $('#responsible').val(),
						                'affected_user': id_user,
						                'description': $('#description').val(),
						                'swap': $('#related_swap').val(),
						                'lang': lang,
						            },           
						            beforeSend: function(xhr) {
						                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
						            },
						            crossDomain: false,
						            success: function(response)
						            {
						            	jQuery('#figure_loading div').removeClass('spinner');
				                        	 display_success_notification("success","Complaint created succesfully",null);
						            },
						            error : function(xhr,errmsg,err) {
						            	jQuery('#figure_loading div').removeClass('spinner');
				                         var json = $.parseJSON(xhr.responseText);
				                         if(json.subject != null){
				                        	 display_error_notification("subject",json.subject,null);
				                         }
				                         if(json.responsible_user != null){
				                        	 display_error_notification("responsible user",json.responsible_user,null);
				                         }if(json.swap != null){
				                        	 display_error_notification("swap",json.swap,null);
				                         }if(json.description != null){
				                        	 display_error_notification("description",json.description,null);
				                         }if(json.affected != null){
				                        	 display_error_notification("affected",json.affected,null);
				                         }
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
									stringLength: 
									{
										min: 6,
										max: 30,
										message: 'The subject must be more than 6 and less than 30 characters long'
									},
								}
							},
							responsible: 
							{
								message: 'The responsible is not valid',
								validators: 
								{
									stringLength: 
									{
										min: 8,
										max: 15,
										message: 'The responsible must be more than 8 and less than 15 characters long'
									}
								}
							},
							related_swap: 
							{
								message: 'The swap is not valid',
								validators: 
								{
									stringLength: 
									{
										min: 2,
										max: 15,
										message: 'The swap must be more than 8 and less than 15 characters long'
									},
									regexp: 
									{
										regexp: /^[0-9]+$/,
										message: 'The swap must be a number'
									}
								}
							},
							description: 
							{
								message: 'The description is not valid',
								validators: 
								{
									notEmpty: 
									{
										message: 'The description is required and can\'t be empty'
									},
									stringLength: 
									{
										max: 500,
										message: 'The description must be less than 500 characters long'
									},
								}
							},
					}
				}
		);
	}
}


function complaint_controller_get_complaint(id_complaint){
		jQuery('#figure_loading div').addClass('spinner');
		var result;
		 $.ajax
	     (
	         {
	             url: "SwappingApp/complaints/"+id_complaint+"/",
	             type: 'GET',
	             async: false,
	             success: function(response)
	             {	 
	            	 jQuery('#figure_loading div').removeClass('spinner');
	            		 	result = response;
	            		 
	             },
	             error: function(response)
	             {
	                 console.log(response);
	             }
	         }
	     );
		 
	return result;
}

function complaint_controller_send_response(id_user, id_complaint){
	var $csrftoken = $.cookie('csrftoken');
	
	var home = jQuery.i18n.prop("home");
	var lang;
	if (home=="Home"){
		lang = "en";
	}else{
		lang = "es";
	}
	
	jQuery('#response_complaint_form').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
		    invalid: 'fa fa-times',
		    validating: 'fa fa-refresh'
	    },
        
		            submitHandler: function(form) 
					{ 
		            	jQuery('#figure_loading div').addClass('spinner');
						jQuery.ajax
					    (
					        {
					            url: "/SwappingApp/response_complaint/",
					            type: 'POST',
					            data:
					            {
					                'response': $('#response_text').val(),
					                'id_complaint':id_complaint,
					                'lang': lang,
					            },           
					            beforeSend: function(xhr) {
					                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
					            },
					            crossDomain: false,
					            success: function(response)
					            {
					            	jQuery('#figure_loading div').removeClass('spinner');
			                        	 display_success_notification(null,"Responsed sended succesfully",null);
					            },
					            error : function(xhr,errmsg,err) {
					            }
					            
					        }
					    );
						
					},

					message: 'This value is not valid',
					fields:
					{
						response_text: 
						{
							message: 'The subject is not valid',
							validators: 
							{
								notEmpty: 
								{
									message: 'The response is required and can\'t be empty'
								},
								stringLength: 
								{
									min: 6,
									max: 200,
									message: 'The response must be more than 6 and less than 200 characters long'
								},
							}
						},
				}
			}
	);
}


