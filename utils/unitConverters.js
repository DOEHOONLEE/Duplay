export const HMStoSecond = (HMS) => {
    return HMS.split(':').reverse().reduce((a,c,idx) => a + Math.pow(60,idx) * c ,0);
}

export const secToDisplayFormat = (second) => {
    let hour = Math.floor(second / 3600);
    let min = Math.floor(second % 3600 / 60);
    let sec = Math.floor(second % 3600 % 60);

    return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
}