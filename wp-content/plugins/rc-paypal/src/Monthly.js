class Monthly {


    fundingSources;


    render = (options) => {

        // Get the DOM values
        const donationButtons = document.querySelectorAll('.bpc-donate-monthly__row');
        const selectBox = document.querySelector('#item-options-monthly');
        const planHeader = document.querySelector('#plan-header');
        const continueToPayPal = document.querySelector('.bpc-donate-monthly__message-continue');

        // Add events to buttons
        donationButtons.forEach(function (btn,index) {
            btn.addEventListener('click',function (){
                //console.log(btn.dataset.id)

                // Display PayPal Popup
                document.querySelector('.bpc-donate-monthly__paypal-container').style.opacity = 1;
                document.querySelector('.bpc-donate-monthly__paypal-container').style.visibility = "visible";

                // Update 'selected' classList in all elements
                donationButtons.forEach(btn=>{
                    btn.classList.remove('selected')
                })
                btn.classList.add('selected')

                // When "THIS" button is clicked, update the "value" in the selectBox option list
                selectBox.value = btn.dataset.id;
                selectBox.options[index + 1].selected = true;

                //   let value = btn.dataset.id.charAt(0).toUpperCase() + btn.dataset.id.slice(1);
                // Captialize the first letter. Function is inside elementor custom code
                let value = capitalizeFirstLetters(btn.dataset.id)
                continueToPayPal.innerHTML = `Continue to PayPal and sign up for the ${value} plan:`;
                triggerEvent(selectBox); // This code snippet is inside elementor custom code
            });
        });

        // Hide message
        const bpcClose = document.querySelector('.bpc-donate-monthly__message-close')
        bpcClose.addEventListener('click',()=>{
            document.querySelector('.bpc-donate-monthly__paypal-container').style.opacity = 0;
            document.querySelector('.bpc-donate-monthly__paypal-container').style.visibility = "hidden";

        });

        // There are the funding source we will except. The paypal object comes from the loaded
        // paypal js
        this.fundingSources = [
            paypal.FUNDING.PAYPAL,
            paypal.FUNDING.CARD
        ];

        // Customize the buttons
        this.buttons = paypal.Buttons({
            fundingSource: this.fundingSources[1],
            style: {
                shape: "pill",
                //color: "gold",
                layout: "vertical",
                label: "subscribe"
            },
            createSubscription: function (data, actions) {
                return actions.subscription.create({
                    plan_id: selectBox.value
                });
            }
        });

        //console.log("render Monthly button")
        // render
        this.buttons.render("#paypal-button-container-monthly").catch((err) => {
            console.warn(
                "Warning - Caught an error when attempting to render component",
                err
            );
        });
    }
    cleanupBeforeReload() {
        //console.log("Cleaning up monthly buttons: " , this.buttons)
        if (this.buttons) {
            this.buttons.close();
        }
    }

}
const monthly = new Monthly();
export default monthly;