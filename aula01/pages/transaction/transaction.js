if(!isNewTransaction()){
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}
function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}
function isNewTransaction(){
    return getTransactionUid() ? false : true;
}
function findTransactionByUid(uid){
    showLoading();

    transactionService.findByUid(uid)
        .then(transaction =>{
            hideLoading();
            if(transaction){
                fillTransactionScreen(transaction);
                toggleSaveButtonDisable();
            }else{
                alert("Documento nao encontrado");
                window.location.href = "../home/home.html";
            }
        })
        .catch(() =>{
            hideLoading();
            alert("Erro ao recuperar documento");
            window.location.href = "../home/home.html";
        });
}
function fillTransactionScreen(transaction){
    if(transaction.type == "expense"){
        form.typeExpense().checked = true;
    }else{
        form.typeIncome().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transaction().value = transaction.transactionType;

    if(transaction.description){
        form.description().value = transaction.description;
    }

}
function saveTransaction(){
    const transaction = createTransaction();
    
    if(isNewTransaction()){
        save(transaction);
    }else{
        update(transaction);
    }
}
function save(transaction){
    showLoading();
    
    transactionService.save(transaction)
        .then(()=>{
            hideLoading();
            window.location.href = "../home/home.html";
        }).catch(()=>{
            hideLoading();
            alert('Error ao salvar transação');
        });
}
function update(transaction){
    showLoading();
   
    transactionService.update(transaction)
        .then(() =>{
            hideLoading();
            window.location.href = "../home/home.html";
        }).catch(()=>{
            hideLoading();
            alert('Error ao atualizar transação');
        });
}
function createTransaction(){
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transaction().value,
        description: form.description().value,
        user:{
            uid: firebase.auth().currentUser.uid
        }
    };
}
function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../../index.html";
    }).catch(() =>{
        alert("Erro ao fazer logout");
    })
}

function onChangeDate(){
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable()
}
function onChangeValue(){
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueInvalidError().style.display = value <= 0 ? "block" : "none";

    toggleSaveButtonDisable()
}
function onChangeTransactionType(){
    const transaction = form.transaction().value;
    form.transactionRequiredError().style.display = !transaction ? "block" : "none";

    toggleSaveButtonDisable()
}

function toggleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid();
}
function isFormValid(){
    const date = form.date().value;
    if(!date){
        return false;
    }
    const value = form.value().value;
    if(!value || value <= 0){
        return false;
    }
    const transaction = form.transaction().value;
    if(!transaction){
        return false;
    }
    return true;
}
const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),

    description: () => document.getElementById('description'),

    currency: () => document.getElementById('currency'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueInvalidError: () => document.getElementById('value-invalid-error'),

    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),

    transaction: () => document.getElementById('transaction-type'),
    transactionRequiredError: () => document.getElementById('transaction-required-error'),
    saveButton: () => document.getElementById('save-button')
}