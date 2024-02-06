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
    <meta charset="UTF-8" />
    <title>Inscription</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="./styles.css?val=1" />
</head>
<body>
    <header class="bg-primary text-white text-center py-3">
        <h1>Inscription</h1>
    </header>

    <div class="container my-4">
        <section id="nouvelUsager" class="mb-4">
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

                <button type="submit" class="btn btn-primary">S'inscrire</button>
            </form>
        </section>
    </div>

    <footer class="bg-primary text-white text-center py-3 fixed-bottom">
        <p>&copy; 2024 Babillard de Post-its Électroniques</p>
    </footer>
</body>
</html>
