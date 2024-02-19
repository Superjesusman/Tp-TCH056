//functions locales
function addPlatElements(gamePlatformId, elt) {
  for (let i = 0; i < tableauPlateformes.length; i++) {
    if (gamePlatformId == tableauPlateformes[i].id) {
      const nouveauImgPlatform = document.createElement("img");
      nouveauImgPlatform.classList = "img_jeux";
      nouveauImgPlatform.src = tableauPlateformes[i].url_icone;
      nouveauImgPlatform.alt = tableauPlateformes[i].nom;
      elt.append(nouveauImgPlatform);
    }
  }
}

function ajouterBtnSupprimerJeu(game) {
  //Creer le bouton delete jeu
  const nouveauBtnDelete = document.createElement("button");
  nouveauBtnDelete.classList = "bouton-jeu";
  nouveauBtnDelete.id = "btn-supprimer";
  nouveauBtnDelete.textContent = "Effacer";

  //Obtenir les elements de dialogues
  const dialogDelete = document.getElementById("dialogDelete");
  const acceptBtnDelete = document.getElementById("deleteDialog");
  const closeBtnDelete = document.getElementById("closeDeleteDialog");
  let isDeleting;

  //Ajouter un event listener pour le bouton delete
  nouveauBtnDelete.addEventListener("click", () => {
    dialogDelete.showModal();
    isDeleting = true;
  });

  //Ajouter un event listener pour accepter la suppression
  acceptBtnDelete.addEventListener("click", () => {
    if (isDeleting) {
      fetch("/api/jeux/" + game.id, {
        method: "DELETE", // Méthode HTTP
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "La requête a échoué avec le statut " + response.status
            );
          }
          return response.json(); // Convertir la réponse en JSON
        })
        .then((data) => {
          if (data.error) {
            throw new Error("Erreur lors de la suppression: " + data.error);
          }
          tableauJeux = tableauJeux.filter((g) => g.id != game.id);
          afficherJeux();
        })
        .catch((error) => {
          alert("Erreur lors de la suppression du jeu: " + error);
          console.error("Erreur lors de la requête:", error);
        });
      isDeleting = false;
      dialogDelete.close();
      /*tableauJeux.splice(currentGameDeletePos, 1);
        const parent = document.getElementsByClassName("jeux");
        parent[0].replaceChildren();
        afficherJeux(tableauJeux);
        isDeleting = false;
        dialogDelete.close();*/
    }
  });

  //Ajouter un event listener pour annuler la suppression
  closeBtnDelete.addEventListener("click", () => {
    dialogDelete.showModal();
  });

  return nouveauBtnDelete;
}

function afficherUneOption(obj, parent) {
  //Créer une nouvelle option
  const nouvelleOption = document.createElement("option");
  nouvelleOption.value = obj.id;
  nouvelleOption.textContent = obj.titre;
  parent.append(nouvelleOption);
}

//functions

function afficherOptionPlateforme(tab) {
  const listeParents = document.getElementsByClassName("selectPlatforme");

  for (let i = 0; i < listeParents.length; i++)  {
    tab.forEach(function (plateforme) {
      afficherUneOption(plateforme, listeParents[i]);
    });
  }
}

function afficherOptionCategories(tab) {
  const listeParents = document.getElementsByClassName("select-cat");

  for (let i = 0; i < listeParents.length; i++) {
    tab.forEach(function (categorie) {
      afficherUneOption(categorie, listeParents[i]);
    });
  } 
}

function afficherUnJeu(game, parent) {
  //Créer un nouveau article avec classe "cover"
  const nouveauArticle = document.createElement("article");
  nouveauArticle.classList = "cover";

  //Creer le background
  const nouveauImg = document.createElement("img");
  nouveauImg.classList = "img_jeux";
  nouveauImg.src = game.url_image;
  nouveauImg.alt = game.titre;

  //Creer le div pour le titre de jeu
  const nouveauDivTitre = document.createElement("div");
  nouveauDivTitre.classList = "name-cover";

  //Creer le titre
  const nouveauH1 = document.createElement("h1");
  nouveauH1.textContent = game.titre;

  //Creer un element div pour les plateformes
  const nouveauDivPlatforme = document.createElement("div");
  nouveauDivPlatforme.classList = "img_plateform";

  //pour chaque plateforme, ajouter les elements necessaires
  for (let i = 0; i < tableauJeuxPlateformes.length; i++) {
    if (game.id == tableauJeuxPlateformes[i].id_jeux)
      addPlatElements(
        tableauJeuxPlateformes[i].id_plateforme,
        nouveauDivPlatforme
      );
  }

  if (permissions == "admin") {
    //Creer le bouton delete
    const nouveauBtnDelete = ajouterBtnSupprimerJeu(game);

    //Creer le boutton modifier
    const nouveauBtnModif = document.createElement("button");
    nouveauBtnModif.classList = "bouton-jeu";
    nouveauBtnModif.id = "btn-mod";
    nouveauBtnModif.textContent = "Modifier";

    const dialog = document.querySelector("dialog#dialogModif");
    const acceptBtnModif = document.getElementById("modifDialog");

    //Ajouter event lstener pour valider les modifications
    nouveauBtnModif.addEventListener("click", () => {
      dialog.showModal();
      let isModifying = true;
      let currentGame = game;
      const closeModifButton = document.getElementById("closeModifDialog");
      closeModifButton.addEventListener("click", () => {
        dialog.close();
      });

      acceptBtnModif.addEventListener("click", () => {
        if (isModifying) {
          const nouveauTitre = document.getElementById("mod-nom").value;
          const nouveauUrl = document.getElementById("mod-img").value;
          const nouvelleCat = document.getElementById("mod-cat").value;
          const nouveauPlatformes = document.getElementById("mod-plat");
          let plateformesSelectione = [];
          for (const selection of nouveauPlatformes.options) {
            if (selection.selected) {
              for (let i = 0; i < tableauPlatforme.length; i++) {
                if (tableauPlatforme[i].nom == selection.value) {
                  plateformesSelectione.push(tableauPlatforme[i]);
                }
                if (selection.value == "def") {
                  plateformesSelectione = currentGame.platformes;
                }
              }
            }
          }

          if (nouveauTitre) {
            currentGame.titre = nouveauTitre;
            document.getElementById("mod-nom").value = "";
          }

          if (nouveauUrl) {
            currentGame.URL = nouveauUrl;
            document.getElementById("mod-img").value = "";
          }

          if (nouvelleCat && nouvelleCat != "def") {
            currentGame.cat = nouvelleCat;
            document.getElementById("mod-cat").value = "def";
          }

          if (nouveauPlatformes && nouveauPlatformes.value != "") {
            currentGame.platformes = plateformesSelectione;
            var selectPlatformes = document.getElementById("mod-plat");

            // Loop through each option and set selected to false
            for (var i = 0; i < selectPlatformes.options.length; i++) {
              selectPlatformes.options[i].selected = false;
            }
          }
          const gameIndex = tableauJeux.findIndex(p => p.id == game.id);
          fetch("/api/jeux/"+game.id, {
            method: 'PUT', // Méthode HTTP
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableauJeux[gameIndex]) // Convertir l'objet de données en chaîne JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué avec le statut ' + response.status);
            }
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
            moddedGame = tableauJeux.find((g) => g.id == game.id); 
            moddedGame.titre = data.titre;
            moddedGame.id_categorie = data.id_categorie;
            moddedGame.url_image = data.url_image;
            afficherJeux();
        })
        .catch(error => {
            
            alert("Erreur lors de la modification du jeu: "+error);
            afficherJeux();
            console.error('Erreur lors de la requête:', error);
        });
          isModifying = false;
          dialog.close();
          const parent = document.getElementsByClassName("jeux");
          parent[0].replaceChildren();
          afficherJeux();
        }
      });
      document.getElementById("mod-nom").placeholder = game.titre;
      document.getElementById("mod-img").placeholder = game.url_image;
    });
    const nouveauDivHover = document.createElement("div");
    nouveauDivHover.classList = "hover-cover";
    nouveauDivTitre.append(nouveauH1, nouveauDivPlatforme);
    nouveauArticle.append(
      nouveauImg,
      nouveauBtnDelete,
      nouveauBtnModif,
      nouveauDivHover,
      nouveauDivTitre
    );
  } else {
    nouveauDivTitre.append(nouveauH1, nouveauDivPlatforme);
    nouveauArticle.append(nouveauImg, nouveauDivTitre);
  }

  //ajouter les elements a leur parent

  parent[0].append(nouveauArticle);
}

function afficherJeux() {
  const parent = document.getElementsByTagName("section");
  removeJeux();
  tableauJeux.forEach(function (game) {
    afficherUnJeu(game, parent);
  });
}

function removeJeux() {
  const mySection = document.getElementsByTagName("section");
  mySection[0].replaceChildren();
}

function afficherCategorie(tab) {
  const parent = document.getElementsByTagName("ul");

  //Tous les cat
  const nouveauLi = document.createElement("li");
  const nouveauBtn = document.createElement("button");
  nouveauBtn.textContent = "View All";

  //nouveauBtn.addEventListener('click', filtrerJeu(tab[i].id));
  nouveauBtn.addEventListener("click", function () {
    categorie = null;
    filtrerJeu();
  });
  nouveauLi.append(nouveauBtn);
  parent[0].append(nouveauLi);

  for (let i = 0; i < tab.length; i++) {
    const nouveauLi = document.createElement("li");

    const nouveauImg = document.createElement("img");
    nouveauImg.classList = "img_categorie";
    nouveauImg.src = tab[i].url_image;

    const nouveauBtn = document.createElement("button");
    nouveauBtn.textContent = tab[i].titre;

    //nouveauBtn.addEventListener('click', filtrerJeu(tab[i].id));
    nouveauBtn.addEventListener("click", function () {
      categorie = tab[i].id;
      filtrerJeu();
    });

    nouveauLi.append(nouveauImg, nouveauBtn);
    parent[0].append(nouveauLi);
  }
}

function filtrerJeu() {
  const parent = document.getElementsByTagName("section");
  parent[0].replaceChildren();
  tableauJeux.forEach(function (game) {
    if (categorie) {
      if (plat) {
        for (let i = 0; i < tableauJeuxPlateformes.length; i++) {
          if (
            plat == tableauJeuxPlateformes[i].id_plateforme &&
            game.id == tableauJeuxPlateformes[i].id_jeux &&
            game.id_categorie == categorie
          ) {
            afficherUnJeu(game, parent);
          }
        }
      } else {
        if (game.id_categorie == categorie) {
          afficherUnJeu(game, parent);
        }
      }
    } else {
      if (plat) {
        for (let i = 0; i < tableauJeuxPlateformes.length; i++) {
          if (
            plat == tableauJeuxPlateformes[i].id_plateforme &&
            game.id == tableauJeuxPlateformes[i].id_jeux
          ) {
            afficherUnJeu(game, parent);
          }
        }
      } else {
        afficherUnJeu(game, parent);
      }
    }
  });
}

//function pour tester
function removeToTest() {
  const mySection = document.getElementsByTagName("section");
  mySection[0].replaceChildren();

  const myUl = document.getElementsByTagName("ul");
  myUl[0].replaceChildren();
}

if (permissions == "admin") {
  //eventlisteners
  const dialog = document.querySelector("dialog#dialog1");

  const btnOuvrirDialog = document.getElementById("ajouter-jeu");

  const closeButton = document.getElementById("closeDialog");
  const acceptButton = document.getElementById("acceptDialog");

  // "Show the dialog" button opens the dialog modally
  btnOuvrirDialog.addEventListener("click", () => {
    dialog.showModal();
  });

  // "Close" button closes the dialog
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  acceptButton.addEventListener("click", () => {
    const nouveauTitre = document.getElementById("Nom_jeu").value;
    const nouveauURL = document.getElementById("img_jeu").value;
    const nouveauPlatformes = document.getElementById("platformes");
    const nouveauCategorie = document.getElementById("categories").value;
    const plateformesSelectione = [];
    // HARDCODE TO CHANGE
    for (const selection of nouveauPlatformes.options) {
      if (selection.selected) {
        for(let $i=0 ;$i<tableauPlateformes.length ;$i++){
          if (selection.value==tableauPlateformes[$i].id){
            plateformesSelectione.push(tableauPlateformes[$i])
          }
        }
      }
    }

    let nouveauJeu = {
      id: -1,
      titre: nouveauTitre,
      url_image: nouveauURL,
      id_categorie: nouveauCategorie,
      plateformes: plateformesSelectione,
    };
    
    console.log(tableauJeux);
    afficherJeux();
    fetch("/api/jeux", {
      method: "POST", // Méthode HTTP
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nouveauJeu), // Convertir l'objet de données en chaîne JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }
        return response.json(); // Convertir la réponse en JSON
      })
      .then((data) => {
        if (data.error) {
          throw new Error("Erreur lors de la l'ajout: " + data.error);
        }
        nouveauJeu.id = data.id;
        nouveauJeu.titre = data.titre;
        nouveauJeu.id_categorie = Number(data.id_categorie);
        nouveauJeu.url_image = data.url_image;
        nouveauJeu.plateformes = data.plateformes;
        tableauJeux.push(nouveauJeu);
        afficherJeux();
      })
      .catch((error) => {
        tableauJeux = tableauJeux.filter((g) => g.id != -1);
        alert("Erreur lors de l'ajout du jeu: " + error);
        console.error("Erreur lors de la requête:", error);
      });


    dialog.close();
  });
}

let plat = null;
let categorie = null;
const selectionPlateforme = document.getElementById("select-plateformes");
selectionPlateforme.addEventListener("change", (event) => {
  switch (selectionPlateforme.value) {
    case "PC":
      plat = 3;
      break;
    case "Xbox":
      plat = 2;
      break;
    case "Playstation":
      plat = 1;
      break;
    default:
      plat = null;
  }
  filtrerJeu();
});

//script
removeToTest();
afficherOptionCategories(tableauCategories);
afficherOptionPlateforme(tableauPlateformes);
afficherCategorie(tableauCategories);
afficherJeux();
