// Chart Functionality
$.fn.setChart = function () {
    return this.each(function () {
        // Variables
        var chart = $(this),
            path = $('.chart__foreground path', chart),
            dashoffset = path.get(0).getTotalLength(),
            goal = student_cnt, //전체 학생 수
            consumed = check_cnt; //체크된 학생 수

        chart.attr('data-goal', 'goal');
        chart.attr('data-count', 'consumed');

        //Console Test
        // console.log("====" + goal + "====");
        // console.log("====" + consumed + "====");

        percentage = consumed / goal * 100;
        percentage = parseInt(percentage);
        document.getElementById('percent').innerHTML = percentage;
        //확인 (체크된 학생 수)
        document.getElementById('count_consumed').innerHTML = consumed;
        //미확인 (전체 학생 수 - 체크된 학생 수)
        document.getElementById('count_remained').innerHTML = goal - consumed;

        $('.chart__foreground', chart).css({
            'stroke-dashoffset': Math.round(dashoffset - ((dashoffset / goal) * consumed))
        });
    });
}; // setChart()
// Count
$.fn.count = function () {
    return this.each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-count')
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}; // count()

//Click한 학생의 카드키 획득!!!!
$(document).on("click", '.studentSection', function () {
    console.log("checking...cardId");
    let SelectTime = $("#id_time").val();
    let tmp = $(this).attr("name");
    let nameclass = $(this).children().attr("id");

    $.ajax({
        type: "GET",
        url: 'http://' + SERVEIP + '/searchCard?cardId=' + nameclass,
        dataType: 'json',
        async: true,
        success: function (response) {
            console.log("학생정보를 읽었습니다.");
            console.log(response);
            //학생카드 초기화 해야한다.
            $(".stdentId").remove();

            $("#temp").append

            $(".codeNum").append(
                "<div class='stdentId'>" +
                response.cardId + "</div>"
            );

            $(".student-info").append(
                "<div class='stdentId'> 이름 | " +
                response.name + "<br>" +
                "학년 | " + response.grade + "<br>" +
                "학반 | " + response.class + "<br>" +
                "번호 | " + response.classNumber + "<br>" +
                today + "_" + timeList[SelectTime - 1] +
                " 기록 <br> <span id='temp'>" + tmp + " 도</span>" +
                "</div>"
            );
        },
        error: function (state, error) {
            console.log("checking..cardId..Error", state, error);
            alert("학생 정보 로드 에러");
        }
    });
});

//검색되 리스트 렌더링
function setList(response) {
    for (let i = 0; i < response.length; i++) {
        $(".tablebody").append(
            "<div class='studentSection' id='" + i + "' name='" + response[i].temp + "'>" +
            "<div class='cardId' id='" + response[i].cardId + "'></div>" +
            "<div class='section date'>" + today + "</div>" +
            "<div class='section grade'>" + response[i].grade + "</div>" +
            "<div class='section class'>" + response[i].class + "</div>" +
            "<div class='section number'>" + ("0" + response[i].number).slice(-2) + "</div>" +
            "<div class='section name'>" + response[i].name + "</div>" +
            "<div class='section temp'>" + response[i].temp + "</div>" +
            "</div>"
        );
        // 1. 37.5도 보다 높으면 .studentSection over 로 클래스를 바꾼다.
        // 2. 37.5도 보다 높으면 i를 id로 가지는 studentSection 클래스에 over을 추가한다.
        if (response[i].temp > BASICTEMP) {
            $("#" + i).attr("class", "studentSection over");
        }
    }
}