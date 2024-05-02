const reviewTotalDisplay = document.querySelector('#reviews')

interface Review {
    name: string;
    stars: number;
    loyaltyUser: boolean;
    date: string; 
}

interface Property {
    image: string;
    title: string;
    price: number;
    location: {
        firstLine: string;
        city: string;
        code: number;
        country: string;
    };
    contact: string;
    isAvailable: boolean;
}

const reviews: Review[] = [
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
]

const properties: Property[] = [
    {
        image: '',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: 'marywinkle@gmail.com',
        isAvailable: true  
    },
    {
        image: '',
        title: 'Polish Cottage',
        price: 34,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: 'garydavis@hotmail.com',
        isAvailable: false 
    },
    {
        image: '',
        title: 'London Flat',
        price: 23,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 35433,
            country: 'United Kingdom',
        },
        contact: 'andyluger@aol.com',
        isAvailable: true
    }
]

const findLastReviewer = (arr: Review[]): [string, boolean]=> {
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
}


const reviewer = findLastReviewer(reviews)[0];
const isLoyalty = findLastReviewer(reviews)[1];

const displayReviewsNumber = (reviewsNumber: number, reviewer: string, isLoyalty: boolean): void => {
    reviewTotalDisplay!.innerHTML = `review total ${reviewsNumber.toString()} | last reviewed by ${reviewer} ${isLoyalty? "⭐": ""}`;
}

displayReviewsNumber(reviews.length, reviewer, isLoyalty )

