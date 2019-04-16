firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
    if (user) {
        console.log("signed in" + user.uid);
    } else {
        console.log("signed out");
    }
    // Step 1:
    //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
    //  If there is a user, log out out user details for debugging purposes.
});
