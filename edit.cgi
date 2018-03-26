#!/usr/bin/perl

use DBI;
use CGI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn004";
my $username = "jadrn004";
my $password = "tomato";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';



my $q = new CGI;
my $query = CGI->new;
my $sku = $query->param('sku');
my $vendor = $query->param('vendor');
my $category = $query->param('category');
my $manuid = $query->param('m_id');
my $descriptn = $query->param('desc');
my $features = $query->param('features');
my $cost = $query->param('cost');
my $retail = $query->param('retail');
my $image = $query->param('product_image');
# my $file_remove = $query->param('image');
# my $file_loc = '/home/jadrn004/public_html/proj1/_uploadDIR_/';

# $file_loc= $file_loc.$file_remove;

print "Content-type: text/html\n\n";
# print $file_loc;
# unlink $file_loc or die "Unable to unlink $file_loc: $!";
# print $features;
# print $image;
my $statement = "DELETE from product where sku = '$sku'";
my $sth = $dbh->prepare($statement);
my $result = $sth->execute();
# print $category;

my $state_ment = "INSERT INTO product values(". "'$sku',$category,$vendor,'$manuid','$descriptn',". "'$features',$cost,$retail,'$image');";
my $sth1 = $dbh->prepare($state_ment);

if($result)
	{
		my $result1 = $sth1->execute();
		if($result1){
			print "SUCCESS";
		}
		else{
			print "FAIL1";
		}

}
else
	{
		print "FAIL2";
	}
# print $result;
$sth1->finish();
$sth->finish();

$dbh->disconnect();
