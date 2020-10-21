/**
 * Created on 21/05/2014
 * Author David
 * swapping_without_money_contrller.js
 * Swapping
 */

/**
 * Con esta funcion realizamos una peticion para que un usuario se una a un servicio
 */
function swap_without_money_controller_join_to_service(id_service)
{
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/service/join/",
	            type: 'POST',
	            async: true,
	            beforeSend: function(xhr) 
	            {
	                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
	            crossDomain: false,
	            data:
	            {
	            	'id_service' : id_service
	            },
	            success: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	display_success_notification('Joined', 'You Joined this service', 'fa fa-check');
	            	body_clear();
	            	swapping_without_money_controller_get_all(1, response.user);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	if (response.status == 400)
	            	{
	            		display_error_notification('Error', 'You have already joined this service','fa fa-times');
	            	}
	            	else if (response.status = 404)
	            	{
	            		display_error_notification('Error', 'You can not join a service created for yourself','fa fa-times');
	            	}
	            	else
	            	{
	            		display_error_notification('Error', 'An error has occurred, try again later please','');
	            	}
	            	
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}


/**
 * Con esta funcion realizamos una peticion para que un usuario se una a un servicio pagando con creditos
 */
function swap_without_money_controller_join_to_service_with_credits(id_service)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/credits/join/service/",
	            type: 'POST',
	            async: true,
	            beforeSend: function(xhr) 
	            {
	            	var $csrftoken = $.cookie('csrftoken');
	                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
	            crossDomain: false,
	            data:
	            {
	            	'id_service' : id_service
	            },
	            success: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	display_success_notification('Joined', 'You Joined this service', 'fa fa-check');
	            	body_clear();
	            	swapping_without_money_controller_get_all(1, response.user);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	if (response.status == 400)
	            	{
	            		display_error_notification('Error', 'You have already joined this service','fa fa-times');
	            	}
	            	else if (response.status == 410)
	            	{
	            		display_error_notification('Error', 'You do not have enough credits','fa fa-times');
	            	}
	            	else
	            	{
	            		display_error_notification('Error', 'An error has occurred, try again later please','');
	            	}
	            	
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}


/**
 * Con esta funcion realizamos una peticion para que un usuario se una a un servicio pagando con creditos
 */
function swap_without_money_controller_join_to_service_with_paypal(id_service)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/paypal/join/service/",
	            type: 'POST',
	            async: true,
	            beforeSend: function(xhr) 
	            {
	            	var $csrftoken = $.cookie('csrftoken');
	                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
	            crossDomain: false,
	            data:
	            {
	            	'id_service' : id_service
	            },
	            success: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	display_success_notification('Joined', 'You Joined this service', 'fa fa-check');
	            	body_clear();
	            	swapping_without_money_controller_get_all(1, response.user);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	            	if (response.status == 400)
	            	{
	            		display_error_notification('Error', 'You have already joined this service','fa fa-times');
	            	}
	            	else if (response.status == 410)
	            	{
	            		display_error_notification('Error', 'You do not have enough credits','fa fa-times');
	            	}
	            	else
	            	{
	            		display_error_notification('Error', 'An error has occurred, try again later please','');
	            	}
	            	
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}

function swapping_without_money_controller_get_all(page,id_usuario)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap/",
			type: 'GET',
			data : 
			{
				"page":page,
				"page_size": 5,
				"user" : id_usuario,
			},
			success: function(response)
            {
				swapping_without_money_view_show_all_swapping(response,page,id_usuario);
            },
            error: function(response)
            {
            	display_error_notification('Get Swappings', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}


function swapping_without_money_controller_get_swap(id_swap)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap/"+id_swap+"/",
			type: 'GET',
			success: function(response)
            {
				swapping_without_money_view_show_swap(response);
            },
            error: function(response)
            {
            	display_error_notification('Get Swapping', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}


function swapping_without_money_controller_get_images(id_swap)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap_photos/"+id_swap+"/",
			type: 'GET',
			data:
			{
				"id_swap": id_swap
			},
			success: function(response)
            {
				swapping_without_money_view_show_swap_photos(response,id_swap);
            },
            error: function(response)
            {
            	display_error_notification('Get Swapping', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}


function swapping_without_controller_get(id_swap)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap/"+id_swap+"/",
			type: 'GET',
			success: function(response)
            {
				service_view_show_user_joined(response);
            },
            error: function(response)
            {
            	display_error_notification('Get Swapping', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}

function swapping_without_money_controller_delete_service_swap(id_swap,id_service,type_service)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap/"+id_swap+"/",
			type: 'DELETE',
			success: function(response)
            {
				display_success_notification('Removed', 'It has successfully removed this user', 'fa fa-success');
				switch (type_service)
                {
	                case "\'Car\'" :
	                	service_controller_show_car(id_service, null);
		                
		                break;
		                
	                case "\'Hour\'" :
	                	service_controller_show_hour(id_service, null);
		                
		                break;
		                
	                case "\'Estate\'" :
	                	service_controller_show_estate(id_service, null);
		                
		                break;
	              
                }
            },
            error: function(response)
            {
            	display_error_notification('Not Removed', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}
