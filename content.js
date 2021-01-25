chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

                    // [0] DOM selection + 필요 변수들 정의  //

    const playlistContainer = document.querySelectorAll(".ytd-thumbnail-overlay-time-status-renderer");
    let videoDurations = [];
    let totalDuration = 0;
    let watchedDuration = 0;

                    // [1] 함수들 정의  //

    // 플레이리스트 총 시간/길이 계산
    function totalDurationCalc(playlist) {
        // 각 비디오의 시간 받아오기
        for (let i=0; i < playlist.length; i++) {
            if (playlist[i].tagName === "SPAN") {
            videoDurations.push(playlist[i].innerHTML.trim());
            }
        }

        // 각 비디오의 시간 계산 후, 총 길이에 더하기
        videoDurations.forEach(eachDuration => {
            totalDuration += HMStoSecond(eachDuration);
        });

        // 시청한 비디오 계산
        checkWatched();
    }

    // 시청한 비디오 시간 계산
    function checkWatched() {
        const watchedList = [...document.querySelectorAll("#progress")].slice(0,-1);
        watchedList.forEach(eachVideo => {
            const HMS = eachVideo.parentNode.parentNode.children[2].innerText.trim();
            const percentile = eachVideo.style.width;

            // 현재 비디오 시간의 퍼센트 계산 후 시청한 시간에 더하기
                // 현재 비디오 길이
            const currentDuration = HMStoSecond(HMS);
                // 시청한 퍼센트 숫자로 변환
            const percentToNum = Number(percentile.match(/\d+/g)[0]);
                // 현재 비디오 시청 길이
            const watchedCurrent = Math.floor((currentDuration * percentToNum) / 100);

            // 총 시청 시간에 더하기
            watchedDuration += watchedCurrent;
        });
    }

    // HMS 를 초단위로 변환
        // HMS 파라미터 = HH:MM:SS 형식의 문자열
    function HMStoSecond(HMS) {
        return HMS.split(':').reverse().reduce((a,c,idx) => a + Math.pow(60,idx) * c ,0);
    }

    // 초를 HMS 로 변환
    function secToDisplayFormat(second) {
        let hour = Math.floor(second / 3600);
        let min = Math.floor(second % 3600 / 60);
        let sec = Math.floor(second % 3600 % 60);
        
        return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
    }

    // 100 퍼센트 시청한 영상 투명도 조절 함수
    function watchCompleted(){
        const shadeCheck = document.querySelector('#shadeCheck').checked
        const percent_100 = [...document.querySelectorAll('#progress')].filter(percent => percent.style.width === '100%');
        // if( shadeCheck ){
            percent_100.forEach( video => {
                video.parentNode.parentNode.parentNode.parentNode.parentNode.style.opacity = '0.4';
            })
        // }else{
        //     percent_100.forEach( video => {
        //         video.parentNode.parentNode.parentNode.parentNode.parentNode.style.opacity = '1';
        //     })
        // }
    }

                        // [3] 함수 호출 + 전달 할 값 정의 //

    // 1. 플레이리스트 총 길이 및 시청한 길이 계산
    totalDurationCalc(playlistContainer);

    // 2. 100% 시청한 영상 투명도 조절!
    // document.querySelector('.switch').addEventListener('click', watchCompleted);
    watchCompleted();

    // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
    const result = [secToDisplayFormat(totalDuration), secToDisplayFormat(watchedDuration), watchedDuration / totalDuration];
    
    if (request.action == "getDOM") {
        sendResponse({dom: result});
    }
    else {
        sendResponse({}); // Send nothing..
    }
});