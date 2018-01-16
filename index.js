var sqlite3 = require('sqlite3').verbose();
var json2csv = require('json2csv');
var fs = require('fs');
var _ = require('underscore');

var sql = "SELECT B.title, W.word, W.stem, W.lang, L.usage from WORDS as W JOIN LOOKUPS AS L ON W.id = L.word_key JOIN BOOK_INFO AS B ON B.id=L.book_key"

function getPathToKindleVocabulary() {
    console.log(process.platform);
    switch(process.platform) {
        case 'win32': return 'D:/system/vocabulary/vocab.db';
    }
}

function loaddb(config) {
    var db = new sqlite3.Database(config.path);

    db.serialize(function() {
        db.all(sql, function(err, row) {
            //console.log(row.title+", "+row.word+", "+row.stem+", "+row.lang+", "+row.usage );
            row = _.unique(row, false, function(w) { return w.stem });
            json2csv({ data: row, fields: ['word', 'stem', 'lang', 'usage'] }, function(err1, csv) {
                console.log(csv)
                fs.writeFile(config.csv, csv, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                  });
            });
        });
    });
    db.close();
}

function start() {
    var args = process.argv.splice(2);
    var config = {};
    config.path = args[0] || getPathToKindleVocabulary();
    config.csv = args[1] || "vocabulary.csv";
    console.log(config);

    loaddb(config);
}

start();