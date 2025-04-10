function addSubscription() {
    const htmlContent = `
    <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="flex items-center mb-2">
            <svg class="w-8 h-8 rounded-full mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <circle style="fill:#25AE88;" cx="25" cy="25" r="25"></circle>
                    <polyline
                        style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
                        points=" 38,15 22,33 12,25 "></polyline>
                </g>
            </svg>
            <h3 class="text-gray-800 font-semibold">Votre Don a été réussie</h3>
        </div>
        <p class="text-gray-600">Merci de votre soutien, vous ne venez de sauver des vies.
        </p>
    </div>
    `;

    const subscriptionsDiv = document.getElementById('subscriptions');

    const newDiv = document.createElement('div')
    newDiv.innerHTML = htmlContent;

    subscriptionsDiv.appendChild(newDiv.firstElementChild);
}

function addFailedSubscription() {
    const htmlContent = `
    <div class="border-b border-red-300 mb-4 pb-4">
        <div class="flex items-center mb-2">
            <svg class="w-8 h-8 rounded-full mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <circle style="fill:#D75A4A;" cx="25" cy="25" r="25"></circle>
                    <polyline
                        style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
                        points="16,34 25,25 34,16 "></polyline>
                    <polyline
                        style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
                        points="16,16 25,25 34,34 "></polyline>
                </g>
            </svg>
            <h3 class="text-red-800 font-semibold">Votre opération a échoué</h3>
        </div>
        <p class="text-gray-500">Nous n'avons pas pu traiter votre demande. Veuillez réessayer plus tard
            ou contacter le support.</p>
    </div>
    `;

    const subscriptionsDiv = document.getElementById('subscriptions');

    const newDiv = document.createElement('div');
    newDiv.innerHTML = htmlContent;

    subscriptionsDiv.appendChild(newDiv.firstElementChild);
}
function checkout() {
    CinetPay.setConfig({
        apikey: '207616033467f3b16ff06ec1.20890618',//   YOUR APIKEY
        site_id: '105891646',//YOUR_SITE_ID
        notify_url: 'http://127.0.0.1:5500/home.html',
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: 1000,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Test de paiement',   
         //Fournir ces variables pour le paiements par carte bancaire
        customer_name:"Zan",//Le nom du client
        customer_surname:"Coulibaly",//Le prenom du client
        customer_email: "down@test.com",//l'email du client
        customer_phone_number: "088767611",//l'email du client
        customer_address : "BP 0024",//addresse du client
        customer_city: "Antananarivo",// La ville du client
        customer_country : "CI",// le code ISO du pays
        customer_state : "CI",// le code ISO l'état
        customer_zip_code : "06510", // code postal

    });
    CinetPay.waitResponse(function(data) {
        if (data.status == "REFUSED") {
            addFailedSubscription()
            // if (alert("Votre paiement a échoué")) {
            //     window.location.reload();
            // }
        } else if (data.status == "ACCEPTED") {
            addSubscription()
            // if (alert("Votre paiement a été effectué avec succès")) {
            //     window.location.reload();
            // }
        }
    });
    CinetPay.onError(function(data) {
        console.log(data);
    });
}