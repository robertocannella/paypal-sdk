import { loadScript } from "@paypal/paypal-js";

class OneTime{
    buttons;
    fundingSources;
    render = (options) => {

        // Get the elements from the DOM

        const donationButtons = document.querySelectorAll('.bpc-donate__row');
        const selectBox = document.querySelector('#item-options');
        const planHeader = document.querySelector('#plan-header');
        const continueToPayPal = document.querySelector('.bpc-donate__message-continue');

        // Add the events
        donationButtons.forEach(function (btn,index) {
            btn.addEventListener('click',function (){


                // PayPal Popup
                document.querySelector('.bpc-donate__paypal-container').style.opacity = 1;
                document.querySelector('.bpc-donate__paypal-container').style.visibility = "visible";


                donationButtons.forEach(btn=>{
                    btn.classList.remove('selected')
                })
                btn.classList.add('selected')

                selectBox.value = btn.dataset.id;
                selectBox.options[index + 1].selected = true;

                //   let value = btn.dataset.id.charAt(0).toUpperCase() + btn.dataset.id.slice(1);
                let value = capitalizeFirstLetters(btn.dataset.id)
                continueToPayPal.innerHTML = `Continue to PayPal and sign up for the ${value} plan:`;
                triggerEvent(selectBox);
            });
        });


        const bpcClose = document.querySelector('.bpc-donate__message-close')
        bpcClose.addEventListener('click',()=>{
            document.querySelector('.bpc-donate__paypal-container').style.opacity = 0;
            document.querySelector('.bpc-donate__paypal-container').style.visibility = "hidden";

        });


        this.cleanupBeforeReload();
        //console.log("render one time button")
        this.fundingSources = [
            paypal.FUNDING.PAYPAL,
            paypal.FUNDING.CARD
        ];
        let shipping = 0;
        let itemOptions = document.querySelector("#smart-button-container #item-options");
        let quantity = parseInt();
        let quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
        if (!isNaN(quantity)) {
            quantitySelect.style.visibility = "visible";
        }
        var orderDescription = 'Donations';
        if(orderDescription === '') {
            orderDescription = 'Item';
        }

        this.buttons = paypal.Buttons(


            // Here are the options for the one time payment buttons
            {

                // // onInit is called when the button first renders
                // onInit: function(data, actions) {
                //
                //     // Disable the buttons
                //     actions.disable();
                //
                //     // Listen for changes to the checkbox
                //     document.querySelector('#item-options')
                //         .addEventListener('change', function(event) {
                //
                //             console.log(event.target.value)
                //             // Enable or disable the button when it is checked or unchecked
                //             if (event.target.value !== "") {
                //                 actions.enable();
                //             } else {
                //                 actions.disable();
                //             }
                //
                //         });
                // },


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
                        //console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

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
                    console.error("Error Creating order", err)
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

    cleanupBeforeReload() {
        //console.log("Cleaning up one time buttons: " , this.buttons)
        if (this.buttons) {
            this.buttons.close();
        }
    }

}

const oneTime = new OneTime();
export default oneTime;

