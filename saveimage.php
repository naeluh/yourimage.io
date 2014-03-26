          <?php
          define('UPLOAD_DIR', 'yourimages/');
          $img = $_POST['imagetosave'];
          $img = str_replace('data:image/png;base64,', '', $img);
          $img = str_replace(' ', '+', $img);
          $data = base64_decode($img);
          $file = UPLOAD_DIR . time() . '.png';
          $success = file_put_contents($file, $data);
          print $success ? $file : 'Unable to save the file.';
          ?>
