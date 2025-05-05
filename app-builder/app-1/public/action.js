const display = document.getElementById('display');
const addbtn = document.getElementById('add');
const name = document.getElementById('name');
const task = document.getElementById('task');
// const axios = require('axios');


// dels.forEach(del=> del.addEventListener('click', deleter))
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
        return `<p id=${d._id}>${d.name} <span class="deleter">del</span></p>`
    }).join('');
    const deleteButtons = document.querySelectorAll('.deleter');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleter);
        });
    console.log( data.data);

}

displayed()


const deleter = async(e)=>{
    try{
    const id = e.target.parentElement.id;
    const data = await axios.delete(`http://localhost:3000/api/${id}`);
    console.log(data);
    displayed();
    }
    catch(err){
        console.log(err)
    }
}