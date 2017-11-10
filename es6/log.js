/*
用法:
var Logger = require('./Logger.js').createLogger(logFilePath);
Logger.fatal("...dis...");
Logger.error("...dis...");
Logger.warn("...dis...");
Logger.info("...dis...");
Logger.debug("...dis...");
Logger.log("test");
 */

var path = require('path');
var util = require('util');
var fs   = require('fs');
//var loggerFilePath;

//日志核心
var Logger = function( logFilePath ) 
{
};

//筛选堆栈中当前操作位置（默认向上取一级目录）
Logger.prototype.stack = function () 
{
	var stackArray = [];
	stackArray = (new Error()).stack.split("\n");
	
	var tmp = '';
	var isHasLoggerjs = false;
	for(var key in stackArray)
	{
		tmp = stackArray[key].indexOf('log.js');
		if( tmp >= 0 )
		{
			isHasLoggerjs = true;
		}
		if( isHasLoggerjs && (tmp < 0) )
		{
			tmp = stackArray[key].split(path.sep).join('/');
			var tmp2 = tmp.substr( tmp.lastIndexOf('/') );
			tmp = tmp.substr( 0, tmp.lastIndexOf('/') );

			tmp2 = tmp.substr( tmp.lastIndexOf('/') ) + tmp2;
			tmp = tmp.substr( 0, tmp.lastIndexOf('/') );

			tmp = tmp2.substr( 0, tmp2.lastIndexOf(':') );
			break;
		}		
	}	
	
	return tmp;
}

Logger.prototype.format = function(level, date, message) 
{
	var timeString = '' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + ' ';
	return [timeString, '\t', level.toUpperCase(), '\t', this.stack(), '\t', message, '\n'].join('');
};

Logger.prototype.write = function(text) 
{
	util.print(text);
	//if( loggerFilePath )
	//{
		//this.stream.write(text); 
	//}
};

Logger.prototype.log = function(level, message) 
{
	this.write( this.format(level, new Date(), message) );
};

Logger.prototype.fatal = function(message) 
{
	this.log('fatal', message);
};

Logger.prototype.error = function(message) 
{
	this.log('error', message);
};

Logger.prototype.warn = function(message) 
{
	this.log('warn', message);
};

Logger.prototype.info = function(message) 
{
	this.log('info', message);
};

Logger.prototype.debug = function(message) 
{
	this.log('debug', message);
};

Logger.prototype.info1 = function(message) 
{
	this.log('info1', message);
};
Logger.prototype.info2 = function(message) 
{
	this.log('info2', message);
};
Logger.prototype.info3 = function(message) 
{
	this.log('info3', message);
};

//Export
exports.Logger = Logger;
exports.New = function(logFilePath) 
{
	return new Logger(logFilePath);
};

