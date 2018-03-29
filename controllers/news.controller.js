const fs = require('fs');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
    projectId: 'newstest-ecf16',
    keyFilename: 'keys/newsTest-26e4570ca0c5.json'
});


exports.obtain_data = function (request, response) {
    var collection = firestore.collection('news');
    var record =  {};

    var index = 0;
    var reader = function(record) {
        if (index === record.length) return response.send(record);

        setTimeout(function() {
            record[index].datetime = Date.now();
            collection.add(record[index]).then(function () {
                index++;
                reader(record);
            });
        }, 2000);

    };

    fs.readFile('data/news.json', function (error, data) {
        if (error) response.send(error);
        record = JSON.parse(data);
        reader(record);
    });
};