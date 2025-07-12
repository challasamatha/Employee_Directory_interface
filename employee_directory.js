let employees = [{
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@yourapp.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@yourapp.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@yourapp.com",
        department: "Finance",
        role: "Analyst"
    }
];

const employeeList = document.getElementById("employeeList");
const formModal = document.getElementById("formModal");
const form = document.getElementById("employeeForm");

function renderEmployees(data) {
    employeeList.innerHTML = "";
    data.forEach(emp => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit" onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        employeeList.appendChild(card);
    });
}

document.getElementById("addBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("formTitle").textContent = "Add Employee";
    document.getElementById("employeeId").value = "";
    formModal.classList.remove("hidden");
});

function closeForm() {
    formModal.classList.add("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("employeeId").value;
    const newEmp = {
        id: id ? parseInt(id) : Date.now(),
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        role: document.getElementById("role").value.trim(),
    };

    if (id) {
        const index = employees.findIndex(e => e.id === newEmp.id);
        employees[index] = newEmp;
    } else {
        employees.push(newEmp);
    }

    closeForm();
    renderEmployees(employees);
});

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== id);
        renderEmployees(employees);
    }
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    document.getElementById("formTitle").textContent = "Edit Employee";
    formModal.classList.remove("hidden");
}

document.getElementById("searchInput").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = employees.filter(e =>
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query)
    );
    renderEmployees(filtered);
});

renderEmployees(employees);