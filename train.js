function loadData() {
        Papa.parse("./data/winequality.csv", {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: results => prepareData(results.data)
        })
}

function prepareData(data) {
        const nn = ml5.neuralNetwork({task: 'regression', debug: true})

        data.sort(() => Math.random() > 0.5)
        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        for (let row of trainData) {
                nn.addData({ volatileAcidity: row.volatileAcidity ,  fixedAcidity: row.fixedAcidity ,  citricAcid: row.citricAcid }, {quality: row.quality})
        }

        nn.normalizeData()
        nn.train({ epochs: 32 }, () => doneTraining(nn))
}

function doneTraining(nn) {
        let saveButton = document.getElementById('saveButton')
        saveButton.addEventListener('click', (event) => saveModel(nn))
}

function saveModel(nn){
        nn.save()
}

loadData();
