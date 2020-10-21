function search_view_show_result(data,numpag,pgact){
	
	body_clear();
	objects = data.objlist;
	
	$('<div id="container-item">').appendTo('#content-body');
	
	$('<form method="POST"  id="items" name="form_item"></form>').appendTo('#container-item');
	$('<h3>Searching Result</h3><br>').appendTo('#items');
	
    
    if(objects.length >= 1){
	    jQuery('<div id="tablas" name="tablas"  class="col-md-12 col-lg-12 col-sm-12 col-xs-12  table-responsive"></div>').appendTo('#container-item');
	    jQuery('<table name="table_products" id="table_products" class="table table-striped" >'+
				'<thead>'+
				'<tr>'+
					'<th id="images" class="span1">'+
						'Images'+
					'</th>'+
					'<th id="description" class="span3">'+
						'Description'+
					'</th>'+
					'<th id="type" class="span2">'+
						'Type'+
					'</th>'+
					'<th id="swapping_allow" class="span2">'+
						'Allow swapping'+
					'</th>'+				
					'<th id="owner" class="span2">'+
						'Owner'+
					'</th>'+
					'<th id="actions" class="span2">'+
					'Actions'+
				    '</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody>').appendTo('#tablas');
    }
    
    var inicio = 0;
    var fin = 0;
    if(pgact==1){
    	inicio = pgact-1;
    	
    }else{
    	inicio = (pgact-1) * 10;
    }
    if(numpag==pgact){
    	fin = data.objlist.length;
    }
    else{
    	fin = inicio + 10;
    }
     
    
    if(objects.length < 1)
    {
    	display_error_notification('No found', 'No results were found.', 'fa fa-times');
    	//alert("No se encuentran resultados para la busqueda actual");
    }
    else{
    
	    for(inicio; inicio<fin; inicio++){	
	    	var refobj;
			var typeobj;
			var tipeicon;
	    	if (objects[inicio].type == 'i'){
	    		refobj= 'show_item_detail(';
	    		typeobj='Item';
	    		tipeicon = '<i id="join_up2" class="fa fa-exchange fa-2x" style="cursor: pointer; color: rgb(102, 102, 255); display: none;" title="Join as exceptional service."></i>'+
	    	    '<i id="add_item_shopping_cart2" class="fa fa-shopping-cart fa-2x" onclick="shopping_cart_controller_add_item('+ objects[inicio].id +');refreshLanguage();" style="cursor:pointer;color: #6666FF;" title="Add to the shopping cart"></i>';   
	    	}
	    	if (objects[inicio].type == 'h'){
	    		refobj= 'service_controller_show_hour(';
	    		typeobj='Hour';
	    		tipeicon='<i id="join_up1" class="fa fa-exchange fa-2x" onclick="swap_with_money_service('+ objects[inicio].id +',\'' + typeobj+'\');refreshLanguage();" style="cursor:pointer;color: #6666FF;" title="Join as exceptional service."></i>';	
	    	}
	    	if (objects[inicio].type == 'c'){
	    		refobj= 'service_controller_show_car(';
	    		typeobj='Car';
	    		tipeicon='<i id="join_up1" class="fa fa-exchange fa-2x" onclick="swap_with_money_service(7,\'' + typeobj+'\');" style="cursor:pointer;color: #6666FF;" title="Join as exceptional service."></i>';
	    		
	    	}
	    	if (objects[inicio].type == 'e'){
	    		refobj= 'service_controller_show_estate(';
	    		typeobj='Estate';
	    		tipeicon='<i id="join_up1" class="fa fa-exchange fa-2x" onclick="swap_with_money_service(7,\'' + typeobj+'\');refreshLanguage();" style="cursor:pointer;color: #6666FF;" title="Join as exceptional service."></i>';
	    	}
	    	var activate='<span class="label label-danger">DISABLED</span>';
	    	if(objects[inicio].enable == 'True'){
	    		activate = '<span class="label label-success">ENABLE!</span>';
	    	}
	    	if(objects[inicio].enable == 'False'){
	    		activate = '<span class="label label-danger">DISABLED!</span>';
	    	}
	
	    	var lastcolum;
	    	if(data.athuser == true){
	    		lastcolum = '<i class="fa fa-envelope fa-2x" onclick="message_view_create_form_modal(' + objects[inicio].userid + ',\'[' + objects[inicio].title+ '] -\');refreshLanguage();" style="cursor:pointer;color: #6666FF;" title="Send a message to the user"></i>';
	    	}
	    	if(data.athuser == false){ 		
	    		lastcolum = 'You are not register, join us!!!! <a id="title" href="javascript:user_view_create_forms(null);") title="Link to join us">Register</a>';
	    		tipeicon="";
	    	}
		
		
	    	jQuery('		<tr>'+
	    					'<td class="span1">'+
	    						'<a href="#" title="Link to product page">'+
	    							'<img class="thumb" src="'+objects[inicio].image+'" title="Product Image"/>'+
	    						'</a>'+
	    					'</td>'+
	    					'<td class="span3">'+
	    						'<a id="title" style="font-family: fantasy; font-size: medium;" href="javascript: '+refobj+objects[inicio].id+');" title="Link to product page">'+objects[inicio].title+'</a>'+
	    							'<div style="width: 175px;overflow:hidden;max-width: 175px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+objects[inicio].desc+'</div>'+
	    					'</td>'+
	    					'<td class="span2">'+typeobj +'</td>'+
	    					'<td class="span2">'+activate+'</td>'+
	    					//'<td class="span2">'+ objects[obj].userid+'</td>'+
	    					'<td class="span2"><a id="name" href="javascript:user_view_show_profile_data('+objects[inicio].userid+');" title="view profile data"><i class="fa fa-user blue"></i><span class="blue"> '+objects[inicio].uname+'</span></a></td>'+
	    					'<td class="span1" colspan="2"><span id="product-actions-2">'+lastcolum+ '&nbsp; &nbsp;'+ tipeicon+' </span></td>'+
	    				'</tr>').appendTo('#table_products');
	    }
    }    
    jQuery('#table_products').append('</tbody></table>');
    
    jQuery('<div id="pagination-container" class="col-md-3 col-sm-12 col-xs-12 rightside">'+
            '<div class="col-md-12">'+
            '<ul class="pagination">'+
                '<li id="first" >'+
                    '<a href="#">&laquo;</a></li>'+
                '<li id="last"><a href="#">&raquo</a></li></ul></div></div></div>').appendTo('#container-item');

	
	if(numpag > 1)
	{
		jQuery('#last').remove();
		for (var i = 1; i <= numpag; i++ )
		{
			jQuery('#pagination-search-' + i).remove();
			jQuery('.pagination').append('<li id="pagination-search-' + i + '" ' +  (i == pgact?'class="active"':'') + '><a href="#">' + i +'</a></li>');
			jQuery('#pagination-search-'+i).click
			(
					function (d)
					{
						console.log(d);
						var number_page =Number(d.currentTarget.id.split("-")[2]);
						//alert(number_page);
						search_view_show_result(data,numpag,number_page);
					}
			);
		}
		jQuery('.pagination').append('<li id="last"><a href="#">&raquo;</a></li>');
	}
	
	
	
	if (pgact==1)
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
					search_view_show_result(data,numpag,pgact-1);
				}
			
		);
	}
	
	if (pgact==numpag)
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
					search_view_show_result(data,numpag,pgact+1);
				}
		);
	}
	
}


function search_view_begin_search()
{
	var texts;
	texts = jQuery('#search_text').val();
	if(texts == "") {
		display_error_notification("Search Error", "The search cannot to be empty", "fa fa-times");
	}else{
		if(texts.length < 3){
			display_error_notification("Search Error", "The search text should be bigger than two word", "fa fa-times");
		}else{
			search_controller_find(texts);
		}	
	}
	
}


function search_view_show_users_result(data)
{
	
	body_clear();
	
	$('<div id="container-item">').appendTo('#content-body');
	
	$('<form method="POST"  id="items" name="form_item"></form>').appendTo('#container-item');
	$('<h3>Searching Result</h3><br>').appendTo('#items');
	
   
    jQuery('<div id="tablas" name="tablas"  class="col-md-12 col-lg-12 col-sm-12 col-xs-12  table-responsive"></div>').appendTo('#content-body');
    jQuery('<table name="table_products" id="table_products" class="table table-striped" >'+
			'<thead>'+
			'<tr>'+
				'<th class="span1">'+
					'Image'+
				'</th>'+
				'<th class="span3">'+
					'Username'+
				'</th>'+
				'<th class="span3">'+
					'First Name'+
				'</th>'+
				'<th class="span3">'+
					'Last Name'+
				'</th>'+
				'<th class="span2">'+
					'Votes'+
				'</th>'+				
			'</tr>'+
		'</thead>'+
		'<tbody>').appendTo('#tablas');
    var index = 1;

    objects = data.usrlist;
    for(var obj in objects){	
    	
    	console.log(objects[obj]);
    	var first_name ='<span class="">' + objects[obj].name + '</span>';

    	var last_name ='<span class="">' + objects[obj].surname + '</span>';
    	
	
	
    	jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="User image">'+
    							'<img class="thumb" src="'+objects[obj].photo+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
							'<a id="title" style="font-family: fantasy; font-size: medium;" href="javascript:user_view_show_profile_data( '+objects[obj].id+');" title="Name">'+objects[obj].username+'</a>'+
						'</td>'+
    					'<td class="span3">'+
    						'<a id="title" style="font-family: fantasy; font-size: medium;" href="javascript:user_view_show_profile_data( '+objects[obj].id+');" title="Name">'+first_name+'</a>'+
    					'</td>'+
    					'<td class="span3">'+last_name +'</td>'+
    					'<td class="span2">'+objects[obj].votes+'</td>'+
    					
    				'</tr>').appendTo('#table_products');

  
    }
    
    jQuery('#table_products').append('</tbody></table>');
    
	
}