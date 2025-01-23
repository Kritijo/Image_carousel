import './styles.css';

let menu = document.querySelector('.menu');

menu.addEventListener('click', () => {
  const dropdown = menu.querySelector('.dropdown');
  if (dropdown) hideDropDown(menu);
  else showDropDown(menu);
});

function showDropDown(self) {
  let items = menuOptions();

  let dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');
  dropdown.setAttribute('role', 'menu');

  items.forEach((item) => {
    let opt = document.createElement('div');
    opt.textContent = item;
    opt.classList.add('dropdown-item');
    opt.setAttribute('role', 'menuitem');
    opt.tabIndex = 0;
    dropdown.append(opt);
  });

  self.append(dropdown);
}

function hideDropDown(self) {
  const dropdown = self.querySelector('.dropdown');
  if (dropdown) dropdown.remove();
}

function menuOptions() {
  return ['Option 1', 'Option 2', 'Option 3'];
}

// Image carousel

class ImageCarousel {
  imageContext = require.context('./images', false, /\.(jpg|jpeg|png|gif)$/);
  bgImages = Array.from(this.imageContext.keys().map(this.imageContext));
  idx = 0;
  autoplayInterval = null;

  changeBg() {
    const image = document.querySelector('.image');
    image.style.background = `url(${this.bgImages[this.idx]})`;
    image.style.backgroundSize = 'cover';
  }

  changeButtons() {
    let bttns = Array.from(document.querySelectorAll('input'));
    bttns[this.idx].checked = true;
  }

  autoPlay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.idx = (this.idx + 1) % this.bgImages.length;
      this.changeBg();
      this.changeButtons();
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  goToPrev() {
    this.idx = (this.idx - 1 + this.bgImages.length) % this.bgImages.length;
    this.changeBg();
    this.changeButtons();
    this.autoPlay();
  }

  goToNext() {
    this.idx = (this.idx + 1) % this.bgImages.length;
    this.changeBg();
    this.changeButtons();
    this.autoPlay();
  }

  handleButtons(id) {
    const mapping = { btn1: 0, btn2: 1, btn3: 2, btn4: 3 };
    this.idx = mapping[id];
    this.changeBg();
    this.autoPlay();
  }

  playCarousel() {
    this.autoPlay();
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    const bttns = document.querySelector('.bttns');

    left.addEventListener('click', () => this.goToPrev());
    right.addEventListener('click', () => this.goToNext());
    bttns.addEventListener('click', (e) => this.handleButtons(e.target.id));
  }
}

let play = new ImageCarousel();
play.playCarousel();
