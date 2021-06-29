const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phone_number_pattern = /(\\+[0-9]+[\\-\\.]*)?(\\([0-9]+\\)[\\-\\.]*)?([0-9][0-9\\-\\.]+[0-9])/;

export const isValidEmail = (email) => {
    return email_pattern.test(email);
}


export const isValidPhoneNumber = (phone) => {
    return phone_number_pattern.test(phone);
}