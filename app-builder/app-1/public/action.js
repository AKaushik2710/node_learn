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
            displayed()
            // console.log(setInfo.data)
        }
        catch(err){
            console.log(err);
        }
    })
}

adder();

const displayed = async()=>{
    const response = await axios.get('http://localhost:3000/api');
    // const response = data.json();
    const data = response.data;
    display.innerHTML = data.map(d =>{
        return `<p id=${d._id}>${d.name}</p>`
    });
    console.log( data.data);

}
