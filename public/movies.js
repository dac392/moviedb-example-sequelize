const ul = document.querySelector("ul");

function onMovieSelected(event){
    console.log(event.target);
    if(event.target.tagName !== "LI"){
        console.log(event.target.parentNode);
        //event.target = event.target.parentElement;
    }else{
        console.log("clicked on LI")
    }
    console.log(event.target);

}

ul.addEventListener("click", onMovieSelected);