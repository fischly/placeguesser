const express = require('express');       
const cors = require('cors');
const {Pool,Client} = require('pg');

//eventuel ändern
const connectionString = 'postgressql://postgres:password@localhost:5432/Test';

const bodyParser = require('body-parser');



const app = express();




app.use(cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());



app.post('/login',(req,res)=>{
	
	const pool = new Pool({connectionString: connectionString});
	

    pool.connect(err =>{
		
		if(err){
			console.log(err);
			return;
		};
		
		let query = 'SELECT * from public."Users" where email=$1';
		let param = [req.body.email];
		
		
		pool.query(query, param,(err,rs)=>{
        
		if(err==null){
			
			let data = rs.rows;
		
			if((req.body.email==data[0].email||req.body.email==data[0].username)&&req.body.pass==data[0].pass){
				
				res.json("found");
			}else{res.json("notfound")};
				
			
			
			console.log(data);
			data=null;
        
		}
		else{
			console.log(err);
		}
			 
		pool.end();
		
        });
		
		
	});

    console.log("Sent something");
	});

app.post('/register',(req,res)=>{
	
	//TODO check if username or email already exists
	
	
	const pool = new Pool({connectionString: connectionString}) ;
	let found = false;
	
	pool.connect((err)=>{
		
	
		
		if(err){
			console.log(err);
			return;
		}
		
		//res.json("registered");
		
		
		
		let query = 'INSERT INTO public."Users"(username,email,pass)VALUES ($1, $2, $3)';
		let param = [req.body.user,req.body.email,req.body.pass];
		
		pool.query(query,param,(err,rsp)=>{
			
			console.log(err,rsp);
			res.json("registered");
			
			
		});
		
		
		
		
		pool.end();
	});


});

//In the making: other routes
	



app.listen(3000, ()=>{console.log("listening on port 3000")});

