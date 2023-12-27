// contentResolver.js

// Зарежда страницата с избрания урок и предава id-то му като аргумент.
function resolve(contentId) {
    let loc = "content/";
    // Страницата по съответния клиент
    if(contentId.startsWith('m')) loc += 'math.html';
    else if(contentId.startsWith('l')) loc += 'literature.html';
    else if(contentId.startsWith('b')) loc += 'bulgarian.html';
    // Добавяне на аргумент, премахване на буквата на дадения предмет.
    loc += "?id=" + contentId.slice(1);
    // Отваряне
    window.location.href = loc;
    // Готови сме!
}