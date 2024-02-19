<?php
require_once __DIR__ . '/Php/config.php';
$stmt = $conn->prepare('SELECT * FROM jeux');
$stmt->execute();
$listJeux = $stmt->fetchAll();

$listJeuxJson = json_encode($listJeux);

$stmt = $conn->prepare('SELECT * FROM categories');
$stmt->execute();
$listCategories = $stmt->fetchAll();

$listCategoriesJson = json_encode($listCategories);

$stmt = $conn->prepare('SELECT * FROM jeux_plateformes');
$stmt->execute();
$listJeuxPlateformes = $stmt->fetchAll();

$listJeuxPlateformesJson = json_encode($listJeuxPlateformes);

$stmt = $conn->prepare('SELECT * FROM plateformes');
$stmt->execute();
$listPlateformes = $stmt->fetchAll();

$listPlateformesJson = json_encode($listPlateformes);

session_start();
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] && isset($_GET['deconnexion']) == 1) {
  // remove all session variables
  session_unset();

  // destroy the session
  session_destroy();
}

?>
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" type="text/css" href="Style/normalize.css" />
  <title>Index de jeux</title>
  <meta charset="utf-8" lang="fr" />
  <link rel="stylesheet" href="./Style/index.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono&display=swap" rel="stylesheet" />
  <script>
    let tableauJeux = <?= $listJeuxJson ?>;
    let tableauCategories = <?= $listCategoriesJson ?>;
    let tableauJeuxPlateformes = <?= $listJeuxPlateformesJson ?>;
    let tableauPlateformes = <?= $listPlateformesJson ?>;
    <?php if(!isset($_SESSION['permission'])){
      $_SESSION['permission'] = 'regulier';
    }
    ?>
    let permissions = '<?= $_SESSION['permission'] ?>';
  </script>
</head>

<body>
  <dialog id="dialog1">
    <form action="./" method="post">
      <label for="Nom_jeu">Nom de jeu: </label>
      <input type="text" name="Nom_jeu" id="Nom_jeu" />
      <label for="img_jeu">URL de l'image: </label>
      <input type="url" name="img_jeu" id="img_jeu" />
      <label for="plateformes">Plateformes: </label>
      <select name="plateformes" id="platformes" class="select-platforme" multiple>
        <option value="def">--Veuiller choisir--</option>
      </select>
      <select name="categories" id="categories" class="select-cat">
        <option value="def">--Veuiller choisir--</option>
      </select>
      <div>
        <input id="acceptDialog" type="button" value="Valider" />
        <input id="closeDialog" type="reset" value="Annuler" />
      </div>
    </form>
  </dialog>
  <!--Ceci est la boite de dialog quand on veut modifier les infos d'un jeu-->
  <dialog id="dialogModif">
    <form action="./" method="post">
      <label for="mod-nom">Nom de jeu: </label>
      <input type="text" name="Nom_jeu" id="mod-nom" />
      <label for="mod-img">URL de l'image: </label>
      <input type="url" name="img_jeu" id="mod-img" />
      <label for="mod-plat">Plateformes: </label>
      <select name="plateformes" id="mod-plat" class="select-platforme" multiple>
        <option value="def">--Veuiller choisir--</option>
      </select>
      <select id="mod-cat" name="categories" class="select-cat">
        <!-- boucle pour toutes les categories de la base de donnée-->
        <option value="def">--Veuiller choisir--</option>
      </select>
      <div>
        <input id="modifDialog" type="button" value="Valider" />
        <input id="closeModifDialog" type="reset" value="Annuler" />
      </div>
    </form>
  </dialog>
  <dialog id="dialogDelete">
    <form action="./" method="post">
      <label for="mod-nom">Êtes-vous sûr de vouloir effacer ce jeu?</label>
      <div>
        <input id="deleteDialog" type="button" value="Effacer" />
        <input id="closeDeleteDialog" type="reset" value="Annuler" />
      </div>
    </form>
  </dialog>
  <main class="conteneur">
    <div class="entete">
      <!--         <a href="./login.php" class="login">Log in</a>
 -->
      <?php
      if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
        echo "<a href=\"./?deconnexion=1\" class=\"login\">Deconnexion</a>";
      } else {
        echo "<a href=\"./login.php\" class=\"login\">Log in</a>";
        echo "<a href=\"./newUser.php\" class=\"login\">Register</a>";
      }
      ?>
    </div>
    <div class="menu">
      <select name="plateformes" id="select-plateformes" class="bouton-menu select-platforme">
        <option value="Toutes">Toutes les plateformes</option>
      </select>
      <select name="triage" id="bouton-tri" class="bouton-menu">
        <option value="def">Trier par</option>
      </select>
    </div>
    <div class="sidebar">
      <img class="logo" src="img\entete\NVPlay-logos\NVPlay-logos_white.png" />
      <nav class="categories">
        <ul>
        </ul>
      </nav>
      <?php
      if (isset($_SESSION['loggedin'])) {
        if ($_SESSION['permission'] == "admin") {
          echo '<button id="ajouter-jeu">Nouveau Jeu</button>';
        }
      }
      ?>
    </div>
    <section class="jeux">
    </section>
    <footer class="footer">&copy; Gab et Chrichri</footer>
  </main>
</body>
<script src="./Scripts/script.js"></script>

</html>