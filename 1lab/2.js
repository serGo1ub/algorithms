const arguments = process.argv.slice(2, 5).map(i => +i);

let k = 5;
let N = 5;
let copy = [];


function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function generateArr(r, n, m) {
    const arr = [];
    N = n;
    for (let i = 0; i < r; i++) {
        arr.push(Array.from({ length: n }, () => randomInteger(1, m)));
    }
    return arr;
}

const arr = generateArr(...arguments);

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
		let key = array[i];

		let j = i - 1
		while (j >= 0 && key < array[j]) {
            array[j + 1] = array[j]
			j -= 1
        }
		array[j + 1] = key
    }
};

function mergeSort(arr) {
    if (arr.length > 1) {
		mid = Math.floor(arr.length / 2);

		let L = arr.slice(0, mid);
		let R = arr.slice(mid + 1);

        if (L.length < k) {
            insertionSort(L);
        } else {
            mergeSort(L);
        }

        if (R.length < k) {
            insertionSort(R);
        } else {
            mergeSort(R);
        }

		let i = j = f = 0

		while (i < L.length && j < R.length) {
			if (L[i] < R[j]) {
				arr[f] = L[i]
				i += 1
            }
                else {
				arr[f] = R[j]
				j += 1
            }
			f += 1	
        }

		while (i < L.length) {
			arr[f] = L[i]
			i += 1
		    f += 1
        }

		while (j < R.length) {
			arr[f] = R[j]
			j += 1
			f += 1
        }
    }
};

function calculate(arr) {
    const GAP = N/50;
    let bestK = -1;
    let minTime = Number.MAX_VALUE;
    for( ; k < N/2; ) {    
        k += GAP;
        copy = [...arr].map(item => [...item]);
        let start = Date.now();
        for (let sub of copy) {
            mergeSort(sub, 0, sub.length - 1);
        }
        let end = Date.now();
        let currentTime = end - start;
        if (currentTime < minTime) {
            minTime = currentTime;
            bestK = k;
        }
        console.log(`Execution time = ${ currentTime }`);
        console.log("===================================================================================");
    }
    
    console.log("Minimum execution time: " + minTime + " miliseconds with K = " + bestK);
}

calculate(arr);