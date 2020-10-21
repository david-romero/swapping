/**
 * Created on 06/04/2014
 * Author David
 * product_controller.js
 * Swapping
 */
function product_controller_get_premium()
{
	jQuery.ajax
	(
			{
				url: "/SwappingApp/item/?premium=True",
	            type: 'GET',
	            success: function(response)
	            	{
	            		
	            		product_view_show_premium_products(response);
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

function product_controller_get_trending_products()
{
	jQuery.ajax
	(
			{
				url: "/SwappingApp/trending_product/",
	            type: 'GET',
	            success: function(response)
	            	{
	            		product_view_show_trends(response.trends);
	            	},
	            error: function(response)
	            {
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}


function product_controller_get_all(page_number)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/product/",
	            type: 'GET',
	            data :
	            {
	            	"page" : page_number
	            },
	            success: function(response)
	            {
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		product_view_show_all_products(page_number,response);
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

function product_controller_set_Display(id,display, type,lang){
	if(display==true){
		display="True";
	}else{
		display="False";
	}
	var $csrftoken = $.cookie('csrftoken');
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/display_set_display/",
	            type: 'POST',
	            data :
	            {
	            	'id': id,
	                'display': display,	     
	                'type':type,
	            },
                beforeSend: function(xhr) {
	                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
		        crossDomain: false,
	            success: function(response)
	            	{	
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		if(display == "True"){
	            			mensaje="The product was changed to display";
	            		}else{
	            			mensaje="The product was changed to not do display";
	            		}
	            		
	            		
	            		display_success_notification(null,mensaje,null);
	            		if(response.type == 'service'){
	            			if(response.subtype == 'none'){
	    	            		display_success_notification(null,"There was problem",null);
	            			}
	            			
	            			if(response.subtype == 'estate'){
	            			service_controller_show_estate(response.id);
	            			}
	            			
	            			if(response.subtype == 'hour'){
		            			service_controller_show_hour(response.id);
	            			}
	            			
	            			if(response.subtype == 'car'){
		            			service_controller_show_car(response.id);
	            			}
	            			loadBundles(lang);
	            		}
	            		if(response.type == 'item'){
	            			setInterval(show_item_detail(response.id),3000);
	            			loadBundles(lang);
	            		}
	            	},
	            error: function(response)
	            {		
	            		jQuery('#figure_loading div').addClass('spinner');
	            		display_error_notification(null,"An unexpected error has occurred",null);
	            }
			}
	);
}

function product_controller_renew(id,type,lang){
	var $csrftoken = $.cookie('csrftoken');
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/product_renew/",
	            type: 'POST',
	            data :
	            {
	            	'id': id,
	            	'type':type,
	            },
                beforeSend: function(xhr) {
	                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
		        crossDomain: false,
	            success: function(response)
	            	{	
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		if(response.type=="none"){
		            		display_error_notification(null,"You don't have enought credits!",null);
		            		return;
	            		}
	            		if(lang == 'en'){
	            			display_success_notification(null,"The product was renewed",null);
	            		}else{
	            			display_success_notification(null, "El producto fue renovado", null);
	            		}
	            		if(response.type == 'service'){
	            			
	            			if(response.subtype == 'estate'){
	            			service_controller_show_estate(response.id);
	            			}
	            			
	            			if(response.subtype == 'hour'){
		            			service_controller_show_hour(response.id);
	            			}
	            			
	            			if(response.subtype == 'car'){
		            			service_controller_show_car(response.id);
	            			}
	            			loadBundles(lang);
	            		}else{
	            			show_item_detail(response.id);
	            			loadBundles(lang);
	            		}
	            	},
	            error: function(response)
	            {		
	            		jQuery('#figure_loading div').addClass('spinner');
	            		display_error_notification(null,"An unexpected error has occurred",null);
	            }
			}
	);
}



function product_controller_add_service_wish(id_service){
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/add_service_wish/",
	            type: 'POST',
	            beforeSend : function(xhr)
				{
					xhr.setRequestHeader("X-CSRFToken", $csrftoken);
				},
				crossDomain : false,
				data:{
					'id_service':id_service,
				},
				enctype : "multipart/form-data",
				encoding : "multipart/form-data",
				success : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					display_success_notification("New Wish","Service wish succesfully",null);
					product_view_show_all_products_wish();
				},
				error : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					if (response.status = 403)
						display_error_notification('Service Wish', 'You cannot wish your service or just wish this service', 'fa fa-times');
					else
						display_error_notification('Service Wish', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
					console.log(response);
					// display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
				}
					
			});
}

function product_controller_add_item_wish(id_item){
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/add_item_wish/",
	            type: 'POST',
	            beforeSend : function(xhr)
				{
					xhr.setRequestHeader("X-CSRFToken", $csrftoken);
				},
				crossDomain : false,
				data:{
					'id_item':id_item,
				},
				enctype : "multipart/form-data",
				encoding : "multipart/form-data",
				success : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					display_success_notification("New Wish","Item wish succesfully",null);
					product_view_show_all_products_wish();
				},
				error : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					if (response.status = 403)
						display_error_notification('Item Wish', 'You cannot wish your item or just wish this item', 'fa fa-times');
					else
						display_error_notification('Item Wish', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
					console.log(response);
					// display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
				}
					
			});
}

function product_controller_remove_service_wish(id_service){
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/remove_service_wish/",
	            type: 'POST',
	            beforeSend : function(xhr)
				{
					xhr.setRequestHeader("X-CSRFToken", $csrftoken);
				},
				crossDomain : false,
				data:{
					'id_service':id_service,
				},
				enctype : "multipart/form-data",
				encoding : "multipart/form-data",
				success : function(response)
				{			            	
					jQuery('#figure_loading div').removeClass('spinner');
					display_success_notification("Delete Wish","Wish delete succesfully",null);
					product_view_show_all_products_wish();
				},
				error : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					display_error_notification('Service Wished', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
					console.log(response);
					// display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
				}
					
			});
}

function product_controller_remove_item_wish(id_item){
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/remove_item_wish/",
	            type: 'POST',
	            beforeSend : function(xhr)
				{
					xhr.setRequestHeader("X-CSRFToken", $csrftoken);
				},
				crossDomain : false,
				data:{
					'id_item':id_item,
				},
				enctype : "multipart/form-data",
				encoding : "multipart/form-data",
				success : function(response)
				{			            	
					jQuery('#figure_loading div').removeClass('spinner');
					isplay_success_notification("Delete Wish","Wish delete succesfully",null);
					product_view_show_all_products_wish();
				},
				error : function(response)
				{
					jQuery('#figure_loading div').removeClass('spinner');
					display_error_notification('Item Wished', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
					console.log(response);
					// display_error('Grabar Idiomas','No se ha podido grabar
					// los idiomas del cuestionario correctamente.');
				}
					
			});
}

function product_controller_list_wish(){
	var result;
	jQuery.ajax
	(
			{
				url: "/SwappingApp/list_product_wish/",
	            type: 'GET',
	            async: false,
	            success: function(response)
	            	{
	            		result = response;
	            	},
	            error: function(response)
	            {
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
	return result;
	
}

function product_controller_get_product_location(id_location)
{
	var result = null;
	jQuery.ajax
	(
			{
				url: "/SwappingApp/location/"+id_location+"/",
	            type: 'GET',
	            async: false,
	            success: function(response)
	            {
	            		result = response;
	            },
	            error: function(response)
	            {
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
	return result;
}
