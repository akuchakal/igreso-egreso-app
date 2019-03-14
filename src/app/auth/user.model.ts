export class User {
    public nombre: string;
    public uid: string;
    public email: string;

    constructor(userObj: DataObj) {
        this.nombre = userObj && userObj.nombre || null;
        this.email = userObj && userObj.email || null;
        this.uid = userObj && userObj.uid || null;
    }
}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}