import axios from 'axios'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'

const CreateDeck = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
    })

    const [errorMessage, setErrorMessage] = useState("")

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
        setErrorMessage("")
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const resp = await axios.post(`${baseUrl}/decks`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(resp.data)
            navigate('/decks')
        } catch (e: any) {
            setErrorMessage(e.response.data.message)
        }
    }
    console.log(formData)

    function handleCardClick() {
        navigate('/card/create')
    }

    return (
        <div className="hero is-fullheight justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-4">Create Your Deck Below <br /> Or</h2>
                <button onClick={handleCardClick} className='flex w-full justify-center buttons-bg rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300'>Create Card</button>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="decks" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading- text-gray-900">
                            Deck Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.title}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading- text-gray-900">
                            Description of Deck
                        </label>
                        <div className="mt-2">
                            <input
                                id="description"
                                name="description"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.description}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="category"
                                name="category"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.category}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center buttons-bg rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                        >
                            Submit Deck
                        </button>
                    </div>
                </form>
                {errorMessage && <p >{errorMessage}</p>}
            </div>
        </div>


    )
}

export default CreateDeck