document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    // Add references to more form fields as needed
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Retrieve the values from the input fields in popup.html
      var name = nameInput.value;
      var email = emailInput.value;
      // Retrieve more values from other form fields as needed
  
      // Perform form filling on the target Chrome website
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, {
          code: `
            // Function to replace placeholder IDs with actual IDs
            function replaceIDs() {
              var idMap = {
                'nameField': 'actualNameFieldID',
                'emailField': 'actualEmailFieldID',
                // Add mappings for more form fields as needed
              };
  
              Object.keys(idMap).forEach(function (placeholderID) {
                var actualID = idMap[placeholderID];
                var field = document.getElementById(placeholderID);
                if (field) {
                  field.id = actualID;
                }
              });
            }
  
            // Fill in the form fields on the target website
            document.getElementById('actualNameFieldID').value = '${name}';
            document.getElementById('actualEmailFieldID').value = '${email}';
            // Fill in more fields as needed
            // ...
  
            // Call the replaceIDs function to replace placeholder IDs
            replaceIDs();
  
            // Submit the form if necessary
            document.getElementById('actualSubmitButtonID').click();
          `
        });
      });
  
      // Save the filled data to local storage
      var data = {
        name: name,
        email: email
      };
      chrome.storage.local.set(data, function () {
        console.log('Data saved:', data);
      });
    });
  });
  