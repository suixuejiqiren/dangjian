var mongoose = require('mongoose');
mongoose.connect('mongodb://huashan:huashan123@localhost:27017/dangcrm', {useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(" we're connected! ")
});
