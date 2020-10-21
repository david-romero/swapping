function search_controller_find(text_to_find)
{
	 $.ajax
     (
         {
             url: "/SwappingApp/searh_products/?search="+text_to_find,
             type: 'GET',
             async: true,
             success: function(response)
             {	
            	 if (response.user)
            	{
            		search_view_show_users_result(response);
            	}
            	else
            	{
            		search_view_show_result(response,response.pag,1);
            	}
            	
                     
             },
             error: function(response)
             {	 
            	 display_error_notification("Search Error", "An error has occurred, try again later", "fa fa-times");
             }
         }
     );
	 
}
