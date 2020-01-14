import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({ handleSelect }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                Select
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleSelect}>Tallest Men</Dropdown.Item>
                <Dropdown.Item onClick={handleSelect}>Tallest Women</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
