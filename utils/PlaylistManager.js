import { HMStoSecond } from "./unitConverters";

export class PlaylistManager {
    constructor(playlistContainer, watchedList) {
        this.playlistContainer = playlistContainer
        this.watchedDuration = 0
        this.videoDurations = []
        this.totalDuration = 0
        this.watchedList = watchedList
    }

    getWatchedDuration() {
        this.watchedList.forEach(eachVideo => {
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
            this.watchedDuration += watchedCurrent;
        });
    }

    getTotlaDuration() {
        // 각 비디오의 시간 받아오기
        for (let i=0; i < playlist.length; i++) {
            if (playlist[i].tagName === "SPAN") {
                this.videoDurations.push(playlist[i].innerHTML.trim());
            }
        }

        // 각 비디오의 시간 계산 후, 총 길이에 더하기
        videoDurations.forEach(eachDuration => {
            totalDuration += HMStoSecond(eachDuration);
        });
    }

    completedVideoShader() {
        const percent_100 = [...document.querySelectorAll('#progress')].filter(percent => percent.style.width === '100%');
        
        percent_100.forEach( video => {
            video.parentNode.parentNode.parentNode.parentNode.parentNode.style.opacity = `${shadeCheck ? "0.4" : "1"}`;
        });
    }
}