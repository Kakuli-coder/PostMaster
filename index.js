console.log(`This is PostMaster - PostMan Clone Website`);

// Get HTML Elements
let alert = document.querySelector("#alert");

let getRadio = document.querySelector("#get");
let postRadio = document.querySelector("#post");

let contentTypeBox = document.querySelector("#contentTypeBox");
let jsonRadio = document.querySelector("#jsonRadio");
let paramsRadio = document.querySelector("#paramsRadio");

let parametersBox = document.querySelector("#parametersBox");
let newParameterBox = document.querySelector("#newParameterBox");
let requestJsonBox = document.querySelector("#requestJsonBox");

let addParameterBtn = document.querySelector("#addParameterBtn");
let removeParameterBtn = document.querySelectorAll(".removeParameterBtn");

let submit = document.querySelector("#submit");

let responseJsonDiv = document.querySelector("#responseJsonDiv");

// Utility functions
// 1. Function to get DOM element from string
function getElementfromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
};

// 2. Function to display Response Div & Request patience from the user
function displayResponseDiv() {
    responseJsonDiv.style.display = "block";
    responsePrism.innerHTML = "Please Wait. Fetching response...";
};

// 3. Function to hide Response Div
function hideResponseDiv() {
    responseJsonDiv.style.display = "none";
};

// 4. Function to Reset Postmaster Form
function resetForm() {
    let postmasterForm = document.querySelector("#postmasterForm");
    postmasterForm.reset();
}

// 5. Function to display Alert
function displyAlert() {
    alert.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Insufficient information!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    setTimeout(() => {
        alert.innerHTML = ``;
    }, 5000);
};

// 6. Function to hide Content Type Box, Parameters Box, JSON Box and Response box
function hideBoxes() {
    contentTypeBox.style.display = "none";
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "none";
    responseJsonDiv.style.display = "none";
};
hideBoxes();

// When GET Request Type Radio is selected:
getRadio.addEventListener("click", () => {
    contentTypeBox.style.display = "none";
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "none";
    newParameterBox.style.display = "none";
});

// When POST Request Type Radio is selected:
postRadio.addEventListener("click", () => {
    contentTypeBox.style.display = "flex";
});

// When JSON Radio is selected:
jsonRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "flex";
    parametersBox.style.display = "none";
    newParameterBox.style.display = "none";
});

// When Custom Parameters Radio is selected:
paramsRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "flex";
    newParameterBox.style.display = "flex";
});

// Initilize Parameter Count 
let addedParamCount = 0;

// If the user clicks on '+' button, add more parameters 
addParameterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let string = `
    <div class="d-flex justify-content-around my-2">
        <label for="params${addedParamCount + 2}" class="col-sm-3 col-form-label mx-2">Parameter<strong>#${addedParamCount + 2}</strong></label>
        <div class="col-sm-9">
            <div class="d-flex justify-content-around">
                <div class="flex-fill">
                    <input type="text" id="paramsKey${addedParamCount + 2}" class="form-control" placeholder="Enter Key ${addedParamCount + 2}" aria-label="paramsKey${addedParamCount + 2}">
                </div>
                <div class="flex-fill mx-2">
                    <input type="text" id="paramsValue${addedParamCount + 2}" class="form-control" placeholder="Enter Value ${addedParamCount + 2}"
                    aria-label="paramsValue${addedParamCount + 2}">
                </div>
                <div class="flex-fill">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn bg-light bg-gradient" data-bs-toggle="modal" data-bs-target="#deleteModal${addedParamCount + 2}">
                        -
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="deleteModal${addedParamCount + 2}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title fs-5" id="deleteModalLabel">Are you sure you want to remove Parameter ${addedParamCount + 2}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="removeParameterBtn btn bg-danger text-white" data-bs-dismiss="modal">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
        </div>
    </div>
    `;
    // console.log(addedParamCount);

    // display DOM element
    let newParameterDiv = getElementfromString(string);
    // console.log(newParameterDiv);
    newParameterBox.appendChild(newParameterDiv);

    // If the user clicks on '-' button, remove that parameter
    let removeParameterBtn = document.querySelectorAll('.removeParameterBtn');
    removeParameterBtn.forEach(e => {
        e.onclick = () => removeParameterBtnFunction(e);
    });
    function removeParameterBtnFunction(e) {
        // console.log(e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
        let element = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        element.remove();
    }

    addedParamCount++;
});

// If the user clicks on Submit button
submit.addEventListener("click", (e) => {
    e.preventDefault();

    let url = document.querySelector("#url");
    let requestType = document.querySelector("input[name='requestType']:checked");
    let contentType = document.querySelector("input[name='contentType']:checked");

    let responsePrism = document.querySelector("#responsePrism");
    var data = {};

    // 1. Function to invoke fetch api to create a get request
    function fetchGetRequest() {
        fetch(url.value, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                responsePrism.innerHTML = text;
                Prism.highlightAll();
            });
    };

    // 2. Function to invoke fetch api to create a post request
    function fetchPostRequest() {
        fetch(url.value, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: data
        })
            .then(response => response.text())
            .then((text) => {
                responsePrism.innerHTML = text;
                Prism.highlightAll();
            });
    };

    // 2. Function to display error
    function displayError() {
        displyAlert();
        hideResponseDiv();
        hideBoxes();
        resetForm();
    }

    if (url.value !== "" && requestType !== null) {
        if (requestType.value === "POST") {
            if (contentType !== null) {
                if (contentType.value === "Custom Parameters") {
                    for (let i = 0; i < addedParamCount + 1; i++) {
                        var paramsKey = document.querySelector(`#paramsKey${i + 1}`);
                        var paramsValue = document.querySelector(`#paramsValue${i + 1}`);
                        // console.log(`paramsKey is`, paramsKey);
                        if (paramsKey !== null) {
                            data[paramsKey.value] = paramsValue.value;
                        }
                    };
                    data = JSON.stringify(data);
                    // console.log(data);
                    // console.log(paramsKey.value);
                    // console.log(paramsValue.value);
                    fetchPostRequest();
                    displayResponseDiv();
                } else {
                    data = jsonRequestText.value;
                    if (data !== "") {
                        // console.log(jsonRequestText.value);
                        fetchPostRequest();
                        displayResponseDiv();
                    } else {
                        displayError();
                    }
                };
            } else {
                displayError();
            }
        } else {
            fetchGetRequest();
            displayResponseDiv();
        };
    } else {
        displayError();
    };
});
