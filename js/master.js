let colorLi = document.querySelectorAll(".colors-list li");

// switch Background option 
let randomBackEl = document.querySelectorAll(".random-backgrounds span");

// random background option 
let backgroundOption = true;

// variable to control the interval function 
let backgroundInterval;

// check if there's local storage color 
if(window.localStorage.getItem("color-option")){
    // put the color on the var --main-color 
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color-option"));
       
    colorLi.forEach( e =>{
        e.classList.remove('active');

        if(localStorage.getItem("color-option") === e.dataset.color){

            e.classList.add("active");
        }


    });
}

// Get tne value from local storage 
let backgroundLocalItem = window.localStorage.getItem("background_option");

// Check if random background local storage is not empty 
if(backgroundLocalItem != null){

    // the value on the property in local storage return a string value not a boolean value 
    if(backgroundLocalItem === 'true'){
        backgroundOption =true;
    }else{
        backgroundOption = false;
    }
    // remove class active from all spans 
    randomBackEl.forEach( ele =>{
        ele.classList.remove("active");
    });
    if(backgroundLocalItem === "true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active");


    }

}


// click on setting box icon to show and hide 
document.querySelector('.img').onclick = function(){

    document.querySelector('.settings-box').classList.toggle("open");
}

// switch the color 
colorLi.forEach( li => {
    li.addEventListener("click", (e) => {

        // set color on root 
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        // add the color to lacal storage 
        window.localStorage.setItem('color-option',e.target.dataset.color);

        handleActive(e);
    });
});

// click on overlay to hide the settings box
document.querySelector('.overlay').onclick = function(){
    document.querySelector('.settings-box').classList.remove('open');
}



// loop on all span 
randomBackEl.forEach( li => {
    li.addEventListener("click", (e) => {

        handleActive(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            window.localStorage.setItem("background_option",true);
        }else{

            clearInterval(backgroundInterval);
            window.localStorage.setItem("background_option",false);

        }
    });
});

let landingPage = document.querySelector(".landing-page");

// Get Array of images 
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];


// Doing the function to change  img of the background 
function randomizeImgs(){

    if(backgroundOption === true){ 

    backgroundInterval=setInterval(() =>{
        // Get random number 
        let randomNum = Math.floor(Math.random() * imgsArray.length);
      console.log(randomNum);
        // Change Background Image url 
        landingPage.style.backgroundImage = `url(images/${imgsArray[randomNum]})`;
    },3000);
    }
};
randomizeImgs();


// Select Skils Selector 
let ourSkils = document.querySelector('.skils');

window.onscroll = function(){

    // skils offset top
    let skilsOffsetTop = ourSkils.offsetTop;

    //skils outer height
    let skilsOuterHeight = ourSkils.offsetHeight;

    // windo height 
    let windowHeight = this.innerHeight;

    // window scrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > skilsOffsetTop + skilsOuterHeight - windowHeight){
        let allSkils =document.querySelectorAll('.skil-box .skil-progress span');
        allSkils.forEach( skil => {

            skil.style.width = skil.dataset.progress;

        })
    }
}

//Create popup with the img 
let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach( img =>{
    
    img.addEventListener("click", (e) => {
        // create overlay element 
        let overlay = document.createElement("div");

        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement('div');

        popupBox.className = 'popup-box';

        //create the title of the image from the alt property
        if(img.alt !== null){
             
            // create the Heading 
             let imgHeading = document.createElement("h2");

            //create the text for the heading
             let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            //add the h2 to the pop box
            popupBox.appendChild(imgHeading);
        }

        // create the img element 
        let popupImg = document.createElement("img");

        popupImg.src = e.target.src;

        popupImg.className = 'popup-img';

        // add the img to the box 
        popupBox.appendChild(popupImg);

        document.body.appendChild(popupBox);

        //create the Button to close the pop box
        let closeButton = document.createElement('span');

        //add the form 'X' to the span
        let closeText = document.createTextNode("X");

        closeButton.appendChild(closeText);

        // add a class to the span to customize it 
        closeButton.className = 'close-button';

        // add the clsoe button to the popup box 
        popupBox.appendChild(closeButton);
    })
})

// close the popupBox when click the close button 
document.addEventListener('click', (e) =>{


    // if we click the span close buttton
    if(e.target.className == 'close-button'){
        //remove the pop up img
        e.target.parentNode.remove(); // or   document.querySelector('.popup-box').remove();

        // remove the overlay 
        document.querySelector('.popup-overlay').remove();
    }
});

//Doing the Function that transfer between the sections 
let allBullets = document.querySelectorAll('.nav-bullets .bullet');
let allLinks   = document.querySelectorAll('.links a');

function scrollToSection(element){
    element.forEach( ele => {
    
        ele.addEventListener('click', (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
    
        });
    });
};
scrollToSection(allBullets);
scrollToSection(allLinks);

//Handle Active Class fuction to Add and Remove this calss auto To all Place
function handleActive(e){

     // Remove Active class from all li 
     e.target.parentElement.querySelectorAll(".active").forEach( ele =>{
        ele.classList.remove("active");
    });
    // add class active to current element clicked on 
    e.target.classList.add("active");
}

// select the show and hide span bullets
let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = window.localStorage.getItem('bullets-option');




// if there is a value in the local storage 
if(bulletLocalItem !== null){

    bulletsSpan.forEach( span =>{

        span.classList.remove('active');
    });
    if(bulletLocalItem === 'block'){

        bulletsContainer.style.display = 'block';

        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';
        
        document.querySelector('.bullets-option .no').classList.add('active');

    }

}

bulletsSpan.forEach( bullet =>{
    bullet.addEventListener('click', (e)=>{

        handleActive(e);

        if(e.target.dataset.display === 'show'){

            bulletsContainer.style.display = 'block';

            localStorage.setItem('bullets-option','block');

        }else{
            bulletsContainer.style.display = 'none';

            localStorage.setItem('bullets-option','none');

        }
    });
});

// reset button
document.querySelector('.reset-options').onclick = function(){

    localStorage.removeItem('bullets-option');
    localStorage.removeItem('color-option');
    localStorage.removeItem('background_option');

    // reload the page 
    window.location.reload();
}

// toggle menu 
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function(e){

    e.stopPropagation();

    // toggle this class on the button 
    this.classList.toggle('menu-active');

    // toggle this class on the div to show and hide the links 
    tLinks.classList.toggle('open');
}

// click on anyWhere outside button and links to close the links 
document.addEventListener('click', function(e){
    if(e.target !== toggleBtn && e.target !== tLinks){

        // check if the links is open (has the class open) 
        if(tLinks.classList.contains('open')){

            toggleBtn.classList.toggle('menu-active');

            tLinks.classList.toggle('open');
        }
    }
});
tLinks.onclick = function(e){
    e.stopPropagation();
}
