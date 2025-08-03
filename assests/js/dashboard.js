let addedStudentData = JSON.parse(localStorage.getItem('addedStudentData') || '[]');
document.addEventListener('DOMContentLoaded', displayStudentData())
let showToHomeStudentData = [];
let setUpdatedStudentData = [];
const addStudentSubmitButton = document.querySelector('#add-student-form');   
// Add/Submit/Store Student data to localStorage 
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
        id: Date.now().toString() + Math.floor(Math.random()*1000).toString(),
        Base64String,
        studentName,
        studentClass,
        achievementYear,
        studentPercentage,
      } 
      // Check if student already exists in the database
      if(!addedStudentData) {
        addedStudentData = [];
      }
      if(addedStudentData.find(s => s.studentName === studentName && s.studentClass === studentClass && s.achievementYear === achievementYear && s.studentPercentage === studentPercentage))
      { 
        alert('Student already exists in the database.');
        return;
      }
      addedStudentData.push(studentData)   
      localStorage.setItem('addedStudentData', JSON.stringify(addedStudentData))
      displayStudentData();
      showStudentDataInTable();

      
    }
    reader.readAsDataURL(file);
    this.reset();   
  })
    

// Display/Render student data on UI of dashboard from localStorage

function displayStudentData() {
  const studentContainer = document.querySelector('#student-container');
  studentContainer.innerHTML = ''
  if(addedStudentData === '' || addedStudentData === null || addedStudentData.length === 0 ){
      studentContainer.innerHTML = `
      <div class="student-data">
          <p>No Data Available</p>      
      </div>`
      
  } else {
      addedStudentData.forEach((student) => {
      studentContainer.innerHTML += `
              <div class="student-data">
                  <img src="${student.Base64String}" class="student-image">
                  <p>Student: ${student.studentName}</p>
                  <p>Class: ${student.studentClass}</p>
                  <p>Achievement Year: ${student.achievementYear}</p>
                  <p>Percentage: ${student.studentPercentage}%</p>
                  <div class="student-buttons">
                    <button class="show-to-home-btn" data-id=${student.id}>Show To Home</button>
                    <button class="hide-to-home-btn" data-id=${student.id}>Hide To Home</button>
                    <button class="delete-std-btn" data-id=${student.id}><i class="fas fa-trash"></i> Delete</button>
                  </div>
              </div>`
        
    // Delete student from dashboard and render updated data
      const deleteStudent = document.querySelectorAll('.delete-std-btn');
      deleteStudent.forEach((btn) => {
        btn.addEventListener('click', function (){
          const studentId = btn.getAttribute('data-id')
          if(showToHomeStudentData.find(s => s.id === studentId))
          {
            alert('Student is displayed on Home. First Hide the student.')
          } else {
            const foundStudent = addedStudentData.find(s => s.id === studentId)

            if (foundStudent) {
              addedStudentData = addedStudentData.filter((student) => student.id !== foundStudent.id)
              localStorage.setItem('addedStudentData', JSON.stringify(addedStudentData))
            } else {
              console.log('Not found Student data');
            }
            displayStudentData();
            showStudentDataInTable();
          }
        })
      })

    // Show student to home button functionality. 
      const showToHomeButton = document.querySelectorAll('.show-to-home-btn')
        showToHomeButton.forEach((btn)=>{
        btn.addEventListener('click', function () {
          const studentId = btn.getAttribute('data-id')
          const foundStudent = addedStudentData.find(s => s.id === studentId);
            if(showToHomeStudentData.find(s => s.id === studentId ))
            {
              alert('Student Already Exists');
            }else{
              showToHomeStudentData.push(foundStudent)
              localStorage.setItem('showToHomeStudentData', JSON.stringify(showToHomeStudentData));
              showToHomeStudentData = JSON.parse(localStorage.getItem('showToHomeStudentData'))
            }
        })
      }) 

    // Hide student from home button functionality. 
      const hideToHomeButton = document.querySelectorAll('.hide-to-home-btn')
          hideToHomeButton.forEach((btn)=> {
          btn.addEventListener('click', function () {
            const studentId = btn.getAttribute('data-id')              
            showToHomeStudentData = JSON.parse(localStorage.getItem('showToHomeStudentData'))
            const foundStudent = showToHomeStudentData.find(s => s.id === studentId)
              if (foundStudent) {
                showToHomeStudentData = showToHomeStudentData.filter((student)=>student.id !== foundStudent.id)
                localStorage.setItem('showToHomeStudentData', JSON.stringify(showToHomeStudentData));
                
              } else {
              alert('Student Not Found');
              }
           })
          })
      })
  };
  
   showStudentDataInTable(); 
        // Show student data in table format
    function showStudentDataInTable() {
      const studentDataTableBody = document.querySelector('#student-table-body')
      let SrNo = 0;
      studentDataTableBody.innerHTML = ''
      
      const rows = addedStudentData.map((student) => {
        SrNo++;
        return `
          <tr>
            <td>${SrNo}</td>
            <td>${student.studentName}</td>
            <td>${student.studentClass}</td>
            <td>${student.achievementYear}</td>
            <td>${student.studentPercentage}</td>
        </tr>
        `
      });
        studentDataTableBody.innerHTML = rows.join('')
      const total = addedStudentData.reduce((sum, student) => sum + parseFloat(student.studentPercentage), 0);
      const average = addedStudentData.length > 0 ? (total / addedStudentData.length).toFixed(2) : 0;
      studentDataTableBody.innerHTML += `
        <tr>
          <td colspan="4">Average Percentage</td>
          <td>${average}</td>
        </tr>`
    
     }
}


       
    
      