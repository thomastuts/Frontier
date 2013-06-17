<?php

$images = $_POST['images'];
$id = $_POST['id'];
$output = array();

foreach($images as &$image) {
  $filename = $id . '_' . basename($image);
  try {
  copy($image, '../data/uploads/inspiration/' . $filename);
    array_push($output, 'data/uploads/inspiration/' . $filename);
  }
  catch (Exception $e) {
    echo $e->getMessage();
  }
}

echo json_encode($output);

//var_dump($images);
