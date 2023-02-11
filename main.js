//Array with currency name and value
currency_value = [
	["CAD", 1.34],
	["EUR", 0.92],
	["AUD", 1.44],
	["JPY", 131.18],
];

let fromconversion;
let toconversion;

document.addEventListener("DOMContentLoaded", function (event) {
	loadCurrency1();
	loadCurrency2();

	document.getElementById("fromconvert").addEventListener("click", FromConv);
	document.getElementById("toconvert").addEventListener("click", ToConv);

	document
		.getElementById("currencySwitch")
		.addEventListener("click", CurrencySwitch);
});

//load array into the html code
function loadCurrency1() {
	currencypicker = document.getElementById("currencypicker");

	for (i = 0; i < currency_value.length; i++) {
		let opt = document.createElement("option");
		opt.value = currency_value[i][0];
		opt.innerHTML = currency_value[i][0];
		currencypicker.appendChild(opt);
	}
}

//load array into the html code
function loadCurrency2() {
	currencypicker = document.getElementById("currencypicker2");

	for (i = 0; i < currency_value.length; i++) {
		let opt = document.createElement("option");
		opt.value = currency_value[i][0];
		opt.innerHTML = currency_value[i][0];
		currencypicker.appendChild(opt);
	}
}

function FromConv() {
	let current_currency = document.getElementById("currencypicker");

	for (i = 0; i < currency_value.length; i++) {
		if (current_currency.value == currency_value[i][0]) {
			fromconversion =
				document.getElementById("usdfrominput").value * currency_value[i][1];

			document.getElementById("usdfromoutput").value =
				fromconversion.toFixed(2);
		}
	}
}

function ToConv() {
	let current_currency = document.getElementById("currencypicker2");

	for (i = 0; i < currency_value.length; i++) {
		if (current_currency.value == currency_value[i][0]) {
			toconversion =
				document.getElementById("usdtoinput").value / currency_value[i][1];

			document.getElementById("usdtooutput").value = toconversion.toFixed(2);
		}
	}
}

function CurrencySwitch() {
	from = document.getElementById("from");
	to = document.getElementById("to");

	if (to.style.display == "none") {
		to.style.display = "block";
		from.style.display = "none";
	} else if (from.style.display == "none") {
		from.style.display = "block";
		to.style.display = "none";
	}
}

//The most expensive currency
function expensiveCurrency() {
	let expensive = 0;

	for (let i = 0; i < currency_value.length; i++) {
		if (currency_value[i][1] > currency_value[expensive][1]) {
			expensive = i;
		}
	}

	document.getElementById("inputExpensive").value =
		"Currency: " +
		currency_value[expensive][0] +
		" - $" +
		currency_value[expensive][1];
}

//The cheapest currency
function cheapCurrency() {
	let cheap = 0;

	for (let i = 0; i < currency_value.length; i++) {
		if (currency_value[i][1] < currency_value[cheap][1]) {
			cheap = i;
		}
	}

	document.getElementById("inputCheap").value =
		"Currency: " + currency_value[cheap][0] + " - $" + currency_value[cheap][1];
}

//Show all currency
function showAll() {
	let list = document.getElementById("ulAll");

	//Clear previous list
	list.innerHTML = "";

	for (i = 0; i < currency_value.length; i++) {
		let element = document.createElement("li");
		element.innerHTML =
			i + 1 + ". " + currency_value[i][0] + " - $" + currency_value[i][1];
		list.appendChild(element);
	}
}
