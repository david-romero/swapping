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
	            async: false,
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
	            async: false,
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