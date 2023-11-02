<?php
if (isset($_POST['date'])) {
    // 데이터베이스 연결 정보
    $servername = "localhost"; // MySQL 서버 주소
    $username = "test"; // MySQL 사용자 이름
    $password = "password"; // MySQL 비밀번호
    $dbname = "working"; // 사용할 데이터베이스 이름

    // MySQL 데이터베이스에 연결
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 연결 확인
    if ($conn->connect_error) {
        die("연결 실패: " . $conn->connect_error);
    }

    // UTF-8 인코딩 설정
    mysqli_set_charset($conn, "utf8");

    // 데이터 조회 SQL 쿼리 (선택한 날짜와 일치하는 데이터 조회)
    $selectedDate = $_POST['date'];
    $sql = "SELECT * FROM diaryyy WHERE myDate = '$selectedDate'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // 질문과 답변을 저장할 배열 초기화
        $questions = array();
        $answers = array();

        while ($row = $result->fetch_assoc()) {
            for ($i = 1; $i <= 9; $i++) {
                $questionKey = "question" . $i;
                $answerKey = "answer" . $i;
                if (!empty($row[$questionKey])) {
                    $questions[] = $row[$questionKey];
                    $answers[] = $row[$answerKey];
                }
            }
        }

        // 질문과 답변을 연관 배열로 구성
        $data = array('questions' => $questions, 'answers' => $answers);

        // UTF-8 인코딩과 JSON_UNESCAPED_UNICODE 옵션을 사용하여 JSON으로 반환
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } else {
        $data = array('message' => '선택한 날짜에 대한 데이터가 없습니다.');
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    // 데이터베이스 연결 종료
    $conn->close();
}
?>
