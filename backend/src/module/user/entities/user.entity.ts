import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	email?: string;

	@Column({ type: 'varchar' })
	password?: string;

	@Column({ type: 'varchar' })
	phone_number?: string;

	@Column({ type: 'varchar' })
	first_name?: string;

	@Column({ type: 'varchar' })
	last_name?: string;

	@Column({ type: 'varchar' })
	avatar?: string;

	@Column({ type: 'varchar', default: null })
	current_token?: string;

	@CreateDateColumn({ type: 'datetime' })
	created_at: Date;

	@UpdateDateColumn({ type: 'datetime' })
	updated_at: Date;
}
