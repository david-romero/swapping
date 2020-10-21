/**
 * Created on 09/04/2014
 * Author David
 * shopping_cart_view.js
 * Swapping
 */
function shopping_cart_view_show()
{
	
	var shopping_cart_items = undefined;
	shopping_cart_items = shopping_cart_controller_get_items();
	if (shopping_cart_items == undefined)
	{
		display_info_notification('Shopping Cart', 'You have no item in your shopping cart.', 'fa fa-exclamation-triangle');
	}
	else
	{
		
		body_clear();
		jQuery('<div  id="shopping_cart_items" class="table-responsive clearfix"></div>').appendTo('#content-body');
		jQuery('<div id="tablas" class="tables"></div>').appendTo('#shopping_cart_items');
		jQuery('#tablas').append('<table  class="table table_header">'+
				'<thead>'+
				'<tr>'+
					'<th colspan="2" class="description" >'+
						'Item Description'+
					'</th>'+
					'<th class="date">'+
						'Created'+
					'</th>'+
					'<th class="category">'+
						'Category'+
					'</th>'+
					'<th class="quantity">'+
						'Quantity'+
					'</th>'+
					'<th class="price">'+
						'Price'+
					'</th>'+
					'<th class="subtotal">'+
						'Subtotal'+
					'</th>'+
					'<th>'+
						'&nbsp;'+
					'</th>'+
				'</tr>'+
			'</thead>'+
		'</table>');
		
		
		
		
		
		
		var total = 0;
		for (var i = 0; i < shopping_cart_items.length; i++)
		{
			shopping_cart_view_create_table(i);
			jQuery.each(shopping_cart_items[i].fields, function(fieldname, value) 
					{
			            if (fieldname == 'title'){
			            	jQuery('#title' + i).append(value);
			            }
			            if (fieldname == 'description'){
			            	jQuery('#description' + i).append(value);
			            }
			            if (fieldname == 'category'){
			            	jQuery('#category' + i).append(value);
			            }
			            if (fieldname == 'user'){
			            	values = value.split(':');
			            	username = values[1];
			            	id = values[0];
			            	jQuery('#user' + i).append('<a onclick="user_view_show_profile_data(' + id + ');" href="#">'+ username + '</a>');
			            }
			            if (fieldname == 'price')
			            {
			            	jQuery('#price' + i).append(value);
	
			            }
			            if (fieldname == 'image')
			            {
			            	jQuery('#thumb' + i + ' a').append('<img height="60" src="uploaded/photos/' + value + '" />');
	
			            }
			            if (fieldname == 'quantity')
			            	jQuery('#quantity' + i).val(value);
			            if (fieldname == 'created_on'){
			            	jQuery('#created_on' + i).append(jQuery.format.date(value,'dd/MM/yy'));
			            }
					});
			
			jQuery('#subtotal' + i).append(shopping_cart_items[i].fields.price * shopping_cart_items[i].fields.quantity);
	    	total += shopping_cart_items[i].fields.price * shopping_cart_items[i].fields.quantity;
		}
		
		//Spinner
		$('.spinnerNumeric .btn:first-of-type').on('click', function() {
		    $('.spinnerNumeric input').val( parseInt($('.spinnerNumeric input').val(), 10) + 1);
		  });
		  $('.spinnerNumeric .btn:last-of-type').on('click', function() {
		    $('.spinnerNumeric input').val( parseInt($('.spinnerNumeric input').val(), 10) - 1);
		  });
		
		var goods_total = total;
		var taxes = 0.0;
		var delivery_cost = 0.0;
		var order_total = 0.0;
		var limit = 300;
		var percentage = 0.02;
		if ( goods_total > limit )
		{
			taxes = limit * percentage;
		}
		else
		{
			taxes = goods_total * percentage;
		}
		order_total = goods_total + taxes + delivery_cost;
		jQuery('#shopping_cart_items').append('<div class="table-responsive order_blocks clearfix">'+
				'<div class="row">'+
					'<div class="span6 shipping_block clearfix">'+
					 '<div class="delivery_block pull-left">'+	
						'<h4>Delivery Method</h4>'+
						'<label class="radio" style="font-weight: normal;">'+
							'<input type="radio" name="deliveryOption" id="deliveryOption1" value="0" checked="">'+
							'STANDARD - 4-5 working days: 0.00  <span class="currency">&euro;</span>'+
						'</label>'+
						'<label class="radio" style="font-weight: normal;">'+
							'<input type="radio" name="deliveryOption" id="deliveryOption2" value="9.95">'+
							'EXPRESS DELIVERY - 48h: 9.95  <span class="currency">&euro;</span>'+
						'</label>'+
						'<h4>Address history</h4>'+
						'<label class="radio" style="font-weight: normal;">'+
							'<input type="radio" name="addressOption" id="addressOption1" value="0" checked="">'+
							'Avda Reina Mercedes 45 4&#186; C, 41012, Sevilla, Spain'+
						'</label>'+
						'<label class="radio" style="font-weight: normal;">'+
							'<input type="radio" name="addressOption" id="addressOption2" value="1">'+
							'Avda Virgen de la Esperanza 4 2&#186; Derecha, 41012, Sevilla, Spain'+
						'</label>'+
					'</div>'+
				'</div>'+
				'<div class="span6 total_block">'+
					'<h4>Summary Block</h4>'+
					'<table class="table" id="basketTotalsList">'+
						'<tbody>'+
							'<tr>'+
								'<td class="total_position">Goods Subtotal</td>'+
								'<td class="basket_subtotal">'+
									'<span class="amount">' + goods_total + '</span><span class="currency">&euro;</span>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="total_position">Taxes (<span class="taxes_percent">2</span>%)</td>'+
								'<td class="basket_taxes">'+
									'<span class="amount">' + taxes + '</span><span class="currency">&euro;</span>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="total_position">Delivery cost</td>'+
								'<td class="basket_delivery">'+
									'<span class="amount">' + delivery_cost + '</span><span class="currency">&euro;</span>'+
								'</td>'+
							'</tr>'+
							'<tr class="total">'+
								'<td class="total_position">'+
									'<h3>Order Total</h3>'+
								'</td>'+
								'<td class="basket_total">'+
									'<h3>'+
										'<span class="amount">' + order_total + '</span><span class="currency">&euro;</span>'+
									'</h3>'+
								'</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>'+
				'</div>'+
			'</div>'+
		'</div>');
		
		jQuery('#shopping_cart_items').append('<div class="navbar">'+
				'<div class="navbar-inner" style="">'+
				'<ul class="nav custom_nav">'+
					'<li class="pull-left">'+
						'<div>'+
							'<a href="/home" class="btn btn-info">'+
								'<i class="icon-hand-left icon-white"></i>'+
								'Continue Shopping'+
							'</a>'+
						'</div>'+
					'</li>'+
					'<li class="pull-right">'+
						'<button onclick="swapping_with_money_controller_payment();" class="btn btn-success continue_to_checkout" type="submit" value="Checkout" name="cont_to_checkout2">'+
							'<i class="fa fa-credit-card"></i>  Continue To Checkout'+
							'<i class="icon-hand-right icon-white"></i>'+
						'</button>'+
					'</li>'+
					'<li class="pull-right">&nbsp;&nbsp;</li>'+
					'<li class="pull-right">'+
						'<div>'+
							'<button onclick="shopping_cart_controller_remove_all();" class="btn btn-danger remove_all" type="submit" name="remove_all2" value="remove_all" rel="tooltip" data-placement="top" data-original-title="Be careful! All products will be entirely removed from the shopping cart!">'+
								'<i class="icon-remove icon-white"></i>'+
								'Remove All'+
							'</button>'+
						'</div>'+
					'</li>'+
				'</ul>'+
			'</div>'+
		'</div>');
	}	
}

function shopping_cart_view_create_table(index)
{
	jQuery('#tablas').append('<table  class="table" >'+
			'<tbody>'+
				'<tr class="warning">'+
					'<td id="thumb' + index + '" class="thumb" rowspan="2">'+
						'<a href="javascript: void(0);" title="Link to product page">'+
							
						'</a>'+
					'</td>'+
					'<td class="description" rowspan="2" style="width: 0%;">'+
						'<a id="title' + index + '" class="item-name" href="javascript: void(0);" title="Link to product page"></a>'+
						'<div>'+
							'<div id="description' + index + '" class="item-availability" ></div>'+
							'<div class="item-sku"></div>'+
						'</div>'+
					'</td>'+
					'<td id="created_on' + index + '" class="date">'+
						'' + 
					'</td>'+
					'<td id="category' + index + '" class="category">'+
						'' +
					'</td>'+
					'<td class="quantity">'+
						'<div class="input-group spinnerNumeric">'+
						    '<input id="quantity' + index + '"  type="text" class="form-control " value="42" disabled>'+
						    '<div class="input-group-btn-vertical">'+
						      '<button class="btn btn-default"><i class="fa fa-caret-up"></i></button>'+
						      '<button class="btn btn-default"><i class="fa fa-caret-down"></i></button>'+
						    '</div>'+
						  '</div>'+
						

					'</td>'+
					'<td class="price">'+
						'<span id="price' + index + '" class="amount"></span><span class="currency">&euro;</span>'+
					'</td>'+
					'<td class="subtotal">'+
						'<span id="subtotal' + index + '" class="amount"></span><span class="currency">&euro;</span>'+
					'</td>'+
					'<td class="remove">'+
						'<button class="btn btn-danger btn-mini" type="submit" name="prod1_remove' + index + '" value="remove_item" rel="tooltip" data-placement="left" data-original-title="Be careful! This item will be entirely removed from the basket!">'+
							'<i class="fa fa-trash-o fa-lg"></i>'+
						'</button>'+
					'</td>'+
				'</tr>'+
				'<tr class="warning additional">'+
					 '<td colspan="6" id="user' + index + '"><b>Owner:</b> &nbsp;'+
					 '</td>'+
				'</tr>'+
				'<tr class="">'+
					'<td  class="empty_td" colspan="8">'+
					'</td>'+
				'</tr>'+
			'</tbody>'+
		'</table>');
}

function shopping_cart_view_check_exists_items()
{
	var shopping_cart_items = undefined;
	shopping_cart_items = shopping_cart_controller_get_items();
	if (shopping_cart_items != undefined)
		if (shopping_cart_items.length > 0)
		{
			jQuery('#shopping_cart_container a').append('&nbsp;&nbsp;<span>' + shopping_cart_items.length + '</span>');
		}
}
