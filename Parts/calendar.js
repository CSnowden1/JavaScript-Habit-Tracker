// JavaScript for the calendar
         // get current date
         const today = new Date();
      
         // get current month and year
         const month = today.getMonth();
         const year = today.getFullYear();
   
         // get first day of month
         const firstDay = new Date(year, month, 1);
   
         // get last day of month
         const lastDay = new Date(year, month + 1, 0);
   
         // get weekday of first day
         const firstDayWeekday = firstDay.getDay();
   
         // get number of days in month
         const daysInMonth = lastDay.getDate();
   
         // create calendar HTML
         let calendarHTML = '';
   
         // create calendar day HTML
         const createDayHTML = (day) => {
           let dayClass = 'day';
           if (day === today.getDate()) {
             dayClass += ' today';
           }
           if (day % 7 === 0 || day % 7 === 6) {
             dayClass += ' weekend';
           }
           return `<div class="${dayClass}">${day}</div>`;
         }
   
         // create calendar HTML
         for (let i = 0; i < firstDayWeekday; i++) {
           calendarHTML += '<div class="day"></div>';
         }
         for (let i = 1; i <= daysInMonth; i++) {
           calendarHTML += createDayHTML(i);
         }
   
         // render calendar HTML
         const calendar = document.getElementById('calendar');
         calendar.innerHTML = calendarHTML;