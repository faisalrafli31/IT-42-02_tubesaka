let arr=[];
let container = document.getElementById("container");
let canClick=true;
let N=100;
let delay=10;
var slider1 = new Slider('#ex1', {
	formatter: function(value) {
        N=value;
		return 'Current List Size: ' + value;
	}
});
var slider2 = new Slider('#ex2', {
	formatter: function(value) {
        delay=5*value;
		return 'Current Delay: ' + value;
	}
});
function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
async function swap(i,j){
     if(i==j)return;
    let tmp = arr[i].offsetHeight;
    arr[i].style.height = `${String(arr[j].offsetHeight)}px`;
    arr[j].style.height = `${String(tmp)}px`;
}

//start random quick
async function Partition( start,  end)
{
    let pivot = arr[end].offsetHeight;
    arr[end].style.backgroundColor='red';
    let currentPartition = start;
    arr[currentPartition].style.backgroundColor='red';
    for (let i = Number(start); i < Number(end); i++)
    {
        arr[i].style.backgroundColor='red';

        if (arr[i].offsetHeight < pivot)
        {
            arr[currentPartition].style.backgroundColor='red';
            await swap(i,currentPartition);
            currentPartition++;
            arr[currentPartition].style.backgroundColor='red';
        }
        await timer(delay);
        arr[i].style.backgroundColor='red';

    }

    await swap(end,currentPartition);

    arr[currentPartition].style.backgroundColor='red';
    arr[end].style.backgroundColor='red';

    return currentPartition;
}
async function RandomPartition(start, end)
{
    
    let i = Math.floor(Math.random() * (end - start))+start ;
    
    await swap(i, end);
    return await Partition(start, end);
}
async function QuickSort( start=0,  end=arr.length-1)
{
    if (start >= end)
    {
        return;
    }

    let pivotIndex = Number(await RandomPartition(start, end));
    await QuickSort(start, Number(pivotIndex) - 1);
    await QuickSort(Number(pivotIndex) + 1, end);
}
//end random quick


///start heap
async function MaxHeapify( i,  heapSize)
{

    let hasLeft = (2 * i + 1 < heapSize) ? true : false;
    let hasRight = (2 * i + 2 < heapSize) ? true : false;
    let l, r;
    let largest = i;
    if (hasLeft)
        l = arr[2 * i + 1].offsetHeight;
    if (hasRight)
        r = arr[2 * i + 2].offsetHeight;
    if (hasLeft && arr[i].offsetHeight < l)
    {
        largest = 2 * i + 1;
    }
    if (hasRight && arr[largest].offsetHeight < r)
    {
        largest = 2 * i + 2;
    }
    if (largest != i)
    {
        arr[i].style.backgroundColor='white';
        arr[largest].style.backgroundColor='green';
        await timer(delay);
        await swap(i, largest);
        arr[i].style.backgroundColor='red';
        arr[largest].style.backgroundColor='red';
        await MaxHeapify(largest, heapSize);
    }
}
async function BuildMaxHeap()
{
    for (let i = parseInt(arr.length / 2) + 1; i >= 0; i--)
    {
        await MaxHeapify(i, arr.length);
    }
}
async function HeapSort()
{
    await BuildMaxHeap();
    let heapSize = arr.length;
    for (let i = arr.length - 1; i >= 1; i--)
    {
        await swap(0, heapSize - 1);
        heapSize--;
        await MaxHeapify(0, heapSize);
    }
}
///end heap

async function disableButtons(j){
    let btns = document.getElementsByClassName('btns')[0].getElementsByTagName('button');
    for(let i=0;i<btns.length;i++){
        if(i!=j){
        btns[i].disabled=true;
        }
    }
   btns = document.getElementsByClassName('generator')[0].getElementsByTagName('button');
    for(let i=0;i<btns.length;i++){
        
        btns[i].disabled=true;
        
    }
}
async function enableButtons(){
    let btns = document.getElementsByClassName('btns')[0].getElementsByTagName('button');
    for(let i=0;i<btns.length;i++){
        btns[i].disabled=false;

    }
    btns = document.getElementsByClassName('generator')[0].getElementsByTagName('button');
    for(let i=0;i<btns.length;i++){
        
        btns[i].disabled=false;
        
    }
}
async function quickEvent(){
    if(canClick){
        canClick=false;
   await  disableButtons(2);
    QuickSort().then(()=>{
       enableButtons();
       canClick=true;
        });
    }
}

async function heapEvent(){
    if(canClick){
        canClick=false;
    await disableButtons(5);
    HeapSort().then(()=>{
       enableButtons();
       canClick=true;
        });
    }
}


async function randomEvent(){
    generateBars(0);
}
async function sortedEvent(){
    generateBars(1);
}

function setEvents(){
    document.getElementById("quick").addEventListener('click',quickEvent);
    document.getElementById("heap").addEventListener('click',heapEvent);
    document.getElementById("random-generator").addEventListener('click',randomEvent);
    document.getElementById("sorted-generator").addEventListener('click',sortedEvent);
}
setEvents();
async function generateBars(type=0){
    if(type==1){
        container.style.top='70%';
        if(N>85&&N<200){
            container.style.top='30%';
        }

    }
    else{
        container.style.top='45%';
    }
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    arr=[];
    if(N<100){vw=vw-4*N;}
    else{
    vw=vw-2.5*N;
    }
    container.innerHTML = '';
    let step=2;
    if(N>200)step=.3;
    let counter=10;
    for (let i = 0; i < N; i++) {
      let newDiv = document.createElement("div");
      let height=0;
      if(type==0){
        height = Math.floor(Math.random() * 300) + 1;
      }
      else{
        height+=Number(counter);
      }
      newDiv.style.height = `${String(height)}px`;
      newDiv.style.width = `${String((vw / N))}px`;
      container.appendChild(newDiv);
      arr.push(newDiv);
      counter+=step;
    }
}
generateBars();
