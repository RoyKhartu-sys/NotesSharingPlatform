function searchNotes(){
    let search = document.getElementById("searchInput").value.trim().toLowerCase();
    if(search =="html"){
        window.location.href="html.html";
    }
    else if(search =="css"){
        window.location.href="css.html";
    }
    else if(search =="javascript"){
        window.location.href="javascript.html";
    }
    else if(search =="javascriptbasics"){
        window.location.href="javascriptbasics.html";
    }
    else if(search =="cssbasics"){
        window.location.href="cssbasics.html";
    }
    else if(search =="htmlbasics"){
        window.location.href="htmlbasics.html";
    }
    else{
        alert("no notes found.");
    }
}
function uploadNotes(){
    let name = document.getElementById("name").value.trim();
    let subject= document.getElementById("subject").value;
    let filename= document.getElementById("filename").value.trim();
    if(name==""||subject==""||filename==""){
        alert("Its empty. Fill it");
        return false;
    }
    alert("Notes uploaded successfully");
    return false;
}