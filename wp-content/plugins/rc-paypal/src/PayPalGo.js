import { loadScript } from "@paypal/paypal-js";

import oneTime from "./OneTime";
import monthly from "./Monthly";

export default class PayPalGo {
    buttons;
    COMPONENTS = "buttons"
    paypal;
    constructor() {

        this.CLIENT_ID = "ARFnDMd4C3p4E6GZIhBHpLuYoSF-ojNrUebyIj-ZDFAvoYw9B3joniuDOloqCwirlZT2anruvgbTQePt";
        this.oneTimeTab = document.getElementById('elementor-tab-title-2071')
        this.monthlyTab = document.getElementById('elementor-tab-title-2072')
        this.monthlyTabContainerElement = document.getElementById('paypal-button-container-monthly');
        this.oneTimeTabContainerElement = document.getElementById('paypal-button-container');

        this.events();
        this.loadAndRender('order')

    }
    events = () => {
        this.loadAndRender('none')
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
                    oneTime.render();
                });
        } else if (transactionType === "subscription") {
            window
                .paypalLoadScript({
                    "client-id": this.CLIENT_ID,
                    vault: true,
                    intent: "subscription",
                    components: this.COMPONENTS
                })
                .then(() => {
                    monthly.render();
                });
        } else {
            console.log("no order")
        }
    }
    render = (options, elementID) => {
        this.buttons = this.paypal.Buttons(options);
        this.buttons.render(elementID).catch((err) => {
            console.warn(
                "Warning - Caught an error when attempting to render component",
                err
            );
        });
    }



}