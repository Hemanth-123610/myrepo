const sampleData = {
  manual: {
    title: "Manual Testing Output",
    content: `1. Open the application
2. Navigate to the required page
3. Enter valid and invalid data
4. Verify field validations
5. Check expected behavior
6. Confirm no UI or functional issues`
  },
  automation: {
    title: "Automation Testing Output",
    content: `1. Launch browser
2. Open application URL
3. Identify required web elements
4. Perform actions
5. Validate output using assertions
6. Capture screenshot on failure`
  },
  bug: {
    title: "Bug Analysis Output",
    content: `Possible issues to check:
- Input validation issue
- Button not clickable
- Wrong error message
- Data not saving
- Page loading issue
- UI alignment problem`
  },
  testcase: {
    title: "Generated Test Cases",
    content: `TC001 - Verify function with valid input
TC002 - Verify function with invalid input
TC003 - Verify mandatory field validation
TC004 - Verify boundary value behavior
TC005 - Verify proper error handling`
  }
};

function getElement(id) {
  return document.getElementById(id);
}

function generateOutput() {
  const projectName = getElement("projectName").value.trim();
  const mode = getElement("mode").value;
  const requirement = getElement("requirement").value.trim();
  const output = getElement("output");

  if (!projectName) {
    output.textContent = "Please enter project name.";
    return;
  }

  if (!requirement) {
    output.textContent = "Please enter requirement or scenario.";
    return;
  }

  let finalOutput = "";

  if (mode === "manual") {
    finalOutput = `
Project Name: ${projectName}
Mode: Manual Testing

Requirement:
${requirement}

Test Scenario:
1. Verify user can access the feature
2. Verify valid input flow
3. Verify invalid input flow
4. Verify error messages
5. Verify UI response
6. Verify final expected result

Expected Result:
System should behave correctly as per requirement without any defects.
    `;
  } else if (mode === "automation") {
    finalOutput = `
Project Name: ${projectName}
Mode: Automation Testing

Requirement:
${requirement}

Automation Plan:
1. Launch browser
2. Open application URL
3. Locate required elements
4. Perform user actions
5. Add assertions for validation
6. Close browser

Suggested Tools:
- Selenium
- Playwright
    `;
  } else if (mode === "bug") {
    finalOutput = `
Project Name: ${projectName}
Mode: Bug Detection

Requirement:
${requirement}

Possible Bug Areas:
- Functional issue
- Validation mismatch
- API response issue
- UI issue
- Navigation issue
- Performance lag

Recommendation:
Test positive, negative, and edge case scenarios carefully.
    `;
  } else if (mode === "testcase") {
    finalOutput = `
Project Name: ${projectName}
Mode: Test Case Generation

Requirement:
${requirement}

Generated Test Cases:
TC001 - Verify feature with valid input
TC002 - Verify feature with invalid input
TC003 - Verify mandatory fields
TC004 - Verify error handling
TC005 - Verify successful completion flow
    `;
  }

  output.textContent = finalOutput.trim();
  saveToLocal();
}

function clearForm() {
  getElement("projectName").value = "";
  getElement("mode").value = "manual";
  getElement("requirement").value = "";
  getElement("output").textContent = "Your QA Buddy response will appear here...";
  localStorage.removeItem("qabuddyData");
}

function loadSample() {
  getElement("projectName").value = "MyCompetency";
  getElement("mode").value = "testcase";
  getElement("requirement").value =
    "Verify login functionality with valid and invalid credentials and proper error message.";
  getElement("output").textContent = "Sample loaded successfully. Click Generate.";
}

function saveToLocal() {
  const data = {
    projectName: getElement("projectName").value,
    mode: getElement("mode").value,
    requirement: getElement("requirement").value,
    output: getElement("output").textContent
  };

  localStorage.setItem("qabuddyData", JSON.stringify(data));
}

function loadFromLocal() {
  const savedData = localStorage.getItem("qabuddyData");

  if (savedData) {
    const data = JSON.parse(savedData);
    getElement("projectName").value = data.projectName || "";
    getElement("mode").value = data.mode || "manual";
    getElement("requirement").value = data.requirement || "";
    getElement("output").textContent =
      data.output || "Your QA Buddy response will appear here...";
  }
}

function exportOutput() {
  const outputText = getElement("output").textContent;

  if (!outputText || outputText === "Your QA Buddy response will appear here...") {
    alert("No output available to export.");
    return;
  }

  const blob = new Blob([outputText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "qa_buddy_output.txt";
  link.click();
}

window.onload = function () {
  loadFromLocal();
};
