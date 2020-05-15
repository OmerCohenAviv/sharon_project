const numberRegex = new RegExp("^[0-9]+$");
const lettersRegex = /^[a-zA-Z]+$/;



const formInputsStructure = [
    { type: 'text', labelText: 'Full Name', className: 'form-control' },
    { type: 'password', labelText: 'Password ( 6 Letters )', className: 'form-control' },
    { type: 'email', labelText: 'Email', className: 'form-control' },
    { type: 'url', labelText: 'URL', className: 'form-control' },
    { type: 'number', labelText: 'Phone Number', className: 'form-control'}

];
const myForm = document.getElementById('inputs-container');
const validateInput = (typeOfInput, inputNode) => {
    const { value } = inputNode;
    switch (typeOfInput) {
        case 'text': {
            if (!value.length || value.trim() === '') {
                return  inputNode.classList.add('is-invalid')
            }
            const strArr = [...value];
            let checkForSpace = strArr.every(letter => letter !== ' ');
            if (!checkForSpace) {
                inputNode.classList.remove('is-invalid');
                return inputNode.classList.add('is-valid')
            }
            return inputNode.classList.add('is-invalid')
        }
        case 'password': {
            if (value.length === 6 && lettersRegex.test(value)) {
                inputNode.classList.remove('is-invalid');
                inputNode.classList.add('is-valid');
                return;
            }
            else {
                inputNode.classList.add('is-invalid');
                inputNode.classList.remove('is-valid');
                break;
            }
        }
        case 'number': {
            if ((value.length === 9 || value.length === 10) && numberRegex.test(value)) {
                inputNode.classList.add('is-valid');
                inputNode.classList.remove('is-invalid');
                return;
            }
            inputNode.classList.add('is-invalid');
            return;

        }
        default: return
    }
};
formInputsStructure.forEach(input => {
    const { type, className, labelText } = input;
    const labelTextNode = document.createTextNode(labelText); // Text Creation for label
    const singleInput = document.createElement('input'); // Input Creation
    const formGroup = document.createElement('div'); // form-group container Creation
    const label = document.createElement('label'); // label creation
    singleInput.addEventListener('input', function() {
        validateInput(type, singleInput)
    });
    singleInput.setAttribute('type', type); // assign attribute
    singleInput.setAttribute('required', 'true'); // assign attribute
        singleInput.setAttribute('id', type);
    singleInput.classList.add(className); // add class
    formGroup.classList.add('form-group'); // add class
    label.classList.add('label'); // add class
    label.append(labelTextNode);
    formGroup.append(label);
    formGroup.append(singleInput);
    myForm.append(formGroup);
});

const passwordNode = document.getElementById('password');
passwordNode.setAttribute('pattern', "[A-Za-z]{6}");



