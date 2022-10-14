let liningLength = document.getElementById('lining-length-input');
let woodworkType = document.getElementById('woodwork-type');
let liningWidth = woodworkType.options[woodworkType.selectedIndex].value;
let wallOpeningCheckbox = document.getElementById('wall-opening-checkbox');
let wallOpeningDiv = document.querySelector('.wall-openings');
wallOpeningDiv.style.display = "none";
let openingsCount = document.getElementById('opening-count');
let countButton = document.getElementById('count-button');
let wallHeight = document.getElementById('wall-height-input');
let wallWidth = document.getElementById('wall-width-input');
let resultDisplay = document.getElementById('result');
let woodworkPrice = woodworkType.options[woodworkType.selectedIndex].getAttribute('price');
let wallHoleCheckbox = document.getElementById('wall-holes-checkbox');
let wallHoleDiv = document.querySelector('.wall-holes');
wallHoleDiv.style.display = "none";
let holesCount = document.getElementById('holes-count');


woodworkType.addEventListener('change', () => {
    liningWidth = woodworkType.options[woodworkType.selectedIndex].value;
    woodworkPrice = woodworkType.options[woodworkType.selectedIndex].getAttribute('price');
});

let openingHeight = document.createElement('p');
openingHeight.className = "opening-height";        
openingHeight.append('Высота проема 1 (в мм): ');
openingHeight.innerHTML += '<input class="opening-height-input" type="text">';

let openingWidth = document.createElement('p');
openingWidth.className = "opening-width";    
openingWidth.append('Ширина проема 1 (в мм): ');
openingWidth.innerHTML += '<input class="opening-width-input" type="text">';

wallOpeningDiv.appendChild(openingHeight);
wallOpeningDiv.appendChild(openingWidth);

wallOpeningCheckbox.addEventListener('change', () => {
    if (wallOpeningCheckbox.checked == true) {
        wallOpeningDiv.style.display = "initial";
    } else {
        wallOpeningDiv.style.display = "none";
    }
});

openingsCount.addEventListener('change', buildOpenings);

function buildOpenings() {
    let numberOfOpenings = openingsCount.value;
    if (document.querySelectorAll('.opening-height')) {
        document.querySelectorAll('.opening-height').forEach( input => {
            input.remove();
        });

        document.querySelectorAll('.opening-width').forEach( input => {
            input.remove();
        });
    }

    for (let i = 0; i < numberOfOpenings; i++) {
        let openingHeight = document.createElement('p');
        openingHeight.className = "opening-height";        
        openingHeight.append(`Высота проема ${i + 1} (в мм): `);
        openingHeight.innerHTML += '<input class="opening-height-input" type="text">';

        let openingWidth = document.createElement('p');
        openingWidth.className = "opening-width";    
        openingWidth.append(`Ширина проема ${i + 1} (в мм): `);
        openingWidth.innerHTML += '<input class="opening-width-input" type="text">';

        wallOpeningDiv.appendChild(openingHeight);
        wallOpeningDiv.appendChild(openingWidth);
    }
}

let holeDiameter = document.createElement('p');
holeDiameter.className = "diameter";        
holeDiameter.append('Диаметр круглого отверстия 1 (в мм): ');
holeDiameter.innerHTML += '<input class="diameter-input" type="text">';

wallHoleDiv.appendChild(holeDiameter);

wallHoleCheckbox.addEventListener('change', () => {
    if (wallHoleCheckbox.checked == true) {
        wallHoleDiv.style.display = "initial";
    } else {
        wallHoleDiv.style.display = "none";
    }
});

holesCount.addEventListener('change', buildHoles);

function buildHoles() {
    let numberOfHoles = holesCount.value;
    if (document.querySelectorAll('.diameter')) {
        document.querySelectorAll('.diameter').forEach( input => {
            input.remove();
        });
    }

    for (let i = 0; i < numberOfHoles; i++) {
        let holeDiameter = document.createElement('p');
        holeDiameter.className = "diameter";        
        holeDiameter.append(`Диаметр круглого отверстия ${i + 1} (в мм): `);
        holeDiameter.innerHTML += '<input class="diameter-input" type="text">';
        
        wallHoleDiv.appendChild(holeDiameter);
    }
}

countButton.addEventListener('click', countLining);

function countLining() {
    let openingsOverall = 0;
    let holesOverall = 0;
    
    if (wallOpeningCheckbox.checked == true) {
        let openingHeightDimensions = document.querySelectorAll('.opening-height-input');
        let openingWidthDimensions = document.querySelectorAll('.opening-width-input');        

        for (let i = 0; i < openingHeightDimensions.length; i++) {
            openingsOverall += ((parseFloat(openingHeightDimensions[i].value) * parseFloat(openingWidthDimensions[i].value)))
        }
    }

    if (wallHoleCheckbox.checked == true) {
        let holeDimensions = document.querySelectorAll('.diameter-input');

        for (let i = 0; i < holeDimensions.length; i++) {
            holesOverall += (Math.PI * (parseFloat(holeDimensions[i].value) ** 2) / 4);
        }
    }

    let result = Math.ceil(((((parseFloat(wallHeight.value) * parseFloat(wallWidth.value)) - openingsOverall - holesOverall) / parseFloat(liningLength.value) / liningWidth)) / 1000);    
    
    if (result > 0) {
        resultDisplay.innerHTML = `Необходимое количество вагонки: ${result} шт.` + '<br>' + `Стоимость: ${result * woodworkPrice * (liningLength.value/1000)} руб.`;
    }
}