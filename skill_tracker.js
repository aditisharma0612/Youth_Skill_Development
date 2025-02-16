function addSkill() {
    let skillInput = document.getElementById("new-skill").value.trim();
    if (skillInput === "") return;
    
    let skillList = document.getElementById("skill-list");
    let listItem = document.createElement("li");
    listItem.textContent = skillInput;
    skillList.appendChild(listItem);

    document.getElementById("new-skill").value = "";
}
