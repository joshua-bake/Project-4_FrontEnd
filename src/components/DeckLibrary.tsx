import { useEffect, useState } from 'react'
import { IDeck } from '../interfaces/deck'
import ShowDecks from './ShowDecks'
import { baseUrl } from '../config'

type Decks = null | Array<IDeck>

const DeckLibrary = () => {

    const [decks, setDecks] = useState<Decks>(null)


    useEffect(() => {
        async function fetchDecks() {
            const resp = await fetch(`${baseUrl}/decks`)
            const data = await resp.json()
            setDecks(data)
        }
        fetchDecks()
    }, [])

    console.log(decks)

    if (!decks) {
        return <div className="lds-hourglass"></div>
    }

    return <section className='hero is-fullheight py-4 mt-2'>
        <div className="container">
            <div className="columns is-flex-wrap-wrap">
                {decks?.map(deck => {
                    return <ShowDecks
                        key={deck._id}
                        {...deck}
                    />
                })}
            </div>
        </div>
    </section>
}

export default DeckLibrary