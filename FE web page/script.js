// one div for each of the "latest news" items
const app = document.getElementById("root");
for (let h = 0; h < 320; h++){
	const newDiv = document.createElement("div");
	newDiv.setAttribute("id","data"+h);
	app.appendChild(newDiv);
}

// an array of request variables for the content endpoints that we will assign xmlhttprequests to soon
var contentRequests = [];
// another array of request variables for the comment endpoints
var commentRequests = [];
// create a date object, will be used later to determine how long ago an item was posted
var now = new Date();

// i want to gather information from all entries of the api, startindex goes up to 300 and 20 can be displayed at once
// 300/20 = 15, our upper limit on the for loop
for (let i = 0; i <= 15; i++){
	// assign an XHR object to one of the request variables
	contentRequests[i] = new XMLHttpRequest();
	// open a connection to ign's api with a get request (cors proxy used), start index of url increments by 20 since we display 20 at once
	contentRequests[i].open("GET","http://localhost:8080/https://ign-apis.herokuapp.com/content?startIndex=" + i*20 + "&count=20",true);
	
	contentRequests[i].onload = function(){
		// this will give us an object we can work with that contains the entire page of data, 
		var data = JSON.parse(this.response);
		// will store a comma-delimited string for the comments api query
		var ids;
		
		// this is for me ok
		console.log(data);
		
		// here, we will look at and do things with the data we've pulled
		for (let j = 0; j < 20; j++){						
			// by the end of the for loop, ids will have 20 terms separated with commas
			if (j == 0)
				ids = data.data[j].contentId;
			else
				ids += "," + data.data[j].contentId;
			
			// this is the div we will insert data into
			var dataElem = document.getElementById("data" + (i*20 + j));
			
			// articles in the api have headlines while videos have titles, and so we must differentiate them accordingly
			// if it's an article, it's an article. if it's not, it's a movie. we are also adding those things to our HTML
			if (data.data[j].contentType == "article")
				dataElem.innerHTML += data.data[j].metadata.headline;
			else {
				dataElem.innerHTML += data.data[j].metadata.title;
				// we can also use this if/else to take the duration for videos
				dataElem.innerHTML += data.data[j].metadata.duration;
			}
			
			// added if statement as a couple API items had empty thumbnail arrays, causing a typeError
			if (data.data[j].thumbnails.length > 0)
				// insert the thumbnail images into our HTML
				dataElem.innerHTML += "<img src=\"" + data.data[j].thumbnails[2].url + "\">";
			
			// the date each post was published on
			var datePublished = new Date(data.data[j].metadata.publishDate);
			var yearsAgo = 0;
			// let's look at the date that is one year after the publish date
			datePublished.setUTCFullYear(datePublished.getUTCFullYear() + 1);
			// if this new date is still in the past,
			if (datePublished <= now){
				// find out how many years old the post is
				while (datePublished <= now){
					datePublished.setUTCFullYear(datePublished.getUTCFullYear() + 1);
					yearsAgo++;
				}
				dataElem.innerHTML += yearsAgo + "y";
			}
			else {
				var monthsAgo = 0;
				// if it's not at least a year old, adjust the year back by one
				datePublished.setUTCFullYear(datePublished.getUTCFullYear() - 1);
				// follow the same logic as above but for months instead of years
				datePublished.setUTCMonth(datePublished.getUTCMonth() + 1);
				if (datePublished <= now){
					// find out how many months old the post is
					while (datePublished <= now){
						datePublished.setUTCMonth(datePublished.getUTCMonth() + 1);
						monthsAgo++;
					}
					dataElem.innerHTML += monthsAgo + "mo";
				}
				else {
					// if it's not even a month old, do the same for days
					var daysAgo = 0;
					datePublished.setUTCMonth(datePublished.getUTCMonth() - 1);
					datePublished.setUTCDate(datePublished.getUTCDate() + 1);
					if (datePublished <= now){
						while (datePublished <= now){
							datePublished.setUTCDate(datePublished.getUTCDate() + 1);
							daysAgo++;
						}
						dataElem.innerHTML += daysAgo + "d";
					}
					else {
						// if it's not even a day old, do the same for hours...
						var hoursAgo = 0;
						datePublished.setUTCDate(datePublished.getUTCDate() - 1);
						datePublished.setUTCHours(datePublished.getUTCHours() + 1);
						if (datePublished <= now){
							while (datePublished <= now){
								datePublished.setUTCHours(datePublished.getUTCHours() + 1);
								hoursAgo++;
							}
							dataElem.innerHTML += hoursAgo + "h";
						}
						else{
							// and finally, the minutes
							var minutesAgo = 0;
							datePublished.setUTCHours(datePublished.getUTCHours() - 1);
							datePublished.setUTCMinutes(datePublished.getUTCMinutes() + 1);
							if (datePublished <= now){
								while (datePublished <= now){
									datePublished.setUTCMinutes(datePublished.getUTCMinutes() + 1);
									minutesAgo++;
								}
								dataElem.innerHTML += minutesAgo + "m";
							}
							else
								// if it's not even one full minute old, that is what we will display
								dataElem.innerHTML += "0m";
						}
					}
				}
			}
		}
		// xhr request for comments endpoint each time we have a full query string to use
		commentRequests[i] = new XMLHttpRequest();
		commentRequests[i].open("GET","http://localhost:8080/https://ign-apis.herokuapp.com/comments?ids=" + ids,true);
		commentRequests[i].onload = function(){
			var alsoData = JSON.parse(this.response);
			
			console.log(i, alsoData);
			// add the comment counts to the HTML
			for (let k = 0; k < 20; k++){
				document.getElementById("data" + (i*20 + k)).innerHTML += alsoData.content[k].count;
			}
		}
		commentRequests[i].send();
		//console.log(ids);
	}
	// send request
	contentRequests[i].send();
}
