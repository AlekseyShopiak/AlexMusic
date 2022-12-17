'use strict';

import {httpGet} from "./modules/httpGet.js";

document.querySelector('button').onclick = searchClick;

function searchClick(){
	let str = document.querySelector('.textbox').value;
	httpGet(`https://api.github.com/users/${str}`)
  	.then(
   	 JSON.parse,
    	function githubError(error) {
      	if (error.code == 404) {
      	  return {name: "Not exist", avatar_url: './images/error.png'};
    	  } else {
      	  throw error;
      	}
    	}
  	)
  	.then(function showAvatar(githubUser) {
			document.getElementById('avatar').src = githubUser.avatar_url;
  	})
  	.catch(function genericError(error) {
  	  alert(error); // Error: Not Found
  	});
}

