import { generateClasses } from "@formkit/themes"

const config = {
    config: {
        classes: generateClasses({
            global: {
                wrapper: 'space-y-2 mb-3',
                message: 'bg-red-800 text-white text-sm font-bold p-2 my-5 rounded-lg text-center',
                label: 'block mb-1 text-lg font-bold text-white',
                input: 'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400',
            },
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg mt-10 w-full',
            }
        })
    }
}

export default config