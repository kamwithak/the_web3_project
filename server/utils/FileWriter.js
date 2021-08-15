const csvwriter = require('csv-writer');
const createCsvWriter = csvwriter.createObjectCsvWriter;
const nameOfCSVFile = 'Ledn_Token_Data.csv';

const csvCreater = (data) => {
    const csvWriter = createCsvWriter({
        path: `../server/data/${nameOfCSVFile}`,
        header: [
            {id: 'First Name', title: 'First Name'},
            {id: 'Last Name', title: 'Last Name'},
            {id: 'Country', title: 'Country'},
            {id: 'email', title: 'Email'},
            {id: 'dob', title: 'Date of Birth'},
            {id: 'mfa', title: 'Multi-Factor Authentication'},
            {id: 'amt', title: 'Ledn Token Supply'},
            {id: 'createdDate', title: 'Account Created'},
            {id: 'ReferredBy', title: 'Referral'},
        ],
        append: false
    });
    
    csvWriter
        .writeRecords(data)
        .then(() => console.log("exports csv created successfully!"));

    return csvWriter;
};

module.exports = {
    csvCreater
};