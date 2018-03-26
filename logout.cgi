use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn032SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn032SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


print <<END;    
    
<html>
<head>
    <link rel="stylesheet" type="text/css" href="http://jadran.sdsu.edu/~jadrn032/proj1/main.css">
</head>
<body id="body3">
<h2 class="out">You have logged out.<h2>
<h2><a class="out" href="http://jadran.sdsu.edu/~jadrn032/proj1/index.html"></span>Login again!</a><h2>
</body>
</html>

END