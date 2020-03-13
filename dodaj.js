const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"

exports.dodajSprawe = function (res, q, qdata) {
  console.log('Panel dodawania');
  if(q.search != null){
    console.log(qdata.obiekt);
    console.log("msg:" + qdata.msg);
//połączenie z bazą
    MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("saint");
    //składanie daty wpisu
    var d = new Date();
    var data = d.getFullYear() + "-";
    data += (((d.getMonth()+1) < 10) ? "0" + (d.getMonth()+1) : (d.getMonth()+1)) + "-";
    data += (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    //tworzenie wpisu
    var myobj = { obiekt: qdata.obiekt, msg: qdata.msg , "data utworzenia": data, aktywny: 1 };
    //dodanie wpisu
    dbo.collection("dash").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
    res.write('<br>' + 'Pomyślnie dodano sprawę dla: ');
    res.write('<b>' + qdata.obiekt + '</b>');
  }
};
