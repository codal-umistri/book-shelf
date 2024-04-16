import express from "express";
import { validateDeleteNoteInput, validateInput, validateLoginInputs, validateNoteInput } from "../validations/validations";
import { resgisterUser, loginUser } from "../controller/UserController"
import { Auth } from "../services/Authservice";
import { addNote, deleteNote, getNote, getNotes, updateNote } from "../controller/NoteController";

const router = express.Router();

router.post('/register', validateInput, resgisterUser);
router.post("/login", validateLoginInputs, loginUser);
router.post('/add-note', validateNoteInput, Auth, addNote);
router.get('/get-note', Auth, getNote)
router.get('/get-notes', Auth, getNotes)
router.patch('/update-note', Auth, updateNote)
router.delete('/delete-note', validateDeleteNoteInput, Auth, deleteNote)

export default router;  