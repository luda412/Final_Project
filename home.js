var clickedDate = null;

function getCurrentDate() {
    return new Date();
}

function createCalendar(year, month) {

    // 이전 달 버튼 클릭 시 이벤트 처리
    document.getElementById("prevMonthBtn").addEventListener("click", function() {
          var prevMonth = new Date(year, month - 1);
          createCalendar(prevMonth.getFullYear(), prevMonth.getMonth());
      });

      // 다음 달 버튼 클릭 시 이벤트 처리
      document.getElementById("nextMonthBtn").addEventListener("click", function() {
          var nextMonth = new Date(year, month + 1);
          createCalendar(nextMonth.getFullYear(), nextMonth.getMonth());
      });

      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
      var startingDay = firstDay.getDay();
      var totalDays = lastDay.getDate();

      var table = document.getElementById("calendar");
      table.innerHTML = ''; // 기존 테이블 내용 초기화

      var headerRow = document.createElement("tr");
      var daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
      for (var i = 0; i < 7; i++) {
          var headerCell = document.createElement("th");
          headerCell.textContent = daysOfWeek[i];

          //첫번째 's'를 빨간색으로
          if (i === 0){
            headerCell.style.color = "red";
          }
          if (i === 6){
            headerCell.style.color="blue";
          }


          headerRow.appendChild(headerCell);
      }
      table.appendChild(headerRow);

      var date = 1;
      for (var row = 0; row < 6; row++) {
          var newRow = document.createElement("tr");

          for (var col = 0; col < 7; col++) {
              if (row === 0 && col < startingDay) {
                  var newCell = document.createElement("td");
                  newRow.appendChild(newCell);
              } else if (date > totalDays) {
                  break;
              } else {
                  var newCell = document.createElement("td");
                  newCell.textContent = date;

                  if (year === new Date().getFullYear() && month === new Date().getMonth() && date === new Date().getDate()) {
                      newCell.classList.add("today");
                  }

                  // newCell.addEventListener("click", function() {
                  //     var clickedDate = new Date(year, month, this.textContent);
                  //     var options = { year: 'numeric', month: 'long', day: 'numeric' };
                  //     var formattedDate = clickedDate.toLocaleDateString(undefined, options);

                  //     location.href = "0708.html"; // 새 창을 열고자 하는 경우에는 URL을 입력하세요.
                  // });

                  const urlParams = new URLSearchParams(window.location.search);
                  const clickedDate = urlParams.get('date');
                  let clickedOnce = false;

                  newCell.addEventListener("click", function(event) {
                    const cellText = event.target.textContent;
                    const clickedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${cellText.toString().padStart(2, "0")}`;
                    
                    if (!clickedOnce) {
                        clickedOnce = true;
                        clickTimer = setTimeout(function() {
                            // 일정 시간 내에 두 번 클릭이 없으면 단일 클릭으로 처리
                            location.href = "chat.html?date=" + clickedDate; // clickedDate를 query parameter로 전달
                            clickedOnce = false;
                        }, 300); // 300ms 이내에 두 번 클릭이 없으면 단일 클릭으로 처리
                    } else {
                        clearTimeout(clickTimer);
                        // 더블 클릭 시 이동할 URL
                        location.href = "diadia.html?date=" + clickedDate; // clickedDate를 query parameter로 전달
                        clickedOnce = false;
                    }
                    console.log(clickedDate)
                });
             

                  //여기에 추가
                  newCell.addEventListener("mouseenter", function() {
                  var hoveredDate = new Date(year, month, this.textContent);
                  var options = { year: 'numeric', month: 'long', day: 'numeric' };
                  var formattedDate = hoveredDate.toLocaleDateString(undefined, options);

                  var dateInfoBox = document.getElementById("dateInfoBox");
                  var dateInfoText = document.getElementById("dateInfoText");
                  dateInfoText.textContent = formattedDate;
                  dateInfoBox.style.display = "block";
                  });

                  newCell.addEventListener("mouseleave", function() {
                  var dateInfoBox = document.getElementById("dateInfoBox");
                  dateInfoBox.style.display = "none";
                  });
                  //까지

                  newRow.appendChild(newCell);
                  date++;
              }
          }

          table.appendChild(newRow);
      }
  }
  function displayDataForDate(date) {
    // 서버에 데이터 요청을 보내고 데이터를 가져오는 예시 (AJAX를 사용)
    // 실제로는 서버 측 코드를 작성하여 데이터를 가져와야 합니다.
    fetch(`data_display.php?date=${date}`)
        .then(response => response.text())
        .then(data => {
            // 데이터를 화면에 표시
            document.getElementById("data-display").innerHTML = data;
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        });
}

  // 현재 날짜를 가져옴
  var currentDate = getCurrentDate();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();

  // 캘린더 생성
  createCalendar(currentYear, currentMonth);

    // Canvas 요소와 2D 그래픽 컨텍스트 가져오기
    const canvas = document.getElementById('barChart');
    const context = canvas.getContext('2d');

    // 막대 그래프 데이터 (예시)
    const data = [15, 30, 45, 20]; // 각 막대의 높이 값
    const labels = ['Happy', 'Depress', 'Sad', 'Anger']; // 각 막대의 라벨

    // 화면 중앙에 막대 그래프 그리기
    const barWidth = 40; // 각 막대의 너비
    const spacing = 20; // 각 막대 사이의 간격
    const startX = (canvas.width - (data.length * (barWidth + spacing)) + spacing) / 2; // 화면 가운데로 이동
    const barColors = ['#FFD1DA','#C8E4B2', '#A0BFE0', '#D8B4F8', '#9933cc'];

    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / Math.max(...data)) * (canvas.height - 20);
        const x = startX + i * (barWidth + spacing);

        const y = canvas.height - barHeight;

        context.fillStyle = barColors[i % barColors.length]; // 막대 색상
        context.fillRect(x, y, barWidth, barHeight);

        context.fillStyle = '#555'; // 라벨 색상
        context.font = '14px Arial'; // 라벨 폰트
        context.textAlign = 'center';
        context.fillText(labels[i], x + barWidth / 2, canvas.height - 5);
    }