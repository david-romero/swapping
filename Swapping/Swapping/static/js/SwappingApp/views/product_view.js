/**
 * Created on 06/04/2014
 * Author David
 * product_view.js
 * Swapping
 */
function product_view_show_premium_products(products)
{

	$('#carousel-example-generic .carousel').carousel({interval:false});
	$('#carousel-example-generic .carousel-inner').append('<div class="item active"><img style="width:100%;"  data-src="holder.js/900x500/auto/#555:#5555" src="static/images/Put_Your_AD_Here.jpg" alt="900x500"><div class="carousel-caption"><p>Premium!</p></div></div>');
	$('#carousel-example-generic .carousel-indicators li').removeClass('active');
	
	$('#carousel-example-generic .carousel-inner').append('<div class="item"><img style="width:100%;" data-src="holder.js/900x500/auto/#555:#5555" src="static/images/Put_Your_AD_Here - copia.jpg" alt="900x500"><div class="carousel-caption"><p>Swap!</p></div></div>');
	$('#carousel-example-generic .carousel-indicators li').removeClass('active');
	$('#carousel-example-generic .carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
	$('#carousel-example-generic .carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="1" class="active"></li>');
	$('#carousel-example-generic .carousel').carousel('next');
	
	/*jQuery.each
	(
			products , function(index,product)
			{
				jQuery('<div id="premium' + index + '" class="item active"></div>').appendTo('#carrousel_premium');
				jQuery('<div id="sub_premium' + index + '" class="col-md-12 featuredBox"></div>').appendTo('#premium' + index);
				jQuery('<div class="col-md-7 txt">'+ product.title + '</div>').appendTo('#sub_premium' + index);
				jQuery('<div class="col-md-5 cash"><strong>XX<em>.XX€</em></strong></div>').appendTo('#sub_premium' + index);
			}
	);
	$("#main-navigation-carousel").carousel(target_slide_index);*/
}

function product_view_show_trends(tags_list)
{
	jQuery('.col-md-3').append('<div class="well col-md-12 col-sm-12 col-xs-12"><h4 id="trends_h4"">Trends</h4><div id="trends" style="overflow:hidden;" class="col-xs-12 col-sm-12 col-md-12"></div></div>');
	jQuery.each(
				tags_list , function(index,tag)
				{
					jQuery('#trends').append('<button style="margin: 1px;" class="btn btn-info" onclick="search_controller_find(\'' + tag[0] + '\');refreshLanguage();"  >' + tag[0] + '</button>');
				});
}

function product_view_show_all_products(page_number,products)
{
	$('#filter-box').remove();
	jQuery('#content-body').prepend('<div id="filter-box" class="bs-example">'+
		    '<div class="panel-group" id="accordion" >'+
		  '<div class="panel panel-default">'+
		    '<div class="panel-heading" style="background-color: #ddd;border-color: silver;border: 1px solid silver;">'+
		      '<h4 class="panel-title">'+
		        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><i class="fa fa-search"></i> Filters</a>'+
		      '</h4>'+
		    '</div>'+
		    '<div id="collapseOne" class="panel-collapse collapse">'+
		      '<div class="panel-body" style="border: 1px solid silver;">'+
			        '<form role="form">'+
			        	'<div class="input-group margin-bottom-sm">'+
			        		'<span class="input-group-addon"><i class="fa fa-location-arrow fa-fw"></i></span>'+
			        		'<input id="address-filter" class="form-control" type="text" placeholder="Address">'+
			        	'</div>'+
			    
			    '<div class="checkbox">'+
			      '<label id="swapping_allow">'+
			        '<input  type="checkbox"> Allow swapping'+
			      '</label>'+
			    '</div>'+
			    '<div class="input-group">'+
			      '<span class="input-group-addon">'+
			        '<input name="service-type" value="hours" type="radio">'+
			      '</span>'+
			      '<label id="hours_tag" class="form-control">Hours</label>'+
			      '<span class="input-group-addon">'+
			        '<input name="service-type" value="transports" type="radio">'+
			      '</span>'+
			      '<label id="transport_tag" class="form-control">Transport</label>'+
			      '<span class="input-group-addon">'+
			        '<input name="service-type" value="estates" type="radio">'+
			      '</span>'+
			      '<label id="estate_tag"class="form-control">Estates</label>'+
			    '</div><!-- /input-group -->'+
			  '</form>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'+
		'</div>'+
		'<!-- advertises -->'+
        '<div class="row" id="row1">'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product1">'+

                '<div class="thumbnail" >'+
                    '<img id="thumbnail1" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description1" style="overflow: hidden;">'+
                        	'Loading...'+
                        '</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info1" style="margin:0;">'+
                        	'<span id="user-username1"></span>'+
                            '<span id="product-actions-1"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product2">'+
                '<div class="thumbnail">'+
                    '<img id="thumbnail2" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description2" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info2" style="margin:0;">'+
                        '<span id="user-username2"></span>'+
                           '<span id="product-actions-2"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

             '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product3">'+
                '<div class="thumbnail">'+
                    '<img id="thumbnail3" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description3" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info3" style="margin:0;">'+
                        '<span id="user-username3"></span>'+
                           '<span id="product-actions-3"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

        '</div>'+

        '<div class="row" id="row2">'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product4">'+
                '<div class="thumbnail">'+
                    '<img id="thumbnail4" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description4" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info4" style="margin:0;">'+
                        '<span id="user-username4"></span>'+
                            '<span id="product-actions-4"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product5">'+
               '<div class="thumbnail">'+
                    '<img id="thumbnail5" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description5" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info5" style="margin:0;">'+
                        '<span id="user-username5"></span>'+
                            '<span id="product-actions-5"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

             '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product6">'+
               '<div class="thumbnail">'+
                    '<img id="thumbnail6" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description6" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info6" style="margin:0;">'+
                        '<span id="user-username6"></span>'+
                            '<span id="product-actions-6"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

        '</div>'+

        '<div class="row" id="row3">'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product7">'+
               '<div class="thumbnail">'+
                    '<img id="thumbnail7" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description7" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info7" style="margin:0;">'+
                        '<span id="user-username7"></span>'+
                            '<span id="product-actions-7"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product8">'+
              '<div class="thumbnail">'+
                    '<img id="thumbnail8" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description8" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info8" style="margin:0;">'+
                        '<span id="user-username8"></span>'+
                            '<span id="product-actions-8"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

             '<div class="col-md-4 col-sm-12 col-xs-12 portfolio-item" style="display:none;" id="product9">'+
                '<div class="thumbnail">'+
                    '<img id="thumbnail9" src="http://placehold.it/800x500" alt="">'+
                    '<div class="caption">'+
                        '<p id="description9" style="overflow: hidden;">Loading...</p>'+
                        '<hr class="productHr">'+
                        '<p id="user-info9" style="margin:0;">'+
                        	'<span id="user-username9"></span>'+
                            '<span id="product-actions-9"></span>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+

        '</div>' +

    '</div>');
	
	$('#row1').find('*').show();
	$('#row2').find('*').show();
	$('#row3').find('*').show();
	$('#row1').show();
	$('#row2').show();
	$('#row3').show();
	$('#map-canvas2').remove();
	
	$('#container-item').remove();
	$('#tablas').remove();
	
	
	$('input[type="radio"]').click(function(){
	    if ($(this).is(':checked'))
	    {
	      var service_type = $(this).val();
	      service_controller_get_all_filtered('service_type',service_type);
	    }
	  });
	
	
	if (  (products.count / 9)  % 1 != 0)
	{
		number_pages = ((products.count / 9)).toFixed(0);
	}
	else
	{
		number_pages = ((products.count / 9));
	}
	if(number_pages > 1)
	{
		jQuery('#last').remove();
		for (var i = 1; i <= number_pages; i++ )
		{
			jQuery('#pagination' + i).remove();
			jQuery('.pagination').append('<li id="pagination' + i + '" ' +  (i == page_number?'class="active"':'') + '><a onclick="product_controller_get_all(' + i + ');refreshLanguage();" href="#">' + i +'</a></li>');
		}
		jQuery('.pagination').append('<li id="last"><a href="#">&raquo;</a></li>');
	}
	
	
	if (page_number==1)
	{
		jQuery('#first').addClass("disabled");
	}
	else
	{
		jQuery('#first').removeClass("disabled");
		jQuery('#first').click
		(
				function ()
				{
					product_controller_get_all(1);
				}
			
		);
	}
	
	if (page_number==number_pages)
	{
		jQuery('#last').addClass("disabled");
	}
	else
	{
		jQuery('#last').removeClass("disabled");
		jQuery('#last').click
		(
				function ()
				{
					product_controller_get_all(number_pages);
				}
		);
	}
	
	jQuery.each(products.products, 
			function (index, product)
			{
				jQuery('#product' + (index + 1)).show();
				jQuery('#description' + (index + 1)).html('<a href="#" onclick="' + (product.type == 'Service'?'service_controller_show_service(' + product.id + ');refreshLanguage();':'show_item_detail(' + product.id + ');refreshLanguage();') + '" >' + product.title  + '</a>');
				jQuery('#description' + (index + 1)).css("height"," 40px");
				
			    jQuery('#thumbnail' + (index + 1)).attr("src",product.image);
			    jQuery('#thumbnail' + (index + 1)).css("cursor","pointer");
			    jQuery('#thumbnail' + (index + 1)).click
			    (
			    		function (d)
			    		{
			    			(product.type == 'Service'?service_controller_show_service(product.id):show_item_detail(product.id)); 
			    		}
			    );
			    user = product.user;
			    id = user.split(":")[0];
			    username = user.split(":")[1];
			    jQuery('#user-username'+ (index + 1)).html('&nbsp;<a href="#" onclick="user_view_show_profile_data(' + id + ');refreshLanguage();">'+username+'</a>');
			    
			    var user_logged = user_controller_logged();
			    
			    if(user_logged != undefined){
			    jQuery('#product-actions-' + (index + 1)).html('&nbsp;&nbsp;<i title="Send a message to the user" style="cursor:pointer;color: #6666FF;" class="fa fa-envelope fa-2x" onclick="message_view_create_form_modal(' + id + ',\'[' + product.title + '] -\');refreshLanguage();"></i>'
			    		+ '&nbsp;&nbsp;<i id="join_up'  + (index + 1) + '" title="Join as exceptional service." style="cursor:pointer;color: #6666FF;" class="fa fa-exchange fa-2x" onclick="swap_with_money_service(' + product.id + ',\'' + product.typeService  +'\');refreshLanguage();"></i>'
			    		+ '&nbsp;&nbsp;<i title="Add to the shopping cart" id="add_item_shopping_cart'  + (index + 1) + '"  style="cursor:pointer;color: #6666FF;"  class="fa fa-shopping-cart  fa-2x"></i>');
				}else{
					jQuery('#product-actions-' + (index + 1)).html('&nbsp;&nbsp;<label id="no_message_swapping_'+(index + 1)+'">Sign up to view actions</label>');
				}
			    
			    jQuery('#product' + (index + 1) + ' .caption2 h4').html(product.title);
			    jQuery('#product' + (index + 1) +' #big_description' + (index + 1)).html(product.description + '<br>');
			    jQuery('#message'+ (index+1)).click(
			    		function()
			    		{

			    			message_view_create_form_modal(id,product.title);
			    		}
			    );
			    
			    if (product.type == 'Service')
			    {
			    	jQuery('#add_item_shopping_cart' +  (index + 1) ).css("display","none");
			    	$( "#swap"  + (index + 1) ).click(function() {
				    	  swapping_with_money_view_show_service_modal(product);
				    });
			    }
			    else
			    {
			    	jQuery('#join_up' +  (index + 1) ).css("display","none");
			    	jQuery('#add_item_shopping_cart' +  (index + 1) ).click(
			    			function()
			    			{
			    				shopping_cart_controller_add_item(product.id);
			    			});
			    	$( "#swap"  + (index + 1) ).click(function() {
				    	  swapping_with_money_view_show_item_modal(product);
				    });
			    }
			    
			    
			    
			}
	);
	
    var numero_productos = products.products.length;
    
    for (var numero_producto_sobrante = numero_productos+1; numero_producto_sobrante <= 9; numero_producto_sobrante++)
    {
    	jQuery('#product' + numero_producto_sobrante).remove();
    }
    
    jQuery('#content-body').show();
}


function product_view_show_all_products_wish(){
		body_clear();
	    var products = product_controller_list_wish();
	    //userapp = get_user_name();
	    jQuery('#figure_loading div').addClass('spinner');
		
		$('<div id="container-products">').appendTo('#content-body');
		$('<h2 id="my_list_wish" class="titleh2">My wish list</h2><br>').appendTo('#container-products');
		$('<form method="POST"  id="products" name="products"></form>').appendTo('#container-products');
		var tokenElement = jQuery(document.createElement('input'));
	    tokenElement.attr('type', 'hidden');
	    tokenElement.attr('name', 'csrfmiddlewaretoken');
	    var csrftoken = getCookie('csrftoken');
	    tokenElement.val( csrftoken );
	    jQuery("#products").append(tokenElement);
	    jQuery('<div id="tablas" name="tablas" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 table-responsive"></div>').appendTo('#content-body');
	    jQuery('<table name="table_products" id="table_products" class="table table-striped" >'+
				'<thead>'+
				'<tr>'+
				'<th id = "images_wish" class="span1">'+
					'Images'+
				'</th>'+
				'<th id = "description_wish" class="span3">'+
					'Description of transport'+
				'</th>'+
				
				'<th id = "category_wish" class="span2">'+
					'Category'+
				'</th>'+
				'<th id = "price_wish" class="span2">'+
					'Price'+
				'</th>'+
				'<th id = "owner_wish" class="span2">'+
					'Owner'+				
				'<th id = "actions_wish" class="span2">'+
					'Actions'+
				'</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody>').appendTo('#tablas');
	    
	    $.each(products.products_wish, function(index, product) {
	    	var urlfinal;
	    	if(product.image == null){
	    		urlfinal = "/static/images/default.jpg";
	    	}else{
	    		urlfinal = product.image;
	    	}
	    	user = product.user;
			id = user.split(":")[0];
			username = user.split(":")[1];
	    	if(product.type == 'Car'||product.type == 'Hour'|| product.type == 'Estate'){
	    	jQuery('		<tr>'+
	    					'<td class="span1">'+
	    						'<a href="#" title="Link to product page">'+
	    							'<img class="thumb" src="'+urlfinal+'" title="Product Image"/>'+
	    						'</a>'+
	    					'</td>'+
	    					'<td class="span3">'+
	    						'<a id="title" href="javascript: swap_with_money_service('+product.id+","+"'"+product.type+"'"+');" title="Link to product page">'+product.title+'</a>'+
	    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+product.description+'</div>'+
	    							
	    					'</td>'+
	    					'<td class="span2">'+ product.category+'</td>'+	
	    					'<td class="span2"> '+product.price+'<span></span><span class="currency">&euro;</span></td>'+
	    					'<td class="span2"><a href="#" onclick="user_view_show_profile_data(' + id + ');refreshLanguage();">'+username+'</a></td>'+	
	    					'<td class="span1" colspan="2">'+
		    					'<div class="col-lg-5"><a class="btn btn-danger btn-mini" rel="tooltip"  name="deletear-'+i+'" id="deletear-'+i+'" data-toggle="confirmation">'+
	    						'<i class="fa fa-trash-o"></i></a>'+
	    					'</div>'+
		    				//'</td>'+
		    				//'<td class="span1">'+
	    					'<div class="col-lg-5"><a class="btn btn-info btn-mini" rel="tooltip"  value="modify_item" rel="tooltip" data-placement="right" onclick="message_view_create_form_modal('+id+',\'[' + product.title + '] -\');refreshLanguage();">'+
    						'<i class="fa fa-envelope"></i></a>'+
    					'</div>'+
	    				'</td>'+
	    				'</tr>').appendTo('#table_products');
	    	}if(product.type == 'Item'){
	    		jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="Link to product page">'+
    							'<img class="thumb" src="'+urlfinal+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: swap_with_money_item('+product.id+","+"'"+product.type+"'"+');" title="Link to product page">'+product.title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+product.description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+ product.category+'</td>'+	
    					'<td class="span2"> '+product.price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span2"><a href="#" onclick="user_view_show_profile_data(' + id + ');refreshLanguage();">'+username+'</a></td>'+
    					'<td class="span1" colspan="2">'+
							/*'<button class="btn btn-danger btn-mini" type="submit" value="remove_item" rel="tooltip" data-placement="right" onclick="product_controller_remove_item_wish('+product.id+')">'+
	    						'<i class="fa fa-trash-o"></i>'+
	    					'</button> &nbsp; &nbsp;'+*/
	    					'<div class="col-lg-5"><a class="btn btn-danger btn-mini" rel="tooltip"  name="deletear-'+i+'" id="deletear-'+i+'" data-toggle="confirmation">'+
    						'<i class="fa fa-trash-o"></i></a>'+
    					'</div>'+
	    				//'</td>'+
	    				//'<td class="span1">'+
    					'<div class="col-lg-5"><a class="btn btn-info btn-mini" rel="tooltip"  value="modify_item" rel="tooltip" data-placement="right" onclick="message_view_create_form_modal('+id+',\'[' + product.title + '] -\');refreshLanguage();">'+
						'<i class="fa fa-envelope"></i></a>'+
					'</div>'+
    				'</td>'+
    				'</tr>').appendTo('#table_products');
	    		
	    	}
	    	$('#deletear-'+i+'').confirmation({
				placement: 'bottom', // How to position the confirmation - top | bottom | left | right
				trigger: 'click', // How confirmation is triggered - click | hover | focus | manual
				target : '_self', // Default target value if `data-target` attribute isn't present.
				href   : '#', // Default href value if `data-href` attribute isn't present.
				title: 'Are you sure?', // Default title value if `data-title` attribute isn't present
				template: '<div class="popover" style="top: 34px; left: -2.5px; display: block;width: 165px;">' +
				                '<div class="arrow"></div>' +
				                '<h3 class="popover-title"></h3>' +
				                '<div class="popover-content text-center">' +
				                '<div class="btn-group">' +
				                '<a class="btn btn-small" href="" target=""></a>' +
				                '<a class="btn btn-small" data-dismiss="confirmation"></a>' +
				                '</div>' +
				                '</div>' +
				                '</div>',
				btnOkClass:  'btn-primary', // Default btnOkClass value if `data-btnOkClass` attribute isn't present.
				btnCancelClass:  'btn btn-default', // Default btnCancelClass value if `data-btnCancelClass` attribute isn't present.
				btnOkLabel: '<i class="fa fa-check"></i> Yes', // Default btnOkLabel value if `data-btnOkLabel` attribute isn't present.
				btnCancelLabel: '<i class="fa fa-times"></i> No', // Default btnCancelLabel value if `data-btnCancelLabel` attribute isn't present.
				singleton: false, // Set true to allow only one confirmation to show at a time.
				popout: false, // Set true to hide the confirmation when user clicks outside of it.
				onConfirm: function()
				{
					product_controller_remove_item_wish(product.id);
				}, // Set event when click at confirm button
				onCancel: function(){}// Set event when click at cancel button
				}) ;
	    });
	    
	    jQuery('#table_products').append('</tbody></table>');
	    jQuery('#figure_loading div').removeClass('spinner');	
	
}
