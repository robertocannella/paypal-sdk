import { loadScript } from "@paypal/paypal-js";

import oneTime from "./OneTime";
import monthly from "./Monthly";

export default class PayPalGo {
    buttons;
    COMPONENTS = "buttons"
    paypal;
    constructor() {
        //console.log("Loaded paypal")
        this.CLIENT_ID = "ARFnDMd4C3p4E6GZIhBHpLuYoSF-ojNrUebyIj-ZDFAvoYw9B3joniuDOloqCwirlZT2anruvgbTQePt";
        // SANDBOX
        //this.CLIENT_ID = "AfNcYDz5y6sU2UJBcjyOVOEPtmrhridVapBSCukWG9L2zSmtQ4q68iIJ1WMSb8e9qJ0kRXRJaoCDlV_l";
        this.oneTimeTab = document.getElementById('elementor-tab-title-2071')
        this.monthlyTab = document.getElementById('elementor-tab-title-2072')
        this.oneTimeTabs = document.querySelectorAll('div[aria-controls="elementor-tab-content-2071"]')
        this.monthlyTabs = document.querySelectorAll('div[aria-controls="elementor-tab-content-2072"]')

        this.monthlyTabContainerElement = document.getElementById('paypal-button-container-monthly');
        this.oneTimeTabContainerElement = document.getElementById('paypal-button-container');

        this.events();
        this.setUpOneTime();

    }
    events = () => {

        this.oneTimeTabs.forEach(tab => {
            tab.addEventListener('click', ()=> this.setUpOneTime());
        })
        this.monthlyTabs.forEach(tab => {
            tab.addEventListener('click', ()=> this.setUpMonthly());
        })


    }
    setUpOneTime = () => {

        oneTime.cleanupBeforeReload();
        //console.log("Clicked One Time Tab")
        this.debounce(this.loadAndRender("order"),500);

    }
    setUpMonthly = () => {
        monthly.cleanupBeforeReload();
        //console.log("Clicked Monthly Tab")
        this.debounce(this.loadAndRender("subscription"),500);

    }
    cleanupBeforeReload = () => {
        //console.log("running cleanup", this.buttons)
        if (this.buttons) {
            //console.log(this.buttons, "Removed Buttons")
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
        //console.log("transaction type:", transactionType);

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