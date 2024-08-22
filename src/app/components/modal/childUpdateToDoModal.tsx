'use cilent'
import { IUpdateModal, ICreateToDo } from './types'
import React, { ChangeEvent, useState } from 'react';
import './styles.css';
import { todoApi } from "@/constants/api";
import { requestHTTPs } from "@/utils/https";
import { HTTP_METHOD } from "@/types/http.type";

export function UpdateToDoModal(props: IUpdateModal) {
    const [title, setTitle] = useState(props.todoData.title);
    const [description, setDescription] = useState(props.todoData.description);


    function changeInputTitle(event: ChangeEvent<HTMLInputElement>): void {
        setTitle(event.target.value);
    }


    let { onClose, todoData } = props


    function resetUpdate(): void {
        setTitle(props.todoData.title);
        setDescription(props.todoData.description);
        onClose();
    }

    async function updateTodoItem(): Promise<void> {

        
        const updateRequestBody: ICreateToDo = {
            title,
            description,
        };

        if (!updateRequestBody.title) {
            alert('title should not be empty');
            return;
        }
        const CreateUrl = `${todoApi.domain}${todoApi.path.todo}/${todoData.id}`;
        const result = await requestHTTPs(CreateUrl, updateRequestBody, HTTP_METHOD.PATCH);
        if (result) {
            window.location.reload();
        }
        else {
            alert('create todo item failed');
        }
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update Product
                </h3>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text"
                        value={title}
                        onChange={changeInputTitle}
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </input>
                </div>
                <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300">
                    </textarea>
                </div>
            </div>

            <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                <button
                    onClick={updateTodoItem}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Update
                </button>
                <button
                    onClick={(resetUpdate)}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Cancel
                </button>
            </div>
        </>

    )
}