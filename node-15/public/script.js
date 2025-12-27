// Инициализация соединения с сервером
const socket = io();

// Получение элементов DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messagesContainer');
const connectionStatus = document.getElementById('connectionStatus');

// Обработка подключения
socket.on('connect', () => {
    console.log('Подключено к серверу. Socket ID:', socket.id);
    connectionStatus.textContent = 'Подключено к серверу';
    connectionStatus.classList.remove('disconnected');
});

// Обработка отключения
socket.on('disconnect', () => {
    console.log('Отключено от сервера');
    connectionStatus.textContent = 'Отключено от сервера';
    connectionStatus.classList.add('disconnected');
});

// Функция для добавления сообщения в контейнер
function addMessage(text, type, time, id) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const messageText = document.createElement('div');
    messageText.textContent = text;

    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = time;

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageTime);

    if (id && type === 'received') {
        const messageId = document.createElement('div');
        messageId.className = 'message-id';
        messageId.textContent = `ID: ${id.substring(0, 8)}...`;
        messageDiv.appendChild(messageId);
    }

    messagesContainer.appendChild(messageDiv);

    // Прокрутка вниз к последнему сообщению
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Функция отправки сообщения
function sendMessage() {
    const message = messageInput.value.trim();

    if (message) {
        console.log('Отправка сообщения на сервер:', message);

        // Отправка сообщения на сервер
        socket.emit('chat message', message);

        // Очистка поля ввода
        messageInput.value = '';
        messageInput.focus();
    }
}

// Обработчик нажатия кнопки Send
sendButton.addEventListener('click', sendMessage);

// Обработчик нажатия Enter в поле ввода
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Получение подтверждения от сервера (для отправленных сообщений)
socket.on('message confirmation', (data) => {
    console.log('Получено подтверждение от сервера:', data);
    addMessage(
        data.text,
        'sent',
        data.timestamp,
        data.id
    );
});

// Получение сообщений от других пользователей
socket.on('chat message', (data) => {
    console.log('Получено сообщение от другого пользователя:', data);
    addMessage(
        data.text,
        'received',
        data.timestamp,
        data.id
    );
});
