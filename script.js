// Select the spotlight and all image containers
const spotlight = document.querySelector('.spotlight');
const imageContainers = document.querySelectorAll('.image-container');

// Distance threshold for visibility
const visibilityDistance = 150;

// Randomize position of images on page load
function randomizeImagePositions() {
  const occupiedPositions = []; // Array to keep track of occupied positions

  imageContainers.forEach(function(imageContainer) {
    const containerWidth = imageContainer.offsetWidth;
    const containerHeight = imageContainer.offsetHeight;

    let randomTop, randomLeft;
    let overlap; // Flag to check for overlap

    // Keep generating random positions until a valid position is found
    do {
      overlap = false; // Reset overlap flag
      randomTop = Math.random() * (window.innerHeight - containerHeight);
      randomLeft = Math.random() * (window.innerWidth - containerWidth);

      // Check if the generated position overlaps with any existing positions
      for (const pos of occupiedPositions) {
        const distX = Math.abs(randomLeft - pos.left);
        const distY = Math.abs(randomTop - pos.top);
        const totalWidth = (containerWidth + pos.width) / 2;
        const totalHeight = (containerHeight + pos.height) / 2;

        if (distX < totalWidth && distY < totalHeight) {
          overlap = true; // Set overlap flag if overlapping
          break; // Exit the loop early if an overlap is found
        }
      }
    } while (overlap); // Repeat until a valid position is found

    // Store the new position
    occupiedPositions.push({
      left: randomLeft,
      top: randomTop,
      width: containerWidth,
      height: containerHeight,
    });

    // Set the new position of the image container
    imageContainer.style.top = `${randomTop}px`;
    imageContainer.style.left = `${randomLeft}px`;
  });
}

// Call the function to randomize positions when the page loads
window.onload = randomizeImagePositions;

// Listen for mouse movement on the document to handle the spotlight effect
document.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Move the spotlight to follow the cursor
  spotlight.style.left = `${mouseX - 100}px`; // Center the spotlight
  spotlight.style.top = `${mouseY - 100}px`;

  // Loop through each image container to check its distance to the cursor
  imageContainers.forEach(function(imageContainer) {
    const rect = imageContainer.getBoundingClientRect();
    const imageCenterX = rect.left + rect.width / 2;
    const imageCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt((mouseX - imageCenterX) ** 2 + (mouseY - imageCenterY) ** 2);

    // Show or hide the image based on the distance
    if (distance < visibilityDistance) {
      imageContainer.classList.add('visible');
    } else {
      imageContainer.classList.remove('visible');
    }
  });
});
