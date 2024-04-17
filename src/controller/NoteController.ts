import { handleResponses } from '../utils/utils';
import { CustomRequest } from '../type/types';
import Notes from '../models/notes';
import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const addNote = async (req: CustomRequest, res: Response) => {
  try {
    const note = new Notes({
      title: req.body.title,
      description: req.body.description,
      user_id: req.userid
    });

    await note.save();
    return handleResponses(res, 'Note added successfully', 'Created', note, 'Note');
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return handleResponses(res, 'A note with the same title already exists for this user', 'Conflict');
    }

    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};

export const getNote = async (req: CustomRequest, res: Response) => {
  try {
    const note = await Notes.FindbyTitle(req.body.title, req.userid as string);

    if (!note) {
      return handleResponses(res, 'There is no such a note', 'Not_Found');
    }

    return handleResponses(res, 'Note fetched', 'Success', note, 'Note');
  } catch (error: any) {
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};

export const getNotes = async (req: CustomRequest, res: Response) => {
  try {
    const notes = await Notes.getAllNotes(req.userid as string);

    if (!notes || notes.length === 0) {
      return handleResponses(res, 'There are no notes available', 'Not_Found');
    }
    return handleResponses(res, 'Note fetched', 'Success', notes, 'Notes');
  } catch (error: any) {
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};

export const updateNote = async (req: CustomRequest, res: Response) => {
  try {
    const note = await Notes.FindbyTitle(req.body.title, req.userid as string);

    if (!note) {
      return handleResponses(res, 'There is no such a note', 'Not_Found');
    }

    await note.save({ description: req.body.description }, { patch: true });
    return handleResponses(res, 'Note updated successfully', 'Success', note, 'Note');
  } catch (error: any) {
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};

export const deleteNote = async (req: CustomRequest, res: Response) => {
  try {
    const note = await Notes.FindbyTitle(req.body.title, req.userid as string);

    if (!note) {
      return handleResponses(res, 'There is no such a note', 'Not_Found');
    }

    await note.destroy();
    return handleResponses(res, 'Note deleted successfully', 'Success');
  } catch (error: any) {
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};
