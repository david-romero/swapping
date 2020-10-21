function user_controller_signin_twiiter()
{
	$("#content-body").remove();
}

function user_controller_add_user()
{
	$('#register_form_user').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
		    invalid: 'fa fa-times',
		    validating: 'fa fa-refresh',
	    },
		            submitHandler: function(form) 
					{ 
		            	var $csrftoken = $.cookie('csrftoken');
		            	jQuery('#figure_loading div').addClass('spinner');
						jQuery.ajax
					    (
					        {
					            url: "/SwappingApp/register_user/",
					            type: 'POST',
					            data:
					            {
					                'username': $('#username_input').val(),
					                'password': $('#password_input').val(),
					                'first_name': $('#name_input').val(),
					                'last_name': $('#surname_input').val(),
					                'phone': $('#phone_input').val(),
					                'email': $('#email_input').val(),
					                'photo': $('#photo_input').val(),
					            },
					            beforeSend: function(xhr) {
					                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
					            },
					            crossDomain: false,
					            success: function(response)
					            {
					            	display_success_notification("Success","User created succesfully",null);
					            	jQuery('#figure_loading div').removeClass('spinner');
					            	
					            	myDropzone.on("sending", function(file, xhr, formData) {
					            		  // add headers with xhr.setRequestHeader() or
					            		  // form data with formData.append(name, value);
					            		formData.append('user_id', response.id);
					            		});
					            	
					            	myDropzone.processQueue();
					            	
					            	setTimeout(function()
					            	{
					            		user_controller_get(response.id);
					            	}, 2000);
					            	
					            },
					            error : function(xhr,errmsg,err) {
					            	 jQuery('#figure_loading div').removeClass('spinner');
			                         var json = $.parseJSON(xhr.responseText);
			                         jQuery.each(json , function(index,value)
			                        		 {
						                        	 display_error_notification(null,value,null);
			                        		 });					            	
					            	}
					        }
					    );
					},
					message: 'This value is not valid',
					fields:
					{
						username_input: 
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
									max: 18,
									message: 'The username must be more than 18 and less than 30 characters long'
								}
							}
						},
						name_input: 
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
									max: 30,
									message: 'The responsible must be  less than 30 characters long'
								}
							}
						},
						surname_input: 
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
									max: 30,
									message: 'The responsible must be  less than 30 characters long'
								}
							}
						},
						email_input: 
						{
							message: 'The email is not valid',
							validators: 
							{
								notEmpty: 
								{
									message: 'The email is required and can\'t be empty'
								},
								stringLength: 
								{
									max: 30,
									message: 'The email must be less than 30 characters long'
								},
								regexp: 
								{
									regexp: /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/,
									message: 'The email is not valid'
								}
							}
						},
						password_input: 
						{
							message: 'The password is not valid',
							validators: 
							{
								notEmpty: 
								{
									message: 'The password is required and can\'t be empty'
								},
								stringLength: 
								{
									max: 30,
									message: 'The password must be less than 30 characters long'
								}
							}
						},
						phone_input: 
						{
							message: 'The phone is not valid',
							validators: 
							{
								notEmpty: 
								{
									message: 'The phonw is required and can\'t be empty'
								},
								stringLength: 
								{
									max: 30,
									message: 'The password must be  less than 30 characters long'
								},
								regexp: 
								{
									regexp: /^[0-9]+$/,
									message: 'The phone must be a number'
								}

							}//validator
						}//phone input
					}//fields€
				});//validator
}


function user_controller_edit_user(id_user)
{

	editValidate(id_user);
	var validate = $("#user_edit_form").valid();
	if(validate)
		{

			
		}
	return validate;
}


function user_controller_get(id_user,returned)
{	
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/user/",
             type: 'GET',
             async: false,
             data :
        	 {
        	 	'id':id_user
        	 },
             success: function(response)
             {
            	
            	 $('body').removeClass('loading');
            	 if (returned != null && returned  )
            		 {
            		 	result = response;
            		 }
            	 else
            		 {
            		 	user_view_show_profile_data(response);
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


function user_controller_get_vote_by_voted(id_voted,returned)
{	
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/get_vote_by_voted/"+id_voted,
             type: 'GET',
             async: false,
             success: function(response)
             {
            	
            	 $('body').removeClass('loading');
        		 	result = response;
             },
             error: function(response)
             {	
                 console.log(response);
             }
         }
     );
	 alert("resultado "+result.exists);
	 return result;
}


function user_controller_delete_user(id_user)
{
	$('body').addClass('loading');
	var $csrftoken = $.cookie('csrftoken');
	user_controller_logout();
	jQuery.ajax
    (
        {
            url: "/SwappingApp/user/" + id_user,
            type: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	$('body').removeClass('loading');
            	
            },
            error: function(response)
            {
                console.log(response);
                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
            }
        }
    );
}



function editValidate(id_user)
{ 
	var user = user_controller_get(id_user,true);
	var photoURL = user.photo;
	var mssgMaxLength= "The lenght can't be bigger than 30";
	var sixToEightLength = "The lenght must be between 6 and 18 characters";
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	$('#user_edit_form').validate({
		onkeyup: false,
        onfocusout: false,
        errorContainer: "#errorbox",
        errorLabelContainer: "#errorbox ul",
        wrapper: "li",
        rules:{
		            
		                'username_input': {required: true, maxlength: 18, minlength: 6 },
		            
		                'name_input': {required: true, maxlength: 30},
		                
		                'surname_input': {required: true, maxlength: 30 },
		                
		                'email_input': {required: true, email:true , maxlength: 30},
		                
		                'password_input': {required: true, minlength: 6, maxlength: 18 },
		                
		                'phone_input': {required: true,  number: true, maxlength: 30}
		                
		            },
		            messages:
		            {	
		                'username_input':{ required: "You have to insert an username", maxlength: sixToEightLength, minlength: sixToEightLength},
		                'name_input':{ required: "You have to insert a name", maxlength: mssgMaxLength},
		                'surname_input':{ required: "You have to insert a surname", maxlength: mssgMaxLength},
		                'email_input':{ required: "You must insert an email", email: "The email is not correct", maxlength: mssgMaxLength},
		                'password_input':{ required: "You must insert the password",maxlength: sixToEightLength, minlength: sixToEightLength},
		                'phone_input':{ required: "You must insert the phone", number: "The phone must be a number!", maxlength: mssgMaxLength},
		            },
		            submitHandler: function(form) 
					{ 
						jQuery.ajax
					    (
					        {
					            url: "/SwappingApp/user/" + id_user,
					            type: 'PUT',
					            data:
					            {	
					            	    'username': $('#username_input').val(),
						                'first_name': $('#name_input').val(),
						                'last_name': $('#surname_input').val(),
						                'phone': $('#phone_input').val(),
						                'email': $('#email_input').val(),
					            },
					            beforeSend: function(xhr) {
					                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
					            },
					            crossDomain: false,
					            success: function(response)
					            {
					            	$('#figure_loading div').removeClass('spinner');
					            	user_controller_get(response.id);
					            },
					            error: function(response)
					            {
					                console.log(response);
					            }
					        }
					    );
					}
			}
	);
}


function user_controller_logout()
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
	            		user_controller_logout();
	            	},
	            error: function(response)
	            {
	                console.log(response);
	            }
			}
	)
}


function user_controller_get(id_user,returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/users/"+id_user+"/",
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
                 console.log(response);
             }
         }
     ); 
	 return result;
}

function user_controller_get_address()
{
	var result = null; 
	jQuery.ajax
    (
        {
            url: "/SwappingApp/user_address/",
            type: 'GET',
            async: false,
            success: function(response)
            {
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

function user_controller_get_photo(id_user,returned)
{
	var result;
	 $.ajax
     (
         {
             url: "SwappingApp/get_user_photo/"+id_user,
             type: 'GET',
             async: false,
             success: function(response)
             {
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


function change_password(id_user)
{
			jQuery('#figure_loading div').addClass('spinner');
        	var $csrftoken = $.cookie('csrftoken');
	    	jQuery.ajax
		    (
		        {
		            url: "/SwappingApp/changepassword/" + id_user+"/",
		            type: 'POST',
		            data:
		            {
		                'old_password': $('#old_password').val(),
		                'new_password_1': $('#new_password_1').val(),
		                "new_password_2": $('#new_password_2').val(),
		                'csrfmiddlewaretoken' : $('#csrfmiddlewaretoken').val(),
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
		                console.log(response);
		            }
		        }
		    );
}

function user_controller_vote(id_user){
	alert("votas!");
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/vote_user/" + id_user+"/",
            type: 'POST',
            data:
            {
                'vote': $('#kvstar-input-21f').val(),
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {	
            	jQuery('#figure_loading div').removeClass('spinner');
            },
            error: function(response)
            {
                console.log(response);
            }
        }
    );

}
