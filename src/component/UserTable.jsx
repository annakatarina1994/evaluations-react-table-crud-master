import React from 'react';

const UserTable = (userData) => {
    return (
        <div>
            {JSON.stringify(userData, null, 2)}

        </div>
    )
}

export default UserTable;