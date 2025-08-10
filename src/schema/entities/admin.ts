import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    // Optional: Store a temporary password to check for changes before updating
    private tempPassword?: string; 

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        // Only hash if the password has been modified or is new
        if (this.password && (this.password !== this.tempPassword)) {
            const saltRounds = 10; // Or a configurable value
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

    @AfterLoad() // Use AfterLoad to capture the original password for comparison on update
    setTempPassword() {
        this.tempPassword = this.password;
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}