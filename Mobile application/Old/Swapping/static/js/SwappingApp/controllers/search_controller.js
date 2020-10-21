function search_find(){
	
	var texts;
	texts = document.getElementById('search_proucts').value;
	 $.ajax
     (
         {
             url: "/SwappingApp/searh_products/?search="+texts,
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
	 
}
