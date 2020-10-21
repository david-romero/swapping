function inicialize(){
	item_view_create_form(get_category());
}


function item_view_create_form(categoryList)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-item">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-item');
	$('<h3>Create Item</h3><br>').appendTo('#container-item');
	$('<form method="POST"  id="form_item" name="form_item" enctype="multipart/form-data"  class="form-horizontal">').appendTo('#container-item');
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#form_item');
	

	
	///SwappingApp/new_item/
	$('<div class="span2"></div>').appendTo('form_item');
    $('<div class="form-group" id="component_image">'+
			'<label class="col-lg-3 control-label">Images: </label>'+
			'<div class="col-lg-5">').appendTo('#form_item');
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="overflow:scroll;overflow-x:hidden;background-position: center;background-repeat:no-repeat;height:216px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
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
				'<input type="number" id="iprice" name="iprice" class="form-control"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_quantity">'+
			'<label class="col-lg-3 control-label">Quantity: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="iquantity" id="iquantity" class="form-control" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_enable">'+
			'<label class="col-lg-3 control-label">Avaiable for Swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="ienable" id="ienable" >'+
			'</div>'+
	  '</div>'+

	'<div class="form-group" id="component_ipremium">'+
			'<label class="col-lg-3 control-label">Premium Product: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="ipremium" id="ipremium">'+
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
	 			//'<br><br><input type="button" onclick="controller_create_item()" class="btn btn-primary" value="Send" id="submit-all" name="submit-all"/>'+
	 			'<br><br><button type="input" onclick="controller_create_item()" class="btn btn-primary" value="Send" id="submit-all" name="submit-all">Send</button>'+
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
				  var q = 0;
				  //window.location.href = 'http://127.0.0.1:8000/home';
			
			});
		
		myDropzone.on("addedfile", function(file) {
			  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
			});
		 
		//----------------------------------------------------------------------------------------------------------------------
	 
}

function showAllItem(){
	
	body_clear();
    var items = new Array();
    items = getAllItemForUser();
    //userapp = get_user_name();
	
	
	$('<div id="container-item">').appendTo('#content-body');
	$('<h3>Show Items</h3><br>').appendTo('#container-item');
	$('<form method="POST"  id="items" name="form_item"></form>').appendTo('#container-item');

	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#items").append(tokenElement);
   
    jQuery('<div id="tablas" name="tablas" class="tables"></div>').appendTo('#content-body');
    jQuery('<table name="table_products" id="table_products" class="table table-striped" >'+
			'<thead>'+
			'<tr>'+
				'<th class="span1">'+
					'Images'+
				'</th>'+
				'<th class="span3">'+
					'Description'+
				'</th>'+
				'<th class="span2">'+
					'Created'+
				'</th>'+
				'<th class="span2">'+
					'Category'+
				'</th>'+
				'<th class="span2">'+
					'Price'+
				'</th>'+				
				'<th class="span2">'+
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
    							'<img class="thumb" src="http://localhost:8000/uploaded/photos/'+items[i].image+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: show_item_detail();" title="Link to product page">'+items[i].title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+items[i].description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+items[i].created_on +'</td>'+
    					'<td class="span2">'+ items[i].category+'</td>'+	
    					'<td class="span2"> '+items[i].price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span1" colspan="2">'+
							'<button class="btn btn-danger btn-mini" type="submit" value="remove_item" rel="tooltip" data-placement="right" onclick ="controller_delete_item('+items[i].id+')">'+
	    						'<i class="fa fa-trash-o"></i>'+
	    					'</button> &nbsp; &nbsp;'+
	    				//'</td>'+
	    				//'<td class="span1">'+
	    					'<button class="btn btn-info btn-mini" type="submit" value="modify_item" rel="tooltip" data-placement="right" onclick="showItemForModify('+items[i].id+')">'+
	    						'<i class="fa fa-pencil"></i>'+
	    					'</button>'+
    				'</td>'+
    				'</tr>').appendTo('#table_products');

	    index = index + 1;
  
    }
    
    jQuery('#table_products').append('</tbody></table>');
    
	
	
	//-----------------------------------------------------------------------------------------------------------------------

	// Disable auto discover for all elements:
	Dropzone.autoDiscover = false;
	myDropzone = new Dropzone("div#my-dropzone", { /* options */
		url: "/SwappingApp/upload_item_photo/",
		// Prevents Dropzone from uploading dropped files immediately
        autoProcessQueue : false,
        uploadMultiple:true,
		maxFiles:5,
		acceptedFiles: "image/*",
		maxFilesize: 2, // MB
		dictDefaultMessage: "Drag your images",
		paramName: "image",
		init: function() 
		{
			this.on("error", function(file, message) { alert("entra en fallo"); });
			$(this.element).addClass("dropzone");
			var submitButton = document.querySelector("#submit-all");
			myDropzone = this;
			
			submitButton.addEventListener("click", function() {
				myDropzone.processQueue();
				// Tell Dropzone to process all queued files.
			});
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
			  //window.location.href = 'http://127.0.0.1:8000/home';
			  var h;
		  	  h=0;
		
		});
	
	myDropzone.on("addedfile", function(file) {
		  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
		});
	 
	//----------------------------------------------------------------------------------------------------------------------
		
  
}


function show_item_detail(){
	
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-item">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-item');
	$('<h3>Item details</h3><br>').appendTo('#container-item');
	$('		<div id="blueimp-gallery" class="blueimp-gallery">'+
		    '<!-- The container for the modal slides -->'+
		    '<div class="slides"></div>'+
		    '<!-- Controls for the borderless lightbox -->'+
		    '<h3 class="title"></h3>'+
		    '<a class="prev">‹</a>'+
		    '<a class="next">›</a>'+
		    '<a class="close">×</a>'+
		    '<a class="play-pause"></a>'+
		    '<ol class="indicator"></ol>'+
		    '<!-- The modal dialog, which will be used to wrap the lightbox content -->'+
		    '<div class="modal fade">'+
		        '<div class="modal-dialog">'+
		            '<div class="modal-content">'+
		                '<div class="modal-header">'+
		                    '<button type="button" class="close" aria-hidden="true">&times;</button>'+
		                   ' <h4 class="modal-title"></h4>'+
		                '</div>'+
		                '<div class="modal-body next"></div>'+
		                '<div class="modal-footer">'+
		                    '<button type="button" class="btn btn-default pull-left prev">'+
		                        '<i class="glyphicon glyphicon-chevron-left"></i>'+
		                        'Previous'+
		                    '</button>'+
		                    '<button type="button" class="btn btn-primary next">'+
		                       ' Next'+
		                        '<i class="glyphicon glyphicon-chevron-right"></i>'+
		                   ' </button>'+
		                '</div>'+
		            '</div>'+
		        '</div>'+
		    '</div>'+
		'</div>').appendTo('#container-item');
	
	
	$('<div id="links">'+
    '<a href="images/banana.jpg" title="Banana" data-gallery>'+
        '<img src="images/thumbnails/banana.jpg" alt="Banana">'+
    '</a>'+
    '<a href="images/apple.jpg" title="Apple" data-gallery>'+
        '<img src="images/thumbnails/apple.jpg" alt="Apple">'+
    '</a>'+
    '<a href="images/orange.jpg" title="Orange" data-gallery>'+
        '<img src="images/thumbnails/orange.jpg" alt="Orange">'+
    '</a>'+
    '</div>').appendTo('#container-item');
	
	
}
