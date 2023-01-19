"use strict";



export const dayChange = document.getElementsByClassName('tda');

export const allSelect = document.getElementsByClassName("tda ad");
export const mornSelect = document.getElementsByClassName("tda morning");
export const noonSelect = document.getElementsByClassName("tda noon");
export const nightSelect = document.getElementsByClassName("tda night");


function mornSort() {
    const relativeBox = mornSelect[0].parentElement.nextSibling.nextSibling.childNodes;
    mornSelect[0].style.backgroundColor = "grey";
    for(let i = 0; i < relativeBox.length; i++ ) {
        if(relativeBox[i].className !== "habit Morning") {
            relativeBox[i].style.display = "none";
        } else {
            relativeBox[i].style.display = "flex";
        }
    }
}



function noonSort() {
    const relativeBox = mornSelect[0].parentElement.nextSibling.nextSibling.childNodes;
    for(let i = 0; i < relativeBox.length; i++ ) {
        if(relativeBox[i].className !== "habit Afternoon") {
            relativeBox[i].style.display = "none";
        } else {
            relativeBox[i].style.display = "flex";
        }
    }
}

function nightSort() {
    const relativeBox = mornSelect[0].parentElement.nextSibling.nextSibling.childNodes;
    mornSelect[0].style.backgroundColor = "grey";
    for(let i = 0; i < relativeBox.length; i++ ) {
        if(relativeBox[i].className !== "habit Night") {
            relativeBox[i].style.display = "none";
        } else {
            relativeBox[i].style.display = "flex";
        }
    }
}

function allSort() {
    const relativeBox = mornSelect[0].parentElement.nextSibling.nextSibling.childNodes;
    mornSelect[0].style.backgroundColor = "grey";
    for(let i = 0; i < relativeBox.length; i++ ) {
        relativeBox[i].style.display = "flex";
        }
    }



mornSelect[0].addEventListener("click", mornSort);
noonSelect[0].addEventListener("click", noonSort);
nightSelect[0].addEventListener("click", nightSort);
allSelect[0].addEventListener("click", allSort);



