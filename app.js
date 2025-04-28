const nameInput = document.querySelector('#inputName');
const emailInput = document.querySelector('#inputEmail');
const fileInput = document.querySelector('#inputFile');
const saveBtn = document.querySelector('#saveBtn');
const searchInput = document.querySelector('#searchInput');
const counter = document.querySelector('#counter');
const tbody = document.querySelector('#tbody');

let students = [];
let editIndex = -1;

function displayStudent(stu = students){
    tbody.innerHTML = '';
    if(stu.length == 0){
        tbody.innerHTML = `
        <tr>
                    <td colspan="6" class="text-center">
                        <span class="text-secondary">No Student Found</span>
                    </td>
                </tr>
        `;
    }else{
        stu.forEach((student,index)=>{
            let row = document.createElement('tr');
            row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.gender}</td>
                    <td>${student.email}</td>
                    <td><img style="width: 2.5rem; height: 2.5rem;" class="rounded-circle object-fit-cover" src="${student.img}" alt=""></td>
                    <td class="d-flex py-3 justify-content-center">
                        <span onclick="viewStu(${index})" data-bs-toggle="modal" data-bs-target="#view" class="btn btn-primary d-flex justify-content-center align-items-center mx-1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi me-1 bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg> View</span>
                        <span onclick="editStu(${index})" class="btn btn-warning d-flex justify-content-center align-items-center mx-1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi me-1 bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg> Edit</span>
                        <span onclick="deleteStu(${index})" class="btn btn-danger d-flex justify-content-center align-items-center mx-1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi me-1 bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg> Delete</span>
                    </td>
            `;
            tbody.appendChild(row);
        });
    }
}
function updateCounter(stu=students){
    counter.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people me-1" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                  </svg> ${stu.length}
    `;
}
    updateCounter(students);
    displayStudent(students);
function saveStudent(){
    let name = nameInput.value;
    let email = emailInput.value;
    let file = fileInput.files[0];
    let id = students.length + 1;
    let gender = document.querySelector('input[name="gender"]:checked')?.value;
    if(!name || !email || !file || !gender){
        alert('Please fill all the fields');
        return;
    }
    let student = {
        id: id,
        name: name,
        email: email,
        gender:gender
    }
    if(file){
        let reader = new FileReader();
        reader.onload = function(e){
            let img = e.target.result;
            student.img=img;
            finalSave(student);
    }
    reader.readAsDataURL(file);
    }
}
function finalSave(student){
    if(editIndex === -1){
        students.push(student);
    }else{
        students[editIndex]=student;
        editIndex = -1;
        saveBtn.textContent = "Save Changes";
    }
    document.querySelector('form').reset();
    document.querySelector('#exampleModal').querySelector('.btn-close').click();
    displayStudent(students);
    updateCounter(students);
}
saveBtn.addEventListener('click',saveStudent);
function viewStu(index){
    let stu = students[index];
    let view = document.querySelector('#Tbview');
    view.innerHTML=`<tr>
                                            <td class="text-start"><h6>ID</h6></td>
                                            <td><h6>: ${stu.id}</h6></td>
                                        </tr>
                                        <tr>
                                            <td class="text-start"><h6>Name</h6></td>
                                            <td><h6>: ${stu.name}</h6></td>
                                        </tr>
                                        <tr>
                                            <td class="text-start"><h6>Gender</h6></td>
                                            <td><h6>: ${stu.gender}</h6></td>
                                        </tr>
                                        <tr>
                                            <td class="text-start"><h6>Email</h6></td>
                                            <td><h6>: ${stu.email}</h6></td>
                                        </tr>`;
    let con = document.querySelector('#con');
    con.innerHTML = `
    <img style="width: 8rem; height: 8rem;" class="rounded-circle object-fit-cover" src="${stu.img}" alt="">
    `;
}