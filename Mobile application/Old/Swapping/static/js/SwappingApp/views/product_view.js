/**
 * Created on 06/04/2014
 * Author David
 * product_view.js
 * Swapping
 */
function product_view_show_premium_products(products)
{

	$('#carousel-example-generic .carousel').carousel({interval:false});
	$('#carousel-example-generic .carousel-inner').append('<div class="item active"><img style="width:100%;"  data-src="holder.js/900x500/auto/#555:#5555" src="static/images/Put_Your_AD_Here.jpg" alt="900x500"><div class="carousel-caption" style="display:inline-flex; margin-bottom:-50px;"><p>Premium!</p></div></div>');
	$('#carousel-example-generic .carousel-indicators li').removeClass('active');
	
	$('#carousel-example-generic .carousel-inner').append('<div class="item"><img style="width:100%;" data-src="holder.js/900x500/auto/#555:#5555" src="static/images/Put_Your_AD_Here - copia.jpg" alt="900x500"><div class="carousel-caption" style="display:inline-flex;margin-bottom:-50px;" ><p>Swap!</p></div></div>');
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
	jQuery('.col-md-3').append('<div id="trends" class="well"></div>');
	jQuery.each(
				tags_list , function(index,tag)
				{
					jQuery('#trends').append('<button style="margin:6px;" type="button" class="btn btn-info">' + tag + '</button>');
				});
}

