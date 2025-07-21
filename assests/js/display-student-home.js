 export function displayStudentDataOnHome () {

    console.log('I am displayStudentDataOnHome function ');
    

    const displayStudentData = JSON.parse(localStorage.getItem('displayData'))
    const displyHomeStudentData = document.querySelector('#home-student-container')

    if(!displayStudentData){
      displyHomeStudentData.innerHTML = `
      <div class="student-data">
          <p>Achievements will be displayed soon!</p>
      </div>`
    } else {
        displyHomeStudentData.innerHTML = `
        <div class="student-data">
            <img src="${displayStudentData.studentImage}">
            <p>Student Name: ${displayStudentData.studentName}</p>
            <p>Class: ${displayStudentData.studentClass}</p>
            <p>Achievement Year: ${displayStudentData.achievementYear}</p>
            <p>Percentage: ${displayStudentData.studentPercentage}%</p>
        </div>`
    }
    
  }