// Lấy phần tử có ID là "root"
// BÀI 1
var rootElement = document.getElementById("root");
if (rootElement) {
    // Đặt nội dung innerHTML vào đoạn văn bản <h1>Xin chào Rikkei</h1>
    rootElement.innerHTML = "<h1>Xin chào Rikkei</h1>";
}
else {
    console.error("Không tìm thấy phần tử có ID là 'root'");
}
// Bài 2
// Định nghĩa enum sex
var Sex;
(function (Sex) {
    Sex["MALE"] = "Nam";
    Sex["FEMALE"] = "N\u1EEF";
})(Sex || (Sex = {}));
// Dữ liệu danh sách sinh viên (ví dụ)
var students = [
    { name: "John", age: 20, sex: Sex.MALE },
    { name: "Alice", age: 22, sex: Sex.FEMALE },
    { name: "Bob", age: 21, sex: Sex.MALE },
];
// Hàm tạo bảng từ danh sách sinh viên
function createTable(students) {
    var tableContainer = document.getElementById("table-container");
    if (tableContainer) {
        var table = document.createElement("table");
        table.classList.add("student-table");
        // Tiêu đề bảng
        var thead = document.createElement("thead");
        var trHead = document.createElement("tr");
        trHead.innerHTML = "<th>Name</th><th>Age</th><th>Sex</th>";
        thead.appendChild(trHead);
        table.appendChild(thead);
        // Dữ liệu sinh viên
        var tbody = document.createElement("tbody");
        for (var _i = 0, students_1 = students; _i < students_1.length; _i++) {
            var student = students_1[_i];
            var trBody = document.createElement("tr");
            trBody.innerHTML = "<td>".concat(student.name, "</td><td>").concat(student.age, "</td><td>").concat(student.sex, "</td>");
            tbody.appendChild(trBody);
        }
        table.appendChild(tbody);
        // Thêm bảng vào div container
        tableContainer.appendChild(table);
    }
}
// Gọi hàm tạo bảng
createTable(students);
// Xử lý form thêm mới sinh viên
var form = document.getElementById("new-student-form");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var nameInput = document.getElementById("name");
        var ageInput = document.getElementById("age");
        var sexInput = document.getElementById("sex");
        var name = nameInput.value;
        var age = parseInt(ageInput.value);
        var sex = Sex[sexInput.value];
        var newStudent = { name: name, age: age, sex: sex };
        students.push(newStudent);
        var table = document.querySelector(".student-table");
        var tbody = table.querySelector("tbody");
        var trBody = document.createElement("tr");
        trBody.innerHTML = "<td>".concat(newStudent.name, "</td><td>").concat(newStudent.age, "</td><td>").concat(newStudent.sex, "</td>");
        tbody.appendChild(trBody);
        // Reset form
        form.reset();
    });
}
// Bài 3
// Xử lý form cập nhật sinh viên
var updateForm = document.getElementById("update-student-form");
if (updateForm) {
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var nameInput = document.getElementById("update-name");
        var ageInput = document.getElementById("update-age");
        var sexInput = document.getElementById("update-sex");
        var name = nameInput.value;
        var age = parseInt(ageInput.value);
        var sex = Sex[sexInput.value];
        // Tìm và cập nhật thông tin sinh viên trong mảng students
        var selectedStudentIndex = students.findIndex(function (student) { return student.name === name; });
        if (selectedStudentIndex !== -1) {
            students[selectedStudentIndex].age = age;
            students[selectedStudentIndex].sex = sex;
            // Cập nhật lại bảng sau khi cập nhật sinh viên
            createTable(students);
        }
        // Reset form
        updateForm.reset();
    });
}
// Tính năng sắp xếp bảng theo từng cột khi click vào tiêu đề cột
function enableSorting() {
    var tableHead = document.querySelectorAll(".student-table th.sortable");
    tableHead.forEach(function (th) {
        th.addEventListener("click", function () {
            var column = th.innerHTML.toLowerCase();
            students.sort(function (a, b) {
                if (a[column] < b[column])
                    return -1;
                if (a[column] > b[column])
                    return 1;
                return 0;
            });
            // Đảo ngược dữ liệu nếu cùng một giá trị (sắp xếp tăng dần - giảm dần)
            if (th.classList.contains("ascending")) {
                students.reverse();
                th.classList.remove("ascending");
            }
            else {
                th.classList.add("ascending");
            }
            createTable(students);
        });
    });
}
// Gọi hàm enableSorting để kích hoạt tính năng sắp xếp
enableSorting();
