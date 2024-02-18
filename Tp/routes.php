<?php
require_once __DIR__.'/router.php';

// Routes statiques
get('/', 'index.php');
get('/index.php', 'index.php');
any('/login.php', 'login.php');
any('/newUser.php', 'newUser.php');

// Routes de l'API (statiques et dynamique)
get('/api/jeux/$id', '/api/Index/getJeu.php');
post('/api/jeux','/api/Index/postJeu.php');
put('/api/jeux/$id','/api/Index/modifJeu.php');
delete('/api/jeux/$id','/api/Index/deleteJeu.php');



// Route introuvable
any('/404','404.php');
