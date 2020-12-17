  // Nav bar and logo changes colors when scrolled
  
  const nav = document.querySelector('.scroll-nav');
  const wordMark = document.querySelector('.wordmark-container')
  const navOptions = document.querySelectorAll('.nav-options')

  window.onscroll= function() {
    let top = window.scrollY;
    if (top > 400) {
      nav.classList.remove('light-color')
      nav.classList.add('dark-color')
      document.getElementById('logo-change').src = "./assets/RatLogoWhite.png"; 
      wordMark.classList.remove('nav-text-dark')
      wordMark.classList.add('nav-text-light')
      navOptions.classList.remove('nav-text-dark')
      navOptions.classList.add('nav-text-light')
    }else{
      nav.classList.remove('dark-color')
      nav.classList.add('light-color')
      document.getElementById('logo-change').src = "./assets/RatLogoBlack.png";
      wordMark.classList.remove('nav-text-light')
      wordMark.classList.add('nav-text-dark')
      navOptions.classList.remove('nav-text-light')
      navOptions.classList.add('nav-text-dark')
    }
  }

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    //get the text of the current word
    const fullTxt = this.words[current]
    //CHeck if the word is deleting
    if(this.isDeleting) {
      //remove a character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    }else {
      //add a character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //Insert the txt into the element
     this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
     //Type Speed
     let typeSpeed = 200;
     
     //If the word is deleting make it delete faster
     if (this.isDeleting) {
      typeSpeed /= 2;
     } 
     
      // If the word is complete move onto the next word
     if(!this.isDeleting && this.txt === fullTxt) {
      // make pause at end
       typeSpeed = this.wait;
       //Set the delete to true
       this.isDeleting = true;
     } else if (this.isDeleting && this.txt === '') {
       this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      // Pause before the next word starts typing
      typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}