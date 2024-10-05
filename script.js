const apikey='7VbHnIco3Fu0YLsNbDUeabAACpueY5xYaPAO3eDk';
const currentImageContainer=document.getElementById("current-image-container");
const searchForm=document.getElementById("search-form");
const searchInput=document.getElementById("search-input");
const searchHistoryList = document.getElementById('search-history');

document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);
searchForm.addEventListener('submit',getImageOfTheDay);

function getCurrentImageOfTheDay(){
    const currentDate=new Date().toISOString().split("T")[0];
    fetchImageOfDate(currentDate);
}

function fetchImageOfDate(date){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${date}`)
    .then(response => response.json())
    .then(data=>{
        displayImage(data);
    })
    .catch(error=>{
        console.error("Error searching image from nasa API:"+error);
        currentImageContainer.innerHTML="<p>Can't fetch Image.Please Try Again</p>";
    });
}

function displayImage(data){
    currentImageContainer.innerHTML=`
    <h3>${data.title}</h3>
    <img src="${data.url}" alt="${data.title}">
    <p>${data.explanation}</p>
    <p><strong>Date:</strong> ${data.date}</p> `;

}

function getImageOfTheDay(event){
    event.preventDefault();
    const selectDate=searchInput.value;
    if(!selectDate){
        alert("Please Select Date!");
    }
    fetchImageOfDate(selectDate);
    saveSearch(selectDate);
    addSearchToHistory();
}

function saveSearch(date){
    let searchs=JSON.parse(localStorage.getItem('searchs'))||[];
    if(!searchs.includes(date)){
        searchs.push(date);
        localStorage.setItem('searchs',JSON.stringify(searchs));
    }
}

function addSearchToHistory(){
    // localStorage.removeItem('searchs'); 
    let searchs=JSON.parse(localStorage.getItem('searchs'))||[];
    searchHistoryList.innerHTML="";
    searchs.forEach(date=>{
        const li=document.createElement('li');
        li.textContent=date;
        li.addEventListener('click',()=>fetchImageOfDate(date));
        searchHistoryList.appendChild(li);
    });
}

addSearchToHistory();