function mOver(divObj) {
    divObj.innerHTML = "Here you have the opportunity to list your favorite music"
}

function mOut(obj) {
    obj.innerHTML = "Itt lehetőséged van arra, hogy listába foglald kedvenc zenéidet"
}

function validateForm() {

    var myForm = document.forms["myForm"];

    var title = myForm["title"].value;
    var year_of_publication = myForm["year_of_publication"].value;
    var performer = myForm["performer"].value;
    var link = myForm["link"].value;
    var genre = myForm["genre"].value;
    var publisher = myForm["publisher"].value;
    var length = myForm["length"].value;
    var comment = myForm["comment"].value;

    localStorage.setItem("title", title);
    localStorage.setItem("year_of_publication", year_of_publication);
    localStorage.setItem("genre", genre);
    localStorage.setItem("performer", performer);
    localStorage.setItem("link", link);
    localStorage.setItem("publisher", publisher);
    localStorage.setItem("length", length);
    localStorage.setItem("comment", comment);

    if (title === "") {
        alert("Add meg a címet");
        myForm["title"].focus();
        return false;
    }
    if (year_of_publication === "") {
        alert("Add meg az évszámot");
        myForm["year_of_publication"].focus();
        return false;
    }
    if (year_of_publication <= 0) {
        alert("Az évszám nem lehet kisebb mint 0");
        myForm["year_of_publication"].focus();
        return false;
    }
    if (year_of_publication > new Date().getFullYear()) {
        alert("Az évszám nem lehet nagyobb mint az aktuális év");
        myForm["year_of_publication"].focus();
        return false;
    }
    if (performer === "") {
        alert("Add meg az előadót");
        myForm["performer"].focus();
        return false;
    }
    if (publisher === "") {
        alert("Add meg a kiadót");
        myForm["publisher"].focus();
        return false;
    }
    if (length === "") {
        alert("Add meg a zene hosszát");
        myForm["length"].focus();
        return false;
    }
    if (link === "") {
        alert("Add meg a linket")
        myForm["link"].focus();
        return false;
    }
    if (link.search(".com") == -1 && link.search(".hu") == -1 && link.search(".org") == -1) {
        alert("Érvénytelen link! A link csak a .hu/.com/.org tartománykódok valamelyikére végződhet!");
        return false;
    }

    if (!checkDuplicate(title)) {
        alert("Már van ilyen névvel zene");
        return false;
    }
    alert("OK!")
    return true;

}

function genreOnChange() {
    change = document.getElementById("genre").value
    alert(change);
}


//Ezzel a hozzáadás gomb működik enter lenyomására is
function addInputSubmitEvent(myForm, input) {
    input.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            form.submit();
            return false;
        }
    };
}

var titles = [];

function checkDuplicate(title) {

    for (let i = 0; i < titles.length; i++) {
        if (titles[i] === title) {
            return false;
        }
    }
    return true;
}


function timeBasedGreeting() {
    var greeting;
    var time = new Date().getHours();
    if (time < 10) {
        greeting = "Jó reggelt";
    } else if (time < 17) {
        greeting = "Szép jó napot";
    } else {
        greeting = "Jó estét!";
    }
    document.getElementById("myGreeting").innerHTML = greeting;

}


function addRow() {

    if (validateForm()) {
        var table = document.getElementById("myTableData");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
        row.insertCell(1).innerHTML = localStorage.getItem("title");
        row.insertCell(2).innerHTML = localStorage.getItem("year_of_publication");
        row.insertCell(3).innerHTML = localStorage.getItem("genre");
        row.insertCell(4).innerHTML = localStorage.getItem("performer");
        row.insertCell(5).innerHTML = localStorage.getItem("link");
        row.insertCell(6).innerHTML = localStorage.getItem("publisher");
        row.insertCell(7).innerHTML = localStorage.getItem("length");
        row.insertCell(8).innerHTML = localStorage.getItem("comment");

        titles.push(localStorage.getItem("title"));

    }

}

function deleteRow(obj) {

    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);

}