
const addExpense = (event) => {
  event.preventDefault();
  let amount = document.getElementById('amount');
  let description = document.getElementById('description');
  let category = document.getElementById('category');
  let expenseList = document.getElementById('expenseList');
  let delBtn = document.createElement('button');

  delBtn.innerHTML = 'Delete Expense';

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

  const userToken = localStorage.getItem('userToken');

  axios
    .post('http://127.0.0.1:3000/expense/addexpense', expenseData, {headers : {'Authorization' : userToken}})
    .then((record) => {

      console.log('my new record is -->');
      console.log(record.data);

      const { id, amount, description, category } = record.data;

      expenseItem.innerHTML = `${amount} - ${description} - ${category} ${''}`;

      expenseItem.append(delBtn);

      expenseList.appendChild(expenseItem);
      expenseList.appendChild(br);

      delBtn.addEventListener('click', (event) => {
        console.log('The requested id is', id);

        axios
          .delete(`http://127.0.0.1:3000/expense/delete-expense/${id}`)
          .then((response) => {

            expenseList.removeChild(expenseItem);

            console.log(response);
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
};

window.onload = (event) => {
  console.log('page refreshed.');

  getExpenses();

};


const getExpenses = () =>{
  let expenseList = document.getElementById('expenseList');

const token = localStorage.getItem("userToken");

axios.get('http://127.0.0.1:3000/expense/getexpenses',{headers : {'Authorization' : token}})
    .then((records) => {
      console.log(records.data);
      
      records.data.map((record) => {
        let expenseItem = document.createElement('li');
        expenseItem.innerHTML = `${record.amount} - ${record.description} - ${
          record.category
        } ${''}`;
        let delBtn = document.createElement('button');
        delBtn.innerHTML = 'Delete Expense';
        expenseItem.append(delBtn);
        expenseList.appendChild(expenseItem);

        delBtn.addEventListener('click', () => {
          console.log(`${record.id} - deleted successfully`);

          axios
            .delete(`http://127.0.0.1:3000/expense/delete-expense/${record.id}`)
            .then((response) => {
              console.log(response);
              expenseList.removeChild(expenseItem);
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => {
    console.log('There\'s an error while geting the expenses');
    console.log(err)
    });
}
