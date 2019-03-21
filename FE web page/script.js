// Author: Nathan Zhang

// the container we will put our divs into
const app = document.getElementById("container");

// one article for each of the "latest news" items
for (let i = 0; i < 320; i++){
	var newArt = document.createElement("article");
	newArt.setAttribute("id","data"+i);
	newArt.setAttribute("class","data");
	app.appendChild(newArt);
}

// let's make "smaller" containers to put within each article (got errors trying to do it in the loop above)
for (let i = 0; i < 320; i++){
	var art = document.getElementById("data"+i);
	// one for the thumbnail, the time since post and comment count, and title
	var newThumb = document.createElement("div");
	newThumb.setAttribute("class","thumbnail-container");
	var newTimeComm = document.createElement("div");
	newTimeComm.setAttribute("class","time-comm-container");
	var newTitle = document.createElement("div");
	newTitle.setAttribute("class","title-container");
	art.appendChild(newThumb);
	art.appendChild(newTimeComm);
	art.appendChild(newTitle);
}

// an array of request variables for the content endpoints that we will assign xmlhttprequests to soon
var contentRequests = [];
// another array of request variables for the comment endpoints
var commentRequests = [];
// create a date object, will be used later to determine how long ago an item was posted
var now = new Date();

// the timer will hold the ID given to it by the setInterval function, which gives non-zero numerical values
var timer = 0;
// when a tab button is pressed, call this function
function fadeOut(evt, viewType){
	// only let a button press matter if the animation is not playing
	if (timer == 0){
		// store the event target to pass onto our tabviews function
		target = evt.currentTarget;
		var opacity = 1;
		// every .1 seconds after a tab is clicked, decrease the opacity by 10% until our content is completely transparent
		timer = setInterval(function(){
			if (opacity > 0){
				app.style.opacity = opacity;
				opacity -= .1;
			}
			// once our content is fully transparent: set our view to be visible again, stop the timer, call function to change which content is shown
			else {
				app.style.opacity = 1;
				clearInterval(timer);
				timer = 0;
				tabViews(target, viewType);
			}
		}, 100);
	}
}

function tabViews(tgt, viewType){
	// variables for the HTML elements we need
	var tabButton, tabData, tabVideos, tabArticles;
	tabData = document.getElementsByClassName("data");
	tabVideos = document.getElementsByClassName("video");
	tabArticles = document.getElementsByClassName("article");
	tabButton = document.getElementsByClassName("tab-button");
	// hide the items that do not correspond to our button press
	for (let i = 0; i < tabData.length; i++)
		tabData[i].style.display = "none";
	// when a button is pressed, take the active class away from all of them
	for (let i = 0; i < tabButton.length; i++)
		tabButton[i].className = tabButton[i].className.replace (" active", "");
	// display items when a button is pressed
	if (viewType == "data"){		
		for (let i = 0; i < tabData.length; i++)
			tabData[i].style.display = "inline-block";
	}
	else if (viewType == "video"){
		for (let i = 0; i < tabVideos.length; i++)
			tabVideos[i].style.display = "inline-block";
	}
	else
		for (let i = 0; i < tabArticles.length; i++)
			tabArticles[i].style.display = "inline-block";
	// add the active class to whichever button was pressed
	tgt.className += " active";
}

//dataElem.classList.add("article");

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
		
		// here, we will look at and do things with the data we've pulled
		for (let j = 0; j < 20; j++){						
			// by the end of the for loop, ids will have 20 terms separated with commas
			if (j == 0)
				ids = data.data[j].contentId;
			else
				ids += "," + data.data[j].contentId;
			
			// this is the article we will insert data into
			var dataElem = document.getElementById("data" + (i*20 + j));
			
			// variable to store the article headline or the video title, we will use it immediately below but store it for later as well
			var itemTitle = "";

			// originally used for the indented comments below, this if/else will now do a few more things that depend on whether an item was an article or video
				// articles in the api have headlines while videos have titles, and so we must differentiate them accordingly
				// if it's an article, it's an article. if it's not, it's a video. we are also adding those things to our HTML
			if (data.data[j].contentType == "article"){
				// add class to the containing div accordingly
				dataElem.classList.add("article");
				itemTitle = data.data[j].metadata.headline;
				// insert the title as HTML into it's container
				dataElem.getElementsByClassName("title-container")[0].insertAdjacentHTML("afterbegin",
				"<a href>" + itemTitle + "</a>");
			}
			else {
				dataElem.classList.add("video");
				itemTitle = data.data[j].metadata.title;
				dataElem.getElementsByClassName("title-container")[0].insertAdjacentHTML("afterbegin", 
				"<a href>" + itemTitle + "</a>");
				
				// we can also use this if/else to take the duration for videos
				var vidDur = data.data[j].metadata.duration;
				// and convert the number of seconds to a format that looks more natural
				var formattedDur = "";
				var hours, minutes, seconds;
				hours = Math.floor(vidDur/3600);
				minutes = Math.floor(vidDur%3600/60);
				seconds = vidDur % 60;
				// if the video is at least an hour
				if (hours > 0){
					formattedDur = hours + ":";
					// we need to pad the minutes with a 0 to the left if it's a single digit
					if (minutes < 10)
						formattedDur += "0" + minutes + ":";
					else
						formattedDur += minutes + ":";
					// and then the same for seconds
					if (seconds < 10)
						formattedDur += "0" + seconds;
					else
						formattedDur += seconds;
				}
				else {
					formattedDur = minutes + ":";
					if (seconds < 10)
						formattedDur += "0" + seconds;
					else
						formattedDur += seconds;
				}
				// insert the video duration into the thumbnail container in it's own span since it won't be the only thing in that container
				dataElem.getElementsByClassName("thumbnail-container")[0].insertAdjacentHTML("afterbegin",
					"<a href><span class=\"video-duration\"> <img class=\"duration-icon\" src=\"icons/red-play-button-icon.png\" alt=\"red play button\">" 
					+ formattedDur + "</span></a>");
			}
			
			// added if statement as a couple API items had empty thumbnail arrays at some point, causing a typeError
			if (data.data[j].thumbnails.length > 0)
				// insert the thumbnail into it's container
				dataElem.getElementsByClassName("thumbnail-container")[0].insertAdjacentHTML("afterbegin",
					"<a href><img class=\"thumbnail\" src=\"" + data.data[j].thumbnails[2].url + "\" alt=\"" + itemTitle + "\"></a>");
			
			// the date each post was published on
			var datePublished = new Date(data.data[j].metadata.publishDate);
			var yearsAgo = 0;
			var timeAgo = "";
			// let's look at the date that is one year after the publish date
			datePublished.setUTCFullYear(datePublished.getUTCFullYear() + 1);
			// if this new date is still in the past,
			if (datePublished <= now){
				// find out how many years old the post is
				while (datePublished <= now){
					datePublished.setUTCFullYear(datePublished.getUTCFullYear() + 1);
					yearsAgo++;
				}
				timeAgo += yearsAgo + "y";
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
					timeAgo += monthsAgo + "mo";
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
						timeAgo += daysAgo + "d";
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
							timeAgo += hoursAgo + "h";
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
								timeAgo += minutesAgo + "m";
							}
							else
								// if it's not even one full minute old, that is what we will display
								timeAgo += "0m";
						}
					}
				}
			}
			dataElem.getElementsByClassName("time-comm-container")[0].insertAdjacentHTML("afterbegin", "<span class=\"timeago\">"+ timeAgo + "</span>");
		}
		// xhr request for comments endpoint each time we have a full query string to use
		commentRequests[i] = new XMLHttpRequest();
		commentRequests[i].open("GET","http://localhost:8080/https://ign-apis.herokuapp.com/comments?ids=" + ids,true);
		commentRequests[i].onload = function(){
			var alsoData = JSON.parse(this.response);
			
			console.log(i, alsoData);
			// add the comment counts to the HTML
			for (let k = 0; k < 20; k++){
				// if there are no comments, don't show a number
				if (alsoData.content[k].count == 0)
					document.getElementById("data" + (i*20 + k)).getElementsByClassName("time-comm-container")[0]
					.insertAdjacentHTML("beforeend", "•<img class=\"comment-icon\" src=\"icons/chat-bubble-icon.png\" alt=\"comment icon\">" + 
					"<span class=\"comments\"></span>");
				else
					document.getElementById("data" + (i*20 + k)).getElementsByClassName("time-comm-container")[0]
					.insertAdjacentHTML("beforeend", "•<img class=\"comment-icon\" src=\"icons/chat-bubble-icon.png\" alt=\"comment icon\">" + 
					"<span class=\"comments\">" + alsoData.content[k].count + "</span>");
			}	
		}
		commentRequests[i].send();
		//console.log(ids);
	}
	// send request
	contentRequests[i].send();
}
