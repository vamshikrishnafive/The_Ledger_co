const { readFileSync } = require('fs')
const filename = process.argv[2]

let objData = {}
let parseFile = readFileSync(filename, 'utf-8').split('\n').map(f => f.split(' '))

parseFile.forEach(element => {
    switch (element[0]) {
        case 'LOAN':
            findLoan(element[1], element[2], parseInt(element[3]), parseInt(element[4]), parseInt(element[5]));
            break;
        case 'PAYMENT':
            findPayment(element[2], parseInt(element[3]), parseInt(element[4]))
            break;
        case 'BALANCE':
            console.log(findBalance(element[1], element[2], parseInt(element[3])))
            break;
        default:
            console.log("wrong command");
            break;
    }
});

function findLoan(Bank_name, Borrower_name, Principal, No_of_years, Rate_Interest) {
    let interest = Math.floor(Principal * No_of_years * `0.0${Rate_Interest}`);
    let amountPayable = Principal + interest;
    let yearInMonths = No_of_years * 12;
    let emiAmountPerMonth = (amountPayable / yearInMonths);
    objData[Borrower_name] = {
        bankName: Bank_name,
        personName: Borrower_name,
        principalAmount: Principal,
        noOfYear: No_of_years,
        rateOfInterest: Rate_Interest,
        calculatedInterest: interest,
        calculatedEmiAmountPerMonth: emiAmountPerMonth,
        calculatedEmiNos: yearInMonths,
        calculatedAmountPayable: amountPayable
    }
}
function findPayment(Borrower_name, Lump_sum, Emi_no) {
    let UpdatedAmountPayable = objData[Borrower_name].calculatedAmountPayable - Lump_sum;
    let UpdatedEmiNos = objData[Borrower_name].calculatedEmiNos - Emi_no;
    objData[Borrower_name].calculatedEmiNos = UpdatedEmiNos;
    objData[Borrower_name].calculatedAmountPayable = UpdatedAmountPayable;
}
function findBalance(Bank_name, Borrower_name, Emi_no) {
    if (Emi_no == 0) {
        let Paid_Amount = objData[Borrower_name].calculatedEmiAmountPerMonth;
        let left_Emis = objData[Borrower_name].calculatedEmiNos - Emi_no;
    }
    let Paid_Amount = Emi_no * objData[Borrower_name].calculatedEmiAmountPerMonth;
    let left_Emis = objData[Borrower_name].calculatedEmiNos - Emi_no;
    return `${Bank_name} ${Borrower_name} ${Paid_Amount} ${left_Emis}`
}
