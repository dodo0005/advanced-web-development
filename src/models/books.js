import db from '../config/database-books.js'

// Define the User model
class User {
	// Table schema definition
	static tableName = 'Books'
	
	// Create the users table
	static createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				author TEXT UNIQUE,
				year INT,
				genre TEXT NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`
		db.exec(sql)
		console.log(`✅ Table '${this.tableName}' created/verified`)
	}
	
	// Get all users
	static findAll() {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY author`)
		return stmt.all()
	}
	
	// Find book by ID
	static findById(id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
		return stmt.get(id)
	}

	// Find book by title
	static findByauthor(title) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE  title= ?`)
		return stmt.get(title)
	}
	
	// Find book by author
	static findByauthor(author) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE author = ?`)
		return stmt.get(author)
	}
	// find book by genre 
	static findBygenre(genre) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE genre = ?`)
		return stmt.get(genre)
	}

	
	// add new book
	static create(bookData) {
		const { title, author, genre } = bookData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, author, genre) 
			VALUES (?,?, ?)
		`)
		const result = stmt.run(title, author, genre || null)
		return this.findById(result.lastInsertRowid)
	}
	
	// Update user
	static update(id, bookData) {
		const { title, author, genre } = bookData
		
		// Build dynamic update query based on provided fields
		const updates = []
		const values = []
		
		if (title !== undefined) {
			updates.push('title = ?')
			values.push(title)
		}

		if (author !== undefined) {
			updates.push('author = ?')
			values.push(author)
		}
		
		if (genre !== undefined) {
			updates.push('genre = ?')
			values.push(genre)
		}
		
		// Always update the updated_at timestamp
		updates.push('updated_at = CURRENT_TIMESTAMP')
		
		if (updates.length === 1) {
			// Only timestamp update, nothing to change
			return this.findById(id)
		}
		
		values.push(id)
		
		const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET ${updates.join(', ')} 
			WHERE id = ?
		`)
		
		stmt.run(...values)
		return this.findById(id)
	}
	
	// Delete book
	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}
	
	// Check if email exists (excluding a specific user ID)
	// static emailExists(email, excludeId = null) {
	// 	let stmt
	// 	if (excludeId) {
	// 		stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE email = ? AND id != ?`)
	// 		return stmt.get(email, excludeId) !== undefined
	// 	} else {
	// 		stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE email = ?`)
	// 		return stmt.get(email) !== undefined
	// 	}
	// }
	
	// Count total users
	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}
	
	// Seed sample data
	static seed() {
		const count = this.count()
		
		if (count === 0) {
			console.log('📝 Seeding books table...')
			
			const sampleBooks = [
				{ title: 'The Series', author:"Ken Dryden", genre: 'biography' },
				{ title: 'Good Energy', author:"Casey Means", genre: 'Diet book' },
				{ title: 'Ultra-Processed People', author:"Chris van Tulleken", genre: 'non-fiction' },
				{ title: 'Dreamer', author:"Nazem Kadri ", genre: 'biography' }
			]
			
			sampleBooks.forEach(book => this.create(book))
			console.log(`✅ Seeded ${sampleBooks.length} book`)
		}
	}
}

export default Book