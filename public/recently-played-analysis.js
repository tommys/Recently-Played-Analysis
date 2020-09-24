function getRecentlyPlayedAnalysis(recentlyPlayedObject) {

    var item;
    var playlistContextCount = 0;
    var albumContextCount = 0;
    var artistContextCount = 0;
    var playedAtArray = [];

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


    });

    
}

