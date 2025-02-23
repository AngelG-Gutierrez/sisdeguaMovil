import { DataSource } from "../../users/dataSource";

export class ProfileService{
    datasource: DataSource;

    constructor() {
        this.datasource = new DataSource();
    }

    currentUser() {
        return this.datasource.getCurrentUser();
    }

    editProfile(user:{newEmail: string; newName: string; newLastName: string}) {
        return this.datasource.updateUser(user);
    }
}