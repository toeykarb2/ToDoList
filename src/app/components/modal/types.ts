import React, { useEffect, useState } from "react";
import { ITodoData } from "@/app/pages/todo/types";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoData: ITodoData;
    children?: any
    modalId: string

}

export interface CreateToDoModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: any

}

export interface IDeleteModal {
    onClose: () => void;
    deleteTodoData: ITodoData;
}

export interface IUpdateModal {
    onClose: () => void;
    todoData: ITodoData;
}

export interface ICreateModal {
    onClose: () => void;
}

export interface ICreateToDo {
   title: string
   description: string
}