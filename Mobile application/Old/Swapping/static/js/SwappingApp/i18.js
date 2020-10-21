/**
 * Created on 05/04/2014
 * Author David
 * i18.js
 * Swapping
 */
	// load I18N bundles
	jQuery(document).ready(function() {
		loadBundles('en');
		
	});

function loadBundles(lang) {
	jQuery.i18n.properties({
	    name:'Messages', 
	    path:'/static/i18n/', 
	    mode:'both',
	    language:lang, 
	    callback: function() {
	    	updateText();
	    }
	});
}

function updateText() {
	// Accessing values through the map
	var username = 'username';
	var password = 'password'; 
	var search = "search";
	var login = "login";
	var cancel = "cancel";
	var register = "register";
	var help = "help";
	var title_register_form_admin = "title_register_form_admin";
	var name = "name";
	var surname= "surname";
	var phone = "phone";
	var pass_confirm = "pass_confirm";
	var save = "save";
	
	jQuery('#search-box h4')
		.empty()
		.append(''+jQuery.i18n.prop(search)+'');
	
	jQuery('#sign_in_i18n')
	.empty()
	.append(''+jQuery.i18n.prop(login)+' <span class="glyphicon glyphicon-user"></span>');
		
	jQuery('#sign_in_title_i18n h1')
	.empty()
	.append(''+jQuery.i18n.prop(login)+' ');
	
	jQuery('#username').attr("placeholder", jQuery.i18n.prop(username));
	jQuery('#password').attr("placeholder", jQuery.i18n.prop(password));
	
	jQuery('#form_login button')
	.empty()
	.append(''+jQuery.i18n.prop(login)+' ');
	
	jQuery('#cancel')
	.empty()
	.append(''+jQuery.i18n.prop(cancel)+' ');
	
	jQuery('#sign_in_register')
	.empty()
	.append(''+jQuery.i18n.prop(register)+' ');
	
	jQuery('#sign_in_help')
	.empty()
	.append(''+jQuery.i18n.prop(help)+' ');
	
	jQuery('#component_username label')
	.empty()
	.append(''+jQuery.i18n.prop(username)+' ');
	
	jQuery('#component_name label')
	.empty()
	.append(''+jQuery.i18n.prop(name)+' ');
	
	jQuery('#component_surname label')
	.empty()
	.append(''+jQuery.i18n.prop(surname)+' ');
	
	jQuery('#component_password label')
	.empty()
	.append(''+jQuery.i18n.prop(password)+' ');
	
	jQuery('#component_phone label')
	.empty()
	.append(''+jQuery.i18n.prop(phone)+' ');
	
	jQuery('#component_password2 label')
	.empty()
	.append(''+jQuery.i18n.prop(pass_confirm)+' ');
	
	jQuery('#sub_div input').attr("value", jQuery.i18n.prop(save));
	
	jQuery('#container-admin h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_admin)+' ');
	

	/*Service*/
	var title_register_form_service = "title_register_form_service";
	var service_title= "service_title";
	var service_description= "service_description";
	var service_photo = "service_photo";
	var service_enable_swapping = "service_enable_swapping";
	var service_price = "service_price";
	var service_category = "service_category";
	var service_latitude = "service_latitude";
	var service_longitude = "service_longitude";
	var service_dlatitude = "service_dlatitude";
	var service_dlongitude = "service_dlongitude";
	var service_available_places = "service_available_places";
	var service_pets = "service_pets";
	var service_baggage = "service_baggage";
	var service_smoker = "service_smoker";
	var service_conversation = "service_conversation";
	var service_day_of_week = "service_day_of_week";
	var service_duration = "service_duration";
	var service_beginning = "service_beginning";
	var service_ending = "service_ending";
	var service_create = "service_create";
	var service_car = "service_car";
	var service_hour = "service_hour";
	var service_estate = "service_estate";
	
	jQuery('#component_title label')
	.empty()
	.append(''+jQuery.i18n.prop(service_title)+' ');
	jQuery('#component_photo label')
	.empty()
	.append(''+jQuery.i18n.prop(service_photo)+' ');
	jQuery('#component_desc label')
	.empty()
	.append(''+jQuery.i18n.prop(service_description)+' ');
	jQuery('#component_price label')
	.empty()
	.append(''+jQuery.i18n.prop(service_price)+' ');
	jQuery('#component_enable label')
	.empty()
	.append(''+jQuery.i18n.prop(service_enable_swapping)+' ');
	jQuery('#component_category label')
	.empty()
	.append(''+jQuery.i18n.prop(service_category)+' ');
	jQuery('#component_availables_places label')
	.empty()
	.append(''+jQuery.i18n.prop(service_available_places)+' ');
	jQuery('#component_longitude label')
	.empty()
	.append(''+jQuery.i18n.prop(service_longitude)+' ');
	jQuery('#component_latitude label')
	.empty()
	.append(''+jQuery.i18n.prop(service_latitude)+' ');
	jQuery('#component_conversation label')
	.empty()
	.append(''+jQuery.i18n.prop(service_conversation)+' ');
	jQuery('#component_destination_longitude label')
	.empty()
	.append(''+jQuery.i18n.prop(service_dlongitude)+' ');
	jQuery('#component_destination_latitude label')
	.empty()
	.append(''+jQuery.i18n.prop(service_dlatitude)+' ');
	jQuery('#component_pets label')
	.empty()
	.append(''+jQuery.i18n.prop(service_pets)+' ');
	jQuery('#component_baggage label')
	.empty()
	.append(''+jQuery.i18n.prop(service_baggage)+' ');
	jQuery('#component_smoker label')
	.empty()
	.append(''+jQuery.i18n.prop(service_smoker)+' ');
	jQuery('#component_day label')
	.empty()
	.append(''+jQuery.i18n.prop(service_day_of_week)+' ');
	jQuery('#component_duration label')
	.empty()
	.append(''+jQuery.i18n.prop(service_duration)+' ');
	jQuery('#component_beginning label')
	.empty()
	.append(''+jQuery.i18n.prop(service_beginning)+' ');
	jQuery('#component_ending label')
	.empty()
	.append(''+jQuery.i18n.prop(service_ending)+' ');
	jQuery('#container-service h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_service)+' ');
	jQuery('#component_ratio_car label')
	.empty()
	.append(''+jQuery.i18n.prop(service_car)+' ');
	jQuery('#component_ratio_hour label')
	.empty()
	.append(''+jQuery.i18n.prop(service_hour)+' ');
	jQuery('#component_ratio_estate label')
	.empty()
	.append(''+jQuery.i18n.prop(service_estate)+' ');
	jQuery('#sub_div input')
	.empty()
	.append(''+jQuery.i18n.prop(service_create)+' ');
	
	//User
	var title_register_form_user = "title_register_form_user";
	var user_photo = "user_photo";
	var user_username = "user_username";
	var user_user = "user_user";
	var user_surname = "user_surname";
	var user_password = "user_password";
	var user_email = "user_email";
	var user_phone = "user_phone";

	jQuery('#user_component_photo label')
	.empty()
	.append(''+jQuery.i18n.prop(user_photo)+' ');
	jQuery('#user_component_username label')
	.empty()
	.append(''+jQuery.i18n.prop(user_username)+' ');

	jQuery('#user_component_name label')
	.empty()
	.append(''+jQuery.i18n.prop(user_user)+' ');
	jQuery('#user_component_surname label')
	.empty()
	.append(''+jQuery.i18n.prop(user_surname)+' ');
	jQuery('#user_component_password label')
	.empty()
	.append(''+jQuery.i18n.prop(user_password)+' ');

	jQuery('#user_component_email label')
	.empty()
	.append(''+jQuery.i18n.prop(user_email)+' ');

	jQuery('#user_component_phone label')
	.empty()
	.append(''+jQuery.i18n.prop(user_phone)+' ');	
	
	jQuery('#container-user h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_user)+' ');
	
	/*Message*/
	var title_register_form_message = "title_register_form_message";
	var message_subject = "message_subject";
	var message_conetent = "message_conetent";
	var message_send = "message_send";
	jQuery('#container-message h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_message)+' ');
	jQuery('#component_sub label')
	.empty()
	.append(''+jQuery.i18n.prop(message_subject)+' ');
	jQuery('#component_cont label')
	.empty()
	.append(''+jQuery.i18n.prop(message_conetent)+' ');
	jQuery('#sub_div input')
	.empty()
	.append(''+jQuery.i18n.prop(message_send)+' ');
	
	/*News*/
	
	var title_register_form_news = "title_register_form_news";
	var news_title = "news_title";
	var news_description = "news_description";
	var news_create = "news_create";
	jQuery('#container-news h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_news)+' ');
	jQuery('#component_title label')
	.empty()
	.append(''+jQuery.i18n.prop(news_title)+' ');
	jQuery('#component_desc label')
	.empty()
	.append(''+jQuery.i18n.prop(news_description)+' ');
	jQuery('#sub_div input')
	.empty()
	.append(''+jQuery.i18n.prop(news_create)+' ');
}