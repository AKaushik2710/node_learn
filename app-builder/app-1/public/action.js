const display = document.getElementById('display');
const addbtn = document.getElementById('add');
const name = document.getElementById('name');
const task = document.getElementById('task');
// const axios = require('axios');

function adder(){
    addbtn.addEventListener('click', async()=>{
        try{
            const setInfo = await axios.post('http://localhost:3000/api',{
                name : name.value,
                task : task.value
            })
            // console.log(setInfo.data)
        }
        catch(err){
            console.log(err);
        }
    })
}

adder();