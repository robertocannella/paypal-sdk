import { loadScript } from "@paypal/paypal-js";



export default class PayPalGo {
    buttons;
    COMPONENTS = "buttons"
    constructor(oneTimeTab, monthlyTab) {
        this.CLIENT_ID = "ARFnDMd4C3p4E6GZIhBHpLuYoSF-ojNrUebyIj-ZDFAvoYw9B3joniuDOloqCwirlZT2anruvgbTQePt";
        this.oneTimeTab = document.getElementById('elementor-tab-title-2071')
        this.monthlyTab = document.getElementById('elementor-tab-title-2072')
        this.monthlyTabContainerElement = document.getElementById('paypal-button-container-monthly');
        this.oneTimeTabContainerElement = document.getElementById('paypal-button-container');



        this.loadPayPalScript = this.loadPayPalScript.bind(this);

        this.events();

    }
    events = () => {
        this.loadAndRender('order')
        this.oneTimeTab.addEventListener('click', () => this.setUpOneTime() );
        this.monthlyTab.addEventListener('click', () => this.setUpMonthly() );
    }
    setUpOneTime = () => {
        this.cleanupBeforeReload();
        console.log("Clicked One Time Tab")
        this.debounce(this.loadAndRender("order"));

    }
    setUpMonthly = () => {
        this.cleanupBeforeReload();
        console.log("Clicked Monthly Tab")
        this.debounce(this.loadAndRender("subscription"));

    }
    async loadPayPalScript(intent, containerElement, vault = true){
        let paypal;
        console.log(containerElement.id)
        try {
            console.log(containerElement.id, intent, vault)
            paypal = await loadScript({ "client-id": this.CLIENT_ID, "intent":intent, "vault": vault});
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        if (paypal) {
            try {
                await paypal.Buttons().render(`#${containerElement.id}`);
            } catch (error) {
                console.error("failed to render the PayPal Buttons", error);
            }
        }
    }
    cleanupBeforeReload = () => {
        if (this.buttons) {
            console.log(this.buttons, "CLEANUP")
            this.buttons.close();
        }
    }
    debounce = (func, wait) => {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    loadAndRender = (transactionType) => {
        console.log("transaction type:", transactionType);
        if (transactionType === "order") {
            window
                .paypalLoadScript({
                    "client-id": this.CLIENT_ID,
                    vault: false,
                    components: this.COMPONENTS
                })
                .then(() => {
                    this.render({});
                });
        } else {
            window
                .paypalLoadScript({
                    "client-id": this.CLIENT_ID,
                    vault: true,
                    intent: "subscription",
                    components: this.COMPONENTS
                })
                .then(() => {
                    this.render({
                        style: {
                            shape: "pill",
                            color: "gold",
                            layout: "vertical",
                            label: "subscribe"
                        },
                        createSubscription: function (data, actions) {
                            return actions.subscription.create({
                                plan_id: "P-3RX065706M3469222L5IFM4I"
                            });
                        }
                    });
                });
        }
    }
    render = (options) => {
        this.buttons = paypal.Buttons(options);
        this.buttons.render("#paypal-button-container").catch((err) => {
            console.warn(
                "Warning - Caught an error when attempting to render component",
                err
            );
        });
    }



}