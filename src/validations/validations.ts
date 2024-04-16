import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../type/types";
import { StatusCode } from "../constants/status_utils";
import { handleValidationError } from "../constants/common_function";

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.match(emailRegex);
};

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.body?.name === "undefined" ||
    req.body?.email === "undefined" ||
    req.body?.password === "undefined" ||
    req.body?.confirm_password === "undefined" ||
    !!!req.body?.name?.trim() ||
    !!!req.body?.email?.trim() ||
    !!!req.body?.password?.trim() ||
    !!!req.body?.confirm_password?.trim()
  ) {
    return handleValidationError(res, "Please fill in all fields");
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, "Please enter a valid email");
  } else if (req.body.password !== req.body.confirm_password) {
    return handleValidationError(res, "Passwords do not match");
  }

  next();
};

export const validateLoginInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body?.email === "undefined" ||
    req.body?.password === "undefined" ||
    !!!req.body?.email?.trim() ||
    !!!req.body?.password?.trim()
  ) {
    return handleValidationError(res, "Please fill in all fields");
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, "Please enter a valid email");
  }

  next();
};

export const checkInputs = (req: Request, res: Response, next: NextFunction) => {
  if (req.body?.email === "undefined" || !!!req.body?.email?.trim()) {
    return handleValidationError(res, "Please fill in all fields");
  } else if (!validateEmail(req.body.email)) {
    return handleValidationError(res, "Please enter a valid email");
  }

  next();
};

export const validateNoteInput = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.description === "undefined" ||
    !!!req.body?.description?.trim() ||
    req.body.title === "undefined" ||
    !!!req.body?.title?.trim()
  )
    return handleValidationError(res, "Please fill in all fields");

  next();
};

export const validateDeleteNoteInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.title === "undefined" || !!!req.body?.title?.trim())
    return handleValidationError(res, "Please fill in all fields");

  next();
};