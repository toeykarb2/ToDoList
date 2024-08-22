import { PropsType } from "./types"

export function InputForm(props: PropsType) {
  const { username, password, changeInputUsername, changeInputPassword } = props
  return (
    <>
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

    </>
  )
}