<?php
header("Content-Type: text/html; charset=UTF-8");
$has = $_REQUEST['has'] ? $_REQUEST['has'] : 0;
$id = $_REQUEST['id'] ? $_REQUEST['id'] : 0;
if ($has == 1) {
    $url = "http://www.yulianshe.cn/wechat/city/province";
} else if ($has == 2) {
    $url = "http://www.yulianshe.cn/wechat/city/city";
    $post_data = array ("id" => $id);
} else if ($has == 3) {
    $url = "http://www.yulianshe.cn/wechat/city/district";
    $post_data = array ("id" => $id);
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