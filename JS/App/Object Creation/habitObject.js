"strict mode";





// HABIT OBJECT CREATION


    export const newHabitName = document.querySelector('#habit-name');
    export const newHabitImg = document.querySelectorAll('.img-options');
    export const newHabitFreq = document.querySelector('#habit-freq');
    export const newHabitWhen = document.querySelector('#habit-when');
    export const newHabitGoal = document.querySelector("#habit-goal");
    export const habitBox = document.querySelector(".habit-section");
    const modalContainer = document.querySelector('.modal-container');
    export const deleteModalContainer = document.querySelector('.delete-modal-container');
    export const countModalContainer = document.querySelector('.count-modal-container');
    const saveHabitBtn = document.getElementsByClassName("save-btn");
    export const moduleBtnBox = document.getElementsByClassName("entry-btn");
    export const editBtn = document.getElementsByClassName("edit-btn");
    export const delBtn = document.querySelector(".del-btn");
    export const delCancel = document.querySelector(".del-cancel-btn");
    export const habitNewCount = document.querySelector("#habit-count");
    export const newCountBtn = document.getElementsByClassName("newCount-btn");
    export const cancelCountBtn = document.querySelector(".count-cancel-btn");

    // Habit Object Value Input Screen

    // more value or less value

    newHabitImg.forEach(habit => {
        habit.addEventListener("click", () => {
            newHabitImg.forEach(habit => {
                habit.classList.remove("img-active");
            });
            habit.classList.add("img-active");
            habitCheck();
            });

        });
    //Habit Object Creation
    export class NewHabitObject {
        constructor (id, name, quant, freq, tda, goal, count, remind, img) {
        this.id = id;
        this.name = name;
        this.quant = quant;
        this.freq = freq;
        this.tda = tda;
        this.goal = goal;
        this.count = count;
        this.remind = remind;
        this.img = img;
        }
    };

    function habitCheck() {
        let habitIcon = '';
        newHabitImg.forEach(icons => {
            if(icons.classList.contains("img-active")) {
              habitIcon = icons.innerHTML;
            };
        }); return habitIcon;
    }

    export function genHabitObject() {
        let habitTitle = newHabitName.value;
        let habitFreq = newHabitFreq.options[newHabitFreq.selectedIndex].text;
        let habitTDA = newHabitWhen.options[newHabitWhen.selectedIndex].text;
        let habitGoal = newHabitGoal.value;
        let itemId = Math.random();
        let habitCount = 0;
        let habitImage = habitCheck();
        const newHabit = new NewHabitObject( itemId, habitTitle, "Less", habitFreq, habitTDA, habitGoal, habitCount, "3:00pm", habitImage);
        habitList.push(newHabit);
        window.localStorage.setItem("Habit List", JSON.stringify(habitList));
    }


    export const habitList = [];










//Habit DOM Creation
    export function genHabitList() {
        habitBox.innerHTML = '';
        habitList.map( object => {
            const habitAdded = document.createElement("div");
            habitAdded.classList.add("habit");
            const leftHabitSec = document.createElement("div");
            const midHabitSec = document.createElement("div");
            const rightHabitSec = document.createElement("div");
            leftHabitSec.classList.add("far-left");
            midHabitSec.classList.add("middle");
            rightHabitSec.classList.add("right");
            const habitInfoBox = document.createElement("div");
            const habitTitleBox = document.createElement("div");
            const habitTotalBox = document.createElement("div");
            const rightBox = document.createElement("div");
            const habitBtnL = document.createElement("button");
            const habitBtnMidL = document.createElement("button");
            const habitBtnMidR = document.createElement("button");
            const habitBtnR = document.createElement("button");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");
            const plusBtn = document.createElement("button");
            const minusBtn = document.createElement("button");
            const editTotal = document.createElement("button");
            const habitNameBox =  document.createElement("div");
            const habitCountBox = document.createElement("div");
            const habitGoalBox = document.createElement("div");
            const habitImgBox = document.createElement("div");
            const countPreview = document.createElement("div");
            habitTitleBox.classList.add("habit-name-box");
            habitImgBox.classList.add("svg-box");
            habitCountBox.classList.add("count-box");
            habitGoalBox.classList.add("goal-box");
            countPreview.classList.add("hover-count");

            //Styles
            habitInfoBox.id = "habit-info-box";
            rightBox.id = "right-btn-box";
            deleteBtn.id = "delete-btn";
            editBtn.id = "edit-btn";
            habitBtnL.id = "middle-btn";
            habitBtnMidL.id = "left-btn";
            habitBtnMidR.id = "right-btn";
            habitBtnR.id = "middle-btnR";
            plusBtn.id = "plus-btn";
            minusBtn.id = "minus-btn";
            editTotal.id = "edit-total-btn";
            habitNameBox.id = 'habit-tit';
            habitCountBox.id = 'habit-count';
            habitGoalBox.id = 'habit-goal-count';
            habitTotalBox.id = "habit-total-box";
            // Content
            deleteBtn.innerHTML = '<i class= "fa fa-trash" style="font-size: 30px;color:red"></i>';
            editBtn.innerHTML = '<i class= "fa fa-pencil" style="font-size: 30px;color:blue"></i>';
            plusBtn.innerHTML = '<i class= "fa-solid fa-plus" style="font-size: 30px;color:yellow"></i>';
            minusBtn.innerHTML = '<i class= "fa fa-solid fa-minus" style="font-size: 30px;color:orange"></i>';
            editTotal.innerHTML = '<i class= "fa fa-pen-to-square" style="font-size: 30px;color:blue"></i>';
            habitAdded.appendChild(leftHabitSec);
            habitAdded.appendChild(midHabitSec);
            habitAdded.appendChild(rightHabitSec);
            leftHabitSec.appendChild(habitBtnL);
            midHabitSec.appendChild(habitBtnMidL);
            midHabitSec.appendChild(habitBtnMidR);
            rightHabitSec.appendChild(habitBtnR);
            rightHabitSec.appendChild(deleteBtn);
            rightHabitSec.appendChild(editBtn);
            rightHabitSec.appendChild(rightBox).appendChild(deleteBtn);
            rightHabitSec.appendChild(rightBox).appendChild(editBtn);
            midHabitSec.appendChild(habitInfoBox);
            leftHabitSec.appendChild(habitTotalBox).appendChild(plusBtn);
            leftHabitSec.appendChild(habitTotalBox).appendChild(minusBtn);
            leftHabitSec.appendChild(habitTotalBox).appendChild(editTotal);
            leftHabitSec.appendChild(habitTotalBox).appendChild(countPreview);
            habitInfoBox.appendChild(habitTitleBox);
            habitInfoBox.appendChild(habitCountBox);
            habitInfoBox.appendChild(habitGoalBox);
            habitTitleBox.appendChild(habitImgBox);
            habitTitleBox.appendChild(habitNameBox);
            habitBox.appendChild(habitAdded);

            habitNameBox.innerText = object.name;
            habitGoalBox.innerText = object.goal;
            habitCountBox.innerText = object.count;
            countPreview.innerText = object.count;
            habitImgBox.innerHTML = object.img;
            habitAdded.id = object.id;
            habitAdded.classList.add(object.tda);



        editBtn.addEventListener("click", editHabit);
        deleteBtn.addEventListener("click", deleteHabit);
        habitBtnL.addEventListener("click", moveLeftToMid);
        habitBtnMidL.addEventListener("click", moveLeft);
        habitBtnMidR.addEventListener("click", moveRight);
        habitBtnR.addEventListener("click", moveRightToMid);
        plusBtn.addEventListener("click", addOne);
        minusBtn.addEventListener("click", minusOne);
        midHabitSec.addEventListener("mousedown", habitDid);
        editTotal.addEventListener("click", editCount);
        }
    )};




//Habit Element Functions
        //Habit Sliding Bar

        function moveLeftToMid(e) {
            const item = e.target;
            item.parentElement.classList.remove('left-active');
            item.parentElement.nextSibling.classList.remove('left-active');

        };

        function moveLeft(e) {
            const item = e.target;
            item.parentElement.previousSibling.classList.add('left-active');
            console.log(habitList);
            console.log(moduleBtnBox);
            item.parentElement.classList.add('left-active');
        };

        function moveRight(e)  {
            const item = e.target;
            item.parentElement.classList.add('right-active');
            item.parentElement.nextSibling.classList.add('right-active');
        };

        function moveRightToMid(e) {
            const item = e.target;
            item.parentElement.classList.remove('right-active');
            item.parentElement.previousSibling.classList.remove('right-active');
        };


    // Far Left  Editing Habit Amount Functions

        function addOne(e) {
            const item = e.target;
            habitList.map(object => {
                if (object.id.toString() === item.parentElement.parentElement.parentElement.parentElement.id.toString()) {
                    item.parentElement.parentElement.parentElement.nextSibling.childNodes[2].childNodes[1].innerText = object.count;
                    object.count++;
                     window.localStorage.setItem("Habit List", JSON.stringify(habitList));
                }
            });
        }


        function minusOne(e) {
            const item = e.target;
            habitList.map(object => {
                if (object.id.toString() === item.parentElement.parentElement.parentElement.parentElement.id.toString()) {
                    item.parentElement.parentElement.parentElement.nextSibling.childNodes[2].childNodes[1].innerText = object.count;
                    object.count--;
                     window.localStorage.setItem("Habit List", JSON.stringify(habitList));
                }
                habitDid();
            });
        };


        function editCount(e) {
            const item = e.target;
            countModalContainer.classList.add('active-count');
            countModalContainer.setAttribute('aria-hidden', 'false');



            newCountBtn[0].addEventListener("click", () => {
                habitList.map(object => {
                    if (object.id.toString() === item.parentElement.parentElement.parentElement.parentElement.id.toString()) {
                        item.parentElement.parentElement.parentElement.nextSibling.childNodes[2].childNodes[1].innerText = object.count;
                        object.count = habitNewCount.value;
                        window.localStorage.setItem("Habit List", JSON.stringify(habitList));
                        countModalContainer.classList.remove('active-count');
                        countModalContainer.setAttribute('aria-hidden', 'true');
                        }
                    habitDid();
                    });
                });


            cancelCountBtn.addEventListener("click", () => {
                countModalContainer.classList.remove('active-count');
                countModalContainer.setAttribute('aria-hidden', 'true');
            });


        };





    // Far Right Deleting & Editing Habit Functions

        function deleteHabit(e) {
            const item = e.target;
            deleteModalContainer.classList.add('active-del');
            deleteModalContainer.setAttribute('aria-hidden', 'false');
            delBtn.addEventListener("click", () => {
            for (let i = 0; i < habitList.length; i++) {
                if (item.parentElement.parentElement.parentElement.parentElement.id.toString() === habitList[i].id.toString()) {
                    item.parentElement.parentElement.parentElement.parentElement.remove();
                    let index = habitList.indexOf(i);
                    habitList.splice(-habitList.length - index, 1);
                    window.localStorage.setItem("Habit List", JSON.stringify(habitList));
                    deleteModalContainer.classList.remove('active-del');
                    deleteModalContainer.setAttribute('aria-hidden', 'true');
                }
            }})


            delCancel.addEventListener("click", () => {
                deleteModalContainer.classList.remove('active-del');
                deleteModalContainer.setAttribute('aria-hidden', 'true');
            });


        }

        function editHabit (e) {
            editBtn[0].classList.add("edit-active");
            modalContainer.classList.add('active');
            modalContainer.setAttribute('aria-hidden', 'false');
            const item = e.target;
            saveHabitBtn[0].classList.add("editSave-active");
            
            
            editBtn[0].addEventListener("click", () => {
                habitList.map(object => {
                    if (object.id.toString() === item.parentElement.parentElement.parentElement.parentElement.id.toString()) {
                            object.name = newHabitName.value;
                            object.freq = newHabitFreq.options[newHabitFreq.selectedIndex].text;
                            object.tda = newHabitWhen.options[newHabitWhen.selectedIndex].text;
                            object.goal = newHabitGoal.value;
                        }
                    });

                modalContainer.classList.remove('active');
                modalContainer.setAttribute('aria-hidden', 'true');
                editBtn[0].classList.remove("edit-active");
                saveHabitBtn[0].classList.remove("editSave-active");
            
            });
        };



        // Middle Habit Tracking Functions
        function habitDid(e) {
            const item = e.target;
            console.log(item.childNodes[0]);
            let loadBar = document.createElement('div');
            item.appendChild(loadBar);
            loadBar.classList.add("load-bar");
            console.log(item.childNodes[0].childNodes[0]);
            setTimeout(function() {
                loadBar.classList.add("load-active");
            }, 200);
            setTimeout(function() {
                item.childNodes[0].childNodes[0].classList.add("svg-move");
                item.childNodes[0].childNodes[0].childNodes[1].classList.add("svg-active");

            }, 300)
            setTimeout(function(){
                loadBar.classList.remove("load-active");
                item.childNodes[0].childNodes[0].classList.remove("svg-move");
                item.childNodes[0].childNodes[0].childNodes[1].classList.remove("svg-active");

                habitList.map(object => {
                    if (object.id.toString() === item.parentElement.parentElement.id.toString()) {
                        item.childNodes[1].innerText = object.count;
                        object.count++;
                         window.localStorage.setItem("Habit List", JSON.stringify(habitList));
                    }
                });
            }, 1000);
        }


