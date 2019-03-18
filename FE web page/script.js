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
//-----var now = new Date();

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
		
		//*****this is for me ok
		console.log(data);
		// here, we will look at and do things with the data we've pulled
		for (let j = 0; j < 20; j++){			
			//*****these are for me okay don't look
			//-----console.log(now);
			//console.log(data);
			//console.log(data.data[j].contentId);
			
			// by the end of the for loop, ids will have 20 terms separated with commas
			if (j == 0)
				ids = data.data[j].contentId;
			else
				ids += "," + data.data[j].contentId;
			
			// articles in the api have headlines while videos have titles, and so we must differentiate them accordingly
			// if it's an article, it's an article. if it's not, it's a movie. we are also adding those things to our HTML
			if (data.data[j].contentType == "article")
				document.getElementById("data" + (i*20 + j)).innerHTML += data.data[j].metadata.headline + "<br>";
			else
				document.getElementById("data" + (i*20 + j)).innerHTML += data.data[j].metadata.title + "<br>";
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
