document.addEventListener('DOMContentLoaded', displayStudentData)

const addStudentSubmitButton = document.querySelector('#add-student-form');   

  addStudentSubmitButton.addEventListener('submit', function (e) {
    e.preventDefault();

    const studentImageInput =  document.querySelector('#student-image');
    const studentNameInput = document.querySelector('#student-name');
    const studentClassInput = document.querySelector('#student-class');
    const achievementYearInput = document.querySelector('#achievement-year');
    const studentPercentageInput = document.querySelector('#percentage');
  
    const studentImage = studentImageInput;
    const studentName = studentNameInput.value.trim();
    const studentClass = studentClassInput.value;
    const achievementYear = achievementYearInput.value;
    const studentPercentage = studentPercentageInput.value;
    const namePattern =  /^[A-Za-z]+( [A-Za-z]+)+$/;
    const percentagePatttern = /^\d+(\.\d{1,2})?$/;
    
    if(studentImage.value === '') {
      alert("Please upload image with size below 500KB.")
      return;
    }
    const file = studentImage.files[0];
    if(file.size > 500000 ) {
      alert("Please select image size lesser 500KB");
      studentImage.value = "";
      return;
    }

    if(studentName === '')
    {
      alert('Student name will not allow empty value!');
      return;
    }
    if(!namePattern.test(studentName))
    {
      alert('Please input correct name!');
      studentNameInput.focus();
      return;
    }
  
    if(studentClass === '')
    {
      alert('Please select student class.');
      return;
    }
     if(achievementYear === '')
    {
      alert('Please select Achievement Year.');
      return;
    }

    if(studentPercentage === '')
    {
      alert('Please input percentage number!');
      return;
    }
    const percentageNumericValue = parseFloat(studentPercentage)
    if(percentageNumericValue === '')
    {
      alert('Please enter student percentage');
      studentPercentageInput.focus();
    }
    if(!percentagePatttern.test(percentageNumericValue))
    {
      alert('Enter correct percentage value!');
      studentPercentageInput.focus();

    }
    if(percentageNumericValue > 100)
    {
      alert('Percentage greater than 100 is not allowed.')
      studentPercentageInput.focus();
    }
    
    const reader = new FileReader();
    reader.onload = function (event) {
      const Base64String = event.target.result;
        const studentData = {
        studentImage: Base64String,
        studentName: studentName,
        studentClass: studentClass,
        achievementYear: achievementYear,
        studentPercentage: studentPercentage,
      } 
      localStorage.setItem('studentRecord', JSON.stringify(studentData))
      displayStudentData();

    }
    reader.readAsDataURL(file);

  })
    
    function displayStudentData() {
      const getStudentRecord = JSON.parse(localStorage.getItem('studentRecord'));
      const studentContainer = document.querySelector('#student-container');

      if(getStudentRecord === '' || getStudentRecord === null ){
         studentContainer.innerHTML = `
          <div class="student-data">
              <p>No Data Available</p>      
          </div>`
      } else {
        studentContainer.innerHTML = `
        <div class="student-data">
            <img src="${getStudentRecord.studentImage}" class="student-image">
            <p>Student: ${getStudentRecord.studentName}</p>
            <p>Class: ${getStudentRecord.studentClass}</p>
            <p>Achievement Year: ${getStudentRecord.achievementYear}</p>
            <p>Percentage: ${getStudentRecord.studentPercentage}%</p>
            <div class="student-buttons">
              <button id="show-to-home-btn">Show To Home</button>
              <button id="hide-to-home-btn">Hide To Home</button>
              <button class="deleter button" id="delete-std-btn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>`
        const showToHomeButton = document.querySelector('#show-to-home-btn')
        showToHomeButton.addEventListener('click', () => {
          const getStudentRecord = JSON.parse(localStorage.getItem('studentRecord'));
          const storeDisplayData = getStudentRecord
          localStorage.setItem('displayData', JSON.stringify(storeDisplayData));
          displayStudentDataOnHome()
        })
        
        const hideToHomeButton = document.querySelector('#hide-to-home-btn');
        hideToHomeButton.addEventListener('click', () => {
          localStorage.removeItem('displayData');
          displayStudentDataOnHome()

        })

        const deleteStudent = document.querySelector('#delete-std-btn');
        deleteStudent.addEventListener('click', () => {
          localStorage.removeItem('studentRecord');
          displayStudentData();
        })
      }
     
    }

    