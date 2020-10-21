var myDropzone = null;
function user_view_create_forms(id_user)
{ 
	if (id_user!= null){
		user_view_show_profile_data(id_user);
	}else{
	/*We clean the content-body content first of all*/
	body_clear();

	$('<div id="container-user"></div>').appendTo('#content-body');
	
	
	
	
	
	$('<h3>User Register Form</h3>').appendTo('#container-user');
	
	$('<form method="POST" action="#" id="register_form_user" enctype="multipart/form-data" class="form-horizontal"></form>').appendTo('#container-user');
    
    
    
	
	$('<p class=".p_form"> Insert your data, please: </p>').appendTo('#register_form_user');	


//--------------------------------------------------------------------------------------------------------------------
	
	$('<div id="my-dropzone" style="padding:5em; background-repeat:no-repeat;height:18em;width:18em;background-image: url(../static/images/user_drop.jpg);">'+
	'<input name="photo" type="file" style="overflow: hidden;display:none;" /></div>').appendTo('#register_form_user');
	
	
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
	$('<div class="col-lg-5"><button type="submit" id="submit-all" type="submit" value="Submit" onclick="user_controller_add_user();" class="btn btn-primary form-control">Save</button></div>').appendTo('#sub_div');	
	
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
}

function show_rating(id_voted){
	 return user_controller_get_vote_by_voted(id_voted,true);	
}

function user_view_show_profile_data(id_user)
{
	/*We clean the content-body content first of all*/
	body_clear();
	
	var show_rate = show_rating(id_user).exists;
	
	var user = user_controller_get(id_user, true);
	var karmapoints = parseInt(user.karmaPoints);
	var percent1,percent2,percent3,percent4,percent5;
	var karmapoints1 = parseInt(user.karma_1points);
	var karmapoints2 = parseInt(user.karma_2points);
	var karmapoints3 = parseInt(user.karma_3points);
	var karmapoints4 = parseInt(user.karma_4points);
	var karmapoints5 = parseInt(user.karma_5points);
	var media;
	alert(karmapoints);
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
	alert("alert "+photoURL.url);
	$('<form method="POST" action="#" role="form" id="show_user_form" enctype="multipart/form-data" style="form-inline" role="form"></form>').appendTo('#content-body');
	jQuery('<h3>User Profile</h3>').appendTo('#show_user_form');

		jQuery('<div class="col-md-6 portfolio-item" id="container_image_profile" >').appendTo('#show_user_form');
		jQuery('<div  id="profile_image" class="thumbnail" ></div>').appendTo('#container_image_profile');

		if(show_rate == true){
		
			$('<input id="input-21f"  type="number" class="rating" min=0 max=5 step=1  >').appendTo('#container_image_profile');
			$('<div class="form-group"><div class="col-lg-9 col-lg-offset-3" id="sub_div"></div></div>').appendTo('#container_image_profile');	
			$('<div class="col-lg-5"><button type="submit" id="submit-all" type="submit" value="Submit" onclick="user_controller_vote('+id_user+');" class="btn btn-primary form-control">Vote</button></div>').appendTo('#sub_div');	
			$("#input-21f").rating();
		}
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    tokenElement.attr('id', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#show_user_form").append(tokenElement);
    
	jQuery(img).appendTo('#profile_image');

	jQuery(img).appendTo('#profile_image');

	$('<div class="form-group" id="row_1"/></div>').appendTo('#show_user_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Username: &nbsp;</b></span>").appendTo('#row_1');
	jQuery("<span class='col-lg-4 control-label'>" + user.username + "</span>").appendTo('#row_1');
	
	$('<div class="form-group" id="row_2"/></div>').appendTo('#show_user_form');	
	jQuery("<span  class='col-lg-2 control-label'><b>First Name: &nbsp;</b></span>").appendTo('#row_2');
	jQuery("<span  class='col-lg-4 control-label'>" + user.first_name + "</span>").appendTo('#row_2');

	
	$('<div class="form-group" id="row_3"/></div>').appendTo('#show_user_form');	
	jQuery("<span  class='col-lg-2 control-label'><b>Last Name: &nbsp;</b></span>").appendTo('#row_3');
	jQuery("<span  class='col-lg-4 control-label'>" + user.last_name + "</span>").appendTo('#row_3');
	
	$('<div class="form-group" id="row_4" /></div>').appendTo('#show_user_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Email: &nbsp;</b></span>").appendTo('#row_4');
	jQuery("<span class='col-lg-4 control-label'>" + user.email + "</span>").appendTo('#row_4');
	
	$('<div class="form-group" id="row_5" /></div>').appendTo('#show_user_form');	
	jQuery("<span class='col-lg-2 control-label'><b>Phone: &nbsp;</b></span>").appendTo('#row_5');
	jQuery("<span class='col-lg-4 control-label'>" + user.phone + "</span>").appendTo('#row_5');
	
	$('<div class="form-group" id="row_6" /></div>').appendTo('#show_user_form');	
	jQuery("<span class='col-lg-2 control-label' style='color:white;'><b>blank</b></span>").appendTo('#row_6');
	jQuery("<span class='col-lg-4 control-label' style='color:white;'> blank </span>").appendTo('#row_6');
	
	
	
	$('<div class="form-group" id ="row_rate"></div>').appendTo('#show_user_form');
	
	$('<div class="col-xs-12 col-md-6 show_rate">'+
    '<div class="well well-sm">'+
        '<div class="row">'+
            '<div class="col-xs-12 col-md-6 text-center">'+
                '<h1 class="rating-num">'+media+'</h1>'+
                '<div class="rating" id="rating_stars">'+
                '</div>'+
                '<div>'+
                    '<span ></span>'+karmapoints+' total'+
                '</div>'+
            '</div>'+
            '<div class="col-xs-12 col-md-6">'+
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
	
	
	for ( var i = 0; i < Math.floor(media); i++ ) {
		$('<span class="glyphicon glyphicon-star"></span>').appendTo('#rating_stars');
	}
	
	for ( var i = 0; i < 5-Math.floor(media); i++ ) {
		$('</span><span class="glyphicon glyphicon-star-empty"></span>').appendTo('#rating_stars');
	}
	
}

function user_view_edit_forms(id_user){
	if (id_user!= null){
		var user = user_controller_get(id_user,true);
		body_clear();

		$('<div id="container-user"></div>').appendTo('#content-body');
		
		$('<div class="page-header"><h2>User Edit Form</h2></div>').appendTo('#container-user');
		
		$('<form method="POST" action="#" role="form" id="user_edit_form" enctype="multipart/form-data" style="form-horizontal"></form>').appendTo('#container-user');

		var tokenElement = jQuery(document.createElement('input'));
	    tokenElement.attr('type', 'hidden');
	    tokenElement.attr('name', 'csrfmiddlewaretoken');
	    tokenElement.attr('id', 'csrfmiddlewaretoken');
	    var csrftoken = getCookie('csrftoken');
	    tokenElement.val( csrftoken );
	    jQuery("#user_edit_form").append(tokenElement);
	    
		$('<div class="form-group" id="row_1" /></div>').appendTo('#user_edit_form');	
	
		$("<label id='user_username' for='username_input' class='col-lg-2 control-label'>Username:</label>").appendTo('#row_1');
		$("<div class='col-lg-4'><input class='form-control' type='text' id='username_input' name='username_input'  value='"+user.username+"' /></div>").appendTo('#row_1');
		$("<label id='user_name' for='name_input' class='col-lg-2 control-label'>Name:</label>").appendTo('#row_1');
		$("<div class='col-lg-4'><input class='form-control' type='text' id='name_input' name='name_input' value='"+user.first_name+"' /></div>").appendTo('#row_1');

		$('<div class="form-group" id="row_2" /></div>').appendTo('#user_edit_form');	

		$("<label id='user_surname' class='col-lg-2 control-label' for='surname_input'>Surname:</label>").appendTo('#row_2');
		$("<div class='col-lg-4'><input class='form-control' type='text' id='surname_input' name='surname_input' value='"+user.last_name+"' /></div>").appendTo('#row_2');
		$("<label id='user_email' class='col-lg-2 control-label' for='email_input'>Email:</label>").appendTo('#row_2');
		$("<div class='col-lg-4'><input class='form-control' type='text' id='email_input' name='email_input' value='"+user.email+"'/></div>").appendTo('#row_2');

		$('<div class="form-group" id="row_3" /></div>').appendTo('#user_edit_form');	

		$("<label id='user_phone' class='col-lg-2 control-label' for='phone_input'>Phone:</label>").appendTo('#row_3');
		$("<div class='col-lg-4'><input class='form-control' type='text' id='phone_input' name='phone_input' value='"+user.phone+"'/></div>").appendTo('#row_3');

		$('<label id="user_photo" class="col-lg-2 control-label" for="photo_input"></label>').appendTo('#row_3');
		$('<div class="col-lg-4"><input class="form-control" type="hidden" id="photo_input" name="photo_input" class="rm-input" /></div>').appendTo('#row_3');
		
		$('<div class="form-group" id="row_4"  style="clear:both;width:15%;margin:auto; " /></div>').appendTo('#user_edit_form');	
		$('<button type="submit" class="btn btn-primary" style="clear:both;" value="Submit" onclick="user_controller_edit_user('+id_user+')"/>').appendTo('#row_4');	
		
	}
}



function user_ok()
{
	body_clear();
	$('<div id="container-user"></div>').appendTo('#content-body');
		$('<h3>User created!!!</h3>').appendTo('#container-user');
		$('<input type="button" value="Return to home" onclick="user_controller_add_user()" />').appendTo('#container-user');	

	}

function user_view_settings(user_id){
	body_clear();
	alert (user_id);
	$('<div id="container-settings"></div>').appendTo('#content-body');
	$('<h3>Settings</h3>').appendTo('#container-settings');
	$('<form method="POST" action="#" id="user_settings_form" enctype="multipart/form-data"></form>').appendTo('#container-settings');

	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    tokenElement.attr('id', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#user_settings_form").append(tokenElement);
    
	$('<br/>').appendTo('#user_settings_form');	$('</br>').appendTo('#user_settings_form');	$('</br>').appendTo('#user_settings_form');
	
	$('<div id="form_settings" class="form-horizontal"></div>').appendTo('#user_settings_form');
	
	jQuery('<div id="row_1" class="form-group"></div>').appendTo('#form_settings');
	$('<label class="col-lg-6 control-label"><span class="glyphicon glyphicon-remove"></span> Do you want to delete your profile?</label>').appendTo('#row_1');
	$('<input type="button" value="Unsubscribe" onclick="user_controller_delete_user('+user_id+')" class="col-lg-3 btn btn-primary" />').appendTo('#row_1');
	
	jQuery('<div id="row_2" class="form-group"></div>').appendTo('#form_settings');
	$('<label class="col-lg-6 control-label"><span class="glyphicon glyphicon-repeat"></span> Do you want to change the password?</label>').appendTo('#row_2');
	$('<input id="button_change_password"  type="button" value="Change password" class="col-lg-3 btn btn-primary" />').appendTo('#row_2');
	 $('#button_change_password').click(function () {
         $(".showhideform").toggle();
      });
	 
	$('<form style="width:50%;margin:auto;display:none;" id="form_change_password" class="showhideform" ><div class="form-group"><label for="ejemplo_email_1">Old password</label><input type="password" class="form-control" id="old_password" name="old_password" placeholder="Insert your old password"></div></form>').appendTo('#container-settings');
	
	var tokenElement = jQuery(document.createElement('input'));
    tokenElement.attr('type', 'hidden');
    tokenElement.attr('name', 'csrfmiddlewaretoken');
    tokenElement.attr('id', 'csrfmiddlewaretoken');
    var csrftoken = getCookie('csrftoken');
    tokenElement.val( csrftoken );
    jQuery("#form_change_password").append(tokenElement);
	
	$('<div class="form-group"><label >New Password</label><input type="password" class="form-control" id="new_password_1" name="new_password_1" placeholder="Insert new password"></div>').appendTo('#form_change_password');
	$('<div class="form-group"><label >Repeat new password</label><input type="password" class="form-control" id="new_password_2" name="new_password_2" placeholder="Repeat new password"></div>').appendTo('#form_change_password');
	$('<div class="form-group"><input id="save_changes"  type="button" value="Save" onclick="change_password('+user_id+')" class="btn btn-primary" /></div>').appendTo('#form_change_password');

}