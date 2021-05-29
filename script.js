let countKubiks = 4 * 4;
let arrayKubiks = [];
let arrayColors = [];

let firstKubik = null;
let countFailed = 0;

let isEnd = true;

document.getElementById('kubiks').style.width = 4 * 100 + 22 * 4 + 'px';



function randomKubiks() {
    for (let i = 0; i < countKubiks / 2; i++) {
        let color = {
            red: Math.round(Math.random() * 255),
            green: Math.round(Math.random() * 255),
            blue: Math.round(Math.random() * 255)
        }
    
        arrayColors.push(color);
        arrayColors.push(color);
    }

    arrayColors = arrayColors.sort(function() {
        return Math.random() - 0.5;
    });

    for (let i = 0; i < arrayColors.length; i++) {
        let kubik = {
            id: i,
            red: Math.round(Math.random() * 255),
            green: Math.round(Math.random() * 255),
            blue: Math.round(Math.random() * 255),
            view: false
        }
    
        arrayKubiks.push(kubik);
    }

}

randomKubiks();

console.log(arrayKubiks);

function renderKubiks(arrayKubiks) {
    arrayKubiks.map(kubik => {
        if (!document.getElementById('kubik_' + kubik.id)) {
            let div = document.createElement('div');
            div.id = 'kubik_' + kubik.id;
            div.className = 'kubik';
            div.onclick = event => kubikClick(event);
            document.getElementById('kubiks').append(div);
        }

        renderKubik(kubik);
    });
}


function renderKubik(kubik) {
    if (kubik.view) {
        document.getElementById('kubik_' + kubik.id).style.
        backgroundColor = 
        'rgb(' + kubik.red + ',' + kubik.green + ',' + kubik.blue + ')';
    }

    else {
        document.getElementById('kubik_' + kubik.id).style.
        backgroundColor = 'rgb(0,0,0)';
    }
}


renderKubiks(arrayKubiks);



function kubikClick(event) {
    let kubikId = Number(event.target.id.slice(6));

    let isRollback = false;
    let isForward = false;


    arrayKubiks.map(kubik => {
        if (kubik.id === kubikId) {

            if (firstKubik) {
                if (firstKubik.red === kubik.red &&
                    firstKubik.green === kubik.green &&
                    firstKubik.blue === kubik.blue) {
                        isForward = true;
                    }
                    else {
                        isRollback = true;
                    }
            }

            else {
                firstKubik = kubik;
            }



            kubik.view = true;
        }
    });

    renderKubiks(arrayKubiks);


    if (isRollback) {
        const firstId = firstKubik.id;

        sleep(500).then(() => {
            arrayKubiks.map(kubik => {
                if ((kubik.id === kubikId) ||
                 (kubik.id === firstId)) {
                    kubik.view = false;
                }
            });

            renderKubiks(arrayKubiks);
        });

        firstKubik = null;
        
        countFailed += 1;
        console.log('Вы совершили ' + countFailed + ' неудачных попыток.');
    }


    if (isForward) {
        isEnd = true;

        arrayKubiks.map(kubik => {
            if (!kubik.view) {
                isEnd = false;
            }
        });

        if (isEnd) {
            console.log('Игра окончена с ' + countFailed + ' неудачными попытками.');
            

        }
        
        else {
            console.log('Вы молодец, продолжаем!');
        }

        firstKubik = null;

        renderKubiks(arrayKubiks);
    }
}

function sleep(ms) {
    return new Promise(func => setTimeout(func, ms));
}
