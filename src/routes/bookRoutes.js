import express from "express"
import * as bookController from "../controller/bookController.js"

// Create a router instance
const router = express.Router()

// Define routes - notice we use router instead of app
// The base path will be added when we mount this router in index.js

// router.get("/", logMiddleware, userController.getAllUsers) // GET /users
// router.get("/:id", userController.getUserById) // GET /users/:id
// router.post("/", userController.createUser) // POST /users
// router.put("/:id", userController.updateUser) // PUT /users/:id
// router.delete("/:id", userController.deleteUser) // DELETE /users/:id

router.get('/', bookController.getAllbooks)
router.get('/:id', bookController.getbookById)
router.post('/', bookController.createbook) 
router.put('/:id', bookController.updatebook)


// Export the router
export default router