document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const savedChatLog = sessionStorage.getItem('chatLog');

    if (savedChatLog) {
        chatLog.innerHTML = savedChatLog;
        smoothScrollToBottom(chatLog);
    }

    document.getElementById('send-btn').addEventListener('click', async () => {
        const userInput = document.getElementById('user-input').value;
        if (!userInput) return;

        addToChatLog('Me', userInput);

        const response = await getChatbotResponse(userInput);
        addToChatLog('FlavourBot', response);
        document.getElementById('user-input').value = '';
    });

    document.getElementById('user-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('send-btn').click();
        }
    });
});

function addToChatLog(sender, message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('p');

    const formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${formattedMessage}`;
    
    chatLog.appendChild(messageElement);
    
    sessionStorage.setItem('chatLog', chatLog.innerHTML);

    smoothScrollToBottom(chatLog);
}

async function getChatbotResponse(question) {
    try {
        const response = await fetch('http://localhost:3000/api/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.answer || 'Sorry, I don’t have an answer for that.';
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return 'Error connecting to the chatbot service.';
    }
}

function smoothScrollToBottom(chatLog) {
    setTimeout(() => {
        chatLog.scrollTo({
            top: chatLog.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}
