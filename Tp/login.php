<?php
require_once __DIR__ . '/Php/config.php';

$messageErreur = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $stmt = $conn->prepare('SELECT * FROM usagers WHERE `login` = ?');
  $stmt->execute([$username]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
    $_SESSION['usager'] = $user['id'];
    header("Location: /index.php");
    exit;
  } else {
    $messageErreur = "Votre nom d'utilisateur ou le mot de passe entré incorrect.";
  }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <title>Librairie de jeux</title>
  <!-- Bootstrap CSS -->

  <link rel="stylesheet" href="./Style/index.css" />
</head>

<body>
  <img class="logo" src="img\entete\NVPlay-logos\NVPlay-logos_white.png" />

  <div class="container my-4">
    <section id="authentification" class="mb-4">
      <h2>Authentification</h2>
      <?php if ($messageErreur): ?>
        <div class="alert alert-danger">
          <?= $messageErreur ?>
        </div>
      <?php endif; ?>
      <form id="loginForm" class="form-group" action='./login.php' method='post'>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" class="form-control" required />

        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" class="form-control" required />

        <button type="submit" class="btn btn-primary mt-2 .align-top">
          Se connecter
        </button> <button class="btn btn-secondary mt-2" onclick="window.location.href='./nouvelUsager.php';">Créer un
          compte</button>

      </form>
    </section>
  </div>

  <footer class="footer">
    <p>&copy; Copyright Gab et Chrichri</p>
  </footer>
</body>

</html>