window.addEventListener("hashchange", () => {
  showSection(location.hash.substring(1));
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  const buttons = document.querySelectorAll('nav button');
  const sweebok = document.getElementById('sweebok');
  const introText = document.getElementById('intro-text');
  const sweebok2 = document.getElementById('sweebok2');

  sections.forEach(section => {
    section.classList.remove('active', 'fade-in');
  });

  buttons.forEach(button => {
    button.classList.remove('active');
  });

  if (sectionId && sectionId !== 'inicio') {
    sweebok.style.display = 'none';
    introText.style.display = 'none';
    sweebok2.style.display = 'none'; 
    setTimeout(() => {
      document.getElementById(sectionId).classList.add('active', 'fade-in');
      const activeButton = document.querySelector(`nav a[href="#${sectionId}"] button`);
      if (activeButton) {
        activeButton.classList.add('active');
        addAnimation(activeButton); 
      }
    }, 500); 
  } else {
    setTimeout(() => {
      sweebok.style.display = 'block';
      introText.style.display = 'block';
      sweebok2.style.display = 'block'; 
    }, 500); 
  }
}

function addAnimation(button) {
  button.classList.add('button-animation');
  setTimeout(() => {
    button.classList.remove('button-animation');
  }, 500); 
}


document.getElementById("navidaimagen").addEventListener("click", () => {
  resetSections();
  showSection('inicio');
  history.pushState(null, null, ' ');
});

function resetSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.remove('active', 'fade-in');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSection(location.hash.substring(1) || 'inicio');
});
