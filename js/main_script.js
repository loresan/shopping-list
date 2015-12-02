$(document).ready(function(){
  //starts the main function
  initializeEvents();
});



function initializeEvents() {

    // initialize the app
    var itemCount = 0;
    var itemInput = $("#item");
    var price = $('#price');
    var qnt = $('#qnt');
    itemInput.val("");
    price.val("");
    qnt.val("");
    // define what happens when we click the "Add Item" link
    $("#add_item").click( function(){
            shoppingList();
           }
        );
    $("input#item").keydown(function (enter) {
        if (enter.keyCode == 13) {
            shoppingList();
        }
    });

    function shoppingList() {
        if (itemInput.val() === '' || $.isNumeric(itemInput.val()) ||  price.val() === '' || qnt.val() === ''){
            return;
        }
        // get the items list and item to add
        var items = $("ul.list_items");
        var itemToBuy = itemInput.val();
        var priceShow  = price.val();
        var qntItem = qnt.val();
				itemInput.val("");
        price.val("");
        qnt.val("");
        var white_space= "&nbsp;&nbsp;&nbsp;&nbsp;";
        var finalPrice = priceShow * qntItem;
        
        // create a list item and checkbox, assigning an id to it.
        var listItem = $("<li> " + "<span class='item_text'>"+itemToBuy+"</span>" + white_space + "$ <span class='price_box'>  " + finalPrice +"</span> <span class='img_box'><input type='checkbox' class='cbox'><img class='bin' src='images/bin.png'><img class='edit' src='images/edit.png'></span></li>");
        listItem.attr("id", "item[" + itemCount+++"]");
		addItem(listItem);

        //delete items
        $(".bin").click(function () {
            $(this).parent().parent().hide('slow', function () {
                $(this).remove();
            });
        });
        
        //checked bought items and add Total
        $('.cbox').change(function(){
            var total = 0;
            $('.cbox:checked').each(function(){
                total+=parseInt($(this).parent().prev().html());
            });
              
            $("#total").text('$' + total);
        });

        //edit items text
        $('.edit').click(function() {
            var text = $('.item_text').text();  
            //console.log(text);

            var input = $('<input type="text" class="hidden"  value="'+ text +'" />');
            var uneditedListItem = $(this).parent().prev().prev();
            var originalValue = input[0].defaultValue;
            $(this).each(function(){
            	uneditedListItem.text('').html(input);
                
            }); 
            
            $('input.hidden').blur(function() { 
              var defaultValue =  $(this).val();
              if (defaultValue != '') {
              	$(this).parent().text(defaultValue);
              }
              else {
              	$(this).parent().text(originalValue)
              }
              $('input.hidden').hide(); 
                                  
            });

            $('input[type="text"]').keypress(function(event) {
                if (event.keyCode == '13') {
                    $('input.hidden').hide();
                 }
            });
        }); 


        // add the item to the list. initially hidden, then slide in slowly
        function addItem(listItem) {
            listItem.hide();
            items.append(listItem);
            listItem.show('slow');
        }
        // clear input and refocus
        itemInput.focus();
    }
}
 