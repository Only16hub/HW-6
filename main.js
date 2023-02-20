//Array with currency name and value
currency_value = [];

//constructor function
let ValueItem = function (pName, pValue, pCountry) {
	this.ID = Math.random().toString(16).slice(5);
	this.name = pName;
	this.value = parseFloat(pValue);
	this.country = pCountry;
	this.date = new Date().toLocaleString();
};

let fromconversion;
let toconversion;

document.addEventListener("DOMContentLoaded", function (event) {
	uploadArry();
	loadCurrency1();
	loadCurrency2();

	document.getElementById("fromconvert").addEventListener("click", FromConv);
	document.getElementById("toconvert").addEventListener("click", ToConv);

	document
		.getElementById("currencySwitch")
		.addEventListener("click", CurrencySwitch);

	document
		.getElementById("managechanger")
		.addEventListener("click", ManageSwitch);
});

//uploading the array's information
function uploadArry() {
	//localStorage.clear();

	//check for nay change in array
	if (localStorage.getItem("element")) {
		currency_value = JSON.parse(localStorage.getItem("element"));
	} else {
		//default value
		currency_value.push(new ValueItem("CAD", 1.34, "Canada"));
		currency_value.push(new ValueItem("EUR", 0.92, "European Union"));
		currency_value.push(new ValueItem("AUD", 1.44, "Australia"));
		currency_value.push(new ValueItem("JPY", 13.18, "Japan"));
	}

	console.log(Math.random().toString(16).slice(5));
}

//load array into the html code
function loadCurrency1() {
	currencypicker = document.getElementById("currencypicker");

	//Clear previous list
	currencypicker.innerHTML = "";

	for (i = 0; i < currency_value.length; i++) {
		let opt = document.createElement("option");
		opt.value = currency_value[i].name;
		opt.innerHTML = currency_value[i].name;
		currencypicker.appendChild(opt);
	}

	currencypicker.selectedIndex = -1;
}

//load array into the html code
function loadCurrency2() {
	currencypicker = document.getElementById("currencypicker2");

	//Clear previous list
	currencypicker.innerHTML = "";

	for (i = 0; i < currency_value.length; i++) {
		let opt = document.createElement("option");
		opt.value = currency_value[i].name;
		opt.innerHTML = currency_value[i].name;
		currencypicker.appendChild(opt);
	}

	currencypicker.selectedIndex = -1;
}

//convertation from usd to any currency
function FromConv() {
	let current_currency = document.getElementById("currencypicker");

	if (
		current_currency.selectedIndex != -1 &&
		document.getElementById("usdfrominput").value != ""
	) {
		for (i = 0; i < currency_value.length; i++) {
			if (current_currency.value == currency_value[i].name) {
				fromconversion =
					document.getElementById("usdfrominput").value *
					currency_value[i].value;

				document.getElementById("usdfromoutput").value =
					fromconversion.toFixed(2);

				//Overwrite the old date since we did New convertation
				currency_value[i].date = new Date().toLocaleString();
			}
		}
	} else {
		alert("Enter all information first!");
	}
}

//convertation from any currency to usd
function ToConv() {
	let current_currency = document.getElementById("currencypicker2");

	if (
		current_currency.selectedIndex != -1 &&
		document.getElementById("usdtoinput").value != ""
	) {
		for (i = 0; i < currency_value.length; i++) {
			if (current_currency.value == currency_value[i].name) {
				toconversion =
					document.getElementById("usdtoinput").value / currency_value[i].value;

				document.getElementById("usdtooutput").value = toconversion.toFixed(2);

				//Overwrite the old date since we did New convertation
				currency_value[i].date = new Date().toLocaleString();
			}
		}
	} else {
		alert("Enter all information first!");
	}
}

//switch from one convertation to other
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

	clearHome();
}

//clear all data in home page
function clearHome() {
	document.getElementById("usdfrominput").value = "";
	document.getElementById("usdfromoutput").value = "";
	document.getElementById("usdtoinput").value = "";
	document.getElementById("usdtooutput").value = "";
}

//The most expensive currency
function expensiveCurrency() {
	let expensive = 0;

	for (let i = 0; i < currency_value.length; i++) {
		if (currency_value[i].value > currency_value[expensive].value) {
			expensive = i;
		}
	}

	document.getElementById("inputExpensive").value =
		"Currency: " +
		currency_value[expensive].name +
		" - $" +
		currency_value[expensive].value;
}

//The cheapest currency
function cheapCurrency() {
	let cheap = 0;

	for (let i = 0; i < currency_value.length; i++) {
		if (currency_value[i].value < currency_value[cheap].value) {
			cheap = i;
		}
	}

	document.getElementById("inputCheap").value =
		"Currency: " +
		currency_value[cheap].name +
		" - $" +
		currency_value[cheap].value;
}

//Show all currency
function showAll() {
	let list = document.getElementById("ulAll");

	//Clear previous list
	list.innerHTML = "";

	for (i = 0; i < currency_value.length; i++) {
		let element = document.createElement("li");
		
		element.setAttribute("id", currency_value[i].ID);
		element.setAttribute("class", "wrapper");
		element.innerHTML =
			i + 1 + ". " + currency_value[i].name + " - $" + currency_value[i].value;
		list.appendChild(element);
		element.style.cursor = "pointer";
		$(".wrapper").wrap("<a></a>");

	// Click feature to show info about specific currency
		element.onclick = function() {
			location.href = "#info";
			let infohead = document.getElementById("info_head");
			let infobody = document.getElementById("info_body");
			infohead.innerHTML = "";
			infobody.innerHTML = "";
			
			
			for(i = 0; i < currency_value.length; i++){
				if(element.id == currency_value[i].ID){
			infohead.innerHTML = currency_value[i].country + "'s Currency Info";
			infobody.innerHTML = "Currency Name: " + currency_value[i].name + "<br>" +
				                 "Currency Value: $"	+ currency_value[i].value + "<br>" +	
			                     "Currency's Country: " + currency_value[i].country + "<br>" +
		                         "Date Added: " + currency_value[i].date + "<br>" +
	                             "Currency ID: " + currency_value[i].ID + "<br>"	

				 }
				 
			}
			
		};
	}
}



//Add New Currency
function addCurrency() {
	let name = document.getElementById("nameinput");
	let values = document.getElementById("valueinput");
	let country = document.getElementById("countryinput");

	currency_value.push(
		new ValueItem(
			name.value.toUpperCase(),
			parseFloat(values.value),
			country.value
		)
	);

	loadCurrency1();
	loadCurrency2();

	////save current currency array
	localStorage.setItem("element", JSON.stringify(currency_value));

	//clear iputs
	name.value = "";
	values.value = "";
	country.value = "";
}

//Remove Existing Currency
function removeCurrency() {
	let name = document.getElementById("nameinput2");

	for (var i = 0; i < currency_value.length; i++) {
		if (currency_value[i].name == name.value.toUpperCase()) {
			currency_value.splice(i, 1);
		}
	}
	loadCurrency1();
	loadCurrency2();

	//save current currency array
	localStorage.setItem("element", JSON.stringify(currency_value));

	//clear input
	name.value = "";
}

//Change between Create and Delete mode on Manage page
function ManageSwitch() {
	createCurr = document.getElementById("create");
	deleteCurr = document.getElementById("delete");

	if (deleteCurr.style.display == "none") {
		deleteCurr.style.display = "block";
		createCurr.style.display = "none";
	} else if (createCurr.style.display == "none") {
		createCurr.style.display = "block";
		deleteCurr.style.display = "none";
	}
}
