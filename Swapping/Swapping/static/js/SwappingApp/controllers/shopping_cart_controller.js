/**
 * Created on 09/04/2014
 * Author David
 * shopping_cart_controller.js
 * Swapping
 */

/**
 * Gets all items stored in sessions.
 */
function shopping_cart_controller_get_items()
{
	var result = null;
	jQuery.ajax
    (
        {
            url: "/SwappingApp/shopping_cart_items/",
            type: 'GET',
            async: false,
            success: function(response)
            {
            	result = response;
            },
            error: function(response)
            {
                console.log(response);
                result = null;
                display_error_notification('Shopping Cart', 'An error has occurred obtaining the items. We are sorry' ,'');
            }
        }
    );
	return result;
}

function shopping_cart_controller_remove_all()
{
	jQuery('#figure_loading div').addClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/remove_shopping_cart_items/",
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	display_success_notification('Remove all Products', 'Has been emptied the cart.', 'fa fa-check');
            	jQuery('#figure_loading div').removeClass('spinner');
            	window.location.href = '/home';
            },
            error: function(response)
            {
                console.log(response);
                display_error_notification('Shopping Cart', 'An error has occurred removing the items. We are sorry' ,'');
            }
        }
    );
}

function shopping_cart_controller_add_item(id_product)
{
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/add_item_shopping_cart/",
            type: 'GET',
            beforeSend: function(xhr) 
            {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            data:
            {
            	'id_product' : id_product
            },
            success: function(response)
            {
            	display_success_notification('Add Item', 'The item have been added to the shopping cart.', 'fa fa-check');
            	shopping_cart_view_check_exists_items();
            },
            error: function(response)
            {
                console.log(response);
                if (response.status == 403)
                {
                	display_error_notification('Shopping Cart', 'You cannot add this item' ,'');
                }
                if (response.status == 404)
                {
                	display_error_notification('Shopping Cart', 'This item is already added to your shopping cart' ,'');
                }
                if (response.status == 400)
                {
                	display_error_notification('Shopping Cart', 'Please sign in to perform this operation.' ,'');
                }
                if (response.status != 400 && response.status != 403 && response.status != 404 )
                {
                	display_error_notification('Shopping Cart', 'An error has occurred, please try again later please' ,'');
                }
                
            }
        }
    );
}
