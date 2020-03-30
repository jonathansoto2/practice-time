var ACCESS_TOKEN = "31465581.2075d8b.17907f14606b43ad93aa5c0cfc320513";


//initializing the requests 
var first_request = new XMLHttpRequest();
var second_request = new XMLHttpRequest();


//Opening the first request containing the 'Profile' information
first_request.open("GET", "https://api.instagram.com/v1/users/self/?access_token=31465581.2075d8b.17907f14606b43ad93aa5c0cfc320513", true);
//Opening the second request containing the 'Last Post' information
second_request.open("GET","https://api.instagram.com/v1/users/self/media/recent/?access_token=31465581.2075d8b.17907f14606b43ad93aa5c0cfc320513", true);


var main = document.createElement("div");
main.setAttribute("class", "main-content");
document.body.appendChild(main);      // Appends the newly created div element to the DOM

first_request.onload = function(){
    var profile_data = JSON.parse(this.response);

    console.log(profile_data);
   
    
    var follower_count = document.createElement("H2");
    follower_count.setAttribute("class", "followers");

    follower_count.innerText = "@" + profile_data.data.username + " " + "has " + profile_data.data.counts.followed_by + " " + "followers";
    main.appendChild(follower_count);


    

};

second_request.onload = function(){
    var post_data = JSON.parse(this.response);
    console.log(post_data);
    console.log(post_data.data[0]);
    console.log(post_data.data[0].images.standard_resolution.url);

    //creates last post img and appends it to the DOM 
    var last_post_photo = document.createElement("img");
    //the img that post_photo contains
    last_post_photo.setAttribute("src", post_data.data[0].images.standard_resolution.url);
    //set attribute of a class 'post-photo'
    last_post_photo.setAttribute("class", "post-photo" );
    main.appendChild(last_post_photo);



    var response_time = parseInt(post_data.data[0].created_time * 1000, 10);
    var date = new Date(response_time);
    var time = document.createElement("P");
    time.innerText = "This post was created on " + date;
    main.appendChild(time);
    console.log(date);

    var last_post_likes = document.createElement("P");
    //set class attribute
    last_post_likes.innerText = "This post is his latest, and has " + post_data.data[0].likes.count +" likes.";
    main.appendChild(last_post_likes);

    var full_link = document.createElement("A");
    //set attribute class
    full_link.setAttribute("href", post_data.data[0].link);
    full_link.innerText = "View the full post at: " + post_data.data[0].link;
    main.appendChild(full_link);


};


first_request.send();
second_request.send();






