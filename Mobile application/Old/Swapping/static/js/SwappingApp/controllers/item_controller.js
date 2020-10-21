function controller_create_item()
{	
	var res = true;
	res = validarformulario();
	if (res == true){
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
	            url: "/SwappingApp/create_item/",
	            type: 'POST',
	            beforeSend: function(xhr) {
	            	xhr.setRequestHeader("X-CSRFToken", $csrftoken);
	            },
	            crossDomain: false,
	            data:
	            {
	                'title': $('#ititle').val(),
	                //'image': $('#image').val() ,
	                'price': $('#iprice').val(),
	                'quantity': $('#iquantity').val(),
	                'enable_swapping': check_enable,
	                'category': $('#icategory').val(),
	                'description': $('#idesc').val(),
	                'premium' :  $('#ipremium').val(),
	            },
	            enctype: "multipart/form-data",
	            encoding: "multipart/form-data" ,
	            //contentType: false,
	            success: function(response)
	            {
	            	alert(" 2º El item se crea con la id: "+response);  	
	            	myDropzone.on("sending", function(file, xhr, formData) 
	            			{
	            				formData.append('item', response);
	            			}
	            	);
	            	
	            	myDropzone.processQueue();
	            },
	            error: function(response)
	            {
	            	alert("falla");
	                //console.log(response);
	                
	            }
	        }
	    );
	
	}

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

    	return res;
    		
    	
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
	alert(user);
	$('body').addClass('loading');
	var result;
	 $.ajax
     (
         {
             url: "/SwappingApp/item/?user="+user,
             type: 'GET',
             async: false,
             success: function(response)
             {
            	//alert("GET EXITOSO");
            	result = response;
                     
             },
             error: function(response)
             {	 alert('errorrr!!');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
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
             {	 alert('errorrr!! en recuperar usuario');
                 console.log(response);
                 //display_error('Listado de cuestionarios','Ha ocurrido un error al obtener el listado de cuestionarios.');
             }
         }
     );
	 return result;
}

function controller_delete_item(itemid){
	
	alert(itemid);
	if(confirm("Are you sure to delete the item?")){
			
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
            	alert("The user was deleted");
            	jQuery('#figure_loading div').removeClass('spinner');
            	
            },
            error: function(response)
            {
            	alert("falla delete");
                console.log(response);
                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
            }
        }
    );
	
	}
	
}

function controller_modify_item(iditem){
	
	//showItemForModify(idtiem);
	alert("llegua al put");

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
                'enable': $('#ienable').val(),
                'category': $('#icategory').val(),
                'description': $('#idesc').val(),
                'image': $('#image').val() ,
                'csrfmiddlewaretoken' : $('#csrfmiddlewaretoken').val(),

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
            },
            crossDomain: false,
            success: function(response)
            {
            	$('#figure_loading div').removeClass('spinner');
            	window.location.href = 'http://127.0.0.1:8000/home';
            },
            error: function(response)
            {
            	alert("falla modify");
                console.log(response);
                //display_error('Grabar Idiomas','No se ha podido grabar los idiomas del cuestionario correctamente.');
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
	
	//var photoURL = item.image;
	//var img = $("<img />").attr('src', photoURL.url);
	//img.appendTo('#form_item');
	//alert(item.image);
	//document.getElementById('image').value=item.image;
	document.getElementById('submit-all').setAttribute("type", "hidden");
	
	$('#icategory option:contains(' + item.category + ')').prop({selected: true});
	document.getElementById('submit-all').setAttribute("type", "hidden");
	document.getElementById('my-dropzone').setAttribute("type", "hidden");	
	$('<input type="button" value="Modify" onclick=" controller_modify_item('+itemid+')" />').appendTo('#sub_div');
	
	
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
                     
             },
             error: function(response)
             {	 alert('errorrr!!');
                 console.log(response);
             }
         }
     );
	 return result;
	
}


function item_controller_get_photo(id_item,returned)
{
	var result;
	alert("llegas a coger la foto!!");
	 $.ajax
     (
         {
             url: "/SwappingApp/get_item_image/"+id_item,
             type: 'GET',
             async: false,
             success: function(response)
             {
            	 if (returned != null && returned  )
            		 {  alert("url foto"+response);
            		 	result = response;
            		 }
             },
             error: function(response)
             {
            	 alert("falla! foto");
                 console.log(response);
             }
         }
     );
	 return result;
}

function no_change_att_item(iditem){
	

	 $.ajax
    (
        {
            url: "/SwappingApp/no_change_att_item/?item="+iditem,
            type: 'GET',
            async: false,
            success: function(response)
            {
           	result = response;
                    
            },
            error: function(response)
            {	 alert('errorrr!!');
                console.log(response);
            }
        }
    );
	 return result;
	
}
