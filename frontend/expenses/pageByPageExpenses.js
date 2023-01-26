const box = document.getElementById('box');
const userToken = localStorage.getItem('userToken');

const clickmeBtn = document.createElement('button');
clickmeBtn.innerHTML = 'click me';

box.appendChild(clickmeBtn);
const expenseList = document.createElement('ol');

const customExpenseBtn = document.createElement('button');
customExpenseBtn.innerHTML = 'Enter the custom number to see the expenses';

customExpenseBtn.style.position = 'relative';
customExpenseBtn.style.left = '1rem';

box.appendChild(customExpenseBtn);

customExpenseBtn.addEventListener('click',()=>{
    // console.log('ok');
    window.location.href = './customExpenses.html';
})


let count = -10;

const pageNum = ()=>{
    axios.get(`http://127.0.0.1:3000/expense/getexpensesPerPage/${count}`,{headers : {'Authorization' : userToken}})
    .then(records=>{
        console.log(records.data);
        // const br = document.createElement('br');

        records.data.expenses.map(expense=>{
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `${expense.amount} - ${expense.description} - ${
                expense.category
              } ${''}`;
            expenseList.appendChild(expenseItem);
            box.appendChild(expenseList);
            // expenseItem.append(br);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}



clickmeBtn.addEventListener('click',(event)=>{
    count += 10;
    event.preventDefault();

    pageNum();

})

window.onload = ()=>{
    console.log('reloading...');
    // pageNum();
}