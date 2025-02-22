import { DataSource } from "../../users/dataSource";

export class ProfileService{
    datasource: DataSource;

    constructor() {
        this.datasource = new DataSource();
    }

    currentUser() {
        return this.datasource.getCurrentUser();
    }
}