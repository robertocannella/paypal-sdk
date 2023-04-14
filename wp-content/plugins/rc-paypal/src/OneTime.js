import { loadScript } from "@paypal/paypal-js";

class OneTime{
    fundingSources;
    constructor() {
        console.log("One Time JS loaded")

    }
    render = (options) => {

        console.log("render one time button")
        this.fundingSources = [
            paypal.FUNDING.PAYPAL,
            paypal.FUNDING.CARD
        ];


        this.buttons = paypal.Buttons(


            // Here are the options for the one time payment buttons
            {

                // onInit is called when the button first renders
                onInit: function(data, actions) {

                    // Disable the buttons
                    actions.disable();

                    // Listen for changes to the checkbox
                    document.querySelector('#item-options')
                        .addEventListener('change', function(event) {

                            console.log(event.target.value)
                            // Enable or disable the button when it is checked or unchecked
                            if (event.target.value !== "") {
                                actions.enable();
                            } else {
                                actions.disable();
                            }

                        });
                    console.log("onInit", data)
                },


                fundingSource: this.fundingSources[1],
                style: {
                    shape: 'pill',
                    //color: 'white',
                    layout: 'vertical',
                    label: 'paypal'

                },
                onClick: function(data,actions){
                    let selectBox = document.querySelector('#item-options')
                    const value = selectBox.options[selectBox.selectedIndex].value;
                    if (value === ""){
                        alert("Please make a selection");
                    }
                },
                createOrder: function(data, actions) {
                    var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;

                    if(selectedItemDescription === ""){
                        console.log("Select an option");

                    }

                    var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
                    var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
                    if(quantitySelect.options.length > 0) {
                        quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
                    } else {
                        quantity = 1;
                    }

                    tax *= quantity;
                    tax = Math.round(tax * 100) / 100;
                    var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
                    priceTotal = Math.round(priceTotal * 100) / 100;
                    var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;
                    // https://developer.paypal.com/docs/regional/th/checkout/integration-features/standard-card-fields/
                    return actions.order.create({
                        purchase_units: [{
                            description: orderDescription,
                            amount: {
                                currency_code: 'USD',
                                value: priceTotal,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: itemTotalValue,
                                    },
                                    shipping: {
                                        currency_code: 'USD',
                                        value: shipping,
                                    },
                                    tax_total: {
                                        currency_code: 'USD',
                                        value: tax,
                                    }
                                }
                            },
                            items: [{
                                name: selectedItemDescription,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: selectedItemPrice,
                                },
                                quantity: quantity
                            }],
                        }],
                        payer: {
                            phone: {
                                phone_type: "MOBILE",
                                phone_number: {
                                    national_number: "1999999999"
                                }
                            }
                        },
                        application_context: {

                            shipping_preference: "NO_SHIPPING",
                            return_url: 'https://www.beyondallreason.info/thank-you',
                            cancel_url: 'https://www.beyondallreason.info/too-bad'
                        },

                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(orderData) {

                        // Full available details
                        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                        // Show a success message within this page, e.g.
                        const element = document.getElementById('paypal-button-container');
                        element.style.display = 'none';
                        const donateContainer = document.querySelector('.bpc-donate__grid-container')
                        donateContainer.innerHTML = '';
                        donateContainer.innerHTML = `<h3>Thank you for your payment!</h3><h4>You can close this window!</h4>`;
                        actions.redirect('https://www.blackstonest.wpengine.com/thankyou.html');

                    });
                },
                onError: function(err) {
                    console.error(err)
                },
            }
        );
        this.buttons.render("#paypal-button-container")
            .catch((err) => {
            console.warn(
                "Warning - Caught an error when attempting to render component",
                err
            );
        });
    }



}

const oneTime = new OneTime();
export default oneTime;

