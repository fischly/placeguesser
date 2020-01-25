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
		
		let query = 'SELECT * from public."Users" where email=$1 and pass=$2';
		let param = [req.body.email, req.body.pass];
		
		
		pool.query(query, param,(err,rs)=>{
        
		if(err==null){
			
			
			
			
			
			if(rs.rowCount==0)
				res.json("notfound")
			else
				res.json("found")
				
			
			
        
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
		
		
		
		let query = 'SELECT * from public."Users" where email=$1';
		let param = [req.body.email];
		let q = 'INSERT INTO public."Users"(username, email, pass)VALUES ($1,$2,$3);';
		let p = [req.body.user, req.body.email,req.body.pass];
		
		pool.query(query,param).then((rsp)=>{
			if(rsp.rowCount==0){
				pool.query(q,p).then((result)=>{
					res.json("registered");
					pool.end();
					
				}).catch((err)=>{console.log(err)})
			}
			else{
				res.json("aexists");
				pool.end();
			}
				
			
		}).catch((err)=>{console.log(err)});
		
		
		
		
		
	});


});

app.get('/profile',(req,res)=>{
	
	
	const pool = new Pool({connectionString: connectionString}) ;
	
	//console.log(req.query.email);
	
	
	
	
	pool.connect((err)=>{
		
		if(err)
			cosole.log(err);
		
		
		
		let query = 'SELECT * from public."Users" where email=$1';
		let param = [req.query.email];
		
		
		pool.query(query,param,(err,rsp)=>{
			
			let data = rsp.rows;
			console.log(data);
			console.log(err,rsp);
			res.json(data[0]);
			
			
			
		})
		
		pool.end();
	});
	
	
});

app.route('/delete').delete((req,res)=>{
	
	
	const pool = new Pool({connectionString: connectionString}) ;
	
	
	console.log("start deleting");
	console.log(req.query.email);
	
	pool.connect((err)=>{
		
		if(err)
			cosole.log(err);
		
		
		
		let query = 'DELETE from public."Users" where email=$1';
		let param = [req.query.email];
		
		
		pool.query(query,param,(err,rsp)=>{
			
			if(err)
				res.json("error");
			
			console.log(rsp);
			console.log("deleted");
			res.json("deleted");
			
			
			
		});
		
		pool.end();
	});
	
	
});

app.put('/editpass',(req,res)=>{
	
	
	const pool = new Pool({connectionString: connectionString}) ;
	
	
	console.log("");
	console.log(req.body.oldpass);
	
	
	pool.connect((err)=>{
		
		if(err)
			cosole.log(err);
		
		
		
		let query = 'SELECT * from public."Users" where email=$1 and pass=$2';
		let param = [req.body.email, req.body.oldpass];
		let q = 'UPDATE public."Users" SET pass=$2 WHERE email=$1';
	
		let p = [req.body.email, req.body.newpass];
		
		
		pool.query(query,param).then((rsp)=>{
			if(rsp.rowCount==0){
			res.json("notfound");
			
			}else pool.query(q,p).then((result)=>{
				console.log(result);
				res.json("updated");
				pool.end();
			}).catch((err)=>{console.log(err)})
			
		}).catch((err)=>{console.log(err);});
		
		
		
		
		
		
	});
	
	
});


app.put('/edituser',(req,res)=>{
	
	
	const pool = new Pool({connectionString: connectionString}) ;
	
	
	console.log("");
	console.log(req.body.newuser);
	
	
	pool.connect((err)=>{
		
		if(err)
			cosole.log(err);
		
		
		
		
		let query = 'UPDATE public."Users" SET username=$2 WHERE email=$1';
	
		let param = [req.body.email, req.body.newuser];
		
		
		pool.query(query,param).then((rsp)=>{
			if(rsp.rowCount>0){
				res.send("updated");
				pool.end();
			}
			else
				pool.end();
		
			
		}).catch((err)=>{console.log(err);});
		
		
		
		
		
		
	});
	
	
});



//In the making: other routes
	



app.listen(3000, ()=>{console.log("listening on port 3000")});

