 
 function formatDate(date) {
    if (!(date instanceof Date && !isNaN(date))) {
        return "N/A"; // Return "N/A" if the date is invalid or not a Date object
      }
    
     const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
     const month =
         date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
     const year = date.getFullYear();
     return `${day}.${month}.${year}`;  
 }

 export default formatDate