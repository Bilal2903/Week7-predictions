const nn = ml5.neuralNetwork({task: 'regression', debug: true})

function loadData() {
        Papa.parse("./data/winequality.csv", {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: results => prepareData(results.data)
        })
}

function prepareData(data) {
        data.sort(() => Math.random() > 0.5)
        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        for (let row of trainData) {
                nn.addData({ volatileAcidity: row.volatileAcidity ,  fixedAcidity: row.fixedAcidity ,  citricAcid: row.citricAcid }, {quality: row.quality})
        }

        nn.normalizeData()
        nn.train({ epochs: 32 }, () => doneTraining(nn))
        predict();
}

async function predict(){
        const result = await nn.predict({
        volatileAcidity:7, fixedAcidity:4, citricAcid:0})
        console.log("result")
}

// async function drawPredictions() {
//         let predictions = []
//         for (let hp = 40; hp <= 250; hp += 5) {
//                 const prediction = await nn.predict({horsepower: hp})
//                 predictions.push({x: hp, y: prediction[0].mpg})
//         }
//         updateChart("Predictions", predictions)
// }

function doneTraining(nn) {
        let saveButton = document.getElementById('saveButton')
        saveButton.addEventListener('click', (event) => saveModel(nn))
}

function saveModel(nn){
        nn.save()
}

loadData();
