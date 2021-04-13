// Ajout de l'EventListener sur derniereMesure
document.getElementById("top_mesures").addEventListener("click", function () {
    affichageResult(baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures/top?measure-type=', top = "Top mesures du : ")
})
document.getElementById("derniere_mesures").addEventListener("click", function () {
    affichageResult(baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures/last?measure-type=', top = "Dernières mesures du : ")
})
document.getElementById("Tableaux_mesures").addEventListener("click", function () {
    affichageTab(baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com:443/api/measures?measure-type=')
})

// Fonction pour afficher les dates et les valeurs dans un tableau
function affichageTab(baseApiUrl) {
    const newBlockDate = document.getElementById("tab-date");
    // Affichage du cadran date
    newBlockDate.style.display = "block";
    // Déclaration de 2 variables pour récupérer les dates
    let dateStart = document.getElementById("input-date").value;
    let dateEnd = document.getElementById("input-datefin").value;

    const choice = document.getElementById("type-select").value;

    // Récupération du tableau de mesures
    fetch(baseApiUrl + choice + '&start-date=' + dateStart + '&end-date=' + dateEnd).then(function (response) {
        response.json().then(function (result) {
            document.getElementById('table-body').innerHTML = "";

            // Affichage du tableau des résultats
            for (let i = 0; i < result.length; i++) {

                const ligne = document.createElement("tr");
                console.log(i);
                const tableBody = document.getElementById("table-body");
                //tableBody.removeChild(" ");
                tableBody.appendChild(ligne);
                // Création de mes cellules qui vont contenir mes datas dans mon formulaire
                const td1 = document.createElement("td");
                //Formatage date du tableau
                let dateTab = new Date(result[i].measureDate);
                td1.textContent = dateTab.getDate() + "/" + (dateTab.getMonth() + 1) + "/" + dateTab.getFullYear() + " " + dateTab.getHours() + ":" + dateTab.getMinutes() + ":" + dateTab.getSeconds();
                ligne.appendChild(td1);
                console.log(td1);
                const td2 = document.createElement("td");
                td2.textContent = result[i].value;
                ligne.appendChild(td2);
                console.log(td2);
            }

        })
    })
}

function affichageResult(baseApiUrl, top) {

    const choice = document.getElementById("type-select").value;
    //const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures/last?measure-type=';

    // Récupération de la dernière valeur d'un type de mesure
    fetch(baseApiUrl + choice).then(function (response) {
        response.json().then(function (result) {

            // On met le texte dans notre bloc + date du jour
           //current_date = new Date();
           let date = new Date(result.measureDate);
           console.log(date);
            const newBlock = document.createElement("p");
            // vider le cadre d'affichage
            document.getElementById('affichage').innerHTML = "";
            newBlock.textContent = top +  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            newBlock.textContent += " \r\n " + result.type + " :" + result.value + " " + result.unit;
            newBlock.innerHTML = newBlock.innerHTML.replace(/\n\r?/g, '<br />');

            const section = document.getElementById("affichage");
            section.appendChild(newBlock);
            section.style.fontFamily = 'Verdana';
            section.style.fontWeight = 'Bold'
            section.style.borderStyle = 'dashed';
            section.style.borderColor = 'orange';
            section.margin = 'auto';

        });

    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
}

//function convertDate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    let d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/'), d
}
