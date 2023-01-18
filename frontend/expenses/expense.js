window.onload = (event) => {
  console.log('page refreshed.');
};

const addExpense = (event) => {
  event.preventDefault();
  let amount = document.getElementById('amount');
  let description = document.getElementById('description');
  let category = document.getElementById('category');
  let expenseList = document.getElementById('expenseList');

  let expenseItem = document.createElement('li');
  let br = document.createElement('br');

  amount = amount.value;
  description = description.value;
  category = category.value;

  const expenseData = {
    amount,
    description,
    category,
  };

  // console.log(expenseData);
  axios
    .post('http://127.0.0.1:3000/expense/addexpense', expenseData)
    .then((response) => {
      console.log(response.data);

      if(response.data.length > 0){
        expenseItem.innerHTML = `${amount} - ${description} - ${category}`;
        expenseList.appendChild(expenseItem);
        expenseItem.appendChild(br);
      }
      
    //   response.data.map((expense) => {
    //     expenseItem.innerHTML = `${expense.id} - ${expense.amount} - ${expense.description} - ${expense.category}`;
    //     // console.log(expenseItem);
    //     expenseList.appendChild(expenseItem);
    //     expenseItem.appendChild(br);
    //     console.log(expenseList);
    //   });
    })
    .catch((err) => console.log(err));
};

const fun = () => {
  console.log('just for fun.');
};
