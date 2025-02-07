document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Replace with your image folder path
    const imageFolder = "assets/gallery/";

    // List of images (you may need a server-side script to fetch files dynamically)
    const images = [
        "img4.jpg",
        "img5.jpg",
        "img9.jpg"
    ];

    // Generate gallery
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = imageFolder + image;
        imgElement.classList.add("gallery-item");

        imgElement.addEventListener("click", () => openLightbox(imageFolder + image));

        galleryContainer.appendChild(imgElement);
    });

    // Lightbox functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    function openLightbox(src) {
        lightbox.style.display = "flex";
        lightboxImg.src = src;
    }

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox(index);
    });
});

closeBtn.addEventListener('click', closeLightbox);

function showLightbox(index) {
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryItems[index].querySelector('img').src;
    updateNavigationButtons();
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;
    updateNavigationButtons();
    lightboxImg.src = galleryItems[currentImageIndex].querySelector('img').src;
}

function updateNavigationButtons() {
    if (currentImageIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentImageIndex === galleryItems.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}
