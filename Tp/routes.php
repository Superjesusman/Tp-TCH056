<?php
require_once __DIR__.'/router.php';

// Routes statiques
get('/', 'index.php');
get('/index.php', 'index.php');
any('/login.php', 'login.php');
any('/newUser.php', 'newUser.php');

// Routes de l'API (statiques et dynamique)
get('/api/Index/$id', '/api/Index/getJeu.php');
post('/api/jeu','/api/Index/postJeu.php');
post('/api/jeu/$id','/api/Index/modifJeu.php');
delete('/api/jeu/$id','/api/Index/deleteJeu.php');



// Route introuvable
any('/404','404.php');
