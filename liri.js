var key = require('./key.js');
var consumerKey = key.twitterKeys.consumer_key;
var consumerSecret = key.twitterKeys.consumer_secret;
var accessTokenKey = key.twitterKeys.access_token_key;
var accessTokenSecret = key.twitterKeys.access_token_secret;
var command = process.argv[2];

//take in command my-tweets(last 20 tweets and when created)
if(command === 'my-tweets') {
	var twitter = require('twitter');
	var client = new twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: accessTokenKey,
		access_token_secret: accessTokenSecret
	});
	client.get('statuses/user_timeline',function(error,tweets,response){
		if(!error) {
			for (var i = 0; i < 20; i++) {
				if(tweets[i]) {
				console.log('Tweet '+[i+1]+': '+tweets[i].text+' created at '+tweets[i].created_at);
				} else {
					return;
				}
			}
			
		} else {
			console.log('error!');
		}
	})
};
//spotify-this-song(artist,name,preview link, album, default "The Sign" by Ace of Base)
if(command === 'spotify-this-song'){
	var songName = process.argv.slice(3,process.argv.length).toString();
	if(songName===''){
		songName = 'The Sign';
	} else {
		soneNmae = process.argv.slice(3,process.argv.length).toString();
	};
	
	console.log('Searching results for '+songName+' ...');
	var spotify = require('spotify');
	spotify.search({type:'track', query:songName},function(err,data){
		if(err) {
			console.log('error!');
		} else {
			for (var i = 0; i < data.tracks.items.length; i++) {
				if(data.tracks.items[i].name.toLowerCase().trim().includes(songName.toLowerCase())){
				console.log("result "+[i+1]+": "+data.tracks.items[i].name+" in "+
						"album: "+data.tracks.items[i].album.name+
						" by artist: "+ data.tracks.items[i].artists[0].name+ " at "+
						data.tracks.items[i].preview_url);
					}
				}
			}
			
	})
}
//movie-this(IMDB title, year, IMDB Rating, country produced,language,plot,actors.RT Rating and URL - default Mr.Nobody)
if(command ==='movie-this'){
	var movieName = process.argv.slice(3,process.argv.length).toString();
	if(movieName===''){
		movieName = 'Mr.Nobody';
	} else {
		movieName = process.argv.slice(3,process.argv.length).toString();
	}
	console.log('Searching results for '+movieName+' ...');
	var omdb = require('omdb');
	omdb.search(movieName,function(err,movies){
		if(err){
			console.log('error!');
		} 
		if(movies.length < 1) {
        return console.log('No movies were found!');
	    }
	 
	   for (var i = 0; i < movies.length; i++) {
	   	console.log(movies[i].title, movies[i].year);
	   	//need to figure out why other properties are undefined
	   }
	})
}

//do-what-it-says(fs - take text inside random and use it to call commands)
if(command === 'do-what-it-says'){
	var fs = require('fs');
	fs.readFile('random.txt',{encoding:'UTF8'},function(error,data){ 
	if (error){
		return console.log('error');
	} else {
		console.log(data);
	}

	});
	//need to figure out how to run command in node automatically
}
