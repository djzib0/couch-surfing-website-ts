"use strict";
const reviewTotalDisplay = document.querySelector('#reviews');
const reviews = [
    {
        name: 'Sheia',
        stars: 5,
        loyaltyUser: true,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: false,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: true,
        date: '27-03-2021'
    },
];
const findLastReviewer = (arr) => {
    let latestDate = new Date('01-01-1900');
    let lastViewerName = "";
    let isLoyalty = false;
    for (let item of arr) {
        let currentDate = new Date(item.date);
        if (currentDate > latestDate) {
            latestDate = currentDate;
            lastViewerName = item.name;
            isLoyalty = item.loyaltyUser;
        }
    }
    return [lastViewerName, isLoyalty];
};
const reviewer = findLastReviewer(reviews)[0];
const isLoyalty = findLastReviewer(reviews)[1];
const displayReviewsNumber = (reviewsNumber, reviewer, isLoyalty) => {
    reviewTotalDisplay.innerHTML = `review total ${reviewsNumber.toString()} | last reviewed by ${reviewer} ${isLoyalty ? "⭐" : ""}`;
};
displayReviewsNumber(reviews.length, reviewer, isLoyalty);
