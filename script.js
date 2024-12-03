const URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/BGN_IDR.json"
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };


const dropdowns = document.querySelectorAll("select")

for(select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.value = currCode;
        newOption.innerText = currCode;
        if(select.name == "from" && currCode == "USD"){
            newOption.selected = true;
        }
        if(select.name == "to" && currCode == "INR"){
            newOption.selected = true;
        }
        select.append(newOption)
        
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag = (element)=>{
    // we have to select image present in selects Parent Element
    let image = element.parentElement.querySelector("img");
    // currencyCode of selected Element
    let currency = element.value;
    let code = countryList[currency]

    image.src = `https://flagsapi.com/${code}/flat/64.png`
     
}

let getExchgBtn = document.querySelector("form button")
getExchgBtn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    let input = document.querySelector("input")
    let amount = input.value;
    
    if(amount === "" || amount < 1){
        input.value = 1;
    }
    amount = input.value;
    console.log(amount)
    let fromCurr = document.querySelector(".from select").value;
    let toCurr = document.querySelector(".to select").value;
    currency(fromCurr,toCurr,amount)
}) 

async function currency(fromCurr,toCurr,amount){

    let link = `https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${fromCurr}_${toCurr}.json`
    let data = await fetch(link)
    let obj = await data.json()
    let finalAmount = (1/obj.rate)*amount
    console.log(finalAmount.toFixed(0))
    let res = document.querySelector(".result")
    res.innerText = `${amount} ${fromCurr} = ${finalAmount.toFixed(0)} ${toCurr}`
}
window.onload = ()=>{
    let input = document.querySelector("input")
    input.value = 1;
    currency("USD","INR",1)
}



      