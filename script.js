document.getElementById('sendMessage').addEventListener('click', async () => {
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage.trim() === '') {
        return;
    }

    appendMessage('You', userMessage);
    document.getElementById('userMessage').value = '';

    // Send message to the server
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const botReply = data.reply;
    appendMessage('Bot', botReply);
});

function appendMessage(sender, message) {
    const chatlog = document.getElementById('chatlog');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatlog.appendChild(messageElement);
    chatlog.scrollTop = chatlog.scrollHeight;  // Auto-scroll to bottom
}
