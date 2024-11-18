# Validation Form using jQuery

This project is a **Validation Form** built using **jQuery** that performs client-side validation on user input and stores the data in the **local storage**. The form includes various custom validations for different types of input fields, a cascading dropdown for selecting states and districts, and a table to display the submitted data. The user can view, edit, or delete the data after submission.

## Features

- **Custom Input Validation**: 
  - Each input field has its own custom validation using **regular expressions (regex)**.
  - A common error validator ensures that no field is left empty.
  - Age validation ensures that the entered age is reasonable (not too old).
  
- **Cascading Dropdowns**: 
  - There are two dropdowns: one for selecting a **state** and another for selecting a **district**.
  - The district dropdown is dynamically populated based on the selected state.

- **Local Storage**: 
  - After the form is submitted, user data is stored in the browser's local storage.

- **Data Table**: 
  - After submitting the form, the entered data is displayed in a table with the following columns:
    - **Name**
    - **Email**
    - **Age**
    - **State**
    - **District**
    - **Address**
    - **Adult**
  - The table includes an **Action** column with three buttons:
    - **Edit**: Allows the user to edit the data by populating the form with the selected row's data.
    - **View**: Opens a modal to view the details of the selected user.
    - **Delete**: Permanently deletes the selected user data from the table and local storage.

## Prerequisites

- Ensure you have a browser with JavaScript enabled to run this project.
- This project uses **jQuery**, which is included in the `index.html` file.

## Getting Started

To get started with the project, follow these steps:

### 1. Clone the repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/viscousCoder/formJquery.git
