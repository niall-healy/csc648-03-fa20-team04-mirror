// This to just demonstrate how the HTML element values can be retrieved
// This code should eventually be removed

button1 = document.getElementById("textButton");
button1.addEventListener("click", textSearch);

button2 = document.getElementById("dropButton");
button2.addEventListener("click", dropSearch);

function textSearch(){
    text = document.getElementById("text").value;
    alert(text);
}

function dropSearch(){
    dropdown = document.getElementById("dropdown");
    alert(dropdown.options[dropdown.selectedIndex].value);
}