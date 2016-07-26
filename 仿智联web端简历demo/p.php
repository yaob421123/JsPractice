<?php
header("Content-Type: text/html; charset=UTF-8");
$has = $_REQUEST['has'] ? $_REQUEST['has'] : 0;
$typeid = $_REQUEST['typeid'] ? $_REQUEST['typeid'] : 0;
if ($has == 1) {
    $url = "http://hanghangq.com/resource/json/city_ajax_get.php?type=1";
} else if ($has == 2) {
    $url = "http://hanghangq.com/resource/json/city_ajax_get.php?type=2&typeid=1";
} else if ($has == 3) {
    $url = "http://hanghangq.com/resource/json/city_ajax_get.php?type=2";
    $post_data = array ("typeid" => $typeid);
}else if($has == 4){
	$url = "http://hanghangq.com/resource/json/respon_ajax_get.php?type=1";
}else if($has == 5){
	$url = "http://hanghangq.com/resource/json/respon_ajax_get.php?type=2";
	$post_data = array ("typeid" => $typeid);
}

$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_POST, 1 );
curl_setopt ( $ch, CURLOPT_HEADER, 0 );
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt ( $ch, CURLOPT_POSTFIELDS, $post_data );
$return = curl_exec ( $ch );
curl_close ( $ch );
echo $return;
?>