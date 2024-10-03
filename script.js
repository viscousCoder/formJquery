$(document).ready(function () {
  const userForm = $("#userForm");
  const showTable = $("#showTable");
  const showForm = $("#showForm");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editingUserId = null;
  const userTableBody = $("#userTable tbody");

  const state = $("#state");
  const district = $("#district");

  const date = $("#date");
  const age = $("#age");

  const name = $("#username");
  const contact = $("#contact");
  const email = $("#email");
  const address = $("#address");

  // remove tHe error on focus
  const inputs = [name, contact, email, date, age, state, district, address];
  inputs.forEach((input) => {
    input.focus(function () {
      $(this).removeClass("error");
      $(`#${this.id}Error`).hide();
    });
  });

  function calculateAge() {
    const dateOfBirth = new Date(date.val());
    const today = new Date();

    let getAge = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      getAge--;
    }

    age.val(getAge >= 0 ? getAge : "");
  }

  date.change(calculateAge);

  const subjectObject = {
    Uttarakhand: ["Nainital", "Haldwani", "Tehri"],
    UttarPradesh: ["Ghaziabad", "Noida", "Ballia"],
  };

  function populateStates() {
    $.each(subjectObject, function (stateName) {
      state.append(new Option(stateName, stateName));
    });
  }

  function populateDistricts() {
    district.empty().append(new Option("Select the district", ""));
    if (state.prop("selectedIndex") < 1) return;

    const districts = subjectObject[state.val()];
    $.each(districts, function (index, districtName) {
      district.append(new Option(districtName, districtName));
    });
  }

  state.change(populateDistricts);
  populateStates();

  function updateDateTime() {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()}`;
    const formattedTime = `${String(now.getHours() % 12).padStart(
      2,
      "0"
    )}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    $("#min").text(`${formattedDate} ${formattedTime}`);
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  function renderTable() {
    userTableBody.empty();
    if (users.length === 0) {
      userTableBody.append("<tr><td colspan='5'>No data found</td></tr>");
    } else {
      $.each(users, function (index, user) {
        userTableBody.append(`
                      <tr>
                          <td>${user.name}</td>
                          <td class="emailClass">${user.email}</td>
                          <td>${user.age}</td>
                          <td>${user.state}</td>
                          <td class="editBtn"><button onclick="editUser(${user.id})">Edit</button></td>
                      </tr>
                  `);
      });
    }
  }

  userForm.submit(function (event) {
    event.preventDefault();
    let isValid = true;
    const adult = $("input[name='adultY']:checked");

    const adultValue = adult.length ? "Yes" : "No";

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.val().trim())) {
      showError(name, "usernameError");
      isValid = false;
    } else {
      showSuccess(name, "usernameError");
    }

    const contactRegex = /^[89][0-9]{9}$/;
    if (!contactRegex.test(contact.val().trim())) {
      showError(contact, "contactError");
      isValid = false;
    } else {
      showSuccess(contact, "contactError");
    }

    const emailRegex = /^[a-zA-Z0-9\-+%]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email.val().trim())) {
      showError(email, "emailError");
      isValid = false;
    } else {
      showSuccess(email, "emailError");
    }

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(date.val().trim())) {
      showError(date, "dateError");
      isValid = false;
    } else {
      showSuccess(date, "dateError");
    }

    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(age.val().trim())) {
      showError(age, "ageError");
      isValid = false;
    } else {
      showSuccess(age, "ageError");
    }

    if (state.prop("selectedIndex") === 0) {
      showError(state, "stateError");
      isValid = false;
    } else {
      showSuccess(state, "stateError");
    }

    if (district.prop("selectedIndex") === 0) {
      showError(district, "districtError");
      isValid = false;
    } else {
      showSuccess(district, "districtError");
    }

    const addressRegex = /^[A-Za-z0-9\s.-]+(?:\s+[A-Za-z0-9.-]+)*$/;
    if (!addressRegex.test(address.val().trim())) {
      showError(address, "addressError");
      isValid = false;
    } else {
      showSuccess(address, "addressError");
    }
    console.log(adultValue);
    if (isValid) {
      const user = {
        id: editingUserId || Date.now(),
        name: name.val(),
        contact: contact.val(),
        email: email.val(),
        date: date.val(),
        age: age.val(),
        gender: $("input[name='gender']:checked").val(),
        state: state.val(),
        district: district.val(),
        address: address.val(),
        adult: adultValue,
      };
      if (editingUserId) {
        const index = users.findIndex((u) => u.id === editingUserId);
        users[index] = user;
        editingUserId = null;
      } else {
        users.push(user);
      }
      localStorage.setItem("users", JSON.stringify(users));
      userForm[0].reset();
      $("input, textarea, select").removeClass("success error");
      renderTable();
      $("#submitBtn").text("Submit");
    }
  });

  function showError(input, errorId) {
    $(`#${errorId}`).show();
    input.addClass("error").removeClass("success");
  }

  function showSuccess(input, errorId) {
    $(`#${errorId}`).hide();
    input.addClass("success").removeClass("error");
  }

  showTable.click(function () {
    $("#formContainer").hide();
    $("#tableContainer").show();
    renderTable();
  });

  showForm.click(function () {
    $("#formContainer").show();
    $("#tableContainer").hide();
  });

  window.editUser = function (id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      name.val(user.name);
      contact.val(user.contact);
      email.val(user.email);
      date.val(user.date);
      age.val(user.age);
      $(`input[name='gender'][value='${user.gender}']`).prop("checked", true);
      state.val(user.state);
      district.val(user.district);
      address.val(user.address);
      editingUserId = user.id;
      $("#formContainer").show();
      $("#tableContainer").hide();
      // Handling the adult checkbox
      if (user.adult === "Yes") {
        // Adjust based on your data structure
        $("#adultY").prop("checked", true);
      } else {
        $("#adultY").prop("checked", false);
      }
    }
    $("#submitBtn").text("Update");
  };
});
