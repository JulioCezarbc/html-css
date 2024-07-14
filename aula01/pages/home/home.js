function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../../index.html";
    }).catch(() =>{
        alert("Erro ao fazer logout");
    })
}
findTransactions();

function findTransactions(){
    firebase.firestore().collection('transactions').get().then(snapshot =>{
        const transactions = snapshot.docs.map(doc => doc.data());
        addTransactionsToScreen(transactions);
    })
}
function addTransactionsToScreen(transactions){
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transactions => {
        const li = document.createElement('li');
        li.classList.add(transactions.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transactions.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transactions.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transactions.transactionType;
        li.appendChild(type);

        if(transactions.description){
            const description = document.createElement('p');
            description.innerHTML = transactions.description;
            li.appendChild(description);
        }


        orderedList.appendChild(li);
    });
}
function formatDate(date){
    return new Date(date).toLocaleDateString('pt-br');
}
function formatMoney(money){
    return `${money.currency} ${money.value.toFixed(2)}`
    
}