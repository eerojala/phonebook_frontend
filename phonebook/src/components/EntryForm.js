import React from 'react'

const EntryForm = (props) => {
    return(
        <div>
            <h2>Lisää uusi / muuta olemassaolevaa numeroa</h2>
            <form onSubmit={props.addPerson}>
                <div>
                    Nimi: <input 
                    value={props.newName}
                    onChange={props.handleNameChange}
                    />
                </div>
                <div>
                    Numero: <input 
                    value={props.newNumber}
                    onChange={props.handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">Lisää</button>
                </div>
            </form>
        </div>
    )
}

export default EntryForm