//генерация игр. поля
var field = document.getElementById('field');
var table = '';
const minesN = 12;
for (let i = 0; i < 12; i++) {
    table += '<tr>';
    for (let j = 0; j < 12; j++)
        table += '<td id="x' + j + 'y' + i + '" class="closed"></td>';
    table += '</tr>';

}
var mines = new Set();
var nearMine = {};

function rand(max) {
    return Math.floor(Math.random() * max);
}

var opened = 0;
function opencell(cell) {
    cell.classList.remove('closed');
    cell.style.pointerEvents = 'none';
    opened++;
}

function cellsAround(x, y, step) {
    x = parseInt(x); y = parseInt(y); step = parseInt(step);
    return [('x' + (x + step) + 'y' + (y)),
        ('x' + (x + step) + 'y' + (y + step)),
        ('x' + (x + step) + 'y' + (y - step)),
        ('x' + (x - step) + 'y' + (y)),
        ('x' + (x - step) + 'y' + (y + step)),
        ('x' + (x - step) + 'y' + (y - step)),
        ('x' + (x) + 'y' + (y + step)),
        ('x' + (x) + 'y' + (y - step))];
}

function addNearMine(el, ar) {
    if (!document.getElementById(el))
        return;
    if (el in ar)
        ar[el] += 1;
    else
        ar[el] = 1;
}

function parse(id) {
    return id.slice(1).split('y');
}

function spawn(first) {
    let firstx = parse(first)[0], firsty = parse(first)[1];
    while (mines.size < minesN) {
        let x = rand(minesN);
        let y = rand(minesN);
        if ((Math.sqrt((firstx - x) ** 2 + (firsty - y) ** 2)) >= 2 && !mines.has('x' + x + 'y' + y)) {
            cellsAround(x, y, 1).forEach((el) => addNearMine(el, nearMine));
            mines.add('x' + x + 'y' + y);
            document.getElementById('x' + x + 'y' + y).classList.add('mine');
        }
    }

    for (let mine of mines) {
        if (mine in nearMine)
            delete nearMine[mine];
    }
    for (let cell in nearMine) {
        document.getElementById(cell).innerHTML = nearMine[cell];
        document.getElementById(cell).classList.add('nearMine');
    }
}

function toleft(x, y) {
    let prevcell = 'x' + x + 'y' + y;
    x = parseInt(x) - 1; y = parseInt(y);
    let cell = 'x' + x + 'y' + y;
    if (prevcell in nearMine && cell in nearMine)
        return;
    if (!document.getElementById(cell) || !document.getElementById(cell).classList.contains('closed')
        || document.getElementById(cell).classList.contains('mine'))
        return;
    opencell(document.getElementById(cell));
    if (cell in nearMine)
        return;
    let angle1 = document.getElementById('x' + (x - 1) + 'y' + (y + 1)),
        angle2 = document.getElementById('x' + (x - 1) + 'y' + (y - 1));
    //console.log(document.getElementById(cell),
    //    angle1, document.getElementById('x' + (x - 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y + 1)),
    //    angle2, document.getElementById('x' + (x - 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y - 1)));
    if (angle1 != null && angle1.classList.contains('nearMine') && angle1.classList.contains('closed'))
        if ('x' + (x - 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y + 1) in nearMine)
            opencell(angle1);
    if (angle2 != null && angle2.classList.contains('nearMine') && angle2.classList.contains('closed'))
        if ('x' + (x - 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y - 1) in nearMine)
            opencell(angle2);
    toleft(x, y);
    totop(x, y);
    tobottom(x, y);
}
function toright(x, y) {
    let prevcell = 'x' + x + 'y' + y;
    x = parseInt(x) + 1; y = parseInt(y);
    let cell = 'x' + x + 'y' + y;
    if (prevcell in nearMine && cell in nearMine)
        return;
    if (!document.getElementById(cell) || !document.getElementById(cell).classList.contains('closed')
        || document.getElementById(cell).classList.contains('mine'))
        return;
    opencell(document.getElementById(cell));
    if (cell in nearMine)
        return;
    let angle1 = document.getElementById('x' + (x + 1) + 'y' + (y + 1)),
        angle2 = document.getElementById('x' + (x + 1) + 'y' + (y - 1));
    //console.log(document.getElementById(cell),
    //    angle1, document.getElementById('x' + (x + 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y + 1)),
    //    angle2, document.getElementById('x' + (x + 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y - 1)));
    if (angle1 != null && angle1.classList.contains('nearMine') && angle1.classList.contains('closed'))
        if ('x' + (x + 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y + 1) in nearMine)
            opencell(angle1);
    if (angle2 != null && angle2.classList.contains('nearMine') && angle2.classList.contains('closed'))
        if ('x' + (x + 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y - 1) in nearMine)
            opencell(angle2);
    toright(x, y);
    totop(x, y);
    tobottom(x, y);
}
function totop(x, y) {
    let prevcell = 'x' + x + 'y' + y;
    x = parseInt(x); y = parseInt(y) + 1;
    let cell = 'x' + x + 'y' + y;
    if (prevcell in nearMine && cell in nearMine)
        return;
    if (!document.getElementById(cell) || !document.getElementById(cell).classList.contains('closed')
        || document.getElementById(cell).classList.contains('mine'))
        return;
    opencell(document.getElementById(cell));
    if (cell in nearMine)
        return;
    let angle1 = document.getElementById('x' + (x - 1) + 'y' + (y + 1)),
        angle2 = document.getElementById('x' + (x + 1) + 'y' + (y + 1));
    //console.log(document.getElementById(cell),
    //    angle1, document.getElementById('x' + (x - 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y + 1)),
    //    angle2, document.getElementById('x' + (x + 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y + 1)));
    if (angle1 != null && angle1.classList.contains('nearMine') && angle1.classList.contains('closed'))
        if ('x' + (x - 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y + 1) in nearMine)
            opencell(angle1);
    if (angle2 != null && angle2.classList.contains('nearMine') && angle2.classList.contains('closed'))
        if ('x' + (x + 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y + 1) in nearMine)
            opencell(angle2);
    toleft(x, y);
    totop(x, y);
    toright(x, y);
}
function tobottom(x, y) {
    let prevcell = 'x' + x + 'y' + y;
    x = parseInt(x); y = parseInt(y) - 1;
    let cell = 'x' + x + 'y' + y;
    if (prevcell in nearMine && cell in nearMine)
        return;
    if (!document.getElementById(cell) || !document.getElementById(cell).classList.contains('closed')
        || document.getElementById(cell).classList.contains('mine'))
        return;
    opencell(document.getElementById(cell));
    if (cell in nearMine)
        return;
    let angle1 = document.getElementById('x' + (x - 1) + 'y' + (y - 1)),
        angle2 = document.getElementById('x' + (x + 1) + 'y' + (y - 1));
    //console.log(document.getElementById(cell),
    //    angle1, document.getElementById('x' + (x + 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y - 1)),
    //    angle2, document.getElementById('x' + (x - 1) + 'y' + y), document.getElementById('x' + x + 'y' + (y - 1)));
    if (angle1 != null && angle1.classList.contains('nearMine') && angle1.classList.contains('closed'))
        if ('x' + (x - 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y - 1) in nearMine)
            opencell(angle1);
    if (angle2 != null && angle2.classList.contains('nearMine') && angle2.classList.contains('closed'))
        if ('x' + (x + 1) + 'y' + y in nearMine && 'x' + x + 'y' + (y - 1) in nearMine)
            opencell(angle2);
    toleft(x, y);
    toright(x, y);
    tobottom(x, y);
    
}

function showwarn(content) {
    [...document.getElementsByClassName('mine')].forEach((el) => el.classList.remove('closed'));
    end.style.backgroundImage = 'url(img/' + content + '.png)'
    end.style.display = 'block';
}

field.innerHTML += table;
cells = [...document.querySelectorAll('td')];
var first = true;
var end = document.getElementById('end');
cells.forEach((el) => el.addEventListener('click', () => {
    if (first == true) { //отслеживание первого хода
        first = el.id;
        spawn(first);
    }
    if (el.classList.contains('sus') || el.classList.contains(''))
        return;
    if (el.classList.contains('mine')) {
        showwarn('lose');
        el.style.cssText = 'background-color: #C42828; background-image: url(img/stepmine.svg)';
    }
    opencell(el);
    let x = parse(el.id)[0], y = parse(el.id)[1];
    toleft(x, y);
    toright(x, y);
    totop(x, y);
    tobottom(x, y);
    if (opened ==  144 - minesN)
        showwarn('win');
}));

cells.forEach((el) => el.addEventListener('contextmenu', () => {
    if (el.classList.contains('sus'))
        el.classList.remove('sus');
    else el.classList.add('sus');
}));