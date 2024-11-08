var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {
  showTab(currentTab);
  document.getElementById("currency").addEventListener("change", displayRates);
  document
    .getElementById("exchangeOption")
    .addEventListener("change", displayExchangeForm);
});

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("submitBtn").style.display = inline;
    document.getElementById("nextBtn").style.display = "none";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("submitBtn").style.display = "none";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("nextprevious").style.display = "none";
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("text-message").style.display = "block";
  }

  var currencyRate = document.getElementById("currency-rate");
  var exchangeForm = document.getElementById("exchange-form");
  var exchangeOption = document.getElementById("exchangeOption").value;
  if (currentTab == 1) {
    currencyRate.style.display = "none";
    if (exchangeOption == "buy" || exchangeOption == "sell") {
      exchangeForm.style.display = "block";
    }
  } else if (currentTab == 0) {
    currencyRate.style.display = "block";
    exchangeForm.style.display = "none";
  } else {
    currencyRate.style.display = "none";
    exchangeForm.style.display = "none";
  }

  showTab(currentTab);
}

function validateForm() {
  if (currentTab == 0) {
    var currency = document.getElementById("currency").value;
    if (currency == "") {
      alert("Select a currency.");
      return false;
    }
  } else if (currentTab == 1) {
    var exchangeOption = document.getElementById("exchangeOption").value;
    if (exchangeOption == "") {
      alert("Select an exchange option.");
      return false;
    }
    var amount = document.getElementById("baht").value;
    if (amount == "") {
      alert("Enter an amount.");
      return false;
    }
  }
  return true;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function displayRates() {
  var currencyRate = document.getElementById("currency-rate");
  var currency = document.getElementById("currency").value;
  var currencyID = currency.split(" ")[0];
  var url = "/get-currency-rate/" + currencyID;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    document.getElementById("buyRate").innerHTML = " 1 THB = " + data.buyRate + " " + currencyID;
    document.getElementById("sellRate").innerHTML = " 1 " + currencyID + " = " + data.sellRate + " THB";
  });

  if (
    currencyRate.style.display == "" ||
    currencyRate.style.display == "none"
  ) {
    currencyRate.style.display = "block";
  }
}

function displayExchangeForm() {
  var exchangeForm = document.getElementById("exchange-form");
  if (
    exchangeForm.style.display == "" ||
    exchangeForm.style.display == "none"
  ) {
    exchangeForm.style.display = "block";
  }
}