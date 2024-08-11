let toggleTheme = document.querySelector(".toggle-theme");
let tbody = document.querySelector("#tbody");
let textBox = document.querySelector("#textBox");
let addBtn = document.querySelector("#addBtn");
let tasks = [
    { text: "Wake up at 6:30 AM.", completed: false },
    { text: "Check emails", completed: false },
    { text: "Code Review", completed: false }
];

// Fonction pour lister toutes les tâches sur la page
function listAllTasks() {
    tbody.innerHTML = "";
    const isNightMode = document.querySelector(".table").classList.contains("night");

    tasks.forEach(function(task, index) {
        const tr = document.createElement('tr');
        tr.setAttribute('id', 'task-' + index);
        tr.innerHTML = `
        <td class="tdata"> <input type="checkbox" id="checkbox-${index}" ${task.completed ? 'checked' : ''}> </td>
        <td class="tdata">${task.text}</td>
        <td class="tdata">
            <p class="status ${task.completed ? 'completed' : 'in-progress'}" id="status-${index}">${task.completed ? 'Completed' : 'In progress'}</p>
        </td>
        <td class="tdata"> 
            <i class="fa-solid fa-square-xmark del" onClick="removeTask(${index})"></i>
        </td>
        `;

        // Ajout de la classe "night" si le mode nuit est activé
        if (isNightMode) {
            tr.querySelectorAll("td").forEach(function(td) {
                td.classList.add("night");
            });
        }

        tbody.appendChild(tr);

        // Ajout de l'événement de changement pour le checkbox
        document.getElementById(`checkbox-${index}`).addEventListener('change', function(event) {
            const checkbox = event.target;
            const statusText = document.getElementById(`status-${index}`);
            task.completed = checkbox.checked;

            if (task.completed) {
                statusText.textContent = 'Completed';
                statusText.classList.remove('in-progress');
                statusText.classList.add('completed');
            } else {
                statusText.textContent = 'In progress';
                statusText.classList.remove('completed');
                statusText.classList.add('in-progress');
            }
        });
    });
}
listAllTasks();

// Ajouter une tâche
addBtn.addEventListener("click", function () {
    const newTask = textBox.value.trim();
    if (newTask) {
        tasks.push({ text: newTask, completed: false });
        listAllTasks();
        textBox.value = ''; 
    } else {
        alert("Please enter a task.");
    }
});

// Fonction pour supprimer une tâche
function removeTask(index) {
    tasks.splice(index, 1);
    listAllTasks();
}

// Fonction pour basculer le thème
toggleTheme.addEventListener("click", function() {
    document.querySelector(".sun").style.display = 
        document.querySelector(".sun").style.display === "none" ? "block" : "none";
    document.querySelector(".moon").style.display = 
        document.querySelector(".moon").style.display === "none" ? "block" : "none";

    document.querySelector(".table").classList.toggle("night");
    document.querySelector(".table__header").classList.toggle("night");

    document.querySelectorAll(".theader, .tdata").forEach(function(element) {
        element.classList.toggle("night");
    });
});
