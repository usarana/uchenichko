// quiz.js

let answers = ["", "", ""] // Текущите отговори на потребителя
// Верните отговори. Двумерен масив за всеки урок и всяка задача
const answersMath = [
    ['b', 'c', 'd'], 
    ['b', 'b', 'a'], 
    ['d', 'c', 'a'], 
    ['c', 'd', 'd'], 
    ['b', 'd', 'a'], 
    ['a', 'd', 'b'], 
    ['d', 'a', 'd'], 
    ['c', 'd', 'a'], 
    ['c', 'a', 'b'], 
    ['d', 'd', 'c'],
    ['a', 'c', 'c']
]
const answersBulg = [
    ['b', 'c', 'c'], 
    ['', '', ''], 
    ['d', 'd', 'a'], 
    ['c', 'b', 'd'], 
    ['b', 'b', 'a'], 
    ['c', 'b', 'a']
]
// Обяснения на задачите. Двумерен масив
const explanationsMath = 
[
    ['Положителната версия на $-9$ е $9$', 'Променяме знака. $-18$', '$21:7+30.3 = 3+90 = +93$'],
    ['$-8+8$, различни знаци, следователно $0$', '$-9-3=-12$', '$4-8=-4$'],
    ['- и - прави +', '+ и - прави -', '- и - прави +, $7+10=17$'],
    ['$S_{фиг}=S_{усп}+S_{тр}=(8.2)+(\\frac{4.3}{2})=8+6=14$', '$S_{фиг}=AB^2=6^2=36$', '$S_{фиг}=\\frac{AB.BC}{2}=\\frac{7.4}{2}=14$'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['Използваме правилото', 'Използваме правилото', 'Използваме правилото'],
    ['$10$ и $4$ нули = $10^4$', '$5$ и $3$ нули = $5000$', 'Приемаме седмицата като една от нулите. $3,7$ и $4$ нули, порядъкът е $3,7$'],
    ['$3^2+4^2=x^2, x = 5$', '$5^2+12^2=x^2, x = 13$', '$7^2+24^2=x^2, x = 25$'],
    ['$x=-{\\frac{b}{a}}=-\\frac{-20}{4}=-(-5)=5$', '$x=-{\\frac{b}{a}}=-\\frac{15}{-3}=-(-5)=5$', '$x=-{\\frac{b}{a}}=-\\frac{-2}{\\frac{1}{3}}=-(-6)=5$'],
    ['$4x-5=-17$<br>$4x=-12$<br>$x=-3$', '$5x+9=2x-6$<br>$5x+15=2x$<br>$3x+15=0$<br>$3x=-15$<br>$x=-5$', '$5x-10-5=3x+9-2x$<br>$5x-15=x+9$<br>$5x=x+24$<br>$4x=24$<br>$x=6$']
]
const explanationsBulg = 
[
    ['Другите изрази се отнасят за български език, математика, история и биология', 'Казано в урока', 'Казано в урока'],
    ['', '', ''],
    ['преспи, цели, цветове', 'стоели, спали, големи.', 'живели'],
    ['тези - показателно местоимение, близки лица, мн.ч.', 'такива - показателно местоимение, признаци, мн.ч.', 'толкова - показателно местоимение, количество'],
    ['колко - въпросително местоимение, количество', 'какви - въпросително местоимение, признаци, мн.ч.', '"Кой" се използва само когато е подлог. "Кого" се използва в другите случаи.'],
    ['никой, никакъв, ничий, николко, ...', 'Таблицата от урока', 'никаква - отрицателно местоимение за признаци, ж.р.'],
]
// Помощна функция; намира числа в низ
function findNums(str) {
    const regex = /\d+/g;
    let m;
    let nums = [];
    while((m=regex.exec(str))!=null) {
        nums.push(m[0]);
    }
    return nums;
}
// Избран отговор от потребителя
function quiz(callerId) {
    // callerId е от сорта на m11q2a
    let numsCallerId = findNums(callerId);
    console.log(numsCallerId)
    if(answers[parseInt(numsCallerId[1])-1] != "") {
        document.getElementById(callerId.slice(0, -1)+answers[parseInt(numsCallerId[1])-1]).style.backgroundColor = "#BCD3FF";
    }
    document.getElementById(callerId).style.backgroundColor = "#a2b6db";
    answers[parseInt(numsCallerId[1])-1] = callerId[callerId.length-1];
}
// Предаване на тест
function quizDone(callerId) {
    document.getElementById(callerId).disabled = true; // Бутон "готово" не се натиска вече
    document.getElementById(callerId).style.cursor = "default";
    let corr;
    let numsCallerId = findNums(callerId);
    if(callerId.startsWith('m')) corr = answersMath[parseInt(numsCallerId[0])-1]; // Ако тестът е по математика, избираме отговорите за математика
    else corr = answersBulg[parseInt(numsCallerId[0])-1]; // Иначе избираме отговорите за български
    let count = 0;
    for(let i = 0; i < 3; i++) if(answers[i]==corr[i]) count++; // Броим верните отговори
    for(let i = 1; i <= 3; i++) {
        let lesId = callerId.slice(0, -1) + 'q' + i.toString(); // Нещо от сорта на m1q1
        // Бутоните не се натискат вече
        document.getElementById(lesId+'a').disabled = true;
        document.getElementById(lesId+'b').disabled = true;
        document.getElementById(lesId+'c').disabled = true;
        document.getElementById(lesId+'d').disabled = true;

        document.getElementById(lesId+'a').style.cursor = "default";
        document.getElementById(lesId+'b').style.cursor = "default";
        document.getElementById(lesId+'c').style.cursor = "default";
        document.getElementById(lesId+'d').style.cursor = "default";

        // Ако не е подаден отговор на въпроса, маркираме правилния и продължаваме
        if(answers[i-1]=="") {document.getElementById(lesId+corr[i-1]).style.backgroundColor = "#A1FF79"; continue;}

        // Маркираме избрания и правилния
        document.getElementById(lesId+answers[i-1]).style.backgroundColor = "#F47369";
        document.getElementById(lesId+corr[i-1]).style.backgroundColor = "#A1FF79";
    }

    let grade = 2+4*(count/3); // Оценката, пресметната по често срещаната формула.
    let gradeTParent = document.getElementById(callerId.slice(0, -1) + 't'); // Избираме елемента, в който ще слагаме текста за оценката
    let gradeText = document.createElement('h2'); // Създаваме елемента за текста
    gradeTParent.appendChild(gradeText); // Добавяме го като поделемент
    grade = (Math.round(grade * 100) / 100).toFixed(2); // Закръгляме оценката до 2 точки след десетичната запетая
    // Добавяме текст, съответващ на оценката
    if(grade > 5) gradeText.textContent = "Отлично! ";
    else if (grade > 4) gradeText.textContent = "Браво! ";
    else gradeText.textContent = "Можеш и по-добре! ";
    gradeText.textContent += "Оценка: " + grade.toString() + " (" + count.toString() + "/3)"; // Добавяме оценката
    let explanations = document.createElement('p'); // Обяснения на задачите
    let expArr;
    if(callerId.startsWith('m')) expArr = explanationsMath[parseInt(numsCallerId[0])-1]; // Отново избираме правилните
    else expArr = explanationsBulg[parseInt(numsCallerId[0])-1];
    explanations.setAttribute('style', 'white-space: pre;'); // Това е нужно, за да работи правилно \r\n в полето textContent
    explanations.innerHTML = "Обяснения на задачите:\r\n<br>";
    for(let i = 0; i < 3; i++) {
        // Добавяме обяснението само ако отговорът е грешен на задачата
        if(answers[i]!=corr[i]) explanations.innerHTML += (i+1).toString() + ". " + expArr[i] + "\r\n<br>";
    }
    if(count < 3) gradeTParent.appendChild(explanations); // Ако не всички отговори са верни, добавяме обясненията като поделемент
    try { // Може и да няма LaTeX елементи, в такъв случай ще даде грешка
        renderMathInElement( // Отново изобразяване на LaTeX елементи в документа, защото може да има такива в самите обяснения
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
    catch {}
    // Готови сме!
}