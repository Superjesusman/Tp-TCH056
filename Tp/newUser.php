<?php
require_once __DIR__.'/Php/config.php';

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    // Vérifier si l'utilisateur existe déjà
    $stmt = $conn->prepare('SELECT * FROM usagers WHERE id = ?');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        $message = 'Ce nom d\'utilisateur est déjà pris.';
    } else {
        // Hasher le mot de passe
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Insérer le nouvel utilisateur
        $stmt = $conn->prepare('INSERT INTO usagers (`login`, `password`, `email`) VALUES (?, ?, ?)');
        if ($stmt->execute([$username, $passwordHash, $email])) {
            header("Location: login.php");
            exit;
        } else {
            $message = 'Erreur lors de la création du compte.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<link rel="stylesheet" type="text/css" href="Style/normalize.css" />
<link rel="stylesheet" href="./Style/index.css" />
    <meta charset="UTF-8" />
    <title>Inscription</title>
</head>
<body>
    <header>
        <h1>Inscription</h1>
    </header>

    <div>
        <section id="nouvelUsager">
            <h2>Créer un compte</h2>
            <?php if($message): ?>
                <div class="alert alert-danger"><?php echo $message; ?></div>
            <?php endif; ?>
            <form method="post">
                <div class="form-group">
                    <label for="username">Nom d'utilisateur:</label>
                    <input type="text" id="username" name="username" class="form-control" required />
                </div>

                <div class="form-group">
                    <label for="email">Courriel:</label>
                    <input type="email" id="email" name="email" class="form-control" required />
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" class="form-control" required />
                </div>

                <button type="submit" class="btn">S'inscrire</button>
            </form>
        </section>
    </div>

    <footer>
        <p>&copy; 2024 Copyright Gab et Chrichri</p>
    </footer>
</body>
</html>
