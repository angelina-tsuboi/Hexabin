var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("activeBar");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

let sendRequestBtn = document.getElementById('send-request');
let resetFormBtn = document.getElementById('reset-form');
let codeValue = document.getElementById('code-value');
let url = document.getElementById('url');
let amount = document.getElementById('amount-value');
let length = document.getElementById('length-value');
let textArea = document.getElementById('resultTextArea');
let urlValue;

let result = {format: "Binary", amount: 1, length: ""};

resetFormBtn.addEventListener('click', function(){
  amount.value = "1";
  length.value = "";
  codeValue.value = "Binary";
  length.classList.remove("warning")
  amount.classList.remove("warning")
  result = {format: "Binary", amount: 1, length: ""};
  updateURL()
})

function updateURL(){
  urlValue = "http://localhost:8081/api/"
  urlValue += `${(result.format).toLowerCase()}`;
  console.log(result.format)
  if(result.amount > 1){
    urlValue += `?amount=${result.amount}`;
    
    if(result.length != ""){
      urlValue += `&length=${result.length}`;
    }
  }else{
    if(result.length != ""){
      urlValue += `?length=${result.length}`;
    }
  }
  url.innerText = "URL: " + urlValue
}

sendRequestBtn.addEventListener('click', function(){
  updateURL()
  console.log(urlValue)
  fetch(urlValue)
  .then(res => res.json())
  .then((out) => {
    let textedJSON = JSON.stringify(out);
    textArea.innerText = textedJSON;
  })
  .catch(err => { throw err });
})

codeValue.addEventListener('change', function(){
  result.format = codeValue.value
  updateURL();
})

amount.addEventListener('change', function(){
  let value = parseInt(amount.value);
  if(value < 1 || value > 20){
    amount.classList.add("warning")
  }else{
    amount.classList.remove("warning")
    result.amount = value
  }
  updateURL();
})

length.addEventListener('change', function(){
  let value = parseInt(length.value);
  if(value < 1){
    length.classList.add("warning")
  }else{
    length.classList.remove("warning")
    result.length = value
  }
  updateURL();
})


