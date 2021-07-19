let tweets = [
	{
		id: 0,
		name: "John Wick",
		username: "@john1123wick",
		tweet: "Build your own Fake Twitter Post now! Check it out @simitator.com",
		postedOn: "Apr 6",
		liked: false,
		likeCount: 50,
		image: "https://placeimg.com/640/480/tech",
	},
	{
		id: 1,
		name: "Captain America",
		username: "@capAmerica",
		tweet: "Prank your friends or imitate celebrities. You can make fake twitter tweets in any creative way you like. Upload profile picture, select username, write message...",
		postedOn: "Apr 3",
		liked: false,
		likeCount: 100,
		image: "",
	},
	{
		id: 2,
		name: "Kanye West",
		username: "@kanyewest",
		tweet: "You can't look at a glass half full or empty if it's overflowing.",
		postedOn: "Apr 2",
		liked: false,
		likeCount: 300,
		image: ""
	}
]

let following = [
	{
		id: 0,
		name: "ABC Name",
		username: "@hello_abc"
	},
	{
		id: 1,
		name: "CDE Name",
		username: "@hello_cde"
	},
	{
		id: 2,
		name: "XYZ Name",
		username: "@hello_xyz"
	}
]

let toFollow = [
	{
		id: 3,
		name: "EFC Name",
		username: "@hello_efc"
	},
	{
		id: 4,
		name: "LMO Name",
		username: "@hello_lmo"
	},
	{
		id: 5,
		name: "PQR Name",
		username: "@hello_pqr"
	}
]

let imageSrc = "";
const preview = document.querySelector('img');
const imageContainer = document.querySelector("#imageContainer");

function previewFile() {
	const file = document.querySelector('input[type=file]').files[0];
	const tweet = document.querySelector("#tweet");
	const reader = new FileReader();

	reader.addEventListener("load", function () {
			preview.src = reader.result;
			imageSrc = reader.result;
	}, false);

	if (file) {
		reader.readAsDataURL(file);
		imageContainer.classList.toggle("hidden");
		tweet.classList.toggle("cursor-not-allowed");
		tweet.classList.remove("bg-blue-200");
		tweet.classList.add("bg-blue-500");
	}
}

const clearImage = () => {
	const preview = document.querySelector('img');
	preview.src = "";
	imageContainer.classList.toggle("hidden");
}

window.addEventListener('load', function() {
	displayTweets(tweets);
	displayFollowing(following);
	displayToFollow(toFollow);
});

let tweetInput = document.getElementById("tweetInput");
tweetInput.addEventListener("input", (e) => {
  inputOnchange(e.target.value);
});

const inputOnchange = (value) => {
	if(value.length > 0) {
		tweet.classList.toggle("cursor-not-allowed");
		tweet.classList.remove("bg-blue-200");
		tweet.classList.add("bg-blue-500");
	}
	else{
		tweet.classList.toggle("cursor-not-allowed");
		tweet.classList.remove("bg-blue-500");
		tweet.classList.add("bg-blue-200");
	}
}

document.addEventListener('click', function (event) {
	if(event.target.id !== "tweet") return;
	event.preventDefault();
	if(event.target.id == "tweet") {
		let inputValue = document.getElementById("tweetInput");
		let date = new Date();
		date = timeAgo(date);
		if(inputValue.value.length !== 0) {
			tweets.unshift(
				{
					id: tweets.length, 
					name: "Current User",
					username: "@currentUser",
					tweet: inputValue.value,
					postedOn: date,
					liked: false,
					likeCount: 0,
					image: imageSrc
				}
			);
		}
		displayTweets(tweets);
		inputValue.value="";
	}
});

const displayTweets = (tweets) => {
	let tweetList = document.getElementById("tweetList");
	tweetList.innerHTML = "";
	tweets.map(function (tweet) {
		let heartSvg = 
			`<div 
				id="tweet${tweet.id}" 
				class="flex space-x-2 items-center group cursor-pointer"  
				onclick="setLike(${tweet.id}, !${tweet.liked})"
			>
				<div class="p-2 rounded-full cursor-pointer group-hover:bg-red-100 group-hover:text-red-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
					</svg>
				</div>
				<p class="group-hover:text-red-500">${tweet.likeCount}<p>
			</div>`;
		let image = "";
		if(tweet.image !== "") {
			image = 
				`<div class="mt-4 h-56 w-full rounded">
						<img src="${tweet.image}" class="h-full w-full rounded object-cover">
				</div>`;
		}
		if(tweet.liked) {
			heartSvg = 
				`<div 
					id="tweet${tweet.id}" 
					class="flex space-x-2 items-center group cursor-pointer"  
					onclick="setLike(${tweet.id}, !${tweet.liked})">
					<div class="p-2 rounded-full cursor-pointer group-hover:bg-red-100 group-hover:text-red-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
						</svg> 
					</div>
					<p class="group-hover:text-red-500">${tweet.likeCount}<p>
				</div>`
		}
		let initials = getNameInitials(tweet.name);

		tweetList.innerHTML += 
			`<div class="flex space-x-6 p-4 border-b">
				<div 
					class="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 font-bold flex justify-center items-center text-gray-500"
				>
					${initials}
				</div>
				<div class="flex flex-col">
					<div class="flex items-center space-x-5">
						<p class="font-bold text-gray-700">${tweet.name}</p>
						<p class="text-gray-500">${tweet.username}</p>
						<div class="bg-gray-500 h-1 w-1 rounded-full"></div>
						<p class="text-gray-500">${tweet.postedOn}</p>
					</div>
					<p class="text-gray-500">${tweet.tweet}</p>
					${image}
					<div class="flex space-x-20 items-center mt-5 text-gray-500">
						<div class="p-2 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<div class="p-2 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
							</svg>
						</div>
						${heartSvg}
						<div class="p-2 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
							</svg>
						</div>
					</div>
				</div>
			</div>`
	});
}

const getNameInitials = (name) => {
	let arr = name.split(" ");
	let first = arr[0].slice(0,1);
	let second = arr[1] == undefined ? "" : arr[1].slice(0,1);
	return `${first}${second}`;

}

const displayFollowing = (following) => {
	let followingList = document.getElementById("followingList");
	followingList.innerHTML = "";
	following.map((user) => {
		let initials = getNameInitials(user.name);
		followingList.innerHTML += 
			`<div class="flex justify-between items-center p-4 border-t">
					<div class="flex space-x-4">
						<div 
							class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 font-bold flex justify-center items-center text-sm text-gray-500"
						>
							${initials}
						</div>
						<div>
							<p>${user.name}</p>
							<p class="text-gray-500">${user.username}</p>
						</div>
					</div>
					<button class="border border-blue-500 px-4 text-blue-500 rounded-full h-8 hover:bg-blue-100" onclick="unfollowUser(${user.id})">Unfollow</button>
				</div>`
	})
}

const displayToFollow = (toFollow) => {
	toFollowList.innerHTML = "";
	toFollow.map((user) => {
		let initials = getNameInitials(user.name);
		toFollowList.innerHTML += 
			`<div class="flex justify-between items-center p-4 border-t">
				<div class="flex space-x-4">
					<div 
						class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 font-bold flex justify-center items-center text-sm text-gray-500"
					>
						${initials}
					</div>
					<div>
						<p>${user.name}</p>
						<p class="text-gray-500">${user.username}</p>
					</div>
				</div>
				<button class="border border-blue-500 px-4 text-blue-500 rounded-full h-8 hover:bg-blue-100" onclick="followUser(${user.id})">Follow</button>
			</div>`
	})
}

const setLike = (id, liked) => {
	if(liked) {
		tweets[id].likeCount += 1;
		tweets[id].liked = true;
	}
	else {
		tweets[id].likeCount -= 1;
		tweets[id].liked = false;
	}
	displayTweets(tweets);
}

const unfollowUser = (id) => {
	let followUser = following.filter(user => user.id == id);
	toFollow.unshift(followUser[0]);
	following = following.filter(user => user.id !== id);
	displayFollowing(following);
	displayToFollow(toFollow);
}

const followUser = (id) => {
  let unfollowUser = toFollow.filter(user => user.id == id);
  following.unshift(unfollowUser[0]);
  toFollow = toFollow.filter(user => user.id !== id);
  displayToFollow(toFollow);
  displayFollowing(following);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${ day }. ${ month } at ${ hours }:${ minutes }`;
  }

  // 10. January 2017. at 10:20
  return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
}


// --- Main function
function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}
