// an array of request variables we will use to assign xmlhttprequests to soon
var request = [];

// i want to gather information from all entries of the api, startindex goes up to 300 and 20 can be displayed at once
// 300/20 = 15, our upper limit on the for loop
for (let i = 0; i <= 15; i++){
	// assign an XHR object to one of the request variables
	request[i] = new XMLHttpRequest();
	// open a connection to ign's api with a get request (cors proxy used), start index of url increments by 20 since we display 20 at once
	request[i].open('GET','http://localhost:8080/https://ign-apis.herokuapp.com/content?startIndex=' + i*20 + '&count=20',true);
	
	request[i].onload = function(){
		// here, we will look at and do things with the data we've pulled
		for (let j = 0; j < 20; j++){
			// this will give us an object we can work with that contains the entire page of data, 
			var data = JSON.parse(this.response);
			
			// these are for me okay don't look
			console.log(data);
			console.log(data.data[j].contentType);
			
			// articles in the api have headlines while videos have titles, and so we must differentiate them accordingly
			// if it's an article, it's an article. if it's not, it's a movie. we are also adding those things to our HTML
			if (data.data[j].contentType == "article")
				document.getElementById("data" + data.startIndex/20).innerHTML += data.data[j].metadata.headline + "<br>";
			else
				document.getElementById("data" + data.startIndex/20).innerHTML += data.data[j].metadata.title + "<br>";
		}
	}
	// send request
	request[i].send();
}
