const key = 'students';

const demo = [
    { id: '1', name: 'Иванов Иван Иванович', group: 'P3210', isu: '345678', dorm: '7', room: '412', date: '2026-09-01', foreign: false, notes: 'Староста группы' },
    { id: '2', name: 'Петрова Анна Сергеевна', group: 'P3208', isu: '345679', dorm: '8', room: '215', date: '2026-08-28', foreign: false, notes: 'Участвует в студенческих мероприятиях' },
    { id: '3', name: 'Ким Алексей Андреевич', group: 'P3211', isu: '345680', dorm: '7', room: '318', date: '2026-09-03', foreign: true, notes: 'Иностранный студент' },
    { id: '4', name: 'Смирнова Мария Олеговна', group: 'P3209', isu: '345681', dorm: '9', room: '124', date: '2026-09-05', foreign: false, notes: '' },
    { id: '5', name: 'Соколов Дмитрий Павлович', group: 'P3210', isu: '345682', dorm: '8', room: '406', date: '2026-08-30', foreign: false, notes: 'Попросил переселение в другую комнату' }
];

if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify(demo));
}

function getStudents() {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveStudents(list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function getStudent(id) {
    return getStudents().find(s => s.id === id);
}

function addStudent(student) {
    const list = getStudents();
    student.id = Date.now().toString() + Math.random().toString(16).slice(2);
    list.push(student);
    saveStudents(list);
}

function editStudent(id, student) {
    const list = getStudents();
    const i = list.findIndex(s => s.id === id);
    if (i === -1) return;
    list[i] = { ...student, id };
    saveStudents(list);
}

function deleteStudent(id) {
    saveStudents(getStudents().filter(s => s.id !== id));
}
