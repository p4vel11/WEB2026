const id = new URLSearchParams(location.search).get('id');
const student = getStudent(id);
const details = document.getElementById('details');

if (!student) {
    details.textContent = 'Студент не найден';
    document.getElementById('edit').style.display = 'none';
} else {
    const info = [
        ['ФИО', student.name],
        ['Группа', student.group],
        ['ИСУ ID', student.isu],
        ['Номер общежития', student.dorm],
        ['Комната', student.room],
        ['Срок заселения до', student.date],
        ['Иностранный студент', student.foreign ? 'Да' : 'Нет'],
        ['Заметки', student.notes || 'Нет']
    ];
    const block = document.createElement('div');
    block.className = 'info';
    info.forEach(([name, value]) => {
        const label = document.createElement('div');
        label.className = 'muted';
        label.textContent = name;
        const text = document.createElement('div');
        text.textContent = value;
        block.append(label, text);
    });
    details.append(block);
    document.getElementById('edit').href = 'form.html?id=' + encodeURIComponent(id);
}
