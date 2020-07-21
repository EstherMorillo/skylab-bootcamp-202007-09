function gameOfLife(inputArray) {
	//clone the ar
	var gameArray = JSON.parse(JSON.stringify(inputArray))
	for (let i = 0; i < inputArray.length; i++) {
		for (let j = 0; j < inputArray[i].length; j++) {
			let counter = 0

			//controls the undefined situation
			if (inputArray[i - 1] !== undefined) {
				if (inputArray[i - 1][j - 1] !== undefined) {
					if (inputArray[i - 1][j - 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i - 1] !== undefined) {
				if (inputArray[i - 1][j] !== undefined) {
					if (inputArray[i - 1][j] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i - 1] !== undefined) {
				if (inputArray[i - 1][j + 1] !== undefined) {
					if (inputArray[i - 1][j + 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i] !== undefined) {
				if (inputArray[i][j - 1] !== undefined) {
					if (inputArray[i][j - 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i] !== undefined) {
				if (inputArray[i][j + 1] !== undefined) {
					if (inputArray[i][j + 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i + 1] !== undefined) {
				if (inputArray[i + 1][j - 1] !== undefined) {
					if (inputArray[i + 1][j - 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i + 1] !== undefined) {
				if (inputArray[i + 1][j] !== undefined) {
					if (inputArray[i + 1][j] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i + 1] !== undefined) {
				if (inputArray[i + 1][j + 1] !== undefined) {
					if (inputArray[i + 1][j + 1] === 1) {
						counter++
					}
				}
			}
			if (inputArray[i][j] === 1) {
				//The cell is alive
				if (counter < 2) {
					gameArray[i][j] = 0
				} else if (counter > 3) {
					gameArray[i][j] = 0
				}
			} else {
				//The cell is dead
				if (counter === 3) {
					gameArray[i][j] = 1
				}
			}
		}
	}

	inputArray = gameArray
	return inputArray
}
function modifyClass(position) {
	if (position.className === 'white') {
		position.className = 'black'
	} else {
		position.className = 'white'
	}
}
//Generates as much columns and rows at the html as the user want
function insertHtmlCode(heightNumber, widthNumber) {
	let buffer = ''
	for (let i = 0; i < heightNumber; i++) {
		buffer += '<tr>'
		for (let j = 0; j < widthNumber; j++) {
			buffer += '<td class=white id=' + i + '-' + j + '></td>'
		}
		buffer += '</tr>'
	}

	if (mainContainer !== null) mainContainer.innerHTML = buffer
}
//Get the table info and convert it into an 0 and 1 array
function saveArray(allElements, widthNumber) {
	let bufferArray = [[]]
	let j = 0
	for (let i = 0; i < allElements.length; i++) {
		if (allElements[i].className === 'white') {
			bufferArray[j].push(0)
		} else {
			bufferArray[j].push(1)
		}
		if ((i + 1) % widthNumber === 0 && i !== 0) {
			bufferArray.push([])
			j++
		}
	}
	bufferArray.pop()
	return bufferArray
}
//Replace the HTML with the new array generated by GameOfLife()
function changeHTML(calcArray, allElements) {
	for (let i = 0; i < calcArray.length; i++) {
		for (let j = 0; j < calcArray[i].length; j++) {
			if (calcArray[i][j] === 1) {
				allElements[i * widthNumber + j].className = 'black'
			} else {
				allElements[i * widthNumber + j].className = 'white'
			}
		}
	}
}
const mainContainer = document.getElementById('main-container__table')
const buttonsElements = document.querySelectorAll('button')
var calcArray = []
let heightNumber = prompt('height?'),
	widthNumber = prompt('width?')
let interval = null
const skylabArray = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

insertHtmlCode(heightNumber, widthNumber)
const allElements = document.querySelectorAll('td')

for (let i = 0; i < allElements.length; i++) {
	allElements[i].addEventListener('click', function (event) {
		event.preventDefault()
		modifyClass(allElements[i])
	})
}
if (buttonsElements.length !== 0) {
	buttonsElements[1].addEventListener('click', function (event) {
		event.preventDefault()
		if (interval === null) {
			interval = setInterval(() => {
				changeHTML(gameOfLife(saveArray(allElements, widthNumber)), allElements)
			}, 200)
			buttonsElements[1].innerHTML = 'Stop'
		} else {
			clearInterval(interval)
			interval = null
			buttonsElements[1].innerHTML = 'Start'
		}
	})
	buttonsElements[2].addEventListener('click', function (event) {
		event.preventDefault()
		changeHTML(skylabArray, allElements)
	})
}
