/**
 * Created on 05/04/2014
 * Author David
 * i18.js
 * Swapping
 */
	// load I18N bundles
	jQuery(document).ready(function() {
		loadBundles('es');
		
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

	jQuery('#sub_div button')
	.empty()
	.append(''+jQuery.i18n.prop(save)+' ');
	
	jQuery('#sub_div input').attr("value", jQuery.i18n.prop(save));
	
	jQuery('#container-admin h3')
	.empty()
	.append(''+jQuery.i18n.prop(title_register_form_admin)+' ');

	jQuery('#accordion a')
	.empty()
	.append('<i class="fa fa-search"></i>'+jQuery.i18n.prop("accordion")+' ');



	/*Home.html*/

	var home = "home";

	jQuery('#home a')
	.empty()
	.append('<i class="fa fa-home"></i> '+jQuery.i18n.prop(home)+' ');

	jQuery('#items_view_container a')
	.empty()
	.append('<i class="fa fa-desktop"></i> '+jQuery.i18n.prop("items_view_container")+' ');
	
	jQuery('#services_view_container a')
	.empty()
	.append('<i class="fa fa-map-marker"></i> '+jQuery.i18n.prop("services_view_container")+' ');

	jQuery('#for_sale')
	.empty()
	.append(''+jQuery.i18n.prop("for_sale")+' ');

	jQuery('#featured')
	.empty()
	.append(''+jQuery.i18n.prop("featured")+' ');

	jQuery('#trends_h4')
	.empty()
	.append(''+jQuery.i18n.prop("trends")+' ');

	jQuery('#my_profile')
	.empty()
	.append('<i class="fa fa-user fa-fw"></i> '+jQuery.i18n.prop("my_profile")+' ');

	jQuery('#my_items')
	.empty()
	.append('<i class="fa fa-desktop"></i> '+jQuery.i18n.prop("my_items")+' ');

	jQuery('#my_services')
	.empty()
	.append('<i class="fa fa-map-marker"></i> '+jQuery.i18n.prop("my_services")+' ');

	jQuery('#my_swaps')
	.empty()
	.append('<i class="fa fa-exchange"></i> '+jQuery.i18n.prop("my_swaps")+' ');

	jQuery('#complaints')
	.empty()
	.append('<i class="fa fa-thumbs-o-down"></i> '+jQuery.i18n.prop("complaints")+' ');

	jQuery('#buy_credits')
	.empty()
	.append('<i class="fa fa-dollar"></i> '+jQuery.i18n.prop("buy_credits")+' ');

	jQuery('#mailbox')
	.empty()
	.append('<i class="fa fa-envelope"></i> '+jQuery.i18n.prop("mailbox")+' ');

	jQuery('#service_join')
	.empty()
	.append('<i class="fa fa-exchange"></i> '+jQuery.i18n.prop("service_join")+' ');

	jQuery('#contact_id')
	.empty()
	.append(''+jQuery.i18n.prop("contact_id")+' ');

	jQuery('#hours_tag')
	.empty()
	.append(''+jQuery.i18n.prop("hours_tag")+' ');

	jQuery('#transport_tag')
	.empty()
	.append(''+jQuery.i18n.prop("transport_tag")+' ');

	jQuery('#estate_tag')
	.empty()
	.append(''+jQuery.i18n.prop("estate_tag")+' ');


	/*User profile*/

	jQuery('#show_user_form h3')
	.empty()
	.append(''+jQuery.i18n.prop("title_profile")+' ');

	jQuery('#user_username')
	.empty()
	.append('<b>'+jQuery.i18n.prop("user_username")+' <b>');

	jQuery('#user_surname')
	.empty()
	.append('<b>'+jQuery.i18n.prop("user_surname")+'<b> ');

	jQuery('#user_name')
	.empty()
	.append('<b>'+jQuery.i18n.prop("user_name")+'<b> ');

	jQuery('#user_email')
	.empty()
	.append('<b>'+jQuery.i18n.prop("user_email")+' <b>');

	jQuery('#user_phone')
	.empty()
	.append('<b>'+jQuery.i18n.prop("user_phone")+'<b> ');

	jQuery('#settings_button a')
	.empty()
	.append('<i class=\"fa fa-cog\"></i> '+jQuery.i18n.prop("settings_button")+' ');

	jQuery('#edit_button_user a')
	.empty()
	.append('<i class=\"fa fa-pencil fa-fw\"></i> '+jQuery.i18n.prop("edit_button_user")+' ');

	jQuery('#wish_button a')
	.empty()
	.append('<i class="fa fa-heart"></i>'+jQuery.i18n.prop("wish_button")+' ');

	jQuery('#submit_button')
	.empty()
	.append(''+jQuery.i18n.prop("submit_button")+' ');

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

	
	//list items

	jQuery('#items_title')
	.empty()
	.append(''+jQuery.i18n.prop("items_title")+' ');

	jQuery('#images')
	.empty()
	.append(''+jQuery.i18n.prop("images")+' ');

	jQuery('#list_itemdescription')
	.empty()
	.append(''+jQuery.i18n.prop("list_itemdescription")+' ');

	jQuery('#created')
	.empty()
	.append(''+jQuery.i18n.prop("created")+' ');

	jQuery('#list_itemcategory')
	.empty()
	.append(''+jQuery.i18n.prop("list_itemcategory")+' ');

	jQuery('#price')
	.empty()
	.append(''+jQuery.i18n.prop("price")+' ');

	jQuery('#actions')
	.empty()
	.append(''+jQuery.i18n.prop("actions")+' ');

	jQuery('#form_item h3')
	.empty()
	.append(''+jQuery.i18n.prop("create_item")+' ');

	jQuery('#create_item_b')
	.empty()
	.append(''+jQuery.i18n.prop("create_item_b")+' ');

	jQuery('#owner')
	.empty()
	.append(''+jQuery.i18n.prop("owner")+' ');

	jQuery('#type')
	.empty()
	.append(''+jQuery.i18n.prop("type")+' ');

	jQuery('#swapping_allow')
	.empty()
	.append('<input type="checkbox">'+jQuery.i18n.prop("swapping_allow")+' ');

	jQuery('#about_us')
	.empty()
	.append(''+jQuery.i18n.prop("about_us")+' ');

	jQuery('#contact_us')
	.empty()
	.append(''+jQuery.i18n.prop("contact_us")+' ');

	//list service
	var list_services = "list_services";
	var car_services = "car_services";
	var hour_services = "hour_services";
	var estate_services = "estate_services";
	var images_cars = "images_cars";
	var description_cars = "description_cars";
	var created_cars = "created_cars";
	var category_cars = "category_cars";
	var price_cars = "price_cars";
	var actions_cars = "actions_cars";
	var images_hours = "images_hours";
	var description_hours = "description_hours";
	var created_hours = "created_hours";
	var category_hours = "category_hours";
	var price_hours = "price_hours";
	var actions_hours = "actions_hours";
	var images_estates = "images_estates";
	var description_estates = "description_estates";
	var created_estates = "created_estates";
	var category_estates = "category_estates";
	var price_estates = "price_estates";
	var actions_estates = "actions_estates";
	var button_create_service = "button_create_service";
	
	
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
	jQuery('#service_enable_swapping')
	.empty()
	.append(''+jQuery.i18n.prop(service_enable_swapping)+' ');
	jQuery('#component_category label')
	.empty()
	.append(''+jQuery.i18n.prop(service_category)+' ');
	jQuery('#component_avaiable_place label')
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
	jQuery('#component_radio_car label')
	.empty()
	.append(''+jQuery.i18n.prop(service_car)+' ');
	jQuery('#component_radio_hour label')
	.empty()
	.append(''+jQuery.i18n.prop(service_hour)+' ');
	jQuery('#component_radio_estate label')
	.empty()
	.append(''+jQuery.i18n.prop(service_estate)+' ');
	jQuery('#sub_div input')
	.empty()
	.append(''+jQuery.i18n.prop(service_create)+' ');
	
	//list service
	jQuery('#list_services')
	.empty()
	.append(''+jQuery.i18n.prop(list_services)+' ');
	jQuery('#service_destination')
	.empty()
	.append(''+jQuery.i18n.prop("service_destination")+' ');
	jQuery('#car_services')
	.empty()
	.append(''+jQuery.i18n.prop(car_services)+' ');
	jQuery('#hour_services')
	.empty()
	.append(''+jQuery.i18n.prop(hour_services)+' ');
	jQuery('#estate_services')
	.empty()
	.append(''+jQuery.i18n.prop(estate_services)+' ');
	jQuery('#images_cars')
	.empty()
	.append(''+jQuery.i18n.prop(images_cars)+' ');
	jQuery('#description_cars')
	.empty()
	.append(''+jQuery.i18n.prop(description_cars)+' ');
	jQuery('#created_cars')
	.empty()
	.append(''+jQuery.i18n.prop(created_cars)+' ');
	jQuery('#category_cars')
	.empty()
	.append(''+jQuery.i18n.prop(category_cars)+' ');
	jQuery('#price_cars')
	.empty()
	.append(''+jQuery.i18n.prop(price_cars)+' ');
	jQuery('#actions_cars')
	.empty()
	.append(''+jQuery.i18n.prop(actions_cars)+' ');
	
	jQuery('#images_hours')
	.empty()
	.append(''+jQuery.i18n.prop(images_hours)+' ');
	jQuery('#description_hours')
	.empty()
	.append(''+jQuery.i18n.prop(description_hours)+' ');
	jQuery('#created_hours')
	.empty()
	.append(''+jQuery.i18n.prop(created_hours)+' ');
	jQuery('#category_hours')
	.empty()
	.append(''+jQuery.i18n.prop(category_hours)+' ');
	jQuery('#price_hours')
	.empty()
	.append(''+jQuery.i18n.prop(price_hours)+' ');
	jQuery('#actions_hours')
	.empty()
	.append(''+jQuery.i18n.prop(actions_hours)+' ');
	
	jQuery('#images_estates')
	.empty()
	.append(''+jQuery.i18n.prop(images_estates)+' ');
	jQuery('#description_estates')
	.empty()
	.append(''+jQuery.i18n.prop(description_estates)+' ');
	jQuery('#created_estates')
	.empty()
	.append(''+jQuery.i18n.prop(created_estates)+' ');
	jQuery('#category_estates')
	.empty()
	.append(''+jQuery.i18n.prop(category_estates)+' ');
	jQuery('#price_estates')
	.empty()
	.append(''+jQuery.i18n.prop(price_estates)+' ');
	jQuery('#actions_estates')
	.empty()
	.append(''+jQuery.i18n.prop(actions_estates)+' ');
	jQuery('#button_create_service')
	.empty()
	.append(''+jQuery.i18n.prop(button_create_service)+' ');
	
	//edit service

	jQuery('#show_service_form h2')
	.empty()
	.append(''+jQuery.i18n.prop("show_service_form")+' ');

	jQuery('#service_title')
	.empty()
	.append(''+jQuery.i18n.prop(service_title)+' ');

	jQuery('#service_description')
	.empty()
	.append(''+jQuery.i18n.prop(service_description)+' ');

	jQuery('#service_price')
	.empty()
	.append(''+jQuery.i18n.prop("service_price")+' ');

	jQuery('#service_places')
	.empty()
	.append(''+jQuery.i18n.prop("service_places")+' ');

	jQuery('#service_category')
	.empty()
	.append(''+jQuery.i18n.prop("service_category")+' ');

	jQuery('#service_premium')
	.empty()
	.append(''+jQuery.i18n.prop("service_premium")+' ');

	jQuery('#service_enable_swapping')
	.empty()
	.append(''+jQuery.i18n.prop("service_swapping")+' ');

	jQuery('#service_status')
	.empty()
	.append(''+jQuery.i18n.prop("service_status")+' ');

	jQuery('#service_displayed')
	.empty()
	.append(''+jQuery.i18n.prop("service_displayed")+' ');

	jQuery('#service_quantity')
	.empty()
	.append(''+jQuery.i18n.prop("service_quantity")+' ');

	jQuery('#service_yes')
	.empty()
	.append(''+jQuery.i18n.prop("service_yes")+' ');

	jQuery('#service_no')
	.empty()
	.append(''+jQuery.i18n.prop("service_no")+' ');

	jQuery('#service_active')
	.empty()
	.append(''+jQuery.i18n.prop("service_active")+' ');

	jQuery('#service_notactive')
	.empty()
	.append(''+jQuery.i18n.prop("service_notactive")+' ');

	jQuery('#service_renew')
	.empty()
	.append(''+jQuery.i18n.prop("service_renew")+' ');

	jQuery('#service_b_renew')
	.empty()
	.append(''+jQuery.i18n.prop("service_b_renew")+' ');

	jQuery('#service_conversation')
	.empty()
	.append(''+jQuery.i18n.prop(service_conversation)+' ');

	jQuery('#service_pets')
	.empty()
	.append(''+jQuery.i18n.prop(service_pets)+' ');

	jQuery('#service_baggage')
	.empty()
	.append(''+jQuery.i18n.prop(service_baggage)+' ');

	jQuery('#service_smoker')
	.empty()
	.append(''+jQuery.i18n.prop(service_smoker)+' ');

	jQuery('#delete_button')
	.empty()
	.append('<i class="fa fa-times"></i>'+jQuery.i18n.prop("delete_button")+' ');

	jQuery('#service_day_of_week')
	.empty()
	.append(''+jQuery.i18n.prop(service_day_of_week)+' ');

	jQuery('#service_duration')
	.empty()
	.append(''+jQuery.i18n.prop(service_duration)+' ');

	jQuery('#edit_button')
	.empty()
	.append('<i class=\"fa fa-pencil fa-fw\"></i>'+jQuery.i18n.prop("edit_button")+' ');

	jQuery('#user')
	.empty()
	.append(''+jQuery.i18n.prop("user")+' ');

	jQuery('#service_owner')
	.empty()
	.append(' '+jQuery.i18n.prop("service_owner")+' ');


    jQuery('#service_moment')
	.empty()
	.append(''+jQuery.i18n.prop("service_moment")+' ');

	jQuery('#service_joined')
	.empty()
	.append(''+jQuery.i18n.prop("service_joined")+' ');

	jQuery('#pay_hand')
	.empty()
	.append('<i class="fa fa-money fa-fw"></i>'+jQuery.i18n.prop("pay_hand")+' ');

	jQuery('#pay_credits')
	.empty()
	.append('<i class="fa fa-ticket"></i>'+jQuery.i18n.prop("pay_credits")+' ');

	jQuery('#send_message')
	.empty()
	.append('<i class="fa fa-envelope"></i>'+jQuery.i18n.prop("send_message")+' ');

	jQuery('#date_of_beginning')
	.empty()
	.append(''+jQuery.i18n.prop("date_of_beginning")+' ');

	jQuery('#date_of_ending')
	.empty()
	.append(''+jQuery.i18n.prop("date_of_ending")+' ');

	jQuery('#option_swapping')
	.empty()
	.append(''+jQuery.i18n.prop("option_swapping")+' ');

	jQuery('#service_origin')
	.empty()
	.append(''+jQuery.i18n.prop("service_origin")+' ');

	jQuery('#service_transport')
	.empty()
	.append(''+jQuery.i18n.prop("service_transport")+' ');

	jQuery('#service_hours')
	.empty()
	.append(''+jQuery.i18n.prop("service_hours")+' ');

	

// List Wish
	var my_list_wish = "my_list_wish";
	var images_wish = "images_wish";
	var description_wish = "description_wish";
	var owner_wish = "owner_wish";
	var category_wish = "category_wish";
	var price_wish = "price_wish";
	var actions_wish = "actions_wish";
	
	jQuery('#my_list_wish')
	.empty()
	.append(''+jQuery.i18n.prop(my_list_wish)+' ');
	
	jQuery('#images_wish')
	.empty()
	.append(''+jQuery.i18n.prop(images_wish)+' ');
	jQuery('#description_wish')
	.empty()
	.append(''+jQuery.i18n.prop(description_wish)+' ');
	
	jQuery('#category_wish')
	.empty()
	.append(''+jQuery.i18n.prop(category_wish)+' ');
	jQuery('#price_wish')
	.empty()
	.append(''+jQuery.i18n.prop(price_wish)+' ');
	jQuery('#owner_wish')
	.empty()
	.append(''+jQuery.i18n.prop(owner_wish)+' ');
	jQuery('#actions_wish')
	.empty()
	.append(''+jQuery.i18n.prop(actions_wish)+' ');

	//Items

	jQuery('#show_item_form h3')
	.empty()
	.append(''+jQuery.i18n.prop("item_properties")+' ');
	






	//credits

	jQuery('#credits_title h4')
	.empty()
	.append(''+jQuery.i18n.prop("credits_title")+'');

	jQuery('#number_of_credits')
	.empty()
	.append('<strong>'+jQuery.i18n.prop("number_of_credits")+'</strong> ');

	jQuery('#credits_button a')
	.empty()
	.append(''+jQuery.i18n.prop("credits_button")+' ');



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
	
	//List messages
	var message_received = "message_received";
	var results_received = "results_received";
	var message_send = "message_send";
	var results_send = "results_send";
	jQuery('#message_received')
	.empty()
	.append(''+jQuery.i18n.prop(message_received)+' ');
	jQuery('#results_received')
	.empty()
	.append(''+jQuery.i18n.prop(results_received)+' ');
	jQuery('#message_send')
	.empty()
	.append(''+jQuery.i18n.prop(message_send)+' ');
	jQuery('#results_send')
	.empty()
	.append(''+jQuery.i18n.prop(results_send)+' ');

	jQuery('#container-complaint h1')
	.empty()
	.append(''+jQuery.i18n.prop("complaints_text")+' ');

	jQuery('#summary_block')
	.empty()
	.append(''+jQuery.i18n.prop("summary_block")+' ');
	

	jQuery('#goods_subtotal')
	.empty()
	.append(''+jQuery.i18n.prop("goods_subtotal")+' ');
	

	jQuery('#taxes_inf')
	.empty()
	.append(''+jQuery.i18n.prop("taxes_inf")+' ');

	jQuery('#delivery_cost')
	.empty()
	.append(''+jQuery.i18n.prop("delivery_cost")+' ');

	jQuery('#order_total')
	.empty()
	.append(''+jQuery.i18n.prop("order_total")+' ');
	
	jQuery('#continue_checkout')
	.empty()
	.append('<i class="fa fa-credit-card"></i>'+jQuery.i18n.prop("continue_checkout")+' ');

	jQuery('#remove_all_button')
	.empty()
	.append(''+jQuery.i18n.prop("remove_all_button")+' ');

	jQuery('#delivery_method')
	.empty()
	.append(''+jQuery.i18n.prop("delivery_method")+' ');

	jQuery('#continue_shop')
	.empty()
	.append(''+jQuery.i18n.prop("continue_shop")+' ');

	jQuery('#quantity')
	.empty()
	.append(''+jQuery.i18n.prop("quantity")+' ');
	
	//Actions of home's products
	var no_message_swapping_1 = "no_message_swapping_1";
	var no_message_swapping_2 = "no_message_swapping_2";
	var no_message_swapping_3 = "no_message_swapping_3";
	var no_message_swapping_4 = "no_message_swapping_4";
	var no_message_swapping_5 = "no_message_swapping_5";
	var no_message_swapping_6 = "no_message_swapping_6";
	var no_message_swapping_7 = "no_message_swapping_7";
	var no_message_swapping_8 = "no_message_swapping_8";
	var no_message_swapping_9 = "no_message_swapping_9";
	jQuery('#no_message_swapping_1')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_1)+' ');
	jQuery('#no_message_swapping_2')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_2)+' ');
	jQuery('#no_message_swapping_3')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_3)+' ');
	jQuery('#no_message_swapping_4')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_4)+' ');
	jQuery('#no_message_swapping_5')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_5)+' ');
	jQuery('#no_message_swapping_6')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_6)+' ');
	jQuery('#no_message_swapping_7')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_7)+' ');
	jQuery('#no_message_swapping_8')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_8)+' ');
	jQuery('#no_message_swapping_9')
	.empty()
	.append(''+jQuery.i18n.prop(no_message_swapping_9)+' ');
	
}