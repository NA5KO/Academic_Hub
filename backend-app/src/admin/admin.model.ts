import { Community } from "../community/community.model";
import { User } from "../user/user.model";
import { Entity, OneToMany } from "typeorm";

@Entity('Admin')
export class Admin extends User {
    @OneToMany(() => Community, (community) => community.admin, { cascade: ['insert', 'update'] })
    communities: Community[];
}