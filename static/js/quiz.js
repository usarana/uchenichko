// quiz.js

let answers = ["", "", ""]
const answersMath = [['b', 'c', 'd'], ['b', 'b', 'a'], ['d', 'c', 'a'], ['b', 'd', 'a'], ['a', 'd', 'b'], ['d', 'a', 'd'], ['c', 'd', 'a'], ['c', 'a', 'b']]

function quiz(callerId) {
    if(answers[parseInt(callerId[3])-1] != "") {
        document.getElementById(callerId.slice(0, -1)+answers[parseInt(callerId[3])-1]).style.backgroundColor = "#456abb";
    }
    document.getElementById(callerId).style.backgroundColor = "#324d88";
    answers[parseInt(callerId[3])-1] = callerId[4];
    console.log(parseInt(callerId[3])-1);
    console.log(callerId[4]);
}

function quizDone(callerId) {
    let corr = answersMath[parseInt(callerId[1])-1];
    let count = 0;
    for(let i = 0; i < 3; i++) if(answers[i]==corr[i]) count++;
    for(let i = 1; i <= 3; i++) {
        let lesId = callerId.slice(0, -1) + 'q' + i.toString();
        document.getElementById(lesId+'a').disabled = true;
        document.getElementById(lesId+'b').disabled = true;
        document.getElementById(lesId+'c').disabled = true;
        document.getElementById(lesId+'d').disabled = true;

        document.getElementById(lesId+'a').style.cursor = "default";
        document.getElementById(lesId+'b').style.cursor = "default";
        document.getElementById(lesId+'c').style.cursor = "default";
        document.getElementById(lesId+'d').style.cursor = "default";

        if(answers[i-1]=="") {document.getElementById(lesId+corr[i-1]).style.backgroundColor = "green"; continue;}

        document.getElementById(lesId+answers[i-1]).style.backgroundColor = "red";
        document.getElementById(lesId+corr[i-1]).style.backgroundColor = "green";
    }
    let grade = 2+4*(count/3);
    let gradeText = document.getElementById(callerId.slice(0, -1) + 't').children[0];
    grade = (Math.round(grade * 100) / 100).toFixed(2);
    if(grade > 5) gradeText.textContent = "Отлично! ";
    else if (grade > 4) gradeText.textContent = "Браво! ";
    else gradeText.textContent = "Можеш и по добре! ";
    gradeText.textContent += "Оценка: " + grade.toString();
    gradeText.style.visibility = "visible";
}