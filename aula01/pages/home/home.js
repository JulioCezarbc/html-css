function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../../index.html";
    }).catch(() =>{
        alert("Erro ao fazer logout");
    })
}

firebase.auth().onAuthStateChanged( user =>{
    if(user){
        findTransactions(user);
    }
})
function newTransaction(){
    showLoading();
    window.location.href = "../transaction/transaction.html";
}
function findTransactions(user){
    showLoading();
    firebase.firestore().collection('transactions').where('user.uid', '==', user.uid).orderBy('date','desc').get().then(snapshot =>{
        hideLoading();
        const transactions = snapshot.docs.map(doc => doc.data());
        addTransactionsToScreen(transactions);
    }).catch(error =>{
        hideLoading();
        console.log(error);
        alert('Erro ao recuperar transações');
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