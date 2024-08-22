'use client'
import { ChangeEvent, useState } from "react";
import './styles.css'
import { todoApi } from "@/constants/api";
import { requestHTTPs } from "@/utils/https";
import { HTTP_METHOD } from "@/types/http.type";
import { IRegisterResponse } from "./types";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function changeInputUsername(event: ChangeEvent<HTMLInputElement>): void {
    setUserName(event.target.value);
  }

  function changeInputPassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  async function register(): Promise<void> {
    const registerBody = {
      username,
      password
    };
    var re = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const checkValidation = re.test(password)
    if (!checkValidation) {
      alert('Password should have minimum eight characters, at least one uppercase letter, one lowercase letter');
    } else {
      const registerUrl = `${todoApi.domain}${todoApi.path.register}`;
      const { isSuccess } = await requestHTTPs<IRegisterResponse<Object>>(registerUrl, registerBody, HTTP_METHOD.POST);
      if (isSuccess) {
        alert('register success!');
        router.push('/');
      }
      else {
        alert('register failed!');
      }
    }

  }
  return (
    <main >
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Register</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome! to our website</p>
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
            <button type="submit" className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium" onClick={register}>Register</button>
          </div>
        </div>
      </div>

    </main>
  );
}
