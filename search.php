<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For local testing

if (isset($_GET['q']) && !empty($_GET['q'])) {
    $query = strtolower(trim($_GET['q']));
    $data = json_decode(file_get_contents('data.json'), true);
    $matches = [];

    foreach ($data as $person) {
        if (stripos($person['name'], $query) !== false) {
            $matches[] = $person;
        }
    }

    if (empty($matches)) {
        echo json_encode(['error' => 'No match found. Try a partial name like "ABUBAKAR".']);
    } else {
        echo json_encode($matches); // Return first match or all (limit to 5 for multiple)
    }
} else {
    echo json_encode(['error' => 'Enter a name to search.']);
}
?>