function service_controller_create_service()
{
	jQuery('#form_service').bootstrapValidator({
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
						url : "/SwappingApp/new_service/",
						type : 'POST',
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
							alert("Service created succesfully!!!");
							myDropzone.on("sending", function(image, xhr, formData)
									{
								// add headers with xhr.setRequestHeader() or
								// form data with formData.append(name, value);
								formData.append('service', response.id);
									});
			        
							myDropzone.processQueue();
							service_controller_show_hour(response.id);
							service_controller_show_car(response.id);
							service_controller_show_estate(response.id);
							jQuery('#figure_loading div').removeClass('spinner');
						},
						error : function(response)
						{
							jQuery('#figure_loading div').removeClass('spinner');
							alert("falla");
							console.log(response);
							// display_error('Grabar Idiomas','No se ha podido grabar
							// los idiomas del cuestionario correctamente.');
						}
							
					});
		},
		message: 'This value is not valid',
		fields:
		{
			title: 
			{
				message: 'The title is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The title is required and can\'t be empty'
					},
				}
			},
			price: 
			{
				message: 'The price is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The price is required and can\'t be empty'
					},
				}
			},
			available_places: 
			{
				message: 'The available places is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The available palces is required and can\'t be empty'
					},
					
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
				}
			},
			longitude: 
			{
				message: 'The longitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			latitude: 
			{
				message: 'The latitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			dlongitude: 
			{
				message: 'The longitude of detination is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude of destination is required and can\'t be empty'
					},
				}
			},
			dlatitude: 
			{
				message: 'The latitude of destination is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The latitude of destination is required and can\'t be empty'
					},
				}
			},
			day_of_week: 
			{
				message: 'The day of week is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The day of week is required and can\'t be empty'
					},
				}
			},
			duration: 
			{
				message: 'The duration is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The duration is required and can\'t be empty'
					},
				}
			},
			beginning: 
			{
				message: 'The date of beginning is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The date of beginning is required and can\'t be empty'
					},
				}
			},
			ending: 
			{
				message: 'The date of ending is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The date of ending is required and can\'t be empty'
					},
				}
			},
		}
		
	});
	
}
function get_location(id)
{
	
	$.ajax(
	{
	    url : "/SwappingApp/location/" + id + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    result = response;
		    
	    },
	    error : function(response)
	    {
		    alert('errorrr!!');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
function service_controller_show_hour(id_service, returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/hour/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    if (returned != null && returned)
		    {
			    result = response;
		    }
		    else
		    {
			    service_view_show(response);
		    }
		    
	    },
	    error : function(response)
	    {
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
function service_controller_show_car(id_service, returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/car/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    data :
	    {
		    'id' : id_service
	    },
	    success : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    if (returned != null && returned)
		    {
			    result = response;
		    }
		    else
		    {
			    service_view_show(response);
		    }
		    
	    },
	    error : function(response)
	    {
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
function service_controller_show_estate(id_service, returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/estate/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    data :
	    {
		    'id' : id_service
	    },
	    success : function(response)
	    {
		    
		    jQuery('#figure_loading div').removeClass('spinner');
		    if (returned != null && returned)
		    {
			    result = response;
		    }
		    else
		    {
			    service_view_show(response);
		    }
		    
	    },
	    error : function(response)
	    {
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
function service_controller_delete_car(id_car)
{
	if (confirm("Are you sure to delete the message?"))
	{
		var $csrftoken = $.cookie('csrftoken');
		jQuery('#figure_loading div').addClass('spinner');
		jQuery.ajax(
		{
		    url : "/SwappingApp/car/" + id_car,
		    type : 'DELETE',
		    beforeSend : function(xhr)
		    {
			    xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		    },
		    crossDomain : false,
		    success : function(response)
		    {
			    jQuery('#figure_loading div').removeClass('spinner');
			    alert("The car was deleted");
		    },
		    error : function(response)
		    {
			    alert("ERROR");
			    console.log(response);
			    // display_error('Grabar Idiomas','No se ha podido grabar los
				// idiomas del cuestionario correctamente.');
		    }
		});
	}
	
}
function service_controller_delete_hour(id)
{
	if (confirm("Are you sure to delete the message?"))
	{
		jQuery('#figure_loading div').addClass('spinner');
		var $csrftoken = $.cookie('csrftoken');
		jQuery.ajax(
		{
		    url : "/SwappingApp/hour/" + id + "/",
		    type : 'DELETE',
		    beforeSend : function(xhr)
		    {
			    xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		    },
		    crossDomain : false,
		    success : function(response)
		    {
			    alert("The service was deleted");
			    jQuery('#figure_loading div').removeClass('spinner');
			     window.location.href = 'http://127.0.0.1:8000/home';
		    },
		    error : function(response)
		    {
			    console.log(response);
			    alert("ERROR");
			    alert(response);
			    setTimeout(function()
			    {
				    // Do something after 5 seconds
			    }, 5000 * 2);
			    // display_error('Grabar Idiomas','No se ha podido grabar los
				// idiomas del cuestionario correctamente.');
		    }
		});
	}
}
function service_controller_delete_estate(id)
{
	if (confirm("Are you sure to delete the message?"))
	{
		jQuery('#figure_loading div').addClass('spinner');
		var $csrftoken = $.cookie('csrftoken');
		jQuery.ajax(
		{
		    url : "/SwappingApp/estate/" + id,
		    type : 'DELETE',
		    beforeSend : function(xhr)
		    {
			    xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		    },
		    crossDomain : false,
		    success : function(response)
		    {
			    jQuery('#figure_loading div').removeClass('spinner');
			    alert("The service was deleted");
			    window.location.href = 'http://127.0.0.1:8000/home';
		    },
		    error : function(response)
		    {
			    alert("ERROR");
			    console.log(response);
			    // display_error('Grabar Idiomas','No se ha podido grabar los
				// idiomas del cuestionario correctamente.');
		    }
		});
	}
}
function service_controller_update_hour(id)
{
	jQuery('#form_hour').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh',
		},
	    submitHandler : function(validator, form, submitButton) 
	    {
		    jQuery('#figure_loading div').addClass('spinner');
		    var $csrftoken = $.cookie('csrftoken');
		    jQuery.ajax(
		    {
		        url : "/SwappingApp/hour_edit/" + id + "/",
		        type : 'PUT',
		        data : form.serialize(),
		        beforeSend : function(xhr)
		        {
			        xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		        },
		        crossDomain : false,
		        success : function(response)
		        {
			        jQuery('#figure_loading div').removeClass('spinner');
			        alert("Service edit succesfully!!!");
			        service_controller_show_hour(id);
		        },
		        error : function(response)
		        {
			        alert("falla");
			        console.log(response);
			        // display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
		        }
		    });
	    },
		message: 'This value is not valid',
		fields:
		{
			title: 
			{
				message: 'The title is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The title is required and can\'t be empty'
					},
				}
			},
			price: 
			{
				message: 'The price is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The price is required and can\'t be empty'
					},
				}
			},
			available_places: 
			{
				message: 'The available places is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The available palces is required and can\'t be empty'
					},
					
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
				}
			},
			longitude: 
			{
				message: 'The longitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			latitude: 
			{
				message: 'The latitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			day_of_week: 
			{
				message: 'The day of week is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The day of week is required and can\'t be empty'
					},
				}
			},
			duration: 
			{
				message: 'The duration is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The duration is required and can\'t be empty'
					},
				}
			},
		}
		
	});
	
}

function service_controller_update_car(id)
{
	jQuery('#form_car').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh',
		},
	    submitHandler : function(validator, form, submitButton) 
	    {
		    jQuery('#figure_loading div').addClass('spinner');
		    var $csrftoken = $.cookie('csrftoken');
		    jQuery.ajax(
		    {
		        url : "/SwappingApp/car_edit/" + id + "/",
		        type : 'PUT',
		        data : form.serialize(),
		        beforeSend : function(xhr)
		        {
			        xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		        },
		        crossDomain : false,
		        success : function(response)
		        {
			        jQuery('#figure_loading div').removeClass('spinner');
			        alert("Service edit succesfully!!!");
			        service_controller_show_car(id);
		        },
		        error : function(response)
		        {
			        alert("falla");
			        console.log(response);
			        // display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
		        }
		    });
	    },
		message: 'This value is not valid',
		fields:
		{
			title: 
			{
				message: 'The title is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The title is required and can\'t be empty'
					},
				}
			},
			price: 
			{
				message: 'The price is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The price is required and can\'t be empty'
					},
				}
			},
			available_places: 
			{
				message: 'The available places is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The available palces is required and can\'t be empty'
					},
					
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
				}
			},
			longitude: 
			{
				message: 'The longitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			latitude: 
			{
				message: 'The latitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			dlongitude: 
			{
				message: 'The longitude of detination is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude of destination is required and can\'t be empty'
					},
				}
			},
			dlatitude: 
			{
				message: 'The latitude of destination is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The latitude of destination is required and can\'t be empty'
					},
				}
			},
		}
		
	});
	
}

function service_controller_update_estate(id)
{
	jQuery('#form_estate').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh',
		},
	    submitHandler : function(validator, form, submitButton) 
	    {
		    jQuery('#figure_loading div').addClass('spinner');
		    var $csrftoken = $.cookie('csrftoken');
		    var serial = $('#form_estate').serialize();
		    jQuery.ajax(
		    {
		        url : "/SwappingApp/estate_edit/" + id + "/",
		        type : 'PUT',
		        data : serial,
		        beforeSend : function(xhr)
		        {
			        xhr.setRequestHeader("X-CSRFToken", $csrftoken);
		        },
		        crossDomain : false,
		        success : function(response)
		        {
			        
			        jQuery('#figure_loading div').removeClass('spinner');
			        alert("Service edit succesfully!!!");
			        service_controller_show_estate(id);
		        },
		        error : function(response)
		        {
			        alert("falla");
			        console.log(response);
			        // display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
		        }
		    });
	    },
		message: 'This value is not valid',
		fields:
		{
			title: 
			{
				message: 'The title is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The title is required and can\'t be empty'
					},
				}
			},
			price: 
			{
				message: 'The price is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The price is required and can\'t be empty'
					},
				}
			},
			available_places: 
			{
				message: 'The available places is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The available palces is required and can\'t be empty'
					},
					
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
				}
			},
			longitude: 
			{
				message: 'The longitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			latitude: 
			{
				message: 'The latitude is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The longitude is required and can\'t be empty'
					},
				}
			},
			beginning: 
			{
				message: 'The date of beginning is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The date of beginning is required and can\'t be empty'
					},
				}
			},
			ending: 
			{
				message: 'The date of ending is not valid',
				validators: 
				{
					notEmpty: 
					{
						message: 'The date of ending is required and can\'t be empty'
					},
				}
			},
		}
		
	});
	
}
function service_controller_get_photo(id_service, returned)
{
	var result;
	$.ajax(
	{
	    url : "SwappingApp/get_service_photo/" + id_service,
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    if (returned != null && returned)
		    {
			    result = response;
		    }
	    },
	    error : function(response)
	    {
		    alert("falla!");
		    console.log(response);
	    }
	});
	return result;
}
/*function controller_premium(){
	$.ajax(
			{
			    url : "/SwappingApp/get_premium/",
			    type : 'GET',
			    async : false,
			    success : function(response)
			    {
				    // alert("id usuario:"+response.id);
				    result = response;
				    
			    },
			    error : function(response)
			    {
				    alert('errorrr!!');
				    console.log(response);
				    // display_error('Listado de cuestionarios','Ha ocurrido un error al
					// obtener el listado de cuestionarios.');
			    }
			});
			return result;
}*/
function get_all_service_for_user(id){
	
	$('body').addClass('loading');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/hour/?user_id=" + id+"",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    alert("GET EXITOSO");
		    result = response;
		    
	    },
	    error : function(response)
	    {
		    alert('errorrr!!');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
	
}


function service_controller_get_first_image_service(id_service)
{
	var result = null;
	$.ajax(
	{
	    url : "/SwappingApp/get_service_first_image/",
	    type : 'GET',
	    async : false,
	    data:
	    {
	    	id_service : id_service
	    },
	    success : function(response)
	    {
		    result = response;
	    },
	    error : function(response)
	    {
		    alert('errorrr!!');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
