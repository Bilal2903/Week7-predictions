const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was successfully loaded!")
}

let predictButton = document.getElementById('predict')
predictButton.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let fixedAcid = document.getElementById('fixedAcid').value;
    let volatileAcid = document.getElementById('volatileAcid').value;
    let citricAcid = document.getElementById('citricAcid').value;

    console.log(fixedAcid, volatileAcid, citricAcid)

    const result = await nn.predict({
        fixedAcidity: parseInt(fixedAcid),
        volatileAcidity: parseInt(volatileAcid),
        citricAcid:parseInt(citricAcid),
    })
    console.log(result)

    let endResult = document.getElementById('result')
    endResult.innerHTML = `De kwaliteit is: ${result[0].quality}`;
}