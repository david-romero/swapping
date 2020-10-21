function administrator_controller_add_admin()
{
	/*$('#register_form_admin').validate({
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
            "first_name":{
                required: true,
                minlength: 2
            },
            "last_name":{
                required: true,
                minlength: 5
            },
            "email":{
                required: true,
                email : true,
                minlength: 4
            },
            "phone":{
                required: true,
                minlength: 9
            },
            "password":{
                required: true,
                equalTo: "#passwordConfirm"
            },
            "passwordConfirm":{
                required: true,
            }
            
        },
        messages: {
            "username": {
                required: "You must enter a  value",
            },
            "password": {
                required: "You must enter a  value",
                equalTo: "Password must be the same",
            },
            "last_name": {
                required: "You must enter a  value",
            },
            "first_name": {
                required: "You must enter a  value",
            },
            "phone": {
                required: "You must enter a  value",
            },
            "email": {
                required: "You must enter a  value",
                email: "You must enter a valid email"
            },
        },
        submitHandler: function(form) 
		{ 
        	var username;
        	var pass;
        	$("#register_form_admin input[type=text]").each(function(){
        		 var input = $(this); // This is the jquery object of the input, do what you will
        		 if (input.attr('name') == 'username')
        			 {
        			 	username = input.val();
        			 }
        	});
        	$("#register_form_admin input[type=password]").each(function(){
        		 var input = $(this); // This is the jquery object of the input, do what you will
        		 if (input.attr('name') == 'password')
        			 {
        			 	pass = input.val();
        			 }
        	});
        	jQuery('#figure_loading div').addClass('spinner');
			jQuery.ajax
		    (
		        {
		            url: "/SwappingApp/register_admin/",
		            type: 'POST',
		            data:
		            {
		                'username': username,
		                'password': pass,
		                'first_name': $('#first_name').val(),
		                'last_name': $('#last_name').val(),
		                'phone': $('#phone').val(),
		                'email': $('#email').val(),
		                'csrfmiddlewaretoken' : $('#csrfmiddlewaretoken').val(),
		            },
		            success: function(response)
		            {
		            	jQuery('#figure_loading div').removeClass('spinner');
		                administrator_controller_get(response.id);
		            },
		            error: function(response)
		            {
		                console.log(response);
		                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
		            }
		        }
		    );
		}
    });*/
	
	jQuery('#defaultForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
		    invalid: 'fa fa-times',
		    validating: 'fa fa-refresh'
	    },
	    submitHandler: function(validator, form, submitButton) 
		{
			jQuery('#figure_loading div').addClass('spinner');
			var $csrftoken = $.cookie('csrftoken');
			jQuery.ajax
		    (
		        {
		            url: "/SwappingApp/register_admin/",
		            type: 'POST',
		            beforeSend: function(xhr) {
		                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		            },
		            crossDomain: false,
		            data: form.serialize(),
		            success: function(response)
		            {
		            	jQuery('#figure_loading div').removeClass('spinner');
		            	display_error('Create Admin','It has created a new administrator in the system.');
		            	window.location.href = 'http://127.0.0.1:8000/home';
		            },
		            error: function(response)
		            {
		            	jQuery('#figure_loading div').removeClass('spinner');
		                console.log(response);
		                display_error('Create Admin','We are sorry, an error has occurred, please try again later...');
		            }
		        }
		    );
		},
		message: 'This value is not valid',
		fields:
		{
			username: 
			{
				message: 'The username is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The username is required and can\'t be empty'
					},
					stringLength: 
					{
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: 
					{
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The username can only consist of alphabetical, number, dot and underscore'
					},
					different: 
					{
						field: 'password',
						message: 'The username and password can\'t be the same as each other'
					}
				}
			},
			phone: 
			{
				message: 'The phone is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The phone is required and can\'t be empty'
					},
					stringLength: 
					{
						min: 8,
						max: 15,
						message: 'The phone must be more than 8 and less than 15 characters long'
					}
				}
			},
			first_name: 
			{
				message: 'The name is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The name is required and can\'t be empty'
					},
					stringLength: 
					{
						min: 2,
						max: 15,
						message: 'The name must be more than 8 and less than 15 characters long'
					},
					regexp: 
					{
						regexp: /^[a-zA-Z \.]+$/,
						message: 'The name can only consist of alphabetica'
					}
				}
			},
			last_name: 
			{
				message: 'The surname is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The surname is required and can\'t be empty'
					},
					stringLength: 
					{
						min: 4,
						max: 15,
						message: 'The surname must be more than 8 and less than 15 characters long'
					},
					regexp: 
					{
						regexp: /^[a-zA-Z\.]+$/,
						message: 'The surname can only consist of alphabetica'
					}
				}
			},
			email: 
			{
				validators:
				{
					notEmpty: 
					{
						message: 'The email address is required and can\'t be empty'
					},
					emailAddress: 
					{
						message: 'The input is not a valid email address'
					}
				}
			},
			password: 
			{
				validators: 
				{
					notEmpty: 
					{
						message: 'The password is required and can\'t be empty'
					},
					identical: 
					{
						field: 'confirmPassword',
						message: 'The password and its confirm are not the same'
					},
					different: 
					{
						field: 'username',
						message: 'The password can\'t be the same as username'
					}
				}
			},
			confirmPassword: 
			{
				validators: 
				{
					notEmpty: 
					{
						message: 'The confirm password is required and can\'t be empty'
					},
					identical: 
					{
						field: 'password',
						message: 'The password and its confirm are not the same'
					},
					different: 
					{
						field: 'username',
						message: 'The password can\'t be the same as username'
					}
				}
			},
	}
	
});
	
}


function administrator_controller_get(id_admin,returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/administrator/"+id_admin+"/",
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
            		 	administrator_view_show_profile_data(response);
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
function administrator_controller_update_admin(id_admin)
{
	 	 
		jQuery('#defaultForm').bootstrapValidator({
			feedbackIcons: {
				valid: 'fa fa-check',
			    invalid: 'fa fa-times',
			    validating: 'fa fa-refresh'
		    },
		    submitHandler: function(validator, form, submitButton) 
			{
				jQuery('#figure_loading div').addClass('spinner');
				var $csrftoken = $.cookie('csrftoken');
				jQuery.ajax
			    (
			        {
			            url: "/SwappingApp/administrator/" + id_admin +"/",
			            type: 'PUT',
			            data: form.serialize(),
			            beforeSend: function(xhr) {
			                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
			            },
			            crossDomain: false,
			            success: function(response)
			            {
			            	$('#figure_loading div').removeClass('spinner');
			            	display_success('Update admin','It\'s successful');
			                administrator_controller_get(response.id);
			            },
			            error: function(response)
			            {
			            	$('#figure_loading div').removeClass('spinner');
			                console.log(response);
			                display_error('Update admin','We are sorry, an error has occurred, please try again later...');
			            }
			        }
			    );
			},
			message: 'This value is not valid',
			fields:
			{
				username: 
				{
					message: 'The username is not valid',
					validators: 
					{
						notEmpty: 
						{
							message: 'The username is required and can\'t be empty'
						},
						stringLength: 
						{
							min: 6,
							max: 30,
							message: 'The username must be more than 6 and less than 30 characters long'
						},
						regexp: 
						{
							regexp: /^[a-zA-Z0-9_\.]+$/,
							message: 'The username can only consist of alphabetical, number, dot and underscore'
						},
						different: 
						{
							field: 'password',
							message: 'The username and password can\'t be the same as each other'
						}
					}
				},
				phone: 
				{
					message: 'The phone is not valid',
					validators: 
					{
						notEmpty: 
						{
							message: 'The phone is required and can\'t be empty'
						},
						stringLength: 
						{
							min: 8,
							max: 15,
							message: 'The phone must be more than 8 and less than 15 characters long'
						}
					}
				},
				first_name: 
				{
					message: 'The name is not valid',
					validators: 
					{
						notEmpty: 
						{
							message: 'The name is required and can\'t be empty'
						},
						stringLength: 
						{
							min: 2,
							max: 15,
							message: 'The name must be more than 8 and less than 15 characters long'
						},
						regexp: 
						{
							regexp: /^[a-zA-Z \.]+$/,
							message: 'The name can only consist of alphabetica'
						}
					}
				},
				last_name: 
				{
					message: 'The surname is not valid',
					validators: 
					{
						notEmpty: 
						{
							message: 'The surname is required and can\'t be empty'
						},
						stringLength: 
						{
							min: 4,
							max: 15,
							message: 'The surname must be more than 8 and less than 15 characters long'
						},
						regexp: 
						{
							regexp: /^[a-zA-Z\.]+$/,
							message: 'The surname can only consist of alphabetica'
						}
					}
				},
				email: 
				{
					validators:
					{
						notEmpty: 
						{
							message: 'The email address is required and can\'t be empty'
						},
						emailAddress: 
						{
							message: 'The input is not a valid email address'
						}
					}
				},
				
		}
		
	});
}
function administrator_controller_delete_admin(id_admin)
{
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/administrator/" + id_admin,
            type: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	jQuery('#figure_loading div').removeClass('spinner');
            	administrator_controller_logout();
            },
            error: function(response)
            {
            	jQuery('#figure_loading div').removeClass('spinner');
                console.log(response);
                display_error('Delete Admin','We are sorry, an error has occurred, please try again later...');
            }
        }
    );
}
function administrator_controller_logout()
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/logout",
	            type: 'GET',
	            success: function(response)
	            	{
	            		
	            		window.location.href = 'http://127.0.0.1:8000/home';
	            		jQuery('#figure_loading div').removeClass('spinner');
	            	},
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	                console.log(response);
	                display_error('Logout','We are sorry, an error has occurred, please try again later...');
	            }
			}
	)
}