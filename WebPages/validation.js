document.addEventListener("DOMContentLoaded", () => {

 
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");


  galleryItems.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      caption.textContent = img.alt;
    });
  });

  
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  const searchInput = document.getElementById("program-search");
  const sortSelect = document.getElementById("program-sort");
  const programContainer = document.querySelector(".program-container");
  const programCards = Array.from(document.querySelectorAll(".program-card"));
  const noResults = document.getElementById("no-results");

  if (searchInput && sortSelect && programContainer) {
   
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      let visibleCount = 0;

      programCards.forEach(card => {
        const name = card.getAttribute("data-name").toLowerCase();
        if (name.includes(filter)) {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      noResults.style.display = visibleCount === 0 ? "block" : "none";
    });

    
    sortSelect.addEventListener("change", () => {
      const sortValue = sortSelect.value;
      const sorted = programCards.sort((a, b) => {
        const nameA = a.getAttribute("data-name").toLowerCase();
        const nameB = b.getAttribute("data-name").toLowerCase();
        return sortValue === "name-asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });

      sorted.forEach(card => programContainer.appendChild(card));
    });
  }

  const enquiryForms = document.querySelectorAll(".enquiry-form");

  enquiryForms.forEach(form => {
    const successMessage = form.querySelector(".success-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

   
      const requiredFields = form.querySelectorAll("input[required], textarea[required]");
      let valid = true;
      requiredFields.forEach(f => {
        if (!f.value.trim()) valid = false;
      });

      if (!valid) {
        alert("Please fill all required fields.");
        return;
      }

      
      if (successMessage) {
        successMessage.textContent = "Thank you for your submission!";
        successMessage.style.display = "block";
      }

     
      setTimeout(() => {
        form.reset();
        if (successMessage) {
          successMessage.style.display = "none";
        }
      }, 2500);
    });
  });
});