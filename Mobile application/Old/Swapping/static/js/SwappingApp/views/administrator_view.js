function administrator_view_show_form(id_admin)
{
	if (id_admin!= null){
		var admin = administrator_controller_get(id_admin,true);
	}
	/*We clean the content-body content first of all*/
	body_clear();
	
	//i18n
	updateText();

	jQuery('<div id="container-admin"></div>').appendTo('#content-body');
	
	jQuery('#container-admin').html('<h3>Administrator Register Form</h3>'+
			'<p class=".p_form"> Insert your data, please: </p>'+
			'<form id="defaultForm" method="post" action="#" class="form-horizontal">'+
			'<input type="hidden"  name="is_staff" value="true" />'+
			'<div class="form-group" id="component_username">'+
			'<label class="col-lg-3 control-label">Username</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="username" name="username" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_name">'+
			'<label class="col-lg-3 control-label">Name</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="first_name" name="first_name" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_surname">'+
			'<label class="col-lg-3 control-label">Surname</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="last_name" name="last_name" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_email">'+
			'<label class="col-lg-3 control-label">Email address</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="email" name="email" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_phone">'+
			'<label class="col-lg-3 control-label">Phone</label>'+
			'<div class="col-lg-5">'+
			'<input type="text" class="form-control" id="phone" name="phone" />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_password">'+
			'<label class="col-lg-3 control-label">Password</label>'+
			'<div class="col-lg-5">'+
			'<input type="password" class="form-control" id="password" name="password" ' + (id_admin!=undefined && id_admin > 0?'disabled':'')  +' />'+
			'</div>'+
			'</div>'+
			'<div class="form-group" id="component_password2">'+
			'<label class="col-lg-3 control-label">Retype password</label>'+
			'<div class="col-lg-5">'+
			'<input type="password" class="form-control" id="passwordConfirm" name="confirmPassword"  ' + (id_admin!=undefined && id_admin > 0?'disabled':'')  +' />'+
			'</div>'+
			'</div>'+

			
			
			'<div class="form-group" >'+
			'<div class="col-lg-9 col-lg-offset-3">'+
			'<button  type="submit" '+
			'onclick="' + (id_admin==undefined ? 'administrator_controller_add_admin();"' : 'administrator_controller_update_admin(' + id_admin + ');"')+
			'class="btn btn-primary">Save</button>'+
			'</div>'+
			'</div>'+
			'</form>');
	

	
	if (id_admin != null)
	{
		//Now we call a function thats fulfill the form
		administrator_view_fulfill_form(admin);
	}
	
}


function administrator_view_show_profile(id_admin)
{
	administrator_controller_get(id_admin);
}
function administrator_view_show_profile_data(admin)
{
	/*We clean the content-body content first of all*/
	body_clear();
	
	//i18n
	updateText();
	
	jQuery('<div id="container-admin"></div>').appendTo('#content-body');
	jQuery('<h3>Administrator Profile</h3>').appendTo('#container-admin');

	jQuery('<table id="table_form" class="table table-hover table-striped table-bordered"></table>').appendTo('#container-admin');

	
	jQuery('<br/>').appendTo('#table_form');
	jQuery('<tbody id="table_body"></tbody>').appendTo('#table_form');
	jQuery('<tr id="tr1" class="row_form"></tr>').appendTo('#table_body');
		
	jQuery('<td id="component_username" class="component" /></td>').appendTo('#tr1');
	jQuery("<span ><b>Username: &nbsp;</b></span>").appendTo('#component_username');
	jQuery('<span>' + admin.username + '</span>').appendTo('#component_username');
	
	jQuery('<td id="component_name" class="component" /></td>').appendTo('#tr1');	
	jQuery("<span ><b>First Name: &nbsp;</b></span>").appendTo('#component_name');
	jQuery('<a  href="#" id="first_name" data-type="text" data-pk="' + admin.id + '" data-url="/SwappingApp/edit_administrator/" data-title="Enter first name">' + admin.first_name+ '</a>').appendTo('#component_name');
	
	jQuery('<td id="component_surname" class="component" /></td>').appendTo('#tr1');
	jQuery("<span ><b>Last Name: &nbsp;</b></span>").appendTo('#component_surname');
	jQuery('<a  href="#" id="last_name" data-type="text" data-pk="' + admin.id + '" data-url="/SwappingApp/edit_administrator/" data-title="Enter last name">' + admin.last_name+ '</a>').appendTo('#component_surname');
	
	jQuery('<tr id="tr2"></tr>').appendTo('#table_body');
	
	
	jQuery('<td id="component_email" class="component" /></td>').appendTo('#tr2');
	jQuery("<span ><b>Email: &nbsp;</b></span>").appendTo('#component_email');
	jQuery('<a  href="#" id="email" data-type="text" data-pk="' + admin.id + '" data-url="/SwappingApp/edit_administrator/" data-title="Enter email">' + admin.email+ '</a>').appendTo('#component_email');
	
	jQuery('<td id="component_phone" class="component" /></td>').appendTo('#tr2');	
	jQuery("<span ><b>Phone: &nbsp;</b></span>").appendTo('#component_phone');
	jQuery('<a  href="#" id="phone" data-type="text" data-pk="' + admin.id + '" data-url="/SwappingApp/edit_administrator/" data-title="Enter phone">' + admin.phone+ '</a>').appendTo('#component_phone');
	
	jQuery('<div id="sub_div" style="display: inline-flex;margin-bottom:5%;"></div>').appendTo('#container-admin');	
	jQuery('<a class="btn btn-default" style="padding-right: 18px;" onclick="administrator_view_show_form(' + admin.id  +');" href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a><br style="clear:both;"/>').appendTo('#sub_div');
	
	jQuery('<a id="delete"  data-toggle="confirmation" data-placement="right" style="margin-left:20px;" class="btn btn-danger" href="#" ><i class="fa fa-trash-o fa-lg"></i> Delete</a>').appendTo('#sub_div');
	jQuery('table').tablesorter();
	
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
	$('#first_name').editable();
	$('#last_name').editable();
	$('#phone').editable();
	$('#email').editable();
	
	//Tooltip confirmation for delete
	$('#delete').confirmation({
		placement: 'right', // How to position the confirmation - top | bottom | left | right
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
			administrator_controller_delete_admin(admin.id);
		}, // Set event when click at confirm button
		onCancel: function(){}// Set event when click at cancel button
		}) ;
}

function administrator_view_fulfill_form(admin)
{
	//First line is different because jQuery causes conflict
	$("input[name=username]").val(admin.username);
	jQuery('#first_name').val(admin.first_name);
	jQuery('#last_name').val(admin.last_name);
	jQuery('#phone').val(admin.phone);
	jQuery('#email').val(admin.email);
}