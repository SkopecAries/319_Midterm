
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const businessName = params.get('business');

    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            const business = data.businesses.find(b => b.name === businessName);
            if (business) {
                displayBusinessDetails(business);
            } else {
                console.error('Business closed :(');
            }
        });
});

function displayBusinessDetails(business) {
    document.getElementById('business-name').textContent = business.name;
    document.getElementById('business-info').textContent = business.info;
    document.getElementById('business-image').src = business.image;
    document.getElementById('business-image').alt = business.name + ' Image';
    document.getElementById('business-hours').innerHTML = formatHours(business.hours);
}

function formatHours(hours) {
    return Object.entries(hours)
        .map(([day, time]) => `<strong>${day}:</strong> ${time}`)
        .join('<br>');
}

// function generateRating(rating) {
// for stars
// }
