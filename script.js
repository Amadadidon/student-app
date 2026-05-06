const SUPABASE_URL = "YOUR_URL";
const SUPABASE_KEY = "YOUR_KEY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let loggedIn = false;

// LOGIN
async function login() {
    const pass = document.getElementById("password").value;

    let { data } = await supabase
        .from('admin')
        .select('*')
        .eq('password', pass);

    if (data.length > 0) {
        loggedIn = true;
        document.getElementById("dashboard").style.display = "block";
        alert("Welcome Admin");
    } else {
        alert("Wrong password");
    }
}

// LOAD CLASS
async function loadClass(cls) {
    let { data } = await supabase
        .from('students')
        .select('*')
        .eq('class', cls);

    const div = document.getElementById("students");
    div.innerHTML = `<h3>${cls}</h3>`;

    data.forEach(s => {
        div.innerHTML += `
            <div>
                <input value="${s.name}" id="name-${s.id}">
                <input value="${s.marks}" id="marks-${s.id}">
                <button onclick="update(${s.id})">Save</button>
            </div>
        `;
    });
}

// UPDATE STUDENT
async function update(id) {
    const name = document.getElementById("name-" + id).value;
    const marks = document.getElementById("marks-" + id).value;

    await supabase
        .from('students')
        .update({ name, marks })
        .eq('id', id);

    alert("Updated");
}
