var express = require('express');
var router = express.Router();

router.route('/upload')
		
 .post(function(req,res){

 	var multiparty = require("multiparty");
 	var fs = require("fs");
 	var form = new multiparty.Form();
 	var obj = {
 	   table: []
 	};

 	form.parse(req,function(err,fields,files){

 		//res.send("Name" + fields.name);
 		console.log(fields);
 		var i=0;
 		files.images.forEach(function(image){
	 		var img = image;
	 		fs.readFile(img.path,function(err,data){

	 			var path = "./public/img/" + img.originalFilename; 
	 			fs.writeFile(path,data,function(err){
	 				if(err){
	 					console.log(error);
	 				}else{

	 					console.log("Success");
	 				}
	 			});
	 		})

	 		var path1="./public/img/" + img.originalFilename;

	 		var new_path = path1.substring(8,path1.length);
	 		
	 		//todays date
	 		var today = new Date();
	 		var dd = today.getDate();
	 		var mm = today.getMonth()+1; //January is 0!

	 		var yyyy = today.getFullYear();
	 		if(dd<10){
	 		    dd='0'+dd
	 		} 
	 		if(mm<10){
	 		    mm='0'+mm
	 		} 
	 		var today = dd+'/'+mm+'/'+yyyy;
	 		console.log("date: " + today);

	 		var docs={doc_path:'',upload_date:'',doc_name:'',name:'',type:''};

	 		docs.doc_path = new_path;
	 		docs.upload_date = today;
	 		docs.doc_name = img.originalFilename;
	 		docs.price = fields.price[i];
	 		docs.name = fields.name[i];
	 		docs.type = fields.type[i];
	 		i++;

	 		obj.table.push(docs);
	 	});

 		var json = JSON.stringify(obj);

 		fs.writeFile('json/inventory.json', json, 'utf8', function(err,data){
 			console.log("ADDED TO JSON");
 		});

	  	res.redirect('http://localhost:5000/#/admin');

	  
	  	

 	});
 });

 router.route('/getList')
		
 .get(function(req,res){

 	var fs = require('fs');
 	var obj;
 	fs.readFile('json/inventory.json', 'utf8', function (err, data) {
 	  if (err) throw err;
 	  obj = JSON.parse(data);
 	  console.log(obj);
 	  res.send(obj);
 	});

 	 

 });

module.exports = router;
