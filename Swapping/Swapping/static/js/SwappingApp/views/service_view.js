function create_service(id_user)
{
	service_view_create_form(get_category(),id_user);
}
//var myDropzone = null;
function service_view_create_form(categoryList,id_user)
{
	body_clear();
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-service">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-service');
	
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_service" name="form_service" class="form-horizontal">').appendTo('#container-service');
	$('<h3>Create Service</h3><br>').appendTo('#form_service');
	///SwappingApp/new_service/
	$('<div class="span2"></div>').appendTo('form_service');
		        
//--------------------------------------------------------------------------------------------------------------------
	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;padding: 33px;padding-top:68px; height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_service');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_service');
    
	$('<div class="form-group" id="component_title">'+
			'<label id="service_title" class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label id="service_price" class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label id="service_available_places" class="col-lg-3 control-label">Available Places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group">'+
			'<label id="service_enable_swapping" class="col-lg-3 control-label">Enable swapping: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="enable_swapping" id="enable_swapping" onclick = "showPosibleSwapping(this);refreshLanguage();" >'+
			'</div>'+
	  '</div>'+
	  '<div class="form-group" id="area_swapping" style="display:none;">'+
		'<label id="option_swapping" class="col-lg-3 control-label">Option swapping</label>'+
			'<div class="col-lg-5">'+
				'<textarea id="wishSwap" name="wishSwap" class="form-control" placeholder="Write your swapping here, please." style="resize:none" ></textarea>'+
			'</div>'+
		'</div>'+
	'<div class="form-group" id="component_premium">'+
			'<label id="service_premium" class="col-lg-3 control-label">Premium: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="premium" id="premium" onclick="credit_premium('+id_user+');refreshLanguage();">'+
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
			'<label id="service_description" class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
		'</div>'+'<div class="form-group" id="component_location">'+
			'<label id="service_origin" class="col-lg-3 control-label">Origin: </label>'+
			'<div class="col-lg-5">'+
				'<input id="origen_address" name="origen_address" class="form-control" onChange="obtainCoorOrigen(this)" />'+
			'</div>'+
		'</div>'+
	'</div>'+
			'<input type="hidden" id="longitude" name="longitude" class="form-control"/>'+
			'<input type="hidden" id="latitude" name="latitude" class="form-control"/>'
		).appendTo('#form_service');
	
	
	$('<div class="form-group" id="component_radio_car">'+
		'<label id="service_car" class="col-lg-3 control-label">Transport service </label>'+
		'<div class="col-lg-5">'+
			'<input type="radio" name="service" id="service" value = "car" onclick="mostrarReferencia(this);refreshLanguage();">'+
		'</div>'+
	'</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_conversation" style="display:none;">'+
			'<label id="service_conversation" class="col-lg-3 control-label">Conversation: </label>'+
			'<div class="col-lg-5">'+
				'<select name="conversation" id="conversation">'+
					'<option value = "LOW_LEVEL">Low level</option>' +
					'<option value = "MEDIUM_LEVEL">Medium level</option>' +
					'<option value = "HIGH_LEVEL">High level</option>'+
				'</select>'+
			'</div>'+
	'</div>').appendTo('#form_service');
	
	$('</div>'+'<div class="form-group" id="component_destination_location" style="display:none;">'+
			'<label id="service_destination" class="col-lg-3 control-label">Destination: </label>'+
			'<div class="col-lg-5">'+
				'<input id="destination_address" name="destination_address" class="form-control" onChange="obtainCoorDestination(this)" />'+
			'</div>'+
		'</div>'+
	'</div>'+
				'<input type="hidden" id="dlongitude" name="dlongitude" class="form-control" style="display:none;"/>'+
				'<input type="hidden" id="dlatitude" name="dlatitude" class="form-control" style="display:none;"/>'+
	'<div class="form-group" id="component_pets" style="display:none;">'+
			'<label id="service_pets" class="col-lg-3 control-label">Pets: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="pets" id="pets">'+
			'</div>'+
	  '</div>'+
	  '<div class="form-group" id="component_baggage" style="display:none;">'+
		'<label id="service_baggage" class="col-lg-3 control-label">Baggage: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="baggage" id="baggage">'+
		'</div>'+
	   '</div>'+
	   '<div class="form-group" id="component_smoker" style="display:none;">'+
		'<label id="service_smoker" class="col-lg-3 control-label">Smoker: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="smoke" id="smoke">'+
		'</div>'+
	   '</div>'+
	  '</div>').appendTo('#form_service');
	var now = new Date();
	

	var hour = now.getHours() + ":" + now.getMinutes();
	$('<div class="form-group" id="component_moment" style="display:none;">'+
			'<label id="service_moment" class="col-lg-3 control-label">Moment: </label>'+
			'<div class="col-lg-3">'+
				'<input type="text" id="moment" name="moment" value="Date" class="form-control"/>'+
			'</div>'+
			'<div class="col-lg-3 input-group clockpicker" style="margin-top: -20px;">'+
    '<input id="moment_hour" name="moment_hour" type="text" class="form-control" value="' + hour + '">'+
    '<span class="input-group-addon">'+
       ' <span class="glyphicon glyphicon-time"></span>'+
    '</span>'+
'</div>'+
	  '</div>').appendTo('#form_service');
	
	$('.clockpicker').clockpicker
	(
			{
				autoclose: true,
				'default': hour
			}
	);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	
	$('#moment').datepicker
	 (
			 {
				 onRender: function(date)
				 {
					 return date.valueOf() < now.valueOf() ? 'disabled' : '';
				 }
			 }
	 );
	 


	
	$('<div class="form-group" id="component_radio_hour">'+
			'<label id="service_hour" class="col-lg-3 control-label">Hour service </label>'+
			'<div class="col-lg-5">'+
				'<input type="radio" name="service" id="service" value = "hour" onclick="mostrarReferencia(this);refreshLanguage();">'+
			'</div>'+
		'</div>').appendTo('#form_service');
	
	$('<div class="form-group" id="component_day_of_week" style="display:none;">'+
			'<label id="service_day_of_week" class="col-lg-3 control-label">Day of week: </label>'+
			'<div class="col-lg-5">'+
			'<select name="day_of_week" id="day_of_week" class="form-control">'+
			'<option value = "1">Monday</option>' +
			'<option value = "2">Tuesday</option>' +
			'<option value = "3">Wednesday</option>'+
			'<option value = "4">Thursday</option>'+
			'<option value = "5">Friday</option>'+
			'<option value = "6">Saturday</option>'+
		'</select>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_duration" style="display:none;">'+
			'<label id="service_duration" class="col-lg-3 control-label">Duration (hours): </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="duration" name="duration" class="form-control" min = "0"/>'+
			'</div>'+
	  '</div>').appendTo('#form_service');
	
	 $('<div class="form-group" id="component_radio_estate">'+
			'<label id="service_estate" class="col-lg-3 control-label">Estate service </label>'+
			'<div class="col-lg-5">'+
				'<input type="radio" name="service" id="service" value = "estate" onclick="mostrarReferencia(this);refreshLanguage();">'+
			'</div>'+
		'</div>').appendTo('#form_service');

     
	 $('<div class="form-group" id="component_beginning" style="display:none;">'+
				'<label class="col-lg-3 control-label">Date of beginning: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="beginning" name="beginning" class="form-control"/>'+
				'</div>'+
		  '</div>'+
		
		'<div class="form-group" id="component_ending" style="display:none;">'+
				'<label class="col-lg-3 control-label">Moment: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="ending" name="ending" class="form-control"/>'+
				'</div>'+
		  '</div>').appendTo('#form_service');

	 //jQuery('.datepicker').datepicker();
	 
	 $('<center><div class="form-group">'+
			'<div id="sub_div" class="col-lg-9">'+
	 			'<br><br><button type="submit" id="save" onclick="service_controller_create_service();refreshLanguage();" class="btn btn-primary" disabled="true">Save</button>'+
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
				myDropzone = this;

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
				  display_error_notification('Error', "You entered an oversize image", 'fa fa-check');
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
	var service = service_controller_show_hour(id,true);
	var id_user = service.user.id;
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-hour">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-hour');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_hour" name="form_hour"  class="form-horizontal">').appendTo('#container-hour');
	$('<h3 id="edit_button" class=titleh3>Edit</h3><br>').appendTo('#form_hour');
	        
//--------------------------------------------------------------------------------------------------------------------
//	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
//	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_hour');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_hour');

	$('<div class="form-group" id="component_title">'+
		'<label id="service_title" class="col-lg-3 control-label">Title: </label>'+
		'<div class="col-lg-5">'+
			'<input type="text" id="title" name="title" class="form-control"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_price">'+
		'<label id="service_price" class="col-lg-3 control-label">Price: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
		'</div>'+
	'</div>'+


	'<div class="form-group" id="component_avaiable_place">'+
		'<label id="service_available_places" class="col-lg-3 control-label">Available Places: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_enable">'+
		'<label id=\"service_enable_swapping\" for="enable_swapping" class=\"col-lg-3 control-label\">Enable swapping?: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="enable_swapping" id="enable_swapping" onclick = "showPosibleSwappingHour(this)" >'+
		'</div>'+
	'</div>'+
	'<div class="form-group" id="area_swapping">'+
		'<label id="option_swapping" class="col-lg-3 control-label">Option swapping</label>'+
		'<div class="col-lg-5">'+
			'<textarea id="wishSwap" name="wishSwap" class="form-control" placeholder="Write your swapping here, please." style="resize:none" ></textarea>'+
		'</div>'+
	'</div>').appendTo('#form_hour');
	if (service.premium == false){
		$('<div class="form-group" id="component_premium">'+
				'<label id="service_premium" class="col-lg-3 control-label">Premium: </label>'+
				'<div class="col-lg-5">'+
					'<input type="checkbox" name="premium" id="premium" onclick="credit_premium_hour('+id_user+');refreshLanguage();">'+
				'</div>'+
			'</div>').appendTo('#form_hour');
	}
	
	$('<div class="form-group" id="component_category">'+
		'<label id="service_category" class="col-lg-3 control-label">Category:  </label>'+
		'<div class="col-lg-5">'+
			'<select name="category" id="category">').appendTo('#form_hour');
		for(i in categoryList){	
			$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
		}	
	$('</select></div>'+'</div>').appendTo('#form_hour');


	$('<div class="form-group" id="component_description" >'+
		'<label id="service_description" class="col-lg-3 control-label">Description: </label>'+
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
			'<label id="service_day_of_week" class="col-lg-3 control-label">Day of week: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="day_of_week" name="day_of_week" class="form-control" min = "1" max ="7"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_duration" >'+
			'<label id="service_duration" class="col-lg-3 control-label">Duration in hour: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="duration" name="duration" class="form-control" min = "0"/>'+
			'</div>'+
	  '</div>').appendTo('#form_hour');
	


	
	service_view_fulfill_form(service);
 	$('<center><div class="form-group">'+
		'<div id="sub_div" class="col-lg-9">'+
 			'<br><br><button type="submit" onclick="service_controller_update_hour(' + id + ');refreshLanguage();" class="btn btn-primary">Save</button>'+
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
			myDropzone = this;
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
			  display_error_notification('Error', "You entered an oversize image", 'fa fa-check');
			  //window.location.href = 'http://127.0.0.1:8000/home';
		
		});
	
	myDropzone.on("addedfile", function(file) {
		  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
		});
	var photourls = service_controller_get_photo(service.id, true).urls;
	for (i in photourls){
		var mockFile = { name: photourls[i], size: 12345 };
		myDropzone.options.addedfile.call(myDropzone, mockFile);
		myDropzone.options.thumbnail.call(myDropzone, mockFile, photourls[i]);
	}
	//----------------------------------------------------------------------------------------------------------------------
 
}
function edit_form_car(id){
	car_view_edit_form(id,get_category());
}
function car_view_edit_form(id,categoryList)
{
	body_clear();

	var service = service_controller_show_car(id,true);
	var id_user = service.user.id;
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-car">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-car');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_car" name="form_car"  class="form-horizontal">').appendTo('#container-car');
	$('<h3 id="edit_button" class=titleh3>Edit</h3><br>').appendTo('#form_hour');
		        
//--------------------------------------------------------------------------------------------------------------------
//	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
//	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_car');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_car');
    
	$('<div class="form-group" id="component_title">'+
			'<label id="service_title" class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label id="service_price" class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label id="service_available_places" class="col-lg-3 control-label">Available Places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	  '<div class="form-group" id="component_enable">'+
		'<label id="service_enable_swapping" class="col-lg-3 control-label">Enable swapping?: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="enable_swapping" id="enable_swapping" onclick = "showPosibleSwappingCar(this)" >'+
			'</div>'+
		'</div>'+
		'<div class="form-group" id="area_swapping">'+
			'<label id="option_swapping" class="col-lg-3 control-label">Option swapping</label>'+
			'<div class="col-lg-5">'+
				'<textarea id="wishSwap" name="wishSwap" class="form-control" placeholder="Write your swapping here, please." style="resize:none" ></textarea>'+
			'</div>'+
	'</div>').appendTo('#form_car');
	  if (service.premium == false){
			$('<div class="form-group" id="component_premium">'+
					'<label id="service_premium" class="col-lg-3 control-label">Premium: </label>'+
					'<div class="col-lg-5">'+
						'<input type="checkbox" name="premium" id="premium" onclick="credit_premium_car('+id_user+');refreshLanguage();">'+
					'</div>'+
				'</div>').appendTo('#form_car');
		}
     
	$('<div class="form-group" id="component_category">'+
			'<label id="service_category" class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="category" id="category">').appendTo('#form_car');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
    }	
    $('</select></div>'+'</div>').appendTo('#form_car');
  
	
	$('<div class="form-group" id="component_description">'+
			'<label id="service_description" class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
	'</div>'+'<div class="form-group" id="component_longitude" style="display:none;">'+
		'<label id="service_longitude" class="col-lg-3 control-label">Longitude of origin: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude" style="display:none;">'+
		'<label id="service_latitude" class="col-lg-3 control-label">Latitude of origin: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_car');
	
	$('<div class="form-group" id="component_conversation">'+
			'<label id="service_conversation" class="col-lg-3 control-label">Conversation: </label>'+
			'<div class="col-lg-5">'+
				'<select name="conversation" id="conversation">'+
					'<option value = "LOW_LEVEL">Low level</option>' +
					'<option value = "MEDIUM_LEVEL">Medium level</option>' +
					'<option value = "HIGH_LEVEL">High level</option>'+
				'</select>'+
			'</div>'+
	'</div>').appendTo('#form_car');
	$('<div class="form-group" id="component_destination_longitude" style="display:none;">'+
			'<label id="service_dlongitude" class="col-lg-3 control-label">Longitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlongitude" name="dlongitude" class="form-control" min = "-180" max ="180"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_destination_latitude" style="display:none;">'+
			'<label id="service_dlatitude" class="col-lg-3 control-label">Latitude of destination: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="dlatitude" name="dlatitude" class="form-control" min = "-90" max ="90"/>'+
			'</div>'+
	  '</div>'+
	'<div class="form-group" id="component_pets" >'+
			'<label id="service_pets" class="col-lg-3 control-label">Pets: </label>'+
			'<div class="col-lg-5">'+
				'<input type="checkbox" name="pets" id="pets" >'+
			'</div>'+
	  '</div>'+
	  '<div class="form-group" id="component_baggage">'+
		'<label id="service_baggage" class="col-lg-3 control-label">Baggage: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="baggage" id="baggage" >'+
		'</div>'+
	   '</div>'+
	   '<div class="form-group" id="component_smoker">'+
		'<label id="service_smoker" class="col-lg-3 control-label">Smoker: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="smoke" id="smoke" >'+
		'</div>'+
	   '</div>').appendTo('#form_car');
	 
	 service_view_fulfill_form(service);
	 $('<center><div class="form-group">'+
		'<div id="sub_div" class="col-lg-9">'+
	 		'<br><br><button type="submit" onclick="service_controller_update_car(' + id + ');refreshLanguage();" class="btn btn-primary">Save</button>'+
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
				myDropzone = this;
				
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
				  display_error_notification('Error', "You entered an oversize image", 'fa fa-check');
				  //window.location.href = 'http://127.0.0.1:8000/home';
			
			});
		
		myDropzone.on("addedfile", function(file) {
			  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
			});
		var photourls = service_controller_get_photo(service.id, true).urls;
		for (i in photourls){
			var mockFile = { name: photourls[i], size: 12345 };
			myDropzone.options.addedfile.call(myDropzone, mockFile);
			myDropzone.options.thumbnail.call(myDropzone, mockFile, photourls[i]);
		} 
		//----------------------------------------------------------------------------------------------------------------------
}
function edit_form_estate(id){
	estate_view_edit_form(id,get_category());
}
function estate_view_edit_form(id,categoryList)
{
	body_clear();
	var service = service_controller_show_estate(id,true);
	var id_user = service.user.id;
	$('<div class="span2">').appendTo('#content-body');
	$('<div id="container-estate">').appendTo('#content-body');
	$('<div class="span2">').appendTo('#container-estate');
	$('<form enctype="multipart/form-data" method="POST" action="#" id="form_estate" name="form_estate"  class="form-horizontal">').appendTo('#container-estate');
	$('<h3 id="edit_button" class=titleh3>Edit</h3><br>').appendTo('#form_hour');
		        
//--------------------------------------------------------------------------------------------------------------------
//	$('<div id="my-dropzone" name="my-dropzone" style="background-repeat:no-repeat;height:244px;width:776px;min-height:150px;background-image: url(../../static/images/rpoduct_drop.jpg);">'+
//	'<input name="image" id="image" type="file" multiple style="overflow: hidden;display:none;" /></div>').appendTo('#form_estate');	
//-------------------------------------------------------------------------------------------------------------------
	$('</div></div><br><br>').appendTo('#form_estate');
    
	$('<div class="form-group" id="component_title">'+
			'<label id="service_title" class="col-lg-3 control-label">Title: </label>'+
			'<div class="col-lg-5">'+
				'<input type="text" id="title" name="title" class="form-control"/>'+
			'</div>'+
	  '</div>'+
	
	'<div class="form-group" id="component_price">'+
			'<label id="service_title" class="col-lg-3 control-label">Price: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" id="price" name="price" class="form-control" min="0"/>'+
			'</div>'+
	  '</div>'+
    
	
	'<div class="form-group" id="component_avaiable_place">'+
			'<label id="service_available_places" class="col-lg-3 control-label">Available places: </label>'+
			'<div class="col-lg-5">'+
				'<input type="number" name="available_places" id="available_places" class="form-control" min="1" >'+
			'</div>'+
	  '</div>'+
	
	  '<div class="form-group" id="component_enable">'+
		'<label id="service_enable_swapping" class="col-lg-3 control-label">Available for Swapping: </label>'+
		'<div class="col-lg-5">'+
			'<input type="checkbox" name="enable_swapping" id="enable_swapping" onclick = "showPosibleSwappingEstate(this);refreshLanguage();" >'+
		'</div>'+
		'</div>'+
		'<div class="form-group" id="area_swapping">'+
			'<label id="option_swapping" class="col-lg-3 control-label">Option swapping</label>'+
			'<div class="col-lg-5">'+
				'<textarea id="wishSwap" name="wishSwap" class="form-control" placeholder="Write your swapping here, please." style="resize:none" ></textarea>'+
			'</div>'+
	'</div>').appendTo('#form_estate');
	  if (service.premium == false){
			$('<div class="form-group" id="component_premium">'+
					'<label id="service_premium" class="col-lg-3 control-label">Premium: </label>'+
					'<div class="col-lg-5">'+
						'<input type="checkbox" name="premium" id="premium" onclick="credit_premium_estate('+id_user+');refreshLanguage();">'+
					'</div>'+
				'</div>').appendTo('#form_estate');
		}
     
	$('<div class="form-group" id="component_category">'+
			'<label id="service_category" class="col-lg-3 control-label">Category:  </label>'+
			'<div class="col-lg-5">'+
				'<select name="category" id="category">').appendTo('#form_estate');
    for(i in categoryList){	
    	$('<option value='+categoryList[i]+'>'+categoryList[i]+'</option>').appendTo('#category');
    }	
    $('</select></div>'+'</div>').appendTo('#form_estate');
  
	
	$('<div class="form-group" id="component_description">'+
			'<label id="service_description" class="col-lg-3 control-label">Description: </label>'+
			'<div class="col-lg-5">'+
				'<textarea id="description" name="description" rows="4" cols="50" placeholder="Write your message here, please." style="resize:none"></textarea>'+
			'</div>'+
	'</div>'+'<div class="form-group" id="component_longitude" style="display:none;">'+
		'<label id="service_longitude" class="col-lg-3 control-label">Longitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="longitude" name="longitude" class="form-control" min = "-180" max ="180"/>'+
		'</div>'+
	'</div>'+

	'<div class="form-group" id="component_latitude" style="display:none;">'+
		'<label id="service_latitude" class="col-lg-3 control-label">Latitude of origen: </label>'+
		'<div class="col-lg-5">'+
			'<input type="number" id="latitude" name="latitude" class="form-control" min = "-90" max ="90"/>'+
		'</div>'+
	'</div>').appendTo('#form_estate');
	
     
	 $('<div class="form-group" id="component_beginning">'+
				'<label id="date_of_beginning" class="col-lg-3 control-label">Date of beginning: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="beginning" name="beginning" class="form-control"/>'+
				'</div>'+
		  '</div>'+
		
		'<div class="form-group" id="component_ending">'+
				'<label id="date_of_ending" class="col-lg-3 control-label">Date of ending: </label>'+
				'<div class="col-lg-5">'+
					'<input type="text" id="ending" name="ending" class="form-control"/>'+
				'</div>'+
		  '</div>').appendTo('#form_estate');
	 jQuery('.datepicker').datepicker();
	 
	 $('<center><div class="form-group">'+
				'<div id="sub_div" class="col-lg-9">'+
			 		'<br><br><button type="submit" onclick="service_controller_update_estate(' + id + ');refreshLanguage();" class="btn btn-primary">Save</button>'+
			 	'</div></div></center></form>').appendTo('#form_estate');
	 
	 
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
				myDropzone = this;
				
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
function credit_premium(id){
	if (document.form_service.premium.checked){
		var user = user_controller_get(id,true);
		if(user.credits == 0){
			display_success_notification("Credits","You do not have enough credits to make this premium product",null);
			$("#premium").prop('checked', false);
		}else{
			display_success_notification("Credits","You have: "+user.credits+" credits",null);
		}
	}
}
function credit_premium_hour(id){
	if (document.form_hour.premium.checked){
		var user = user_controller_get(id,true);
		if(user.credits == 0){
			display_success_notification("Credits","You do not have enough credits to make this premium product",null);
			$("#premium").prop('checked', false);
		}else{
			display_success_notification("Credits","You have: "+user.credits+" credits",null);
		}
	}
}
function credit_premium_car(id){
	if (document.form_car.premium.checked){
		var user = user_controller_get(id,true);
		if(user.credits == 0){
			display_success_notification("Credits","You do not have enough credits to make this premium product",null);
			$("#premium").prop('checked', false);
		}else{
			display_success_notification("Credits","You have: "+user.credits+" credits",null);
		}
	}
}
function credit_premium_estate(id){
	if (document.form_estate.premium.checked){
		var user = user_controller_get(id,true);
		if(user.credits == 0){
			display_success_notification("Credits","You do not have enough credits to make this premium product",null);
			$("#premium").prop('checked', false);
		}else{
			display_success_notification("Credits","You have: "+user.credits+" credits",null);
		}
	}
}
function showPosibleSwapping(swapping){
	if(document.form_service.enable_swapping.checked){
		document.getElementById("area_swapping").style.display = "inline";
	}else{
		document.getElementById("area_swapping").style.display = "none";
	}
}
function showPosibleSwappingHour(swapping){
	if(document.form_hour.enable_swapping.checked){
		document.getElementById("area_swapping").style.display = "inline";
	}else{
		document.getElementById("area_swapping").style.display = "none";
	}
}
function showPosibleSwappingCar(swapping){
	if(document.form_car.enable_swapping.checked){
		document.getElementById("area_swapping").style.display = "inline";
	}else{
		document.getElementById("area_swapping").style.display = "none";
	}
}
function showPosibleSwappingEstate(swapping){
	if(document.form_estate.enable_swapping.checked){
	document.getElementById("area_swapping").style.display = "inline";
	}else{
		document.getElementById("area_swapping").style.display = "none";
	}
}
function mostrarReferencia(elemento) {
	document.getElementById("component_conversation").style.display = "none";
	document.getElementById("component_destination_location").style.display = "none";
    document.getElementById("dlongitude").style.display = "none";
    document.getElementById("dlatitude").style.display = "none";
    document.getElementById("component_pets").style.display = "none";
    document.getElementById("component_baggage").style.display = "none";
    document.getElementById("component_smoker").style.display = "none";
    document.getElementById("component_moment").style.display = "none";
    document.getElementById("component_beginning").style.display = "none";
    document.getElementById("component_ending").style.display = "none";
    document.getElementById("component_day_of_week").style.display = "none";
	document.getElementById("component_duration").style.display = "none";
  if (elemento.value=="car") {
	  $('#save').prop('disabled',true);
	  document.getElementById("component_destination_location").style.display = "inline";
	  document.getElementById("component_conversation").style.display = "inline";
	    document.getElementById("dlongitude").style.display = "inline";
	    document.getElementById("dlatitude").style.display = "inline";
	    document.getElementById("component_pets").style.display = "inline";
	    document.getElementById("component_baggage").style.display = "inline";
	    document.getElementById("component_smoker").style.display = "inline";
	    document.getElementById("component_moment").style.display = "inline";
  }if (elemento.value=="hour") {
	  	document.getElementById("component_day_of_week").style.display = "inline";
	    document.getElementById("component_duration").style.display = "inline";
  }if (elemento.value=="estate"){
	  document.getElementById("component_beginning").style.display = "inline";
	    document.getElementById("component_ending").style.display = "inline";
   }

}
function service_view_fulfill_form(service)
{	
	//First line is different because jQuery causes conflict
	$("input[name=title]").val(service.title);
	jQuery('#description').val(service.description);
	jQuery('#enable').val(service.enable_swapping);
	jQuery('#available_places').val(service.available_places);
	jQuery('#area_swapping').val(service.wishSwap);
	jQuery('#price').val(service.price);
	//jQuery('#image').val(service_controller_get_photo(service.id, true).urls);
	jQuery('#longitude').val(service.venue.longitude);
	jQuery('#latitude').val(service.venue.latitude);
	
	if(service.day_of_week != undefined){
		jQuery('#day_of_week').val(service.day_of_week);
		jQuery('#duration').val(service.duration);
	}
	if(service.destination != undefined){
		jQuery('#conversation').val(service.conversation);
		jQuery('#dlongitude').val(service.destination.longitude);
		jQuery('#dlatitude').val(service.destination.latitude);
	}
	if(service.beginning != undefined){
		jQuery('#beginning').val(service.beginning);
		jQuery('#ending').val(service.ending);
	}
}
function service_view_show(service)
{
	
	body_clear();
	
	
	jQuery('<div id="show_service_form" class="col-lg-12 col-xs-12 col-sm-12 col-xs-12"><h2 class="titleh2">Properties</h2></div>').appendTo('#content-body');
    
	jQuery('<div class=" col-lg-5 col-md-5 col-sm-5 col-xs-12 portfolio-item" id="container_image" >').appendTo('#show_service_form');
	jQuery('<div class="well">'+
	        '<div id="carousel-service-image" class="carousel slide" data-ride="carousel" style="height: 226px;">'+
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
	var str = photoURL.urls;
	var miArray = eval(str);
	if(miArray.length == 0)
	{
		$('<li data-target="#carousel-service-image" data-slide-to="0" class="active"></li>').appendTo("#indicators");
        $('<div class="item active"><img style="width:100%;" src="/static/images/default.jpg" alt=""></div>').appendTo("#inner");
	}
	for(var i=0;i<miArray.length;i++)
	{
		if (i == 0)
		{
			$('<li data-target="#carousel-service-image" data-slide-to="'+i+'" class="active"></li>').appendTo("#indicators");
	        $('<div class="item active"><img style="margin-left: auto;margin-right: auto;"  src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}
		else
		{
			$('<li data-target="#carousel-service-image" data-slide-to="'+i+'"></li>').appendTo("#indicators");
			$('<div class="item"><img style="margin-left: auto;margin-right: auto;"  src="'+miArray[i]+'" alt=""></div>').appendTo("#inner");
		}
	}
	
	$('<div id="container-description" class="form-group col-sm-7 col-md-7 col-xs-12 col-lg-7" id="row_1"/></div>').appendTo('#show_service_form');	
	
	$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_1"/></div>').appendTo('#container-description');	
	jQuery("<span class='col-lg-3 col-md-5 col-sm-4 col-xs-3 control-label'><b id='service_title'>Title: &nbsp;</b></span>").appendTo('#row_1');
	jQuery("<span class='col-lg-9 col-md-7 col-sm-8 col-xs-9 control-label'>" + service.title + "</span>").appendTo('#row_1');
	$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_2"/></div>').appendTo('#container-description');	
	jQuery("<span  class='col-lg-3 col-md-4 col-sm-4 col-xs-5 control-label'><b id='service_description' >Description: &nbsp;</b></span>").appendTo('#row_2');
	jQuery("<span  class='col-lg-9 col-md-8 col-sm-8 col-xs-7 control-label'><p class = 'content_p'>"+ service.description + "</p></span>").appendTo('#row_2');

	
	$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_3"/></div>').appendTo('#container-description');	
	jQuery("<span  class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_price' >Price: &nbsp;</b></span>").appendTo('#row_3');
	jQuery('<span  class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label"><p>' + service.price + '<span class="currency">&euro;</span></p></span>').appendTo('#row_3');
	jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_places' >Places: &nbsp;</b></span>").appendTo('#row_3');
	jQuery("<span class='col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label'>" + service.available_places + "</span>").appendTo('#row_3');
	if (service.wishSwap.length > 0)
	{
		$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_5" /></div>').appendTo('#container-description');	
		jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_swapping' >Swapping: &nbsp;</b></span>").appendTo('#row_5');
		jQuery("<span class='col-lg-9 col-md-9 col-sm-9 col-xs-9 control-label'><p class = 'content_p'>" + service.wishSwap + "</p></span>").appendTo('#row_5');
	}
	
	
	$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_6" /></div>').appendTo('#container-description');	
	jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_category' >Category: &nbsp;</b></span>").appendTo('#row_6');
	jQuery("<span class='col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label'>" + service.category + "</span>").appendTo('#row_6');	
	jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_premium'>Premium: &nbsp;</b></span>").appendTo('#row_6');
	jQuery("<span class='col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label'>" + (service.premium?'Yes':'No') + "</span>").appendTo('#row_6');
	
	var user_logged = user_controller_logged();
	if(user_logged != undefined){
		 var user_logged_id = user_logged[0].pk;
	}
	
	if(service.user.id == user_logged_id){
	
		//Comentado para la demo
		//jQuery('<a href="#" class=" btn btn-info bt-sm col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="product_controller_add_service_wish('+service.id+');">Add to wish list</a>').appendTo('#row_7');
		var serviceActiveOn = service.active_on.split("/");
		var serviceActiveOnDate = new Date();
		serviceActiveOnDate.setFullYear(serviceActiveOn[2]);
		serviceActiveOnDate.setMonth(serviceActiveOn[1]-1);
		serviceActiveOnDate.setDate(serviceActiveOn[0]);
	
	    var activeToday = serviceActiveOnDate.setHours(0,0,0,0)>=new Date().setHours(0,0,0,0);
	if(activeToday)
	{
			$('<div class=" form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_10" /></div>').appendTo('#container-description');	
			jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><b id="service_status" >Status: &nbsp;</b></span>').appendTo('#row_10');
			jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><span id="service_active" class="label label-success">ACTIVE</span></span>').appendTo('#row_10');
			jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><b id="service_displayed" >Displayed: &nbsp;</b></span>').appendTo('#row_10');
		if(service.active)
		{
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><span id="service_yes" style="cursor:pointer" onclick="product_controller_set_Display('+service.id+','+"false"+',\'s\',returnLang());refreshLanguage();" class="label label-success">YES</span>').appendTo('#row_10');
		}
		else
		{
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label"><span id="service_no" style="cursor:pointer" onclick="product_controller_set_Display('+service.id+','+"true"+',\'s\',returnLang());refreshLanguage();" class="label label-danger">NO</span>').appendTo('#row_10');
			}
	}
	else
	{			
				$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_11" /></div>').appendTo('#container-description');	
				jQuery('<span class="col-lg-2 col-xs-3 control-label"><b id="service_status">Status: &nbsp;</b></span>').appendTo('#row_11');
				jQuery('<span class="col-lg-4 col-md-5 col-xs-5 control-label"><span id="service_notactive" class="label label-danger">NOT ACTIVE</span></span>').appendTo('#row_11');
				jQuery('<span class="col-lg-3 col-md-3 col-sm-3 col-xs-2 control-label"><a id="service_b_renew" style="cursor:pointer" class="label label-success"  onclick="product_controller_renew('+service.id+',\'s\',returnLang());refreshLanguage();">Renew!</a></span>').appendTo('#row_11');
		}	}
	if(service.conversation != undefined)
	{
		var conversation = '';
		switch (service.conversation)
        {
	        case "HIGH_LEVEL" :
		        conversation = '<i class="fa fa-comments-o"></i><i class="fa fa-comments-o"></i>';
		        break;
		
	        case "MEDIUM_LEVEL" :
		        conversation = '<i class="fa fa-comments-o"></i>';
		        break;
		
	        case "LOW_LEVEL" :
		        conversation = '<i class="fa fa-comment-o"></i>';
		        break;
		
	        default :
		        break;
        }
		$('<div class="form-group col-xs-12 col-lg-12 col-md-12 col-sm-12" id="row_9" /></div>').appendTo('#container-description');	
		jQuery("<span class='col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label'><b id='service_conversation'>Conversation: &nbsp;</b></span>").appendTo('#row_9');
		jQuery("<span class='col-lg-2  col-md-2 col-sm-2 col-xs-2 control-label'>" + conversation + "</span>").appendTo('#row_9');
		jQuery("<span class='col-lg-3  col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_pets'>Pets: &nbsp;</b></span>").appendTo('#row_9');
		jQuery("<span class='col-lg-3  col-md-3 col-sm-3 col-xs-3 control-label'>" + (service.pets?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_9');
		
		$('<div class="form-group col-xs-12 col-lg-12 col-md-12 col-sm-12" id="row_12" /></div>').appendTo('#container-description');	
		jQuery("<span class='col-lg-4 col-sm-4 col-md-4 col-xs-4 control-label'><b id='service_baggage'>Baggage: &nbsp;</b></span>").appendTo('#row_12');
		jQuery("<span class='col-lg-2 col-sm-2 col-md-2 col-xs-2 control-label'>" + (service.baggage?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_12');
		jQuery("<span class='col-lg-4 col-sm-4 col-md-4 col-xs-4 control-label'><b id='service_smoker'>Smoker: &nbsp;</b></span>").appendTo('#row_12');
		jQuery("<span class='col-lg-2 col-sm-2 col-md-2 col-xs-2 control-label'>" + (service.smoker?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>') + "</span>").appendTo('#row_12');
		
		if(service.user.id != user_logged_id && user_logged_id != undefined){
			$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_20" /></div>').appendTo('#container-description');	
			jQuery('<a href="#" class=" btn btn-info bt-sm col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="product_controller_add_service_wish('+service.id+');refreshLanguage();"><i class="fa fa-heart-o"></i> Add to wish list</a>').appendTo('#row_20');
		}
		$('<div  class="google-map-canvas" id="map-canvas1" style="border: 1px solid silver;border-radius: 9px;">-</div>').appendTo('#content-body');
		
		if(service.user.id == user_logged_id){
			$('<div class="form-group col-xs-12"><div class="col-lg-12 col-xs-12 col-md-12" id="sub_div"></div></div>').appendTo('#container-description');	
			$('<div class="col-lg-3 col-md-4 col-xs-5"><button id="edit_button" class="btn btn-default" onclick="edit_form_car(' + service.id  +');refreshLanguage();"><i class=\"fa fa-pencil fa-fw\"></i>Edit</button></div>').appendTo('#sub_div');	
			$('<div class="col-lg-4 col-md-4 col-xs-4"><a id="delete_button" class="btn btn-default"  name="deletear" id="deletear" data-toggle="confirmation"  ><i class="fa fa-times"></i>Delete</a></div>').appendTo('#sub_div');
		
			$('#deletear').confirmation({
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
			                	service_controller_delete_car(service.id);
			                }, // Set event when click at confirm button
			                onCancel: function(){}// Set event when click at cancel button
				}) ;
			}
		$("#map-canvas1").width("98%").height($(window).width()/4 + "px");
		var myLatlng;
		var geocoder = new google.maps.Geocoder();
		 
					myLatlng = new google.maps.LatLng(service.venue.latitude, service.venue.longitude);
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
					  
					  

					map.setZoom( map.getZoom() - 1);
					map.setZoom( map.getZoom() + 1);
					google.maps.event.trigger(map, 'resize');

					  // also redefine center
					  map.setCenter(myLatlng);
					  
					  
									var myLatlng2 = new google.maps.LatLng(service.destination.latitude, service.destination.longitude);
									

									  // Instead of a function scoped map variable this should be global
									  google.maps.event.addListener(map, "idle", function()
											  {
												google.maps.event.trigger(map, 'resize'); 
										});	
									  
									  
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
									map.setZoom( map.getZoom() - 1);
									map.setZoom( map.getZoom() + 1);
									google.maps.event.trigger(map, 'resize');

									  // also redefine center
									  map.setCenter(myLatlng);
								
					  
				
	
	}
	if(service.day_of_week != undefined)
	{
		var day = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		$('<div class="form-group  col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_19" /></div>').appendTo('#container-description');	
		jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'><b id='service_day_of_week'>Day of week: &nbsp;</b></span>").appendTo('#row_19');
		jQuery("<span class='col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label'>" + day[service.day_of_week] + "</span>").appendTo('#row_19');
		
		jQuery("<span class='col-lg-3 col-md-4 col-sm-4 col-xs-4 control-label' style='word-wrap: break-word;'><b id='service_duration'>Duration (hours): &nbsp;</b></span>").appendTo('#row_19');
		jQuery("<span class='col-lg-3 col-md-2 col-sm-2 col-xs-2 control-label'>" + service.duration + "</span>").appendTo('#row_19');
		if(service.user.id != user_logged_id && user_logged_id != undefined){
			$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_20" /></div>').appendTo('#container-description');	
			jQuery('<a href="#" class=" btn btn-info bt-sm col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="product_controller_add_service_wish('+service.id+');refreshLanguage();"><i class="fa fa-heart-o"></i> Add to wish list</a>').appendTo('#row_20');
		}
		$('<div style="border: 1px solid silver;border-radius: 9px;" id="my_map"></div>').appendTo('#content-body');
		
		
		if(service.user.id == user_logged_id)
		{
			$('<div class="form-group"><div class="col-lg-12 col-md-12 col-xs-12" id="sub_div"></div></div>').appendTo('#container-description');	
			$('<div class="col-lg-3 col-md-3 col-xs-3"><button id="edit_button" class="btn btn-default"  onclick="edit_form_hour(' + service.id  +');refreshLanguage();"  ><i class=\"fa fa-pencil fa-fw\"></i>Edit</button></div>').appendTo('#sub_div');	
			$('<div class="col-lg-4 col-md-4 col-xs-4"><a id="delete_button" class="btn btn-default"  name="deletear" id="deletear" data-toggle="confirmation"  ><i class="fa fa-times"></i>Delete</a></div>').appendTo('#sub_div');
			
			$('#deletear').confirmation(
			{
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
					service_controller_delete_hour(service.id);
				}, // Set event when click at confirm button
				onCancel: function(){}// Set event when click at cancel button
				}) ;
		}
		
		
	}
	if(service.beginning != undefined)
	{
		
		$('<div class="form-group col-xs-12" id="row_15" /></div>').appendTo('#container-description');	
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b>Beginning: &nbsp;</b></span>").appendTo('#row_15');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + service.beginning + "</span>").appendTo('#row_15');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'><b>Ending: &nbsp;</b></span>").appendTo('#row_15');
		jQuery("<span class='col-lg-3 col-sm-3 col-xs-3 control-label'>" + service.ending + "</span>").appendTo('#row_15');
		if(service.user.id != user_logged_id && user_logged_id != undefined){
			$('<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="row_20" /></div>').appendTo('#container-description');	
			jQuery('<a href="#" class=" btn btn-info bt-sm col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="product_controller_add_service_wish('+service.id+');refreshLanguage();"><i class="fa fa-heart-o"></i> Add to wish list</a>').appendTo('#row_20');
		}
		$('<div id="my_map" class="" style="border: 1px solid silver;border-radius: 10px;"></div>').appendTo('#content-body');
		
		if(activeToday)
		{
			if(service.active)
			{
				jQuery("<span class='col-lg-2 control-label'><b>&nbsp;</b></span>").appendTo('#row_11');
				jQuery('<a class=" btn btn-info"  onclick="product_controller_set_Display('+service.id+','+"false"+',s,returnLang());refreshLanguage();">Not Display</a>').appendTo('#row11');
			}
			else
			{
				jQuery("<span class='col-lg-2 control-label'><b>&nbsp;</b></span>").appendTo('#row_11');
				jQuery('<a class=" btn btn-info"  onclick="product_controller_set_Display('+service.id+','+"true"+',s,returnLang());refreshLanguage();">Display</a>').appendTo('#row11');
			}
		}
		else
		{
			jQuery("<span class='col-lg-2 control-label'><b>&nbsp;</b></span>").appendTo('#row_11');
			jQuery('<a class=" btn btn-info"  onclick="product_controller_renew('+service.id+');refreshLanguage();">Renew</a>').appendTo('#row_11');
		}
		
		if(service.user.id == user_logged_id){
		$('<div class="form-group"><div class="col-lg-12 col-xs-12 col-md-12" id="sub_div"></div></div>').appendTo('#container-description');	
		$('<div class="col-lg-3 col-md-3 col-xs-3"><button id="edit_button" class="btn btn-default" onclick="edit_form_estate(' + service.id  +');refreshLanguage();"  ><i class=\"fa fa-pencil fa-fw\"></i>Edit</button></div>').appendTo('#sub_div');	
		$('<div class="col-lg-3 col-md-3 col-xs-3"><a class="btn btn-default"  name="deletear" id="delete_button" data-toggle="confirmation"  ><i class="fa fa-times"></i>Delete</a></div>').appendTo('#sub_div');
		
		$('#deletear').confirmation({
			placement: 'bottom', // How to position the confirmation - top | bottom | left | right
			trigger: 'click', // How confirmation is triggered - click | hover | focus | manual
			target : '_self', // Default target value if `data-target` attribute isn't present.
			href   : '#', // Default href value if `data-href` attribute isn't present.
			title: 'Are you sure?', // Default title value if `data-title` attribute isn't present
			template: '<div class="popover" style="top: 34px; left: -2.5px; display: block; width: 165px;">' +
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
				service_controller_delete_estate(service.id);
			}, // Set event when click at confirm button
			onCancel: function(){}// Set event when click at cancel button
			}) ;
		}
	}
	
	$("#my_map").width("98%").height("25em").gmap3(
			{
		 map:{
		    options:{
		     center: [service.venue.latitude, service.venue.longitude],
		     zoom: 11
		    }
		 },
		 marker:{
		    latLng: [service.venue.latitude, service.venue.longitude],
		 }
		});
	
	
	if (user_logged_id == service.user.id)
	{
		
		var map = document.getElementById('my_map');
		if (map != undefined)
			jQuery('#my_map').after('<table style="margin-left:0px" id="user-joined" class="table-responsive table"> <caption id="service_joined" class="titleh2">Who have joined</caption</table>');
		else
			jQuery('#map-canvas1').after('<table style="margin-left:0px" id="user-joined" class="table-responsive table"> <caption id="service_joined">Who have joined</caption</table>');
		
	jQuery('#user-joined').append('<thead><th id="user">User</th><th id="service_moment" >Moment:</th><th></th></thead>');
	
	jQuery('#user-joined').append('<tbody></tbody>');
	
	jQuery.each(service.swaps, 
			function (index, swap)
			{
				console.log(swap);
				var user = user_controller_get(swap.user, true);
				//swapping_without_controller_get(swap);
				var service_type = null;
				if(service.beginning != undefined)
				{
					service_type = 'Estate';
				}
				else if(service.destination != undefined)
				{
					service_type = 'Car';
				}
				else if(service.day_of_week != undefined)
				{
					service_type = 'Hour';
				}
					jQuery('#user-joined tbody').append('<tr><td><a style="cursor:pointer;" onclick="user_view_show_profile_data(' + user.id +');refreshLanguage();">' + user.username + '</a></td><td>' + swap.date +'</td><td><a id="delete-user-' + index + '" class="btn btn-danger" href="#"><i class="fa fa-trash-o fa-lg"></i></a></td></tr>');
					
					
					$('#delete-user-' + index).confirmation({
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
							swapping_without_money_controller_delete_service_swap( swap.id , service.id , '\'' +  service_type + '\'');
						}, // Set event when click at confirm button
						onCancel: function(){}// Set event when click at cancel button
			});
	
				});
	}
	
	
}

function show_all_service(id_user)
{
	body_clear();
	jQuery('<h3 id="list_services" class="titleh3">My Services</h3>').appendTo('#content-body');
	jQuery('<div id="tablas_all" name="tablas"></div>').appendTo('#content-body');

	get_all_estate_for_user(id_user);
	get_all_hour_for_user(id_user);
	get_all_car_for_user(id_user);
	
	jQuery('#content-body').append('<button id="button_create_service" style="margin-top:20px; margin-left:15px;" class="btn btn-primary"  value="modify_item" rel="tooltip" data-placement="right" onclick="create_service(' + id_user + ');refreshLanguage();">Create Service</button>');
	refreshLanguage();
	
}

function show_all_hour(id_user,items)
{
	
	
    //var items = get_all_hour_for_user(id_user);
	
	$('<div id="container-hour">').appendTo('#content-body');
	
    jQuery('<div id="tablas3" name="tablas" class="tables"></div>').appendTo('#tablas_all');
    jQuery('<br><h2 id="hour_services" class="titleh2">Hours expending services</h2><br>'+
    		'<table name="table_hours" id="table_hours" class="table table-striped" >'+
			'<thead>'+
			'<tr>'+
				'<th id = "images_hours" class="span1">'+
					'Images'+
				'</th>'+
				'<th id = "description_hours" class="span3">'+
					'Description of transport'+
				'</th>'+
				'<th id = "created_hours" class="span2">'+
					'Created'+
				'</th>'+
				'<th id = "category_hours" class="span2">'+
					'Category'+
				'</th>'+
				'<th id = "price_hours" class="span2">'+
					'Price'+
				'</th>'+				
				'<th id = "actions_hours" class="span2">'+
					'Actions'+
				'</th>'+
			'</tr>'+
		'</thead>'+
		'<tbody>').appendTo('#tablas3');
    var index = 1;

    for(var i in items){
    	url=service_controller_get_first_image_service(items[i].id);
    	urlfinal = url.url;
    	
    	if(urlfinal == null)
    	{
    		urlfinal = "/static/images/default.jpg"; 
    	}
	
    	jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="Link to product page">'+
    							'<img class="thumb" src="'+urlfinal+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: service_controller_show_hour('+items[i].id+');refreshLanguage();" title="Link to product page">'+items[i].title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+items[i].description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+items[i].created_on +'</td>'+
    					'<td class="span2">'+ items[i].category+'</td>'+	
    					'<td class="span2"> '+items[i].price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span1" colspan="2">'+
    					'<div class="col-lg-5"><a class="btn btn-danger"  name="deletear-'+i+'" id="deletear-'+i+'" data-toggle="confirmation">'+
    						'<i class="fa fa-trash-o"></i></a>'+
    					'</div>'+
	    				//'</td>'+
	    				//'<td class="span1">'+
    					'<div class="col-lg-5"><a class="btn btn-info"  rel="tooltip" data-placement="right" onclick="edit_form_hour('+items[i].id+');refreshLanguage();">'+
						'<i class="fa fa-pencil"></i></a>'+
					'</div>'+
    				'</td>'+
    				'</tr>').appendTo('#table_hours');
  
		
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
				service_controller_delete_hour(items[i].id);
			}, // Set event when click at confirm button
			onCancel: function(){}// Set event when click at cancel button
			}) ;
		
  
    }

	jQuery('#table_hours').append('</tbody></table>');
    jQuery('#figure_loading div').removeClass('spinner');
    
    refreshLanguage();
}

function show_all_car(id_user,items){
	
    //var items = get_all_car_for_user(id_user);
    jQuery('<div id="tablas" name="tablas" class="tables"></div>').appendTo('#tablas_all');
    jQuery('<br><h2 id="car_services" class="titleh2">Car services</h2><br>'+
    		'<table name="table_cars" id="table_cars" class="table table-striped" >'+
			'<thead>'+
			'<tr>'+
				'<th id = "images_cars" class="span1">'+
					'Images'+
				'</th>'+
				'<th id = "description_cars" class="span3">'+
					'Description of transport'+
				'</th>'+
				'<th id = "created_cars" class="span2">'+
					'Created'+
				'</th>'+
				'<th id = "category_cars" class="span2">'+
					'Category'+
				'</th>'+
				'<th id = "price_cars" class="span2">'+
					'Price'+
				'</th>'+				
				'<th id = "actions_cars" class="span2">'+
					'Actions'+
				'</th>'+
			'</tr>'+
		'</thead>'+
		'<tbody>').appendTo('#tablas');
    var index = 1;

    for(var i in items){	
    	
    	url=service_controller_get_first_image_service(items[i].id);
    	urlfinal = url.url;
    	
    	if(urlfinal == null){
    		urlfinal = "/static/images/default.jpg"; 
    	}
	
    	jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="Link to product page">'+
    							'<img class="thumb" src="'+urlfinal+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: service_controller_show_car('+items[i].id+');refreshLanguage();" title="Link to product page">'+items[i].title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+items[i].description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+items[i].created_on +'</td>'+
    					'<td class="span2">'+ items[i].category+'</td>'+	
    					'<td class="span2"> '+items[i].price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span1" colspan="2">'+
    					'<div class="col-lg-5"><a class="btn btn-danger"  name="deletear-'+i+'" id="deletear-'+i+'" data-toggle="confirmation">'+
							'<i class="fa fa-trash-o"></i></a>'+
						'</div>'+
	    				//'</td>'+
	    				//'<td class="span1">'+
    					'<div class="col-lg-5"><a class="btn btn-info"  rel="tooltip" data-placement="right" onclick="edit_form_car('+items[i].id+');refreshLanguage();">'+
						'<i class="fa fa-pencil"></i></a>'+
					'</div>'+
    				'</td>'+
    				'</tr>').appendTo('#table_cars');
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
				service_controller_delete_car(items[i].id);
			}, // Set event when click at confirm button
			onCancel: function(){}// Set event when click at cancel button
			}) ;
  
    }
    jQuery('#table_cars').append('</tbody></table>');
    jQuery('#figure_loading div').removeClass('spinner');
    refreshLanguage();
}
	
function show_all_estate(id_user,items){
	
    //var items = get_all_estate_for_user(id_user);
    jQuery('<div id="tablas2" name="tablas" class="tables"></div>').appendTo('#tablas_all');
    jQuery('<br><h2 id="estate_services" class="titleh2">Estate services</h2><br>'+
    		'<table name="table_estates" id="table_estates" class="table table-striped" >'+
			'<thead>'+
			'<tr>'+
					'<th id = "images_estates" class="span1">'+
						'Images'+
					'</th>'+
					'<th id = "description_estates" class="span3">'+
						'Description of transport'+
					'</th>'+
					'<th id = "created_estates" class="span2">'+
						'Created'+
					'</th>'+
					'<th id = "category_estates" class="span2">'+
						'Category'+
					'</th>'+
					'<th id = "price_estates" class="span2">'+
						'Price'+
					'</th>'+				
					'<th id = "actions_estates" class="span2">'+
						'Actions'+
				'</th>'+
			'</tr>'+
		'</thead>'+
		'<tbody>').appendTo('#tablas2');
    var index = 1;

    for(var i in items){	
    	
    	url=service_controller_get_first_image_service(items[i].id);
    	urlfinal = url.url;
    	
    	if(urlfinal == null){
    		urlfinal = "/static/images/default.jpg"; 
    	}
	
    	jQuery('		<tr>'+
    					'<td class="span1">'+
    						'<a href="#" title="Link to product page">'+
    							'<img class="thumb" src="'+urlfinal+'" title="Product Image"/>'+
    						'</a>'+
    					'</td>'+
    					'<td class="span3">'+
    						'<a id="title" href="javascript: service_controller_show_estate('+items[i].id+');refreshLanguage();" title="Link to product page">'+items[i].title+'</a>'+
    							'<div style="overflow:auto;width: 200px;overflow: hidden;overflow-x: scroll;">'+items[i].description+'</div>'+
    							
    					'</td>'+
    					'<td class="span2">'+items[i].created_on +'</td>'+
    					'<td class="span2">'+ items[i].category+'</td>'+	
    					'<td class="span2"> '+items[i].price+'<span></span><span class="currency">&euro;</span></td>'+
    					'<td class="span1" colspan="2">'+
    					'<div class="col-lg-5"><a class="btn btn-danger"  name="deletear-'+i+'" id="deletear-'+i+'" data-toggle="confirmation">'+
							'<i class="fa fa-trash-o"></i></a>'+
						'</div>'+
	    				//'</td>'+
	    				//'<td class="span1">'+
    					'<div class="col-lg-5"><a class="btn btn-info"  rel="tooltip" data-placement="right" onclick="edit_form_estate('+items[i].id+');refreshLanguage();">'+
						'<i class="fa fa-pencil"></i></a>'+
					'</div>'+
    				'</td>'+
    				'</tr>').appendTo('#table_estates');
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
				service_controller_delete_estate(items[i].id);
			}, // Set event when click at confirm button
			onCancel: function(){}// Set event when click at cancel button
			}) ;
  
    }
    jQuery('#table_estates').append('</tbody></table>');
    jQuery('#figure_loading div').removeClass('spinner');
    refreshLanguage();
}

function obtainCoorOrigen(){
	var address = document.getElementById("origen_address").value;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, 
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				$('#longitude').val(longitude);
				$('#latitude').val(latitude);
				if(latitude != undefined){
					$('#save').prop('disabled',false);
				}else{
					$('#save').prop('disabled',true);
				}
				
	    } 
	}); 
}
function obtainCoorDestination()
{
	var address = document.getElementById("destination_address").value;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, 
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				$('#dlongitude').val(longitude);
				$('#dlatitude').val(latitude);
				if(latitude != undefined){
					$('#save').prop('disabled',false);
				}else{
					$('#save').prop('disabled',true);
				}
	    } 
	}); 
}

function service_view_show_user_joined(swap)
{
	jQuery('#user-joined tbody').append('<tr><td>' + swap.results[0].user.username  + '</td><td>' + swap.results[0].date  + '</td></tr>');
}


function service_view_get_all_items(page_number)
{
	$('#home').removeClass('active');
	$('#items_view_container').removeClass('active');
	$('#services_view_container').addClass('active');
	service_controller_get_all(page_number);
}


function service_view_show_all_products(page_number,products)
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
			        	'<div class="input-group margin-bottom-sm">'+
			        		'<span class="input-group-addon"><i class="fa fa-location-arrow fa-fw"></i></span>'+
			        		'<input id="address-filter" class="form-control" type="text" placeholder="Address">'+
			        	'</div>'+
			    
			    '<div class="checkbox">'+
			      '<label id="swapping_allow">'+
			        '<input type="checkbox"> Allow swapping'+
			      '</label>'+
			    '</div>'+
			    '<div class="input-group">'+
			      '<span class="input-group-addon">'+
			        '<input  name="service-type" value="hours" type="radio">'+
			      '</span>'+
			      '<label id="hours_tag" class="form-control">Hours</label>'+
			      '<span class="input-group-addon">'+
			        '<input name="service-type" value="transports" type="radio">'+
			      '</span>'+
			      '<label id="transport_tag" class="form-control">Transport</label>'+
			      '<span class="input-group-addon">'+
			        '<input name="service-type" value="estates" type="radio">'+
			      '</span>'+
			      '<label id="estate_tag" class="form-control">Estates</label>'+
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
	
	$('#row1').find('*').show();
	$('#row2').find('*').show();
	$('#row3').find('*').show();
	$('#row1').show();
	$('#row2').show();
	$('#row3').show();
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
			jQuery('.pagination').append('<li id="pagination' + i + '" ' +  (i == page_number?'class="active"':'') + '><a onclick="service_controller_get_all(' + i + ');refreshLanguage();" href="#">' + i +'</a></li>');
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
					service_controller_get_all(1);
					refreshLanguage();
				}
		);
	}
	
	$('input[type="radio"]').click(function(){
	    if ($(this).is(':checked'))
	    {
	      var service_type = $(this).val();
	      service_controller_get_all_filtered('service_type',service_type);
	    }
	  });
	
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
					service_controller_get_all(1);
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
					service_controller_get_all(number_pages);
				}
		);
	}
	
	jQuery.each(products.products, 
			function (index, product)
			{
		console.log(product);
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
			    
			    if (product.moment != undefined)
			    {
			    	jQuery('.thumbnail').prepend('<div style="color: white;font: bold 14px/25px Helvetica, Sans-Serif;background: silver;position: absolute;border:2px solid silver;border-bottom-left-radius:2em;margin-left: 34.2%;width: 150px;text-align: right;padding-right: 5px;"><span>' + $.format.date(product.moment.substring(1,product.moment.length-1),"dd/MM/yyyy HH:mm") + '</span></div>');
			    }
			    
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
    
    
    $('#address-filter').keypress(
    		function()
    		{
    			var addressIntroduced = $('#address-filter').val();
    			if (addressIntroduced.length > 5)
    			{
    				var geocoder = new google.maps.Geocoder();
    				var result = "";
    				var result = geocoder.geocode( { 'address': addressIntroduced},
    						function(results, status)
    						{
    						     if (status == google.maps.GeocoderStatus.OK)
    						     {
    						         longitude = results[0].geometry.location.A;
    						         latitude = results[0].geometry.location.k;
    						         service_controller_get_services_near(longitude,latitude);
    						     }
    						     else 
    						     {
    						         result = "Unable to find address: " + status;
    						     }
    				    });
    			}
    		});
    
}


function service_view_show_services_near(services,text_to_search)
{
	if (services.length > 0)
	{
		body_clear();
		
		jQuery('#content-body').prepend('<div id="filter-box" class="bs-example">'+
			    '<div class="panel-group" id="accordion" >'+
			  '<div class="panel panel-default">'+
			    '<div class="panel-heading" style="background-color: #ddd;border-color: silver;border: 1px solid silver;">'+
			      '<h4 class="panel-title">'+
			        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><i class="fa fa-search"></i> Filters</a>'+
			      '</h4>'+
			    '</div>'+
			    '<div id="collapseOne" class="panel-collapse collapse in">'+
			      '<div class="panel-body" style="border: 1px solid silver;">'+
				        '<form role="form">'+
				        	'<div class="input-group margin-bottom-sm">'+
				        		'<span class="input-group-addon"><i class="fa fa-location-arrow fa-fw"></i></span>'+
				        		'<input id="address-filter" class="form-control" type="text" placeholder="Address">'+
				        	'</div>'+
				    
				    '<div class="checkbox">'+
				      '<label id="swapping_allow">'+
				        '<input type="checkbox"> Allow swap'+
				      '</label>'+
				    '</div>'+
				  '</form>'+
			      '</div>'+
			    '</div>'+
			  '</div>'+
			'</div>'+
			'</div>');
		
		$('#address-filter').val(text_to_search);
		
		$("#map-canvas2").remove();
		
		$('<div style="border: 3px solid silver;border-radius: 11px;" class="google-map-canvas col-lg-12 col-sm-12 col-xs-12" id="map-canvas2">-</div>').appendTo('#content-body');
		
		$("#map-canvas2").width("65%").height($(window).width()/4 + "px");
		$("#map-canvas2").css("margin-bottom","2em");
		var myLatlng = null;
		if (services.length > 0)
			myLatlng = new google.maps.LatLng(services[0].latitude,services[0].longitude);
		else
			myLatlng = new google.maps.LatLng(37.3585225,-5.9861188);
	
					
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
					  
					  
	
					map.setZoom( map.getZoom() - 1);
					map.setZoom( map.getZoom() + 1);
					google.maps.event.trigger(map, 'resize');
						jQuery.each(services, function (index, service)
								{
										// To add the marker to the map, use the 'map' property
										var myLatlng2 = new google.maps.LatLng(service.latitude,service.longitude);
										var marker = new google.maps.Marker(
												{
												    position: myLatlng2,
												    map: map,
												    draggable:true,
												    animation: google.maps.Animation.DROP,
												    title:service.title
												});
										
										
										var iw1 = new google.maps.InfoWindow({
										       content: '<a href="#" onclick="search_controller_find(\'' + service.title +  '\');refreshLanguage();">' +service.title + '</a>'
										     });
										     google.maps.event.addListener(marker, "click", function (e) { iw1.open(map, this); });
	
								});
					
						
					
						  
						  
					this.map.setZoom( this.map.getZoom() - 1);
					this.map.setZoom( this.map.getZoom() + 1);
					google.maps.event.trigger(map, 'resize');
					
					  // also redefine center
					  map.setCenter(myLatlng);
	}
	
}