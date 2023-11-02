<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // 대답들을 POST 요청으로부터 수신
  $answer1 = $_POST["answer1"];
  $answer2 = $_POST["answer2"];
  $answer3 = $_POST["answer3"];
  $answer4 = $_POST["answer4"];
  $answer5 = $_POST["answer5"];
  $answer6 = $_POST["answer6"];
  $answer7 = $_POST["answer7"];
  $answer8 = $_POST["answer8"];
  $answer9 = $_POST["answer9"];
  // 나머지 대답들도 유사하게 수신
  $question1 = $_POST["question1"];
  $question2 = $_POST["question2"];
  $question3 = $_POST["question3"];
  $question4 = $_POST["question4"];
  $question5 = $_POST["question5"];
  $question6 = $_POST["question6"];
  $question7 = $_POST["question7"];
  $question8 = $_POST["question8"];
  $question9 = $_POST["question9"];

  // 수신한 대답들을 가지고 원하는 처리를 수행
  $selectedDate = $_POST['date'];
  $resultHtml = $_POST["resultHtml"];

  // $resultHtml = $_POST["resultHtml"];

  //예: 대답들을 데이터베이스에 저장
  $dbHost = "localhost";
  $dbUser = "test";
  $dbPassword = "password";
  $dbName = "working";
  $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
  if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
  }
//   $sql = "INSERT INTO answers (answer1, answer2, answer3) VALUES ('$answer1', '$answer2', '$answer3')";
  $sql = "INSERT INTO diaryyy (answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, question1, question2, question3, question4, question5, question6, question7, question8, question9, myDate) VALUES ('$answer1', '$answer2', '$answer3', '$answer4', '$answer5', '$answer6', '$answer7', '$answer8', '$answer9', '$question1', '$question2', '$question3', '$question4', '$question5', '$question6', '$question7', '$question8', '$question9', '$selectedDate')";

  if ($conn->query($sql) === TRUE) {
    // header("Location: " . $resultHtml);
    // exit; // 리디렉션 이후 스크립트 실행을 중지합니다.
    echo "일기가 저장되었습니다!";
    echo "<br>";
    // echo $resultHtml;
    echo '<script>location.href = "' . $resultHtml . '";</script>'; 
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
}
?>

<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
      /* 중앙 정렬 스타일 */
      body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
      }

      h1 {
          text-align: center;
          margin-bottom: 20px; /* 문구 바로 아래로 버튼을 이동 */
          font-size: 24px; /* 글자 크기 조정 */
      }

      /* 뒤로가기 버튼 스타일 */
      #backButton {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px; /* 약간 둥글게 처리된 사각형 버튼 */
          cursor: pointer;
      }
  </style>
</head>

<body>
    <h1>감정 분석을 눌러 감정 분석 결과를 확인해주세요</h1>
    
    <!-- 뒤로가기 버튼 -->
    <button id="backButton">감정분석</button>
    
    <script>
        // 뒤로가기 버튼 클릭 시 이벤트 핸들러
        document.getElementById('backButton').addEventListener('click', function() {
            // result.html로 이동
            location.href = "<?php echo $resultHtml; ?>";
        });
    </script>
</body>
</html>