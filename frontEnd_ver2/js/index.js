let today = "2020-06-08";
let student_cnt = "0"; //전체 학생 수
let check_cnt = "0"; //체크된 학생 수
let timeList = []; //시간 리스트
const BASICTEMP = 37.49; //기준온도
// const SERVEIP = "10.80.162.7:8080";
// const SERVEIP = "192.168.0.14:8080";
const SERVEIP = "10.80.161.78:8080";

$(document).ready(function () {
    // Create two variable with the names of the months and days in an array
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // 오늘 날짜 세팅하기
    var newDate = new Date(); // newDate() 객체 생성
    newDate.setDate(newDate.getDate()); // Data 객체에서 현재 날짜 추출
    // day, date, month, year 작성
    $('#presentDate').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate
        .getMonth()] + ' ' + newDate.getFullYear());

    today = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);
    console.log(today);
    //select Box 날짜 설정
    $("#SelectDate").attr('value', today);
    $("#SelectDate").attr('max', today);


    //학년,반,타임 정보를 받아와 그려준다.
    $.ajax({
        type: "GET",
        url: 'http://' + SERVEIP + '/info',
        dataType: 'json',
        success: function (response) {
            console.log("학교정보를 읽었습니다.");
            console.log(response);

            //학년
            for (let i = 1; i <= response.grade; i++) {
                $("#id_grade").append(
                    "<option value=" + i + ">" + i + "학년</option>"
                );
            };
            //학반
            for (let i = 1; i <= response.class; i++) {
                $("#id_class").append(
                    "<option value=" + i + ">" + i + "반</option>"
                );
            };
            //타임 정보
            for (let i = 0; i < response.codes.length; i++) {
                $("#id_time").append(
                    "<option value=" + (i + 1) + ">" + response.codes[i] + "</option>"
                );
            };

            timeList = response.codes // 시간 설정
            //전체 학생 수 설정
            student_cnt = response.student_cnt;
        }
    })

    //도넛 그래프 재로드
    $('.js-chart').setChart();
    $('.js-count').count();

    // 초 단위 시계 갱신
    setInterval(function () {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);
    setInterval(function () {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);
    setInterval(function () {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);

    // 필터에 따른 정보를 받아온다
    $("#filter").click(function () {
        console.log("clicked the #filter");
        let SelectGrade = $("#id_grade").val();
        let SelectClass = $("#id_class").val();
        let SelectTime = $("#id_time").val();
        let SelectDate = $("#SelectDate").val();
        today = SelectDate;
        console.log(SelectGrade + SelectClass + SelectTime + ":" + SelectDate);

        if (SelectTime == 0) {
            alert("시간을 선택해주세요.");
        } else {
            // 필터에 따른 정보를 모두 받아온다
            $.ajax({
                type: "GET",
                url: 'http://' + SERVEIP + '/searchRecordFilter?class_=' + SelectClass + '&date=' + SelectDate + '&grade=' + SelectGrade + '&number=0&recordCode=' + SelectTime,
                dataType: 'json',
                async: true,
                success: function (response) {
                    console.log("필터 목록을 읽었습니다.");
                    console.log(response);

                    //테이블 초기화
                    $(".studentSection").remove();

                    //검색된 결과가 없다면
                    if (response.length == 0) {
                        console.log("NULLLLLLLLL");
                        $(".tablebody").append(
                            "<div class='studentSection Non'>" +
                            "조회된 데이터가 없습니다." +
                            "</div>"
                        )
                    } else {
                        setList(response);
                    }

                    //도넛 그래프 재로드
                    student_cnt = student_cnt;
                    check_cnt = response.length;
                    $('.js-chart').setChart();
                    $('.js-count').count();
                },
                error: function (state, error) {
                    console.log("필터 목록 로드 에러", state, error);
                    alert("필터 목록 로드 에러");
                }
            });
        }

    });
});