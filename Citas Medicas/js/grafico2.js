let URL = 'http://localhost:8081/estados/grafico2';

const btnActualizar = id("btnActualizar");

window.onload = () => {
    visualizarGrafico();
}

const visualizarGrafico = () => {
    fetch(URL, {
        method: "GET"
    })
    .then(response => {
        log(response)
        return response.json()
    })
    .then(response => {
        log(response)
        cargarGrafico(response)
    })
    .catch(error => {
        log(error)
    });
}

btnActualizar.onclick = () => {
    visualizarGrafico();
}

const cargarGrafico = (datos) => {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estados por citas'
        },
        subtitle: {
            text: 'Visualizacion de Estados por Citas'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de citas'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> en total<br/>'
        },

        series: [
            {
                name: "Estados",
                colorByPoint: true,
                data: datos
            }
        ],
        
    });
}

