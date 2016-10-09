# Totem ENGINE

[![Forked from SourceForge](https://sourceforge.net)]

[Totem](https://git.geointapps.org/acmesds/transfer)'s ENGINE module provides a foundation 
for hyperthreaded workflows to both stateless and stateful ENGINES.X where

	X = py,js,sh,opencv,mat,matlab,csh,r,octave, ...

engines have methods (restful http endpoints):

	step (POST,insert) to advance a stateful engine
	init (PUT,update) to compile a stateful engine
	kill (DELETE,delete) to deallocate a stateful engine
	read (GET,select) to execute a stateless engines

Stateful engines are supported by the step, init and kill endpoints, 
and are passed TAU event tokens:

	TAU.i = [{tau}, ...] = events arriving to engine's input port
	TAU.o = [{tau}, ...] = events departing from engine's output port
	TAU.p = {port1: {...}, ... port2: {...}, ... sql: {...} }
	TAU.port = engine's in/out port to step
	TAU.thread = engine's 0-base thread counter

where input/output port parameters and engine code are taken from
the Vars and Code engine context at workflow initialization, and 
where sql is a mysql database connector.  

Each event token contains the following default fields (they can 
be freely interpretted and extended by the engine):

	job = "" 	= Current job thread N.N...
	work = 0 	= Anticipated/delivered data volume (dims bits etc)
	disem = "" 	= Disemination channel for this event
	classif = ""	= Classification of this event
	cost = ""	= Billing center
	policy = ""	= Data retention policy
	status = 0	= Status code
	value = 0	= Flow calculation

Stateless engines are supported at the read endpoint, and are passed
the following parameters:

	TAU.i = {tau} = input event sinked to an engine
	TAU.o = {tau} = output event sourced from an engine
	TAU.p = {sql: {...}, query: {...} }

where the query hash will contain the url parameters.

In addition to geoClient config paramaters, geoEngine accepts 
the config parameters:

	jobspath path to prefix to a tau.job
	app{...} crud interface to virtual tables

## Installation

Download and unzip into your project/totem folder and revise the project/config module as needed
for your [Totem](https://git.geointapps.org/acmesds/transfer) project.  Typically, you will
want to:

	ln -s ../config/debe.sh config.sh
	ln -s ../config/maint.sh maint.sh
	ln -s ../config/certs certs
	
to override the defaults.

## Usage


## License

[MIT](LICENSE)
