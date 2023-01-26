
const customExpense = () =>{
    event.preventDefault();
    // console.log('ok');

    let numExpenses = document.getElementById('numExpenses');

    const expenseList = document.createElement('ol');

    const form = document.getElementById('form');

    form.appendChild(expenseList);

    let count = numExpenses.value;

    console.log(count);

    let userToken = localStorage.getItem('userToken');
    console.log(userToken);

    // console.log(count);

    localStorage.setItem('customExpenseCount',count);

    axios.get(`http://127.0.0.1:3000/expense/customExpense/${count}`,{headers : {'Authorization' : userToken}})
    // axios.get('/')
    .then(records=>{
        console.log(records);

        records.data.expenses.map(expense=>{
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `${expense.amount} - ${expense.description} - ${
                expense.category
              } ${''}`;
            expenseList.appendChild(expenseItem);
            // box.appendChild(expenseList);
            // expenseItem.append(br);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

window.onload = (event)=>{
    event.preventDefault();
    console.log('page refreshed');
    const count = localStorage.getItem('customExpenseCount');
    let userToken = localStorage.getItem('userToken');
    const expenseList = document.createElement('ol');
    const form = document.getElementById('form');

    form.appendChild(expenseList);


    // customExpense(count);

    axios.get(`http://127.0.0.1:3000/expense/customExpense/${count}`,{headers : {'Authorization' : userToken}})
    // axios.get('/')
    .then(records=>{
        console.log(records);

        records.data.expenses.map(expense=>{
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `${expense.amount} - ${expense.description} - ${
                expense.category
              } ${''}`;
            expenseList.appendChild(expenseItem);
            // box.appendChild(expenseList);
            // expenseItem.append(br);
        })
    })
    .catch(err=>{
        console.log(err);
    })

}
