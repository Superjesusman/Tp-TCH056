let tableauPlatforme = [
    (ps = {
        id: "ps",
        nom: "PlayStation",
        URL: "img/Playstation.png",
    }),
    (xbox = {
        id: "xbox",
        nom: "Xbox",
        URL: "img/Xbox.png",
    }),
    (win = {
        id: "win",
        nom: "Windows",
        URL: "img/Windows.png",
    }),
];

let tableauJeux = [
    (fnaf = {
        id: 1,
        titre: "Five Nigths at Freddy's",
        URL: "img/Jeux/FNAF.jpg",
        cat: 7,
        platformes: [win],
    }),
    (gtav = {
        id: 2,
        titre: "Grand Theft Auto V",
        URL: "img/Jeux/Grand_Theft_Auto_V.jpg",
        cat: 1,
        platformes: [xbox, win],
    }),
    (spiderMan2 = {
        id: 3,
        titre: "Spider-Man 2",
        URL: "img/Jeux/Spider_man_2.jpg",
        cat: 1,
        platformes: [ps],
    }),
    (halo = {
        id: 4,
        titre: "Halo: Infinite",
        URL: "img/Jeux/Halo.jpg",
        cat: 13,
        platformes: [xbox, win],
    }),
    (lethalCompany = {
        id: 5,
        titre: "Lethal Company",
        URL: "img/Jeux/Lethal_company.jpg",
        cat: 7,
        platformes: [win],
    }),
    (portal = {
        id: 6,
        titre: "Portal 2",
        URL: "img/Jeux/Portal_2.jpg",
        cat: 10,
        platformes: [ps, win, xbox],
    }),
    (uncharted = {
        id: 7,
        titre: "Uncharted",
        URL: "img/Jeux/Uncharted.jpg",
        cat: 2,
        platformes: [ps, win],
    }),
    (uno = {
        id: 8,
        titre: "Uno",
        URL: "img/Jeux/Uno.jpg",
        cat: 4,
        platformes: [win],
    }),
    (cod = {
        id: 9,
        titre: "Call of Duty",
        URL: "img/Jeux/Cod.jpg",
        cat: 13,
        platformes: [ps, xbox, win],
    }),
    (aShortHike = {
        id: 10,
        titre: "A short hike",
        URL: "img/Jeux/A_short_hike.jpg",
        cat: 5,
        platformes: [win],
    }),
    (wow = {
        id: 11,
        titre: "World of Warcraft",
        URL: "img/Jeux/wow.jpg",
        cat: 8,
        platformes: [win],
    }),
    (justDance = {
        id: 12,
        titre: "Just-Dance",
        URL: "img/Jeux/JUST DANCE GAME.jpg",
        cat: 6,
        platformes: [ps, xbox],
    }),
    (forza = {
        id: 13,
        titre: "Forza Horizon 5",
        URL: "img/Jeux/Forza.jpg",
        cat: 11,
        platformes: [xbox, win],
    }),
    (sims2 = {
        id: 14,
        titre: "Sims 2",
        URL: "img/Jeux/sims2.jpg",
        cat: 14,
        platformes: [ps, win],
    }),
    (fifa = {
        id: 15,
        titre: "Fifa 22",
        URL: "img/Jeux/FIFA.jpg",
        cat: 15,
        platformes: [ps, xbox],
    }),
    (pacMan = {
        id: 16,
        titre: "Pac-Man",
        URL: "img/Jeux/Pacman .jpg",
        cat: 3,
        platformes: [ps, xbox, win],
    }),
];

let tableauCategorie = [
    (action = {
        id: 1,
        nom: "Action",
        URL: "img/cat/action.png",
    }),
    (adventure = {
        id: 2,
        nom: "Adventure",
        URL: "img/cat/adventure.png",
    }),
    (arcade = {
        id: 3,
        nom: "Arcade",
        URL: "img/cat/arcade.png",
    }),
    (boardGames = {
        id: 4,
        nom: "Board Games",
        URL: "img/cat/board-game.png",
    }),
    (casual = {
        id: 5,
        nom: "Casual",
        URL: "img/cat/casual.png",
    }),
    (family = {
        id: 6,
        nom: "Family",
        URL: "img/cat/family.png",
    }),
    (indie = {
        id: 7,
        nom: "indie",
        URL: "img/cat/indie.png",
    }),
    (mmo = {
        id: 8,
        nom: "MMO",
        URL: "img/cat/sharing.png",
    }),
    (platformer = {
        id: 9,
        nom: "Platformer",
        URL: "img/cat/platformer.png",
    }),
    (puzzle = {
        id: 10,
        nom: "Puzzle",
        URL: "img/cat/puzzle.png",
    }),
    (racing = {
        id: 11,
        nom: "Racing",
        URL: "img/cat/race-car.png",
    }),
    (rpg = {
        id: 12,
        nom: "RPG",
        URL: "img/cat/RPG.png",
    }),
    (shooter = {
        id: 13,
        nom: "Shooter",
        URL: "img/cat/shooter.png",
    }),
    (simulation = {
        id: 14,
        nom: "Simulation",
        URL: "img/cat/simulation.png",
    }),
    (sports = {
        id: 15,
        nom: "Sports",
        URL: "img/cat/sports.png",
    }),
];

function afficherJeux(tab) {
    const parent = document.getElementsByTagName("main");

    tab.forEach(function (game) {

        const nouveauArticle = document.createElement("article");
        nouveauArticle.classList = "cover";

        const nouveauImg = document.createElement("img");
        nouveauImg.classList = "img_jeux";
        nouveauImg.src = game.URL;
        nouveauImg.alt = game.titre;

        const nouveauDiv = document.createElement("div");
        nouveauDiv.classList = "name-cover";

        const nouveauH1 = document.createElement("h1");
        nouveauH1.textContent = game.titre;

        const nouveauDiv2 = document.createElement("div");
        nouveauDiv2.classList = "img_plateform";

        game.platformes.forEach(function (gamePlatform) {

            const nouveauImgPlatform = document.createElement("img");
            nouveauImgPlatform.classList = "img_jeux";
            nouveauImgPlatform.src = gamePlatform.URL;
            nouveauImgPlatform.alt = gamePlatform.nom;
            nouveauDiv2.append(nouveauImgPlatform);
        });

        nouveauDiv.append(nouveauH1, nouveauDiv2);
        nouveauArticle.append(nouveauImg, nouveauDiv);
        parent[0].append(nouveauArticle);
    });
}




function filtrerJeu() {
    const parent = document.getElementsByTagName("main");
    parent[0].replaceChildren();
    tableauJeux.forEach(function (game) {
        if(plat && cat)
        {
            afficherJeux(tableauJeux);
        }
        else if ((game.platformes.includes(plat))|| (game.cat == categorie )) {

            const nouveauArticle = document.createElement("article");
            nouveauArticle.classList = "cover";

            const nouveauImg = document.createElement("img");
            nouveauImg.classList = "img_jeux";
            nouveauImg.src = game.URL;
            nouveauImg.alt = game.titre;

            const nouveauDiv = document.createElement("div");
            nouveauDiv.classList = "name-cover";

            const nouveauH1 = document.createElement("h1");
            nouveauH1.textContent = game.titre;

            const nouveauDiv2 = document.createElement("div");
            nouveauDiv2.classList = "img_plateform";

            game.platformes.forEach(function (gamePlatform) {

                const nouveauImgPlatform = document.createElement("img");
                nouveauImgPlatform.classList = "img_jeux";
                nouveauImgPlatform.src = gamePlatform.URL;
                nouveauImgPlatform.alt = gamePlatform.nom;
                nouveauDiv2.append(nouveauImgPlatform);
            });

            nouveauDiv.append(nouveauH1, nouveauDiv2);
            nouveauArticle.append(nouveauImg, nouveauDiv);
            parent[0].append(nouveauArticle);
        }
        /*if (game.cat == categorie) {

            const nouveauArticle = document.createElement("article");
            nouveauArticle.classList = "cover";

            const nouveauImg = document.createElement("img");
            nouveauImg.classList = "img_jeux";
            nouveauImg.src = game.URL;
            nouveauImg.alt = game.titre;

            const nouveauDiv = document.createElement("div");
            nouveauDiv.classList = "name-cover";

            const nouveauH1 = document.createElement("h1");
            nouveauH1.textContent = game.titre;

            const nouveauDiv2 = document.createElement("div");
            nouveauDiv2.classList = "img_plateform";

            game.platformes.forEach(function (gamePlatform) {

                const nouveauImgPlatform = document.createElement("img");
                nouveauImgPlatform.classList = "img_jeux";
                nouveauImgPlatform.src = gamePlatform.URL;
                nouveauImgPlatform.alt = gamePlatform.nom;
                nouveauDiv2.append(nouveauImgPlatform);
            });

            nouveauDiv.append(nouveauH1, nouveauDiv2);
            nouveauArticle.append(nouveauImg, nouveauDiv);
            parent[0].append(nouveauArticle);
        }*/
    });
}


function afficherCategorie(tab) {
    const parent = document.getElementsByTagName("ul");

    for (let i = 0; i < tab.length; i++) {
        const nouveauLi = document.createElement("li");

        const nouveauImg = document.createElement("img");
        nouveauImg.classList = "img_categorie";
        nouveauImg.src = tab[i].URL;

        const nouveauBtn = document.createElement("button");
        nouveauBtn.textContent = tab[i].nom;

        //nouveauBtn.addEventListener('click', filtrerJeu(tab[i].id));
        nouveauBtn.addEventListener('click', function () {
            categorie = tab[i].id;
            filtrerJeu();
        }
        );
        nouveauLi.append(nouveauImg, nouveauBtn);
        parent[0].append(nouveauLi);
    }
}

const dialog = document.querySelector('dialog#dialog1');
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


const selectionPlateforme = document.getElementById("select-plateformes");
selectionPlateforme.addEventListener("change", function() {
    switch (this) {
        case "PC":
            plat = win;
            break;
        case "Xbox":
            plat = xbox;
            break;
        case "Playstation":
            plat = ps;
            break;
        default:
            plat = null;
    }
    filtrerJeu();
});

afficherCategorie(tableauCategorie);
afficherJeux(tableauJeux);

