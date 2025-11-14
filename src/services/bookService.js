import Book from '../models/books.js'

// Get all users
export const getAllbooks = () => {
	return Book.findAll()
}

// Get user by ID
export const getbookById = (id) => {
	return Book.findById(id)
}

// Create new user
export const createbook = (bookData) => {
	const { title, author, genre, year } = bookData
	
	// Business logic: Check if email already exists
	// if (email && User.emailExists(email)) {
	// 	throw new Error('Email already exists')
	// }
	
	// Additional business logic could go here
	// e.g., send welcome email, log user creation, etc.
	
	return Book.create({ title, author, genre,year })
}

// Update user
export const updatebook = (id, bookData) => {
	const {title, author, genre,year } = bookData
	
	// Check if user exists
	const existingbook = Book.findById(id)
	if (!existingbook) {
		return null
	}
	
	// Business logic: Check if new email conflicts
	// if (email && email !== existingUser.email && User.emailExists(email, id)) {
	// 	throw new Error('Email already exists')
	// }
	
	return Book.update(id, { title, author, genre,year})
}

// Delete user
export const deletebook = (id) => {
	return Book.delete(id)
}

// Additional service methods with business logic
export const getbookBytitle = (title) => {
	return Book.findByEmail(title)
}

export const getbookCount = () => {
	return Book.count()
}