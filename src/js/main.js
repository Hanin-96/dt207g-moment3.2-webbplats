"use strict"

window.onload = loadCv;

async function loadCv() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("cv-wrap").innerHTML = "";

    try {
        const response = await fetch("https://dt207g-moment-2.onrender.com/api/cv");
        const data = await response.json();
        //console.log(data);

        displayCv(data);

    } catch {
        document.getElementById("error").innerHTML = "Det går inte att läsa in cv:n";
    }
}

function displayCv(cvData) {
    cvData.forEach(cv => {
        //console.log(cv);
        document.getElementById("cv-wrap").innerHTML +=
            `<article class="cv-article">
                <h2 class="cv-wrap-title">${cv.job_title}</h2>
                <p class="cv-company">${cv.company_name}</p>
                <p class="cv-location">${cv.location}</p>
                <p class="cv-description">${cv.description}</p>
            </article>`

            let cvWrap = document.getElementById("cv-wrap");
            let btnDelete = document.createElement("button");
            let btnText = document.createTextNode("Ta bort");

            btnDelete.appendChild(btnText);

            cvWrap.appendChild(btnDelete);

            btnDelete.addEventListener("click", () => {
                deleteCv(cv.cv_id);
            })
    });
}

async function deleteCv(cvId) {
    //Fetch anrop för att lägga till cv med POST
    try {
        const response = await fetch("https://dt207g-moment-2.onrender.com/api/cv/" + cvId, {
            method: "DELETE",
        });

        //console.log(response);

        if (!response.error) {
            loadCv();

        } else {
            document.getElementById("error").innerHTML = "Det går inte att ta bort cv";
        }

    } catch {
        document.getElementById("error").innerHTML = "Det gick inte att ta bort cv:" + error.message;
    }
}