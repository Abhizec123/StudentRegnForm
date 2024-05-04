export function validateEmptyString(a)
{
    let fields = a.split(";"); // Array of Strings

    function isEmpty(str) 
    {
        return str.trim() == "";
    }

    let f = 0;
    fields.some(element => {
        if (isEmpty(element)) {
            f = 1;
            return true; // Stops the iteration when an empty string is found
        }
    })

    if (f == 0) {
        return true;
    } else {
        return false;
    }
}

export function validateEmail()
{
    var email = document.getElementById('Email').value;

    var regx= /^[a-z0-9+_.-]+@[a-z0-9+-]+\.[a-z]{2,3}$/;

    if(regx.test(email)) //checks the string matches the Regx
        return true
    else
        return false
}

export function validateDOB()
{
    var date = document.getElementById('Dob').value;

    let curdate=new Date()
    let studdate=new Date(date)
    
    let diff=curdate-studdate
    if(diff<0)
        return false
    else
        return true
}