export const module = 'Kliničke studije';

//side || top
export const navigation = 'side';

export const showSelectClinic = false;
export const showSelectDepartment = false;

//lokacija na koju se vracamo kad izlazimo iz aplikacije
export const returnToHomepage = () => window.location = `${window.location.origin}/kis/hello.cfm`
;