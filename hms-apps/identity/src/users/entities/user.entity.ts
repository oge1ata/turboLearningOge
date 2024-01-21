import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  primaryEmailAddress: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string | undefined;

  @Column()
  lastName: string;

  @Column()
  passwordHash: string;

  @Column()
  backupEmailAddress: string;

  @Column({ nullable: true })
  phone: { [key: string]: any } | undefined;

  @Column({ default: false })
  isPrimaryEmailAddressVerified: boolean;

  @Column({ default: false })
  isBackupEmailAddressVerified: boolean;
}