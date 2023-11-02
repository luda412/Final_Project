$(document).ready(function () {
    const chatMessages = document.getElementById('chat-messages');

    // PHP 파일에서 데이터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const clickedDate = urlParams.get('date');

    $.ajax({
        type: 'POST',
        url: 'data_display.php',
        data: { date: clickedDate },
        success: function (data) {
            if (data.questions && data.answers) {
                const questions0 = data.questions;
                const userInputArray = data.answers;

                // 이제 데이터베이스에서 가져온 질문과 답변이 배열에 들어 있습니다.
                appendMessage(clickedDate + " 날짜의 일기입니다!", 'bot-message');

                // 예시: 질문과 답변을 채팅 인터페이스에 추가
                for (let i = 0; i < questions0.length; i++) {
                    appendMessage(questions0[i], 'bot-message');
                    appendMessage(userInputArray[i], 'user-message');
                }
            } else{
                appendMessage(clickedDate + " 날짜의 일기가 없습니다!", 'error-message');
            }
        },
        error: function (error) {
            console.error('오류:', error);
        }
    });

    function appendMessage(message, className) {
        const messageElement = document.createElement('li');
        messageElement.classList.add(className);
    
        const messageTextElement = document.createElement('div');
        messageTextElement.innerText = message;
    
        // Apply CSS styles based on the class name
        if (className === 'user-message') {
            // Apply user message styles
            messageElement.classList.add('message-right');
            messageTextElement.classList.add('message-text');
            messageTextElement.style.backgroundColor = '#f8daf7'; // Background color for user messages
        } else if(className === 'bot-message'){
            // Apply bot message styles
            messageElement.classList.add('message-left');
            messageTextElement.classList.add('message-text');
            messageTextElement.style.backgroundColor = '#f1f0f0';
        } else{
            messageElement.classList.add('message-medium');
            messageTextElement.classList.add('message-text');
            messageTextElement.style.backgroundColor = '#fffb00';
        }
    
        // Append the message text element to the message element
        messageElement.appendChild(messageTextElement);
    
        // Append the message element to the chatMessages container
        chatMessages.appendChild(messageElement);
    }
});