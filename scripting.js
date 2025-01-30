
const images = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const lightboxDescription = document.getElementById('lightbox-description');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

function openLightbox(index) {
  
  lightbox.style.display = 'flex';
  
  lightboxImage.src = images[index].src;
  lightboxDescription.textContent = galleryItems[index].getAttribute('data-description');
  currentIndex = index;

  galleryItems.forEach((item, i) => {
    if (i !== index) {
      item.classList.add('fade');
    } else {
      item.classList.add('active');
    }
  });
}


closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';

  
  galleryItems.forEach((item) => {
    item.classList.remove('fade', 'active');
  });
});


prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  lightboxImage.src = images[currentIndex].src;
  lightboxDescription.textContent = galleryItems[currentIndex].getAttribute('data-description');
});


nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  lightboxImage.src = images[currentIndex].src;
  lightboxDescription.textContent = galleryItems[currentIndex].getAttribute('data-description');
});


images.forEach((img, index) => {
  img.addEventListener('click', () => {
    openLightbox(index);
  });
});


lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    
   
    galleryItems.forEach((item) => {
      item.classList.remove('fade', 'active');
    });
  }
});

// Add a helper function to enable fullscreen
function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) { // Safari
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
          element.msRequestFullscreen();
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
      }
  }
}

// Update openLightbox function
function openLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImage.src = images[index].src;
  lightboxDescription.textContent = galleryItems[index].getAttribute('data-description');
  currentIndex = index;

  // Enable fullscreen
  toggleFullscreen(lightbox);

  galleryItems.forEach((item, i) => {
      if (i !== index) {
          item.classList.add('fade');
      } else {
          item.classList.add('active');
      }
  });
}

// Exit fullscreen when closing the lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';

  if (document.fullscreenElement) {
      document.exitFullscreen();
  }

  galleryItems.forEach((item) => {
      item.classList.remove('fade', 'active');
  });
});

// Close fullscreen on lightbox click (optional)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
      lightbox.style.display = 'none';

      if (document.fullscreenElement) {
          document.exitFullscreen();
      }

      galleryItems.forEach((item) => {
          item.classList.remove('fade', 'active');
      });
  }
});

