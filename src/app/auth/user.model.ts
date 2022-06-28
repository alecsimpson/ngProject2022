
export class User {

    constructor(public email: string, public id: string, private _token: string, readonly tokenExpirationDate: Date) {}

    get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate < new Date()) {
            return null;
        }
        return this._token;
    }


}
