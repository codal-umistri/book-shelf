import { Request, Response } from 'express';
import Notes from "../models/notes";
import dotenv from "dotenv";
import { CustomRequest } from '../type/types';
dotenv.config();

export const AddNote = async (req: CustomRequest, res: Response) => {
    try {
        const note = await Notes.forge<Notes>({ title: req.body.title, description: req.body.description, user_id: req.userid }).save();
        return res.status(200).json({ message: "Note added successfully", note: note.toJSON() });
    }
    catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "A note with the same title already exists for this user" });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const GetNote = async (req: CustomRequest, res: Response) => {
    try {
        const notes = await Notes.FindbyTitle(req.body.title, req.userid as string);
        return notes ? res.status(200).json({ message: "Note fetched", note: notes }) : res.status(404).json({ message: "There is no such a note" })
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const GetNotes = async (req: CustomRequest, res: Response) => {
    try {
        const notes = await Notes.getAllNotes(req.userid as string);
        return notes?.length ? res.status(200).json({ message: "Note fetched", note: notes }) : res.status(404).json({ message: "There is no such a note" })
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const UpdateNote = async (req: CustomRequest, res: Response) => {
    try {
        const notes = await Notes.FindbyTitle(req.body.title, req.userid as string);
        return !notes ? res.status(404).json({ error: 'Note not found' }) : (
            await notes.save({ description: req.body.description }, { patch: true }),
            res.json({ message: 'Note updated successfully', note: notes.toJSON() })
        )
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const DeleteNote = async (req: CustomRequest, res: Response) => {
    try {
        const note = await Notes.FindbyTitle(req.body.title, req.userid as string);
        return !note ? res.status(404).json({ error: 'Note not found' }) : (
            await note.destroy(),
            res.json({ message: 'Note deleted successfully' })
        )
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
