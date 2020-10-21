var myDropzone = null;
function user_view_create_forms(id_user)
{ 
	if (id_user!= null){
		user_view_show_profile_data(id_user);
	}else{
	/*We clean the content-body content first of all*/
	body_clear();

	$('<div id="container-user"></div>').appendTo('#content-body');
	
	
	$('<form method="POST" action="#" id="register_form_user" enctype="multipart/form-data" class="form-horizontal"></form>').appendTo('#container-user');
    
    $('<h3>User Register Form</h3>').appendTo('#register_form_user');

//--------------------------------------------------------------------------------------------------------------------
	
	$('<div id="my-dropzone">'+
	'<input name="photo" type="file" style="overflow: hidden; padding: 55px; display:none;" /></div>').appendTo('#register_form_user');
	
	
	//----------------------------------------------------------------------------------------------------------
	
	

		
	$('<div id="user_component_username" class="form-group"/></div>').appendTo('#register_form_user');	
	$("<label id='user_username' for='username_input' class='col-lg-3 control-label'>Username:</label>").appendTo('#user_component_username');
	$("<div class='col-lg-5'><input type='text' id='username_input' name='username_input'  class='form-control'  /></div>").appendTo('#user_component_username');
	
	$('<div id="user_component_name" class="form-group" /></div>').appendTo('#register_form_user');	
	$("<label id='user_name' for='name_input' class='col-lg-3 control-label'>Name:</label>").appendTo('#user_component_name');
	$("<div class='col-lg-5'><input type='text' id='name_input' name='name_input' class='form-control' /></div>").appendTo('#user_component_name');

	$('<div id="user_component_surname" class="form-group" /></div>').appendTo('#register_form_user');	
	$("<label id='user_surname' for='surname_input' class='col-lg-3 control-label'>Surname:</label>").appendTo('#user_component_surname');
	$("<div class='col-lg-5'><input type='text' id='surname_input' class='form-control' name='surname_input' /><div>").appendTo('#user_component_surname');

	$('<div id="user_component_password" class="form-group" /></div>').appendTo('#register_form_user');	
	$("<label id='user_password' for='password_input' class='col-lg-3 control-label'>Password:</label>").appendTo('#user_component_password');
	$("<div class='col-lg-5'><input type='password' id='password_input' class='form-control' name='password_input' /></div>").appendTo('#user_component_password');
	
	$('<div id="user_component_email" class="form-group" /></div>').appendTo('#register_form_user');	
	$("<label id='user_email' for='email_input' class='col-lg-3 control-label'>Email:</label>").appendTo('#user_component_email');
	$("<div class='col-lg-5'><input type='text' id='email_input' class='form-control' name='email_input' /></div>").appendTo('#user_component_email');

	$('<div id="user_component_phone" class="form-group" /></td>').appendTo('#register_form_user');	
	$("<label id='user_phone' class='col-lg-3 control-label' for='phone_input'>Phone:</label>").appendTo('#user_component_phone');
	$("<div class='col-lg-5'><input type='text' id='phone_input' class='form-control' name='phone_input' /></div>").appendTo('#user_component_phone');

	$('<br/>').appendTo('#register_form_user');

		$('<div class="form-group"><div class="col-lg-9 col-lg-offset-3" id="sub_div"></div></div>').appendTo('#register_form_user');	
	$('<div class="col-lg-5"><button type="submit" id="submit-all" type="submit" value="Submit" onclick="user_controller_add_user();refreshLanguage();" class="btn btn-primary form-control">Save</button></div>').appendTo('#sub_div');	
	
	//-----------------------------------------------------------------------------------------------------------------------
	// Disable auto discover for all elements:
	Dropzone.autoDiscover = false;
	myDropzone = new Dropzone("div#my-dropzone", { /* options */
		url: "/SwappingApp/upload_user_photo/",
		// Prevents Dropzone from uploading dropped files immediately
        autoProcessQueue : false,
		maxFiles:1,
		acceptedFiles: "image/*",
		maxFilesize: 2, // MB
		dictDefaultMessage: "Drag your images",
		paramName: "file",
		init: function() 
		{
			this.on("error", function(file, message) { display_error_notification('Error', message, null); });
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
			  window.location.href = 'http://127.0.0.1:8000/home';
		});
	
	myDropzone.on("addedfile", function(file) {
		  file.previewElement.addEventListener("click", function() { myDropzone.removeFile(file); });
		});
	//----------------------------------------------------------------------------------------------------------------------
	
	}
	
	refreshLanguage();
	
}

function show_rating(id_voted){
	 return user_controller_get_vote_by_voted(id_voted,true);	
}

function user_view_show_profile_data(id_user)
{
	
	/*We clean the content-body content first of all*/
	var show_rate = show_rating(id_user).exists;
	
	if(show_rate== "Anonymous")
	{
    	display_error_notification(null,"You must be logged in to see the users profiles",null);
		return;
	}
	body_clear();
	
	var user = user_controller_get(id_user, true);
	var karmapoints = parseInt(user.karmaPoints);
	var percent1,percent2,percent3,percent4,percent5;
	var karmapoints1 = parseInt(user.karma_1points);
	var karmapoints2 = parseInt(user.karma_2points);
	var karmapoints3 = parseInt(user.karma_3points);
	var karmapoints4 = parseInt(user.karma_4points);
	var karmapoints5 = parseInt(user.karma_5points);
	var media;
	if(karmapoints==0){
		percent1=0; percent2=0; percent3=0; percent4=0; percent5=0;
		media = 0;
	}else{
		percent1=Math.ceil((karmapoints1*1/karmapoints)*100);
		percent2=Math.ceil((karmapoints2*2/karmapoints)*100);
		percent3=Math.ceil((karmapoints3*3/karmapoints)*100);
		percent4=Math.ceil((karmapoints4*4/karmapoints)*100);
		percent5=Math.ceil((karmapoints5*5/karmapoints)*100);
		
		media = karmapoints1*1+karmapoints2*2+karmapoints3*3+karmapoints4*4+karmapoints5*5;
		media = media /  (karmapoints1+karmapoints2+karmapoints3+karmapoints4+karmapoints5);
		media = Math.round(media * 100) / 100;
	}
	
	
	var photoURL = user_controller_get_photo(id_user, true);

	var img = $("<img />").attr('src', photoURL.url);
	img.attr('class', 'img-responsive');

	$('<form class="col-xs-12" method="POST" action="#" role="form" id="show_user_form"  style="form-inline"></form>').appendTo('#content-body');
	jQuery('<h3>Your profile</h3>').appendTo('#show_user_form');

		jQuery('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
					'<div id="image-container" style="margin-left: -30px;" class="col-md-5 col-sm-6 col-xs-12"></div>'+
					'<div id="description-container" class="col-md-7 col-sm-6 col-xs-12"></div></div>').appendTo('#show_user_form');
		jQuery('#image-container').append('<div class=" portfolio-item" id="container_image_profile" ></div>')
		jQuery('<div  id="profile_image" class="thumbnail" ></div>').appendTo('#container_image_profile');

		

    
	jQuery(img).appendTo('#profile_image');

	
	$('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_1"/></div>').appendTo('#description-container');	
	jQuery("<div id='user_username' class='col-md-5 col-lg-5 col-sm-5 col-xs-5 control-label'><b>Username:</b></div>").appendTo('#row_1');
	jQuery("<span class='col-md-7 col-lg-7 col-sm-7 col-xs-7 control-label'>" + user.username + "</span>").appendTo('#row_1');
	
	$('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_2"/></div>').appendTo('#description-container');	
	jQuery("<div id='user_name' class='col-md-5 col-lg-5 col-sm-5 col-xs-5 control-label'><b>Name:</b></div>").appendTo('#row_2');
	//jQuery("<span  class='col-md-6 col-lg-6 col-sm-6 col-xs-6 control-label'>" + user.first_name + "</span>").appendTo('#row_2');
	jQuery('<span  href="#"  class="col-md-7 col-lg-7 col-sm-7 col-xs-7 control-label" id="first_name">' + user.first_name+ '</a>').appendTo('#row_2');

	$('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_3"/></div>').appendTo('#description-container');	
	jQuery("<div id='user_surname'  class='col-md-5 col-lg-5 col-sm-5 col-xs-5 control-label'><b>Surname:</b></div>").appendTo('#row_3');
	//jQuery("<span  class='col-md-6 col-lg-6 col-sm-6 col-xs-6 control-label'>" + user.last_name + "</span>").appendTo('#row_3');
	jQuery('<span  href="#"  class="col-md-7 col-lg-7 col-sm-7 col-xs-7 control-label" id="last_name">' + user.last_name+ '</a>').appendTo('#row_3');
	
	$('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_4" /></div>').appendTo('#description-container');	
	jQuery("<div id='user_email' class='col-md-5 col-lg-5 col-sm-5 col-xs-5 control-label'><b>Email:</b></div>").appendTo('#row_4');
	//jQuery("<span class='col-md-6 col-lg-6 col-sm-6 col-xs-6 control-label'>" + user.email + "</span>").appendTo('#row_4');
	jQuery('<span  href="#" data-type="email" class="col-md-7 col-lg-7 col-sm-7 col-xs-6 control-label" id="email">' + user.email+ '</a>').appendTo('#row_4');
	
	$('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_5" /></div>').appendTo('#description-container');	
	jQuery("<div id='user_phone' class='col-md-5 col-lg-5 col-sm-5 col-xs-5 control-label'><b>Phone:</b></div>").appendTo('#row_5');
	//jQuery("<span class='col-md-6 col-lg-6 col-sm-6 col-xs-6 control-label'>" + user.phone + "</span>").appendTo('#row_5');
	jQuery('<span  href="#"  class="col-md-7 col-lg-7 col-sm-7 col-xs-7 control-label" id="phone">' + user.phone+ '</a>').appendTo('#row_5');

	if(show_rate == true)
	{
	
		$('<input style="cursor: pointer;" id="input-21f"  type="number" class="rating col-lg-12 col-md-12 col-sm-12 col-xs-12" min=0 max=5 step=1  >').appendTo('#description-container');
		$('<div class="col-lg-5 col-lg-offset-3"  id="sub_div"></div><br></br>').appendTo('#description-container');	
		$('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><a id="submit-all"  onclick="user_controller_vote('+id_user+');refreshLanguage();" class="btn btn-primary form-control">Vote</a></div>').appendTo('#sub_div');	
		$("#input-21f").rating();
	}
	
	$('<div class="form-group" id="row_rate"></div>').appendTo('#show_user_form');
	
	$('<div class="col-xs-12 col-md-12 col-lg-12 col-sm-12 col-xs-12 show_rate well">'+
    '<div >'+
        '<div class="row ">'+
            '<div class="col-xs-12 col-md-6 col-sm-6 text-center">'+
                '<h1 class="rating-num">'+media+'</h1>'+
                '<div class="rating" id="rating_stars">'+
                '</div>'+
                '<div>'+
                    '<span ></span>'+karmapoints+' total'+
                '</div>'+
            '</div>'+
            '<div class="col-xs-12 col-md-6 col-sm-6">'+
                '<div class="row rating-desc">'+
                    '<div class="col-xs-3 col-md-3 text-right">'+
                        '<span class="glyphicon glyphicon-star"></span>5'+
                    '</div>'+
                    '<div class="col-xs-8 col-md-9">'+
                        '<div class="progress progress-striped">'+
                            '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"'+
                                'aria-valuemin="0" aria-valuemax="100" style="width: '+percent5+'%">'+
                                '<span class="sr-only">'+percent5+'%</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- end 5 -->'+
                    '<div class="col-xs-3 col-md-3 text-right">'+
                        '<span class="glyphicon glyphicon-star"></span>4'+
                    '</div>'+
                    '<div class="col-xs-8 col-md-9">'+
                        '<div class="progress">'+
                            '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"'+
                                'aria-valuemin="0" aria-valuemax="100" style="width: '+percent4+'%">'+
                                '<span class="sr-only">'+percent4+'%</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- end 4 -->'+
                    '<div class="col-xs-3 col-md-3 text-right">'+
                        '<span class="glyphicon glyphicon-star"></span>3'+
                    '</div>'+
                    '<div class="col-xs-8 col-md-9">'+
                        '<div class="progress">'+
                            '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20"'+
                                'aria-valuemin="0" aria-valuemax="100" style="width: '+percent3+'%">'+
                                '<span class="sr-only">'+percent3+'%</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- end 3 -->'+
                    '<div class="col-xs-3 col-md-3 text-right">'+
                        '<span class="glyphicon glyphicon-star"></span>2'+
                    '</div>'+
                    '<div class="col-xs-8 col-md-9">'+
                        '<div class="progress">'+
                            '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="20"'+
                                'aria-valuemin="0" aria-valuemax="100" style="width:'+percent2+'%">'+
                                '<span class="sr-only">'+percent2+'%</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- end 2 -->'+
                    '<div class="col-xs-3 col-md-3 text-right">'+
                        '<span class="glyphicon glyphicon-star"></span>1'+
                    '</div>'+
                    '<div class="col-xs-8 col-md-9">'+
                        '<div class="progress">'+
                            '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80"'+
                                'aria-valuemin="0" aria-valuemax="100" style="width: '+percent1+'%">'+
                                '<span class="sr-only">'+percent1+'%</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<!-- end 1 -->'+
                '</div>'+
                '<!-- end row -->'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>').appendTo('#row_rate');
	
	$('<form class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="form_comment" method="post" action="#" style="form-inline"></form>').appendTo('#content-body');
	$('<input type="hidden" id = "id_user" name="id_user" value="'+id_user+'">'+
						'<textarea id="content" name="content" class="form-control" rows="3" style="resize:none"placeholder="Write your comment here, please."></textarea>'+
						'<div class="statusRelative" >'+
							'<button style="margin-top:7px; margin-bottom: 7px;" type="submit" class="btn btn-primary pull-right"onclick="comment_controller_create_comment('+id_user+');refreshLanguage();" style="align:right">Send</button>'+
						'</div>'+
					'</div>'+

			'</div>'+
		'</div>').appendTo('#form_comment');
	var data = get_all_comment(id_user,1);
	var next_page = data.next;
	jQuery('#form_comment').hide();
	$.ajax(
			{
				type: "GET",
				url:"/SwappingApp/get_user_logged/",
				async:true,
				success: function(data)
				{
					if (data.length == 1)
					{
						if (data[0].pk != id_user)
						{
							jQuery('#form_comment').show();
						}
						else
						{
							jQuery('#description-container').append('<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group" id="row_6" /></div>');
							jQuery("<div id='settings_button' class='col-md-5 col-lg-4 col-sm-5 col-xs-4 control-label'><a class=\"btn btn-default\" href=\"#\" onclick=\"user_view_settings(" + id_user + ");refreshLanguage();\">  <i class=\"fa fa-cog\"></i> Settings</a></div>").appendTo('#row_6');
							jQuery("<div id='edit_button_user' class='col-md-4 col-lg-4 col-sm-4 col-xs-4 control-label'><a  class=\"btn btn-default\"  onclick=\"user_view_edit_forms(" + id_user + ");refreshLanguage();\" href=\"#\"><i class=\"fa fa-pencil fa-fw\"></i> Edit</a></div>").appendTo('#row_6');
							jQuery("<div id='wish_button' class='col-md-3 col-lg-4 col-sm-3 col-xs-4 control-label'><a  class=\"btn  btn-success\"  onclick=\"product_view_show_all_products_wish();refreshLanguage();\" href=\"#\"><i class=\"fa fa-heart\"></i> Wish List</a></div>").appendTo('#row_6');
							
							refreshLanguage();
							var $csrftoken = $.cookie('csrftoken');
							
							$.fn.editable.defaults.ajaxOptions = 
										{
										    type: 'POST',
										    dataType: 'json',
										    beforeSend: function(xhr) 
										    {
								                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
								            },
								            crossDomain: false,
										}

							//Needed for X-Editable
							$('#email').css("cursor","pointer");
							$('#email').editable(
									{
										type: 'text',
									    pk: user.id,
									    url: '/SwappingApp/edit_user/',
									    title: 'Enter email',
									    validate: function(value)
									    {
									        if($.trim(value) == '') 
									        {
									            return 'This field is required';
									        }
									    },
									    error: function(errors)
									    {
									           var msg = '';
									           if(errors && errors.responseText) { //ajax error, errors = xhr object
									               msg = errors.responseText;
									           } else { //validation error (client-side or server-side)
									               $.each(errors, function(k, v) { msg += k+": "+v+"<br>"; });
									           } 
									           $('#email').removeClass('alert-success').addClass('alert-error');
									           $('.editable-error-block').html(msg);
									           jQuery('#figure_loading div').removeClass('spinner');
									    }
									});
							$('#last_name').css("cursor","pointer");
							$('#last_name').editable(
									{
										type: 'text',
									    pk: user.id,
									    url: '/SwappingApp/edit_user/',
									    title: 'Enter last name',
									    validate: function(value)
									    {
									        if($.trim(value) == '') 
									        {
									            return 'This field is required';
									        }
									    },
									    error: function(errors)
									    {
									           var msg = '';
									           if(errors && errors.responseText) { //ajax error, errors = xhr object
									               msg = errors.responseText;
									           } else { //validation error (client-side or server-side)
									               $.each(errors, function(k, v) { msg += k+": "+v+"<br>"; });
									           } 
									           $('#last_name').removeClass('alert-success').addClass('alert-error');
									           $('.editable-error-block').html(msg);
									           jQuery('#figure_loading div').removeClass('spinner');
									    }
									});
							$('#first_name').css("cursor","pointer");
							$('#first_name').editable(
									{
										type: 'text',
									    pk: user.id,
									    url: '/SwappingApp/edit_user/',
									    title: 'Enter first name',
									    validate: function(value)
									    {
									        if($.trim(value) == '') 
									        {
									            return 'This field is required';
									        }
									    },
									    error: function(errors)
									    {
									           var msg = '';
									           if(errors && errors.responseText) { //ajax error, errors = xhr object
									               msg = errors.responseText;
									           } else { //validation error (client-side or server-side)
									               $.each(errors, function(k, v) { msg += k+": "+v+"<br>"; });
									           } 
									           $('#first_name').removeClass('alert-success').addClass('alert-error');
									           $('.editable-error-block').html(msg);
									           jQuery('#figure_loading div').removeClass('spinner');
									    }
									});
							$('#phone').css("cursor","pointer");
							$('#phone').editable(
									{
										type: 'text',
									    pk: user.id,
									    url: '/SwappingApp/edit_user/',
									    title: 'Enter phone',
									    validate: function(value)
									    {
									        if($.trim(value) == '') 
									        {
									            return 'This field is required';
									        }
									        else if (isNaN(parseInt(value))  || parseInt(value) < 600000000)
									        {
									        	return 'The phone must be valid';
									        }
									    },
									    error: function(errors)
									    {
									           var msg = '';
									           if(errors && errors.responseText) { //ajax error, errors = xhr object
									               msg = errors.responseText;
									           } else { //validation error (client-side or server-side)
									               $.each(errors, function(k, v) { msg += k+": "+v+"<br>"; });
									           } 
									           $('#phone').removeClass('alert-success').addClass('alert-error');
									           $('.editable-error-block').html(msg);
									           jQuery('#figure_loading div').removeClass('spinner');
									    }
									});
							
						}
					}
				},
				error: function(response)
				{
					if (response.status = 403)
					{
						display_error_notification("Area not allowed", "You must be logged in to access here", "fa fa-times");
					}
				}
	});
	comment_paginate = 1;
	
	
	$('#content-body').append('<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" id="comment-container">'+ '</div>');
	var comment_paginate = 1;
	$.each(data.results, function(i, item) {

		jQuery('#comment-container').append(
		'<hr style="background-color: black; height: 1px;">'+
				'<div class="jumbotron">'+
		  			'<h4><a href="#" title="Use origin" onclick="user_view_show_profile_data( '+item.user_origin.id+' );refreshLanguage();"><i class="fa fa-user blue"></i> &nbsp; <span class="blue">'+item.user_origin.username+'</span> &nbsp; </a>'+
		  			'<span>'+item.moment+'</span></h4>'+
		  			'<blockquote>'+item.content+'</blockquote>'+
		  		'</div>');
	});
	
	//Infinite Scroll
	$(window).scroll(function()
			{
			    if($(window).scrollTop() == $(document).height() - $(window).height())
			    {
			    	if (next_page != null)
			    	{
				    	comment_paginate++;
				    	var data = get_all_comment(id_user,comment_paginate);
				    	$.each(data.results, function(i, item)
				    			{
	
				    		jQuery('#comment-container').append(
				    		'<hr style="background-color: black; height: 1px;">'+
				    				'<div class="jumbotron">'+
				    		  			'<h4><a href="#" title="Use origin" onclick="user_view_show_profile_data( '+item.user_origin.id+' );refreshLanguage();"><i class="fa fa-user blue"></i> &nbsp; <span class="blue">'+item.user_origin.username+'</span> &nbsp; </a>'+
				    		  			'<span>'+item.moment+'</span></h4>'+
				    		  			'<blockquote>'+item.content+'</blockquote>'+
				    		  		'</div>');
				    	});
			    	}
			    }
			});
	
	for ( var i = 0; i < Math.floor(media); i++ ) {
		$('<span class="glyphicon glyphicon-star"></span>').appendTo('#rating_stars');
	}
	
	for ( var i = 0; i < 5-Math.floor(media); i++ ) {
		$('</span><span class="glyphicon glyphicon-star-empty"></span>').appendTo('#rating_stars');
	}
	refreshLanguage();
	}//End method

function user_view_edit_forms(id_user){
	if (id_user!= null){
		var user = user_controller_get(id_user,true);
		body_clear();

		$('<div id="container-user"></div>').appendTo('#content-body');
		
	
		$('<form method="POST" action="#" role="form" id="user_edit_form" enctype="multipart/form-data" style="form-horizontal"></form>').appendTo('#container-user');
	
		$('<h3>Edit my profile</h3>').appendTo('#user_edit_form');

	    
	    $('<div id="content_user12" class="col-md-12 col-sm-12 col-xs-12"></div>').appendTo('#user_edit_form');
	    $('<div id="dropzone-container" class="col-md-4 col-sm-12 col-xs-12"></div>').appendTo('#content_user12');
	    $('<div id="my-dropzone-edit"><input name="photo" type="file" style="overflow: hidden;display:none;" /></div>').appendTo('#dropzone-container');
	    
	    $('<div id="description-container" class="col-md-8 col-sm-12 col-xs-12"></div>').appendTo('#content_user12');
	
		$('<div class="form-group col-md-12 col-sm-12 col-xs-12" id="row_1" /></div>').appendTo('#description-container');	
	
			$('<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 6px;" id="row_11" /></div>').appendTo('#row_1');
			$("<label id='user_username' for='username_input' class='col-lg-6 col-xs-2 control-label'>Username:</label>").appendTo('#row_11');
			$('<div class="col-md-6 col-sm-6 col-xs-6" id="row_12" /></div>').appendTo('#row_1');
			$("<input style=\"cursor: not-allowed;\" disabled=\"disabled\" class='form-control disabled' type='text' id='username_input' name='username_input'  value='"+user.username+"' />").appendTo('#row_12');
		
		$('<div class="form-group col-md-12 col-sm-12 col-xs-12"  id="row_4" /></div>').appendTo('#description-container');	
		
			$('<div class="col-md-6 col-sm-6 col-xs-6"  style="margin-top: 6px;" id="row_41" /></div>').appendTo('#row_4');
			$("<label id='user_name' for='name_input' class='col-lg-2 control-label'>Name:</label>").appendTo('#row_41');
			$('<div class="col-md-6 col-sm-6 col-xs-6" id="row_42" /></div>').appendTo('#row_4');
			$("<input style=\"cursor: not-allowed;\" disabled=\"disabled\" class='form-control disabled' type='text' id='name_input' name='name_input' value='"+user.first_name+"' />").appendTo('#row_42');
			
		$('<div class="form-group col-md-12 col-sm-12 col-xs-12" id="row_2" /></div>').appendTo('#description-container');	

			$('<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 6px;" id="row_21" /></div>').appendTo('#row_2');
			$("<label id='user_surname' class='col-lg-2 control-label' for='_input'>Surname:</label>").appendTo('#row_21');
			$('<div class="col-md-6 col-sm-6 col-xs-6" id="row_22" /></div>').appendTo('#row_2');
			$("<input style=\"cursor: not-allowed;\" disabled=\"disabled\" class='form-control disabled' type='text' id='_input' name='_input' value='"+user.last_name+"' />").appendTo('#row_22');
		
		$('<div class="form-group col-md-12 col-sm-12 col-xs-12"  id="row_3" /></div>').appendTo('#description-container');	

			$('<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 6px;" id="row_31" /></div>').appendTo('#row_3');
			$("<label id='user_phone' class='col-lg-2 control-label' for='phone_input'>Phone:</label>").appendTo('#row_31');
			$('<div class="col-md-6 col-sm-6 col-xs-6" id="row_32" /></div>').appendTo('#row_3');
			$("<input class='form-control' type='text' id='phone_input' name='phone_input' value='"+user.phone+"'/>").appendTo('#row_32');	
		
		$('<div class="form-group col-md-12 col-sm-12 col-xs-12"  id="row_5" /></div>').appendTo('#description-container');
		
			$('<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 6px;" id="row_51" /></div>').appendTo('#row_5');
			$("<label id='user_email' class='col-lg-2 control-label' for='email_input'>Email:</label>").appendTo('#row_51');
			$('<div class="col-md-6 col-sm-6 col-xs-6" id="row_52" /></div>').appendTo('#row_5');
			$("<input class='form-control' type='text' id='email_input' name='email_input' value='"+user.email+"'/>").appendTo('#row_52');

			$('<label id="user_photo" class="col-lg-2 control-label" for="photo_input"></label>').appendTo('#row_5');
			$('<input class="form-control" type="hidden" id="photo_input" name="photo_input" class="rm-input" />').appendTo('#row_5');
			
		$('<div class="form-group" id="row_6"  style="clear:both;width:15%; " /></div>').appendTo('#user_edit_form');	
		$('<button id="submit_button" type="submit" class="btn btn-primary"  style="margin-top: 10px; margin-left: 45px;" onclick="user_controller_edit_user('+id_user+');refreshLanguage();"> Submit </button>').appendTo('#row_6');	
		
			//-----------------------------------------------------------------------------------------------------------------------
	// Disable auto discover for all elements:
	Dropzone.autoDiscover = false;
	myDropzone = new Dropzone("div#my-dropzone-edit", { 
	/* options */
		url: "/SwappingApp/upload_user_photo/",
		// Prevents Dropzone from uploading dropped files immediately
        autoProcessQueue : false,
		maxFiles:1,
		addRemoveLinks: true,
		acceptedFiles: "image/*",
		maxFilesize: 2, // MB
		dictDefaultMessage: "Drag your images",
		paramName: "file",
		init: function() 
		{
			this.on("error", function(file, message) { display_error_notification('Error', message, null); });
			$(this.element).addClass("dropzone");
			myDropzone = this;
			var user_photo = user_controller_get_photo(id_user, true);
			var mockFile = { name: user.username, size: 12345 };
			myDropzone.options.addedfile.call(myDropzone, mockFile);
			// And to show the thumbnail of the file:
			myDropzone.options.thumbnail.call(myDropzone, mockFile,user_photo.url);
			
		},
		accept: function(file, done) {
		    if (file.name == "justinbieber.jpg") {
		      done("Naha, no you don't.");
		    }
		    else {   }
		  }
		 
	});
	
	myDropzone.on("complete", function(file)
	{
		console.log(file);
		  myDropzone.removeFile(file);
		  if (file.size < 2097152)
			  display_error_notification("Image file size", "You entered an oversized image", "fa fa-check");
	});
	
	myDropzone.on("addedfile", function(file) {
		  file.previewElement.addEventListener("click", function() 
				  { 
			  		myDropzone.removeFile(file); 
				  });
		});
	//----------------------------------------------------------------------------------------------------------------------
	
	}
	
	
	
	
	
	
	
	
}



function user_ok()
{
	body_clear();
	$('<div id="container-user"></div>').appendTo('#content-body');
		$('<h3>User created!!!</h3>').appendTo('#container-user');
		$('<input type="button" value="Return to home" onclick="user_controller_add_user();refreshLanguage();" />').appendTo('#container-user');	

	}

function user_view_settings(user_id){
	body_clear();
	$('<div id="container-settings"></div>').appendTo('#content-body');
	$('<h3>Settings</h3>').appendTo('#container-settings');
	$('<form method="POST" action="#" id="user_settings_form" enctype="multipart/form-data"></form>').appendTo('#container-settings');


    
	$('<br/>').appendTo('#user_settings_form');	$('</br>').appendTo('#user_settings_form');	$('</br>').appendTo('#user_settings_form');
	
	$('<div id="form_settings" class="form-horizontal"></div>').appendTo('#user_settings_form');
	
	jQuery('<div id="row_1" class="form-group"></div>').appendTo('#form_settings');
	$('<label class="col-lg-6 control-label"><span class="glyphicon glyphicon-remove"></span> Do you want to delete your profile?</label>').appendTo('#row_1');
	$('<input type="button" value="Unsubscribe" onclick="user_controller_delete_user('+user_id+');refreshLanguage();" class="col-lg-3 btn btn-primary" />').appendTo('#row_1');
	
	jQuery('<div id="row_2" class="form-group"></div>').appendTo('#form_settings');
	$('<label class="col-lg-6 control-label"><span class="glyphicon glyphicon-repeat"></span> Do you want to change the password?</label>').appendTo('#row_2');
	$('<input id="button_change_password"  type="button" value="Change password" class="col-lg-3 btn btn-primary" />').appendTo('#row_2');
	 $('#button_change_password').click(function () {
         $(".showhideform").toggle();
      });
	 
	$('<form style="width:50%;margin:auto;display:none;" id="form_change_password" class="showhideform" ><div class="form-group"><label for="ejemplo_email_1">Old password</label><input type="password" class="form-control" id="old_password" name="old_password" placeholder="Insert your old password"></div></form>').appendTo('#container-settings');
	
	
    jQuery("#form_change_password").append(tokenElement);
	
	$('<div class="form-group"><label >New Password</label><input type="password" class="form-control" id="new_password_1" name="new_password_1" placeholder="Insert new password"></div>').appendTo('#form_change_password');
	$('<div class="form-group"><label >Repeat new password</label><input type="password" class="form-control" id="new_password_2" name="new_password_2" placeholder="Repeat new password"></div>').appendTo('#form_change_password');
	$('<div class="form-group"><input id="save_changes"  type="button" value="Save" onclick="change_password('+user_id+');refreshLanguage();" class="btn btn-primary" /></div>').appendTo('#form_change_password');

}