function create_service(){
	service_view_create_form(get_category());
}
//var myDropzone = null;
function service_view_create_form(categoryList)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-service">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-service');
	$('<h3>Create Service</h3><br>').appendTo('#container-service');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_service" name="form_service"  class="form-horizontal">').appendTo('#container-service');
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#form_service');
	///SwappingApp/new_service/
	$('<div class="span2"></div>').appendTo('form_service');
	
    $('<div class="form-group" id="component_image">'+
			'<label class="col-lg-3 control-label">Images: </label>'+
			'<div class="col-lg-5">').appendTo('#form_service');
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_service');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_service');
    
	$('<div class="form-group" id="component_title">'+
			'<label class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label class="col-lg-3 control-label">Avaiable Places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_enable">'+
			'<label class="col-lg-3 control-label">Avaiable for Swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="enable_swapping" id="enable_swapping" >'+
			'</div>'+
	  '</div>'+

	'<div class="form-group" id="component_premium">'+
			'<label class="col-lg-3 control-label">Premium Product: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="premium" id="premium">'+
			'</div>'+
	  '</div>').appendTo('#form_service');
     
	$('<div class="form-group" id="component_category">'+
			'<label class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="category" id="category">').appendTo('#form_service');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
    }	
    $('</select></div>'+'</div>').appendTo('#form_service');
  
	
	$('<div class="form-group" id="component_description">'+
			'<label class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
	'</div>'+'<div class="form-group" id="component_longitude">'+
		'<label class="col-lg-3 control-label">Longitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude">'+
		'<label class="col-lg-3 control-label">Latitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_service');
	
	
	$('<div class="form-group" id="component_radio_car">'+
		'<label class="col-lg-3 control-label">Transport: </label>'+
		'<div class="col-lg-5">'+
			'<input type="radio" name="service" id="service" value = "car" onclick="mostrarReferencia(this);">'+
		'</div>'+
	'</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_conversation" style="display:none;">'+
			'<label class="col-lg-3 control-label">Conversation: </label>'+
			'<div class="col-lg-5">'+
				'<select name="conversation" id="conversation">'+
					'<option value = "LOW_LEVEL">Low level</option>' +
					'<option value = "MEDIUM_LEVEL">Medium level</option>' +
					'<option value = "HIGH_LEVEL">High level</option>'+
				'</select>'+
			'</div>'+
	'</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_destination_longitude" style="display:none;">'+
			'<label class="col-lg-3 control-label">Longitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlongitude" name="dlongitude" class="form-control" min = "-180" max ="180"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_destination_latitude" style="display:none;">'+
			'<label class="col-lg-3 control-label">Latitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlatitude" name="dlatitude" class="form-control" min = "-90" max ="90"/>'+
			'</div>'+
	  '</div>'+
	'<div class="form-group" id="component_pets" style="display:none;">'+
			'<label class="col-lg-3 control-label">Pets: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="pets" id="pets">'+
			'</div>'+
	  '</div>'+
	  '<div class="form-group" id="component_baggage" style="display:none;">'+
		'<label class="col-lg-3 control-label">Paggage: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="baggage" id="baggage">'+
		'</div>'+
	   '</div>'+
	   '<div class="form-group" id="component_smoker" style="display:none;">'+
		'<label class="col-lg-3 control-label">Smoker: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="smoke" id="smoke">'+
		'</div>'+
	   '</div>'+
	  '</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_radio_hour">'+
			'<label class="col-lg-3 control-label">Hours: </label>'+
			'<div class="col-lg-5">'+
				'<input type="radio" name="service" id="service" value = "hour" onclick="mostrarReferencia(this);">'+
			'</div>'+
		'</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_day_of_week" style="display:none;">'+
			'<label class="col-lg-3 control-label">Day of week: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="day_of_week" name="day_of_week" class="form-control" min = "1" max ="7"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_duration" style="display:none;">'+
			'<label class="col-lg-3 control-label">Duration in hour: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="duration" name="duration" class="form-control" min = "0"/>'+
			'</div>'+
	  '</div>').appendTo('#form_service');
	
	 $('<div class="form-group" id="component_radio_estate">'+
			'<label class="col-lg-3 control-label">Estates: </label>'+
			'<div class="col-lg-5">'+
				'<input type="radio" name="service" id="service" value = "estate" onclick="mostrarReferencia(this);">'+
			'</div>'+
		'</div>').appendTo('#form_service');

     
	 $('<div class="form-group" id="component_beginning" style="display:none;">'+
				'<label class="col-lg-3 control-label">Date of beginning: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="beginning" name="beginning" class="form-control"/>'+
				'</div>'+
		  '</div>'+
		
		'<div class="form-group" id="component_ending" style="display:none;">'+
				'<label class="col-lg-3 control-label">Date of ending: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="ending" name="ending" class="form-control"/>'+
				'</div>'+
		  '</div>').appendTo('#form_service');

	 jQuery('.datepicker').datepicker();
	 
	 $('<center><div class="form-group">'+
			'<div id="sub_div" class="col-lg-9">'+
	 			'<br><br><button type="submit" onclick="service_controller_create_service()" class="btn btn-primary">Save</button>'+
	 		'</div></div></center></form>').appendTo('#form_service');
	 
	
	 var nowTemp = new Date();
	 var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	  
	 var checkin = $('#beginning').datepicker({
	   onRender: function(date) {
	     return date.valueOf() < now.valueOf() ? 'disabled' : '';
	   }
	 }).on('changeDate', function(ev) {
	   if (ev.date.valueOf() > checkout.date.valueOf()) {
	     var newDate = new Date(ev.date)
	     newDate.setDate(newDate.getDate() + 1);
	     checkout.setValue(newDate);
	   }
	   checkin.hide();
	   $('#ending')[0].focus();
	 }).data('datepicker');
	 var checkout = $('#ending').datepicker({
	   onRender: function(date) {
	     return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
	   }
	 }).on('changeDate', function(ev) {
	   checkout.hide();
	 }).data('datepicker');
	//-----------------------------------------------------------------------------------------------------------------------

		// Disable auto discover for all elements:
		Dropzone.autoDiscover = false;
		myDropzone = new Dropzone("div#my-dropzone", { /* options */
			url: "/SwappingApp/upload_service_photo/",
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
function edit_form_hour(id){
	hour_view_edit_form(id,get_category());
}

function hour_view_edit_form(id,categoryList)
{
	body_clear();
	
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-hour">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-hour');
	$('<h3>Edit Hour</h3><br>').appendTo('#container-hour');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_hour" name="form_hour"  class="form-horizontal">').appendTo('#container-hour');
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#form_hour');
	///SwappingApp/new_service/
	$('<div class="span2"></div>').appendTo('form_hour');
	var tokenElement = jQuery(document.createElement('input'));
	tokenElement.attr('type', 'hidden');
	tokenElement.attr('name', 'csrfmiddlewaretoken');
	var csrftoken = getCookie('csrftoken');
	tokenElement.val( csrftoken );
	jQuery("#form_hour").append(tokenElement);
	$('<div class="form-group" id="component_image">'+
		'<label class="col-lg-3 control-label">Images: </label>'+
		'<div class="col-lg-5">').appendTo('#form_hour');
	        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_hour');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_hour');

	$('<div class="form-group" id="component_title">'+
		'<label class="col-lg-3 control-label">Title: </label>'+
		'<div class="col-lg-5">'+
			'<input type="text" id="title" name="title" class="form-control"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_price">'+
		'<label class="col-lg-3 control-label">Price: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
		'</div>'+
	'</div>'+


	'<div class="form-group" id="component_avaiable_place">'+
		'<label class="col-lg-3 control-label">Avaiable Places: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_enable">'+
		'<label class="col-lg-3 control-label">Avaiable for Swapping: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="enable_swapping" id="enable_swapping" >'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_premium">'+
		'<label class="col-lg-3 control-label">Premium Product: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="premium" id="premium">'+
		'</div>'+
	'</div>').appendTo('#form_hour');
 
	$('<div class="form-group" id="component_category">'+
		'<label class="col-lg-3 control-label">Category:  </label>'+
		'<div class="col-lg-5">'+
			'<select name="category" id="category">').appendTo('#form_hour');
		for(i in categoryList){	
			$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
		}	
	$('</select></div>'+'</div>').appendTo('#form_hour');


	$('<div class="form-group" id="component_description" >'+
		'<label class="col-lg-3 control-label">Description: </label>'+
		'<div class="col-lg-5">'+
			'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
		'</div>'+
	'</div>'+
	'<div class="form-group" id="component_longitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Longitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Latitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_hour');	
	
	$('<div class="form-group" id="component_day_of_week">'+
			'<label class="col-lg-3 control-label">Day of week: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="day_of_week" name="day_of_week" class="form-control" min = "1" max ="7"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_duration" >'+
			'<label class="col-lg-3 control-label">Duration in hour: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="duration" name="duration" class="form-control" min = "0"/>'+
			'</div>'+
	  '</div>').appendTo('#form_hour');
	


	var service = service_controller_show_hour(id,true);
	service_view_fulfill_form(service);
 	$('<center><div class="form-group">'+
		'<div id="sub_div" class="col-lg-9">'+
 			'<br><br><button type="submit" onclick="service_controller_update_hour(' + id + ');" class="btn btn-primary">Save</button>'+
 		'</div></div></center></form>').appendTo('#form_hour');
 


 	//-----------------------------------------------------------------------------------------------------------------------

	// Disable auto discover for all elements:
	Dropzone.autoDiscover = false;
	myDropzone = new Dropzone("div#my-dropzone", { /* options */
		url: "/SwappingApp/upload_service_photo/",
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
function edit_form_car(id){
	car_view_edit_form(id,get_category());
}
function car_view_edit_form(id,categoryList)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-car">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-car');
	$('<h3>Create Service</h3><br>').appendTo('#container-car');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_car" name="form_car"  class="form-horizontal">').appendTo('#container-car');
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#form_car');
	///SwappingApp/new_service/
	$('<div class="span2"></div>').appendTo('form_service');
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#form_car").append(tokenElement);
    $('<div class="form-group" id="component_image">'+
			'<label class="col-lg-3 control-label">Images: </label>'+
			'<div class="col-lg-5">').appendTo('#form_car');
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_car');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_car');
    
	$('<div class="form-group" id="component_title">'+
			'<label class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label class="col-lg-3 control-label">Avaiable Places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_enable">'+
			'<label class="col-lg-3 control-label">Avaiable for Swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="enable_swapping" id="enable_swapping" >'+
			'</div>'+
	  '</div>'+

	'<div class="form-group" id="component_premium">'+
			'<label class="col-lg-3 control-label">Premium Product: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="premium" id="premium">'+
			'</div>'+
	  '</div>').appendTo('#form_car');
     
	$('<div class="form-group" id="component_category">'+
			'<label class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="category" id="category">').appendTo('#form_car');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
    }	
    $('</select></div>'+'</div>').appendTo('#form_car');
  
	
	$('<div class="form-group" id="component_description">'+
			'<label class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
	'</div>'+'<div class="form-group" id="component_longitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Longitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Latitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_car');
	
	$('<div class="form-group" id="component_conversation">'+
			'<label class="col-lg-3 control-label">Conversation: </label>'+
			'<div class="col-lg-5">'+
				'<select name="conversation" id="conversation">'+
					'<option value = "LOW_LEVEL">Low level</option>' +
					'<option value = "MEDIUM_LEVEL">Medium level</option>' +
					'<option value = "HIGH_LEVEL">High level</option>'+
				'</select>'+
			'</div>'+
	'</div>').appendTo('#form_car');
	$('<div class="form-group" id="component_destination_longitude" style="display:none;">'+
			'<label class="col-lg-3 control-label">Longitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlongitude" name="dlongitude" class="form-control" min = "-180" max ="180"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_destination_latitude" style="display:none;">'+
			'<label class="col-lg-3 control-label">Latitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlatitude" name="dlatitude" class="form-control" min = "-90" max ="90"/>'+
			'</div>'+
	  '</div>'+
	'<div class="form-group" id="component_pets" >'+
			'<label class="col-lg-3 control-label">Pets: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="pets" id="pets" >'+
			'</div>'+
	  '</div>'+
	  '<div class="form-group" id="component_baggage">'+
		'<label class="col-lg-3 control-label">Paggage: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="baggage" id="baggage" >'+
		'</div>'+
	   '</div>'+
	   '<div class="form-group" id="component_smoker">'+
		'<label class="col-lg-3 control-label">Smoker: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="smoke" id="smoke" >'+
		'</div>'+
	   '</div>'+
	  '</div>').appendTo('#form_car');
	 
	 var service = service_controller_show_car(id,true);
	 service_view_fulfill_form(service);
	 $('<center><div class="form-group">'+
		'<div id="sub_div" class="col-lg-9">'+
	 		'<br><br><button type="submit" onclick="service_controller_update_car(' + id + ');" class="btn btn-primary">Save</button>'+
	 	'</div></div></center></form>').appendTo('#form_car');
	 
	
	
	//-----------------------------------------------------------------------------------------------------------------------

		// Disable auto discover for all elements:
		Dropzone.autoDiscover = false;
		myDropzone = new Dropzone("div#my-dropzone", { /* options */
			url: "/SwappingApp/upload_service_photo/",
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
function edit_form_estate(id){
	estate_view_edit_form(id,get_category());
}
function estate_view_edit_form(id,categoryList)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-estate">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-estate');
	$('<h3>Edit Estate</h3><br>').appendTo('#container-estate');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_estate" name="form_estate"  class="form-horizontal">').appendTo('#container-estate');
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#form_estate');
	///SwappingApp/new_service/
	$('<div class="span2"></div>').appendTo('form_estate');
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#form_estate").append(tokenElement);
    $('<div class="form-group" id="component_image">'+
			'<label class="col-lg-3 control-label">Images: </label>'+
			'<div class="col-lg-5">').appendTo('#form_estate');
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_estate');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_estate');
    
	$('<div class="form-group" id="component_title">'+
			'<label class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label class="col-lg-3 control-label">Avaiable Places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_enable">'+
			'<label class="col-lg-3 control-label">Avaiable for Swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="enable_swapping" id="enable_swapping" >'+
			'</div>'+
	  '</div>'+

	'<div class="form-group" id="component_premium">'+
			'<label class="col-lg-3 control-label">Premium Product: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="premium" id="premium">'+
			'</div>'+
	  '</div>').appendTo('#form_estate');
     
	$('<div class="form-group" id="component_category">'+
			'<label class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="category" id="category">').appendTo('#form_estate');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
    }	
    $('</select></div>'+'</div>').appendTo('#form_estate');
  
	
	$('<div class="form-group" id="component_description">'+
			'<label class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
	'</div>'+'<div class="form-group" id="component_longitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Longitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude" style="display:none;">'+
		'<label class="col-lg-3 control-label">Latitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_estate');
	
     
	 $('<div class="form-group" id="component_beginning">'+
				'<label class="col-lg-3 control-label">Date of beginning: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="beginning" name="beginning" class="form-control"/>'+
				'</div>'+
		  '</div>'+
		
		'<div class="form-group" id="component_ending">'+
				'<label class="col-lg-3 control-label">Date of ending: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="ending" name="ending" class="form-control"/>'+
				'</div>'+
		  '</div>').appendTo('#form_estate');
	 jQuery('.datepicker').datepicker();
	 
	 $('<center><div class="form-group">'+
				'<div id="sub_div" class="col-lg-9">'+
			 		'<br><br><button type="submit" onclick="service_controller_update_estate(' + id + ');" class="btn btn-primary">Save</button>'+
			 	'</div></div></center></form>').appendTo('#form_estate');
	 
	 var service = service_controller_show_estate(id,true);
	 service_view_fulfill_form(service);
	 
	 var nowTemp = new Date();
	 var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	  
	 var checkin = $('#beginning').datepicker({
	   onRender: function(date) {
	     return date.valueOf() < now.valueOf() ? 'disabled' : '';
	   }
	 }).on('changeDate', function(ev) {
	   if (ev.date.valueOf() > checkout.date.valueOf()) {
	     var newDate = new Date(ev.date)
	     newDate.setDate(newDate.getDate() + 1);
	     checkout.setValue(newDate);
	   }
	   checkin.hide();
	   $('#ending')[0].focus();
	 }).data('datepicker');
	 var checkout = $('#ending').datepicker({
	   onRender: function(date) {
	     return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
	   }
	 }).on('changeDate', function(ev) {
	   checkout.hide();
	 }).data('datepicker');
	
	//-----------------------------------------------------------------------------------------------------------------------

		// Disable auto discover for all elements:
		Dropzone.autoDiscover = false;
		myDropzone = new Dropzone("div#my-dropzone", { /* options */
			url: "/SwappingApp/upload_service_photo/",
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
function mostrarReferencia(elemento) {
	document.getElementById("component_conversation").style.display = "none";
    document.getElementById("component_destination_longitude").style.display = "none";
    document.getElementById("component_destination_latitude").style.display = "none";
    document.getElementById("component_pets").style.display = "none";
    document.getElementById("component_baggage").style.display = "none";
    document.getElementById("component_smoker").style.display = "none";
    document.getElementById("component_beginning").style.display = "none";
    document.getElementById("component_ending").style.display = "none";
    document.getElementById("component_day_of_week").style.display = "none";
	document.getElementById("component_duration").style.display = "none";
  if (elemento.value=="car") {
	  document.getElementById("component_conversation").style.display = "inline";
	    document.getElementById("component_destination_longitude").style.display = "inline";
	    document.getElementById("component_destination_latitude").style.display = "inline";
	    document.getElementById("component_pets").style.display = "inline";
	    document.getElementById("component_baggage").style.display = "inline";
	    document.getElementById("component_smoker").style.display = "inline";
  }if (elemento.value=="hour") {
	  	document.getElementById("component_day_of_week").style.display = "inline";
	    document.getElementById("component_duration").style.display = "inline";
  }if (elemento.value=="estate"){
	  document.getElementById("component_beginning").style.display = "inline";
	    document.getElementById("component_ending").style.display = "inline";
   }

}
function service_view_fulfill_form(service)
{	var location = get_location(service.venue);
	alert("entra fulfill");
	//First line is different because jQuery causes conflict
	$("input[name=title]").val(service.title);
	jQuery('#description').val(service.description);
	jQuery('#enable').val(service.enable_swapping);
	jQuery('#available_places').val(service.available_places);
	jQuery('#price').val(service.price);
	jQuery('#my-dropzone').val(service.image);
	jQuery('#longitude').val(location.longitude);
	jQuery('#latitude').val(location.latitude);
	
	if(service.day_of_week != undefined){
		jQuery('#day_of_week').val(service.day_of_week);
		jQuery('#duration').val(service.duration);
	}
	if(service.destination != undefined){
		var dlocation = get_location(service.destination);
		jQuery('#conversation').val(service.conversation);
		jQuery('#dlongitude').val(dlocation.longitude);
		jQuery('#dlatitude').val(dlocation.latitude);
	}
	if(service.beginning != undefined){
		jQuery('#beginning').val(service.beginning);
		jQuery('#ending').val(service.ending);
	}
}
function service_view_show(service)
{
	
	body_clear();
	var location = get_location(service.venue);
	
	$('<form method="POST" action="#" role="form" id="show_service_form" enctype="multipart/form-data" style="form-inline" role="form"></form>').appendTo('#content-body');
	jQuery('<h3>Service Data</h3>').appendTo('#show_service_form');
    
	jQuery('<div class="col-md-6 portfolio-item" id="container_image" >').appendTo('#show_service_form');
	jQuery('<div class="well">'+
	        '<h4>Image</h4>'+
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
	
	var photoURL = service_controller_get_photo(service.id, true);
	var str = photoURL.url;
	var miArray = eval(str);
	for(var i=0;i<miArray.length;i++){
		if (i == 0){
			$('<li data-target="#carousel-service-image" data-slide-to="'+i+'" class="active"></li>').appendTo("#indicators");
	        $('<div class="item active"><img style="width:100%;" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}else{
			$('<li data-target="#carousel-service-image" data-slide-to="'+i+'"></li>').appendTo("#indicators");
			$('<div class="item"><img style="width:100%;" src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}
	}

	$('<div class="form-group" id="row_1"/></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Title: &nbsp;</b></span>").appendTo('#row_1');
	jQuery("<span class='col-lg-4 control-label'>" + service.title + "</span>").appendTo('#row_1');
	
	$('<div class="form-group" id="row_2"/></div>').appendTo('#show_service_form');	
	jQuery("<span  class='col-lg-2 control-label'><b>Description: &nbsp;</b></span>").appendTo('#row_2');
	jQuery("<span  class='col-lg-4 control-label'><pre>"+ service.description + "</pre></span>").appendTo('#row_2');

	
	$('<div class="form-group" id="row_3"/></div>').appendTo('#show_service_form');	
	jQuery("<span  class='col-lg-2 control-label'><b>Price: &nbsp;</b></span>").appendTo('#row_3');
	jQuery('<span  class="col-lg-4 control-label"><p>' + service.price + '<span class="currency">&euro;</span></p></span>').appendTo('#row_3');
	
	$('<div class="form-group" id="row_4" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Places: &nbsp;</b></span>").appendTo('#row_4');
	jQuery("<span class='col-lg-4 control-label'>" + service.available_places + "</span>").appendTo('#row_4');
	
	$('<div class="form-group" id="row_5" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Swapping: &nbsp;</b></span>").appendTo('#row_5');
	jQuery("<span class='col-lg-4 control-label'>" + service.enable_swapping + "</span>").appendTo('#row_5');
	
	$('<div class="form-group" id="row_6" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Category: &nbsp;</b></span>").appendTo('#row_6');
	jQuery("<span class='col-lg-4 control-label'>" + service.category + "</span>").appendTo('#row_6');
	
	$('<div class="form-group" id="row_7" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Premium: &nbsp;</b></span>").appendTo('#row_7');
	jQuery("<span class='col-lg-4 control-label'>" + service.premium + "</span>").appendTo('#row_7');
	
	$('<div class="form-group" id="row_8" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Longitude: &nbsp;</b></span>").appendTo('#row_8');
	jQuery("<span class='col-lg-4 control-label'>" + location.longitude + "</span>").appendTo('#row_8');
	
	$('<div class="form-group" id="row_9" /></div>').appendTo('#show_service_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Latitude: &nbsp;</b></span>").appendTo('#row_9');
	jQuery("<span class='col-lg-4 control-label'>" + location.latitude + "</span>").appendTo('#row_9');
	
	if(service.destination != undefined){
		var dlocation = get_location(service.destination);
		$('<div class="form-group" id="row_10" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Conversation: &nbsp;</b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-4 control-label'>" + service.conversation + "</span>").appendTo('#row_10');
		
		$('<div class="form-group" id="row_11" /></div>').appendTo('#show_service_form');
		jQuery("<span class='col-lg-4 control-label'><b>Longitude of destination: &nbsp;</b></span>").appendTo('#row_11');
		jQuery("<span class='col-lg-2 control-label'>" + dlocation.longitude + "</span>").appendTo('#row_11');
		
		$('<div class="form-group" id="row_12" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-4 control-label'><b>Latitude of destination: &nbsp;</b></span>").appendTo('#row_12');
		jQuery("<span class='col-lg-2 control-label'>" + dlocation.latitude + "</span>").appendTo('#row_12');
		
		$('<div class="form-group" id="row_13" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Pets: &nbsp;</b></span>").appendTo('#row_13');
		jQuery("<span class='col-lg-4 control-label'>" + service.pets + "</span>").appendTo('#row_13');
		
		$('<div class="form-group" id="row_14" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Baggage: &nbsp;</b></span>").appendTo('#row_14');
		jQuery("<span class='col-lg-4 control-label'>" + service.baggage + "</span>").appendTo('#row_14');
		
		$('<div class="form-group" id="row_15" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Smoker: &nbsp;</b></span>").appendTo('#row_15');
		jQuery("<span class='col-lg-4 control-label'>" + service.smoker + "</span>").appendTo('#row_15');
		$('<div id="my_map" style = "align:center;"></div>').appendTo('#show_service_form');
		
		$('<div class="form-group"><div class="col-lg-9 col-lg-offset-3" id="sub_div"></div></div>').appendTo('#show_service_form');	
		$('<div class="col-lg-5"><button class="btn btn-primary" onclick="edit_form_car(' + service.id  +');">Edit</button></div>').appendTo('#sub_div');	
		$('<div class="col-lg-5"><a class="btn btn-danger"  onclick="service_controller_delete_car(' + service.id  +');"  >Delete</a></div>').appendTo('#sub_div');
		
	}
	if(service.day_of_week != undefined){
		var day = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		$('<div class="form-group" id="row_10" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Day of week: &nbsp;</b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-4 control-label'>" + day[service.day_of_week] + "</span>").appendTo('#row_10');
		
		$('<div class="form-group" id="row_11" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Duration: &nbsp;</b></span>").appendTo('#row_11');
		jQuery("<span class='col-lg-4 control-label'>" + service.duration + "</span>").appendTo('#row_11');
		$('<div id="my_map"></div>').appendTo('#show_service_form');
		
		$('<div class="form-group"><div class="col-lg-9 col-lg-offset-3" id="sub_div"></div></div>').appendTo('#show_service_form');	
		$('<div class="col-lg-5"><button class="btn btn-primary"  onclick="edit_form_hour(' + service.id  +');"  >Edit</button></div>').appendTo('#sub_div');	
		$('<div class="col-lg-5"><a class="btn btn-danger"  onclick="service_controller_delete_hour(' + service.id  +');"  >Delete</a></div>').appendTo('#sub_div');
		
	}
	if(service.beginning != undefined){
		
		$('<div class="form-group" id="row_10" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Beginning: &nbsp;</b></span>").appendTo('#row_10');
		jQuery("<span class='col-lg-4 control-label'>" + service.beginning + "</span>").appendTo('#row_10');
		
		$('<div class="form-group" id="row_11" /></div>').appendTo('#show_service_form');	
		jQuery("<span class='col-lg-2 control-label'><b>Ending: &nbsp;</b></span>").appendTo('#row_11');
		jQuery("<span class='col-lg-4 control-label'>" + service.ending + "</span>").appendTo('#row_11');
		$('<div id="sub_div" class="submit_div"></div>').appendTo('#show_service_form');
		$('<div id="my_map"></div>').appendTo('#show_service_form');
		
		$('<div class="form-group"><div class="col-lg-9 col-lg-offset-3" id="sub_div"></div></div>').appendTo('#show_service_form');	
		$('<div class="col-lg-5"><button class="btn btn-primary" onclick="edit_form_estate(' + service.id  +');"  >Edit</button></div>').appendTo('#sub_div');	
		$('<div class="col-lg-5"><a class="btn btn-danger"  onclick="service_controller_delete_estate(' + service.id  +');"  >Delete</a></div>').appendTo('#sub_div');
	}
	$("#my_map").width("600px").height("350px").gmap3({
		 map:{
		    options:{
		     center: [location.latitude, location.longitude],
		     zoom: 11
		    }
		 },
		 marker:{
		    latLng: [location.latitude, location.longitude],
		 }
		});

	

}
