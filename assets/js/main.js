// const toggler = document.querySelector("#header-toggle");
// toggler.addEventListener("click",function(){
//     document.querySelector("#sidebar").classList.toggle("collapsed");
// });

// *******Overlay*******
document.getElementById('toggleSidebar').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

document.getElementById('overlay').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});


// *****Graphs*****

(function (H) {
    H.seriesTypes.pie.prototype.animate = function (init) {
        const series = this,
            chart = series.chart,
            points = series.points,
            {
                animation
            } = series.options,
            {
                startAngleRad
            } = series;

        function fanAnimate(point, startAngleRad) {
            const graphic = point.graphic,
                args = point.shapeArgs;

            if (graphic && args) {

                graphic
                    // Set inital animation values
                    .attr({
                        start: startAngleRad,
                        end: startAngleRad,
                        opacity: 1
                    })
                    // Animate to the final position
                    .animate({
                        start: args.start,
                        end: args.end
                    }, {
                        duration: animation.duration / points.length
                    }, function () {
                        // On complete, start animating the next point
                        if (points[point.index + 1]) {
                            fanAnimate(points[point.index + 1], args.end);
                        }
                        // On the last point, fade in the data labels, then
                        // apply the inner size
                        if (point.index === series.points.length - 1) {
                            series.dataLabelsGroup.animate({
                                opacity: 1
                            },
                            void 0,
                            function () {
                                points.forEach(point => {
                                    point.opacity = 1;
                                });
                                series.update({
                                    enableMouseTracking: true
                                }, false);
                                chart.update({
                                    plotOptions: {
                                        pie: {
                                            innerSize: '40%',
                                            borderRadius: 8
                                        }
                                    }
                                });
                            });
                        }
                    });
            }
        }

        if (init) {
            // Hide points on init
            points.forEach(point => {
                point.opacity = 0;
            });
        } else {
            fanAnimate(points[0], startAngleRad);
        }
    };
}(Highcharts));

Highcharts.chart('container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Industry Classification',
        align: 'left'
    },
    subtitle: {
      
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage}%',
                distance: 20
            }
        }
    },
    series: [{
        // Disable mouse tracking on load, enable after custom animation
        enableMouseTracking: false,
        animation: {
            duration: 2000
        },
        colorByPoint: true,
        data: [{
            name: 'Customer Support',
            y: 21.3
        }, {
            name: 'Development',
            y: 18.7
        }, {
            name: 'Sales',
            y: 20.2
        }, {
            name: 'Marketing',
            y: 14.2
        }, {
            name: 'Other',
            y: 25.6
        }]
    }]
});


// *****Graph 2*****

// Data retrieved from https://worldpopulationreview.com/country-rankings/countries-by-density
Highcharts.chart('container1', {
    chart: {
        type: 'variablepie'
    },
    title: {
        text: 'Environmental Concern',
        align: 'left'
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
            '{point.name}</b><br/>' +
            'Area (square km): <b>{point.y}</b><br/>' +
            'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        borderRadius: 5,
        data: [{
            name: 'Spain',
            y: 505992,
            z: 92
        }, {
            name: 'France',
            y: 551695,
            z: 119
        }, {
            name: 'Poland',
            y: 312679,
            z: 121
        }, {
            name: 'Czech Republic',
            y: 78865,
            z: 136
        }, {
            name: 'Italy',
            y: 301336,
            z: 200
        }, {
            name: 'Switzerland',
            y: 41284,
            z: 213
        }, {
            name: 'Germany',
            y: 357114,
            z: 235
        }],
        colors: [
            '#4caefe',
            '#3dc3e8',
            '#2dd9db',
            '#1feeaf',
            '#0ff3a0',
            '#00e887',
            '#23e274'
        ]
    }]
});

// *****graph3

Highcharts.chart('container2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'District Wise Industry Count ',
        align: 'left'
    },
    subtitle: {
       
    },
    xAxis: {
        // categories: [],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Corn',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Wheat',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
    ]
});

// graph3

Highcharts.chart('container3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Industry Count'
    },
   
    xAxis: {
        type: 'category',
        labels: {
            autoRotation: [-45, -90],
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        colors: [
            '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
            '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
            '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
            '#03c69b',  '#00f194'
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: [
            ['Tokyo', 37.33],
            ['Delhi', 31.18],
            ['Shanghai', 27.79],
            ['Sao Paulo', 22.23],
            ['Mexico City', 21.91],
            ['Dhaka', 21.74],
            ['Cairo', 21.32],
            ['Beijing', 20.89],
            ['Mumbai', 20.67],
            ['Osaka', 19.11],
            ['Karachi', 16.45],
            ['Chongqing', 16.38],
            ['Istanbul', 15.41],
            ['Buenos Aires', 15.25],
            ['Kolkata', 14.974],
            ['Kinshasa', 14.970],
            ['Lagos', 14.86],
            ['Manila', 14.16],
            ['Tianjin', 13.79],
            ['Guangzhou', 13.64]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            inside: true,
            verticalAlign: 'top',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});


