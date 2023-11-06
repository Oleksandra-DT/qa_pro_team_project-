"use strict";
/**
 Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
 Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
 яке зберігається в цьому полі.
 */

 let fineNumber = document.getElementById("fineNumber");
 let passport = document.getElementById("passport");
 let creditCardNumber = document.getElementById("creditCardNumber");
 let cvv = document.getElementById("cvv");
 let amount = document.getElementById("amount");
 let buttonSubmit = document.getElementById("payFine");




/**
 Вам необхідно реалізувати наступний функціонал.
 Зробити валідацію до всіх полів
 1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
 alert "Номер не співпадає" або "Сума не співпадає"

 2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
 Якщо не співпадає то видавати alert "Не вірний паспортний номер"

 3. Номер кредитної карки 16 цифр -
 якщо не співпадає то видавати alert "Не вірна кредитна картка"

 4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

 Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine() {
 //Звертаючись до властивості finesData ви отримуєте всі дані з файлу data.js
     const fineObj = data.finesData.find(fine => fineNumber.value === fine.номер)
 if (!fineNumber.value || !passport.value || !creditCardNumber.value || !cvv.value || !amount.value) {
  alert("Будь ласка, заповніть всі поля");
  return false;
 }
 if(!fineObj) {
     alert('Номер не співпадає')
    }
 if (!isValidPassport(passport.value)) {
  alert("Не вірний паспортний номер");
  return false;
 }
 if (!isValidCreditCardNumber(creditCardNumber.value)) {
  alert("Не вірна кредитна картка");
  return false;
 }
 if (!isValidCvv(cvv.value)) {
  alert("Не вірний cvv");
  return false;
 }
 if(fineObj['сума'] !== parseInt(amount.value)) {
     alert('Сума не співпадає')
    }
 else {
  for (let row in data.finesData) {
   if (data.finesData[row]['номер'] === fineNumber.value) {
    let currentIndex = parseInt(row)
    data.finesData.splice(currentIndex, 1)
   }
  }
  console.log(data.finesData)
 }
}
 function isValidPassport(passport) {
  let re = /^[А-ЯЄІЇҐ]{2}[0-9]{6}$/;
  return re.test(String(passport))
 }

 function isValidCreditCardNumber(creditCardNumber) {
  let re = /^[0-9]{16}$/;
  return re.test(String(creditCardNumber))
 }

 function isValidCvv(cvv) {
  let re = /^[0-9]{3}$/;
  return re.test(String(cvv));
 }


