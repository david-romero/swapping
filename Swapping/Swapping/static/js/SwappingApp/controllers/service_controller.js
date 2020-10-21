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
			            	
							
							display_success_notification("success","Service created succesfully",null);
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
							display_error_notification('Service', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
							console.log(response);
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
				message: 'The address is not valid',
				validators: 
				{
					numeric: 
					{
						message: 'The address entered is incorrect'
					},
				}
			},
			latitude: 
			{
				message: 'The address is not valid',
				validators: 
				{
					numeric: 
					{
						message: 'The address entered is incorrect'
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
			moment: {
				message: "The moment is not valid",
                
            },
            moment_hour: {
				message: "The moment is not valid",
				validators: 
				{
					notEmpty: 
					{
						message: 'The moment is required and can\'t be empty'
					},
				}
            }
		}
		
	});
	
}
function service_controller_show_hour(id_service, returned)
{
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/hour/"+id_service,
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
	    	//display_error_notification('Show Hour', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
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
	    url : "/SwappingApp/car/"+id_service,
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
	    	//display_error_notification('Show Car', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
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
	    url : "/SwappingApp/estate/"+id_service,
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
	    	//display_error_notification('Show Estate', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}
function service_controller_delete_car(id_car)
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
			    display_success_notification("Delete transport","Tansport deleted succesfully",null);
				window.location.href = 'http://127.0.0.1:8000/home';
		    },
		    error : function(response)
		    {
		    	display_error_notification('Delete transport','Could not delete the transport');
			    console.log(response);
			    // display_error('Grabar Idiomas','No se ha podido grabar los
				// idiomas del cuestionario correctamente.');
		    }
		});
	
	
}
function service_controller_delete_hour(id)
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
		    	display_success_notification("Delete hour","Hour deleted succesfully",null);
			    jQuery('#figure_loading div').removeClass('spinner');
			     window.location.href = 'http://127.0.0.1:8000/home';
		    },
		    error : function(response)
		    {
			    console.log(response);
			    display_error_notification('Delete Hour','Could not delete the hour');
		    }
		});
	
}
function service_controller_delete_estate(id)
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
			    display_success_notification("Delete estate","Estate deleted succesfully",null);
			    window.location.href = 'http://127.0.0.1:8000/home';
		    },
		    error : function(response)
		    {
		    	display_error_notification('Delete Estate','Could not delete the estate');
			    console.log(response);
			    // display_error('Grabar Idiomas','No se ha podido grabar los
				// idiomas del cuestionario correctamente.');
		    }
		});
	
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
			        display_success_notification("Hour Edit","Hour edited succesfully",null);
			        service_controller_show_hour(id);
		        },
		        error : function(response)
		        {
		        	display_error_notification('Update Hour', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
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
			        display_success_notification("Transport Edit","Transport edited succesfully",null);
			        service_controller_show_car(id);
		        },
		        error : function(response)
		        {
		        	display_error_notification('Update Car', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
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
			        display_success_notification("Estate Edit","Estate edited succesfully",null);
			        service_controller_show_estate(id);
		        },
		        error : function(response)
		        {
		        	display_error_notification('Update Estate', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
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
	    url : "SwappingApp/get_service_photo/"+ id_service,
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
		    //alert("falla!");
		    console.log(response);
	    }
	});
	return result;
}

function get_all_hour_for_user(id){
	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/hour/",
	    type : 'GET',
	    async : true,
	    data:{
        	'user':id
         },
	    success : function(response)
	    {
	    	
	    	jQuery('#figure_loading div').removeClass('spinner');
		    result = response;
		    show_all_hour(id,result);
		    
	    },
	    error : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
	
}
function get_all_car_for_user(id){
	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/car/",
	    type : 'GET',
	    async : true,
	    data:{
        	'user':id
         },
	    success : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    result = response;
		    show_all_car(id,result);
		    
	    },
	    error : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
	
}
function get_all_estate_for_user(id){
	
	jQuery('#figure_loading div').addClass('spinner');
	var result;
	$.ajax(
	{
		url : "/SwappingApp/estate/",
	    type : 'GET',
	    async : true,
	    data:{
        	'user':id
         },
	    success : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
		    
		    show_all_estate(id,response);
		    
	    },
	    error : function(response)
	    {
	    	jQuery('#figure_loading div').removeClass('spinner');
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
	    	'id_service' : id_service
	    },
	    success : function(response)
	    {
		    result = response;
	    },
	    error : function(response)
	    {
		    //alert('errorrr!!');
		    console.log(response);
		    // display_error('Listado de cuestionarios','Ha ocurrido un error al
			// obtener el listado de cuestionarios.');
	    }
	});
	return result;
}


function service_controller_show_service(id_service)
{
	var hour = service_controller_get_service_hour(id_service);
	var car = service_controller_get_service_car(id_service);
	var estate = service_controller_get_service_estate(id_service);
	if(hour != undefined){
		service_view_show(hour);
	}if(car != undefined){
		service_view_show(car);
	}if (estate != undefined){
		service_view_show(estate);
	}
	
}
function service_controller_get_service(id_service)
{
	var result;
	$.ajax(
	{
	    url : "/SwappingApp/service/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    result = response;
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

function service_controller_get_service_car(id_service)
{
	var result = null;
	$.ajax(
	{
	    url : "/SwappingApp/car/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    result = response;
	    },
	    error : function(response)
	    {
		    console.log(response);
		    //display_error_notification('Error', 'An error has occurred, try again later', 'fa fa-times');
	    }
	});
	return result;
}


function service_controller_get_service_hour(id_service)
{
	var result = null;
	$.ajax(
	{
	    url : "/SwappingApp/hour/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    result = response;
	    },
	    error : function(response)
	    {
		    console.log(response);
		    //display_error_notification('Error', 'An error has occurred, try again later', 'fa fa-times');
	    }
	});
	return result;
}


function service_controller_get_service_estate(id_service)
{
	var result = null;
	$.ajax(
	{
	    url : "/SwappingApp/estate/" + id_service + "/",
	    type : 'GET',
	    async : false,
	    success : function(response)
	    {
		    result = response;
	    },
	    error : function(response)
	    {
		    console.log(response);
		    //display_error_notification('Error', 'An error has occurred, try again later', 'fa fa-times');
	    }
	});
	return result;
}



function service_controller_get_all(page_number)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/services/",
	            type: 'GET',
	            data :
	            {
	            	"page" : page_number
	            },
	            success: function(response)
	            {
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		service_view_show_all_products(page_number,response);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}


function service_controller_get_services_near(longitude,latitude,address_introduced)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/get_services_near/",
	            type: 'POST',
	            data :
	            {
	            	'latitude': latitude,
	            	'longitude':longitude,
	            	
	            },
	            success: function(response)
	            {
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		//service_view_show_all_products(page_number,response);
	            		console.log(response);
	            		service_view_show_services_near(response.products,address_introduced);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}

function service_controller_get_all_filtered(filter_type,value)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/get_services_filtered/",
	            type: 'POST',
	            data :
	            {
	            	'filter_type': filter_type,
	            	'value':value,
	            	
	            },
	            success: function(response)
	            {
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		//service_view_show_all_products(page_number,response);
	            		console.log(response);
	            		service_view_show_all_products(1,response);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}