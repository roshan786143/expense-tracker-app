
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
    .then((record) => {
      // console.log(response.data);

      console.log('my new record is -->');
      console.log(record.data);

      const {id, amount, description, category} = record.data;

      expenseItem.innerHTML = `${amount} - ${description} - ${category}`;

      expenseList.appendChild(expenseItem);
      expenseList.appendChild(br);

    })
    .catch((err) => console.log(err));
};

const fun = () => {
  console.log('just for fun.');
};

window.onload = (event) => {
  console.log('page refreshed.');

  let expenseList = document.getElementById('expenseList');

  axios.get('http://127.0.0.1:3000/expense/getexpenses').
  then(records=>{
    console.log(records.data);
    records.data.map(record=>{
      let expenseItem = document.createElement('li');
      expenseItem.innerHTML = `${record.id} - ${record.amount} - ${record.description} - ${record.category}`;
      expenseList.appendChild(expenseItem);
  })
})
  .catch(err=>console.log(err))

};