import { DataSource } from "../../users/dataSource/dataSource";

export class ProfileService{
    datasource: DataSource;

    constructor() {
        this.datasource = new DataSource();
    }

    currentUser() {
        return this.datasource.getCurrentUser();
    }

    editProfile(user:{newName: string; newLastName: string}) {
        return this.datasource.updateUser(user);
    }
}