const id = new URLSearchParams(location.search).get('id');
const form = document.getElementById('form');
const error = document.getElementById('error');
const fields = ['name', 'group', 'isu', 'dorm', 'room', 'date', 'notes'];

if (id) {
    const student = getStudent(id);
    if (!student) {
        alert('Студент не найден');
        location.href = 'index.html';
    } else {
        document.getElementById('title').textContent = 'Редактирование студента';
        fields.forEach(field => document.getElementById(field).value = student[field]);
        document.getElementById('foreign').checked = student.foreign;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    error.textContent = '';
    const student = {};
    fields.forEach(field => student[field] = document.getElementById(field).value.trim());
    student.foreign = document.getElementById('foreign').checked;

    if (!/^[\p{L}\s'-]+$/u.test(student.name) || student.name.split(/\s+/).length < 2) {
        error.textContent = 'Введите ФИО: минимум фамилию и имя, только буквы';
        return;
    }
    if (!Number.isSafeInteger(Number(student.isu)) || Number(student.isu) <= 0 ||
        !Number.isSafeInteger(Number(student.dorm)) || Number(student.dorm) <= 0) {
        error.textContent = 'ИСУ ID и номер общежития должны быть положительными целыми числами';
        return;
    }
    const duplicate = getStudents().some(s => s.isu === student.isu && s.id !== id);
    if (duplicate) {
        error.textContent = 'Студент с таким ИСУ ID уже есть';
        return;
    }
    if (id) editStudent(id, student);
    else addStudent(student);
    location.href = 'index.html';
});
