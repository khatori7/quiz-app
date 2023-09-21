<?php

require __DIR__.'/../lib/functions.php';

$fetchData = fetchAll();

if (!$fetchData) {
    error404();
}

$questions = [];
foreach($fetchData as $data) {
    $questions[] = generateFormattedData($data);
}

$assignData = [
    'questions' => $questions
];

loadTemplate('index', $assignData);