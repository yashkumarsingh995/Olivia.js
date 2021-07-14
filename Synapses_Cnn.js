
"use strict"

class Activation_function
{
  static relu(x)
  {
    return Math.max(x,0);
  }
}

class Synaptic_Cnn
{
  
  constructor(output,no_of_hidden_layers,no_of_filters_in_each_layer,layer_pooling)
  {

    this.output_nodes=output;
    this.hidden=no_of_hidden_layers;
   
    this.filters=[];
    for(let i=0;i<no_of_hidden_layers;i++)
    {
      this.filters.push([]);
      for(let j=0;j<no_of_filters_in_each_layer[i][0];j++)
      {
        let filter=new Synaptic_Matrix(no_of_filters_in_each_layer[i][1],no_of_filters_in_each_layer[i][1]);
        
        filter.randomize();
        
        this.filters[i].push(filter);
      }
    }
   
    
    this.pooling=[];
    for(let i=0;i<no_of_hidden_layers;i++)
    {
      this.pooling.push(layer_pooling[i]);
    }
    
    
    
  }
  
  
  checkDimensions(inputs,frames)
  {
  if(frames.rows!==frames.cols || inputs.rows!==inputs.cols)
    {
      console.error("invalid dimensions of the inputs!!!please check inputs matrix and frames size");
       console.error("your inputs matrix dimensions:-"+inputs.rows+"x"+inputs.cols);
       console.error("your frames matrix dimensions:-"+frames.rows+"x"+frames.cols);
       return undefined;
    }
    return 0;
  }
  
  
  activation(input)
  {
    for(let i=0;i<input.rows;i++)
    {
      for(let j=0;j<input.cols;j++)
      {
        input.matrix[i][j]=Activation_function.relu(input.matrix[i][j]);
      }
    }
    return input;
  }
  
  
  static activation(input)
  {
    let new_matrix=new Synaptic_Matrix(input.rows,input.cols);
  
    for (let i = 0; i < input.rows; i++)
    {
      for (let j = 0; j < input.cols; j++)
      {
        new_input.matrix[i][j] = Activation_function.relu(input.matrix[i][j]);
      }
    }
    return new_input;
  }
  
  
  convolution(inputs,frames)
  { 
    let n=inputs.rows;
    let m=frames.cols;
    
    if(this.checkDimensions(inputs,frames)===undefined)
    { 
      console.error("invalid dimensions!!");
      return undefined;
    }
    
    
   // console.log(Math.floor(((n*m)-Math.floor(n/m))/m)-1);
   
   
    let rows_and_cols=(n-m)+1;
    
    //console.log(rows_and_cols);
    
    let result=new Synaptic_Matrix(rows_and_cols,rows_and_cols);
    
   // Synaptic_Matrix.print(inputs);
  
    // console.warn("*****************")
    
    for (let i = 0; i <= inputs.rows-frames.rows; i++)
    {  
      
      for (let j = 0; j <= inputs.cols-frames.cols; j++)
      { 
        //console.log("i/j")
        
        let z=frames.rows;
        let input= new Synaptic_Matrix(z,z);
        for(let k=0;k<z;k++)
        {
          for(let l=0;l<z;l++)
          {
            input.matrix[k][l]=inputs.matrix[i+k][j+l];
          }
        }
        result.matrix[i][j]=this.weighted_sums(input,frames);
    //    Synaptic_Matrix.print(input);

      }
    }
   // Synaptic_Matrix.print(result);
    
//    console.table(result); 
 //   console.log(result.length);
    return result;
    
  }
  
  
  complete_convolution(input,error)
  {
    if (this.checkDimensions(input, error) === undefined)
    {
      return undefined;
    }
    
    
    let new_matrix= new Synaptic_Matrix(input.rows+2,input.cols+2);
    for(let i=1,k=0;k<input.rows;i++,k++)
    {
      for(let j=1,l=0;l<input.cols;j++,l++)
      {
        new_matrix.matrix[i][j]=input.matrix[k][l];
      }
    }
    let result=this.convolution(new_matrix,error);
   // Synaptic_Matrix.print(result);
    
  }
  
  
  pool(input,pooling)
  {
    if (input.rows % 2 !== 0)
    {
      let input_temp = new Synaptic_Matrix(input.rows + 1, input.cols + 1);
  
      for (let i = 0; i < input.rows; i++)
      {
        for (let j = 0; j < input.cols; j++)
        {
          input_temp.matrix[i][j] = input.matrix[i][j];
        }
      }
      input = input_temp;
    }
  
  
    let pool_length = Math.floor(input.rows / pooling);
  
  
    let new_matrix = new Synaptic_Matrix(pool_length, pool_length);
  
    for (let i = 0, p = 0; i < input.rows; i += pooling, p++)
    {
      for (let j = 0, q = 0; j < input.cols; j += pooling, q++)
      {
        let maximum = -1000000;
        for (let k = 0; k < pooling; k++)
        {
          for (let l = 0; l < pooling; l++)
          {
            if (input.matrix[k + i][l + j] > maximum)
            {
              maximum = input.matrix[k + i][l + j];
            }
          }
        }
        new_matrix.matrix[p][q] = maximum;
      }
    }
    return new_matrix;
  }
  
  
  
  
  weighted_sums(input,frames)
  {
    let frame;
    input=Synaptic_Matrix.toArray(input);
    input=Synaptic_Matrix.fromArray(input);
    
  
    //Synaptic_Matrix.print(input);
    
    frame=Synaptic_Matrix.toArray(frames);
    frame=Synaptic_Matrix.fromArray(frame);
    
   // Synaptic_Matrix.print(frame)
    
    let result=Synaptic_Matrix.multiplicationElementwise(input,frame);
    
    //Synaptic_Matrix.print(result);
    result=Synaptic_Matrix.toArray(result);
    
    
    let sum=0;
    for(let i=0;i<result.length;i++)
    {
        sum+=result[i];
    }
    
  //  console.log(sum);
   return sum;
  }
  
  /**/
  flip(input)
  {
    
     let output_temp=new Synaptic_Matrix(input.rows,input.cols);
     
    let x=input.cols-1;
    for(let i=0;i<input.rows;i++)
     {
       for(let j=0;j<input.cols;j++)
        {
          output_temp.matrix[i][j]=input.matrix[i][x-j];
        }
  
      }
      
    let output = new Synaptic_Matrix(input.rows, input.cols);
      
  
    for (let i = 0; i < input.rows; i++)
     {
      for (let j = 0; j < input.cols; j++)
       {
         output.matrix[i][j] = output_temp.matrix[x-i][j];
        }
      
      }
      
      return output;
    
  }
  
  /**/
  
  cnn_feedforward(inp)
  {
    let input=[inp];
   
  
    let convoluted_value=[];
    
   for(let i=0;i<this.hidden;i++)
   { 
     convoluted_value.push([]);
     
     for(let k=0;k<input.length;k++)
     {
     for(let j=0;j<this.filters[i].length;j++)
     {
       let conv_temp=this.convolution(input[k],this.filters[i][j]);
       
     //  Synaptic_Matrix.print(conv_temp);
     //  console.error("***************")
       
       conv_temp=this.activation(conv_temp);
       
     //  Synaptic_Matrix.print(conv_temp);
  //    console.error("***************")
       
       conv_temp=this.pool(conv_temp,this.pooling[i]);
       
 //    Synaptic_Matrix.print(conv_temp);
  //    console.error("****************")
       
       convoluted_value[i].push(conv_temp);
       
   //    Synaptic_Matrix.print(conv_temp);
     }
     }
 //   console.error("*********");
      input=convoluted_value[i];
    //  Synaptic_Matrix.print(input[2]);
   }
    
    
    return convoluted_value;
    
    
  }
  
  
  backpropagate_cnn(convoluted_value,ans)
  { 
    let input=[];
  
      let xp=convoluted_value.length-1;
      
      for(let j=0;j<convoluted_value[xp].length;j++)
      {
        let a=convoluted_value[xp][j];
   
        let b=Synaptic_Matrix.toArray(a);
        for(let i=0;i<b.length;i++)
        {
        input.push(b[i]);
        }
      }
      
   // let ss=Synaptic_Matrix.fromArray(input);
 //   Synaptic_Matrix.print(ss);
    
    
    //console.log(input.length);
    let dl=new Synaptic_Dense_Layer(input.length,3,[3,4,3]);
    
    let error=dl.train(input,ans);
  //  Synaptic_Matrix.print(error[3]);
    
    
    let filters_transposed = [];
    for (let i = 0; i < this.hidden; i++)
    {
      filters_transposed.push([]);
      for (let j = 0; j < this.filters[i].length; j++)
      {
        let filter=this.flip(this.filters[i][j])
    
        filters_transposed[i].push(filter);
        
     //   Synaptic_Matrix.print(this.filters[i][j]);
   //     console.error("*******");
    //    Synaptic_Matrix.print(filters_transposed[i][j]);
        
      }
    }
    
    
    /**/
    
    
    let error_in_layer=[];
    let error_prev=error[error.length-1];
    for(let i=this.hidden;i>0;i++)
    { let temp_error=[]
      for(let j=0;j<this.filters[i-1].length;j++)
      {
        let val=this.convolution(error_prev,this.filters[i][j]);
        temp_error.push(val);
      }
      error_in_layer.push(temp_error);
    }
    
    
    
    
    
    
    
    
    let convalflip=[];
    
    
    for (let i = 0; i<convoluted_value.length; i++)
    {
      convalflip.push([]);
      for (let j = 0; j < convoluted_value[i].length; j++)
      {
        let conflip=this.flip(convoluted_value[i][j]);
    
        convalflip[i].push(conflip);
        
     //   Synaptic_Matrix.print(this.filters[i][j]);
   //     console.error("*******");
    //    Synaptic_Matrix.print(filters_transposed[i][j]);
        
      }
    }




   let delta_frames=[];
   
  for(let i=error_in_layer.length;i>0;i++)
  { let temp_delta=[]
    for(let j=0;j<error_in_layer[i].length;j++)
      {
        let val=this.complete_convolution(error_in_layer[i][j],filters_transposed[filters_transposed.length-i][j]);
        temp_delta.push(val);
      }
      delta_frames.push(temp_delta);
    }
    
    console.log(temp_delta.length);
    
    
    
  }
  
  
  
  
  
  /**/
  train(inputs)
  {
    let sml = new Synaptic_Multi_Layer(16,3,[8,4,2,4]);
    
    let convoluted_data=this.convolution(inputs);
    
    
    let feedforward_cnn=sml.feedforward(convoluted_data);
    
    //Synaptic_Matrix.print(feedforward_cnn[2]);
    
    
   // console.table(feedforward_cnn);
    
    
  
    
    /**/
    
  }
  
  
  
  
  
}




/****Dense layer section******/


class Synaptic_Dense_Layer{
  
 constructor(input_nodes,output_nodes,hidden_nodes_array)
{
  
  this.input_nodes=input_nodes;
  this.output_nodes=output_nodes;
  
  
  this.hidden_nodes=new Array(hidden_nodes_array.length);
  
  for(let i=0;i<hidden_nodes_array.length;i++)
  {
    this.hidden_nodes[i]=hidden_nodes_array[i];
  }
  
  
  this.weighted_hidden_layer=new Array(hidden_nodes_array.length+1);
  
  var input=input_nodes;
  var hidden;
  
  for(let k=0;k<=hidden_nodes_array.length;k++)
  { 
    if(k===hidden_nodes_array.length)
    {
      hidden=this.output_nodes;
    }
    else
    {
      hidden=this.hidden_nodes[k];
    }
    
     let weighted_edges=new Synaptic_Matrix(hidden,input);
    
     weighted_edges.randomize();
    
     this.weighted_hidden_layer[k]=weighted_edges;
    
    input=hidden;
    
   // console.warn(this.weighted_hidden_layer.length);
    
    //Synaptic_Matrix.print(this.weighted_hidden_layer[k]);
  }
  
  
  
  this.layered_bias=new Array(hidden_nodes_array.length+1);
  
  let bias_hidden;
  
  for(let k=0;k<=hidden_nodes_array.length;k++)
  { 
    if(k===hidden_nodes_array.length)
    {
      bias_hidden=this.output_nodes;
    }
    else
    {
      bias_hidden=this.hidden_nodes[k];
   //   console.log(bias_hidden);
    }
    
    let bias=new Synaptic_Matrix(bias_hidden,1);
    
    bias.randomize();
   
    
    this.layered_bias[k]=bias;
    
    
 //   Synaptic_Matrix.print(this.layered_bias[k]);
  }
  
  this.learning_rate=0.1;
 
  
}



//feedforwrad algorithm for multilayer


feedforward(input_array)
{
  
  let inputs=Synaptic_Matrix.fromArray(input_array);
//  Synaptic_Matrix.print(inputs);
  
  let layered_weighted_sum=new Array(this.hidden_nodes.length+1);
  
  let input=inputs;
  let hidden;
  let front_layer;
  
  for(let i=0;i<layered_weighted_sum.length;i++)
  {
    
    front_layer=this.weighted_hidden_layer[i];
    
  //  Synaptic_Matrix.print(front_layer);
    
    let weighted_sum=front_layer.multiplication(input);
    
   // Synaptic_Matrix.print(weighted_sum);
    
    
    weighted_sum.addition(this.layered_bias[i]);
    weighted_sum.map(Activation.sigmoid)
    

    layered_weighted_sum[i]=weighted_sum;
    
    input=layered_weighted_sum[i];
    
  //  Synaptic_Matrix.print(layered_weighted_sum[i]);
  
  }
  
  for(let i=0;i<layered_weighted_sum.length;i++)
  {
   // Synaptic_Matrix.print(layered_weighted_sum[i]);
    
    layered_weighted_sum[i]=Synaptic_Matrix.toArray(layered_weighted_sum[i]);
    
   // console.log(layered_weighted_sum[i]);
  }
  //console.table(layered_weighted_sum);
  
  return layered_weighted_sum;
  

  
  
}




train(input_array,answer_array)
{
  
  let input=Synaptic_Matrix.fromArray(input_array);
  
  let inputs_transposed=Synaptic_Matrix.transpose(input);
  
  
  let right_output=Synaptic_Matrix.fromArray(answer_array);
  
  //Synaptic_Matrix.print(right_output);
  
  
  
  let feedforward=this.feedforward(input_array);
  
 // console.table(feedforward);
  for (let i = 0; i < feedforward.length; i++)
  {
   feedforward[i] = Synaptic_Matrix.fromArray(feedforward[i]);
   
   
  // Synaptic_Matrix.print(feedforward[i]);
  }
  
  
  let weighted_hidden_layer_transposed=new Array(this.weighted_hidden_layer.length);
  
  for(let i=0;i<this.weighted_hidden_layer.length;i++)
  {
    weighted_hidden_layer_transposed[i]=Synaptic_Matrix.transpose(this.weighted_hidden_layer[i]);
    
   // Synaptic_Matrix.print(weighted_hidden_layer_transposed[i]);
    
  }
  
  let feedforward_transposed=new Array(feedforward.length);
  
  for (let i = 0; i < feedforward.length; i++)
  {
    feedforward_transposed[i] = Synaptic_Matrix.transpose(feedforward[i]);
  
    // Synaptic_Matrix.print(feedforward_transposed[i]);
  
  }
  
 
 
  let arbitrary_output=feedforward[feedforward.length-1];
// console.log(arbitrary_output);
 //arbitrary_output=Synaptic_Matrix.fromArray(arbitrary_output);
 
 
 let error_in_output=Synaptic_Matrix.subtraction(right_output,arbitrary_output);

/*
 if(arbitrary_output instanceof(Synaptic_Matrix))
 {
   console.warn("hii")
 }
 else
 {
   console.log("bye")
 }*/
//Synaptic_Matrix.print(error_in_output);
//Synaptic_Matrix.print(error_in_output);
 
 
  
 var layered_errors=new Array(this.hidden_nodes.length+2);
 
 //console.log(layered_errors.length);
 
  
  layered_errors[this.hidden_nodes.length+1]=error_in_output;
  
  
  //Synaptic_Matrix.print(layered_errors[layered_errors.length-1]);
  
  
  
  let error=error_in_output;
  
 // Synaptic_Matrix.print(error);
  
  for(let i=this.hidden_nodes.length;i>=0;i--)
  {
  //  Synaptic_Matrix.print(weighted_hidden_layer_transposed[i]);
   
   let layer_erorr=weighted_hidden_layer_transposed[i].multiplication(error);
   
   //Synaptic_Matrix.print(layer_erorr);
    
    layered_errors[i]=layer_erorr;
    
    error=layered_errors[i];
    
// Synaptic_Matrix.print(layered_errors[i]);
  }
  
  
  
  
  
  //gradient part
  
  let layered_gradient=new Array(layered_errors.length);
  
  let delta_weights=new Array(layered_errors.length-1);
  
  for(let i=this.hidden_nodes.length;i>=0;i--)
  {
    
    layered_gradient[i]=Synaptic_Matrix.map(feedforward[i],Activation_Derevative.derevative_sigmoid);
    
   // Synaptic_Matrix.print(layered_gradient[i]);
    
    layered_gradient[i].multiplication(this.learning_rate);
    
  // Synaptic_Matrix.print(layered_errors[i]);
    if(i===this.hidden_nodes.length)
    {
    layered_gradient[i]=Synaptic_Matrix.multiplicationElementwise(layered_gradient[i],layered_errors[i-1]);
    }
    else
    {
          layered_gradient[i]=Synaptic_Matrix.multiplicationElementwise(layered_gradient[i],layered_errors[i]);
    }
  //  Synaptic_Matrix.print(layered_gradient[i]);
    
    this.layered_bias[i].addition(layered_gradient[i]);
    
  //Synaptic_Matrix.print(this.layered_gradient[i]);
  //Synaptic_Matrix.print(inputs_transposed);
    
    
    if(i===0)
    {
      delta_weights[i]=layered_gradient[i].multiplication(inputs_transposed);
    }
    else
    {
    delta_weights[i]=layered_gradient[i].multiplication(feedforward_transposed[i-1]);
    }
  
  //Synaptic_Matrix.print(delta_weights[i]);
    //this.weighted_hidden_layer[i]);
 
  
  this.weighted_hidden_layer[i] = Synaptic_Matrix.addition(this.weighted_hidden_layer[i],delta_weights[i]);
    
    
  // Synaptic_Matrix.print(this.weighted_hidden_layer[i]);
  //console.log(layered_errors.length);
    return layered_errors;
  }
  
 /* 
  */
  
  
}






}