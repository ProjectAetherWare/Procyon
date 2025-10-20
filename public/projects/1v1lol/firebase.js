function initializeFireBase(){
	// Your web app's Firebase configuration
	var firebaseConfig = {
	apiKey: "AIzaSyCx_W1jHDK97HEz2F9bpCs-oPgEYFO-WR0",
	authDomain: "a2v1lol.firebaseapp.com",
	databaseURL: "https://a2v1lol-default-rtdb.firebaseio.com/",
	projectId: "a2v1lol",
	storageBucket: "a2v1lol.firebasestorage.app",
	messagingSenderId: "119062803257",
	appId: "1:119062803257:web:6e9a3b278caf3432d4eee8",
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}

function initializeFireBaseDev(){
	// Your web app's Firebase configuration
	var firebaseConfig = {
	apiKey: "AIzaSyANZ0SDhqoc62msSooQFs3SEb4XbC7gvk4",
	authDomain: "dev.1v1.lol",
	databaseURL: "https://dev1v1.firebaseio.com",
	projectId: "dev1v1",
	storageBucket: "dev1v1.appspot.com",
	messagingSenderId: "90097883404",
	appId: "1:90097883404:android:0931a7bbf3e74f2b9a5129"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}