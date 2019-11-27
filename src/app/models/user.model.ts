export interface User {
    uid: string,
    email: string,
    photoUrl?: string;
    displayName?: string;
    memberStatus: MemberStatus;
}

export enum MemberStatus {
    STANDARD = 1,
    PRO = 2,
    ADMIN = 4
}