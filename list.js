const list = document.getElementById('list');

function showList() {
    list.innerHTML = '';
    const students = getStudents();
    if (students.length === 0) {
        const row = list.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = 'Студентов пока нет';
        return;
    }
    students.forEach(s => {
        const row = list.insertRow();
        [s.name, s.group, s.isu, s.dorm].forEach(value => {
            row.insertCell().textContent = value;
        });
        const cell = row.insertCell();
        const actions = document.createElement('div');
        actions.className = 'actions';
        const view = document.createElement('a');
        view.className = 'btn';
        view.href = 'student.html?id=' + encodeURIComponent(s.id);
        view.textContent = 'Открыть';
        const edit = document.createElement('a');
        edit.className = 'btn gray';
        edit.href = 'form.html?id=' + encodeURIComponent(s.id);
        edit.textContent = 'Изменить';
        const del = document.createElement('button');
        del.className = 'del';
        del.textContent = 'Удалить';
        del.onclick = () => {
            if (confirm('Удалить студента?')) {
                deleteStudent(s.id);
                showList();
            }
        };
        actions.append(view, edit, del);
        cell.append(actions);
    });
}
showList();
