const next = document.createElement('button');
const last = document.createElement('button');

next.addEventListener('click',()=>{
      count +=5;
      console.log(count);

      axios
      .get(`http://127.0.0.1:3000/expense/getexpenses/${count}`, {
        headers: { Authorization: token },
      })
      .then(records=>{
       
        expenseList.style.display = 'none';

        const ol = document.createElement('ol');
        const li = document.createElement('li');
        li.innerHTML = 'cool';
        form.appendChild(ol);
        ol.appendChild(li);
    })
      .catch(err=>{
        console.log('There\'s an error while getting the expenses from the server');
        console.log(err);
      })
    })


    next.innerHTML = 'next';
    last.innerHTML = 'last';
        
    last.style.position = "relative";
    last.style.right = "-2rem";


    containerForPaginatingExpenses.appendChild(next);
    containerForPaginatingExpenses.appendChild(last);