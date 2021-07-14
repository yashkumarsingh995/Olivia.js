//let s=new Synaptic_Matrix(2,3);
/*
 sn.randomize();
 let sn1=new Synaptic_Matrix(2,3);
 sn1.randomize();

let d=Synaptic_Matrix.multiplicationElementwise(sn,sn1);
Synaptic_Matrix.print(d)


//et points=[[[4,2],[1]],[[5,3],[0]],[[0,1],[1]] ,[[7,6],[0]],[[6,3],[1]],[[12,4],[1]],[[23,5],[0]],[[10,3],[0]]];

 let points=[[[2,3],[1]],[[3,3],[0]],[[4,3],[1]],[[4,4],[0]],[[5,4],[1]],[[5,5],[0]],[[3,5],[1]],[[2,5],[1]],[[3,4],[1]],[[2,3],[1]],[[6,6],[0]],[[9,3],[1]]];
 
 //let points=[[[2,3],[5]],[[2,4],[6]],[[9,7],[16]],[[1,1],[2]]];
 
 let sn=new Synaptic_Networks(2,3,1);
 


for(let i=0;i<10000;i++)
{ 
  let point=Math.floor((Math.random(0,points.length)*10) % points.length)
  
  sn.train(points[point][0],points[point][1])
}

let arr=[9,6];
let c=sn.feedforward(arr);
console.log(c.weighted_sum_hidden_outputs);



let sml=new Synaptic_Multi_Layer(3,1,[3,4,4,3]);

let arr=[1,2,3];
let ans=[0];
console.log(arr[0]+arr[1]+arr[2])
//let sn=sml.feedforwrad(arr);
//console.table(sn)

//let ap=sml.train(arr,ans);

sml.train(arr,ans);
//Synaptic_Matrix.print(sml.weighted_hidden_layer[2])

let sn=sml.feedforward(arr);
console.table(sn);


//let ps= sml.feedforward(arr);
//console.log(ps);
//Synaptic_Matrix.print(sml.weighted_hidden_layer[2]);
/*
let sn=new Synaptic_Networks(2,3,1);
sn.train(arr,ans);




let text ="hello i am yash ,your friend and i love my family";

let concentrated_String=" ";

for(let i=0;i<text.length;i++)
{
  if(text[i]!==" ")
  {
    concentrated_String+=text[i];
  }
}

let binary_text="";

for (let i = 0; i < text.length-1; i++)
{
  binary_text+=concentrated_String.charCodeAt(i).toString(2);
  
}

//console.log(binary_text);

let input_nodes=7;

let input_nodes_array=[];

let count=binary_text.length-1-Math.floor((binary_text.length-1)/input_nodes);

let count_upto=count;

for(let i=0;i<input_nodes-2;i++)
{
  let sum=0;
  
  for(let j=0;j<Math.floor((binary_text.length/input_nodes));j++)
  {
    sum+=Math.pow(2,count);
    count--;
  }
  input_nodes_array[i]=sum;
}

let sum1=0;

let count_upto1=count_upto-1;
console.warn(count_upto1);

for(let j=count_upto1;j<binary_text.length-1;j++)
{
  sum1+=Math.pow(0.02,count);
  count--;
}
input_nodes_array[input_nodes-2]=sum1;


let preresult=Synaptic_Matrix.fromArray(input_nodes_array);

let result=Synaptic_Matrix.map(preresult,(x)=>{
  return Activation.sigmoid(Math.sqrt(Math.log(Math.sqrt(x))));
  
});



Synaptic_Matrix.print(result);



console.table(input_nodes_array)

*/


  

//let arr=[1,0,0,0,1,1,0,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1,1,1,1,0,0,0,1,1,0,1,1,0,1,1,1,0,0,1,0,0,0,0,0,0,1,1,1,0,1,0];
//console.log(arr.length);

let arr=new Synaptic_Matrix(9,9);
arr.randomize();
let as=[1,0,1];
let frame=new Synaptic_Matrix(2,2);
frame.randomize();

let sn=new Synaptic_Cnn(3,2,[[4,3],[4,2]],[2,1]);
//sn.complete_convolution(arr);

//sn.complete_convolution(arr,frame);
//let val=sn.pool(arr,2) 


let p=sn.cnn_feedforward(arr)


//let r=new Synaptic_Dense_Layer(5,3,[3,2,4]);
//r.train([1,2,4,3,5],[1,0,0]);

let q=sn.backpropagate_cnn(p,as);


//Synaptic_Matrix.print(arr);
//Synaptic_Matrix.print(p);
//sn.convolution(dataset);

//sn.weighted_sums(arr,0,0);
















/**/