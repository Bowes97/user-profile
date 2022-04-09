import { IHobby } from "../hobby/hobby.interface";

export interface IPerson {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    framework: string;
    frameworkVersion: string;
    email: string;
    hobby: Array<IHobby>
}