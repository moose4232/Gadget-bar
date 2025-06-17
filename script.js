// This script adds functionality to the Gadgetbar homepage.
// It will handle the promotional block slideshow.

document.addEventListener("DOMContentLoaded", function() {
    // Select all the promotional cards
    const promoCards = document.querySelectorAll('.promo-card');
    let currentCardIndex = 0;

    function showCard(index) {
        // Hide all cards first
        promoCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show the specific card
        if (promoCards[index]) {
            promoCards[index].style.display = 'block';
        }
    }

    function nextCard() {
        currentCardIndex = (currentCardIndex + 1) % promoCards.length;
        showCard(currentCardIndex);
    }
    
    // Initially, show the first card
    showCard(currentCardIndex);

    // Change the card every 3 seconds (3000 milliseconds)
    setInterval(nextCard, 3000);
});
