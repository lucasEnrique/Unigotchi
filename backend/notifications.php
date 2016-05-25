<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once ('MysqliDb.php');
require_once __DIR__ . '/facebook-sdk/src/Facebook/autoload.php';

//-------------------------Facebook-------------------//

$fb = new Facebook\Facebook([
  'app_id' => '1177568092276541',
  'app_secret' => '0a33945014999edbaec1294b3da10826',
  'default_graph_version' => 'v2.5',
]);

$token_acess='1177568092276541|PKMImLNGHZx1UwThxxaIcZH8wsc';

$fb->setDefaultAccessToken($token_acess);


function notify($id,$mensagem){

  $url_retorno = "https://apps.facebook.com/unigotchi";
  $descricao = $mensagem;
  global $fb;

  try {

    $response = $fb->post('/'.$id.'/notifications?template='.$descricao);
    $userNode = $response->getGraphUser();
    echo "notificado";

  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    // exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    // exit;
  }
}

//-------------------------Facebook-------------------//



//-------------------------Pegando Usuario mysq-------------------//

global $db;
$users = $db->get("user");

date_default_timezone_set('America/Manaus');

$data_atual = strtotime('now');

foreach ($users as $user) {
  // echo "entrouy";
  $data  = strtotime($user["acesso"]);
  $notification = intval($user["notification"]);
  $data_feliz = round(abs(strtotime('now') - strtotime($user["data_feliz"])) / 60,2);
  $data_comida = round(abs(strtotime('now') - strtotime($user["data_comida"])) / 60,2);
  $minutos = round(abs($data - $data_atual) / 60,2);
  // print_r($interval);
  //
  // verifica se seu ultimo acesso já passou de 4 horas
  echo $data_feliz."--".$data_comida."--".$notification;echo "\n";

  if($data_comida > 60 && $notification  == 0){
    echo "\n notifica comida";
    notify($user["facebook"],"Não deixe sua bolsa morrer de fome.");
    $data = Array("notification" => 1);

    $db->where ("facebook", $user['facebook'] );
    $user = $db->update("user",$data);
  }else if($data_feliz > 60 && $notification  == 0){
    echo "\n notifica felizz";
        notify($user["facebook"],"Sua bolsa não está feliz, ajude a melhorar.");
        $data = Array("notification" => 1);

        $db->where ("facebook", $user['facebook'] );
        $user = $db->update("user",$data);

  }
}
//   if($minutos > 240 && $notification  == 0){
// echo "foi_";
//     notify($user["facebook"]);
//     $data = Array("notification" => $notification + 1,
//                   "data_notification" => date("Y-m-d H:i:s") );
//
//     $db->where ("facebook", $user['facebook'] );
//     $user = $db->update("user",$data);
//     // echo "\n";
//     // echo "foi";
//       // verifica se seu ultimo acesso já passou de 24 horas
//   }else if ($minutos > 240 && $notification  == 1 && $data_notification > 1440)
//   {
//     // echo "foi2".$data_notification ;
//     // echo "\n";
//     notify($user["facebook"]);
//     $data = Array("notification" => $notification + 1,
//                   "data_notification" => date("Y-m-d H:i:s") );
//
//     $db->where ("facebook", $user['facebook'] );
//     $user = $db->update("user",$data);
//
//     // verifica se seu ultimo acesso já passou de 72 horas
//   }else if($minutos > 240 && $notification  == 2 && $data_notification > 2880)
//   {
//     // echo "\n".$data_notification ;
//     // echo "foi3";
//     // echo "\n";
//     notify($user["facebook"]);
//     $data = Array("notification" => $notification + 1,
//                   "data_notification" => date("Y-m-d H:i:s") );
//
//     $db->where ("facebook", $user['facebook'] );
//     $user = $db->update("user",$data);
//   }

// }

//-------------------------Pegando Usuario mysq-------------------//

echo "\n fim";



?>
