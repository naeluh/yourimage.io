<html>
        <head>
                <title>Imgur Random</title>
        </head>
        <body>
                <h1>helloworld</h1>
<br /><br /><br />
<?php
//If there are any problems with run time add "set_time_limit(0);"
//Cake - 2011.
//environment
ini_set('display_errors', E_ALL);
//$get = $_GET['search'];
$looptime = (int)$get;


$str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
$i = 0; $hit = 0; $miss = 0;
while($i < $looptime) {
        //variables
        $shuffled = str_shuffle($str);
        $trimmed = substr($shuffled, -5);
        $header = get_headers("http://i.imgur.com/" . $trimmed . ".jpg");
        echo "<!--This is loop # " . $i . "-->\n";
        if($header[0] == "HTTP/1.1 200 OK"){
                //if the image is good to go
                echo '<a href="http://imgur.com/' . $trimmed . '">\n';
                echo '<img src="http://i.imgur.com/' . $trimmed . '.jpg">\n';
                echo "</a><br /><br />\n";
                $hit++;
                unset($trimmed, $header, $shuffled);
        } else {
                //if a 404 or 302 was returned
                echo "  <!--Loop # " . $i . " failed with HTTP error " . $header[0] . ".-->\n";
                unset($trimmed, $header, $shuffled);
                $miss++;
        }

        //repeat
        $i++;
        }
?>
                <div >
                        Attempts that passed - <?php echo $hit; ?><br />
                        Attempts that failed - <?php echo $miss; ?><br />
                        Hit ratio - <?php echo $hit / $looptime * 100; ?>%<br />
                </div>
        </body>
</html>
