function credit_view_buy_credits(id_user){
	body_clear();
	var user = user_controller_get(id_user,true);
	$('<div id="credits_screen"></div>').appendTo('#content-body');
	
	$('<div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">'+
            '<div class="panel panel-info">'+
            '<div id="credits_title" class="panel-heading">'+
                '<h4 class="text-center">'+
                    'CREDITS</h4>'+
           ' </div>'+
            '<div class="panel-body text-center">'+
                '<h2 style="float:left; margin-left: 13%;" id="number_of_credits">'+
                 '   <strong>Number of credits:</strong></h2>'+
                 '<h2 style="float:right; margin-right: 30%;">'+
                 	'<strong>'+ user.credits + '</strong></h2>' +
          '  </div>'+
            '<div id="credits_button" class="panel-footer" onclick="refreshLanguage();">'+
                '<a onclick="refreshLanguage();" class="btn btn-lg btn-block btn-info" href="#" data-toggle="modal" data-target=".pop-up-1" >BUY MORE!</a>'+
           ' </div>'+
        '</div>'+
   ' </div>'+
   '<div class="modal fade pop-up-1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel-1" aria-hidden="true">'+
   '<div class="modal-dialog modal-lg">'+
     '<div class="modal-content">'+

       '<div class="modal-header">'+
         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>'+
         '<h3 class="modal-title" id="myLargeModalLabel-1">Buy credits</h3>'+
      ' </div>'+
       '<div class="modal-body" id="modal_div">'+
      ' </div>'+
    ' </div><!-- /.modal-content -->'+
   '</div><!-- /.modal-dialog -->'+
' </div><!-- /.modal mixer image -->').appendTo('#credits_screen');
	
$('<form method="POST" action="#" id="buy_credits_form" class="form-horizontal"></form>').appendTo('#modal_div');
refreshLanguage();
$('<div id="credit_numbers" class="form-group"/></div>').appendTo('#buy_credits_form');	
$("<label id='number_label' for='number_result' class='col-lg-6 col-xs-6 col-md-6 col-sm-6 control-label'><h3>Number of credits:</h3></label>").appendTo('#credit_numbers');
$("<div class='col-lg-6 col-xs-6 col-md-6 col-sm-6'><label id='number_result' name='number_result'  class='control-label'  ><h3>"+ user.credits +"</h3></label></div>").appendTo('#credit_numbers');

$('<div id="price_div" class="form-group"/></div>').appendTo('#buy_credits_form');	
$("<label id='price_label' for='current_price' class='col-lg-6 col-xs-6 col-md-6 col-sm-6 control-label'><h3>Current price:</h3></label>").appendTo('#price_div');
$("<div class='col-lg-6 col-xs-6 col-md-6 col-sm-6'><label id='current_price' name='current_price'  class='control-label'  ><h3>1 Euro</h3></label></div>").appendTo('#price_div');

$('<div id="credit_select" class="form-group" /></div>').appendTo('#buy_credits_form');	
$("<label id='credit_select_label' for='credit_select_input' class='col-lg-6 col-xs-6 col-md-6 col-sm-6 control-label'>Credits to buy:</label>").appendTo('#credit_select');
$("<div class='col-lg-2 col-xs-6 col-md-2 col-sm-6'><input type='number' id='credit_select_input' name='credit_select_input' class='form-control' name='credit_select_input' /></div>").appendTo('#credit_select');

var tokenElement = jQuery(document.createElement('input'));
tokenElement.attr('type', 'hidden');
tokenElement.attr('name', 'csrfmiddlewaretoken');
tokenElement.attr('id', 'csrfmiddlewaretoken');
var csrftoken = getCookie('csrftoken');
tokenElement.val( csrftoken );
jQuery("#buy_credits_form").append(tokenElement);

$(' <div class="form-group"> <button type="submit" onclick="credit_controller_buy_credits();refreshLanguage();" class="col-md-offset-3 col-lg-offset-3 col-xs-offset-3 col-sm-offset-3 col-lg-6 col-xs-6 col-md-6 col-sm-6 btn btn-lg btn-warning"><span class="glyphicon glyphicon-usd"></span> Buy Credits!</button></div>').appendTo('#buy_credits_form');	
}

