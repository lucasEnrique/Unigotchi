<?php


//
// try {
// $response = $fb->post('/604333636391365/notifications?href='.$url_retorno.'&template='.$descricao);
//   $userNode = $response->getGraphUser();
// } catch(Facebook\Exceptions\FacebookResponseException $e) {
//   // When Graph returns an error
//   echo 'Graph returned an error: ' . $e->getMessage();
//   exit;
// } catch(Facebook\Exceptions\FacebookSDKException $e) {
//   // When validation fails or other local issues
//   echo 'Facebook SDK returned an error: ' . $e->getMessage();
//   exit;
// }


$url_retorno = "https://apps.facebook.com/unigotchi";
$descricao = "Venha jogar";
try {
$response = $fb->post('/604333636391365/notifications?href='.$url_retorno.'&template='.$descricao);
  $userNode = $response->getGraphUser();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}


?>
