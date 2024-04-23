"use strict"

window.onload = loadAddPage;

function loadAddPage() {

    //Spara knapp
    let btnSubmit = document.getElementById("btn-submit");

    btnSubmit.addEventListener("click", addCv);
}

async function addCv(event) {
    event.preventDefault();
    document.getElementById("error").innerHTML = "";

    //Hämta alla DOM element
    let jobTitleInput = document.getElementById("jobtitle").value;
    let companyInput = document.getElementById("company").value;
    let locationInput = document.getElementById("location").value;
    let descriptionInput = document.getElementById("description").value;


    //Fetch anrop för att lägga till cv med POST
    try {
        const response = await fetch("https://dt207g-moment-2.onrender.com/api/cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobTitle: jobTitleInput,
                companyName: companyInput,
                location: locationInput,
                description: descriptionInput
            })
        });
        const data = await response.json();
        //console.log(data);

        if (response.ok) {
            //Redirect till startsida
            window.location.replace("/index.html");

        } else {
            document.getElementById("error").innerHTML = "Det går inte att spara cv, fyll i alla fält!";
        }

    } catch {
        document.getElementById("error").innerHTML = "Det går inte att läsa in cv:n";
    }
}