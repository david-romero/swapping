/**
 * Created on 15/04/2014
 * Author David
 * swapping_with_money_controller.js
 * Swapping
 */
function swapping_with_money_controller_payment()
{
	display_info_notification('Connecting with Paypal', 'We are connecting with Paypal, please wait a few seconds.', 'fa fa-credit-card');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/paypal/",
            type: 'GET',
            crossDomain: true,
            dataType: "json",
            success: function(response)
            {
            	display_info_notification('Paypal', 'Redirecting to paypal gateway.', 'fa fa-credit-card');
            	window.location.href = response.url;
            },
            error: function(response)
            {
            	display_error_notification('Paypal Error', 'An error occurred creating the transaction. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
        }
    );
}

function swapping_with_money_controller_get_all(page,id_usuario)
{
	jQuery.ajax
	(
		{
			url: "/SwappingApp/swap_with_money/",
			type: 'GET',
			data : 
			{
				user : id_usuario,
			},
			success: function(response)
            {
				swapping_with_money_view_show_all_swapping(response,page);
            },
            error: function(response)
            {
            	display_error_notification('Get Swappings', 'An error occurred. Please try again in a few minutes.', 'fa fa-times');
                console.log(response);
            }
		}
	);
}