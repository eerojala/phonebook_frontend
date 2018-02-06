import React from 'react'

const Entry = ({ person,  removePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={removePerson}>Poista</button>
            </td>
        </tr>
    )
}

export default Entry