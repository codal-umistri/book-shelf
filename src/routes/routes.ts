import express from "express";
import { validateDeleteNoteInput, validateInput, validateLoginInputs, validateNoteInput } from "../validations/validations";
import { ResgisterUser, LoginUser } from "../controller/UserController"
import { Auth } from "../services/Authservice";
import { AddNote, DeleteNote, GetNote, GetNotes, UpdateNote } from "../controller/NoteController";


const router = express.Router();


router.post('/register', validateInput, ResgisterUser);
router.post("/login", validateLoginInputs, LoginUser);
router.post('/add-note', validateNoteInput, Auth, AddNote);
router.get('/get-note', Auth, GetNote)
router.get('/get-notes', Auth, GetNotes)
router.patch('/update-note', Auth, UpdateNote)
router.delete('/delete-note', validateDeleteNoteInput, Auth, DeleteNote)



export default router;  