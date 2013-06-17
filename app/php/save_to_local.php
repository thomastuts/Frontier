<?php

$images = json_decode($_POST['images']);
$id = $_POST['id'];

foreach($images as &$image) {
  try {
    file_get_contents($image);
    file_put_contents('../data/uploads/inspiration/' . $id . '_' . basename($image), $image);
  }
  catch (Exception $e) {
    echo $e->getMessage();
  }
}

//var_dump($images);
