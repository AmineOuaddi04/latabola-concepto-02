const menuData = {
  tortillas: {
    title: 'Tortillas', index: '01 / 04', intro: 'Una de las razones para volver. Clásicas o con una vuelta de tuerca.',
    dishes: [['LA CLÁSICA', 'La de siempre, como tiene que ser.'], ['LA TRUFADA', 'Una favorita de la casa.'], ['LA DE BACALAO', 'Otra manera de empezar.']]
  },
  bocadillos: {
    title: 'Bocadillos', index: '02 / 04', intro: 'Pan, buen producto y combinaciones que merecen una pausa.',
    dishes: [['DE COSTILLA', 'Costilla ibérica a baja temperatura.'], ['POLLO MARINADO', 'Con pesto y mayonesa de ponzu.'], ['PEPITO DE PICAÑA', 'Con queso comté y mayonesa trufada.']]
  },
  compartir: {
    title: 'Al centro', index: '03 / 04', intro: 'Pide uno. Luego otro. Aquí la mesa siempre acaba compartiendo.',
    dishes: [['GYOZAS DE LANGOSTINOS', 'Con salsa de curry suave.'], ['CROQUETAS DE JAMÓN IBÉRICO', 'Una ronda que nunca sobra.'], ['PULPO CON PARMENTIER', 'Para hacer sitio en el centro.']]
  },
  postres: {
    title: 'Postres', index: '04 / 04', intro: 'Cuando parece que ya no cabe nada, llega la mejor idea.',
    dishes: [['TARTA DE QUESO', 'El clásico final de una buena mesa.'], ['TARTA LOTUS', 'Para los que siempre dejan hueco.'], ['BROWNIE', 'Un último bocado.']]
  }
};

const tabs = [...document.querySelectorAll('.tab')];
const panel = document.querySelector('#menu-panel');
const title = document.querySelector('#category-title');
const intro = document.querySelector('#category-intro');
const index = document.querySelector('#category-index');
const list = document.querySelector('#dish-list');

function activate(tab) {
  const data = menuData[tab.dataset.category];
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  title.textContent = data.title;
  intro.textContent = data.intro;
  index.textContent = data.index;
  list.replaceChildren(...data.dishes.map(([name, description]) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const small = document.createElement('small');
    span.textContent = name;
    small.textContent = description;
    li.append(span, small);
    return li;
  }));
}

tabs.forEach((tab, current) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', (event) => {
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    activate(tabs[next]);
  });
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
