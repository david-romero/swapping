/**
 * Created on 24/05/2014
 * Author David
 * swapping_without_money_view.js
 * Swapping
 */

function swapping_without_money_view_show_all_swapping(array_swapping,page,id_usuario)
{
	body_clear();
	jQuery.each(array_swapping.results, function( index, value ) 
	{
		jQuery('#content-body').append('<table id="example-paper" class="table table-paper table-striped">'+
		          '<thead>'+
		            '<tr>'+
		              '<th colspan="2" style="cursor:pointer;"><span onclick="swapping_without_money_controller_get_swap('+value.id+');refreshLanguage();">Swap ' + value.id + '</span></th>'+
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
	console.log(array_swapping);
	var number_pages = (array_swapping.count / 5) + 1;
	number_pages = number_pages.toFixed(0);
	jQuery('#content-body').append
	(
			'<div style="text-align: center;" class="col-lg-12 col-md-12 col-sm-12">'+
			'<ul id="paginator" class="pagination">'+
				'<li ' + (page==1?'class="disabled"':'onclick="swapping_without_money_controller_get_all(1,' + id_usuario + ');refreshLanguage();"') + ' ><a href="#">&laquo;</a></li>'+
				
			'</ul></div>'
	);
	for (var i = 1; i <= number_pages; i++)
	{
		jQuery('#paginator').append(
		
		  '<li ' + (page==i?'class="active"':'') + ' onclick="swapping_without_money_controller_get_all(' + i + ',' + id_usuario + ');refreshLanguage();" ><a href="#">' + i + '<span class="sr-only">(current)</span></a></li>'
		);
	}
	jQuery('#paginator').append('<li ' + (page==number_pages?'class="disabled"':'onclick="swapping_without_money_controller_get_all(' + number_pages + ',' + id_usuario + ');refreshLanguage();"') + ' ><a href="#">&raquo;</a></li>');
}



function swapping_without_money_view_show_swap(swap)
{
	body_clear();
	
	var swap_photos = swapping_without_money_controller_get_images(swap.id);
	jQuery('#content-body').append('<table id="example_paper_' + swap.id + '" class="table table-paper table-striped">'+
	          '<thead>'+
	            '<tr>'+
	              '<th colspan="2" ><span>Swap ' + swap.id + '</span></th>'+
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
	              					'<th>Owner</th>'+
	              					'<td><a style="cursor:pointer;" onclick="user_view_show_profile_data(' + swap.user.id + ');refreshLanguage();" >' + swap.user.username + '</a></td>' +
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
	            	'<td>Product images</td>'+
	            	'<td>'+
			            '<div class="" id="swap-photos-' + swap.id + '">'+
			            	'<ul style="list-style: none;" id="img-container" class="row">'+
		          		'</div>'+
		          	'</td>'+
            '</tr>'+
	          '</tbody>'+
	        '</table>');
	
	

	
	
	

		
	
	
	
	
}


function swapping_without_money_view_show_swap_photos(photo_urls,id_swap)
{
	jQuery.each(photo_urls.urls,
			function(index,url)
			{
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