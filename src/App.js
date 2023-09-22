import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [isPlaying, setPlaying] = useState(false);
  const [gamemode, setGamemode] = useState(false);
  const [turn, setTurn] =  useState(false);
  const [matrix, setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]]);
  const [winner,setWinner] = useState('None');
  
  let currTurn=true;
  let comp=0;
  
  const resetGame = () => {
    currTurn = true;
    setMatrix([[0,0,0],[0,0,0],[0,0,0]]);
    setTurn(false);
    setWinner('None');
  }


  const verif = () => {

       let sum =0;
       let win = -2;
       matrix.forEach((row,key)=>
       {sum = 0;
         row.forEach((value,key2)=>
         {sum=sum+value;});
        // console.log('randul ' + key + ' ' + sum)  ;
          if(sum === 3) win = 1;
          if(sum === -3) win = -1;
        });
        for(let i = 0; i<3; i++)
        { sum = 0;
          for(let j = 0; j < 3 ; j++)
          {
              sum = sum + matrix[j][i];
          }
          if(sum === 3) win = 1;
          if(sum === -3) win = -1;
          //console.log('coloana ' + i + ' ' + sum+ ' ' + win +' ' + winner)  ;
        };
        sum = 0 ;
        for( let i = 0 ; i<3 ; i++)
          sum = sum + matrix[i][i];
        if(sum === 3) win = 1;
        if(sum === -3) win = -1;
        
        sum = 0 ;
        for( let i = 0 ; i<3 ; i++)
          sum = sum + matrix[i][2-i];
        if(sum === 3) win = 1;
        if(sum === -3) win = -1;
        
        if(win === 1) setWinner('X');
        if(win === -1) setWinner('O');

        sum = 0;
        for(let i = 0; i<3; i++)
        {
          for(let j = 0; j < 3 ; j++)
          {
              if(matrix[i][j] !== 0)
              sum = sum + 1;
          }
        };
        if(win === -2 && sum === 9) setWinner('Draw');
        //console.log(matrix[0][0].value);
  } 

  
 
  
  const makeMove = (r,c) => {
    
    if(winner !== 'None')return;
  
    setMatrix(matrix.map((row,key1)=>{
      return row.map(
        (val,key2) => 
        {if(r === key1 && c === key2)return turn?-1:1; return val;});
      }, setTurn(!turn), verif()));
      console.log('ok');
    
  }


  useEffect(()=>{verif();},[matrix]);

  //useEffect(()=>{ },[turn]);
  //<button className='w-2/3 py-3 bg-blue-500 text-white text-xl rounded-3xl border-gray-300 border-2 shadow-lg hover:bg-blue-600' 
  //onClick = { () => {setPlaying(true); setGamemode(true);comp=1;}}>Player vs Computer</button>

  return (
    <div className="App bg-blue-100">
        {
        (!isPlaying )  &&  
        <div className='h-screen flex items-center justify-center content-center flex-col gap-3'>
          <button className='w-2/3 py-3 bg-blue-500 text-white text-xl rounded-3xl border-gray-300 border-2 shadow-lg hover:bg-blue-600' 
          onClick = { () => {setPlaying(true); setGamemode(false);comp=0;}}>Player vs Player</button>
         </div>
        }
        {
          (isPlaying) &&
          <div className='h-screen flex justify-center items-center content-center'>
                <div className='bg-white w-96 h-[32rem] rounded-3xl border-4 backdrop-blur-sm shadow-lg flex-col gap-2 py-5 px-10'>
                  {(winner === 'None') &&<h1 className='text-3xl drop-shadow-md mb-10'>It's <span className='text-blue-500 font-bold'>{turn?'O' : 'X' }</span>'s turn</h1>}
                  {(winner === 'X') &&<h1 className='text-3xl drop-shadow-md mb-10'>Player <span className='text-blue-500 font-bold'>X</span>  won</h1>}
                  {(winner === 'O') &&<h1 className='text-3xl drop-shadow-md mb-10'>Player <span className='text-blue-500 font-bold'>O</span> won</h1>}
                  {(winner === 'Draw') &&<h1 className='text-3xl drop-shadow-md mb-10'>It's a <span className='text-blue-500 font-bold'>Draw</span></h1>}

                  <div className={`grid grid-rows-3 grid-cols-3 gap-x-0 grid-flow-rows-dense w-60 h-60 justify-items-center mx-auto`}>
                    {matrix.map((row,key1) =>{ 
                      //console.log(row);              
                       return <div className='justify-items-end '>
                      {row.map((elem,key2) => 
                      {if(elem !== 0)
                      return (<div 
                      className='border-2 border-blue-500 w-20 h-20 flex content-center justify-center items-center text-blue-800 font-bold text-3xl'>
                      <h1 >{elem === 1? 'X' : 'O'}</h1>
                      </div>);
                       return <div className='border-2 border-blue-500 w-20 h-20 hover:bg-blue-300'><button onClick={()=>{console.log(key1,key2); makeMove(key1,key2);}} className='h-full w-full'></button></div>;})
                      }  
                       </div>;
                    })}
                  </div>
                  <button className='mt-10 text-white  text-xl bg-blue-500 w-2/3 h-8 rounded-3xl hover:bg-blue-600' onClick={()=>{resetGame();}}>Reset</button>
                  <button className='mt-2 text-white  text-xl bg-blue-500 w-2/3 h-8 rounded-3xl hover:bg-blue-600' onClick={()=>{setPlaying(false); resetGame();}}>Back</button>  
                </div>
          </div>
        }
    </div>
  );
}

export default App;
