"use client";
import { ChangeEvent, useState } from "react";
import "./styles.css";
import { ILoginRequestBody, ILoginResponseBody } from "./types";
import { requestHTTPs } from "@/utils/https";
import { todoApi } from "@/constants/api";
import { HTTP_METHOD } from "@/types/http.type";
import { deleteCookie, setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function goto(path: string): void {
    router.push(path);
  }

  function changeInputUsername(event: ChangeEvent<HTMLInputElement>): void {
    setUserName(event.target.value);
  }

  function changeInputPassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function areEmptyCreds(): boolean {
    const isEmptyUsername = username.trim().length === 0;
    const isEmptyPassword = password.trim().length === 0;
    if (isEmptyUsername || isEmptyPassword) {
      const errorEmptyCred = "Username or password must not be empty!";
      alert(errorEmptyCred);
      return true;
    }
    return false;
  }

  async function removeExistingAuth(): Promise<void> {
    Promise.all([deleteCookie("access_token"), deleteCookie("username")]);
  }

  async function login(): Promise<void> {
    await removeExistingAuth();
    if (areEmptyCreds()) return;
    const loginRequestBody: ILoginRequestBody = {
      username,
      password,
    };
    const loginUrl = `${todoApi.domain}${todoApi.path.login}`;
    try {
      const { access_token } = await requestHTTPs<ILoginResponseBody>(
        loginUrl,
        loginRequestBody,
        HTTP_METHOD.POST
      );
      if (access_token) {
        setCookie("access_token", access_token);
        setCookie("username", username);
        goto("/pages/todo");
      } else {
        alert("username not found");
      }
    } catch (e: unknown) {
      console.error(e);
      alert("Something went wrong");
    }
  }

  return (
    <main>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
          <p className="text-red-500"></p>
          <div className="space-y-2">
            <div><label htmlFor="username" className="text-gray-600 mb-2 block"></label>Username
            </div>
          </div>
          <input
            autoComplete="off"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
            placeholder="JohnDoe"
            value={username}
            onChange={changeInputUsername}
          ></input>
          <div className="space-y-2">
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block"></label>Password
              <div className="relative">
                <input
                  autoComplete="off"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="*********"
                  type="password"
                  value={password}
                  onChange={changeInputPassword}
                  required
                ></input>
                <div
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600">
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium" onClick={login}>Login</button>
            <div className="flex gap-2 pt-5">
              <p className="text-gray-600 text-sm">Don't have an account?</p><a className="text-gray-600 text-sm underline"
                href="/pages/register">Register here</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
