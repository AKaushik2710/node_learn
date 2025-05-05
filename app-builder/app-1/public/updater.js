const display = document.getElementById('display');
const nameField = document.getElementById('name');
const taskField = document.getElementById('task');

// Use event delegation to handle clicks on <p> elements
display.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') { // Check if the clicked element is a <p> tag
        try {
            // Split the text content into name and task
            const [name, task] = e.target.textContent.split(':');
            nameField.value = name.trim(); // Set the name field
            taskField.value = task.trim(); // Set the task field
        } catch (err) {
            console.log(err);
        }
    }
});