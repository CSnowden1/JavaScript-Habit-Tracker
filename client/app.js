"strict mode";
import * as TdaSection from './Parts/time-of-day.js';
import * as ObjectMaker from './JS/App/Object Creation/habitObject.js';



//Modal Query Selectors

    const modalContainer = document.querySelector('.modal-container');
    const delModalContainer = document.querySelector('.delete-modal-container');
                                                                                         
    const saveHabitBtn = document.getElementsByClassName("save-btn");
    const cancelHabitBtn = document.getElementsByClassName("cancel-btn");
    const more = document.querySelector('#more');
    const less = document.querySelector('#less');
    const createHabitBtn = document.querySelector('.habit-btn');
    const editBtn = document.getElementsByClassName('edit-btn');


// Module Functions

    function addHabit() {
        modalContainer.classList.add('active');
        modalContainer.setAttribute('aria-hidden', 'false');
        ObjectMaker.newHabitName.focus();
    }


    function cancelHabit() {
        if(editBtn[0].classList.contains("edit-active")) {
            editBtn[0].classList.remove("edit-active");
            saveHabitBtn[0].classList.remove("editSave-active");
        }

        modalContainer.classList.remove('active');
        modalContainer.setAttribute('aria-hidden', 'true');
    }
    //module btns
        createHabitBtn.addEventListener('click', addHabit);
        cancelHabitBtn[0].addEventListener('click', cancelHabit);










//Habit Generator/List Reload
    function habitGen() {
        ObjectMaker.genHabitObject();
        ObjectMaker.genHabitList();
        cancelHabit();
    };


    saveHabitBtn[0].addEventListener("click", habitGen);



// Locale Storage
function LoadList() {
    let savedHabits = JSON.parse(window.localStorage.getItem("Habit List"));
    for (let i = 0; i < savedHabits.length; i++) {
        ObjectMaker.habitList.push(savedHabits[i]);
    }
    ObjectMaker.genHabitList();
}

LoadList();




















