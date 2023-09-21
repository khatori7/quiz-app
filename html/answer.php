<?php

require __DIR__.'/../lib/functions.php';

$id = $_POST['id'] ?? '';
$selectedAnswer = $_POST['selectedAnswer'] ?? '';

$data = fetchById($id);

if (!$data) {
    // HTTPレスポンスのヘッダを404にする
    header('HTTP/1.1 404 Not Found');

    // レスポンスの種類を指定する
    header('Content-Type: application/json; charset=UTF-8');

    $response = [
        'message' => 'The specified id could not be found.'
    ];

    echo json_encode($response);
    exit(0);
}

$formatedData = generateFormattedData($data);
$correctAnswer = $formatedData['correctAnswer'];
$correctAnswerValue = $formatedData['answers'][$correctAnswer];
$explanation = $formatedData['explanation'];

$result = ($selectedAnswer === $correctAnswer);

$response = [
    'result' => $result,
    'correctAnswer' => $correctAnswer,
    'correctAnswerValue' => $correctAnswerValue,
    'explanation' => $explanation,
];

// レスポンスの種類を指定する
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($response);