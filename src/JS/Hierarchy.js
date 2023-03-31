function createPosition(position) {
    const positionElem = document.createElement('div');
    positionElem.classList.add('position');

    const titleElem = document.createElement('h3');
    titleElem.textContent = position.title;
    positionElem.appendChild(titleElem);

    const nameElem = document.createElement('p');
    nameElem.textContent = position.name;
    positionElem.appendChild(nameElem);

    return positionElem;
}

function createLevel(level) {
    const levelElem = document.createElement('div');
    levelElem.classList.add('level');

    const positions = orgData.filter(pos => pos.level === level);
    positions.forEach(position => {
        const positionElem = createPosition(position);
        levelElem.appendChild(positionElem);
    });

    return levelElem;
}

const orgChart = document.querySelector('.org-chart');
const levels = Math.max(...orgData.map(pos => pos.level));

for (let level = 0; level <= levels; level++) {
    const levelElem = createLevel(level);
    orgChart.appendChild(levelElem);
}
