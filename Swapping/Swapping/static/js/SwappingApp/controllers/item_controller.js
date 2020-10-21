function controller_create_item()
{	
	
		//alert("Premiiun"+ $('#ipremium').val());
		validarformulario();
	
		 var check_enable;
		 check_enable = false;
		 if ($('input[name="ienable"]:checked').length > 0)
		 {		
			 check_enable = true;
		 }
		 
		 var check_premiun;
		 if ($('input[name="ipremium"]:checked').length > 0)
		 {
			 check_premiun = true;
		 }
		 
	 
		var $csrftoken = $.cookie('csrftoken');
    	jQuery.ajax
	    (
	           {
	            url: "/SwappingApp/create_item/",
	            type: 'POST',
	            beforeSend: function(xhr) {
	            	xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
	            crossDomain: false,
	            data:
	            {
	                'title': $('#ititle').val(),
	                'price': $('#iprice').val(),
	                'quantity': $('#iquantity').val(),
	                'enable_swapping': check_enable,
	                'category': $('#icategory').val(),
	                'description': $('#idesc').val(),
	                'premium':  check_premiun,
	                'wishSwap' : $('#wishSwap').val()
	            },
	            enctype: "multipart/form-data",
	            encoding: "multipart/form-data" ,
	            //contentType: false,
	            success: function(response)
	            {
	            	//alert(" 2º El item se crea con la id: "+response);  	
	            	myDropzone.on("sending", function(file, xhr, formData) 
	            			{
	            				formData.append('item', response);
	            			}
	            	);
	            	
	            	myDropzone.processQueue();
	            	
	            	show_item_detail(response);
	            },
	            error: function(response)
	            {
	            	display_error_notification('Create','Could not create the item');
	            	//alert("falla");
	                //console.log(response);
	                
	            }
	        }
	    );
	
	

}

function validarformulario(){
	
    	var res=false;
    	
    	//alert("entra en validar formulario");
    	
    	 $('#form_item').bootstrapValidator({
    		feedbackIcons: {
    			valid: 'fa fa-check',
    		    invalid: 'fa fa-times',
    		    validating: 'fa fa-refresh',
    	    },
    	    
    	    submitHandler: function() 
			{ 
    	    	//alert("entra en el handler");
			},
            
    					message: 'This value is not valid',
    					fields:
    					{
    						ititle: 
    						{
    							message: 'The title is not valid',
    							validators: 
    							{
    								notEmpty: 
    								{
    									message: 'The title is required and can\'t be empty'
    								},
    							}
    						},
    						iprice: 
    						{
    							message: 'The price is not valid',
    							validators: 
    							{
    								notEmpty: 
    								{
    									message: 'The price is required and can\'t be empty'
    								},
    							}
    						},
    						iquantity: 
    						{
    							message: 'The quantity is not valid',
    							validators: 
    							{
    								notEmpty: 
    								{
    									message: 'The Send is required and can\'t be empty'
    								},

    							}
    						},
    						idesc: 
    						{
    							message: 'The description is not valid',
    							validators: 
    							{
    								notEmpty: 
    								{
    									message: 'The description is required and can\'t be empty'
    								},
    							}
    						},
 
    					},//fields€
    				});//validator
    	 
    	res = $('#form_item').data('bootstrapValidator').isValid(); 

    	
}


function get_category(){
	
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/categories/",
             type: 'GET',
             async: false,
             success: function(response)
             {
            	result = response;
                     
             },
             error: function(response)
             {	 //alert('errorrr!!');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
}

function getAllItemForUser(){
	
	user = getUserforItems();
	//alert(user);
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/items_for_user/",
             type: 'GET',
             async: true,
             data:{
            	 'user': user,
             },
             success: function(response)
             {
            	//alert("llega al success");
            	result = response;
            	showAllItem(result.items);           
            	refreshLanguage();
             },
             error: function(response)
             {	 //alert('errorrr!!');
                 //console.log(response);
            	 display_error_notification('List Item','Ha ocurrido un error al obtener el listado de items.');
             }
         }
     );
	 return result;
	
}

function getUserforItems(){
	
	 $.ajax
     (
         {
             url: "/SwappingApp/get_user/",
             type: 'GET',
             async: false,
             success: function(response)
             {
            	//alert("id usuario:"+response.id);
            	result = response.id;
                     
             },
             error: function(response)
             {	 
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
}

function controller_delete_item(itemid){
	
	jQuery('#figure_loading div').removeClass('spinner');
	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/item/" + itemid,
            type: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	display_success_notification("Delete Item","The item was deleted",null);          	
            	window.location.href = 'http://127.0.0.1:8000/home';
            	
            },
            error: function(response)
            {
                display_error_notification('Delete Item','Could not delete the item');
            }
        }
    );
	
	
	
}

function controller_modify_item(iditem){
	
	//showItemForModify(idtiem);
	//alert("llegua al put");
	jQuery('#figure_loading div').addClass('spinner');
	 var check_enable;
	 check_enable = false;
	 if ($('input[name="ienable"]:checked').length > 0)
	 {
		 check_enable = true;
	 }

	var $csrftoken = $.cookie('csrftoken');
	jQuery.ajax
    (
        {
            url: "/SwappingApp/item/"+iditem+"/",
            type: 'PUT',
            data:
           {
                'title': $('#ititle').val(),
                'iamge': $('#iphoto').val() ,
                'price': $('#iprice').val(),
                'quantity': $('#iquantity').val(),
                'enable': check_enable,
                'category': $('#icategory').val(),
                'description': $('#idesc').val(),
                'premium' :  $('#ipremium').val(),
                'enable_swapping': check_enable,
                'wishSwap' : $('#wishSwap').val(),
    
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	jQuery('#figure_loading div').remove('spinner');
            	display_success_notification("Modify Item","The item was modify succesfully",null);
            	window.location.href = 'http://127.0.0.1:8000/home';
            },
            error: function(response)
            {
            	
                console.log(response);
                display_error_notification('Create Item','Could not change in the item');
            }
        }
    );
	
}

function showItemForModify(itemid){

	item = getOneItem(itemid);
	inicialize();
	document.getElementById('ititle').value=item.title;
	document.getElementById('iprice').value=item.price;
	document.getElementById('idesc').value=item.description;
	document.getElementById('ienable').checked=item.enable_swapping;
	document.getElementById('ipremium').checked=item.premium;
	document.getElementById('iquantity').value=item.quantity;
	document.getElementById('wishSwap').value=item.quantity;
	
	document.getElementById('area_swapping').style.display = 'inline';
	//document.getElementById('component_image').style.display = 'none';
	document.getElementById('hrtitle').style.display = 'none';
	document.getElementById('hrtitle2').style.display = 'block';
	document.getElementById('submit-all').style.display = 'none';
	document.getElementById('my-dropzone').style.display = 'none'; //damos un atributo display:none que oculta el div
	$('#icategory option:contains(' + item.category + ')').prop({selected: true});
	document.getElementById('submit-all').setAttribute("type", "hidden");
	document.getElementById('my-dropzone').setAttribute("type", "hidden");	
	$('<input type="button" class="btn btn-primary" value="Modify" onclick=" controller_modify_item('+itemid+');refreshLanguage();" />').appendTo('#sub_div');
	
	
}

function getOneItem(itemid){
	
	 $.ajax
     (
         {
             url: "/SwappingApp/item/"+itemid+"/",
             type: 'GET',
             async: false,
             success: function(response)
             {
                result = response;
            	show_item_detail_async(response);
         		jQuery('#figure_loading div').removeClass('spinner');
             },
             error: function(response)
             {	 //alert('errorrr!!');
                 //console.log(response);
             }
         }
     );
	 return result;
	
}



function item_controller_get_photo(id_item,returned)
{
	var result = null;
	 $.ajax
     (
         {
             url: "/SwappingApp/get_item_image/",
             type: 'GET',
             async:false,
    	     data:
    	     {
    	    	'id_item': id_item
    	     },
             success: function(response)
             {
            	 if (returned != null && returned  )
            		 {  
            		 	result = response;
            		 }
             },
             error: function(response)
             {
            	 //alert("falla! foto");
                 console.log(response);
             }
         }
     );
	 return result;
}

function item_controller_get_first_image_item(id_item)
{
	var result = null;
	 $.ajax
     (
         {
             url: "/SwappingApp/get_item_first_image/",
             type: 'GET',
             async: false, 
    	     data:
    	     {
    	    	'id_item': id_item
    	     },
             success: function(response)
             {
            	 result = response;
            	 
             },
             error: function(response)
             {
            	 //alert("falla! foto");
                 //console.log(response);
             }
         }
     );
	 
	return result;
}

function item_controller_active_on(id_item){
	
	var result = null;
	 $.ajax
    (
        {
            url: "/SwappingApp/get_date_active/",
            type: 'GET',
            async:false,
   	     data:
   	     {
   	    	'id_item': id_item
   	     },
            success: function(response)
            {

           		 	result = response.factive;
        
            },
            error: function(response)
            {
           	 //alert("falla! foto");
                console.log(response);
            }
        }
    );
	 return result;
	
	
}


function item_controller_get_all(page_number)
{
	jQuery('#figure_loading div').addClass('spinner');
	jQuery.ajax
	(
			{
				url: "/SwappingApp/items/",
	            type: 'GET',
	            data :
	            {
	            	"page" : page_number
	            },
	            success: function(response)
	            {
	            		jQuery('#figure_loading div').removeClass('spinner');
	            		item_view_show_all_products(page_number,response);
	            },
	            error: function(response)
	            {
	            	jQuery('#figure_loading div').removeClass('spinner');
	                console.log(response);
	                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
	            }
			}
	);
}

function item_controller_get_user_item(id){
	
	var result = null;
	 $.ajax
   (
       {
           url: "/SwappingApp/get_user_item/",
           type: 'GET',
           async:false,
  	     data:
  	     {
  	    	'id_item': id
  	     },
           success: function(response)
           {

          		 	result = response.factive;
       
           },
           error: function(response)
           {
          	 //alert("falla! foto");
               console.log(response);
           }
       }
   );
	 return result;
	
	
	
	
}
