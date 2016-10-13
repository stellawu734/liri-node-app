var key = require('./key.js');
var consumerKey = key.twitterKeys.consumer_key;
var consumerSecret = key.twitterKeys.consumer_secret;
var accessTokenKey = key.twitterKeys.access_token_key;
var accessTokenSecret = key.twitterKeys.access_token_secret;
var command = process.argv[2];

function twitter() {
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
}

function spotify(song) {
	var songName = song.replace(/["']/g, "");
	if(songName===''){
		songName = 'The Sign';
	} else {
		soneNmae = song.replace(/["']/g, "");
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

function movie(movie) {
var movieName = movie.replace(/["']/g, "");
	if(movieName===''){
		movieName = 'Mr.Nobody';
	} else {
		movieName = movie.replace(/["']/g, "");
	}
	console.log('Searching results for '+movieName+' ...');
	var request = require('request');
	request('http://www.omdbapi.com/?t='+movieName+'&tomatoes=true&plot=short&r=json', function (error, response, body) {

		if (!error && response.statusCode == 200) {

			console.log(JSON.parse(body)['Title']+" "+JSON.parse(body)['Year']);
			console.log("IMDB rating: " + JSON.parse(body)['imdbRating']);
			console.log("Country: "+JSON.parse(body)['Country']+"; Language: "+JSON.parse(body)['Language']);
			console.log("Plot: "+JSON.parse(body)['Plot']);
			console.log("Actors: "+JSON.parse(body)['Actors'])
			console.log("Rotten Tomatoes Rating: "+JSON.parse(body)['tomatoRating']+"; Rotten Tomatoes URL: "+JSON.parse(body)['tomatoURL']);
		}
	});
}

if(command === 'my-tweets') {
	twitter();
};
//spotify-this-song(artist,name,preview link, album, default "The Sign" by Ace of Base)
if(command === 'spotify-this-song'){
	spotify(process.argv.slice(3,process.argv.length).toString());
}
//movie-this(IMDB title, year, IMDB Rating, country produced,language,plot,actors.RT Rating and URL - default Mr.Nobody)
if(command ==='movie-this'){
	movie(process.argv.slice(3,process.argv.length).toString());
}

//do-what-it-says(fs - take text inside random and use it to call commands)
if(command === 'do-what-it-says'){
	var fs = require('fs');
	fs.readFile('random.txt',{encoding:'UTF8'},function(error,data){ 
	if (error){
		return console.log('error');
	} else {
		var index = data.indexOf(' ');
		var command = data.substr(0, index);
		var input = data.substr(index + 1);

		switch (command) {
			case 'spotify-this-song':
				spotify(input);
				break;
			case 'movie-this':
				movie(input);
				break;
		}
	}

	});
	
}
