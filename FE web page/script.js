// create a request variable and assign an xmlhttprequest object to it
var request = new XMLHttpRequest();
// open a connection to ign's api with a get request (cors proxy used)
xhr.open('GET', 'http://localhost:8080/https://ign-apis.herokuapp.com/content', true);

xhr.onload = function(){
	const app = document.getElementById('root');
	
	var data = JSON.parse(this.response);
	console.log(data.data[0]);
	
};
// send request
xhr.send();