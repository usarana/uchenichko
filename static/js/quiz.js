// quiz.js

var answers = []; // Текущите отговори на потребителя
// Верните отговори. Двумерен масив за всеки урок и всяка задача
const answersMath = [
    ['b', 'c', 'd', 'd', 'c'], // Урок 1
    ['b', 'a', 'a', 'c', 'b'], // Урок 2
    ['d', 'c', 'a', 'c', 'd'], // Урок 3
    ['c', 'd', 'd', 'd', 'c'], // Урок 4
    ['b', 'd', 'a', 'a', 'c'], // Урок 5
    ['a', 'd', 'b', 'c', 'b'], // Урок 6
    ['d', 'a', 'd', 'd', 'a'], // Урок 7
    ['c', 'd', 'a', 'c', 'b'], // Урок 8
    ['c', 'a', 'b', 'b', 'a'], // Урок 9
    ['d', 'd', 'c', 'd', 'b'], // Урок 10
    ['a', 'c', 'c', 'c', 'b'], // Урок 11
    ['a', 'a', 'd', 'd', 'a'], // Урок 12
    ['b', 'b', 'd', 'c', 'b']  // Урок 13
]
const answersBulg = [
    ['b', 'c', 'c', 'c', 'a'], // Урок 1
    ['', '', '', '', ''],      // Урок 2
    ['d', 'd', 'a', 'c', 'd'], // Урок 3
    ['c', 'b', 'd', 'a', 'b'], // Урок 4
    ['b', 'b', 'a', 'd', 'a'], // Урок 5
    ['c', 'b', 'a', 'b', 'b'], // Урок 6
    ['c', 'b', 'a', 'c', 'a'], // Урок 7
    ['d', 'c', 'c', 'd', 'b'], // Урок 8
    ['d', 'a', 'a', 'c', 'a']  // Урок 9
]
// Обяснения на задачите. Двумерен масив
const explanationsMath = 
[
    ['Променяме знака и става $9$', 'Променяме знака и става $-18$', '$21:7+30.3 = 3+90 = +93$', 'Тук всички числа са отрицателни', '$(x-23):8=|-9|$<br>$x-23=8.|-9|$<br>$x-23=72$<br>$x=95$'],
    ['$-8+8$, различни знаци, следователно $0$', '$-9-3=-12$', '$4-8=-4$', '$-8+2-4=-6-4=-10$', '$13{,}2-18{,}4-9=-5{,}2-9=-14{,}2$'],
    ['- и - прави +', '+ и - прави -', '- и - прави +, $7+10=17$', '$7.1{,}8=12{,}6$', '$1288:23=56$'],
    ['$S_{фиг}=S_{усп}+S_{\\Delta}=(4.2)+(\\frac{4.3}{2})=8+6=14$', '$S_{фиг}=AB^2=6^2=36$', '$S_{фиг}=\\frac{AB.BC}{2}=\\frac{7.4}{2}=14$', '$C(4; 0), D(0; 3).$<br>$S=\\frac{4.3}{2} + \\frac{4.3}{2} = 12+12 = 24$', '$B(4; -3), C(4; 3), D(-4; 3).$<br>$S=8.6=48$'],
    ['Използваме правилото. $7^{15-13}=7^2=49$', 'Използваме правилото. $2^{2+3}=2^5=32$', 'Използваме правилото. $2^{7+3}:2^{10}=2^{10}:2^{10}=1$', 'Използваме правилото. $3^{8-3}=3^5=243$', 'Използваме правилото. $a^{10}.a^{21}=a^{10+21}=a^{31}$'],
    ['Използваме правилото $(a.b)^n=a^n.b^n$', 'Използваме правилото $(a:b)^n=a^n:b^n$', 'Използваме правилото $(a^n)^m=a^{n.m}$', '$3^5.c^5=(3c)^5$', '$(7^8)^5=7^{8.5}=7^{40}$'],
    ['Използваме правилото $a^0=1$', 'Използваме правилото $a^{-n}=\\frac{1}{a^{n}}$', 'Използваме правилото $a^{-n}=\\frac{1}{a^{n}}$', 'Използваме правилото $a^{-n}=\\frac{1}{a^{n}}$', 'Използваме правилото $a^{-n}=\\frac{1}{a^{n}}$'],
    ['$10000=10^4$', '$5.10^3=5.1000=5000$', '$37000=3{,}7.10^4$', '$90000=9.10^4$', '$7.10^5=7.100000=700000$'],
    ['$3^2+4^2=x^2, x = 5$', '$5^2+12^2=x^2, x = 13$', '$7^2+24^2=x^2, x = 25$', '$8^2+15^2=x^2, x = 17$', '$9^2+40^2=x^2, x = 41$'],
    ['$x=-{\\frac{b}{a}}=-\\frac{-20}{4}=-(-5)=5$', '$x=-{\\frac{b}{a}}=-\\frac{15}{-3}=-(-5)=5$', '$x=-{\\frac{b}{a}}=-\\frac{-2}{\\frac{1}{3}}=-(-6)=6$', '', ''],
    ['$4x-5=-17$<br>$4x=-12$<br>$x=-3$', '$5x+9=2x-6$<br>$5x+15=2x$<br>$3x+15=0$<br>$3x=-15$<br>$x=-5$', '$5x-10-5=3x+9-2x$<br>$5x-15=x+9$<br>$5x=x+24$<br>$4x=24$<br>$x=6$', '', ''],
    ['Количество ($x$) - 1 kg, цена ($y$) - 3,00 лв.<br>$y = kx$<br>$3 = 1k$<br>$k=3$<br>$y=3x$', 'Количество ($x$) - 6 kg, цена ($y$) - 7,20 лв.<br>$y=kx$<br>$7{,}20=6k$<br>$k=1{,}20$<br>$y=kx=1{,}20.1=1{,}20$', '$P_{\\Delta}=a+a+a=3a$', '', ''],
    ['$15x=3.5$<br>$15x=15$<br>$x=1$', '$7{,}3.0,4=2x$<br>$2{,}92=2x$<br>$x=1{,}46$', '$a=3b$<br>$b:a=b:(3b)=1:3$', '', '']
]
const explanationsBulg = 
[
    ['Другите изрази се отнасят за български език, математика, история и биология', 'Казано в урока', 'Казано в урока', 'Казано в урока', 'Казано в урока'],
    ['', '', '', '', ''],
    ['преспи, цели, цветове', 'стоели, спали, големи.', 'живели', 'добър - добра', 'мълча - млъкна'],
    ['тези - показателно местоимение, близки лица, мн.ч.', 'такива - показателно местоимение, признаци, мн.ч.', 'толкова - показателно местоимение, количество', 'Казано в урока', 'Казано в урока'],
    ['колко - въпросително местоимение, количество', 'какви - въпросително местоимение, признаци, мн.ч.', '"Кой" се използва само когато е подлог. "Кого" се използва в другите случаи.', 'Казано в урока', 'Казано в урока'],
    ['никой, никакъв, ничий, николко, ...', 'Таблицата от урока', 'никаква - отрицателно местоимение за признаци, ж.р.', 'Казано в урока', 'Казано в урока'],
    ['всички - за лица, мн.ч.', 'всякой - лица, всякакво - признаци, всичко - предмети', 'всякакъв - признаци, мъжки род', 'Казано в урока', 'Казано в урока'],
    ['някой - лица, мъжки род', 'някой - лица, някакъв - признаци, нещо - предмети', 'нечий - притежание, мъжки род', 'Казано в урока', 'Казано в урока'],
    ['който, какъвто, чийто, колкото, ...', 'чийто - принадлежност, колкото - количество, който - лица', 'колкото - количество', 'Казано в урока', 'Казано в урока']
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
    let currAns = answers[parseInt(numsCallerId[1])-1];
    // Ако иамме отговор на даден въпрос
    if(typeof currAns !== 'undefined' && answers[parseInt(numsCallerId[1])-1] != "") {
        document.getElementById(callerId.slice(0, -1)+answers[parseInt(numsCallerId[1])-1]).style.backgroundColor = "#BCD3FF";
    }
    document.getElementById(callerId).style.backgroundColor = "#7996cb";
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
    let total = 0;
    for(total++; document.getElementById(callerId.slice(0, -1) + 'q' + total.toString() + 'a') !== null; total++);
    total--;
    // console.log(total);
    let count = 0;
    for(let i = 0; i < total; i++) if(answers[i]==corr[i]) count++; // Броим верните отговори
    for(let i = 1; i <= total; i++) {
        let lesId = callerId.slice(0, -1) + 'q' + i.toString(); // Нещо от сорта на m1q1
        // Бутоните да не се натискат вече
        document.getElementById(lesId+'a').disabled = true;
        document.getElementById(lesId+'b').disabled = true;
        document.getElementById(lesId+'c').disabled = true;
        document.getElementById(lesId+'d').disabled = true;

        document.getElementById(lesId+'a').style.cursor = "default";
        document.getElementById(lesId+'b').style.cursor = "default";
        document.getElementById(lesId+'c').style.cursor = "default";
        document.getElementById(lesId+'d').style.cursor = "default";
        
        // Ако не е подаден отговор на въпроса, маркираме правилния и продължаваме
        if(typeof answers[i-1] === 'undefined') {document.getElementById(lesId+corr[i-1]).style.backgroundColor = "#A1FF79"; continue;}

        // Маркираме избрания и правилния
        document.getElementById(lesId+answers[i-1]).style.backgroundColor = "#F47369";
        document.getElementById(lesId+corr[i-1]).style.backgroundColor = "#A1FF79";
    }

    let grade = 2+4*(count/total); // Оценката, пресметната по често срещаната формула.
    let gradeTParent = document.getElementById(callerId.slice(0, -1) + 't'); // Избираме елемента, в който ще слагаме текста за оценката
    let gradeText = document.createElement('h2'); // Създаваме елемента за текста
    gradeTParent.appendChild(gradeText); // Добавяме го като поделемент
    grade = (Math.round(grade * 100) / 100).toFixed(2); // Закръгляме оценката до 2 точки след десетичната запетая
    // Добавяме текст, съответващ на оценката
    if(grade > 5) gradeText.textContent = "Отлично! ";
    else if (grade > 4) gradeText.textContent = "Браво! ";
    else gradeText.textContent = "Можеш и по-добре! ";
    gradeText.textContent += "Оценка: " + grade.toString() + " (" + count.toString() + "/"+total.toString()+")"; // Добавяме оценката
    let explanations = document.createElement('p'); // Обяснения на задачите
    let expArr;
    if(callerId.startsWith('m')) expArr = explanationsMath[parseInt(numsCallerId[0])-1]; // Отново избираме правилните
    else expArr = explanationsBulg[parseInt(numsCallerId[0])-1];
    explanations.setAttribute('style', 'white-space: pre;'); // Това е нужно, за да работи правилно \r\n в полето textContent
    explanations.innerHTML = "Обяснения на задачите:\r\n<br>";
    for(let i = 0; i < total; i++) {
        // Добавяме обяснението само ако отговорът е грешен на задачата
        if(answers[i]!=corr[i]) explanations.innerHTML += "<strong>" + (i+1).toString() + "</strong>. " + expArr[i] + "\r\n<br>";
    }
    if(count < total) gradeTParent.appendChild(explanations); // Ако не всички отговори са верни, добавяме обясненията като поделемент
    try { // Може и да няма LaTeX елементи, в такъв случай ще даде грешка
        renderMathInElement( // Отново изобразяване на LaTeX елементи в документа, защото може да има такива в самите обяснения
            document.body,
            {
                strict: false,
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