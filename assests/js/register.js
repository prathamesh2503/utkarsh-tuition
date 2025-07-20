document.addEventListener('DOMContentLoaded', function () {

  
// Add validatation to registration form.

const registrationForm =  document.querySelector('#registration-form')
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const addressInput = document.querySelector('#address');
const emailInput = document.querySelector('#email-id');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const address = addressInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim()
  const namePattern =  /^[A-Za-z]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if(firstName === '' )
    {
      alert('Empty value, special character & numbers is not allowed for first name!')
      firstNameInput.focus();
      return;
    }
    if (!namePattern.test(firstName))
    {
      alert('Empty value, special character & numbers is not allowed for first name!')
      firstNameInput.focus();
      return;
    }
    if(lastName === '' )
    {
      alert('Empty value, special character & numbers is not allowed for last name!')
      firstNameInput.focus();
      return;
    }
   if(!namePattern.test(lastName))
    {
      alert('Empty value, special character & numbers is not allowed for last name!')
      lastNameInput.focus();
      return;
    }
    if(address === '')
    {
      alert('Empty value is not allowed for address!')
      addressInput.focus();
      return;
    }
     if(email === '')
    {
      alert('Empty value is not allowed for email!')
      emailInput.focus();
      return;
    }
    if(!emailPattern.test(email))
    {
      alert('Empty value is not allowed for email. Input correct format of email id!')
      emailInput.focus();
      return;
    }

     if(password === '')
    {
      alert('Empty value is not allowed for password!')
      passwordInput.focus();
      return;
    }

    if(!passwordPattern.test(password))
    {
      alert(`Input correct format of password!
        At least one lowercase letter
        At least one uppercase letter
        At least one digit
        At least one special character (e.g., !@#$%^&*)
        Minimum 8 characters`)
      passwordInput.focus();
      return;
    }
    if(confirmPassword === '')
    {
      alert('Empty value is not allowed for confirm password!')
      confirmPasswordInput.focus();
      return;
    }

    if(!passwordPattern.test(confirmPassword))
    {
       alert(`Input correct format of confirm password!
        At least one lowercase letter
        At least one uppercase letter
        At least one digit
        At least one special character (e.g., !@#$%^&*)
        Minimum 8 characters`)
      confirmPasswordInput.focus();
      return;
    }

    if(password === confirmPassword)
    {
      const formData = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }

      localStorage.setItem('registrationData', JSON.stringify(formData));
      window.location.href = 'login.html'
      return;
    } else {
      alert("Password & confirm password not matched.");
      return;
    }

})



})