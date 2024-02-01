
/*Open the dictonary content on clicking a btn*/ 
let dictonary = document.getElementById("dict");

dictonary.addEventListener("click",()=>{
    location.href = "index_dictonary.html";
    /*document.getElementById("dictonary_1").style.display = "block";
    document.getElementById("translate_1").style.display = "none";
    document.getElementById("btnftr").style.width = "350px"; 
    document.getElementById("btnftr").style.height = "350px"; 
    document.getElementById("allbtns").style.height = "130px";*/
})

/*Open the translate content on clicking a btn*/ 
let translate = document.getElementById("translate");

translate.addEventListener("click",(event)=>{
    location.href = "dictonary.html";
   /* document.getElementById("translate_1").style.display = "block";
    document.getElementById("dictonary_1").style.display = "none";
    document.getElementById("btnftr").style.width = "330px"; 
    document.getElementById("btnftr").style.height = "400px"; */
})

/*Open the todo list content on clicking a btn*/ 
let todo = document.getElementById("todolist");

todo.addEventListener("click",()=>{
    location.href = "index_todo.html";
    /*document.getElementById("todo_1").style.display = "block";
    document.getElementById("dictonary_1").style.display = "none";
    document.getElementById("btnftr").style.width = "430px"; 
    document.getElementById("btnftr").style.height = "500px"; */
})


/*close the translate box when click on other area*/ 
document.addEventListener("click",(event)=>{
    if(!translate.contains(event.target)){
        document.getElementById("translate_1").style.display = "none";
    }
})
/*close the dictonary box when click on other area*/ 
document.addEventListener("click",(event)=>{
    if(!dictonary.contains(event.target)){
        document.getElementById("dictonary_1").style.display = "none";
    }
})

/* Closing the to do list*/ 
document.addEventListener("click",(event)=>{
    if(!todo.contains(event.target)){
        document.getElementById("todo_1").style.display = "none";
    }
})
/*Open the highlight content on clicking a btn*/ 
let highl = document.getElementById("highl");

highl.addEventListener("click",(event)=>{
    location.href = "src/popup/popup.html";
    /*document.getElementById("highlight_1").style.display = "block";
    document.getElementById("dictonary_1").style.display = "none";
    document.getElementById("btnftr").style.width = "400px"; 
    document.getElementById("btnftr").style.height = "600px"; */
})
/*close the highlight box when click on other area*/ 
document.addEventListener("click",(event)=>{
    if(!highl.contains(event.target)){
        document.getElementById("highlight_1").style.display = "none";
    }
})