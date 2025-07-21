import {displayStudentDataOnHome} from "./display-student-home.js"
document.addEventListener("DOMContentLoaded", function () {


  const menuBtn = document.getElementById("nav-menu-btn");
  const header = document.querySelector("#main-header");
  const navLinks = document.querySelectorAll(".nav-link")

  menuBtn.addEventListener("click", function () {
    header.classList.toggle("expanded");
    navLinks.forEach( (item) => {
        item.classList.toggle("showNavLinks")
    })
  });

  if(window.innerWidth <= 768)
  {
    navLinks.forEach((item)=> {
    item.addEventListener("click", () => {
      header.classList.toggle("expanded");
      navLinks.forEach((item) => {
        item.classList.toggle("showNavLinks")
      })
     })
    })
  }

  // navigation link click functionality which results scroll to clicked section
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
     e.preventDefault(); // to prevent default behaviour of browser & to control scrolling.

      const targetId = this.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      const headerHeight = document.getElementById('main-header').offsetHeight;
      // console.log(targetElement.getBoundingClientRect().top)
      // console.log(window.scrollY);
      
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      // console.log(elementPosition);
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
        
    })
  })

  // Scroll to top button functionality
  const scrollToTopButton =  document.getElementById('scroll-to-top-btn')
  window.addEventListener('scroll', function () {
    if(window.scrollY > 200){
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
  })

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
  
})
  // navigation menu button click functionality 
  
  // Registration Form Functionality
displayStudentDataOnHome();
 


  
  

