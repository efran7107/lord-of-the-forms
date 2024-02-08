export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

const hasNumber = (name: string): boolean => {
    return /\d/.test(name);
}

export const isNameValid = (name: string): boolean => {
    return !hasNumber(name) && name.length >= 2;
} 