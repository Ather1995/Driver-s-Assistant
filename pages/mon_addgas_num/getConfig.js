
import Chart from '../canvas/chart'
export default function(canvasConfig){
    var chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
    };

    var randomScalingFactor = function () {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
        console.log("aaaa");
    }
    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
        console.log("bbbb");
    };

    var chartConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    chartColors.red,
                    chartColors.orange,
                    chartColors.yellow,
                    chartColors.green,
                    chartColors.blue,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                "0次",
                "1次",
                "2次",
                "3次",
                "3次以上"
            ]
        },
        options: {
            responsive: false,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '今日加油数量统计图'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    return {
        chartConfig:chartConfig,
        canvasConfig:canvasConfig
    }
}