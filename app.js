const nameInput = document.querySelector('#inputName');
const emailInput = document.querySelector('#inputEmail');
const fileInput = document.querySelector('#inputFile');
const saveBtn = document.querySelector('#saveBtn');
const searchInput = document.querySelector('#searchInput');
const counter = document.querySelector('#counter');
const tbody = document.querySelector('#tbody');
let students = [];
let editIndex = -1;
let currentImage = null; // ✅ Store current image when editing

function displayStudent(stu = students){
    tbody.innerHTML = '';
    if(stu.length == 0){
        tbody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <span class="text-secondary">No Student Found</span>
            </td>
        </tr>`;
    }

    stu.forEach((student, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.email}</td>
            <td><img style="width: 2.5rem; height: 2.5rem;" class="rounded-circle object-fit-cover" src="${student.img}" alt=""></td>
            <td class="d-flex py-3 justify-content-center">
                <span onclick="viewStu(${index})" data-bs-toggle="modal" data-bs-target="#view" class="btn btn-primary d-flex justify-content-center align-items-center mx-1">View</span>
                <span onclick="editStu(${index})" class="btn btn-warning d-flex justify-content-center align-items-center mx-1">Edit</span>
                <span onclick="deleteStu(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger d-flex justify-content-center align-items-center mx-1">Delete</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateCounter(stu = students){
    counter.innerHTML = `
    <svg
xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor"
class="bi bi-people me-1" viewBox="0 0 16 16">
<path
d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312
10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11
7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0
0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92
10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2
2 0 1 0 0 4 2 2 0 0 0 0-4" />
    </svg> ${stu.length}
    `;
}

updateCounter(students);
displayStudent(students);

function saveStudent(){
    let name = nameInput.value;
    let email = emailInput.value;
    let file = fileInput.files[0];
    let id = students.length;
    let gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!name || !email || (!file && editIndex === -1) || !gender) {
        alert('Please fill all the fields');
        return;
    }

    let student = {
        id: id + 1,
        name: name,
        email: email,
        gender: gender
    };

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e){
            student.img = e.target.result;
            finalSave(student, id);
        };
        reader.readAsDataURL(file);
    } else {
        // ✅ Use old image if no new file selected
        student.img = currentImage;
        finalSave(student, id);
    }
}

function finalSave(student, oldId){
    if(editIndex === -1){
        students.push(student);
    } else {
        student.id = oldId;
        students[editIndex] = student;
        editIndex = -1;
        saveBtn.textContent = "Save Changes";
    }

    currentImage = null; // ✅ Clear old image
    document.querySelector('form').reset();
    document.querySelector('#exampleModal').querySelector('.btn-close').click();
    displayStudent(students);
    updateCounter(students);
}

saveBtn.addEventListener('click', saveStudent);

function viewStu(index){
    let stu = students[index];
    let view = document.querySelector('#Tbview');
    view.innerHTML = `
        <tr><td class="text-start"><h6>ID</h6></td><td><h6>: ${stu.id}</h6></td></tr>
        <tr><td class="text-start"><h6>Name</h6></td><td><h6>: ${stu.name}</h6></td></tr>
        <tr><td class="text-start"><h6>Gender</h6></td><td><h6>: ${stu.gender}</h6></td></tr>
        <tr><td class="text-start"><h6>Email</h6></td><td><h6>: ${stu.email}</h6></td></tr>
    `;
    let con = document.querySelector('#con');
    con.innerHTML = `<img style="width: 8rem; height: 8rem; padding: 1px;" class="rounded-circle object-fit-cover border" src="${stu.img}" alt="">`;
}

function editStu(index){
    editIndex = index;
    let obj = students[editIndex];
    nameInput.value = obj.name;
    emailInput.value = obj.email;
    currentImage = obj.img; 

    if(obj.gender === 'Male'){
        document.querySelector('#male').checked = true;
    } else if(obj.gender === 'Female'){
        document.querySelector('#female').checked = true;
    } else {
        document.querySelector('#other').checked = true;
    }

    fileInput.value = ''; // Clear file input
    document.querySelector('#addBtn').click();
    saveBtn.textContent = 'Update';
}

function deleteStu(index){
    let stu = students[index];
    document.querySelector('#nameHead').innerHTML = 
    `
    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete ${stu.name}'s Information</h1>
    `;
    document.querySelector('#btnDelete').addEventListener('click',function(){
        document.querySelector('#closeBtn').click();
        students.splice(index, 1);
        updateCounter(students);
        displayStudent(students);
    })
};
searchInput.addEventListener('input',function(){
    let searchterm = searchInput.value.toLowerCase().trim();
    if(searchterm === ''){
        displayStudent(students);
        return;
    }
    let newArrStudent = students.filter(st=>
        st.name.toLowerCase().includes(searchterm)
);
displayStudent(newArrStudent);
});