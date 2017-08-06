var FORMAL=false;
//var FORMAL=true;

var VERSION=20170217;

var READ_CGI;
var WRITE_CGI;
var LOGIN_CGI;
var REGISTER_CGI;
if(!FORMAL)
{
	READ_CGI='../server/note_book_read.php';
	WRITE_CGI='../server/note_book_write.php';
}
else
{
	READ_CGI='../server/note_book_read.php';
	WRITE_CGI='../server/note_book_write.php';
	LOGIN_CGI='';
	REGISTER_CGi='';
}