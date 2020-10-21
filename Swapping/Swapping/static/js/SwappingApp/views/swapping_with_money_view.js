/**
 * Created on 09/04/2014
 * Author David
 * swapping_with_money_view.js
 * Swapping
 */

function swapping_with_money_view_show_wizard(total)
{
	body_clear();
	var direcciones = user_controller_get_address();
	jQuery('#content-body').html('<div class="table-responsive"><form>'+
			
	    	'<div class="row">'+
	    		'<div class="col-xs-4">'+
	    			'<div class="input-group">'+
	    				' <span class="input-group-addon">'+
           					'<input type="radio" name="address">'+
           				' </span>'+
           				'<span style="width:100px;" class="input-group-addon " >Avda Virgen de la Esperanza 4 2º Derecha</span>'+
           			'</div>' +
           		'</div>'+
           	'</div>' +
           	
	        '<div class="row">'+
	        	'<div class="col-xs-4">'+
	        		'<a href="#myModal1" role="button" class="btn btn-info btn-sm" data-toggle="modal"> <i class="fa fa-plus"></i></a>' +
	        	'</div>' +
	        '</div>' +
	        '<div class="row">'+
	        '</div>' +
        
		   
	    '<div class="row">'+ 
	    	' <label class="control-label col-xs-3" for="firstName">Shipment Company:</label>' +
	    '</div>'+
	    '<div class="col-xs-4">'+
	    	'<div class="row">'+
	    		
		    		'<div class="input-group">'+
		    			' <span class="input-group-addon">'+
	           				'<input type="radio" name="shipment_company">'+
	           			' </span>'+
	           			'<span style="width:100px;" class="input-group-addon " >Tourline Express  &nbsp;&nbsp;&nbsp;&nbsp;    8.75 &euro;</span>'+
	           		'</div>' +
           '</div>'+
           '<div class="row">'+
           		'<div class="input-group">'+
	           		' <span class="input-group-addon">'+
	           			'<input type="radio" name="shipment_company">'+
	           		' </span>'+
	           		'<span style="width:100px;" class="input-group-addon " >Seur  &nbsp;&nbsp;&nbsp;&nbsp;    6.50 &euro;</span>'+
	           		
	           		
	           	'</div>'+
           	'</div>'+
           	'<div class="row">'+
           		'<div class="input-group">'+
	           		'<span class="input-group-addon">'+
	           			'<input type="radio"  " name="shipment_company">'+
	           		' </span>'+
	           		'<span style="width:100px;" class="input-group-addon " >MRW  &nbsp;&nbsp;&nbsp;&nbsp;   <span> 3.25 &euro;</span></span>'+
	           	'</div>'+
 			'</div>'+
 			'</div>'+
 			
        ' </div>'+
        '<div class="row">'+
        '</div>' +
        '<div class="row" style="margin-top:20px;margin-left:0.5px;margin-right:2px;">' +
	    	
			'<input type="text" class="form-control">'+
			'<span class="help-block">Insert here a comment for the shipment company if you want.</span>'+
		'</div>' +
		 '<div class="row">'+
	        '<div class="col-xs-4">'+
	            '<div class="input-group">'+
	               
	                '<input type="text" class="form-control" disabled="disabled" placeholder="Total">'+
	                '<span class="input-group-addon" disabled="disabled">' + total + '</span>'+
	                '<span class="input-group-addon" disabled="disabled">&euro;</span>'+
	            '</div>'+
	        '</div>'+
	        '<div class="col-xs-4">'+
	        	'<button class="btn btn-danger pull-right" type="submit" name="remove_all2" value="remove_all" rel="tooltip" data-placement="top" data-original-title="Be careful! All products will be entirely removed from the basket!">'+
						'<i class="fa fa-times"></i>'+
						'   Remove All'+
				'</button>'+
	        '</div>'+
	        '<div class="col-xs-4">'+
        		'<button onclick="swapping_with_money_controller_payment();refreshLanguage();" class="btn btn-success pull-right" type="submit" value="Checkout" name="cont_to_checkout2">'+
        			'Continue To Checkout   '+
        			'<i class="fa fa-hand-o-right"></i>'+
        		'</button>'+
        '</div>'+
	    '</div>'+
	'</form></div>'+
	//Modal Start
	'<!-- Modal1 -->'+
	  
	  '<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	    '<div class="modal-header">'+
	      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
	      '<h3 id="myModalLabel">Edit Introduction</h3>'+
	    '</div>'+
	  
	    '<div class="modal-body">'+
	  
	      'v<form id="InfroText" method="POST">'+
	  
	      '<input type="hidden" name="InfroText" value="1">'+
	  
	      '<table>'+
	        '<tbody><tr><td>Title</td><td><input type="text" name="title" id="title" style="width:300px"><span class="hide help-inline">This is required</span></td></tr>'+
	        '<tr><td>Introudction</td><td><textarea name="contect" style="width:300px;height:100px"></textarea></td></tr>'+
	      '</tbody></table>'+
	      '</form>'+
	    '</div>'+
	    '<div class="modal-footer">'+
	      '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
	      '<button class="btn btn-primary" data-dismiss="modal" id="InfroTextSubmit">Save changes</button>'+
	    '</div>'+
	'</div>');
			

	
}
function swapping_with_money_view_show_all(user_id)
{
	body_clear();
	swapping_with_money_controller_get_all(1,user_id);
}
function swapping_with_money_view_show_all_swapping(array_swapping)
{
	jQuery.each(array_swapping.results, function( index, value ) 
	{
		jQuery('#content-body').append('<table id="example-paper" class="table table-paper table-striped">'+
		          '<thead>'+
		            '<tr>'+
		              '<th colspan="2" style="cursor:pointer;"><span onclick="swapping_without_money_controller_get_swap('+value.id+');refreshLanguage();">Swap ' + value.uuid + '</span></th>'+
		            '</tr>'+
		          '</thead>'+
		          '<tbody>'+
		            '<tr>'+
		              '<td>Features</td>'+
		              '<td>'+
		              		'<table class="table table-condensed" style="margin-bottom:0;">'+
		              			'<tbody>'+
		              				'<tr class="success" >'+
		              					'<th style="border-right:none;">Date</th>'+
		              					'<td>' + value.date + '</td>' +
		              					'<th>Total</th>'+
		              					'<td>' + value.total + ' &euro;</td>' +
		              					'<th>Shipping Company</th>'+
		              					'<td>' + value.shipping_company + '</td>' +
		              				'</tr>'+
		              				'<tr class="success" >'+
		              					'<th style="border-right:none;">Comments</th>'+
		              					'<td colspan="5">' + value.comments + '</td>' +
		              				'</tr>'+
		              			'</tbody>' +
		              		'</table>' +
		              '</td>'+
		            '</tr>'+
		          '</tbody>'+
		        '</table>');
	}
	);
	
	
}

function swapping_with_money_view_show_service_modal(service)
{
	$('<div id="swap-service-modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
		    '<div class="modal-dialog modal-lg">'+
		      '<div class="modal-content">'+
		      	''+
		        '<div class="modal-header">'+
		          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
		          '<h4 class="modal-title" id="myLargeModalLabel">' + service.title + '</h4>'+
		        '</div>'+
		        '<div class="modal-body" style="height:500px;display:inline-flex;">'+
		          '<div class="container" style="width:60%;height:30px;margin-right:10px;">'+
					        '<ul id="img-container" class="row">'+
					     '</ul>'+
					'</div>'+
		          '<div class="col-xs-6">'+
		          		'<div  class="google-map-canvas pull-right" id="map-canvas">-'+
		          		'</div>'+
		          	'</div>'+
		      '</div><!-- /.modal-content -->'+
		    '</div><!-- /.modal-dialog -->'+
		  '</div>').appendTo('#content-body');
	
	var photos =service_controller_get_photo(service.id, true);
	$('#img-container').find('*').remove();
		
		
	jQuery.each(photos.urls,
			function(index,url)
			{
				
				$('#img-container').append('<li class="col-lg-6 col-md-6 col-sm-7 col-xs-8">'+
				'<a href="' + url + '" data-gallery><img class="img-thumbnail" src="' + url + '" /></a></li>');
			}
	);
	
	
	
	$("#map-canvas").width($(window).width()/4 + "px").height($(window).width()/5 + "px");
	/*var myLatlng = new google.maps.LatLng(service.venue.latitude,service.venue.longitude);
	var myOptions = 
	  { 
	    center: myLatlng, 
	    zoom: 12, 
	    mapTypeId: google.maps.MapTypeId.ROADMAP ,
	    navigationControl: true,
	    scrollwheel: true,
	    streetViewControl: true,
	    mapTypeControl: true
	  };

	  // Instead of a function scoped map variable this should be global
	  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	  google.maps.event.addListener(map, "idle", function()
			  {
				google.maps.event.trigger(map, 'resize'); 
		});	
	  
	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: 'Hello World!'
	  });

	this.map.setZoom( this.map.getZoom() - 1);
	this.map.setZoom( this.map.getZoom() + 1);
	
	
	$('#swap-service-modal').modal();
	
	$('.modal').on('shown', function () {
		  google.maps.event.trigger(map, 'resize');

		  // also redefine center
		  map.setCenter(myLatlng);
		});
	*/
	$('#swap-service-modal').modal();
	$('#content-body').append(''+
			'<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->'+
'<div id="blueimp-gallery" class="blueimp-gallery">'+
    '<!-- The container for the modal slides -->'+
    '<div class="slides"></div>'+
    '<!-- Controls for the borderless lightbox -->'+
    '<h3 class="title">' + service.title + '</h3>'+
    '<a style="border:none;" class="prev"><i class="fa fa-arrow-left"></i></i></a>'+
    '<a style="border:none;" class="next"><i class="fa fa-arrow-right"></i></i></a>'+
    '<a class="close">x</a>'+
    '<a class="play-pause"></a>'+
    '<ol class="indicator"></ol>'+
    '<!-- The modal dialog, which will be used to wrap the lightbox content -->'+
    '<div class="modal fade">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" aria-hidden="true">x</button>'+
                    '<h4 class="modal-title"></h4>'+
                '</div>'+
                '<div class="modal-body next"></div>'+
                '<div class="modal-footer">'+
                    '<button type="button" class="btn btn-default pull-left prev">'+
                        '<i class="fa fa-long-arrow-left"></i>'+
                        'Previous'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary next">'+
                        'Next'+
                        '<i class="fa fa-long-arrow-right"></i>'+
                    '</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>');

	  
	  
}

function swapping_with_money_view_show_item_modal(item)
{
	$('<div id="swap-service-modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
		    '<div class="modal-dialog modal-lg">'+
		      '<div class="modal-content">'+
		      	''+
		        '<div class="modal-header">'+
		          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>'+
		          '<h4 class="modal-title" id="myLargeModalLabel">' + item.title + '</h4>'+
		        '</div>'+
		        '<div class="modal-body" style="height:500px;display:inline-flex;">'+
		          '<div class="container" style="width:60%;height:30px;margin-right:10px;">'+
					        '<ul id="img-container" class="row">'+
					     '</ul>'+
					'</div>'+
		          '<div class="col-xs-6">'+
		          		'<div  class="google-map-canvas pull-right" id="map-canvas">-'+
		          		'</div>'+
		          	'</div>'+
		      '</div><!-- /.modal-content -->'+
		    '</div><!-- /.modal-dialog -->'+
		  '</div>').appendTo('#content-body');
	
	var photos =service_controller_get_photo(item.id, true);
	$('#img-container').find('*').remove();
		
		
	jQuery.each(photos.urls,
			function(index,url)
			{
				
				$('#img-container').append('<li class="col-lg-6 col-md-6 col-sm-7 col-xs-8">'+
				'<a href="' + url + '" data-gallery><img class="img-thumbnail" src="' + url + '" /></a></li>');
			}
	);
	
	
	
	$("#map-canvas").width($(window).width()/4 + "px").height($(window).width()/5 + "px");
	/*var myLatlng = new google.maps.LatLng(service.venue.latitude,service.venue.longitude);
	var myOptions = 
	  { 
	    center: myLatlng, 
	    zoom: 12, 
	    mapTypeId: google.maps.MapTypeId.ROADMAP ,
	    navigationControl: true,
	    scrollwheel: true,
	    streetViewControl: true,
	    mapTypeControl: true
	  };

	  // Instead of a function scoped map variable this should be global
	  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	  google.maps.event.addListener(map, "idle", function()
			  {
				google.maps.event.trigger(map, 'resize'); 
		});	
	  
	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: 'Hello World!'
	  });

	this.map.setZoom( this.map.getZoom() - 1);
	this.map.setZoom( this.map.getZoom() + 1);
	
	
	$('#swap-service-modal').modal();
	
	$('.modal').on('shown', function () {
		  google.maps.event.trigger(map, 'resize');

		  // also redefine center
		  map.setCenter(myLatlng);
		});
	*/
	$('#swap-service-modal').modal();
	$('#content-body').append(''+
			'<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->'+
'<div id="blueimp-gallery" class="blueimp-gallery">'+
    '<!-- The container for the modal slides -->'+
    '<div class="slides"></div>'+
    '<!-- Controls for the borderless lightbox -->'+
    '<h3 class="title">' + item.title + '</h3>'+
    '<a style="border:none;" class="prev"><i class="fa fa-arrow-left"></i></i></a>'+
    '<a style="border:none;" class="next"><i class="fa fa-arrow-right"></i></i></a>'+
    '<a class="close">x</a>'+
    '<a class="play-pause"></a>'+
    '<ol class="indicator"></ol>'+
    '<!-- The modal dialog, which will be used to wrap the lightbox content -->'+
    '<div class="modal fade">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" aria-hidden="true">x</button>'+
                    '<h4 class="modal-title"></h4>'+
                '</div>'+
                '<div class="modal-body next"></div>'+
                '<div class="modal-footer">'+
                    '<button type="button" class="btn btn-default pull-left prev">'+
                        '<i class="fa fa-long-arrow-left"></i>'+
                        'Previous'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary next">'+
                        'Next'+
                        '<i class="fa fa-long-arrow-right"></i>'+
                    '</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>');

	  
	  
}

function swapping_with_money_view_show_swap(swap)
{
	body_clear();
	var swap_photos = swapping_with_money_controller_get_images(swap.id);
	jQuery('#content-body').append('<table id="example_paper_' + swap.id + '" class="table table-paper table-striped">'+
	          '<thead>'+
	            '<tr>'+
	              '<th colspan="2" ><span>Swap ' + swap.uuid + '</span></th>'+
	            '</tr>'+
	          '</thead>'+
	          '<tbody>'+
	            '<tr>'+
	              '<td>Features</td>'+
	              '<td>'+
	              		'<table class="table table-condensed" style="margin-bottom:0;">'+
	              			'<tbody>'+
	              				'<tr class="success" >'+
	              					'<th style="border-right:none;">Date</th>'+
	              					'<td>' + swap.date + '</td>' +
	              					'<th>Total</th>'+
	              					'<td>' + swap.total + ' &euro;</td>' +
	              					'<th>Shipping Company</th>'+
	              					'<td>' + swap.shipping_company + '</td>' +
	              				'</tr>'+
	              				'<tr class="success" >'+
	              					'<th style="border-right:none;">Comments</th>'+
	              					'<td colspan="5">' + swap.comments + '</td>' +
	              				'</tr>'+
	              			'</tbody>' +
	              		'</table>' +
	              '</td>'+
	            '</tr>'+
	            '<tr>' +
	            	'<td>Path</td>'+
	            	'<td>'+
				            '<div  class="google-map-canvas" id="map-canvas1">-'+
			          		'</div>'+
		          	'</td>'+
	            '</tr>'+
	            '<tr>' +
	            	'<td>Product images</td>'+
	            	'<td>'+
			            '<div class="" id="swap-photos-' + swap.id + '">'+
			            	'<ul style="list-style: none;" id="img-container" class="row">'+
		          		'</div>'+
		          	'</td>'+
            '</tr>'+
	          '</tbody>'+
	        '</table>');
	
	
	$("#map-canvas1").width("100%").height($(window).width()/5 + "px");
	var myLatlng;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': swap.pick_up_location.street_type + swap.pick_up_location.street + ","
		+ swap.pick_up_location.number +  " , " + swap.pick_up_location.zip_code + ", " + 
		swap.pick_up_location.city
		}, 
			function(results, status)
			{ 
				myLatlng = new google.maps.LatLng(results[0].geometry.location.k,results[0].geometry.location.A);
				var myOptions = 
				  { 
				    center: myLatlng, 
				    zoom: 12, 
				    mapTypeId: google.maps.MapTypeId.ROADMAP ,
				    navigationControl: true,
				    scrollwheel: true,
				    streetViewControl: true,
				    mapTypeControl: true
				  };

				  // Instead of a function scoped map variable this should be global
				  map = new google.maps.Map(document.getElementById("map-canvas1"), myOptions);
				  google.maps.event.addListener(map, "idle", function()
						  {
							google.maps.event.trigger(map, 'resize'); 
					});	
				  
				  

				this.map.setZoom( this.map.getZoom() - 1);
				this.map.setZoom( this.map.getZoom() + 1);
				google.maps.event.trigger(map, 'resize');

				  // also redefine center
				  map.setCenter(myLatlng);
				  
				  geocoder.geocode( { 'address': swap.destination.street_type + swap.destination.street + ","
						+ swap.destination.number +  " , " + swap.destination.zip_code + ", " + 
						swap.destination.city
						}, 
							function(results, status)
							{ 
								var myLatlng2 = new google.maps.LatLng(results[0].geometry.location.k,results[0].geometry.location.A);
								

								  // Instead of a function scoped map variable this should be global
								  google.maps.event.addListener(map, "idle", function()
										  {
											google.maps.event.trigger(map, 'resize'); 
									});	
								  
								  
								  directionsDisplay = new google.maps.DirectionsRenderer();
								  var directionsService = new google.maps.DirectionsService();
								  var request = {
									      origin: myLatlng,
									      destination: myLatlng2,
									      waypoints: [],
									      optimizeWaypoints: true,
									      travelMode: google.maps.TravelMode.DRIVING
									  };
									  directionsService.route(request, function(response, status) {
									    if (status == google.maps.DirectionsStatus.OK) {
									      directionsDisplay.setDirections(response);
									      var route = response.routes[0];
									      // For each route, display summary information.
									      
									    }
									  });
									  
									  directionsDisplay.setMap(map);
								this.map.setZoom( this.map.getZoom() - 1);
								this.map.setZoom( this.map.getZoom() + 1);
								google.maps.event.trigger(map, 'resize');

								  // also redefine center
								  map.setCenter(myLatlng);
							});
				  
			});
	
	

		
	
	
	
	
}

function swapping_with_money_view_show_swap_photos(photo_urls,id_swap)
{
	console.log(photo_urls);
	jQuery.each(photo_urls.urls,
			function(index,url)
			{
				alert(index);
				jQuery('#swap-photos-' + id_swap + ' ul').append('<li class="col-lg-2 col-md-2 col-sm-7 col-xs-8">'+
				'<a href="' + url + '" data-gallery><img class="img-thumbnail" src="' + url + '" /></a></li>');
			}
	);
	
	
	$('#content-body').append(''+
			'<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->'+
'<div id="blueimp-gallery" class="blueimp-gallery">'+
    '<!-- The container for the modal slides -->'+
    '<div class="slides"></div>'+
    '<!-- Controls for the borderless lightbox -->'+
    '<h3 class="title">Swap</h3>'+
    '<a style="border:none;" class="prev"><i class="fa fa-arrow-left"></i></i></a>'+
    '<a style="border:none;" class="next"><i class="fa fa-arrow-right"></i></i></a>'+
    '<a class="close">x</a>'+
    '<a class="play-pause"></a>'+
    '<ol class="indicator"></ol>'+
    '<!-- The modal dialog, which will be used to wrap the lightbox content -->'+
    '<div class="modal fade">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" aria-hidden="true">x</button>'+
                    '<h4 class="modal-title"></h4>'+
                '</div>'+
                '<div class="modal-body next"></div>'+
                '<div class="modal-footer">'+
                    '<button type="button" class="btn btn-default pull-left prev">'+
                        '<i class="fa fa-long-arrow-left"></i>'+
                        'Previous'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary next">'+
                        'Next'+
                        '<i class="fa fa-long-arrow-right"></i>'+
                    '</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>');
}


function swap_with_money_service(id_service,type)
{
	var service = null;
	switch (type)
    {
	    case "Car" :
	    			service = service_controller_get_service_car(id_service);
		    break;
		case "Hour" :
					service = service_controller_get_service_hour(id_service);
			break;
				    
		case "Estate" :
					service = service_controller_get_service_estate(id_service);
		    break;
		
    }
	
	
	body_clear();
	
	if (service == undefined)
	{
		display_error_notification('Error', 'An error has occurred, please try again later please', 'fa fa-times');
		return;
	}
    
	jQuery('<div class="col-md-5 col-sm-12  portfolio-item" id="container_image" >').appendTo('#content-body');
	jQuery('<div class="col-md-7 col-sm-12 form-group" id="container_description" >').appendTo('#content-body');
	jQuery('<div class="thumbnail" style="margin-left: -15px;">'+
	        '<div id="carousel-service-image" class="carousel slide" data-ride="carousel">'+
	          '<ol style="bottom:10px;" id="indicators" class="carousel-indicators"></ol>'+
	          '<div id= "inner" class="carousel-inner"></div>'+ 
	          '<a class="carousel-control" href="#carousel-service-image" data-slide="prev">'+
	            '<span class="glyphicon glyphicon-chevron-left"></span>'+
	          '</a>'+
	          '<a class="carousel-control" href="#carousel-service-image" data-slide="next" style="right: 0; left: auto;">'+
	            '<span class="glyphicon glyphicon-chevron-right"></span>'+
	          '</a>'+
	        '</div>'+
	    '</div>').appendTo('#container_image');
	
	var photoURL = service_controller_get_photo(service.id, true);
	var str = photoURL.urls;
	var miArray = eval(str);
	for(var i=0;i<miArray.length;i++)
	{
		if (i == 0)
		{
			$('<li data-target="#carousel-service-image" data-slide-to="'+i+'" class="active"></li>').appendTo("#indicators");
	        $('<div class="item active thumbnail" style="height:96%;text-align:center;border: 0px;"><img class="img-responsive" style="height:100%" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}
		else
		{
			$('<li style="bottom: 0px;" data-target="#carousel-service-image" data-slide-to="'+i+'"></li>').appendTo("#indicators");
			$('<div class="item thumbnail" style="height:96%;text-align:center;border: 0px;"><img class="img-responsive" style="height:100%" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}
	}
	if (photoURL.urls.length == 0)
	{
		$('<li data-target="#carousel-service-image" data-slide-to="0" class="active"></li>').appendTo("#indicators");
        $('<div class="item active" style="height:96%;text-align:center;"><img style="height:100%;width:100%" src="/static/images/default.jpg" alt=""></div>').appendTo("#inner");
	}


	
	var location = service.venue;
	$('<div class="form-group col-sm-12 col-xs-12" id="row_owner"  /></div>').appendTo('#container_description');	
	jQuery("<span style=\"height: 30px;padding-top: 1%;\" class='col-sm-3 col-xs-3 control-label'><b id='service_owner'>Owner:</b></span>").appendTo('#row_owner');
	jQuery("<span class='col-sm-9 col-xs-9 control-label'><a style=\"cursor:pointer;\" onclick=\"user_view_show_profile_data(" + service.user.id + ");refreshLanguage();\" >"  + service.user.username + "</a><img style=\"margin-left:20px;\" src=\"" + (service.user.photo.length==0?'static/images/default.jpg':'/uploaded/photos/'+service.user.photo) + "\" class=\"img-resposive img-circle\" /></span>").appendTo('#row_owner');
	$('<div class="form-group col-sm-12 col-xs-12" id="row_1"/></div>').appendTo('#container_description');	
	jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_title'>Title:</b></span>").appendTo('#row_1');
	jQuery("<span class='col-sm-9 col-xs-9 control-label'>" + service.title + "</span>").appendTo('#row_1');

	$('<div class="form-group col-sm-12 col-xs-12" id="row_2"/></div>').appendTo('#container_description');	
	jQuery("<span  class='col-sm-3 col-xs-3 control-label'><b id='service_description'>Description:</b></span>").appendTo('#row_2');
	jQuery("<span  class='col-sm-9 col-xs-9 control-label'>"+ service.description + "</span>").appendTo('#row_2');

	
	$('<div class="form-group col-sm-12 col-xs-12" id="row_3"/></div>').appendTo('#container_description');	
	jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_places'>Places:</b></span>").appendTo('#row_3');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + service.available_places + "</span>").appendTo('#row_3');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_swapping'>Swapping:</b></span>").appendTo('#row_3');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + (service.enable_swapping?'Yes':'No') + "</span>").appendTo('#row_3');
	
	$('<div class="form-group col-sm-12 col-xs-12" id="row_4" /></div>').appendTo('#container_description');	
	jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_category'>Category:</b></span>").appendTo('#row_4');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + service.category + "</span>").appendTo('#row_4');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_price'>Price:</b></span>").appendTo('#row_4');
	jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + (service.price) + " &euro;</span>").appendTo('#row_4');
	
	
	if(service.destination != undefined)
	{
		var dlocation = service.destination;
		$('<div class="form-group col-sm-12 col-xs-12" id="row_5" /></div>').appendTo('#container_description');	
		jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_conversation'>Conversation:</b></span>").appendTo('#row_5');
		jQuery("<span id='conversation' class='col-sm-3 col-xs-3 control-label'></span>").appendTo('#row_5');
		
		switch (service.conversation)
        {
	        case "LOW_LEVEL" :
		        				jQuery('#conversation').html('<i class="fa fa-comment-o"></i>');
		        break;
	        case "MEDIUM_LEVEL" :
								jQuery('#conversation').html('<i class="fa fa-comments-o"></i>');
				break;
	        case "HIGH_LEVEL" :
								jQuery('#conversation').html('<i class="fa fa-comments-o"></i><i class="fa fa-comments-o"></i>');
				break;
	        
	        default :
		        break;
        }
		

		jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_pets'>Pets:</b></span>").appendTo('#row_5');
		jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + (service.pets?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_5');
		
		$('<div class="form-group col-md-12 col-xs-12" style="margin-bottom: 15px;" id="row_6" /></div>').appendTo('#container_description');	
		jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_baggage'>Baggage:</b></span>").appendTo('#row_6');
		jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + (service.baggage?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_6');	
		jQuery("<span class='col-sm-3 col-xs-3 control-label'><b id='service_smoker'>Smoker: </b></span>").appendTo('#row_6');
		jQuery("<span class='col-sm-3 col-xs-3 control-label'>" + (service.smoker?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_6');
	    
		
		
	}
	if(service.day_of_week != undefined)
	{
		var day = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_10" /></div>').appendTo('#container_description');	
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b id='service_day_of_week'>Day of week: </b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + day[service.day_of_week] + "</span>").appendTo('#row_10');	
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b id='service_duration'>Duration(hours): </b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + service.duration + " </span>").appendTo('#row_10');

		
		
	}
	if(service.beginning != undefined){
		
		$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_10" /></div>').appendTo('#container_description');	
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b id='service_beginning'>Beginning: </b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + service.beginning + "</span>").appendTo('#row_10');	
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b id='service_ending'>Ending: </b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + service.ending + "</span>").appendTo('#row_10');
		
	}
	
jQuery('<div id="button-cointainer" style="margin-bottom: 15px;" class="row col-md-12 col-lg-12 col-xs-12 col-sm-12"></div>').appendTo('#container_description');
	/*
	jQuery('<a onclick="swap_without_money_controller_join_to_service(' + service.id + ');" class="btn btn-default btn-sm pull-right" href="#">'+
			'<i class="fa fa-money"></i> Joining paying the owner.</a>').appendTo('#button-cointainer');
	
	jQuery('<a onclick="swap_without_money_controller_join_to_service_with_paypal(' + service.id + ');" class="btn btn-default btn-sm pull-right" href="#">'+
	'<i class="fa fa-credit-card"></i> Joining paying with PayPal.</a>').appendTo('#button-cointainer');
	
	jQuery('<a onclick="swap_without_money_controller_join_to_service_with_credits(' + service.id + ');" class="btn btn-default btn-sm pull-right" href="#">'+
	'<i class="fa fa-ticket"></i> Joining paying with credits.</a>').appendTo('#button-cointainer');
	*/
	jQuery('#button-cointainer').append('<div class="btn-group navbar-btn navbar-right col-sm-6 col-xs-6 col-md-6 col-lg-6 pull-right" style="margin-top: 0px;margin-bottom: 0px;">'+
			  '<a id="service_join" class="btn btn-default" href="#" data-toggle="dropdown"><i class="fa fa-exchange fa-fw"></i>&nbsp;Join</a>'+
			  '<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#">'+
			   ' <span class="fa fa-caret-down"></span></a>'+
			  '<ul class="dropdown-menu" style="right: auto;">'+
			    '<li><a id="pay_hand" href="#" onclick="swap_without_money_controller_join_to_service(' + service.id + ');refreshLanguage();"><i class="fa fa-money fa-fw"></i>  Pay in hand</a></li>'+
			     
			 	'<li class="divider"></li>'+
			    '<li><a href="#" onclick="swap_without_money_controller_join_to_service_with_paypal(' + service.id + ');refreshLanguage();"><i class="fa fa-credit-card"></i> PayPal</a></li>'+
			    '<li class="divider"></li>'+
			    '<li><a id="pay_credits" href="#" onclick="show_all_message(5);refreshLanguage();"><i class="fa fa-ticket"></i> Pay with credits</a></li>'+

			
			
			  '</ul>'+
			'</div>');
	
	jQuery('<a id="send_message" onclick="message_view_create_form_modal(' + service.user.id + ',\'[' + service.title + '] - \');refreshLanguage();" class="btn btn-default  col-sm-3 col-xs-3 col-md-5 col-lg-6  col-lg-offset-0 col-md-offset-1 col-sm-offset-3 col-xs-offset-3" href="#">'+
	'<i class="fa fa-envelope"></i> Send message</a>').appendTo('#button-cointainer');
	
	
$('<div style="border: 3px solid silver;border-radius: 11px;" class="google-map-canvas col-lg-12 col-sm-12 col-xs-12" id="map-canvas2">-</div>').appendTo('#content-body');
	
	
	$("#map-canvas2").width("65%").height($(window).width()/4 + "px");
	$("#map-canvas2").css("margin-bottom","2em");
	console.log(service);
	var myLatlng = new google.maps.LatLng(service.venue.latitude,service.venue.longitude);
	if ( service.destination != undefined )
		var myLatlng2 = new google.maps.LatLng(service.destination.latitude,service.destination.longitude);
				
	var myOptions = 
		{ 
			center: myLatlng, 
			zoom: 12, 
			mapTypeId: google.maps.MapTypeId.ROADMAP ,
			navigationControl: true,
			scrollwheel: true,
			streetViewControl: true,
			mapTypeControl: true
		};

				  // Instead of a function scoped map variable this should be global
				  map = new google.maps.Map(document.getElementById("map-canvas2"), myOptions);
				  google.maps.event.addListener(map, "idle", function()
						  {
							google.maps.event.trigger(map, 'resize'); 
					});	
				  
				  

				this.map.setZoom( this.map.getZoom() - 1);
				this.map.setZoom( this.map.getZoom() + 1);
				google.maps.event.trigger(map, 'resize');

				if ( service.destination != undefined )
				{
					var directionsDisplay = new google.maps.DirectionsRenderer();
					  var directionsService = new google.maps.DirectionsService();
					  var request = {
						      origin: myLatlng,
						      destination: myLatlng2,
						      waypoints: [],
						      optimizeWaypoints: true,
						      travelMode: google.maps.TravelMode.DRIVING
						  };
						  directionsService.route(request, function(response, status) {
						    if (status == google.maps.DirectionsStatus.OK) {
						      directionsDisplay.setDirections(response);
						      var route = response.routes[0];
						      // For each route, display summary information.
						      
						    }
						  });
						  directionsDisplay.setMap(map);
				}
				else
				{
					// To add the marker to the map, use the 'map' property
					var marker = new google.maps.Marker({
					    position: myLatlng,
					    map: map,
					    title:"Hello World!"
					});
				}
				
					  
					  
				this.map.setZoom( this.map.getZoom() - 1);
				this.map.setZoom( this.map.getZoom() + 1);
				google.maps.event.trigger(map, 'resize');
				
				  // also redefine center
				  map.setCenter(myLatlng);
	
				  
	
	
	
	
}



