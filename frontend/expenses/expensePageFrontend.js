
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
    .post('http://127.0.0.1:3000/expense/addexpense', expenseData, {
      headers: { Authorization: userToken },
    })
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

const getExpenses = () => {
  let expenseList = document.getElementById('expenseList');

  const token = localStorage.getItem('userToken');

  axios
    .get('http://127.0.0.1:3000/expense/getexpenses', {
      headers: { Authorization: token },
    })
    .then((records) => {
      console.log(records.data);

      console.log('User status --->',records.data.userStatus);
      console.log('Expenses --->',records.data.expenses);

      const {expenses, userStatus} = records.data;

      const purchaseBtn = document.getElementById('purchaseBtn');
      const br = document.getElementById('br');
      const form = document.getElementById('form');
      const showLeaderBoardButton = document.createElement('button');
      const expense = document.createElement('h2');
      const premiumUserTag = document.createElement('h4');

      if(userStatus === true){
        purchaseBtn.style.display = "none";
        br.style.display = "none";

        expense.innerHTML = 'Expense';
        expense.style.color = 'hotpink';
        premiumUserTag.innerHTML = `You are a Premium User Now.${" "}`;
        premiumUserTag.style.color = 'green';
        showLeaderBoardButton.innerHTML = 'show leaderboard';
        premiumUserTag.append(showLeaderBoardButton);
        premiumUserTag.appendChild(expense);
        form.appendChild(premiumUserTag);

        // leaderBoardFunc();

      }

      expenses.map((record) => {
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

      const leaderBoardFunc = () =>{
        const leaderBoardHeading = document.createElement('h2');
        leaderBoardHeading.innerHTML = 'leader board';
        expenseList.appendChild(leaderBoardHeading);
      }





    })
    .catch((err) => {
      console.log("There's an error while geting the expenses");
      console.log(err);
    });
};

const buyPremiumMembership = (event) => {
  event.preventDefault();

  const userToken = localStorage.getItem('userToken');

  axios
    .get('http://127.0.0.1:3000/purchase/premiumMembership', {
      headers: { 'Authorization': userToken },
    })
    .then((response) => {
      console.log(response);
      const options = {
        key: response.data.key_id,
        order_id: response.data.order.id,

        handler: async(response) => {

          // console.log(response);
          alert('Payment Successful');

         await axios.post('http://127.0.0.1:3000/purchase/updatePremiumStatus',response,{headers : {'Authorization' : userToken}})
          .then(response=>{
            console.log(response)
          })
          .catch(err=>{
            console.log('There\'s an error while updating the premium status.');
            console.log(err);
          })

        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed',(response)=>{
        alert('This step of Payment Failed');
        console.log(response);
      });
      rzp1.open();
    })
    .catch((err) => {
      console.log('Something went wrong');
      console.log(err);
    });
};
