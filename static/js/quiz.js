// quiz.js

let answers = ["", "", ""]
const answersMath = [['b', 'c', 'd'], ['b', 'b', 'a'], ['d', 'c', 'a'], ['b', 'd', 'a'], ['a', 'd', 'b'], ['d', 'a', 'd'], ['c', 'd', 'a'], ['c', 'a', 'b']]
const answersBulg = [['b', 'c', 'a'], ['', '', ''], ['d', 'd', 'a'], ['c', 'b', 'd'], ['b', 'b', 'a'], ['c', 'c', 'a']]
const explanationsMath = 
[
    ['Положителната версия на -9 е 9', 'Променяме знака. -18', '$21:7+30.3 = 3+90 = +93$'],
    ['-8+8, различни знаци, следователно 0', '-9-3=-12', '4-8=-4'],
    ['- и - прави +', '+ и - прави -', '- и - прави +, 7+10=17'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['10 и 4 нули = $10^4$', '5 и 3 нули = 5000', 'Приемаме седмицата като една от нулите. 3,7 и 4 нули, порядъкът е 3,7'],
    ['$3^2+4^2=x^2, x = 5$', '$5^2+12^2=x^2, x = 13$', '$7^2+24^2=x^2, x = 25$']
]
const explanationsBulg = 
[
    ['Другите изрази се отнасят за българския език, математика, история и биология', 'Казано в урока', 'Казано в урока'],
    ['', '', ''],
    ['преспи, цели, цветове', 'стоели, спали, големи.', 'живели'],
    ['тези - показателно местоимение, близки лица, мн.ч.', 'такива - показателно местоимение, признаци, мн.ч.', 'толкова - показателно местоимение, количество'],
    ['колко - въпросително местоимение, количество', 'какви - въпросително местоимение, признаци, мн.ч.', '"Кой" се използва само когато е подлог. "Кого" се използва в другите случаи.'],
    ['никой, никакъв, ничий, николко, ...', 'Таблицата от урока', 'никаква - отрицателно местоимение за признаци, ж.р.'],
]
function quiz(callerId) {
    if(answers[parseInt(callerId[3])-1] != "") {
        document.getElementById(callerId.slice(0, -1)+answers[parseInt(callerId[3])-1]).style.backgroundColor = "#456abb";
    }
    document.getElementById(callerId).style.backgroundColor = "#324d88";
    answers[parseInt(callerId[3])-1] = callerId[4];
}

function quizDone(callerId) {
    let corr;
    if(callerId.startsWith('m')) corr = answersMath[parseInt(callerId[1])-1];
    else corr = answersBulg[parseInt(callerId[1])-1];
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
    let gradeTParent = document.getElementById(callerId.slice(0, -1) + 't');
    let gradeText = document.createElement('h2');
    gradeTParent.appendChild(gradeText);
    grade = (Math.round(grade * 100) / 100).toFixed(2);
    if(grade > 5) gradeText.textContent = "Отлично! ";
    else if (grade > 4) gradeText.textContent = "Браво! ";
    else gradeText.textContent = "Можеш и по добре! ";
    gradeText.textContent += "Оценка: " + grade.toString() + " (" + count.toString() + "/3)";
    let explanations = document.createElement('p');
    let expArr;
    if(callerId.startsWith('m')) expArr = explanationsMath[parseInt(callerId[1])-1];
    else expArr = explanationsBulg[parseInt(callerId[1])-1];
    explanations.setAttribute('style', 'white-space: pre;');
    explanations.textContent = "Обяснения на задачите:\r\n";
    for(let i = 0; i < 3; i++) {
        if(answers[i]!=corr[i]) explanations.textContent += (i+1).toString() + ". " + expArr[i] + "\r\n";
    }
    if(count < 3) gradeTParent.appendChild(explanations);
    renderMathInElement(
        document.body,
        {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ]
        }
    );
}