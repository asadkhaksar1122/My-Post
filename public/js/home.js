let select = document.getElementById("select");
let area = document.getElementById("area");
let title = document.getElementById("title");
select.addEventListener("input",function () {
  let value = select.value;
 if (value=="uppercase") {
     upperval = area.value.trim().toUpperCase()
     area.value = upperval;
     upperval = title.value.trim().toUpperCase()
     title.value = upperval;
 } else if (value == "lowercase") {
     lowerval = area.value.trim().toLowerCase()
     area.value = lowerval;
     lowerval = title.value.trim().toLowerCase()
     title.value = lowerval;
    }

 else if (value == "firstletter") {
   let trimvalue = area.value.trim();
   let firstval = trimvalue.charAt(0).toUpperCase() + trimvalue.slice(1).toLowerCase()
   area.value = firstval;
     let inputValue = title.value;
   let wordsArray = inputValue.split(" ");
  
     let capitalizedArray = wordsArray.map(function (word) {
       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize the first letter of each word
     });
   let result = capitalizedArray.join(" "); 
   title.value = result;
}
    
 else if (value == "extraspaces") {
     extra = area.value.replace(/\s+/g, " ").trim()
     area.value = extra;
     extra = title.value.replace(/\s+/g, " ").trim()
     title.value = extra;
    }
})
select.addEventListener("focus", function () {
  select.value= ''
})
select.addEventListener("blur", function () {
  if ((select.value == "")) {
    select.value="firstletter"
  }
})
let search = document.getElementById("search");
search.addEventListener("focus",function () {
 let notes = document.getElementsByClassName("notes")[0]
    notes.style.display = "none";
})
search.addEventListener("blur", function () {
  let notes = document.getElementsByClassName("notes")[0];
  notes.style.display = "block";
});
search.addEventListener("input", function () {
  const cards = document.querySelectorAll(".card");
  const searchTerm = search.value.toLowerCase();
  Array.from(cards).forEach((card, index) => {
    const title = card.querySelector(".title");
    const description = card.querySelector(".discription");
    const titleText = title.textContent;
    const descriptionText = description.textContent;

    if (
      !(
        titleText.toLowerCase().includes(searchTerm) ||
        descriptionText.toLowerCase().includes(searchTerm)
      )
    ) {
      card.style.display = "none";
    } else {
      card.style.display = "block";

      // Highlight the matching text
      const highlightedTitle = titleText.replace(
        new RegExp(searchTerm, "gi"),
        (match) => `<span style="color: #007bff">${match}</span>`
      );
      const highlightedDescription = descriptionText.replace(
        new RegExp(searchTerm, "gi"),
        (match) => `<span style="color: #007bff">${match}</span>`
      );

      title.innerHTML = highlightedTitle;
      description.innerHTML = highlightedDescription;
    }
  });
});


