const slider = document.querySelector(".slider");

const prevSlider = document.querySelector(".left");
const nextSlider = document.querySelector(".right");

var sectionIndex = 0;

prevSlider.addEventListener("click", function () {
  sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
  // console.log('translate(' + (sectionIndex)* -50 + '%)')
  slider.style.transform = 'translate(' + (sectionIndex)* -50 + '%)' ;
});

nextSlider.addEventListener("click", function () {
    sectionIndex = (sectionIndex < 1) ? sectionIndex + 1 : 1;
    console.log('translate(' + (sectionIndex)* -50 + '%)')
    slider.style.transform = 'translate(' + (sectionIndex)* -50 + '%)' ;
});
