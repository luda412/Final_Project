$(document).ready(function () {
    const chatContainer = document.getElementById('chat-container');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const submitButton = document.getElementById('submit-button');
    const chatForm = document.getElementById('chat-form');

    const urlParams = new URLSearchParams(window.location.search);
    const clickedDate = urlParams.get('date');
    console.log(clickedDate);

    document.getElementById('date').value = clickedDate;

    var resultHtml;
  
    // 질문 목록, 각 질문에 xy 가중 값
    const questions0 = [
      '오늘은 몇시에 일어났나요?',
      '아침식사는 무엇을 먹었나요?',
      '오늘 가장 좋았던 일이 뭐에요?',
      '그럼 반대로 후회되는 일은 있을까요?',
      '오늘 가장 생각나는 사람 혹은 순간이 있을까요?',
      '오늘 하루중 가장 기억하고 싶은 일을 적어주세요^^',
      '지금 기분을 날씨로 표현하면?  \n["1. 화창함", "2. 잔잔한 바람", "3. 비", "4. 폭염"]',
      '지금 기분을 소리로 표현하면? \n["1. 웃음소리", "2. 시냇물 소리", "3. 울음소리", "4. 천둥번개"]',
      '지금 기분을 색으로 표현하면?   \n["1. 노랑", "2. 초록", "3. 회색", "4. 빨강"]',
    ];
    const questions1 = [
      '오늘은 무슨꿈을 꾸셨나요?',
      '점심식사는 무엇을 먹었나요?',
      '오늘 특별히 어디를 가거나 누구를 만난적이 있나요? 자세하게 말해주세요~',
      '오늘 실수를 했거나 후회되는 일이 있나요?',
      '일기를 쓰기전 마지막으로 무엇을 하셨나요?',
      '오늘 하루중 가장 기억하고 싶은 일을 적어주세요^^',
      '지금 기분을 맛으로 표현하면?   \n["1. 달달함", "2. 부드러움", "3. 쓴맛", "4. 매움"]',
      '지금 기분을 날씨로 표현하면?   \n["1. 구름한점없음", "2. 시원한 바람", "3. 폭우", "4. 폭설"]',
      '지금 기분을 한 단어로 표현하면?   \n["1. 유쾌한 솜사탕", "2. 평온한 곰", "3. 이별 편지", "4. 분노한 토끼"]',
    ];
    const questions2 = [
      '오늘 눈뜨자마자 무슨 생각이 들었나요?',
      '오늘 먹은 것 중에 가장 맛있었던 것은?',
      '칭찬을 듣거나 기분 좋은일이 있었나요?',
      '오늘 하루 스트레스 받는 일이 있었나요?',
      '오늘 하루 한일중 가장 인상깊은 일은 무엇이였나요?',
      '오늘 하루중 가장 기억하고 싶은 일을 적어주세요^^',
      '지금 기분을 색으로 표현하면?   \n["1. 노랑", "2. 초록", "3. 회색", "4. 빨강"]',
      '지금 기분을 한 단어로 표현하면?   \n["1. 유쾌한 솜사탕", "2. 평온한 곰", "3. 이별 편지", "4. 분노한 토끼"]',
      '지금 기분을 맛으로 표현하면?   \n["1. 달달함", "2. 부드러움", "3. 쓴맛", "4. 매움"]',
    ];
    const questions3 = [
      '오늘은 어떤 계획을 세웠었나요?',
      '오늘 하루 세웠던 계획중 달성한 일과 그렇지 못한일은 무엇이 있나요?',
      '스트레스를 받은 일이 있었나요?',
      '지금 가장 생각나는 사람이 있나요?',
      '오늘 일이 꿈에 나오면 어떨것 같아요?',
      '오늘 하루중 가장 기억하고 싶은 일을 적어주세요^^',
      '지금 기분을 소리로 표현하면? \n["1. 웃음소리", "2. 시냇물 소리", "3. 울음소리", "4. 천둥번개"]',
      '지금 기분을 색으로 표현하면?   \n["1. 노랑", "2. 초록", "3. 회색", "4. 빨강"]',
      '지금 기분을 날씨로 표현하면?   \n["1. 화창함", "2. 잔잔한 바람", "3. 비", "4. 폭염"]',
    ];
    const questions4 = [
      '오늘 일어나서 가장 먼저 한 행동은 무엇이었나요?',
      '오늘 가장 맛있게 먹은 간식은 무엇이었나요?',
      '오늘 들었던 음악 중에 기억에 남는 음악을 말해주세요~!',
      '오늘 지키지 못한 계획이 있나요?',
      '저녁은 무엇을 드셨어요?',
      '오늘 가장 고마웠던 상대는 누구였나요?',
      '지금 시간이 있다면 어디에 가고 싶으신가요? \n["1. 밝은 해변", "2. 잔잔한 호수", "3. 고요한 숲", "4. 가파른 산 정상"]',
      '지금 기분을 강아지로 표현한다면?   \n["1. 웃는 강아지", "2. 잠자는 강아지", "3. 배고픈 강아지", "4. 마구 짖는 강아지"]',
      '지금 기분을 음료로 표현하면?   \n["1. 달콤한 스무디", "2. 따뜻한 캐모마일 티", "3. 에스프레소", "4. 레드불"]',
    ];
    const questions5 = [
      '오늘 하루 기분좋게 일어났나요?',
      '오늘 일 중 가장 중요한 일은 무엇이였나요?',
      '그일은 잘 마무리 되었나요?',
      '잘 됐다면 왜 잘된것 같나요? 반대로 잘 안됐다면 안된 이유가 무엇일까요?',
      '오늘 하루 후회되는 일이 있었나요?',
      '오늘 들었던 노래중 가장 생각나는 노래를 적어주세요!',
      '지금 영화를 본다면 어떤 영화를 보고 싶으신가요? \n["1.  극한직업 ", "2. 어바웃타임", "3. 지금 만나러 갑니다", "4. 존윅4"]',
      '지금 노래를 한곡만 들은다면 어떤 장르의 노래를 듣고 싶으신가요?   \n["1. 팝송", "2. 재즈", "3. 발라드", "4. 락, 힙합"]',
      '지금 ott에서 정주행을 하신다면 어떤 장르를 보고 싶으신가요?   \n["1. 로맨스", "2. 다큐", "3. 가족", "4. 범죄, 느와르"]',
    ];
    const questions6 = [
      '오늘은 몇시에 일어났나요?',
      '점심식사는 무엇을 먹었나요?',
      '칭찬을 듣거나 기분 좋은일이 있었나요?',
      '오늘 지키지 못한 계획이 있나요?',
      '오늘 일이 꿈에 나오면 어떨것 같아요?',
      '오늘 들었던 노래중 가장 생각나는 노래를 적어주세요!',
      '지금 기분을 색으로 표현하면?   \n["1. 노랑", "2. 초록", "3. 회색", "4. 빨강"]',
      '지금 노래를 한곡만 들은다면 어떤 장르의 노래를 듣고 싶으신가요?   \n["1. 팝송", "2. 재즈", "3. 발라드", "4. 락, 힙합"]',
      '지금 기분을 음료로 표현하면?   \n["1. 달콤한 스무디", "2. 따뜻한 캐모마일 티", "3. 에스프레소", "4. 레드불"]',
    ];
    const questions7 = [
      '오늘 하루 시작이 어땠나요?',
      '오늘 먹었던 음식중 가장 맛있었던 음식은 무엇인가요?',
      '오늘 하루 있었던 일중 꼭 기억하고 싶은 일을 적어주세요!',
      '오늘 아침으로 시간을 돌릴수 있다면 어떤일을 바꾸고 싶나요?',
      '오늘 당신의 가장 든든한 아군은 누구였나요?',
      '오늘 하루를 마무리하며  당신에게 한마디 해주세요!',
      '지금 기분을 물건으로 묘사한다면? \n["1.  선물 상자 ", "2. 따뜻한 이불", "3. 지잊혀진 장난감", "4. 깨진 거울"]',
      '지금 기분을 술로 표현한다면?   \n["1. 달콤한 칵테일", "2. 무알콜 맥주", "3. 약한 위스키", "4. 파이어볼 위스키"]',
      '지금 만약 오랜친구가 갑작스럽게 방문했다면?   \n["1. 기쁨", "2. 의아", "3. 우려", "4. 짜증"]',
    ];
  
    let currentQuestionIndex = 0;
    //질문 묶음 랜덤 선택
    const allQuestions = [questions0, questions1, questions2, questions3, questions4, questions5, questions6, questions7];
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const questions = allQuestions[randomIndex];
    //사용자 입력 저장 배열
    const userInputArray = [];
  
    // 초기 질문 출력
    appendMessage('안녕하세요!', 'bot-message');
    appendMessage(questions[currentQuestionIndex], 'bot-message');
  
    chatForm.addEventListener('submit', function (event) {
      event.preventDefault();
      processUserInput();
    });
  
    function processUserInput() {
      const userMessage = userInput.value;
      if (userMessage.trim() === '') {
        return;
      }
  
      appendMessage(userMessage, 'user-message');
      userInputArray.push(userMessage);
      // -> 이 자리에 우리 메세지를 
      userInput.value = '';
  
      // 다음 질문 출력 또는 종료
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        appendMessage(questions[currentQuestionIndex], 'bot-message');
      } else {
        appendMessage('채팅이 종료되었습니다.', 'bot-message');
        appendMessage('저장을 눌러, 오늘의 감정을 확인해보세요!', 'bot-message');
        userInput.disabled = true;
        submitButton.disabled = true;
        //채팅 종료후 저장 버튼 표시
        // document.getElementById('database-submit-button').style.display = 'block';
      }

    //   if (currentQuestionIndex === questions.length - 1) {
    //     userInputArray.push(userMessage); // answer9 추가
    //   }

        document.getElementById('answer1').value = userInputArray[0];
        document.getElementById('answer2').value = userInputArray[1];
        document.getElementById('answer3').value = userInputArray[2];
        document.getElementById('answer4').value = userInputArray[3];
        document.getElementById('answer5').value = userInputArray[4];
        document.getElementById('answer6').value = userInputArray[5];
        document.getElementById('answer7').value = userInputArray[6];
        document.getElementById('answer8').value = userInputArray[7];
        document.getElementById('answer9').value = userInputArray[8];
        document.getElementById('question1').value = questions[0];
        document.getElementById('question2').value = questions[1];
        document.getElementById('question3').value = questions[2];
        document.getElementById('question4').value = questions[3];
        document.getElementById('question5').value = questions[4];
        document.getElementById('question6').value = questions[5];
        document.getElementById('question7').value = questions[6];
        document.getElementById('question8').value = questions[7];
        document.getElementById('question9').value = questions[8];
        

        databaseForm.submit();
  
      // 스크롤 내리기
      chatBox.scrollTop = chatBox.scrollHeight;

      //여기서 감정분석
      // var coordinates = tempexpressWithCoordinates();
      // console.log(coordinates);
      // var moodExpression = expressMoodFromCoordinates(coordinates);
      // resultHtml = "result_" + moodExpression + ".html";
      // console.log(resultHtml);
      // document.getElementById('hidden-input').value = resultHtml;

    }
  
    function appendMessage(message, className) {
      const messageElement = document.createElement('li');
      const messageTextElement = document.createElement('div');
      messageTextElement.innerText = message;
      messageTextElement.classList.add('message-text');
  
      if (className === 'user-message') {
        messageElement.classList.add('message', 'message-right');
        messageTextElement.style.backgroundColor = '#f8daf7';//내 채팅
        //messageTextElement.style.color = '#fff';
      } else {
        messageElement.classList.add('message', 'message-left');
        messageTextElement.style.backgroundColor = '#f1f0f0';//컴 채팅
      }
  
      messageElement.appendChild(messageTextElement);
  
      const chatMessages = document.getElementById('chat-messages');
      chatMessages.appendChild(messageElement);
  
      // 스크롤 내리기
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    //감정 분석 함수
    function tempexpressWithCoordinates() {
      var coordinates = { x: 0, y: 0 };
      var choice;

      for (var i = 5; i < questions.length; i++) {
        choice = userInputArray[i];
        switch (choice) {
          case "화창함" :
          case "달달함" :
          case "노랑" :
          case "웃음소리" :
          case "구름한점없음" :
          case "유쾌한 솜사탕" :
          case "밝은 해변" :
          case "밝은해변" :
          case "웃는 강아지" :
          case "웃는강아지" :
          case "달콤한 스무디" :
          case "달콤한스무디" :
          case "극한직업" :
          case "팝송" :
          case "로맨스" :
          case "선물 상자" :
          case "선물상자" :
          case "달콤한 칵테일" :
          case "달콤한칵테일" :
          case "기쁨" :
          case "1" : 
              coordinates.x += 1;
              coordinates.y += 1;
              break;
          case "잔잔한 바람" : 
          case "잔잔한바람" :
          case "시냇물 소리" :
          case "시냇물소리" :
          case "초록" :
          case "부드러움" :
          case "시원한 바람" : 
          case "시원한바람" :
          case "평온한 곰" :
          case "평온한곰" :
          case "잔잔한 호수" :
          case "잔잔한호수" :
          case "잠자는 강아지" :
          case "잠자는강아지" :
          case "따뜻한 캐모마일 티" :
          case "따뜻한 캐모마일티" :
          case "따뜻한캐모마일티" :
          case "어바웃타임" :
          case "재즈" :
          case "다큐" :
          case "따뜻한 이불" :
          case "따뜻한이불" :
          case "무알콜 맥주" :
          case "무알콜맥주" :
          case "의아" :
          case "2":
              coordinates.x += 1;
              coordinates.y -= 1;
              break;
          case "비" :
          case "울음소리" :
          case "회색" :
          case "쓴맛" :
          case "폭우" :
          case "이별 편지" :
          case "이별편지" :
          case "고요한 숲" :
          case "고요한숲" :
          case "배고픈 강아지" :
          case "배고픈강아지" :
          case "에스프레소" :
          case "지금 만나러 갑니다" :
          case "지금만나러갑니다" :
          case "발라드" :
          case "가족" :
          case "잊혀진 장난감" :
          case "잊혀진장난감" :
          case "약한 위스키" :
          case "약한위스키" :
          case "우려" :
          case "3":
              coordinates.x -= 1;
              coordinates.y -= 1;
              break;
          case "폭염" :
          case "천둥번개" :
          case "빨강" :
          case "매움" :
          case "폭설" :
          case "분노한 토끼" :
          case "분노한토끼" :
          case "가파른 산 정상" :
          case "가파른 산정상" :
          case "가파른산정상" :
          case "마구 짖는 강아지" :
          case "마구짖는 강아지" :
          case "마구짖는강아지" :
          case "레드불" :
          case "존윅4" :
          case "락" :
          case "힙합" :
          case "락, 힙합" :
          case "범죄" :
          case "느와르" :
          case "범죄, 느와르" :
          case "깨진 거울" :
          case "깨진거울" :
          case "파이어볼 위스키" :
          case "파이어볼위스키" :
          case "짜증" :
          case "4":
              coordinates.x -= 1;
              coordinates.y += 1;
              break;
          default:
              break;
        }
      }
      return coordinates;
    }

    // var coordinates = tempexpressWithCoordinates();
    // console.log(coordinates);
    // var moodExpression = expressMoodFromCoordinates(coordinates);
    // var resultHtml = "result_" + moodExpression + ".html";

    function expressMoodFromCoordinates(coordinates) {
        if (coordinates.x > 0 && coordinates.y > 0) {
            return "happy";
        } else if (coordinates.x >= 0 && coordinates.y <= 0) {
            return "depress";
        } else if (coordinates.x < 0 && coordinates.y < 0) {
            return "sad";
        } else if (coordinates.x <= 0 && coordinates.y >= 0) {
            return "angry";
        } else {
            return "알 수 없는 기분";
        }
    }
    //까지

    //"새로운 창으로 넘어가기" 버튼 클릭 이벤트 핸들러
    const newWindowButton = document.getElementById('new-window-button');
    newWindowButton.addEventListener('click', function() {
      var coordinates = tempexpressWithCoordinates();
      console.log(coordinates);
      var moodExpression = expressMoodFromCoordinates(coordinates);
      resultHtml = "result_" + moodExpression + ".html";
      console.log(resultHtml);
      location.href = resultHtml;
    });
    
    // "일기 저장" 버튼 클릭 이벤트 핸들러
    const databaseSubmitButton = document.getElementById('database-submit-button');
    databaseSubmitButton.addEventListener('click', function() {
      // "일기 저장" 버튼을 클릭할 때 chat_server.php 파일 열기
      var coordinates = tempexpressWithCoordinates();
      console.log(coordinates);
      var moodExpression = expressMoodFromCoordinates(coordinates);
      resultHtml = "result_" + moodExpression + ".html";
      console.log(resultHtml);
      document.getElementById('resultHtml').value = resultHtml;
      document.getElementById('database-form').submit();
      location.href = 'chat_server.php'; // chat_server.php 파일로 이동
    });
});