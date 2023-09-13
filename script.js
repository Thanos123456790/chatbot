const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatDisplay = document.getElementById('chat-display');
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownContent = document.getElementById('dropdown-content');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage('You', userMessage, 'user-message');
    sendToBackend(userMessage);
    userInput.value = '';
}

function displayMessage(sender, message, messageClass) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${messageClass}`;
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
function displayQRCodeLink(qrCodeLink) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeLinkElement = document.createElement('p');
    qrCodeLinkElement.innerHTML = qrCodeLink;
    qrCodeContainer.appendChild(qrCodeLinkElement);
}

async function sendToBackend(message) {
    try {
        const response = await fetch('http://localhost:5000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_message: message }),
        });

        if (!response.ok) {
            console.error('Failed to send request to backend');
            return;
        }

        const data = await response.json();
        displayMessage('Chatbot', data.chatbot_response, 'chatbot-message');
        playChatbotResponse(data.chatbot_response);
    } catch (error) {
        console.error('Error sending request:', error);
    }
}

// Dropdown menu toggle
dropdownToggle.addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
});

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown-content');
    const navbarToggle = document.querySelector('.navbar-toggle');

    dropdown.classList.toggle('active');
    navbarToggle.classList.toggle('clicked');
}

function playChatbotResponse(responseText) {
    const speechSynthesis = window.speechSynthesis;
    const chatbotResponse = new SpeechSynthesisUtterance(responseText);

    chatbotResponse.onend = () => {
        // This function will be called after the speech is finished
        // You can perform any necessary actions here
    };

    speechSynthesis.speak(chatbotResponse);
}
