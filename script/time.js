let startDate = new Date(); // 设置上线开始日期
    
function updateContent() {
    const daysCountElement = document.getElementById("daysCount");
    const onlineStatusElement = document.getElementById("onlineStatus");
    const currentTimeElement = document.getElementById("currentTime");


    // 设置起始日期（2023年8月1日）
    const startDate = new Date(2023, 7, 1); // 月份是从 0 开始的（0 表示一月）

    // 获取当前日期和时间
    const currentDate = new Date();

    // 计算天数差异
    const daysDiff = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1;

    // 更新元素的内容
    daysCountElement.textContent = daysDiff.toString();
    onlineStatusElement.textContent = `平稳运行 ${daysDiff} 天`;

    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
    const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()]; // 获取星期几

    currentTimeElement.textContent = `现在是北京标准时间 ${currentHour} 时 ${currentMinute} 分 ${currentSecond} 秒 , 星期${currentDayOfWeek} ,网站已`;

    // 每秒钟更新一次时间
    setTimeout(updateContent, 1000);
}

// 初始化
updateContent();