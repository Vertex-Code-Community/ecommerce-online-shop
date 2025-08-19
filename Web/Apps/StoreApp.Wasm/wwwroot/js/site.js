window.scrollReviews = (element, amount) => {
    if (element) {
        element.scrollBy({ left: amount, behavior: 'smooth' });
    }
};
