const reviewTotalDisplay = document.querySelector('#reviews')
const returningUserDisplay = document.querySelector('#returning-user')
const userNameDisplay = document.querySelector('#user')
const propertyContainer = document.querySelector('.properties')
const footer = document.querySelector('.footer')

interface Review {
    name: string;
    stars: number;
    loyaltyUser: Loyalty;
    date: string;
    description?: string;
}

type Country = 'Colombia' | 'Poland' | 'United Kingdom'

interface Property {
    image: string;
    title: string;
    price: number;
    location: {
        firstLine: string;
        city: string;
        code: number;
        country: Country;
    };
    contact: [number, string];
    isAvailable: boolean;
}

enum Loyalty {
    GOLD_USER = 'GOLD_USER',
    SILVER_USER = 'SILVER_USER',
    BRONZE_USER = 'BRONZE_USER',
}

const reviews: Review[] = [
    {
        name: 'Sheia',
        stars: 5,
        loyaltyUser: Loyalty.GOLD_USER,
        date: '01-04-2021',
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: Loyalty.BRONZE_USER,
        date: '28-03-2021',
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: Loyalty.SILVER_USER,
        date: '27-03-2021',
        description: ''
    },
]

// User
enum PermissionsAccess {
    ADMIN = 'admin',
    READ_ONLY = 'readOnly'
}

const you: {
    firstName: string;
    lastName: string;
    permission: PermissionsAccess;
    isReturning: boolean;
    age: number;
    stayedAt: string[]
} = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permission: PermissionsAccess.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
}

// Array of properties
const properties: Property[] = [
    {
        image: 'images/colombia-property.jpg',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [1123495082908, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: 'images/poland-property.jpg',
        title: 'Polish Cottage',
        price: 34,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [1123495082908, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: 'images/london-property.jpg',
        title: 'London Flat',
        price: 23,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 35433,
            country: 'United Kingdom',
        },
        contact: [1123495082908, 'andyluger@aol.com'],
        isAvailable: true
    }
]

// functions
const findLastReviewer = (arr: Review[]): [string, string]=> {
    let latestDate = new Date('01-01-1900');
    let lastViewerName = "";
    let isLoyalty = "";
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

function populateUser(isReturning: boolean, userName: string) {
    if (isReturning) {
        returningUserDisplay!.innerHTML = 'back'
    }
    userNameDisplay!.innerHTML = userName
}

const displayReviewsNumber = (reviewsNumber: number, reviewer: string, isLoyalty: string): void => {
    reviewTotalDisplay!.innerHTML = `review total ${reviewsNumber.toString()} | last reviewed by ${reviewer} ${isLoyalty == 'GOLD_USER' ? "⭐" : " "}`;
}



// ****** rendering elements ******
populateUser(you.isReturning, you.firstName)

const reviewer = findLastReviewer(reviews)[0];
const isLoyalty = findLastReviewer(reviews)[1];

displayReviewsNumber(reviews.length, reviewer, isLoyalty )


// Adding properties
let authorityStatus: any
let isLoggedIn = false;

function showDetails(authorityStatus: boolean | PermissionsAccess, element: HTMLDivElement, price: number) {
    if (authorityStatus) {
        const priceDisplay = document.createElement('div')
        priceDisplay.innerHTML = price.toString() + '/night'
        element.appendChild(priceDisplay)
    }
}

// Add the properties
for (let i = 0; i < properties.length; i++) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = properties[i].title
    const image = document.createElement('img')
    image.setAttribute('src', properties[i].image)
    card.appendChild(image)
    propertyContainer!.appendChild(card)
    showDetails(you.permission, card, properties[i].price)
}

// setting footer
let currentLocation: [string, string, number] = ['Gdańsk', '7:19', 23];
footer!.innerHTML = currentLocation[0] + ' ' + currentLocation[1] + ' ' + currentLocation[2] + '°'

