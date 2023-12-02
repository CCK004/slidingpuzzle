function clearLocalStorageAndReload() {
    clearLocalGameData();
    location.reload();
   }

function getLocalGameData() {
    return JSON.parse(localStorage.getItem('localGameData')) || {
        '2': {
            isAccessible: true,
        },
        '3': {
            isAccessible: false,
        },
        '4': {
            isAccessible: false,
        },
        '5': {
            isAccessible: false,
        },
        '6': {
            isAccessible: false,
        },
        '7': {
            isAccessible: false,
        },
        '8': {
            isAccessible: false,
        },
        '9': {
            isAccessible: false,
        },
    }
}

const localGameData = getLocalGameData();

function renderGameLevels(localGameDataObject, board) {
    document.querySelector('.controls__main').classList.remove('none');
    document.querySelector('.controls__game').classList.add('none');
    board.innerHTML = '';
    let levelClassName = '';
    for (let key in localGameDataObject) {

        if (localGameDataObject[key].isAccessible) {
            levelClassName = 'level__enabled';
        } else {
            levelClassName = 'level__disabled';
        }

        let levelEl = createElement('div', {
            className: levelClassName + ' level',

            children: [
                createElement('div', {
                    className: 'level__name',
                }, `${key}x${key}`),
                createElement('div', {
                    className: 'level__score',
                }, (function () {
                    if (localGameDataObject[key].bestScore) return `Score: ${localGameDataObject[key].bestScore}`
                    return '';
                }()))
            ]
        });
        levelEl.setAttribute('data-level', key);
        board.append(levelEl);
    }
    if (board.lastChild.getAttribute('data-level') === '9' &&
        board.lastChild.textContent !== '9x9') {
        board.classList.add('game-over');
    }

    document.querySelectorAll('.level__enabled').forEach(levelEl => {
        levelEl.addEventListener('click', () => startGame({
            level: +levelEl.getAttribute('data-level'),
            localGameDataObject,
        }));
    });
}

renderGameLevels(localGameData, document.querySelector('.board'));

let g = {};

function startGame(props) {
    const {
        level,
        localGameDataObject,
        moves,
        board,
    } = props;

    const game = new Game(level, localGameDataObject, moves, board);
    game.render();
    //getGlobalScoreData(level);
    document.querySelector('.controls__main').classList.add('none');
    document.querySelector('.controls__game').classList.remove('none');
    document.querySelector('.board').classList.remove('game-over');
    if (localStorage.getItem('gameProcess')) document.querySelector('#load').disabled = false;
}





function showHidePopup() {
    document.querySelector(`.${this.id}`).classList.toggle('hidden');
    document.querySelector(`.${this.id}`).classList.toggle('visible');
    document.querySelector('.container').classList.toggle('innactive');
}

document.querySelector('#instructions').onclick = showHidePopup;
document.querySelector('#cleargamedata').addEventListener('click', function () {
    clearLocalStorageAndReload()
});


function switchThemes() {
    var css1 = document.getElementById("css1");
    var css2 = document.getElementById("css2");
   
    if (css2) {
       css2.disabled = true;
    }
   
    if (css1.disabled) {
       css1.disabled = false;
    } else {
       css1.disabled = true;
   
       if (!css2) {
         css2 = document.createElement("link");
         css2.id = "css2";
         css2.rel = "stylesheet";
         css2.type = "text/css";
         css2.href = "darkstyle.css";
         document.getElementsByTagName("head")[0].appendChild(css2);
       } else {
         css2.disabled = false;
       }
    }
   }


document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('close')) {
        event.target.parentElement.classList.toggle('hidden');
        event.target.parentElement.classList.toggle('visible');
        document.querySelector('.container').classList.toggle('innactive');
    }

    if (event.target.classList.contains('innactive')) {
        if (document.querySelector('.popup.visible')) {
            let el = document.querySelector('.popup.visible');
            el.classList.toggle('hidden');
            el.classList.toggle('visible');
            event.target.classList.toggle('innactive');
        }

    }
})