<?php

require __DIR__.'/../lib/functions.php';

$id = escape($_GET['id'] ?? '');
$data = fetchById($id);

if (!$data) {
    error404();
}

$formatedData = generateFormattedData($data);

$assignData = [
    'id' => $formatedData['id'],
    'question' => $formatedData['question'],
    'answers' => $formatedData['answers']
];

loadTemplate('question', $assignData);