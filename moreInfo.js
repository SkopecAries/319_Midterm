
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const businessName = params.get('business');

    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        const params = new URLSearchParams(window.location.search);
        const businessName = params.get('business');
        const business = data.businesses.find(b => b.name === businessName);
        if (business) {
            displayBusinessDetails(business);
            // Also display similar businesses
            displaySimilarBusinesses(data.businesses, businessName);
        } else {
            console.error('Business not found');
        }
    });
});

function displayBusinessDetails(business) {
    document.getElementById('business-name').textContent = business.name;
    document.getElementById('business-info').textContent = business.info;
    document.getElementById('business-image').src = business.image;
    document.getElementById('business-image').alt = business.name + ' Image';
    document.getElementById('business-hours').innerHTML = formatHours(business.hours);
    document.getElementById('rating-container').innerHTML = getRatingStars(business.rating);
    

     const contactInfoElement = document.getElementById('business-contact');
    if (business.contactInfo) {
        contactInfoElement.innerHTML = `
            <p><strong>Phone:</strong> ${business.contactInfo.number}</p>
            <p><strong>Email:</strong> <a href="mailto:${business.contactInfo.email}">${business.contactInfo.email}</a></p>
        `;
    }
   
}

function generateStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>`;
        } else {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                          </svg>`;
        }
    }
    return starsHtml;
}

function getRatingStars(rating) {
    let starsHtml = '';

    for (let i = 0; i < rating; i++) {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="darkgoldenrod" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>`;
    }
   // emoty
    for (let i = rating; i < 5; i++) {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83-4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                      </svg>`;
    }
    return starsHtml;
}


function formatHours(hours) {
    return Object.entries(hours)
        .map(([day, time]) => `<strong>${day}:</strong> ${time}`)
        .join('<br>');
}

function displaySimilarBusinesses(allBusinesses, currentBusinessName) {
    const similarBusinessesContainer = document.getElementById('similar-businesses');

    const similarBusinesses = allBusinesses.filter(business => business.name !== currentBusinessName);

    similarBusinesses.forEach(business => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 d-flex align-items-stretch';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-4 shadow-sm text-center';

        const image = document.createElement('img');
        image.className = 'card-img-top';
        image.src = business.image;
        image.alt = business.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = business.name;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = business.info;


        const moreInfoLink = document.createElement('a');
        moreInfoLink.href = `moreInfo.html?business=${encodeURIComponent(business.name)}`;
        moreInfoLink.className = 'btn btn-primary mt-2 btn-no-hover';
        moreInfoLink.textContent = 'More Info';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(moreInfoLink); 
        colDiv.appendChild(cardDiv);

        similarBusinessesContainer.appendChild(colDiv);
    });
}
