// Lấy phần tử có ID là "root"
// BÀI 1
const rootElement = document.getElementById("root");

if (rootElement) {
  // Đặt nội dung innerHTML vào đoạn văn bản <h1>Xin chào Rikkei</h1>
  rootElement.innerHTML = "<h1>Xin chào Rikkei</h1>";
} else {
  console.error("Không tìm thấy phần tử có ID là 'root'");
}

// Bài 2
// Định nghĩa enum sex
enum Sex {
  MALE = "Nam",
  FEMALE = "Nữ",
}

// Định nghĩa interface student
interface Student {
  name: string;
  age: number;
  sex: Sex;
}

// Dữ liệu danh sách sinh viên (ví dụ)
let students: Student[] = [
  { name: "John", age: 20, sex: Sex.MALE },
  { name: "Alice", age: 22, sex: Sex.FEMALE },
  { name: "Bob", age: 21, sex: Sex.MALE },
];

// Hàm tạo bảng từ danh sách sinh viên
function createTable(students: Student[]): void {
  const tableContainer = document.getElementById("table-container");

  if (tableContainer) {
    const table = document.createElement("table");
    table.classList.add("student-table");

    // Tiêu đề bảng
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    trHead.innerHTML = `<th>Name</th><th>Age</th><th>Sex</th>`;
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Dữ liệu sinh viên
    const tbody = document.createElement("tbody");
    for (const student of students) {
      const trBody = document.createElement("tr");
      trBody.innerHTML = `<td>${student.name}</td><td>${student.age}</td><td>${student.sex}</td>`;
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
const form = document.getElementById("new-student-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const sexInput = document.getElementById("sex") as HTMLSelectElement;

    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const sex = Sex[sexInput.value];

    const newStudent: Student = { name, age, sex };
    students.push(newStudent);

    const table = document.querySelector(".student-table") as HTMLTableElement;
    const tbody = table.querySelector("tbody") as HTMLTableSectionElement;
    const trBody = document.createElement("tr");
    trBody.innerHTML = `<td>${newStudent.name}</td><td>${newStudent.age}</td><td>${newStudent.sex}</td>`;
    tbody.appendChild(trBody);

    // Reset form
    form.reset();
  });
}

// Bài 3
// Xử lý form cập nhật sinh viên
const updateForm = document.getElementById("update-student-form");

if (updateForm) {
  updateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById(
      "update-name"
    ) as HTMLInputElement;
    const ageInput = document.getElementById("update-age") as HTMLInputElement;
    const sexInput = document.getElementById("update-sex") as HTMLSelectElement;

    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const sex = Sex[sexInput.value];

    // Tìm và cập nhật thông tin sinh viên trong mảng students
    const selectedStudentIndex = students.findIndex(
      (student) => student.name === name
    );
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
function enableSorting(): void {
  const tableHead = document.querySelectorAll(".student-table th.sortable");

  tableHead.forEach((th) => {
    th.addEventListener("click", () => {
      const column = th.innerHTML.toLowerCase();

      students.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });

      // Đảo ngược dữ liệu nếu cùng một giá trị (sắp xếp tăng dần - giảm dần)
      if (th.classList.contains("ascending")) {
        students.reverse();
        th.classList.remove("ascending");
      } else {
        th.classList.add("ascending");
      }

      createTable(students);
    });
  });
}

// Gọi hàm enableSorting để kích hoạt tính năng sắp xếp
enableSorting();
