"use client";
import { todoApi } from "@/constants/api";
import { HTTP_METHOD } from "@/types/http.type";
import { requestHTTPs } from "@/utils/https";
import React, { useEffect, useState } from "react";
import { ITodoData, ITodoListResponseBody } from "./types";
import { UpdateToDoModal } from "@/app/components/modal/childUpdateToDoModal";
import { DeleteModal } from '@/app/components/modal/childDeleteModal'
import { CreateToDoModal } from "@/app/components/modal/childCreateToDoModal";
import { ShowModal } from "@/app/components/modal/modal";
import { ShowCreateModal } from '@/app/components/modal/createModal';
import "./styles.css";

export default function Todo() {
  const [todoList, setTodoList] = useState<ITodoData[]>([]);
  const [openDeleteModal, setDeleteOpenModal] = useState<boolean>(false);
  const [openCreateModal, setCreateOpenModal] = useState<boolean>(false);
  const [openUpDateModal, setUpdateOpenModal] = useState<boolean>(false);

  const [checkModalById, setcheckModalById] = useState<string>('')

  async function getAllList() {
    try {
      const allTodo = `${todoApi.domain}${todoApi.path.todo}`;
      const { isSuccess, data } = await requestHTTPs<ITodoListResponseBody>(
        allTodo,
        null,
        HTTP_METHOD.GET
      );
      if (isSuccess) {

        Promise.all(data.map(async (item) => {
          const changeDateFormat = (new Date(item.created_at)).toLocaleDateString('en-GB')
          item.created_at = changeDateFormat
        }));

        setTodoList(data);

      } else {
        console.info("failed to fetch todo list");
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllList();
  }, []);

  return (
    <main>
      <section className="mx-32">
        <div className="lg:order-first">
          <div className="flex flex-col max-w-fit">

            <div className="flex flex-col">
              <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">TODO</h2>
            </div>
            <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
            <button
              onClick={() => setCreateOpenModal(true)}
              type="button"
              className="max-w-24  mt-5 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Create
            </button>
            {todoList.length !== 0 ? (
              todoList.map((todoItem: ITodoData, index: number) => {
                return (
                  <div className="mt-5" key={index.toString()} >
                    <div className="flex justify-between">
                      <div className="p-8 rounded-3xl bg-[#f4f6f3] ring-1 ring-white/10 shadow-md w-full"  >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <p className="text-neutral-800 font-semibold">
                              {todoItem.title}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setDeleteOpenModal(true)
                              setcheckModalById(todoItem.id)
                            }}
                            type="button"
                            className="bg-red-500 hover:bg-red-700 rounded-lg text-sm p-1.5 text-center inline-flex items-center me-2">
                            <svg className="w-[14px] h-[14px] fill-[#f8f7f7]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-8 text-sm font-medium text-neutral-800 break-words">
                          {todoItem.description}
                        </p>

                        <ShowModal
                          modalId={checkModalById}
                          todoData={todoItem}
                          isOpen={openDeleteModal}
                          onClose={() => {
                            setDeleteOpenModal(false)
                            setcheckModalById('')
                          }}
                        >
                          <DeleteModal
                            onClose={() => {
                              setDeleteOpenModal(false)
                              setcheckModalById('')
                            }}
                            deleteTodoData={todoItem}
                          ></DeleteModal>
                        </ShowModal>
                        <ShowModal
                          modalId={checkModalById}
                          todoData={todoItem}
                          isOpen={openUpDateModal}
                          onClose={() => {
                            setUpdateOpenModal(false)
                            setcheckModalById('')
                          }}
                        >
                          <UpdateToDoModal
                            onClose={() => {
                              setUpdateOpenModal(false)
                              setcheckModalById('')
                            }}
                            todoData={todoItem}
                          ></UpdateToDoModal>
                        </ShowModal>
                        <div className="flex justify-between ">
                          <button
                            onClick={() => {
                              setUpdateOpenModal(true)
                              setcheckModalById(todoItem.id)
                            }}
                            className="mt-3 py-2 px-4 rounded-lg text-sm font-medium bg-teal-200 hover:bg-teal-300 text-teal-800">Edit</button>
                          <div className="mt-2 py-2 px-4 items-center">{todoItem.created_at}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (

              <div className='middleText'>
                <p><span>Empty press 'Crete'</span><span>for add new todo</span></p></div>
            )}


            <div className="addBtnBox">
            </div>
            <ShowCreateModal
              isOpen={openCreateModal}
              onClose={() => { setCreateOpenModal(false) }}
            >
              <CreateToDoModal
                onClose={() => { setCreateOpenModal(false) }}
              ></CreateToDoModal>
            </ShowCreateModal>

          </div>
        </div>
      </section>
    </main>
  );
}
