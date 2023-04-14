import PayPalGo  from "./PayPalGo";



// These are the tabs that receive the events


setTimeout( setUpFunction, 300);


function setUpFunction() {
    const donateButton = document.getElementById('donate-btn')

    donateButton.addEventListener('click', function (){

        setTimeout(()=>{
            const payPalGo = new PayPalGo();
        },500)

    })
}






