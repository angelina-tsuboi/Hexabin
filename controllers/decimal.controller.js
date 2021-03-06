exports.getDecimalNumber = getDecimalNumber;

function getDecimalNumber(length){
    let power = Math.pow(10, length);
    return Math.floor(Math.random() * power).toString();
}

function isValidDecimal(decimal) {
    let number;
    if(parseInt(decimal)){
        number = parseInt(decimal);
    }else{
        return false
    }
   return decimal % 1 == 0
}

function isValidConversion(conversion){
    if(conversion == "binary" || conversion == "octal" || conversion == "hex"){
        return true;
    }
    return false
}

function convertDecimal(decimal, value){
    if(value == "hex"){
        let hexString = decimal.toString(16).toUpperCase();
        return hexString
    }

    if(value == "binary"){
        let binary = decimal.toString(2);
        return binary
    }

    if(value == "octal"){
        let octal = decimal.toString(8);
        return octal
    }
}


//Get multiple decimal numbers
exports.getDecimalNumbers = function(req, res) {
    let result = {result: [], error: false}
    let amount;
    let length;

    if(req.query.length){
        length = parseInt(req.query.length)

        if(!length){
            result.error = `Invalid argument for length in path: ${req.query.length}`
            res.status(400).send(result)
            return;
        }

    }

    if(req.query.amount){
        amount = parseInt(req.query.amount)

        if(!amount){
            result.error = `Invalid argument for amount in path: ${req.query.amount}`
            res.status(400).send(result)
            return;
        }

        if(amount > 20){
            result.error = "MAX of 20 items"
            res.status(400).send(result)
            return;
        }

    }else{
        amount = 1
    }
    
    let decimalList = []
    for(let i = 0; i < amount; i++){
        let decimalLength = length ? length : Math.floor(Math.random() * 10) + 1;
        decimalList.push(getDecimalNumber(decimalLength))
    }
    result.result = decimalList;

    res.status(200).send(result)
};

//Convert decimal to another value
exports.convertDecimalTo = function(req, res) {
    let result = {result: "", error: false}

    if(req.params.decimal){
        //check if decimal is valid
        if(isValidDecimal(req.params.decimal)){
            if(isValidConversion(req.params.value)){
                let decimal = parseInt(req.params.decimal)
                result.result = convertDecimal(decimal, req.params.value)
                res.status(200).send(result);
                return;
            }else{
                result.status(400).error = `Conversion value in path: ${req.params.value} is not valid`
                res.send(result);
                return;
            }
        }else{
            result.error = `Decimal value in path: ${req.params.decimal} is not valid`
            res.status(400).send(result);
            return;
        }

    }else{
        result.error = "No value for decimal in path"
        res.status(400).send(result);
        return;
    }
};


