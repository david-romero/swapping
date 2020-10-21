function credit_controller_buy_credits(){
	
	$('#buy_credits_form').bootstrapValidator({
		feedbackIcons: {
			valid: 'fa fa-check',
		    invalid: 'fa fa-times',
		    validating: 'fa fa-refresh',
	    },
		            submitHandler: function(form) 
					{ 
		            	var $csrftoken = $.cookie('csrftoken');
		            	jQuery('#figure_loading div').addClass('spinner');
						jQuery.ajax
					    (
					        {
					            url: "/SwappingApp/credits/send_credits/",
					            type: 'POST',
					            data:
					            {
					                'credits': $('#credit_select_input').val(),
					            },
					            beforeSend: function(xhr) {
					                xhr.setRequestHeader("X-CSRFToken", $csrftoken);
					            },
					            crossDomain: false,
					            success: function(response)
					            {
					            	window.location.replace(response.url);
					            	jQuery('#figure_loading div').removeClass('spinner');
					            },
					            error : function(xhr,errmsg,err) {
					            	 jQuery('#figure_loading div').removeClass('spinner');
			                         var json = $.parseJSON(xhr.responseText);
			                         jQuery.each(json , function(index,value)
			                        		 {
						                        	 display_error_notification(null,value,null);
			                        		 });					            	
					            	}
					        }
					    );
					},
					message: 'This value is not valid',
					fields:
					{
						credit_select_input: 
						{
							message: 'The number of credits are not valid',
							validators: 
							{
								notEmpty: 
								{
									message: 'You have to insert a number of credits'
								},
								regexp: 
								{
									regexp: /^[0-9]+$/,
									message: 'You must insert a number'
								}
							}
						}
					}//fields€
				});//validator
	
	
	
}