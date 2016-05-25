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
if(isset($_POST['type']) && !empty($_POST['type'])) {
  $return['type'] = informacaoTratada($_POST['type']);
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

$notification = "0";

if($dataOk != false){

  global $db;

  //verifica se o usuário já existe
  $db->where ("facebook", $return['facebook'] );
  $user = $db->getOne("user");

  //senao existe cria usuario
  $type = $return["type"];
  if($type == 'comida' || $type == 'feliz' ){
    //se existe atualiza a hora do ultimo acesso

    $type_action = Array("comida"=>"data_comida","feliz"=>"data_feliz");
    echo $type_action[$type] ;
    $data = Array($type_action[$type] => date("Y-m-d H:i:s"),"notification"=>0);

    $db->where ("facebook", $return['facebook'] );
    $user = $db->update("user",$data);


  }




}

?>
