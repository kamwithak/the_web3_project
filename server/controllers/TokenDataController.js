const axios = require('axios');
// const fileWriter = require('../utils/FileWriter');

const getTokenHolderData = async (req, res) => {
    const IPFS_RAW_DATA = "https://ipfs.io/ipfs/QmTvC5kPYbwocKwENpjcn4t6WkGB6oDQnuVc98UPKRMmua";
    await axios.get(
        IPFS_RAW_DATA
    )
    .then(async (resp) => {
        await res.json(resp.data);
    })
    .catch((err) => {
        console.log(err)
        console.log('ERROR - Problem fetching account data')
    })
};

const getMFAOptions = async (req, res) => {
    const IPFS_MFA_OPTIONS_DATA = "https://ipfs.io/ipfs/Qme1gRURr32Yh8B44b9sVsQASya1SCKSkwz3XtpTH3w6iy";
    await axios.get(
        IPFS_MFA_OPTIONS_DATA
    )
    .then(async (resp) => {
        await res.json(resp.data);
    })
    .catch((err) => {
        console.log(err);
        console.log('ERROR - Problem fetching mfa options')
    })
};

const getCountryCodes = async (req, res) => {
    const IPFS_COUNTRY_CODES_DATA = "https://ipfs.io/ipfs/QmW8TGdgTaJpBPao8NBUV6MSgancy942Zz6Ro5ZykymELD";
    await axios.get(
        IPFS_COUNTRY_CODES_DATA
    )
    .then(async (resp) => {
        await res.json(resp.data);
    })
    .catch((err) => {
        console.log(err);
        console.log('ERROR - Problem fetching country codes')
    })
};

const getCSVFile = async (req, res) => {
    await res.download('data/Ledn_Token_Data.csv', (err) => {
        if (err) {
            console.log(err)
            console.log('ERROR - Problem downloading CSV File')
        } else {
            console.log('SUCCESS: CSV File received by client')
        }
    })
};

module.exports = {
    getTokenHolderData,
    getCountryCodes,
    getMFAOptions,
    getCSVFile
};