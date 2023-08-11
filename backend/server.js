// plugins ra dependency haru yeta
const express = require('express');
const qrcode = require('qrcode');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3001; // port number change nagarnuhola
app.use(cors({credentials: true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
const secretKey ="abcd1234"
// database connection part yesko database ma bts lai change garera easylab banaunu parxa last ma
const db = mysql.createConnection({
host:"localhost",
user: "root",
password: "",
database: "bts"
})
async function checkUser (req,res){
    const token = req.cookies.jwt;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Handle JWT verification error
            return res.status(401).json({message:'Unauthorized',error:true});
        }

        // Access the decoded user information
        const userId = decoded.id;
        const username = decoded.email;

        // Perform further actions based on the decoded user information

         res.send(`Protected route accessed by user: ${username}`);

    
    
    });
}
app.post('/client',(req,res)=>{
    const formData=req.body; 
    const name = formData.name;
    const contractor = formData.contractor;
    const consultant = formData.consultant;
    const source = formData.source;
    const type = formData.type;
    const sby = formData.sby;
    const area = formData.area;
    const Sdate = formData.Sdate;
    const Tdate = formData.Tdate;
    const tby = formData.tby;
    const sfrom = formData.sfrom;

    var Ssql ="INSERT INTO sampledata (source,type,s_from,s_by,area,s_date,t_by,t_date) VALUES('"+source+"','"+type+"','"+sfrom+"','"+sby+"','"+area+"','"+Sdate+"','"+tby+"','"+Tdate+"')";
    db.query(Ssql,function(error,result){
        if(error) throw error;
        console.log("Uploaded to  Sample Database");
    });
    var Rsql ="SELECT s_id FROM sampledata ORDER BY s_id DESC LIMIT 1";
    db.query(Rsql,function(error,result){
        if(error) throw error;
        const id1 =result;
        console.log(id1);
        const sam1 = id1[0].s_id;
        var Csql ="INSERT INTO client (name,contractor,consultant,SamID) VALUES('"+name+"','"+contractor+"','"+consultant+"','"+sam1+"')";
        db.query(Csql,function(error,result){
            if(error) throw error;
            console.log("Uploaded to  Client Database");
        });
        res.json(result);
    });

});


app.post('/report',(req,res)=>{
    const dataform = req.body;
    console.log(dataform);
    const s_id = dataform.s_id;
    var data1 = {};
    var data2 ={};
    async function generateQRCode(text, filePath) {
        try {
          await qrcode.toFile(filePath, text);
          console.log('QR code generated successfully!');
        } catch (error) {
          console.error('QR code generation failed:', error);
        }
      }
      var scannedmsg = 'This is a valid report of easylab that can be verified with Sample Id : '+s_id+ ' in our database';
      generateQRCode(scannedmsg, '../frontend/src/qrcode.png');

      console.log(s_id);

    //yo vayo aba client table lai ni join garera report ma milauna baki xa
    var query1 = 'SELECT t1.s_id, t1.wsm, t1.wm, t1.vm, t1.wws, t1.wd, t1.dd, t1.wwc, t1.wdc, t1.wc, t1.ww,t1.wds,t1.mc,t2.source,t2.type,t2.s_from,t2.s_by,t2.area,t2.s_date,t2.t_by,t2.t_date,t3.name,t3.contractor,t3.consultant FROM mdd AS t1 JOIN sampledata AS t2 ON t1.samID = t2.s_id JOIN client AS t3 ON t2.s_id = t3.SamID WHERE t1.s_id = ?  ';
    db.query(query1,[s_id],function(error,result1){
        if(error) throw error;
        var data = result1;
        console.log(data);
        res.json(data);
    });
});


//completed dd and mc calculation with report generation
app.post('/mdd',(req,res) => {   
    const formData=req.body; 
    const samID = formData.samID;
    const s_id = formData.s_id;
    const test_id = formData.test_id;
    const wsm = formData.wsm;
    const wm = formData.wm;
    const vm = formData.vm;
    const wwc = formData.wwc;
    const wdc = formData.wdc;
    const wc = formData.wc;
    const ww = wwc-wdc;
    const wds = wdc - wc;
    const mc = ((ww/wds)*100);
    const wws = wsm - wm;
    const wd = wws/vm;
    const dd = ((100*wd)/(100+mc));
    const finalDD = dd.toFixed(3);
    const finalMC = mc.toFixed(1)
    console.log(finalDD,finalMC); // for testing
    // upload to database
    var sql ="INSERT INTO mdd (test_id,s_id,wsm,wm,vm,wws,wd,dd,wwc,wdc,wc,ww,wds,mc,samID) VALUES('"+test_id+"','"+s_id+"','"+wsm+"','"+wm+"','"+vm+"','"+wws+"','"+wd+"','"+finalDD+"','"+wwc+"','"+wdc+"','"+wc+"','"+ww+"','"+wds+"','"+finalMC+"','"+samID+"')";
    db.query(sql,function(error,result){
        if(error) throw error;
        console.log("Uploaded to Database");
    });
    res.json({finalDD,finalMC});
});

app.post('/seive',function (req,res){

const data = req.body;
console.log(data);
const s_id = data.s_id;
const t_id = data.test_id;
const sesize = data.sesize;
const wr = data.wr;
const size = data.size;
const tw = data.tw;
const min = data.min;
const max = data.max;

var Asql = "SELECT cwr FROM seive WHERE test_id = ?";
db.query(Asql, [t_id - 1], function (error, result) {
    if (error) throw error;
    console.log(result[0].cwr);
    const prv_wr = result[0].cwr;
    var cwr = wr + prv_wr;
    const cwrp = ((cwr / tw) * 100);
    const FinCwrp = cwrp.toFixed(2);
    console.log(cwrp);
    const cp = 100 - cwrp;
    const FinCp = cp.toFixed(2);
    var Bsql = "INSERT INTO seive(ss,wr,cwr,cwrp,cp,min,max,test_id,samID) VALUES('" + sesize + "','" + wr + "','" + cwr + "','" + FinCwrp + "','" + FinCp + "','" + min + "','" + max + "','" + t_id + "','" + s_id + "')";
    db.query(Bsql, function (error, resultx) {
        console.log("uploaded");
    });
});
const send ="Done";
res.json({send});
});

app.post('/clientSe',function(req,res){
    const formData=req.body; 
    const project = formData.projet;
    const name = formData.Cname;
    const contractor = formData.contractor;
    const consultant = formData.consultant;
    const source = formData.source;
    const sby = formData.sby;
    const Sdate = formData.Sdate;
    const Tdate = formData.Tdate;
    const tby = formData.tby;

    var Ssql ="INSERT INTO ssample (source,s_by,s_date,t_by,t_date) VALUES('"+source+"','"+sby+"','"+Sdate+"','"+tby+"','"+Tdate+"')";
    db.query(Ssql,function(error,result){
        if(error) throw error;
        console.log("Uploaded to  SSample Database");
    });

    var Rsql ="SELECT s_id FROM ssample ORDER BY s_id DESC LIMIT 1";
    db.query(Rsql,function(error,result){
        if(error) throw error;
        const id = result;
        console.log(id);;
        const sam = id[0].s_id;
        var Csql ="INSERT INTO sclient (project,name,contractor,consultant,SamID) VALUES('"+project+"','"+name+"','"+contractor+"','"+consultant+"','"+sam+"')";
        db.query(Csql,function(error,result){
            if(error) throw error;
            console.log("Uploaded to  SClient Database");
        });

       // console.log(result);
        res.json(result);
    });
});


app.post('/reportSe', function(req,res){

    const dataform = req.body;
    console.log(dataform);
    const s_id = dataform.s_id;
    var data1 = {};
    var data2 ={};
    async function generateQRCode(text, filePath) {
        try {
          await qrcode.toFile(filePath, text);
          console.log('QR code generated successfully!');
        } catch (error) {
          console.error('QR code generation failed:', error);
        }
      }
      var scannedmsg = 'This is a valid report of easylab that can be verified with Sample Id : '+s_id+ ' in our database';
      generateQRCode(scannedmsg, '../frontend/src/qrcode.png');

      console.log(s_id);

    //yo vayo aba client table lai ni join garera report ma milauna baki xa
    var query1 = 'SELECT t1.test_id,t1.ss,t1.wr,t1.cwr,t1.cwrp,t1.cp,t1.min,t1.max,t1.samID,t2.source,t2.disc,t2.s_by,t2.s_date,t2.t_by,t2.t_date,t3.name,t3.contractor,t3.consultant FROM seive AS t1 JOIN ssample AS t2 ON t1.samID = t2.s_id JOIN sclient AS t3 ON t2.s_id = t3.SamID WHERE t1.samID = ? ORDER BY test_id DESC ';
    db.query(query1,[s_id],function(error,result1){
        if(error) throw error;
        var data = result1;
        console.log(data);
        res.json(data);
    });

});


app.post('/login', function (req, res) {
    const { email, password } = req.body;
    const getUserQuery = `Select * from login where email='${email}'`;
    db.query(getUserQuery, async (error, results, fields) => {
        if (results.length === 0) {
            return res.status(404).send({ message: "User not found", error: true })
        }
        const storedPassword = results[0].password
        console.log(storedPassword, password)
        const passwordMatch = await bcrypt.compare(password, storedPassword);
        if (!passwordMatch) {
            return res.status(404).send({ message: "Password does not match", error: true })
        }
        const user = {
            id: results[0].id,
            email: results[0].email
        }
        const token = jwt.sign(user, secretKey);
        res.cookie('jwt', token, { httpOnly: false, sameSite: "lax" });
        res.json({ message: "Logged in", user });
    })
});

app.get('/me', async function (req, res) {
    await checkUser(req,res)
})
app.post('/register', async function (req, res) {
    const { email, password, user } = req.body;
    const checkEmail = `Select * from login where email='${email}'`;
    db.query(checkEmail, (error, results, fields) => {
        console.log(error)
        if (error) {
            // Handle the database query error
            return res.status(500).send({ error: true, message: "Internal server error" });
        }
    })
    const hash = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO login (email,password) VALUES('${email}','${hash}')`;
    db.query(addUser, (error, results, fields) => {
        if (error)
            return res.status(400).send({ error: true, message: "Error adding user" })
        else {
            res.json({ success: true })
        }
    })
});

app.listen(port,()=>{
    console.log("Listening on port 3001...")
});