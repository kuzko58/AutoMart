class car {
    constructor(name, price, year, condition, image) {
        this.name = name;
        this.price = price;
        this.year = year;
        this.condition = condition;
        this.image = image;
    }
}

const dealOne = new car('Toyota Avalon', '₦13,700,000', '2018', 'New', 'css\\assets\\Images\\Toyota-Avalon.jpg');
const dealTwo = new car('Honda CR-V', '₦18,100,000', '2018', 'New', 'css\\assets\\Images\\Honda-CRV.jpg');
const dealThree = new car('Ford Edge', '₦8,000,000', '2012', 'Used', 'css\\assets\\Images\\Ford-Edge.jpg');
const dealFour = new car('Toyota Corolla', '₦8,500,000', '2014', 'New', 'css\\assets\\Images\\Toyota-Corolla.jpg');
const latestDeals = [dealOne, dealTwo, dealThree, dealFour];

/******************** Search Page ***********************/

const bodyTypeArr = ['Bike', 'Sedan', 'SUV', 'Pick-up', 'Van', 'Bus', 'Truck', 'Tractor'];
const priceRangeArr = ['₦50,000', '₦100,000', '₦200,000', '₦500,000', '₦1,000,000', '₦2,000,000', '₦5,000,000', '₦10,000,000', '₦20,000,000'];
const allStates = ["Abia", "Adamawa", "Anambra", "Akwa Ibom", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Enugu", "Edo", "Ekiti", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];


function manuYearArrFunc(min, max) {
    let result = [];
    for (min; min <= max; min++) {
        result.push(min);
    }
    return result.reverse();
}
const vehicle = {};
vehicle.sedan = ['Acura', 'KIA', 'Honda', 'Hyundai', 'Lexus', 'Mercedes', 'Toyota'];
vehicle.suv = ['Acura', 'KIA', 'Honda', 'Hyundai', 'Lexus', 'Mercedes', 'Toyota'];
const carModel = {};
carModel.toyota = {};
carModel.honda = {};
carModel.toyota.sedan = ['Avensis', 'Camry', 'Corolla'];
carModel.honda.suv = ['CR-V', 'Pilot'];


export {
    latestDeals,
};
export {
    bodyTypeArr,
    priceRangeArr,
    allStates,
    manuYearArrFunc,
    vehicle,
    carModel
};