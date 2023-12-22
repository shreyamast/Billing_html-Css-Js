
function incrementQuantity(id) {
    let input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity(id) {
    let input = document.getElementById(id);
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}

function calculateTotal() {
    let burgerQuantity = parseInt($("#burger-quantity").val());
    let pizzaQuantity = parseInt($("#pizza-quantity").val());
    let friesQuantity = parseInt($("#fries-quantity").val());
    let coffeeQuantity = parseInt($("#coffee-quantity").val());
    let cokeQuantity = parseInt($("#coke-quantity").val());
    let pastaQuantity = parseInt($("#pasta-quantity").val());



    let totalPrice = burgerQuantity * 120 + pizzaQuantity * 150 + friesQuantity * 90 + coffeeQuantity * 40 + cokeQuantity * 50 + pastaQuantity * 110 ;

    $("#total-price").text(totalPrice);

    // Create order item entries
    let orderItems = $("#order-items");
    orderItems.empty();

    if (burgerQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-hamburger bill-item-thumb' style='color: #f44336;'></i> Burger x " + burgerQuantity + "</div>");
    }

    if (pizzaQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-pizza-slice bill-item-thumb' style='color: #4caf50;'></i> Pizza x " + pizzaQuantity + "</div>");
    }

    if (friesQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-utensils bill-item-thumb' style='color: #2196f3;'></i> fries x " + friesQuantity + "</div>");
    }

    if (coffeeQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-coffee bill-item-thumb' style='color: #ff9800;'></i> Coffee x " + coffeeQuantity + "</div>");
    }
    if (cokeQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-glass-water bill-item-thumb' style='color: #ff9800;'></i> Coke x " + cokeQuantity + "</div>");
    }
    if (pastaQuantity > 0) {
        orderItems.append("<div class='order-item'><i class='fas fa-bowl-rice bill-item-thumb' style='color: #ff9800;'></i> Pasta x " + pastaQuantity + "</div>");
    }
}

function printBill() {
    let customerName = $("#customer-name").val();
    let paymentOption = $("#payment-options").val();
    let dineOption = $("input[name='dine-option']:checked").val();
    let totalPrice = $("#total-price").text();
    
    // Generate bill content
    let billContent = `
        <div class="bill-container">
            <h2 class="bill-heading">Customer Bill</h2>
            <div class="bill-info">
                <span>Customer: ${customerName}</span><br>
                <span>Payment Option: ${paymentOption}</span><br>
                <span>Dine Option: ${dineOption}</span><br>
            </div>
            <div class="bill-items">
                <!-- Order items will be dynamically added here -->
            </div>
            <div class="bill-total">Total: $${totalPrice}</div>
        </div>
    `;
    
    // Open print window
    let printWindow = window.open('', '', 'width=900,height=900');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Bill</title></head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// function placeOrder(){
//         alert ("Order Placed Successfully");
// }


let input = document.getElementById('customer-name');
let button = document.getElementById('myBtn');
button.disabled = true;   // Make button disabled initially
input.addEventListener('keyup', function(event){
   
   let val = event.target.value;  // input's current value
   
   if(val===''){
       button.disabled = true;  // Make button disabled
   }
   else{
    button.disabled = false; // Make button enabled 
   }
   
});

window.addEventListener('load', function() {
    let input = document.getElementById('customer-name');
    let button = document.getElementById('myBtn');
    // button.disabled = true;   // Make button disabled initially
    
    input.addEventListener('keyup', function(event) {
        let val = event.target.value;  // input's current value

        if (val === '') {
            button.disabled = true;  // Make button disabled
        } else {
            button.disabled = false; // Make button enabled 
        }
    });
});




function placeOrder() {
    let customerName = $("#customer-name").val();
    let paymentOption = $("#payment-options").val();
    let dineOption = $("input[name='dine-option']:checked").val();
    let totalPrice = $("#total-price").text();
    let orderItems = [];

    $("#order-items .order-item").each(function() {
        orderItems.push($(this).text());
    });

    let order = {
        customerName,
        paymentOption,
        dineOption,
        totalPrice,
        orderItems
    };


    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Order Placed Successfully");
}
