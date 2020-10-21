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
        		'<button onclick="swapping_with_money_controller_payment();" class="btn btn-success pull-right" type="submit" value="Checkout" name="cont_to_checkout2">'+
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
		              '<th colspan="2">Swap ' + value.uuid + '</th>'+
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
		          '<div class="container" style="width:60%;margin-right:10px;">'+
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
	var myLatlng = new google.maps.LatLng(service.venue.latitude,service.venue.longitude);
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