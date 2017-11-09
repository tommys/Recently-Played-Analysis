function drawCharts(recentlyPlayedAnalysis, trackAnalysis) {

    let colours = ['#1ED760', '#F573A0', '#509BF5', '#B49BC8', '#FF6437', '#FAE62D', '#CDF564'];

    // Context pie chart
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Context');
    data.addColumn('number', 'Count');
    data.addRows([
        ['Playlist', recentlyPlayedAnalysis.context[0]],
        ['Album', recentlyPlayedAnalysis.context[1]],
        ['Artist', recentlyPlayedAnalysis.context[2]]
    ]);

    var options = {'title':'Listening Context',
                    'width':400,
                    'height':300,
                    'colors': colours};

    var contextPie = new google.visualization.PieChart(document.getElementById('context-pie'));
    contextPie.draw(data, options);

    // Played At timeline
    data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Played At');
    data.addColumn('number', 'Value');
    data.addRows(
        recentlyPlayedAnalysis.playedAt
    );

    var options = {'title':'Played At Timeline',
                    'width':1200,
                    'height':100,
                    'colors': colours,
                    'legend': 'none',
                    vAxis: {'textPosition':'none', 'gridlines':{'count':2}}};

    var timeline = new google.visualization.ScatterChart(document.getElementById('playedat-timeline'));
    timeline.draw(data, options);

    // Tempo column chart
    data = new google.visualization.DataTable();
    data.addColumn('number', 'index');
    data.addColumn('number', 'Tempo');
    data.addRows(
        trackAnalysis.tempo
    );

    var options = {'title':'Tempos',
                    'width':800,
                    'height':300,
                    'colors': colours,
                    'legend': 'none'};

    var chart = new google.visualization.ColumnChart(document.getElementById('tempo-chart'));
    chart.draw(data, options);

    // Duration column chart
    data = new google.visualization.DataTable();
    data.addColumn('number', 'index');
    data.addColumn('number', 'Duration');
    data.addRows(
        trackAnalysis.duration
    );

    var options = {'title':'Duration',
                    'width':800,
                    'height':300,
                    'colors': colours,
                    'legend': 'none'};

    var chart = new google.visualization.ColumnChart(document.getElementById('duration-chart'));
    chart.draw(data, options);

    // Features column chart
    data = new google.visualization.DataTable();
    data.addColumn('number', 'index');
    data.addColumn('number', 'Acousticness');
    data.addColumn('number', 'Danceability');
    data.addColumn('number', 'Energy');
    data.addColumn('number', 'Instrumentalness');
    data.addColumn('number', 'Liveness');
    data.addColumn('number', 'Speechiness');
    data.addColumn('number', 'Valence');
    data.addRows(
        trackAnalysis.features
    );

    var options = {'title':'Features',
                    'width':'100%',
                    'height':400,
                    'colors': colours};

    var chart = new google.visualization.ColumnChart(document.getElementById('features-chart'));
    chart.draw(data, options);

    // Mode pie
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Mode');
    data.addColumn('number', 'Count');
    data.addRows([
        ['Major', trackAnalysis.counts.mode[0]],
        ['Minor', trackAnalysis.counts.mode[1]]
    ]);

    var options = {'title':'Features',
                    'width':'100%',
                    'height':400,
                    'colors': colours};

    var chart = new google.visualization.PieChart(document.getElementById('mode-pie'));
    chart.draw(data, options);

}