

const boxDiv = document.getElementById('boxTotal')

boxDiv.style.opacity = '0'


setTimeout(() => {
  boxDiv.style.transitionDuration = '2s'
  boxDiv.style.opacity = '1'
    
}, 3000)

function somar() {
  let copyP = document.getElementById('copyP').value || 0
  let copyL = document.getElementById('copyL').value || 0
  let printP = document.getElementById('printP').value || 0
  let printL = document.getElementById('printL').value || 0
  let laserC = document.getElementById('laserC').value || 0
  let jetC = document.getElementById('jetC').value || 0
  let plotter = document.getElementById('plotter').value || 0
  let products = document.getElementById('products').value || 0
  let internet = document.getElementById('internet').value || 0
  
  
  
  let result = parseFloat( parseFloat(copyP) + parseFloat(copyL) + parseFloat(printP) + parseFloat(printL) + parseFloat(laserC) + parseFloat(jetC) + parseFloat(plotter) + parseFloat(products) + parseFloat(internet) ).toFixed(2)

  document.getElementById('result').innerHTML = `R$ ${result}`

}