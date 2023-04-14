class Monthly {
    fundingSources;
    constructor() {
        console.log("Monthly JS loaded")
    }

    render = (options) => {
        this.fundingSources = [
            paypal.FUNDING.PAYPAL,
            paypal.FUNDING.CARD
        ];

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
                    plan_id: "P-3RX065706M3469222L5IFM4I"
                });
            }
        });
        console.log(this.fundingSources)
        console.log("render Monthly button")

        this.buttons.render("#paypal-button-container-monthly").catch((err) => {
            console.warn(
                "Warning - Caught an error when attempting to render component",
                err
            );
        });
    }

}
const monthly = new Monthly();
export default monthly;