import PayPalGo  from "./PayPalGo";


setTimeout( setUpFunction, 300);

function setUpFunction() {
    const donateButton = document.getElementById('donate-btn')
    const mobileDonateButton = document.getElementById('donate-btn-mbl');

    donateButton.addEventListener('click', function (){
        setTimeout(()=>{
            const payPalGo = new PayPalGo();
        },500)
    })
    mobileDonateButton.addEventListener('click', function (){
        setTimeout(()=>{
            const payPalGo = new PayPalGo();
        },500)
    })
}






