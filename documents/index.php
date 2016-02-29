<?php
/**
 * DB Connection
 *
 */
 
$databaseName = 'participantsProd';
 
function getConnection() {
    try {
		$db_username = "derrick6_devuser";
        $db_password = "novNG#91011";
		$db_string = 'mysql:host=localhost;dbname=derrick6_prod';
		
        //$db_username = "phpganguser";
        //$db_password = "password";
		//$db_string = 'mysql:host=localhost:3307;dbname=phpgang';
        $conn = new PDO($db_string, $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    return $conn;
}
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
//$app = new \Slim\Slim();
$app = new \Slim\Slim(array(
       // 'debug' => true,
       // 'log.enabled' => true,
       // 'log.level' => \Slim\Log::DEBUG,
       // 'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter(array(
       //     'path' => '',
        //    'name_format' => 'Y-m-d',
       //     'message_format' => '%label% - %date% - %message%'
       // ))
    ));

/*ENABLE CORS AND FIX PROBLEMS Angular js had WITH CORS*/
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	//header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}

$app->map('/:x+', function($x) { http_response_code(200);})->via('OPTIONS');
	
/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route
$app->get('/participants/','getUsers');
$app->get('/participants/:id','getUser');
$app->get('/tickets', 'getTickets');
$app->get('/tickets/:id', 'getTicket');
$app->get('/all', 'getAll');
// POST route
$app->post('/participants','addUser');
$app->post('/participants/:id','addUser');
$app->post('/tickets','addtickets');
// PUT route
$app->put('/participants/:id','updateUser');
$app->put('/tickets/:id','updateTickets');

// PATCH route
$app->patch('/participants', function () { echo 'This is a PATCH route';});

// DELETE route
$app->delete('/participants/:id','deleteUser');
$app->delete('/tickets/:id', 'deleteTicket');

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();

/*
 * Route functions
 *
 */
 function getAll(){
	global $app;
    $sql_query = "select `raffleNumber`, `address`, `date`, `email`, `location`, `name`, `numberOfTickets`, `paymentType`, `checkNum`, `phone`,`salesRep`, `totalPaid` FROM raffleTicketProd INNER JOIN participantsProd ON raffleTicketProd.participantid = participantsProd.id ";
    try {
		//$app->log->debug('GET');
        $dbCon = getConnection();
        $stmt   = $dbCon->query($sql_query);
        $tickets  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo '{"participants": ' . json_encode($tickets) . '}';
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }    
}
 
function getTickets(){
	global $app;
    $sql_query = "select `raffleticketid`,`raffleNumber`, `participantid` FROM raffleTicketProd ORDER BY raffleticketid";
    try {
		//$app->log->debug('GET');
        $dbCon = getConnection();
        $stmt   = $dbCon->query($sql_query);
        $tickets  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo '{"tickets": ' . json_encode($tickets) . '}';
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }    
}

function getTicket($id){
	global $app;
    $sql_query = "select `raffleticketid`,`raffleNumber`, `participantid` FROM raffleTicketProd WHERE `participantid`=:id";
    try {
		//$app->log->debug('GET');
        $dbCon = getConnection();
		$stmt = $dbCon->prepare($sql_query);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
        $tickets  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo '{"tickets": ' . json_encode($tickets) . '}';
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }    
}

function deleteTicket($id){
	global $app;
    $sql = "DELETE FROM raffleTicketProd WHERE `raffleticketid`=:id";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);  
        $stmt->bindParam("id", $id);
        $stmt->execute();  
        $dbCon = null;
        echo '{"Success": 200}';
    } catch(PDOException $e) {
        echo  '{"error": "'. $e->getMessage() .'"}';
    }
}

function getUsers() {
	global $app;
    $sql_query = "select `id`,`address`, `date`, `email`, `location`, `name`, `numberOfTickets`, `paymentType`, `phone`,`salesRep`, `totalPaid` FROM participantsProd ORDER BY id";
    try {
		//$app->log->debug('GET');
        $dbCon = getConnection();
        $stmt   = $dbCon->query($sql_query);
        $users  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo '{"participants": ' . json_encode($users) . '}';
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }    
}

function getUser($id) {
	global $app;
    $sql = "select `id`,`address`, `date`, `email`, `location`, `name`, `numberOfTickets`, `paymentType`, `phone`,`salesRep`, `totalPaid` FROM participantsProd WHERE id=:id";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);  
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $user = $stmt->fetchObject();  
        $dbCon = null;
        echo json_encode($user); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

function deleteUser($id){
	global $app;
    $sql = "DELETE FROM participantsProd WHERE id=:id";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);  
        $stmt->bindParam("id", $id);
        $stmt->execute();  
        $dbCon = null;
        echo  '{"Success": 200}';
    } catch(PDOException $e) {
        echo  '{"error": "'. $e->getMessage() .'"}';
    }
}

function findByName($query) {
    $sql = "SELECT * FROM restAPI WHERE UPPER(name) LIKE :query ORDER BY name";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);
        $query = "%".$query."%";
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo '{"participants": ' . json_encode($users) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

function addtickets(){
	global $app;
	$app->response()->header("Content-Type", "application/json");
    $post = json_decode($app->request()->getBody());
	$raffleNumber = $post->raffleNumber;
	$participantid = $post->participantid;
	$sql = "INSERT INTO raffleTicketProd (`raffleNumber`, `participantid`) VALUES (:raffleNumber, :participantid)";
	try {
		$dbCon = getConnection();
		$stmt = $dbCon->prepare($sql);
		$stmt->bindParam("raffleNumber", $raffleNumber);
		$stmt->bindParam("participantid", $participantid);
		$stmt->execute();
		$dbCon = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateTickets($id){
	global $app;
	$app->response()->header("Content-Type", "application/json");
    $post = json_decode($app->request()->getBody());
	$raffleNumber = $post->raffleNumber;
	$participantid = $post->participantid;
	$sql = "UPDATE raffleTicketProd SET raffleNumber=:raffleNumber, participantid=:participantid WHERE raffleticketid=:id";
	try {
		$dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);
		$stmt->bindParam("raffleNumber", $raffleNumber);
		$stmt->bindParam("participantid", $participantid);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$dbCon = null;
		
		echo '{"Success": 200}';
	} catch(PDOException $e) {
		echo  '{"error": "'. $e->getMessage() .'"}'; 
	}
}

function addUser() {
	global $app;
	global $databaseName;
	$app->response()->header("Content-Type", "application/json");
    $post = json_decode($app->request()->getBody());
	//$app->log->debug($post->name);
	//$app->log->debug($post->phone);
	$address = $post->address;
	$date = $post->date;
	$email = $post->email;
	$location = $post->location;
	$name = $post->name;
	$numberOfTickets = $post->numberOfTickets;
	$paymentType = $post->paymentType;
	$phone = $post->phone;
	$salesRep = $post->salesRep;
	$checkNum = $post->checkNum;
	//$tickets = $post->tickets;
	$totalPaid = $post->totalPaid;
	
    $sql = "INSERT INTO participantsProd (`address`, `date`, `email`, `location`, `name`, `numberOfTickets`, `paymentType`, `checkNum`, `phone`,`salesRep`, `totalPaid`) VALUES (:address, :date, :email, :location, :name,:numberOfTickets, :paymentType, :checkNum, :phone, :salesRep, :totalPaid)";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);
		$stmt->bindParam("address", $address);
        $stmt->bindParam("date", $date);
        $stmt->bindParam("phone", $phone);
		$stmt->bindParam("email", $email);
        $stmt->bindParam("location", $location);
		$stmt->bindParam("name", $name);
		$stmt->bindParam("numberOfTickets", $numberOfTickets);
		$stmt->bindParam("paymentType", $paymentType);
		$stmt->bindParam("checkNum", $checkNum);
		$stmt->bindParam("phone", $phone);
		$stmt->bindParam("salesRep", $salesRep);
		//$stmt->bindParam("tickets", $tickets);
		$stmt->bindParam("totalPaid", $totalPaid);
        $stmt->execute();
        $userid = $dbCon->lastInsertId();
        $dbCon = null;
		echo '{"insertedId":'.$userid.'}';
        //echo json_encode("Success"); 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

function updateUser($id) {
    global $app;
	global $databaseName;
	$app->response()->header("Content-Type", "application/json");
    $post = json_decode($app->request()->getBody());
	//$app->log->debug($post->name);
	//$app->log->debug($post->phone);
	$address = $post->address;
	$date = $post->date;
	$email = $post->email;
	$location = $post->location;
	$name = $post->name;
	$numberOfTickets = $post->numberOfTickets;
	$paymentType = $post->paymentType;
	$phone = $post->phone;
	$salesRep = $post->salesRep;
	$checkNum = $post->checkNum;

	$totalPaid = $post->totalPaid;
	
    $sql = "UPDATE participantsProd SET address=:address, date=:date, email=:email, location=:location, name=:name, numberOfTickets=:numberOfTickets, paymentType=:paymentType, checkNum=:checkNum, phone=:phone, salesRep=:salesRep, totalPaid=:totalPaid WHERE id=:id";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);
        $stmt->bindParam("address", $address);
        $stmt->bindParam("date", $date);
        $stmt->bindParam("phone", $phone);
		$stmt->bindParam("email", $email);
        $stmt->bindParam("location", $location);
		$stmt->bindParam("name", $name);
		$stmt->bindParam("numberOfTickets", $numberOfTickets);
		$stmt->bindParam("paymentType", $paymentType);
		$stmt->bindParam("checkNum", $checkNum);
		$stmt->bindParam("phone", $phone);
		$stmt->bindParam("salesRep", $salesRep);
		$stmt->bindParam("totalPaid", $totalPaid);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $dbCon = null;
        echo '{"Success": 200}'; 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

/*function deleteUser($id) {
    $sql = "DELETE FROM restAPI WHERE id=:id";
    try {
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);  
        $stmt->bindParam("id", $id);
        $status->status = $stmt->execute();
        $dbCon = null;
        echo json_encode($status);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}*/
