import { displayStudentDataOnHome } from "./display-student-home.js";
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("nav-menu-btn");
  const header = document.querySelector("#main-header");
  const navLinks = document.querySelectorAll(".nav-link");

  menuBtn.addEventListener("click", function () {
    header.classList.toggle("expanded");
    navLinks.forEach((item) => {
      item.classList.toggle("showNavLinks");
    });
  });

  if (window.innerWidth <= 768) {
    navLinks.forEach((item) => {
      item.addEventListener("click", () => {
        header.classList.toggle("expanded");
        navLinks.forEach((item) => {
          item.classList.toggle("showNavLinks");
        });
      });
    });
  }

  // navigation link click functionality which results scroll to clicked section
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // to prevent default behaviour of browser & to control scrolling.

      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      const headerHeight = document.getElementById("main-header").offsetHeight;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Scroll to top button functionality
  const scrollToTopButton = document.getElementById("scroll-to-top-btn");
  window.addEventListener("scroll", function () {
    window.scrollY > 200
      ? (scrollToTopButton.style.display = "block")
      : (scrollToTopButton.style.display = "none");
  });

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  fetchBlogData();
});

// Onpress showToHome button display data on home page
displayStudentDataOnHome();

async function fetchBlogData() {
  try {
    let response = await fetch("https://dummyjson.com/c/905d-675d-460d-af59");
    let data = await response.json();
    const blogsSection = document.querySelector(".blog-container");
    data.blogs.forEach((blog) => {
      blogsSection.innerHTML += `
     <article class="blog-post">
         <h3>${blog.title}</h3>
         <p>${blog.post}</p>
     </article>
     `;
    });
  } catch (error) {
    alert(error);
  }
}

// .then((response)=>{
//   if(!response.ok){
//     throw new Error("Data fetched is not ok");
//   } else {
//     return response.json();
//   }
// })
// .then((data)=>{
//
//   data.blogs.forEach(blog => {

//   })

// })
// .catch((error) => console.log(error))
