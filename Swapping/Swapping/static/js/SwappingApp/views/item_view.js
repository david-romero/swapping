function inicialize()
{
	item_view_create_form(get_category());
}


function item_view_create_form(categoryList)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-item">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-item');
	$('<form method="POST"  id="form_item" name="form_item" enctype="multipart/form-data"  class="form-horizontal">').appendTo('#container-item');
	$('<h3 id="hrtitle" name="hrtitle">Wow! a new item!</h3><h3 style="display:none;" id="hrtitle2" name="hrtitle2">Modify Item</h3><br>').appendTo('#form_item');

	
	///SwappingApp/new_item/
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div class="img-responsive" id="my-dropzone" name="my-dropzone" style="overflow:scroll;overflow-x:hidden;background-position: center; padding: 20px; background-repeat:no-repeat;height:216px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_item');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_item');
    
	$('<div class="form-group" id="component_title">'+
			'<label class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="ititle" name="ititle" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="iprice" name="iprice" class="form-control" step="0.01" />'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_quantity">'+
			'<label id="service_quantity" class="col-lg-3 control-label">Quantity: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="iquantity" id="iquantity" class="form-control" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_enable">'+
			'<label class="col-lg-3 control-label">Enable swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="ienable" id="ienable" onclick = "showPosibleSwappingItem(this);refreshLanguage();">'+
			'</div>'+
	  '</div>'+
	  
	  '<div class="form-group" id="area_swapping" style="display:none;">'+
		'<label id="option_swapping" class="col-lg-3 control-label">Option swapping</label>'+
			'<div class="col-lg-5">'+
				'<textarea id="wishSwap" name="wishSwap" class="form-control" placeholder="Write your swapping options here, please." style="resize:none" ></textarea>'+
			'</div>'+
		'</div>'+

	'<div class="form-group" id="component_ipremium">'+
			'<label id="service_premium" class="col-lg-3 control-label">Premium: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="ipremium" id="ipremium" onclick="credit_premium_item();refreshLanguage();">'+
			'</div>'+
	  '</div>').appendTo('#form_item');
     
	$('<div class="form-group" id="component_category">'+
			'<label class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="icategory" id="icategory">').appendTo('#form_item');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#icategory');
    }	
    $('</select></div>'+'</div>').appendTo('#form_item');
  
	
	$('<div class="form-group" id="component_desc">'+
			'<label class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea style="max-width:100%;max-height:180px;" id="idesc" name="idesc" rows="4" cols="50" placeholder="Write your message here, please." class="form-control"></textarea>'+
			'</div>'+
	  '</div>').appendTo('#form_item');

	 $('<center><div class="form-group">'+
			'<div id="sub_div" class="col-lg-9">'+
	 			'<br><br><button onclick="controller_create_item();refreshLanguage();" class="btn btn-primary" value="Send" id="submit-all" name="submit-all">Send</button>'+
	 		'</div></div></center></form>').appendTo('#form_item');


	//-----------------------------------------------------------------------------------------------------------------------

		// Disable auto discover for all elements:
		Dropzone.autoDiscover = false;
		myDropzone = new Dropzone("div#my-dropzone", { /* options */
			url: "/SwappingApp/upload_item_photo/",
			// Prevents Dropzone from uploading dropped files immediately
	        autoProcessQueue : false,
	        uploadMultiple:true,
            addRemoveLinks: true,
            parallelUploads: 8,
			maxFiles:8,
			acceptedFiles: "image/*",
			maxFilesize: 2, // MB
			dictDefaultMessage: "Drag your images",
			paramName: "image",
			init: function() 
			{
				this.on("error", function(file, message) 
						{
							display_error_notification('Error', message, null);
						}
				);
				$(this.element).addClass("dropzone");
				var submitButton = document.querySelector("#submit-all");
				myDropzone = this;
				
				submitButton.addEventListener("click", function() 
						{
							//myDropzone.processQueue();
							// Tell Dropzone to process all queued files.
						}
				);
			},
			accept: function(file, done) {
			    if (file.name == "justinbieber.jpg") {
			      done("Naha, you don't.");
			    }
			    else { done(); }
			  }
			 
		});
		
		myDropzone.on("complete", function(file) {
			  myDropzone.removeFile(file);
			  if (file.size < 2097152)
				  display_success_notification("Create Item","Item created succesfully",null);
				  
				  window.location.href = 'http://127.0.0.1:8000/home';
			
			});
		
		myDropzone.on("addedfile", function(file) {
			  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
			});
		 
		//----------------------------------------------------------------------------------------------------------------------
	
}

function item_view_list_item(){
	body_clear();

	var items = new Array();    
    jQuery('#figure_loading div').addClass('spinner');
    items = getAllItemForUser();
    
}


function showAllItem(items){
	$('<div id="container-item">').appendTo('#content-body');
	$('<form method="POST"  id="items" name="form_item"></form>').appendTo('#container-item');
	$('<h3 id="items_title">My items</h3><br>').appendTo('#items');

	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#items").append(tokenElement);
    jQuery('<div id="tablas" name="tablas" class="col-md-12 col-lg-12 col-sm-12 col-xs-12  table-responsive"></div>').appendTo('#content-body');
    jQuery('<table name="table_products" id="table_products" class="table table-striped table-hover" >'+
			'<thead>'+
			'<tr>'+
				'<th id="images" class="span1">'+
					'Images'+
				'</th>'+
				'<th id="list_itemdescription" class="span3">'+
					'Description'+
				'</th>'+
				'<th id="created" class="span2">'+
					'Created'+
				'</th>'+
				'<th id="list_itemcategory" class="span2">'+
					'Category'+
				'</th>'+
				'<th id="price" class="span2">'+
					'Price'+
				'</th>'+				
				'<th id="actions" class="span2">'+
					'Actions'+
				'</th>'+
			'</tr>'+
		'</thead>'+
		'<tbody>').appendTo('#tablas');
    var index = 1;
    
    
    
    for(var i in items){	
    	
	
    	jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="Link to product page">'+
    							'<img class="thumb" src="'+items[i].url+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: show_item_detail('+items[i].id+');refreshLanguage();" title="Link to product page">'+items[i].title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+items[i].description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+items[i].created_on +'</td>'+
    					'<td class="span2">'+ items[i].category+'</td>'+	
    					'<td class="span2"> '+items[i].price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span1" colspan="2">'+
							'<button class="btn btn-danger btn-mini" type="submit" style="margin-top:5px;" value="remove_item" rel="tooltip" data-placement="right" onclick="controller_delete_item('+items[i].id+');refreshLanguage();">'+
	    						'<i class="fa fa-trash-o"></i>'+
	    					'</button> &nbsp; &nbsp;'+
	    				//'</td>'+
	    				//'<td class="span1">'+
	    					'<button class="btn btn-info btn-mini" type="submit" style="margin-top:5px;" value="modify_item" rel="tooltip" data-placement="right" onclick="showItemForModify('+items[i].id+');refreshLanguage();">'+
	    						'<i class="fa fa-pencil"></i>'+
	    					'</button>'+
    				'</td>'+
    				'</tr>').appendTo('#table_products');
  
    }
    
    jQuery('#table_products').append('</tbody></table>');
    jQuery('#figure_loading div').removeClass('spinner');	
    
    jQuery('#content-body').append('<button id="create_item_b" class="btn btn-info btn-mini" style="margin-left: 15px;" value="modify_item" rel="tooltip" data-placement="right" onclick="inicialize();refreshLanguage();">Create Item</button>');
	
}

function show_item_detail_async(item){
   $('<div id="show_item_form" class="col-lg-12 col-sm-12 col-md-12" ></div>').appendTo('#content-body');
   jQuery('<h3 class="titleh3" >Item properties</h3>').appendTo('#show_item_form');
   jQuery('<div class="col-md-5 col-sm-12 portfolio-item" id="container_image" >').appendTo('#show_item_form');
   jQuery('<div id="item_description" class="col-md-7 col-sm-12 col-xs-12"></div>').appendTo('#show_item_form');
		
   jQuery('<div class="well">'+
		        '<div id="carousel-service-image" class="carousel slide" data-ride="carousel">'+
		          '<ol id = "indicators" class="carousel-indicators"></ol>'+
		          '<div id= "inner" class="carousel-inner"></div>'+ 
		          '<a class="carousel-control" href="#carousel-service-image" data-slide="prev">'+
		            '<span class="glyphicon glyphicon-chevron-left"></span>'+
		          '</a>'+
		          '<a class="carousel-control" href="#carousel-service-image" data-slide="next" style="right: 0; left: auto;">'+
		            '<span class="glyphicon glyphicon-chevron-right"></span>'+
		          '</a>'+
		        '</div>'+
		    '</div>').appendTo('#container_image');
		
		
		var photourl = item_controller_get_photo(item.id, true);
	    str = photourl.urls;
		miArray = eval(str);
		
		if (miArray.length==0){
			$('<li data-target="#carousel-service-image" data-slide-to="0" class="active"></li>').appendTo("#indicators");
	        $('<div class="item active"><img style="width:100%;" src="../../static/images/default.jpg" alt=""></div>').appendTo("#inner");		
		}
		for(var i=0;i<miArray.length;i++){
			if (i == 0){
				$('<li data-target="#carousel-service-image" data-slide-to="'+i+'" class="active"></li>').appendTo("#indicators");
		        $('<div class="item active"><img style="width:100%;" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
			}else{
				$('<li data-target="#carousel-service-image" data-slide-to="'+i+'"></li>').appendTo("#indicators");
				$('<div class="item"><img style="width:100%;" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
			}
		}

		
		
		$('<div class="form-group col-lg-6 col-md-12 col-sm-6 col-xs-12" id="row_1"/></div>').appendTo('#item_description');	
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'><b id='service_title'>Title: &nbsp;</b></span>").appendTo('#row_1');
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'>" + item.title + "</span><br>").appendTo('#row_1');

		
		$('<div class="form-group col-lg-6 col-md-12 col-sm-6 col-xs-12 " id="row_3"/></div>').appendTo('#item_description');	
		jQuery("<span  class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'><b id='service_price'>Price: &nbsp;</b></span>").appendTo('#row_3');
		jQuery('<span  class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label"><p>' + item.price + '<span class="currency">&euro;</span></p></span><br>').appendTo('#row_3');
		
		
		$('<div class="form-group  col-lg-6 col-md-12 col-sm-6 col-xs-12 " id="row_5" /></div>').appendTo('#item_description');	
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'><b id='service_swapping'>Enable swapping: &nbsp;</b></span>").appendTo('#row_5');
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'>" + (item.enable_swapping?'<i class="fa fa-check-square-o"></i>':'<i class="fa fa-times"></i>') + "</span><br>").appendTo('#row_5');
		
		$('<div class="form-group  col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="row_d" /></div>').appendTo('#item_description');	
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'><b id='service_description'>Description: &nbsp;</b></span>").appendTo('#row_d');
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'>" + item.description + "</span><br>").appendTo('#row_d');
		
		$('<div class="form-group col-lg-6 col-md-12 col-sm-6 col-xs-12 " id="row_6" /></div>').appendTo('#item_description');	
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'><b id='service_category'>Category: &nbsp;</b></span>").appendTo('#row_6');
		jQuery("<span class='col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label'>" + item.category + "</span><br>").appendTo('#row_6');
		
		$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="row_7" /></div>').appendTo('#item_description');	
		
		

		var user_logged = user_controller_logged();
		
		if(user_logged != undefined){
			 var user_logged_id = user_logged[0].pk;
		}
		
		
		usertiem = item_controller_get_user_item(item.id);
		
		if(usertiem == user_logged_id){
			
			active_on = item_controller_active_on(item.id);
	//		alert(active_on);
			var serviceActiveOn = active_on.split("-");
			var serviceActiveOnDate = new Date();
			serviceActiveOnDate.setFullYear(serviceActiveOn[0]);
			serviceActiveOnDate.setMonth(serviceActiveOn[1]-1);
			serviceActiveOnDate.setDate(serviceActiveOn[2]);
//			alert (serviceActiveOnDate);
		    var activeToday = serviceActiveOnDate.setHours(0,0,0,0)>=new Date().setHours(0,0,0,0);
//		    alert (activeToday);
		    if(activeToday){
				$('<div class=" form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_status" /></div>').appendTo('#item_description');	
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><b id="service_status">Status: &nbsp;</b></span>').appendTo('#row_status');
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><span id="service_active" class="label label-success">ACTIVE</span></span>').appendTo('#row_status');
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><b id="service_displayed">Displayed: &nbsp;</b></span>').appendTo('#row_status');
				if(item.active){
					jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs- control-label"><span id="service_yes" style="cursor:pointer" onclick="product_controller_set_Display('+item.id+','+"false"+',i,returnLang());refreshLanguage();" class="label label-success">YES</span>').appendTo('#row_status');
				}else{
					jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs- control-label"><span id="service_no" style="cursor:pointer" onclick="product_controller_set_Display('+item.id+','+"true"+',i,returnLang());refreshLanguage();" class="label label-danger">NO</span>').appendTo('#row_status');
				}
			}else{
					$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_nstatus" /></div>').appendTo('#item_description');	
					jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><b id="service_status">Status: &nbsp;</b></span>').appendTo('#row_nstatus');
					jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><span id="service_notactive" class="label label-danger">NOT ACTIVE</span></span>').appendTo('#row_nstatus');
					jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-2 control-label"><a id="service_b_renew" style="cursor:pointer" class="label label-success"  onclick="product_controller_renew('+item.id+',\'i\',returnLang());">Renew!</a></span>').appendTo('#row_nstatus');
			//		jQuery('<a class=" btn btn-info col-lg-3 col-md-3 col-sm-3 col-xs-3"  onclick="product_controller_renew('+item.id+',\'i\')">Renew</a>').appendTo('#row_renew');
			}
		}

		if(usertiem == user_logged_id){

			$('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="sub_div"></div>').appendTo('#show_item_form');	
			$('<button id="edit_button" class="btn btn-primary pull-right" onclick="showItemForModify(' + item.id  +');refreshLanguage();">Edit</button>').appendTo('#sub_div');	
			$('<a id="delete_button" style="margin-right:1%;" class="btn btn-danger pull-right"  name="deletear" id="deletear" data-toggle="confirmation"  >Delete</a>').appendTo('#sub_div');
			
			$('#delete_button').confirmation({
				placement: 'bottom', // How to position the confirmation - top | bottom | left | right
				trigger: 'click', // How confirmation is triggered - click | hover | focus | manual
				target : '_self', // Default target value if `data-target` attribute isn't present.
				href   : '#', // Default href value if `data-href` attribute isn't present.
				title: 'Are you sure?', // Default title value if `data-title` attribute isn't present
				template: '<div class="popover">' +
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
					controller_delete_item(item.id);
				}, // Set event when click at confirm button
				onCancel: function(){}// Set event when click at cancel button
				}) ;
		
		}
		if(usertiem != user_logged_id && user_logged_id != undefined){
			
			$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="row_8" /></div>').appendTo('#item_description');	
			jQuery('<a href="#" class=" btn btn-info bt-sm col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="product_controller_add_item_wish('+item.id+');refreshLanguage();"><i class="fa fa-heart-o"></i> Add to wish list</a>').appendTo('#row_8');
		}
		
		
		
}



function show_item_detail(itemid){
	body_clear();
	getOneItem(itemid);
}

function showPosibleSwappingItem(swapping){
	if(document.form_item.ienable.checked){
		document.getElementById("area_swapping").style.display = "inline";
	}else{
		document.getElementById("area_swapping").style.display = "none";
	}
	
}


function item_view_get_all_items(page_number)
{
	$('#home').removeClass('active');
	$('#items_view_container').addClass('active');
	$('#services_view_container').removeClass('active');
	item_controller_get_all(page_number);
}

function credit_premium_item(){
	
	if (document.form_item.ipremium.checked){
		id = getUserforItems();
		var user = user_controller_get(id,true);
		if(user.credits == 0){
			display_success_notification("Credits","You do not have enough credits to make this premium product",null);
			$("#ipremium").prop('checked', false);
		}else{
			display_success_notification("Credits","You have: "+user.credits+" credits",null);
		}
	}
}

function item_view_show_all_products(page_number,products)
{
	body_clear();
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
	    '<div class="checkbox">'+
	      '<label id="swapping_allow">'+
	        '<input type="checkbox"> Allow swapping'+
	      '</label>'+
	    '</div>'+
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
                '<hr>'+

            '<div id="pagination-container" class="row text-center">'+

                '<div class="col-md-12">'+
                    '<ul class="pagination">'+
                        '<li id="first"><a href="#">&laquo;</a>'+
                        '<li id="last"><a href="#">&raquo;</a>'+
                        '</li>'+
                    '</ul>'+
                '</div>'+

            '</div>');
	
	
	
	$('#map-canvas2').remove();
	
	$('#container-item').remove();
	$('#tablas').remove();
	
	for (var i = 2; i <= 25; i++ )
	{
		
		jQuery('#pagination' + i).remove();
	}
	
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
			jQuery('.pagination').append('<li id="pagination' + i + '" ' +  (i == page_number?'class="active"':'') + '><a onclick="item_controller_get_all(' + i + ');refreshLanguage();" href="#">' + i +'</a></li>');
		}
		jQuery('.pagination').append('<li id="last"><a href="#">&raquo;</a></li>');
	}
	else
	{
		$('#pagination1 a').attr('onclick','').unbind('click');
		jQuery('#pagination1 a').click
		(
				function ()
				{
					item_controller_get_all(1);
				}
		);
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
					item_controller_get_all(1);
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
					item_controller_get_all(number_pages);
				}
		);
	}
	
	jQuery.each(products.products, 
			function (index, product)
			{
				jQuery('#product' + (index + 1)).show();
				jQuery('#description' + (index + 1)).html('<a href="#" onclick="' + (product.type == 'Service'?'service_controller_show_service(' + product.id + ');':'show_item_detail(' + product.id + ');refreshLanguage();') + '" >' + product.title  + '</a>');
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
			    jQuery('#user-username'+ (index + 1)).html('&nbsp;<a href="#" onclick="user_view_show_profile_data(' + id + ');">'+username+'</a>');
			    var user_logged = user_controller_logged();
			    
			    if(user_logged != undefined){
			    jQuery('#product-actions-' + (index + 1)).html('&nbsp;&nbsp;<i title="Send a message to the user" style="cursor:pointer;color: #6666FF;" class="fa fa-envelope fa-2x" onclick="message_view_create_form_modal(' + id + ',\'[' + product.title + '] -\');refreshLanguage();"></i>'
			    		+ '&nbsp;&nbsp;<i id="join_up'  + (index + 1) + '" title="Join as exceptional service." style="cursor:pointer;color: #6666FF;" class="fa fa-exchange fa-2x" onclick="swap_with_money_service(' + product.id + ',\'' + product.typeService  +'\');refreshLanguage();"></i>'
			    		+ '&nbsp;&nbsp;<i title="Add to the shopping cart" id="add_item_shopping_cart'  + (index + 1) + '"  style="cursor:pointer;color: #6666FF;"  class="fa fa-shopping-cart  fa-2x"></i>');
				}else{
					jQuery('#product-actions-' + (index + 1)).html('&nbsp;&nbsp;<label id="no_message_swapping_'+(index + 1)+'">Sign up to view actions</label>');
				}jQuery('#product' + (index + 1) + ' .caption2 h4').html(product.title);
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
