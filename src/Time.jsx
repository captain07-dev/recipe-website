import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from 'axios';

const Time =()=>
{
    
    const [newState,setNewState]=useState('SHOW');



    const Press =(index)=>
    {
        if(newState==='SHOW')
        setNewState('HIDE');

        else
        setNewState('SHOW');
        const tempRecipe=[...disRecipe];
        tempRecipe[index].visible=!tempRecipe[index].visible;
        setDisRecipe(tempRecipe);
        
    };

    const [val,setVal]=useState('');

    const [disRecipe,setDisRecipe]=useState([]); 

    const inputOne =(event)=>
    {
        const abc=event.target.value;
        setVal(abc);
    };


    const search =()=>
    {
        var recipeArr=[];
        
        const appId='65f88d06';
        const appKey='c5f6d769591d3eee23cf9c722e47a887';

        axios.get(`https://api.edamam.com/search?q=${val}&app_id=${appId}&app_key=${appKey}`)
        .then((response)=>
        {
            
            const oldarr=response.data.hits;

            console.log(oldarr);

             oldarr.map((cval)=>
           {

                const imgi=cval.recipe.image;
                const recipe=cval.recipe.ingredientLines;
                const label=cval.recipe.label;

                const obj={
                    visible:false,
                    images:imgi,
                    recipee:recipe,
                    Name:label,
                }

                recipeArr.push(obj);

           }); 
        //   console.log(recipeArr);
           setDisRecipe(recipeArr);

        });
    
    };


    return(<>
        <h1 style={{color:'#ffcc99'}} className='text-center mt-5' >Welcome to the Food Recipe App</h1>
        
        <div className="container">
    <div className="row">
        <div className="main">

            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Any Food Item Recipe..." onChange={inputOne} />
                <div className="input-group-append">
                    <button type="button" className="btn btn-primary" onClick={search}>Search
                    </button>
                </div>
            </div>
            

            </div>
    </div>
</div>



        {
            disRecipe.map((eve,index)=>
            {
                return(

                    <div className="card" style={{width: '18rem'}}>
  <img className="card-img-top" src={eve.images} />
  <div className="card-body">
  
    <h5 className="card-title">{eve.Name}
    </h5>

    <button onClick={()=>Press(index)}>{newState}</button>

      { eve.visible?  <p className="card-text">{eve.recipee.map((even)=> {return(<ul><li>{even}</li></ul>)})}</p> : null }

 

    
  </div>
</div> 
                )
            })
        }

 
        </>
    )
};
export default Time;