const toggle = document.getElementById("mode-toggle");
const body = document.body;
const categoryLabel = document.querySelector(".category-label");

toggle.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    categoryLabel.textContent = "Veg";
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    categoryLabel.textContent = "Non-veg";
  }
});

// Get references to category items and product cards
const categoryItems = document.querySelectorAll('.category-item');
const productSections = document.querySelectorAll('.product-card');

// Show all products initially
const showAllProducts = () => {
  productSections.forEach((section) => {
    section.style.display = 'block'; // Ensure all products are visible
    section.style.opacity = '1'; // Set opacity to 1 immediately
    section.style.transition = 'none'; // Disable transition while showing all
  });
};

// Add a click event listener to each category item
categoryItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Get the data-target attribute of the clicked category
    const target = item.getAttribute('data-target');

    // Remove active class from all category items
    categoryItems.forEach((category) => {
      category.classList.remove('active');
      const label = category.querySelector('label');
      if (label) {
        label.style.color = ''; // Reset color
        label.style.fontWeight = ''; // Reset font weight
      }
    });

    // Add active class to the clicked category and style its label
    item.classList.add('active');
    const activeLabel = item.querySelector('label');
    if (activeLabel) {
      activeLabel.style.color = '#F05537'; // Change to desired color
      activeLabel.style.fontWeight = 'bold'; // Change font weight
    }

    // Hide all product sections initially
    productSections.forEach((section) => {
      section.style.opacity = '0'; // Fade out
      section.style.transition = 'opacity 0.5s ease'; // Smooth transition
      setTimeout(() => {
        section.style.display = 'none'; // Set to hidden after the fade-out
      }, 500); // Wait for opacity transition to finish
    });

    // Show the product sections with the matching data-target
    if (target === 'all') {
      // Reset the state to show all products without any delay
      setTimeout(() => {
        showAllProducts(); // Show all products when "All" is clicked
      }, 500); // Ensure the transition completes before showing all products
    } else {
      productSections.forEach((section) => {
        if (section.getAttribute('data-category') === target) {
          setTimeout(() => {
            section.style.display = 'block'; // Make section visible
            setTimeout(() => {
              section.style.opacity = '1'; // Fade in the section
            }, 10);
          }, 500); // Wait for opacity transition
        }
      });
    }
  });
});

// Show all products initially
showAllProducts();
