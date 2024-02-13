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
  let currentGameDeletePos;

  //Ajouter un event listener pour le bouton delete
  nouveauBtnDelete.addEventListener("click", () => {
    dialogDelete.showModal();
    isDeleting = true;
    currentGameDeletePos = tableauJeux.indexOf(game);
  });

  //Ajouter un event listener pour accepter la suppression
  acceptBtnDelete.addEventListener(
    "click",
    () => {
      if (isDeleting) {
        tableauJeux.splice(currentGameDeletePos, 1);
        const parent = document.getElementsByClassName("jeux");
        parent[0].replaceChildren();
        afficherJeux(tableauJeux);
        isDeleting = false;
        dialogDelete.close();
      }
    },
    { once: true }
  );

  //Ajouter un event listener pour annuler la suppression
  closeBtnDelete.addEventListener("click", () => {
    dialogDelete.showModal();
  });

  return nouveauBtnDelete;
}

//functions

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
  //game.platformes.forEach(gamePlatform => addPlatElements(gamePlatform, nouveauDivPlatforme));

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
          isModifying = false;
          dialog.close();
          const parent = document.getElementsByClassName("jeux");
          parent[0].replaceChildren();
          afficherJeux(tableauJeux);
        }
      });
      document.getElementById("mod-nom").placeholder = game.titre;
      document.getElementById("mod-img").placeholder = game.url_image;
    });
    const nouveauDivHover = document.createElement("div");
    nouveauDivHover.classList = "hover-cover";
    nouveauDivTitre.append(nouveauH1, nouveauDivPlatforme);
    nouveauArticle.append(nouveauImg,nouveauBtnDelete, nouveauBtnModif, nouveauDivHover,nouveauDivTitre);
  }
else{
     nouveauDivTitre.append(nouveauH1, nouveauDivPlatforme);
    nouveauArticle.append(nouveauImg, nouveauDivTitre);
}
  //ajouter les elements a leur parent

  parent[0].append(nouveauArticle);
}

function afficherJeux(tab) {
  const parent = document.getElementsByTagName("section");

  tab.forEach(function (game) {
    afficherUnJeu(game, parent);
  });
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
  for (const selection of nouveauPlatformes.options) {
    if (selection.selected) {
      if (selection.value == "Playstation") {
        plateformesSelectione.push(tableauPlatforme[0]);
      }
      if (selection.value == "Xbox") {
        plateformesSelectione.push(tableauPlatforme[1]);
      }
      if (selection.value == "Windows") {
        plateformesSelectione.push(tableauPlatforme[2]);
      }
    }
  }

  nouveauJeu = {
    id: tableauJeux.length + 1,
    titre: nouveauTitre,
    URL: nouveauURL,
    cat: nouveauCategorie,
    platformes: plateformesSelectione,
  };

  dialog.close();
  tableauJeux.push(nouveauJeu);
  const parent = document.getElementsByClassName("jeux");
  parent[0].replaceChildren();
  afficherJeux(tableauJeux);
});

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
afficherCategorie(tableauCategories);
afficherJeux(tableauJeux);
