function getRecentlyPlayedAnalysis(recentlyPlayedObject) {
    var analysisObject = {};
    var item;
    var playlistContextCount = 0;
    var albumContextCount = 0;
    var artistContextCount = 0;
    var playedAtArray = [];
    var tempArray = [];

    console.log(recentlyPlayedObject.items);

    recentlyPlayedObject.items.forEach(function(item) {
        console.log(item);

        //context
        if(item.context) {
            if(item.context.type == "playlist") {
                playlistContextCount++;
            }
            else if(item.context.type == "album") {
                albumContextCount++;
            }
            else if(item.context.type == "artist") {
                artistContextCount++;
            }
        }

        //playedAt
        tempArray.push(new Date(item.played_at));
        tempArray.push(1);
        playedAtArray.push(tempArray);
        tempArray = [];
    });

    analysisObject = {
        context: [
            playlistContextCount,
            albumContextCount,
            artistContextCount
        ],
        playedAt: playedAtArray
    }

    return analysisObject;
}

function getTrackAnalysis(tracks) {
    var tempos = [];
    var durations = [];
    var features = [];
    var instrumentalCount = 0;
    var acousticCount = 0;
    var majorCount = 0;
    var minorCount = 0;

    tracks.forEach(function(track, index) {
        tempos.push([index, track.tempo]);
        durations.push([index, track.duration_ms]);
        features.push([index, track.acousticness, track.danceability, track.energy, track.instrumentalness, track.liveness, track.speechiness, track.valence]);

        if(track.instrumentalness > 0.7) {
            instrumentalCount++;
        }
        if(track.acousticness > 0.7) {
            acousticCount++;
        }
        if(track.mode == 1) {
            majorCount++;
        } else if(track.mode == 0) {
            minorCount++;
        }
    });

    let trackAnalysisObject = {
        tempo: tempos,
        duration: durations,
        features: features,
        counts: {
            instrumental: instrumentalCount,
            acoustic: acousticCount,
            mode: [majorCount, minorCount]
        }
    }
    
    return trackAnalysisObject;
}
