#!/usr/bin/perl

use DBI;
use CGI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn032";
my $username = "jadrn032";
my $password = "pipe";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';


my $q = new CGI;
my $query = CGI->new;
my $sku = $query->param('sku');
my $category = $query->param('category');
my $vendor = $query->param('vendor');
my $mid = $query->param('mid');
my $description = $query->param('description');
my $features = $query->param('features');
my $cost = $query->param('cost');
my $retail = $query->param('retail');
my $qty = $query->param('qty');
my $product_image = $query->param('product_image');
 
print "Content-type: text/html\n\n";


my $statement = "INSERT INTO product values("."'$sku',$category,$vendor,'$mid','$description',"."'$features',$cost,$retail,$qty,'$product_image');";

my $sth = $dbh->prepare($statement);
my $result = $sth->execute();


if($result)
	{
		print "SUCCESS";
	}
else
	{
		print "FAIL";
	}
$sth->finish();
$dbh->disconnect();


