$(document).ready(function(){
    console.log('hi');
    var cartVal = 0;
    var cartDetails = [];

    // add item in cart
    $('button.addtoCart').on('click', function(){
        var product = {
            productId : $(this).siblings('.productId').val(),
            name : $(this).siblings('h4.productName').text(),
            imgSrc : $(this).siblings('img').attr('src'),
            price : $(this).siblings("p").children("span.price").text()
        }
        cartVal++;
        $("#cartVal").text(cartVal);
        cartDetails.push(product);
        console.log(cartDetails);
    });

    // View cart
    $('.gotocart').on('click', function(){
        console.log('click evne');
        $.ajax({
            url: '/viewcart',
            method: 'POST',
            contentType: "application/json",
            data : JSON.stringify({cartDetails : cartDetails }) ,
            success : function(response){
                console.log(response);
                if(response === 'No item in cart'){
                    console.log('if true');
                    $('span.msg').show();
                    $('span.msg').show().text(response);
                    setTimeout(function(){
                        $('span.msg').hide();
                    },3000)
                } else {
                        console.log('response else');
                        if(typeof response.redirect == 'string')
                            window.location = response.redirect;
                }
            }
        })
    });

    $('#pdBtn').on('click', function(){
        console.log('pd id btn clicked');
        var flagNull = false;
        $('.personalDetails').find("input").each(function(){
            if(this.value == ""){
                alert('you must fill in all items in the form');
                flagNull = true;
                return false;
            }
        })
        if(flagNull == false){
            $('.delAddress').show();
            $('.delAddress').find("input[name='address']").focus();
            $(this).css("background-color","grey");
            this.disabled = true;
        }
    });

    // after delivery address details btn 
    $('#delAddBtn').on('click', function(){
        var flagNull = false;
        $('.delAddress').find("input").each(function(){
            if(this.value === ""){
                alert('you must fill in all items in the form');
                flagNull = true;
                return false;
            }
        })
        if(flagNull === false){
            $('.orderDetrailsDiv').show();
            $(this).css("background-color","grey");
            this.disabled = true;
        }
    });

// Place order button

$('#placeOrdBtn').on('click', function(){
    $('.paymentDiv').show();

})
    
});