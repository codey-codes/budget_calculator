const dollarFormat = num => {    // as the name suggests, this function returns the passed number in dollar format with commas and no decimals (movie budget and revenue are not passed in decimals so no need to display decimals)

    if (num === 0) return '$0.00';

    num = Math.abs(num);
    let billion = '';
    let million = Math.floor(num / 1000000);
    let thousand = Math.floor(num / 1000);
    let hundred = Math.floor((num / 100) % 10);
    let ten = Math.floor((num / 10) % 10);
    let unit = Math.floor(num % 10);
    let dec = num.toFixed(2).split('.');

    if (num >= 1000) {
        if (million >= 1000) {
            billion = Math.floor(num / 1000000000);
            billion /= 1000;
            billion = ((Math.floor(billion * 10) % 10) === 0 ? "" : (Math.floor(billion * 10) % 10))
            + "" + 
            ((Math.floor(billion * 100) % 10 === 0 && Math.floor(billion * 10) % 10 === 0) ? "" : Math.floor(billion * 100) % 10)
            + "" +
            (Math.floor(billion * 1000) % 10) + ",";
        }

        if (thousand >= 1000) {
            million /= 1000;
			if (million >= 1) million = (Math.floor(million * 10) % 10) + "" + (Math.floor(million * 100) % 10) + "" + (Math.floor(million * 1000) % 10) + ",";
            else million = 
                ((Math.floor(million * 10) % 10) === 0 ? "" : (Math.floor(million * 10) % 10))
                + "" +
                ((Math.floor(million * 100) % 10 === 0 && Math.floor(million * 10) % 10 === 0) ? "" : Math.floor(million * 100) % 10)
                + "" +
                (Math.floor(million * 1000) % 10) + ",";
        } else million = '';

        thousand /= 1000;
        if (thousand >= 1) thousand = (Math.floor(thousand * 10) % 10) + "" + (Math.floor(thousand * 100) % 10) + "" + (Math.floor(thousand * 1000) % 10) + ",";
        else thousand = 
            ((Math.floor(thousand * 10) % 10) === 0 ? "" : (Math.floor(thousand * 10) % 10))
            + "" +
            ((Math.floor(thousand * 100) % 10 === 0 && Math.floor(thousand * 10) % 10 === 0) ? "" : Math.floor(thousand * 100) % 10)
            + "" +
            (Math.floor(thousand * 1000) % 10) + ",";

        return `$${billion}${million}${thousand}${hundred}${ten}${unit}.${dec[1]}`;
    } else return "$" + num.toFixed(2);
};

let outCounter = 1, inCounter = 1, type, amountValue, expensePercent = 0, totalIncome = 0, totalExpenses = 0, netAmount = 0, descriptionValue;

document.getElementById('btn-submit').addEventListener('click', click => {
    click.preventDefault(); 

    const inTable = document.getElementById('income-table');
    const outTable = document.getElementById('expenses-table');
    let rowNewIncome, rowNewExpenses;
    
    descriptionValue = document.getElementById('description').value;
    amountValue = parseFloat(document.getElementById('amount').value);

    type = document.getElementById('income-or-expense').value;

    if (amountValue) {
        if (type === "0") {
            window.alert("Please select type!");
            return;
         } else if (type === "+") {
            totalIncome += amountValue;  
            incomeTable();
        } else if (type === "-") {
            totalExpenses += amountValue;
            expensesTable();
        }

        netAmount = totalIncome - totalExpenses;

        if (netAmount < 0) {
            document.getElementById('net-result').textContent = "-";
        } else if (netAmount >= 0) {
            document.getElementById('net-result').textContent = "+";
        }
    
        if (totalIncome === 0) expensePercent = 100;
        else expensePercent = (totalExpenses / totalIncome) * 100;
    
        document.getElementById('net-amount').textContent = dollarFormat(netAmount);
        document.getElementById('total-income').textContent = dollarFormat(totalIncome);
        document.getElementById('total-expenses').textContent = dollarFormat(totalExpenses);
        document.getElementById('expenses-percent').textContent = expensePercent.toFixed(2) + "%";
        function incomeTable() {
            rowNewIncome = inTable.insertRow(-1);   // -1 adds new row to the last
            rowNewIncome.insertCell(0).innerHTML = inCounter;
            rowNewIncome.insertCell(1).innerHTML = descriptionValue;
            rowNewIncome.insertCell(2).innerHTML = dollarFormat(amountValue);
            inCounter++;
        }
        function expensesTable() {
            rowNewExpenses = outTable.insertRow(-1);
            rowNewExpenses.insertCell(0).innerHTML = outCounter;
            rowNewExpenses.insertCell(1).innerHTML = descriptionValue;
            rowNewExpenses.insertCell(2).innerHTML = dollarFormat(amountValue);
            outCounter++;
        }
    } else window.alert('Please enter a valid number in \'Amount\' field');
});






