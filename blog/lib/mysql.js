var mysql_model  = require('mysql'); 
"undefined" != typeof log ? 'log yes' : log = require('./log').New();
var mysql = function(config){
	var self = this;
	
	self.pool = mysql_model.createPool({
		host			:	config.host,
		port			:	config.port,                  
		user     		: 	config.user,             
		password 		: 	config.password,      
		database		: 	config.database
	});
};

mysql.prototype.exec = function(sql,callback){
	var self = this;
	self.pool.getConnection(function(err,conn){
		if(err){
			log.warn('mysql pool get conn err:'+JSON.stringify(err));
		}
		conn.query(/*'select * from play_fluency where user_id=1011'*/sql,function(err,res){
			conn.release();
			if(callback){
				if(err){
					callback(err)
				}else{
					callback(null,res);
				}
			}
		});
	})
};

mysql.prototype.escape = function(str){
	return mysql_model.escape(str);
};

exports.New = function(config){
	return new mysql(config);
};
