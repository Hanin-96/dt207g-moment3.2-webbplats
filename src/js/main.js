"use strict"

window.onload = loadCv;

async function loadCv() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("cv-wrap").innerHTML = "";

    try {
        const response = await fetch("https://dt207g-moment3-2-data.onrender.com/cv");
        const data = await response.json();
        //console.log(data);

        displayCv(data);

    } catch {
        document.getElementById("error").innerHTML = "Det går inte att läsa in cv:n";
    }
}

function displayCv(cvData) {
    cvData.forEach(cv => {
    
        let btnDelete = document.createElement("button");
        btnDelete.textContent = "Ta bort";
        btnDelete.addEventListener("click", () => deleteCv(cv._id));
    
        let cvWrap = document.getElementById("cv-wrap");
        let cvArticle = document.createElement("article");
        cvArticle.className = "cv-article";
        cvArticle.innerHTML = `
            <h2 class="cv-wrap-title">${cv.job_title}</h2>
            <p class="cv-company">${cv.company_name}</p>
            <p class="cv-location">${cv.location}</p>
            <p class="cv-description">${cv.description}</p>
        `;
        cvArticle.appendChild(btnDelete);
        cvWrap.appendChild(cvArticle);

    });
}

async function deleteCv(cvId) {
    //Fetch anrop för att lägga till cv med POST
    try {
        //console.log(cvId);
        const response = await fetch("https://dt207g-moment3-2-data.onrender.com/cv/" + cvId, {
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