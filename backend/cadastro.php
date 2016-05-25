<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once ('MysqliDb.php');

function informacaoTratada($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$dataOk = true;
$return = NULL;


// var_dump($_POST);

//pega os campos que foram enviados e valida
if(isset($_POST['nome']) && !empty($_POST['nome'])) {
  $return['nome'] = informacaoTratada($_POST['nome']);
}
else {
  $dataOk = false;
}

if(isset($_POST['facebook']) && !empty($_POST['facebook'])) {
  $return['facebook'] = informacaoTratada($_POST['facebook']);
}
else {
  $dataOk = false;
}


date_default_timezone_set('America/Manaus');
$return['acesso'] = $data_notification = date("Y-m-d H:i:s");
$notification = "0";

if($dataOk != false){

  global $db;

  //verifica se o usuário já existe
  $db->where ("facebook", $return['facebook'] );
  $user = $db->getOne("user");

  //senao existe cria usuario
  if($user == null){

    $data = Array (
                "facebook" => $return["facebook"],
                "nome" => $return["nome"],
                "acesso" => $return['acesso'],
                "notification" => $notification ,
                "data_notification" => $data_notification,
                "data_feliz" =>$return['acesso'],
                "data_comida" => $return['acesso']
            );

    $id = $db->insert('user', $data);

  }


}

?>
