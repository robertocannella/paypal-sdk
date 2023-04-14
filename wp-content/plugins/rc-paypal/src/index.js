import PayPalGo  from "./PayPalGo";



// These are the tabs that receive the events

const donateButton = document.getElementById('donate-btn')


donateButton.addEventListener('click', function (){

    setTimeout(()=>{
        const payPalGo = new PayPalGo();
    },500)

})





