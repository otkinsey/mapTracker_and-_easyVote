<?php
date_default_timezone_set("America/New_York");
header("Content-Type: text/event-stream\n\n");

$count = 0;
while (1) {
  // Every 5 seconds send an event
  
  $count++;
  $curDate = date('l jS \of F Y, h:i:s A');
  
  $number = rand(1, 100);

  if ($number % 2 == 1) {
    echo "event: odd\n";
    echo 'data: {"time": "' . $curDate . '","number": ' . $number . '}';
    echo "\n\n";
  } else {
    echo 'data: This is a message #'. $count . ' - ' . $curDate . "\n\n";
  }

  
  if ($count == 10) {
   echo 'data: Close' . "\n\n";
  }
  
  ob_end_flush();
  flush();
  sleep(5);
}
?>
