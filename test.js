// UNCLASSIFIED
/**
 * Test a Totem configurations using 
 * 
 * 		. setup.sh CONFIG
 * 
 * or
 * 		node test.js APP CONFIG
 * 
 * with CONFIG = N0, N1, ... and APP = app1
 * */

var ENV = process.env;

function Trace(msg,arg) {
	
	console.log("U>"+msg);

	if (arg) console.log(arg);
}

require("../enum").test({

	N1: function () {
		
		var TOTEM = require("../totem");

		Trace(
			"Im simply the default Totem interface so Im not running any service", {
			default_fetcher_endpts: TOTEM.reader,
			default_protect_mode: TOTEM.nofaults,
			default_cores_used: TOTEM.cores
		});
	},
	
	N2: function () {
		
		Trace(
`I **will be** a Totem client running in fault protection mode, 
with 2 cores and default routes` );

		var TOTEM = require("../totem").start({
			nofaults: true,
			cores: 2
		});
		
	},
	
	N3: function () {
		
		var TOTEM = require("../totem").start({
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			},
			
			init: function () {				
				Trace(
`I **have become** a Totem client, with no cores, but 
I do have mysql database from which I've derived my site parms`, {

					mysql_derived_parms: TOTEM.site
				});
			}
		});
		
	},
	
	N4: function () {
		
		var TOTEM = require("../totem").start({
			encrypt: "test",
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			},
			reader: {
				dothis: function dothis(req,res) {  //< named handlers are shown in trace in console
					res( "123" );
					
					Trace(		
`PKI-encrypted Totem service, 2 cores, unprotected, with a mysql database, and \n
(dothis,orthis) endpoints.  If the servers client.pfx does not exists, Totem will\n
create the client.pfx and associated pems (public client.crt and private client.key).` , {

						do_query: req.query
					});
				},

				orthis: function orthis(req,res) {
					
					if (req.query.x)
						res( [{x:req.query.x+1,y:req.query.x+2}] );
					else
						res( new Error("We have a problem huston") );
						
					Trace(
`Like dothis, but needs an ?x=value query`, {
						or_query: req.query,
						or_user: [req.client,req.group]
					});
				}
			},
			
			init: function () {
				Trace(
					"try my **encrypted** (dothis,orthis) endpoints", {
					my_endpoints: TOTEM.reader
				});
			}
		});
		
	},
	
	N5: function () {
		var TOTEM = require("../totem").start({
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			},
	
			riddles: 10,
			
			init: function () {
				
				Trace(
`I am Totem client, with no cores but I do have mysql database and\n
I have anti-bot protection`, {
					mysql_derived_parms: TOTEM.site
				});
			}
		});
	},
	
	E1: function () {

		var ENGINE = require("../engine");
		var TOTEM = require("../totem");

		Trace( "A default Totem client", {
			a_tau_template: ENGINE.tau("somejob.pdf"),
			engine_errors: ENGINE.error,
			get_endpts: TOTEM.reader,
			my_paths: TOTEM.paths
		});
		
	},
	
	E2: function () {

		var TOTEM = require("../totem");
		
		TOTEM.start({
			
			init: function () {

				Trace( "Totem being powered down" );
				
				TOTEM.stop();
			}
		});

		var ENGINE = require("../engine").config({
			thread: TOTEM.thread
		});

	},
			
	E3: function () {
		
		var TOTEM = require("../totem").start({

			reader: {
				merge: {
					chipper: function Chipper(req,res) {				
						res( 123 );
					}
				}
			},
			
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			}
			
		});

		var ENGINE = require("../engine").config({
			thread: TOTEM.thread
		});

		Trace( "Starting a trivial Totem with a chipper fetcher and a database" );

	},
	
	C1: function () {
		
		var CHIPPER = require("../chipper");
		
		var TOTEM = require("../totem").start({
			trace: "C>",

			reader: {
				merge: CHIPPER.chippers
			},				
			
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			},
			
			init: function () {

				Trace( "Test my default endpoints", {
					my_readers: TOTEM.reader
				});
			}
		});
		
		CHIPPER.config({
			thread: TOTEM.thread
		});

	},
	
	D1: function () {
		
		var TOTEM = require("../debe").start({
			//encrypt: "test",
			
			mysql: {
				host: ENV.MYSQL_HOST,
				user: ENV.MYSQL_USER,
				pass: ENV.MYSQL_PASS
			},
			
			init: function () {

				Trace( "Encrypted Totem client with a database" );
				//debe_mysql:TOTEM.mysql,
				//debe_site: TOTEM.site
				
			}
			
		});
			
	}
	
});	

	
// UNCLASSIFIED
