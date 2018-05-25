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
 	  res.send(obj);
 	});

 	 

 });


 router.route('/saveData')
 	
 .post(function(req,res){

 	var fs = require('fs');
 	var obj={starter:'',mainCourse:'',date:'',starter_price:'',mainCourse_price:''};
 		obj.starter = req.body.starter;
 		obj.mainCourse = req.body.mainCourse;
 		obj.date = req.body.date;
 		obj.starter_price = req.body.starter_price;
 		obj.mainCourse_price = req.body.mainCourse_price;
    
	if(fs.existsSync('json/cart.json')){
		 console.log("NOT FIRST TIME");
		 fs.readFile('json/cart.json', 'utf8', function (err, data) {
	 	     if(err){
	 	     	console.log(err);
	 	     	res.send(err);
	 	     }else{
	             var obj1 = JSON.parse(data);	

	             for(var i=0; i<obj1.table.length;i++){
	             	if(obj1.table[i].date == obj.date ){
	             		return res.send({state: 'fail',message:'Menu already selected for this date !'});
	             	};	

	             };	

		 	     obj1.table.push(obj)
		 	     var jsonObj1 = JSON.stringify(obj1);	

		 	     fs.writeFile('json/cart.json', jsonObj1,function (err) {
		 	       if (err){
		 	       	throw err;
		 	       	res.send(err);
		 	       }else{
		 	       	console.log('Saved!');
		 	       	return res.send({state: 'success',message:'Saved Successfully!'});
		 	       };
		 	       
		 	     });
	 	  	};	
		})

	}else{

		var arrayObj = {
	 	   table: []
	 	};	
		arrayObj.table.push(obj);

		var jsonObj2 = JSON.stringify(arrayObj);

	 	fs.writeFile('json/cart.json', jsonObj2,function (err) {
	 	  if (err){
	 	  	throw err;
	 	  	res.send(err);
	 	  }else{
	 	  	console.log('Saved!');
	 	  	return res.send({state: 'success',message:'Saved Successfully !'});
	 	  };
	 	  
	 	});	

	}

 });

module.exports = router;
