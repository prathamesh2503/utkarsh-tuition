 export function displayStudentDataOnHome () {

    // console.log('I am displayStudentDataOnHome function ');

    const displyHomeStudentData = document.querySelector('#home-student-container')
    
    
    const showToHomeStudentData = JSON.parse(localStorage.getItem('showToHomeStudentData'))
    
      if(showToHomeStudentData.length === 0){
        displyHomeStudentData.innerHTML = `
        <div class="student-data">
            <p>Achievements will be displayed soon!</p>
        </div>`
      }

      showToHomeStudentData.forEach((student) => {
        
        displyHomeStudentData.innerHTML += `
        <div class="student-data">
            <img src="${student.Base64String}" class="student-image">
            <p>Student Name: ${student.studentName}</p>
            <p>Class: ${student.studentClass}</p>
            <p>Achievement Year: ${student.achievementYear}</p>
            <p>Percentage: ${student.studentPercentage}%</p>
        </div>`
        
      });
    
    
  }