/*
 * author	:	xzl
 * date		:	2016-7-6 14:06
 * describe	:	http server
 * test		:
 * 
var http_svr = require("./http_server");
var server = new http_svr.http_server({port : 9898});
server.start();

server.on('deal_msg',function(data,client_addr,callback){
	console.log(client_addr.name," say ->>",data);
	var w_data = '[server] hello client';
	callback(w_data);
});
 * 
 */
"undefined" != typeof log ? 'log yes' : log = require('./log').New();

var events = require("events");
var util = require('util');
var http = require("http");
var url_modle = require('url');

function http_server(config){
	//config
	var self = this;
	self.port = config.port || 8080;
	self.timeout = config.timeout || 30;//每个连接未活跃时间
	
	self.reqs = 0;
	self.reqs_sum = 0;
	
	self.get_reqs_sum = function(is_clear){
		var sum = self.reqs_sum;
		is_clear ? self.reqs_sum = 0 : 'no clear';
		return sum;
	};
};

util.inherits(http_server, events.EventEmitter);

http_server.prototype.start = function(){
	
	var self = this;
	
	setInterval(function(){
		self.reqs = 0;
	},1*1000);
	
	self.get_req_ip = function(req){
		var ip;
		var headers = req.headers;
		var f_ip = headers['x-real-ip'] || headers['x-forwarded-for'];
		ip = f_ip ? f_ip : null;
		if (!ip) {
			ip = (req.connection && req.connection.remoteAddress) ? req.connection.remoteAddress : null;
		}
		return ip;
	};
	
	self.server = http.createServer(function(req,resp){
		resp.setTimeout(self.timeout*1000, function(){});
		self.reqs += 1;
		self.reqs_sum += 1;
		var req_ip = self.get_req_ip(req);
		if (req.method.toUpperCase() == 'POST') {
            var postData = "";
            req.on("data", function (data) {
                postData += data.toString();
            });
            req.on("end", function () {
            	self.emit('deal_msg',postData,req_ip,function(data){
            		resp.writeHead(200, {
			          	'Content-Type': 'text/html;charset=utf-8',
			          	'Access-Control-Allow-Origin': '*'
			        });
            		resp.write(JSON.stringify(data));
            		resp.end();
            	});
            });
      	}else if (req.method.toUpperCase() == 'GET') {
            var req_json = url_modle.parse(req.url, true).query;
            self.emit('deal_msg',JSON.stringify(req_json),req_ip,function(data){
            	resp.writeHead(200, {
		          	'Content-Type': 'text/html;charset=utf-8',
		          	'Access-Control-Allow-Origin': '*'
		        });
        		resp.write(JSON.stringify(data));
        		resp.end();
        	});
        }else {
            log.info('http req unknow method,req_ip: '+req_ip);
            resp.end();
        }
	});
	
	self.server.listen(self.port,'0.0.0.0',function(){
		log.info('http server on '+self.port);
	});
	
	self.server.on("connection", function(stream) {
	});
	
	self.server.on("close", function(stream) {
	});
	
	self.server.on("upgrade", function(request, socket, head) {
	});
	
//	self.server.on("clientError", function(err, socket) {//用户连接出错
//		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
//	});
	
	self.server.on('error', function (e) {
  		if (e.code == 'EADDRINUSE') {
	    	log.fatal('http server port in user: ' + self.port);		//¶Ë¿ÚÕ¼ÓÃ
			process.exit(0);
 	 	}else if (e.code == 'EADDRNOTAVAIL') {		//ipµØÖ·ÎÞÐ§
	    	log.fatal('http server ip not valid');
			process.exit(0);
 	 	}else{
			log.fatal('http server listen Error:'+JSON.stringify(e));
			process.exit(0);
 	 	}
	});
};

exports.New = function(config) {
	return new http_server(config);
};
