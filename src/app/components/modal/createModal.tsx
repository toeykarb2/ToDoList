'use cilent'
import { CreateToDoModalProps } from './types'
import React from 'react';
import './styles.css';




export function ShowCreateModal(props: CreateToDoModalProps) {
    // const [todoList, setTodoList] = useState<ITodoData[]>([]);
    let { isOpen, onClose} = props
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={(onClose)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    {props.children}
                </div>
            </div>
        </>

    )
}