'use strict';

document.querySelector('button').onclick = myClick;
let avatar = document.getElementById('avatar');
avatar.src = "default3.png";

function httpGet(url) {

  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.onload = function() {
        if (this.status == 200) {
          console.log(this.response);
          resolve(this.response);
        } else {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };

      xhr.send();
  });  
}

function myClick(){
	
	let str = document.querySelector('.textbox').value;
	httpGet(`https://api.github.com/users/${str}`)
  	.then(
   	 JSON.parse,
    	function githubError(error) {
      	if (error.code == 404) {
      	  return {name: "NoGithub", avatar_url: '/article/promise/anon.png'};
    	  } else {
      	  throw error;
      	}
    	}
  	)

  	.then(function showAvatar(githubUser) {
		avatar.src = githubUser.avatar_url;
    	//let img = new Image();
    	//img.src = githubUser.avatar_url;
    	//img.className = "promise-avatar-example";
    	//document.body.appendChild(img);
    	//setTimeout(() => img.remove(), 3000);
  	})
		
  	.catch(function genericError(error) {
  	  alert(error); // Error: Not Found
  	});
}