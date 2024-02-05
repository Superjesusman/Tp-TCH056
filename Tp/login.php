<?php
require_once __DIR__.'/PHP/config.php';

$messageErreur ='';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $stmt = $mysqli->prepare('SELECT * FROM users WHERE username = ?');
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
    <title>Babillard de Post-its Électroniques</title>
    <!-- Bootstrap CSS -->
    <link
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="bg-primary text-white text-center py-3">
      <h1>Babillard de Post-its Électroniques</h1>
    </header>

    <div class="container my-4">
      <section id="authentification" class="mb-4">
        <h2>Authentification</h2>
        <?php if($error): ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php endif; ?>
        <form id="loginForm" class="form-group" action='./login.php' method='post'>
          <label for="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            required
          />

          <label for="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            required
          />

          <button type="submit" class="btn btn-primary mt-2 .align-top">
            Se connecter
          </button> <button class="btn btn-secondary mt-2" onclick = "window.location.href='./nouvelUsager.php';">Créer un compte</button>
          
        </form>
      </section>
    </div>

    <footer class="bg-primary text-white text-center py-3 fixed-bottom">
      <p>&copy; 2024 Babillard de Post-its Électroniques</p>
    </footer>
  </body>
</html>
