import * as bookService from '../services/bookService.js'

// Get all users
export const getAllbooks = (req, res) => {
	try {
		const books = bookService.getAllbooks()
		res.status(200).json(books)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single user by ID
export const getbookById = (req, res) => {
	try {
		const { id } = req.params
		const book = bookService.getUserById(id)
		
		if (!book) {
			return res.status(404).json({ message: "book not found" })
		}
		
		res.status(200).json(book)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new user
export const createUser = (req, res) => {
	try {
		const { title, author, genre } = req.body
		
		// Validation
		if (title) {
			return res.status(400).json({ message: "title is required" })
		}
		
		const newbook = bookService.createbook({title, author, genre})
		res.status(201).json(newbook)
	} catch (error) {
		// Handle duplicate email error
		if (error.message === 'Email already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Update user
export const updatebook = (req, res) => {
	try {
		const { id } = req.params
		const { title, author, genre } = req.body
		
		const updatedbook = bookService.updatebook(id, { title, author, genre })
		
		if (!updatedbook) {
			return res.status(404).json({ message: "book not found" })
		}
		
		res.status(200).json(updatedbook)
	} catch (error) {
		if (error.message === 'Email already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Delete user
export const deletebook = (req, res) => {
	try {
		const { id } = req.params
		const deleted = userService.deletebook(id)
		
		if (!deleted) {
			return res.status(404).json({ message: "book not found" })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}