var butt = document.querySelector("#button1");
var finished = false;
var qno = 4;
var exist;
var mydiv = document.querySelector(".window-content ");
var atag = document.createElement("a");
var password = "hi";
atag.setAttribute("href", "./time_q.html");
atag.setAttribute("class", "line");
atag.setAttribute("style", "margin-right: 100px;");

atag.innerHTML = "proceed to question 2..";
butt.onclick = function() {
    var submission = document.querySelector("#response").value.toLowerCase();

    console.log("hi");
    ansDb = firebase.database().ref("answers");
    var correctAns = "hello";
    ansDb.on("value", function(snapshot) {
        correctAns = snapshot.val()[qno];
        // console.log(correctAns);
        var decrypted = CryptoJS.AES.decrypt(correctAns, password);
        // console.log();
        finished = true;
        if (finished) {
            if (user) {
                console.log(
                    user.displayName +
                        " Abhi bhi trying, didnt you hear what she said, tujhse na hoga"
                );
                // var date = newdate();
                // console.log("ubmission" + submission);
                // console.log("correct ans =" + correctAns);
                if (submission === decrypted.toString(CryptoJS.enc.Utf8)) {
                    alert("Correct");

                    var data = {
                        time: new Date().getTime(),
                        status: true,
                        name: user.displayName,
                        questionNumber: qno
                    };
                    console.log(data);
                    var ok = 0;
                    var questions = [];
                    var usr;

                    db = firebase.database().ref("Day2/" + user.uid);
                    var flag = 0;

                    db.orderByChild("uid")
                        .equalTo(user.uid)
                        .once("value")
                        .then(async snapshot => {
                            await snapshot.forEach(element => {
                                usr = element.val();
                                console.log(usr);
                                if (usr.uid === user.uid) {
                                    questions.push(usr.questionNumber);
                                    console.log(usr.questionNumber);
                                    if (usr.questionNumber === qno) {
                                        console.log("caught");
                                        exist = true;
                                        flag = 1;
                                    } else {
                                        if (flag !== 1) {
                                            console.log("here2");
                                            exist = false;
                                        }
                                    }
                                }

                                // console.log(element.val().uid);
                                // console.log(element.val().questionNumber);
                                // console.log(element.val().status);
                            });
                            console.log(exist);
                            if (exist === true) {
                                alert("sorry no resubmissions");
                                mydiv.appendChild(atag);
                                butt.setAttribute("style", "display: none");
                            } else if (exist === false) {
                                db.set(data);
                                console.log("here");
                                mydiv.appendChild(atag);
                                butt.setAttribute("style", "display: none");
                            }
                            if (questions.length === 0) {
                                console.log("lol");
                                db.set(data);
                                mydiv.appendChild(atag);
                                butt.setAttribute("style", "display: none");
                            }
                        });
                } else {
                    alert("Wrong answer");
                }
            } else {
                alert("Sign in");
            }
        }
    });
};
