// DOM access variable

let totalAmountField = document.getElementById('totalAmountField');
let productTitleField = document.getElementById('productTitleField');
let productAmountField = document.getElementById('productAmountField');
let setBudgetButton = document.getElementById('setBudget');
let checkAmount = document.getElementById('checkAmount');
let totalBudgetText = document.getElementById('totalBudget');
let balanceText = document.getElementById('balance');
let TotalExpenseText = document.getElementById('totalExpense');
let errMsg1 = document.getElementById('errMsg1');
let errMsg2 = document.getElementById('errMsg2');
let errMsg3 = document.getElementById('errMsg3');


// items list 
let arr = [];

// balance // budget // expenses
let totalbudget = null;
let totalBalance = null;
let Expenses = null;


// id
let id = 0;
const generateId = () => {
    id = id + 1;
}


// function to delete items
const deleteItems = (event) => {
    let index = parseInt(event.target.getAttribute('data-index'));
    arr.splice(index, 1);
    renderList();
    totalExpense();
}


// function to edit items
const editItems = (event) => {

    let index = parseInt(event.target.getAttribute('data-index'));
    if (event.target.classList.contains('fa-edit')) {
        productTitleField.value = arr[index].productTitle;
        productAmountField.value = arr[index].expenseAmount;
        arr.splice(index, 1);
        renderList();
        totalExpense();
        checkAmount.textContent = 'Edit';
        return;
    }

    if (checkAmount.textContent === 'Edit') {
        arr.push({
            productTitle: productTitleField.value,
            expenseAmount: Number(productAmountField.value)
        });
        checkAmount.textContent === 'Check Amount';
        return;
    }

}


// budget handler
const budget = () => {
    if (!totalAmountField.value) {
        errMsg1.style.display = 'block';
        return;
    }
    errMsg1.style.display = 'none';
    totalbudget += Number(totalAmountField.value.trim());
    totalBalance += Number(totalAmountField.value.trim());
    totalBudgetText.textContent = `$ ${totalbudget}`;
    balanceText.textContent = `$ ${totalbudget}`;
}


// expense handler
const expense = () => {
    let title = productTitleField.value;
    let amount = Number(productAmountField.value);
    if (!totalBalance || totalBalance == null || Number(productAmountField.value) > totalBalance) {
        errMsg3.style.display = 'block';
        return;
    }

    if (!title || !amount) {
        errMsg2.style.display = 'block';
        return;
    }

    if (title && amount) {
        arr.push({
            id: id,
            productTitle: title,
            expenseAmount: amount
        });
        productTitleField.value = '';
        productAmountField.value = '';
        generateId();
        renderList();
    }
    errMsg2.style.display = 'none';
    errMsg3.style.display = 'none';
}


// renderlist in arrays
const renderList = () => {
    const result = document.getElementById('resultDiv');
    result.innerHTML = '<span>Expense List</span>';
    let ul = document.createElement('ul');
    ul.classList.add('ulContainer');
    ul.innerHTML = ' '
    arr.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${item.productTitle}</span><span>$${item.expenseAmount}</span><span><i class = 'fa-solid fa-trash delete-btn' data-index = '${index}'></i><i class = 'fa-solid fa-edit' data-index = '${index}' ></i></span>`;
        ul.appendChild(li);
        result.appendChild(ul);
    });
    const deleteBtn = document.querySelectorAll('.fa-trash');
    const editBtn = document.querySelectorAll('.fa-edit');
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            deleteItems(event);
        });
    });
    editBtn.forEach(item => {
        item.addEventListener('click', (event) => {
            editItems(event)
        });
    });
};

const totalExpense = () => {
    Expenses = arr.reduce((amount, item) => {
        return amount + item.expenseAmount;
    }, 0);
    TotalExpenseText.textContent = `$ ${Expenses}`;
    balanceText.textContent = `$ ${totalBalance - Expenses}`;
};

setBudgetButton.addEventListener('click', (event) => {
    event.preventDefault();
    budget();
});

checkAmount.addEventListener('click', (event) => {
    event.preventDefault();
    expense();
    totalExpense();
});

// calling functions
renderList();
totalExpense();
