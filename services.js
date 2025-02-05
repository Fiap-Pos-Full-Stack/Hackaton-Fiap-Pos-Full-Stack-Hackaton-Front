const ULR = "http://localhost:4000"

async function doLogin(user, pass) {
    try {
        const url = ULR + "/login"
        const response = await fetch("http://localhost:4000/login",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({username: user, password: pass})
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        localStorage.setItem('TOKEN_AUTH', json.token);
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function getStudentInfo() {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/student/quiz",{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}
async function getContentById(id) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/contents/" + id,{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function responseQuiz(quizId, responseId) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/quiz/"+ quizId,{
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "PUT",
              body: JSON.stringify({markedOption: responseId+1})          
        }
        )
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function getRanking(classId) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/classroom/quiz/ranking/" + classId,{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}
async function getTeacherClass() {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/classroom/teacher" ,{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}
async function getStudents() {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/student" ,{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}
async function createClassroom(name, students) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/classroom",{
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({name: name, students:students})          
        }
        )
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function createTeacher(teacher) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/teacher",{
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(teacher)          
        }
        )
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function createStudent(student) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/student",{
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(student)          
        }
        )
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}


async function createContent(content) {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/contents",{
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(content)          
        }
        )
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}


async function getContentsByTeacher() {
    try {
        const token = localStorage.getItem('TOKEN_AUTH');
        const response = await fetch("http://localhost:4000/contents/teacher",{
            headers: {Authorization: 'Bearer ' + token}})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json
    } catch (error) {
        console.error(error.message);
    }
}
